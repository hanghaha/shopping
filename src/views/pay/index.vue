<template>
  <div class="box">
     <header class="header">
      <van-nav-bar
        title="支付"
        left-arrow
        @click-left="back"
      ></van-nav-bar>
    </header>
    <div class="content">
      <div class="payBox">
        <van-image :src="url"></van-image>
        <div>{{ tip }}</div>
      </div>
      <van-submit-bar button-text="支付" @submit="onSubmit">
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Dialog, SubmitBar, Image as VanImage } from 'vant'
import { payment } from '@/api'
import { mapGetters } from 'vuex'
Vue.use(NavBar)
Vue.use(Dialog)
Vue.use(VanImage)
Vue.use(SubmitBar)
export default {
  data () {
    return {
      url: '',
      timer: null,
      count: 6,
      tip: ''
    }
  },
  computed: {
    ...mapGetters({
      totalNum: 'totalNum'
    })
  },
  // sockets: {
  //   getData () { // 后端接口主动通过 socket 通讯触发此函数
  //     // 查看订单页面
  //   }
  // },
  methods: {
    // 倒计时模拟了支付环节 真实应该使用socket vue中使用vue-socket.io 实现 socket.io
    onSubmit () {
      payment({
        body: this.totalNum + '件商品',
        out_trade_no: this.$route.params.time,
        total_fee: 1
      }).then(res => {
        this.url = res.data.data
        // 倒计时 模拟 支付时间， 倒计时6秒之后，更新一次 time对应的订单的状态 state
        this.timer = setInterval(() => {
          this.count--
          this.tip = '正在支付中...'
          if (this.count === 0) {
            clearInterval(this.timer)
            this.$router.push('/cart')
          }
        }, 1000)
      })
    },
    back () {
      Dialog.confirm({
        message: '亲，您确定取消支付吗'
      }).then(() => {
        this.$router.back()
      }).catch(() => {
        // on cancel
      })
    }
  }
}
</script>
