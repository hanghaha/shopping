<template>
  <div class="box">
    <header class="header">
      <van-nav-bar
        title="填写订单"
        left-arrow
        @click-left="back"
      ></van-nav-bar>
    </header>
    <div class="content">
      <van-cell-group>
        <van-cell v-if="flag" title="选择地址" is-link center @click="$router.push('/orderaddresslist/' + $route.params.time)" />
        <van-cell v-else :title="address" :label="username + '' + tel" is-link center @click="$router.push('/orderaddresslist/' + $route.params.time)"/>
      </van-cell-group>
      <van-card
        v-for="item of orderlist"
        :key="item.proid"
        :num="item.num"
        :price="item.price"
        :title="item.proname"
        :thumb="item.proimg"
      />
    </div>
    <van-submit-bar :price="totalPrice * 100" button-text="去支付" :disabled="address === ''" @submit="onSubmit">
    </van-submit-bar>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Dialog, Card, Cell, CellGroup, SubmitBar } from 'vant'
import { getTimeOrder, getDefaultAddress, deleteCartData } from './../../api'
Vue.use(NavBar)
Vue.use(Dialog)
Vue.use(Card)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(SubmitBar)
export default {
  methods: {
    onSubmit () {
      console.log('去支付')
      const arr = []
      this.orderlist.map(item => {
        arr.push(item.cartid)
      })
      // 调用删除选中的商品之后跳转
      deleteCartData({
        orderarrStr: JSON.stringify(arr)
      }).then((res) => {
        console.log(res.data)
        this.$router.replace('/pay/' + this.$route.params.time)
        // 购物车重置列表
        this.$store.commit('cart/change_cart_list', { data: [] })
      })
    },
    back () {
      Dialog.confirm({
        message: '亲，便宜不等人，请三思而行'
      }).then(() => {
        this.$router.back()
      }).catch(() => {
        // on cancel
      })
    }
  },
  computed: {
    totalNum () {
      return this.orderlist.reduce((sum, item) => {
        return sum + item.num
      }, 0)
    },
    totalPrice () {
      return this.orderlist.reduce((sum, item) => {
        return sum + item.num * item.price
      }, 0)
    }
  },
  data () {
    return {
      flag: true,
      orderlist: [],
      username: '',
      tel: '',
      address: ''
    }
  },
  mounted () {
    getTimeOrder({
      userid: localStorage.getItem('userid'),
      time: this.$route.params.time
    }).then(res => {
      console.log(res.data.data)
      this.orderlist = res.data.data
      if (this.orderlist[0].address.length === 0) {
        console.log('没有地址')
        this.flag = true
        getDefaultAddress({
          userid: localStorage.getItem('userid')
        }).then(res1 => {
          console.log('地址信息', res1.data)
          if (res1.data.data.length === 0) {
            this.flag = true
          } else {
            this.flag = false
            const obj = res1.data.data[0]
            this.username = obj.name
            this.tel = obj.tel
            const str = obj.province === obj.city ? obj.city : obj.province + obj.city
            this.address = str + obj.county + obj.addressDetail
          }
        })
      } else {
        console.log(this.orderlist[0].address)
        this.flag = false
        this.username = this.orderlist[0].username
        this.tel = this.orderlist[0].tel
        this.address = this.orderlist[0].address
      }
    })
  }
}
</script>
