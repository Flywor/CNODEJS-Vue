<template>
  <div>
    <div class="markdown-body" v-html="topic.content"></div>
  </div>
</template>

<script>
import API from '../api/cnodejs-api.js'
require('../assets/scss/github-markdown.css')
export default {
  data () {
    return {
      topic: {}
    }
  },
  mounted () {
    API.GetTopic(this.$route.params.id).then(rs => {
      this.topic = rs
    })
  }
}
</script>

<style scoped>
.markdown-body{
  width:100%;
  height:100%;
  overflow-y: scroll;
  padding: 5px;
  font-size: 14px;
}
</style>