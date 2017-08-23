<template>
  <ul class="foot">
      <li v-for="tab in tabs" @click="clickTab(tab)" :class="tab.value === nvTitle.value && 'actived'">
        <label>{{ tab.value }}</label>
      </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex';
import API from '../api/cnodejs-api.js'
import loading from '../utils/loading.js'
export default {
  computed: mapState([
    'tabs',
    'nvTitle',
    'searchKey'
  ]),
  methods: {
    clickTab (tab) {
      loading.show()
      sessionStorage.clear()
      this.$store.dispatch('setTitle', tab)
      this.$store.dispatch('setSearchTab', tab.key)

      API.GetTopics(this.searchKey).then(rs => {
        loading.hide()
        this.$store.dispatch('setItems', rs)
        this.$store.dispatch('setSearchPage', 1)
      })
    }
  }
}
</script>
<style scoped>
.foot{
  display: flex;
  border-top: 1px solid #f1f1f1;
  font-size: 1.4em;
  height: 50px;
  line-height: 50px;
  width:100%;
  box-shadow: 0 0 7px rgba(0,0,0,.25);
  background:white;
  position: fixed;
  bottom:0;
  left:0;
  z-index: 1;
}
.foot li {
  display: block;
  cursor: pointer;
  flex: 1;
  text-align: center;
  color: #80bd01;
  transition: all 1s;
}
.foot li label{
  display:inline-block;
  vertical-align: middle;
}
.foot li.actived{
  background-color:#80bd01;
  color: white;
}
</style>

