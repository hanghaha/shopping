import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import cart from './modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    cart
  },
  getters: {
    totalNum (state) {
      return state.cart.cartlist.reduce((sum, item) => {
        return item.flag ? sum + item.num : sum + 0
      }, 0)
    }
  }
})
