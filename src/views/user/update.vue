<template>
  <div class="box">
    <header class="header">
      <van-nav-bar
      title="设置"
      left-arrow
      @click-left="$router.back()"
      >
      <template #right>
        <span>保存</span>
      </template>
      </van-nav-bar>
    </header>
    <div class="content">
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar } from 'vant'
Vue.use(NavBar)
export default {
  data () {
    return {
    }
  }
}
</script>
<style lang="scss">
</style>