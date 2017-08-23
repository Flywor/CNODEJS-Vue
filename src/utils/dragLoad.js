// 采用浏览器自带滚动条 + touch三件套监听滚动位置触发上下拉的做法
export const dragLoad = (target, refresh, next) => {
  const maxOver = 50 // 触发加载操作的临界值(单位px)
  const scrollRate = 0.3 // 拉动速率，制造一种使劲拉的效果
  let tStart = 0
  let tPosition = 0
  let loadFlag = false // 控制加载状态, 避免重复拉动加载
  let refreshFlag = false // 监听是否触发下拉刷新
  let nextFlag = false // 监听是否触发上拉加载
  target.addEventListener('touchstart', (e) => {
    if (loadFlag) {
      // 阻止浏览器默认事件可以使加载的时候无法滑动
      // e.preventDefault()
      return
    }
    target.style.transition = `none`
    tStart = e.touches[0].clientY
  })
  target.addEventListener('touchmove', (e) => {
    if (loadFlag) {
      // 阻止浏览器默认事件可以使加载的时候无法滑动
      // e.preventDefault()
      return
    }
    tPosition = (tStart - e.touches[0].clientY) * scrollRate
    if (target.scrollTop === 0) { // 顶部下拉
      if (tPosition < 0) {
        e.preventDefault() // 阻止滚动条
        if (maxOver < Math.abs(tPosition)) { // 达到临界值进入下拉刷新
          refresh.icon.style.transform = `rotate(180deg)`
          refresh.txt.innerText = '释放刷新'
          refreshFlag = true
        } else {
          refresh.icon.style.transform = `rotate(0deg)`
          refresh.txt.innerText = '下拉刷新'
          refreshFlag = false
        }
        target.style.transform = `translate3d(0, ${Math.abs(tPosition)}px, 0)`
      } else {
        refreshFlag = false
      }
    } else if (target.scrollHeight - target.offsetHeight === target.scrollTop && next) { // 底部上拉
      if (tPosition > 0) {
        e.preventDefault()
        if (maxOver < Math.abs(tPosition)) { // 达到临界值进入上拉加载
          next.icon.style.transform = `rotate(180deg)`
          next.txt.innerText = '释放加载'
          nextFlag = true
        } else {
          next.icon.style.transform = `rotate(0deg)`
          next.txt.innerText = '上拉加载'
          nextFlag = false
        }
        target.style.transform = `translate3d(0, -${tPosition}px, 0)`
      }
    } else {
      nextFlag = false
      refreshFlag = false
    } 
  })
  target.addEventListener('touchend', (e) => {
    if (loadFlag) {
      e.preventDefault()
      return
    }
    target.style.transition = '330ms'
    if (refreshFlag && typeof refresh.doneGet === 'function') {
      loadFlag = true
      target.style.transform = `translate3d(0, ${maxOver}px, 0)`
      refresh.icon.style.transform = `rotate(0deg)`
      refresh.icon.className = `listLoad`
      refresh.txt.innerText = '加载中'
      refresh.doneGet().then(rs => {
        refresh.txt.innerText = '刷新成功'
        refresh.icon.className = `success`
        setTimeout(() => {
          target.style.transform = `translate3d(0, 0, 0)`
          refresh.icon.className = ``
          loadFlag = false
        }, 1000)
      }).catch(e => {
        console.error(e.toString())
        refresh.txt.innerText = '加载失败'
        refresh.icon.className = `faild`
        setTimeout(() => {
          target.style.transform = `translate3d(0, 0, 0)`
          refresh.icon.className = ``
          loadFlag = false
        }, 1000)
      })
    } else if (nextFlag && typeof next.doneGet === 'function') {
      loadFlag = true
      target.style.transform = `translate3d(0, -${maxOver}px, 0)`
      next.icon.style.transform = `rotate(0deg)`
      next.icon.className = `listLoad`
      next.txt.innerText = '加载中'
      next.doneGet().then(rs => {
        target.style.transform = `translate3d(0, 0, 0)`
        next.icon.className = ``
        loadFlag = false
      }).catch(e => {
        next.txt.innerText = '加载失败'
        next.icon.className = `faild`
        setTimeout(() => {
          target.style.transform = `translate3d(0, 0, 0)`
          next.icon.className = ``
          loadFlag = false
        })
      })
    } else {
      target.style.transform = 'translate3d(0,0,0)'
    }
  })
}
