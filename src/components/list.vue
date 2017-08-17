<template>
  <ul class="list">
    <li v-for="item in items" @click="toTopic(item.id)">
      <img :src="item.author.avatar_url" :title="item.author.loginname"/>
      <div>
        <h3>
          <span v-if="item.top" class="top">置顶</span>
          <span v-else-if="item.good" class="good">{{ buidTag('good') }}</span>
          <span v-else :class="item.tab">{{ buidTag(item.tab) }}</span>
          {{ item.title }}
        </h3>
        <div>
          <p>{{item.author.loginname}}</p>
          <p class="right">
            {{ item.last_reply_at  | getLastTimeStr(true) }}
            <label>{{ item.reply_count }}</label>/{{ item.visit_count }}
          </p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import timeformat from '../utils/timeformat.js'
export default {
  filters: {
    getLastTimeStr (time, isFromNow) {
      return timeformat.getLastTimeStr(time, isFromNow)
    }
  },
  props: ['items', 'tabs'],
  methods: {
    toTopic (id) {
      this.$router.push({
        name: 'topic',
        params: {
          id
        }
      })
    },
    buidTag (type) {
      let temp = ''
      this.tabs.map(tab => {
        if (tab.key === type) temp = tab.value
      })
      return temp
    }
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
h3 span{
  vertical-align:top;
  padding: 2px 3px;
  font-size: .5em;
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
label{
  color: #CF881E;
  font-weight: bold; 
}
</style>
