const state = {
  // 页面刷线，状态管理器会重置
  loginState: localStorage.getItem('loginState') || false,
  token: localStorage.getItem('token') || '',
  userid: localStorage.getItem('userid') || ''
}

const actions = {}

// 唯一改变数据的方式 --- 组件提交 / action提交
const mutations = {
  change_login_state (state, payload) {
    state.loginState = payload
  },
  changeToken (state, payload) {
    state.token = payload
  },
  changeUserid (state, payload) {
    state.userid = payload
  }
}

export default {
  namespaced: true, // 改变mutations user/change_login_states
  state,
  actions,
  mutations
}
