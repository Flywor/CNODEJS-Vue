const tab = {
    state: {
      nvTitle: {
        key: 'all',
        value: '全部'
      },
      changeTab: () => {},
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
    },
    getters: {
      getTabs(state) {
        return state.tabs
      },
      getTitle (state) {
        return state.nvTitle
      }
    },
    mutations: {
      setTitle(state, title) {
        state.nvTitle = title
      },
      setChangeTab (state, callback) {
        state.changeTab = callback
      }
    },
    actions: {
      setTitle({ commit }, title) {
        commit('setTitle', title)
      },
      setChangeTab ({ commit }, callback) {
        commit('setChangeTab', callback)
      }
    }
}

export default tab;