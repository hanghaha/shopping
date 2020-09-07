<template>
  <footer class="footer">
      <ul>
        <router-link to="/home" tag="li">
          <span class="iconfont icon-shouye"></span>
          <p>首页</p>
        </router-link>
         <router-link to="/kind" tag="li">
          <span class="iconfont icon-fenlei"></span>
          <p>分类</p>
        </router-link>
         <router-link to="/cart" tag="li">
          <span>
            <van-icon name="cart-o" :badge="$store.getters.totalNum" />
          </span>
          <p>购物车</p>
        </router-link>
         <router-link to="/user" tag="li">
          <span class="iconfont icon-ziyuan"></span>
          <p>我的</p>
        </router-link>
      </ul>
  </footer>
</template>

<script>
import Vue from 'vue'
import { Icon } from 'vant'
import { getCartData } from '@/api'
Vue.use(Icon)
export default {
  mounted () {
    if (localStorage.getItem('userid')) {
      getCartData({
        userid: localStorage.getItem('userid')
      }).then(res => {
        this.cartlist = res.data.data
        this.$store.commit('cart/change_cart_list', { data: this.cartlist })
      })
    } else {
      this.$store.commit('cart/change_cart_list', { data: [] })
    }
  }
}
</script>
