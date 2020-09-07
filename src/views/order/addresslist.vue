<template>
  <div class="box">
    <header class="header">
       <van-nav-bar
        title="选择地址"
        left-arrow
        @click-left="back"
      ></van-nav-bar>
    </header>
    <div class="content">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @click-item="selectItem"
        @add="onAdd"
        @edit="onEdit"
      />
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar, AddressList, Toast } from 'vant'
import { getAddresslist, updateOrderAddress } from './../../api'
Vue.use(NavBar)
Vue.use(AddressList)
Vue.use(Toast)
export default {
  methods: {
    back () {
      this.$router.back()
    },
    selectItem (item, index) {
      console.log(index, item)
      // 每选中一次地址，更新一次地址
      item.username = item.name
      item.time = this.$route.params.time
      updateOrderAddress(item).then(res => {
        this.$router.back()
      })
    },
    onAdd () {
      Toast('新增地址')
      this.$router.push('/addressadd')
    },
    onEdit (item, index) {
      Toast('编辑地址:' + index)
    }
  },
  mounted () {
    getAddresslist({
      userid: localStorage.getItem('userid')
    }).then(res => {
      const arr = res.data.data
      arr.map(item => {
        item.address = item.province === item.city ? item.province + item.county + item.addressDetail : item.province + item.city + item.county + item.addressDetail
        item.isDefault = item.isDefault === 1
        item.id = item.addressid
      })
      this.list = res.data.data
    })
  },
  data () {
    return {
      chosenAddressId: '1',
      list: []
    }
  }
}
</script>
