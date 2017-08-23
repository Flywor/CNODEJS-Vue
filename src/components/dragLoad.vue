<template>
  <div class="itemList" ref="list" @touchstart="start" @touchmove="move" @touchend="end" :style="listStyle">
    <div class="refreshAll">
      <span :style="{ transform: refreshLoad.icon }" :class="refreshLoad.clas">↓</span>
      <label>{{ refreshLoad.txt }}</label>
    </div>
    <vList></vList>
    <div v-show="hasNext" class="loadNext">
      <span :style="{ transform: nextLoad.icon }">↑</span>
      <label>{{ nextLoad.txt }}</label>
    </div>
    <span class="toTop" v-show="isTop" @click="toTop"></span>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import API from '../api/cnodejs-api.js'
import dragLoad from '../utils/dragLoad.js'
import loading from '../utils/loading.js'
import vList from './list.vue'

export default {
  computed: mapState([
    'nvTitle',
    'searchKey'
  ]),
  data () {
    return {
      maxOver: 50, // 触发加载操作的临界值(单位px)
      scrollRate: 0.3, // 拉动速率，制造一种使劲拉的效果
      tStart: 0,
      loadFlag: false, // 控制加载状态, 避免重复拉动加载
      refreshLoad: {
        flag: false, // 监听是否触发下拉刷新
        clas: '',
        icon: '',
        txt: '',
      },
      nextLoad: {
        flag: false, // 监听是否触发上拉加载
        clas: '',
        icon: '',
        txt: '',
      },
      listStyle: {
        transition: 'none',
        transform: `translate3d(0, 0, 0)`
      },
      hasNext: false,
      isTop: false
    }
  },
  methods: {
    start (e) {
      const { loadFlag } = this
      if (loadFlag) {
        // 阻止浏览器默认事件可以使加载的时候无法滑动
        // e.preventDefault()
        return
      }
      this.listStyle.transition = `none`
      this.tStart = e.touches[0].clientY
    },
    move (e) {
      const { loadFlag, maxOver, scrollRate, tStart } = this
      const target = this.$refs.list
      if (loadFlag) {
        // e.preventDefault()
        return
      }
      const tPosition = (tStart - e.touches[0].clientY) * scrollRate
      if (target.scrollTop === 0) { // 顶部下拉
        if (tPosition < 0) {
          e.preventDefault() // 阻止滚动条
          if (maxOver < Math.abs(tPosition)) { // 达到临界值进入下拉刷新
            this.refreshLoad = {
              flag: true,
              icon: 'rotate(180deg)',
              txt: '释放更新'
            }
          } else {
            this.refreshLoad = {
              flag: false,
              icon: 'rotate(0deg)',
              txt: '下拉刷新'
            }
          }
          this.listStyle.transform = `translate3d(0, ${Math.abs(tPosition)}px, 0)`
        } else {
          this.refreshLoad.flag = false
        }
      } else if (target.scrollHeight - target.offsetHeight === target.scrollTop) { // 底部上拉
        if (tPosition > 0) {
          e.preventDefault()
          if (maxOver < Math.abs(tPosition)) { // 达到临界值进入上拉加载
            this.nextLoad = {
              flag: true,
              icon: 'rotate(180deg)',
              txt: '释放加载'
            }
          } else {
            this.nextLoad = {
              flag: false,
              icon: 'rotate(0deg)',
              txt: '上拉加载'
            }
          }
          this.listStyle.transform = `translate3d(0, -${tPosition}px, 0)`
        } else {
          this.nextLoad.flag = false
        }
      } else {
        this.refreshLoad.flag = false
        this.nextLoad.flag = false
      } 
    },
    end (e) {
      const { maxOver } = this
      if (this.loadFlag) {
        e.preventDefault()
        return
      }
      this.listStyle.transition = '330ms'
      if (this.refreshLoad.flag && typeof this.refreshAll === 'function') {
        this.loadFlag = true
        this.listStyle.transform = `translate3d(0, ${maxOver}px, 0)`
        this.refreshLoad = {
          flag: true,
          clas: 'listLoad',
          icon: 'rotate(0deg)',
          txt: '加载中'
        }
        this.refreshAll().then(rs => {
          this.refreshLoad = {
            flag: true,
            clas: 'success',
            icon: 'rotate(0deg)',
            txt: '刷新成功'
          }
          setTimeout(() => {
            this.listStyle.transform = `translate3d(0, 0, 0)`
            this.loadFlag = false
          }, 1000)
        }).catch(e => {
          console.error(e.toString())
          this.refreshLoad = {
            flag: true,
            clas: 'faild',
            icon: 'rotate(0deg)',
            txt: '加载失败'
          }
          setTimeout(() => {
            this.listStyle.transform = `translate3d(0, 0, 0)`
            this.loadFlag = false
          }, 1000)
        })
      } else if (this.nextLoad.flag && typeof this.loadNext === 'function') {
        this.loadFlag = true
        this.listStyle.transform = `translate3d(0, -${maxOver}px, 0)`
        this.nextLoad = {
          flag: true,
          clas: 'listLoad',
          icon: 'rotate(0deg)',
          txt: '加载中'
        }
        this.loadNext().then(rs => {
          this.listStyle.transform = `translate3d(0, 0, 0)`
          this.loadFlag = false
        }).catch(e => {
          this.nextLoad = {
            flag: true,
            clas: 'faild',
            icon: 'rotate(0deg)',
            txt: '加载失败'
          }
          setTimeout(() => {
            this.listStyle.transform = `translate3d(0, 0, 0)`
            this.loadFlag = false
          })
        })
      } else {
        this.listStyle.transform = 'translate3d(0,0,0)'
      }
    },
    toTop () {
      this.$refs.list.scrollTop = 0
    },
    refreshAll () {
      window.sessionStorage.clear()
      return API.GetTopics(this.searchKey).then(rs => {
        this.$store.dispatch('setItems', rs)
        this.$store.dispatch('setSearchPage')
        this.hasNext = rs.length === 20
      })
    },
    loadNext () {
      return API.GetTopics(this.searchKey).then(rs => {
        this.$store.dispatch('pushItems', rs)
        this.$store.dispatch('setSearchPage')
        this.hasNext = rs.length === 20
      })
    }
  },
  mounted () {
    if (window.sessionStorage.topics) {
      new Promise((resolve, reject) => {
        this.$store.dispatch('setItems', JSON.parse(window.sessionStorage.topics))
        this.$store.dispatch('setSearchPage', window.sessionStorage.searchPage)
        this.$store.dispatch('setSearchTab', window.sessionStorage.searchTab)
        resolve()
      }).then(() => {
        this.isTop = window.sessionStorage.scrollTop > 10
        this.$refs.list.scrollTop = window.sessionStorage.scrollTop
      })
    } else {
      this.loadNext(this.nvTitle.key)
    }
  },
  beforeRouteLeave (to, from, next) {
    window.sessionStorage.scrollTop = this.$refs.list.scrollTop
    window.sessionStorage.topics = JSON.stringify(this.items)
    window.sessionStorage.searchPage = this.searchKey.page
    window.sessionStorage.searchTab = this.searchKey.tab
    next()
  },
  components: {
    vList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul{
  width:50%;
}
li {
  margin: 10px;
  cursor: pointer;
  border: 1px solid #f1f1f1;
  padding: 5px;
  font-size: 1.2em;
  display: flex;
}
img {
  width: 3em;
  height: 3em;
  border-radius: 5px;
}
li > div{
  display:block;
  flex: 1;
  padding-left: 5px;
}
li *{
  overflow: hidden; 
  white-space: nowrap; 
  text-overflow: ellipsis;
  line-height: 1.5em;
}
li > div > div{
  display: flex;
}
.right{
  display:block;
  flex: 1;
  text-align: right;
}
h4{
  font-size: 1.1em;
}
h4 span{
  padding: 0 3px;
  vertical-align: top;
  font-size: .9em;
  font-weight: normal;
  color: white;
  border-radius: 5px;
  display: inline-block;
}
.top{
  background-color: #F89062;
}
.share{
  background-color: #B9D5CB;
}
.good{
  background-color: #FAB4C1;
}
.ask{
  background-color: #BBC61C;
}
.job{
  background-color: #F6CC33;
}
.dev{
  background-color: #E6E0D0;
}
li label{
  color: #CF881E;
  font-weight: bold; 
}
.itemList{
  height: 100%;
  width: 200%;
  position:relative;
  overflow-y:scroll;
}
.toTop{
  position:fixed;
  right: 5%;
  bottom: 7%;
  display:block;
  width: 4em;
  height: 4em;
  border-radius: 10px;
  background-color: #BBC61C;
  transition: display 2s;
}
.toTop:before, .toTop:after{
  content: '';
  display: block;
  margin: 0 auto;
}
.toTop:before {
  margin-top: .5em;
  width: 0;
  height: 0;
  border-left: 1em solid transparent;
  border-right: 1em solid transparent;
  border-bottom: 1.5em solid white;
}
.toTop:after {
  width: 1em;
  background-color:white;
  height: 1.2em;
}
.refreshAll, .loadNext{
  height: 50px;
  text-align:center;
  width: 50%;
  font-size: 14px;
  color: grey;
}
.refreshAll:before, .loadNext:before{
  content: '';
  display: inline-block;
  height: 100%;
  width: 1px;
  vertical-align:top;
}
.refreshAll span, .loadNext span{
  display: inline-block;
  transition: transform .3s;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.refreshAll label, .loadNext label{
  display: inline-block;
  line-height: 30px;
}
.refreshAll span, .refreshAll label{
  vertical-align: bottom;
}
.loadNext span, .loadNext label{
  vertical-align: top;
}
</style>
