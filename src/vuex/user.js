const user = {
  state: {
    user: {}
  },
  getters: {
    getUser(state) {
      return state.user
    }
  },
  mutations: {
    setUser(state, user) {
      state.user =user
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user)
    }
  }
}

export default user