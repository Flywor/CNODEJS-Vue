export default {
  show: () => {
    const div = document.createElement('div')
    div.className = 'loading'
    div.innerHTML = '<span></span>'
    document.body.appendChild(div)
    const shade = document.createElement('div')
    shade.className = 'shade'
    document.body.appendChild(shade)
    this.div = div
    this.shade = shade
  },
  hide: () => {
    document.body.removeChild(this.div)
    document.body.removeChild(this.shade)
  }
}
