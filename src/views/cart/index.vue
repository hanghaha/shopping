<template>
  <div class="box">
    <header class="header">
      <van-nav-bar
      title="购物车"
      left-arrow
      @click-left="$router.back()"
      />
    </header>
    <div class="content cartcontent">
      <van-loading type="spinner" v-if="lenFlag"/>
      <div class="noshop" v-if="lenFlag">
         <!-- v-if="flag" -->
        <van-empty description="购物车空空如也">
          <van-button round type="danger" class="bottom-button" @click="$router.push('/home')">
            去逛逛
          </van-button>
        </van-empty>
      </div>
      <div v-else style="padding-bottom: 95px">
        <van-notice-bar mode="closeable">
          向左滑动可以显示删除按钮
        </van-notice-bar>
        <van-swipe-cell v-for="(item, index) of cartlist" :key="item.cartid">
          <van-card
            :price="item.price"
            :title="item.proname"
            class="goods-card"
          >
          <template #num>
            <van-stepper v-model="item.num" :name="item.cartid" theme="round" button-size="22" disable-input @change="changeNum" />
          </template>
          <template #thumb>
            <van-checkbox class="aaa" v-model="item.flag" @change="selectItem(item)"></van-checkbox>
            <van-image :src="item.proimg"></van-image>
          </template>
          </van-card>
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" @click="deleteItem(item, index)" />
          </template>
        </van-swipe-cell>
        <van-submit-bar :price="totalPrice * 100" button-text="去结算" :disabled="totalNum === 0" @submit="onSubmit">
          <van-checkbox v-model="checked" @click="selectAll">全选</van-checkbox>
          <template #tip>
            您本次共选择了 <span style="font-size: 16px;color: black;font-weight:bold">{{ totalNum }}</span> 件商品
          </template>
        </van-submit-bar>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { getCartData, deleteCart, updateCart, updateAllFlag, updateItemFlag, addOrder } from './../../api'
import { Toast, Empty, Button, Card, SwipeCell, Stepper, Dialog, SubmitBar, Checkbox, NoticeBar, NavBar, Image as VanImage, CheckboxGroup, Loading } from 'vant'
import { mapMutations } from 'vuex'
Vue.use(Toast)
Vue.use(Empty)
Vue.use(Button)
Vue.use(Card)
Vue.use(SwipeCell)
Vue.use(Stepper)
Vue.use(Dialog)
Vue.use(Checkbox)
Vue.use(SubmitBar)
Vue.use(NoticeBar)
Vue.use(NavBar)
Vue.use(VanImage)
Vue.use(CheckboxGroup)
Vue.use(Loading)
export default {
  beforeRouteEnter (to, from, next) {
    if (localStorage.getItem('loginState') === 'true') {
      next()
    } else {
      next('/login')
    }
  },
  data () {
    return {
      cartlist: [], // 列表
      checked: true, // 代表的全选是不是被选中
      testflag: true // 标识
      // 通过计算属性解决购物车空空如也问题
      // flag: false
    }
  },
  methods: {
    ...mapMutations({
      change_cart_list: 'cart/change_cart_list'
    }),
    selectItem (item) {
      console.log(item.flag)
      updateItemFlag({
        cartid: item.cartid,
        num: item.flag ? 1 : 0
      }).then(() => {
        if (item.flag) {
          const val = this.cartlist.every(item => {
            return item.flag
          })
          this.checked = val
          this.testflag = val
        } else {
          this.checked = false
          this.testflag = false
        }
        this.change_cart_list({ data: this.cartlist })
      })
    },
    selectAll (event) {
    // 每点击一次切换标识
      this.testflag = !this.testflag
      // 选中状态和标识一致
      this.checked = this.testflag
      // 更新选中的状态
      updateAllFlag({
        userid: localStorage.getItem('userid'),
        num: this.checked ? 1 : 0 // 选中状态为boolean类型，后端接收的是number类型
      }).then(res => {
      // 前端效果的更新 - 全选选中 则全部选中， 全选不选中，则全部不选中
        this.cartlist.map(item => {
          item.flag = this.checked
        })
        this.change_cart_list({ data: this.cartlist })
      })
    },
    onSubmit () {
      console.log('提交订单')
      const arr = []
      this.cartlist.map(item => {
        if (item.flag) {
          arr.push(item)
        }
      })
      const arrStr = JSON.stringify(arr)
      // 调用接口
      addOrder({
        userid: localStorage.getItem('userid'),
        arrStr: arrStr
      }).then(res => {
        console.log(res)
        this.$router.push('/order/' + res.data.time)
      })
    },
    changeNum (value, detail) {
      console.log(value, detail)
      updateCart({
        cartid: detail.name,
        num: value
      }).then(res => {
        // 更新成功
        this.change_cart_list({ data: this.cartlist })
      })
    },
    deleteItem (item, index) {
      Dialog.confirm({
        message: '亲，确定删除吗'
      }).then(() => {
        // on confirm
        deleteCart({
          cartid: item.cartid
        }).then(res => {
          // 删除之后更新列表数据
          this.cartlist.splice(index, 1)
          this.change_cart_list({ data: this.cartlist })
          // 解决购物车空空如也问题
          // if (this.cartlist.length === 0) {
          //   Toast('购物车空空如也')
          //   this.flag = true
          // } else {
          //   this.flag = false
          // }
        })
      }).catch(() => {
        // on cancel
      })
    }
  },
  // watch: {
  //   checked (val) {
  //     console.log(val)
  //     if (val) {
  //       this.cartlist.map(item => {
  //         item.flag = true
  //       })
  //     } else {
  //       this.cartlist.map(item => {
  //         item.flag = false
  //       })
  //     }
  //   }
  // },
  // 通过计算属性解决购物车空空如也问题
  computed: {
    totalNum () {
      return this.cartlist.reduce((sum, item) => {
        return item.flag ? sum + item.num : sum + 0
      }, 0)
    },
    totalPrice () {
      return this.cartlist.reduce((sum, item) => {
        return item.flag ? sum + item.num * item.price : sum + 0
      }, 0)
    },
    lenFlag () {
      if (this.cartlist.length === 0) {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    getCartData({
      userid: localStorage.getItem('userid')
    }).then(res => {
      // 运用计算属性此处省略
      // if (res.data.data.length === 0) {
      //   Toast('购物车空空如也')
      //   this.flag = true
      // } else {
      //   this.cartlist = res.data.data
      //   this.flag = false
      // }
      // 计算属性添加语句
      this.cartlist = res.data.data
      // 其中一个为假，则为假，全部为真，则为真
      const val = this.cartlist.every(item => {
        return item.flag
      })
      this.checked = val
      this.testflag = val
    })
  }
}
</script>

<style lang="scss">
.cartcontent {
  .goods-card {
    margin: 0;
    background-color: #fff;
  }

  .delete-button {
  height: 100%;
  }
  .aaa {
    width: 30px;
    height: 54px;
    display: inline-block;
  }
  .van-card__thumb {
    width: 128px;
    .van-image {
      width: 90px;
      img {
        width: 88px;
        height: 88px;
      }
    }
  }
}

</style>
