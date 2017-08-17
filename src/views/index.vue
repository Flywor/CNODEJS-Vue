<template>
  <div>
    <ul class="header">
        <li v-for="tab in tabs" @click="changeTab(tab.key)" :class="tab.key == searchKey.tab && 'actived'">
        {{ tab.value }}
        </li>
    </ul>
    <div class="itemList" @scroll="scrollGet">
      <list :items="items" :tabs="tabs"></list>
    </div>
  </div>
</template>

<script>
import API from '../api/cnodejs-api.js'
import list from '../components/list.vue'
import { throttle } from '../utils/common.js'
export default {
  data () {
    return {
      searchKey: {
        page: 1,
        limit: 20,
        tab: 'all',
        mdrender: true
      },
      hasNext: true,
      items: [],
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
          value: '测试'
        }
      ]
    }
  },
  methods: {
    changeTab (key) {
      this.searchKey.tab = key
      this.searchKey.page = 1
      this.items = []
      this.getTopics()
    },
    getTopics () {
      API.GetTopics(this.searchKey).then(rs => {
        this.searchKey.page++
        this.items.push(...rs)
        this.hasNext = rs.length === 20
      })
    },
    scrollGet (e) {
      if (!this.hasNext) return
      throttle.listener(this.getTopics, 1)
    }
  },
  mounted () {
    this.getTopics()
  },
  components: {
    list
  }
}
</script>
<style scoped>
.header{
  display: flex;
  border-bottom: 1px solid #F89062;
}
.header li {
  display: block;
  cursor: pointer;
  flex: 1;
  padding: 7px 0;
  text-align: center;
  font-size: 1.2em;
  color: #F89062;
  transition: background 1s;
}
.header li.actived{
  background-color: #F89062;
  color: white;
}
.itemList{
  height: 95%;
  width: 200%;
  overflow-y: scroll;
}
</style>

