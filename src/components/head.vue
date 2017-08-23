<template>
  <div class="head">
    <span v-if="hasBack" @click="goBack"></span>
    <label>{{ nvTitle.value }}</label>
    <div v-if="isLogin"></div>
    <i @click="doLogin" v-else></i>
  </div>
</template>

<script>
import store from 'vuex';

export default {
  props: {
    hasBack: false,
    isLogin: false
  },
  computed: store.mapState([
    'nvTitle'
  ]),
  methods: {
    goBack () {
    },
    doLogin () {
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
.head{
  border-bottom: 1px solid #f1f1f1;
  height: 50px;
  width: 100%;
  font-size: 1.5em;
  text-align:center;
  background:white;
  position: fixed;
  z-index: 1;
  top:0;
  left:0;
  box-shadow: 0 0 7px rgba(0,0,0,.25);
}
.head span{
  display: inline-block;
  height: 60%;
  width: 5%;
  position: absolute;
  left: 5%;
  top: 20%;
  cursor: pointer;
}
.head span:before, .head span:after{
  content: '';
  width:.1em;
  height: 60%;
  background: black;
  position:absolute;
  border-radius: 10px;
  left:.5em;
}
.head span:before{
  top:0;
  transform: rotate(45deg);
}
.head span:after{
  top:42%;
  transform: rotate(-45deg);
}
.head:before{
  content: ' ';
  width: 1px;
  height: 100%;
  display:inline-block;
  vertical-align: middle;
}
.head label{
  display:inline-block;
  vertical-align: middle;
}
.head i{
  display: inline-block;
  position:absolute;
  top: 0;
  right:5%;
  height: 100%;
  width: 6%;
  background-image: url('../assets/images/self.png');
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
}
</style>

