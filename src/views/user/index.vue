<template>
  <div class="box">
    <header class="header">
      <van-nav-bar
        title="个人中心"
      >
        <template #right>
          <van-icon name="setting-o" size="24" @click="$router.push('/userset')"/>
        </template>
      </van-nav-bar>
    </header>
    <div class="content">
      <div class="imgbox">
        <div class="img">
          <van-uploader :after-read="getFileInfo">
             <van-image round width="100" height="100" :src="avatar" />
          </van-uploader>
        </div>
        <div class="info">
          <h3>{{ nickname }}</h3>
          <p>黄金会员</p>
        </div>
      </div>
      <van-grid>
        <van-grid-item icon="photo-o" text="待付款" />
        <van-grid-item icon="photo-o" text="待收货" />
        <van-grid-item icon="photo-o" text="待评价" />
        <van-grid-item icon="photo-o" text="我的订单" />
      </van-grid>
      <van-cell title="我的地址" is-link  />
      <van-cell title="我的收藏" is-link  />
      <van-cell title="我的足迹" is-link  />
      <van-cell title="我的优惠券" is-link  />
      <van-cell title="我的消息" is-link  >
        <template #default>
          <van-tag round type="danger" >1</van-tag>
        </template>
      </van-cell>
      <van-cell title="关于我们" is-link  />
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar, Button, Image as VanImage, Grid, GridItem, Cell, Tag, Icon, Uploader } from 'vant'
import { mapState } from 'vuex'
import { updateAvatar, getUserInfo } from '@/api'
Vue.use(NavBar)
Vue.use(Button)
Vue.use(VanImage)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Cell)
Vue.use(Tag)
Vue.use(Icon)
Vue.use(Uploader)
export default {
  // mapState辅助函数需要配合计算属性实现
  computed: {
    ...mapState({
      loginState: state => state.user.loginState,
      userid: state => state.user.userid
    })
  },
  beforeRouteEnter (to, from, next) {
    // if (localStorage.getItem('loginState') === 'true') {
    //   next()
    // } else {
    //   next('/login')
    // }
    next(vm => {
      console.log(vm)
      if (vm.loginState) {
        next()
      } else {
        next({
          path: '/',
          replace: true
        })
      }
    })
    // if (this.$store.state.user.loginState) {
    //   next()
    // } else {
    //   next('/login')
    // }
  },
  data () {
    return {
      avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
      nickname: ''
    }
  },
  mounted () {
    getUserInfo({
      userid: this.userid
      // userid: localStorage.getItem('userid')
    }).then(res => {
      console.log(res.data.data)
      this.avatar = res.data.data.avatar || ''
      this.nickname = res.data.data.nickname || ''
    })
  },
  methods: {
    getFileInfo (file) {
      console.log(file)
      updateAvatar({
        userid: this.userid,
        // userid: localStorage.getItem('userid'),
        avatar: file.content
      }).then(res => {
        this.avatar = file.content
      })
    }
  }
}
</script>

<style lang="scss">
.imgbox {
  padding: 30px 20px;
  display: flex;
  .img {
    width: 100px;
  }
  .info {
    padding: 10px 5px;
    flex: 1;
    margin-left: 30px;
    p {
      margin: 8px 0;
      color: #999;
    }
  }
}
</style>
