const state = {
  // 页面刷线，状态管理器会重置
  cartlist: []
}

const actions = {}

// 唯一改变数据的方式 --- 组件提交 / action提交
const mutations = {
  change_cart_list (state, payload) {
    state.cartlist = payload.data
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
