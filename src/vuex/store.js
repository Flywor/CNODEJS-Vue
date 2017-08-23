import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab.js'
import user from './user.js'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
      items: [],
      searchKey: {
        page: 1,
        limit: 20,
        tab: 'all',
        mdrender: true
      },
      ...tab.state,
      ...user.state
    },
    getters: {
      ...tab.getters,
      ...user.state
    },
    mutations: {
      setSearchPage (state, page = 1) {
        state.searchKey.page = page
      },
      setSearchTab (state, tab) {
        state.searchKey.tab = tab
      },
      setItems (state, items) {
        state.items = items
      },
      pushItems (state, items) {
        state.items.push(...items)
      },
      ...tab.mutations,
      ...user.state
    },
    actions: {
      setSearchPage ({ commit }, page) {
        commit('setSearchPage', page)
      },
      setSearchTab({ commit }, tab) {
        commit('setSearchTab', tab)
      },
      setItems({ commit }, items) {
        commit('setItems', items)
      },
      pushItems ({ commit }, items) {
        commit('pushItems', items)
      },
      ...tab.actions,
      ...user.state
    }
})

export default store