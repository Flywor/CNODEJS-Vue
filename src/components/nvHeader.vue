<template>
  <ul class="header">
    <li v-for="tab in tabs" @click="changeTab(tab.key)" :class="tab.key == check && 'actived'">
      {{ tab.value }}
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      check: 'all',
      tabs: [
        {
          key: 'all',
          value: '全部'
        }, {
          key: 'good',
          value: '精华'
        }, {
          key: 'share',
          value: '分享'
        }, {
          key: 'ask',
          value: '问答'
        }, {
          key: 'job',
          value: '招聘'
        }, {
          key: 'dev',
          value: '客户端测试'
        }
      ]
    }
  },
  methods: {
    changeTab (key) {
      this.check = key
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li {
  display: inline-block;
  margin: 10px;
  cursor: pointer;
}
</style>
