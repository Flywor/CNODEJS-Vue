import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component (resolve) {
      require.ensure(['../views/index.vue'], () => {
        resolve(require('../views/index.vue'))
      })
    }
  },
  {
    path: '/topic/:id',
    name: 'topic',
    component (resolve) {
      require.ensure(['../views/topic.vue'], () => {
        resolve(require('../views/topic.vue'))
      })
    }
  }]
})
