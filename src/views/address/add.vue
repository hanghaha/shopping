<template>
  <div class="box">
    <header class="header">
      <van-nav-bar
      title="地址编辑"
      left-arrow
      @click-left="$router.back()"
      ></van-nav-bar>
    </header>
    <div class="content">
      <van-address-edit
      :area-list="areaList"
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      />
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar, AddressEdit } from 'vant'
import areaList from './../../utils/area'
import { addressAdd } from './../../api'
Vue.use(NavBar)
Vue.use(AddressEdit)
export default {
  methods: {
    onSave (content) {
      console.log(content)
      content.isDefault = content.isDefault ? 1 : 0
      content.userid = localStorage.getItem('userid')
      addressAdd(content).then(() => {
        this.$router.back()
      })
    }
  },
  data () {
    return {
      areaList
    }
  }
}
</script>
