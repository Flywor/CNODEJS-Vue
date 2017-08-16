<template>
  <div>
    <ul class="header">
        <li v-for="tab in tabs" @click="changeTab(tab.key)" :class="tab.key == searchKey.tab && 'actived'">
        {{ tab.value }}
        </li>
    </ul>
    <h1>123123</h1>
  </div>
</template>

<script>
import API from '../api/cnodejs-api.js'
export default {
  data () {
    return {
      searchKey: {
        page: 1,
        limit: 20,
        tab: 'all',
        mdrender: true
      },
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
      this.searchKey.tab = key
      this.getTopics()
    },
    getTopics () {
      API.GetTopics(this.searchKey)
    }
  },
  mounted () {
    this.getTopics()
  }
}
</script>
<style scoped>
li {
  display: inline-block;
  margin: 10px;
  cursor: pointer;
}
</style>

