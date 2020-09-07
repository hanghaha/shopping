<template>
  <div class="box">
    <header class="header">
      <van-nav-bar>
        <template #left>
          <van-icon name="wap-nav" />
        </template>
         <template #title>
           <div class="searchBg" @click="$router.push('/search')">🔍&nbsp;&nbsp;请输入您要搜索的产品关键词</div>
      </template>
       <template #right>
         登录
      </template>
      </van-nav-bar>
    </header>
    <div class="content" ref="content" id="content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item of bannerlist" :key="item.bannerid">
          <van-image
            width="3.75rem"
            fit="contain"
            :src="item.img"
          />
        </van-swipe-item>
      </van-swipe>
      <van-grid :column-num="5" :border="false">
        <van-grid-item icon="//m.360buyimg.com/mobilecms/s120x120_jfs/t1/125678/35/5947/4868/5efbf28cEbf04a25a/e2bcc411170524f0.png.webp" text="京东超市" />
        <van-grid-item icon="//m.360buyimg.com/mobilecms/s120x120_jfs/t1/135931/4/3281/5598/5efbf2c0Edbdc82c7/ed9861b4ddfb9f30.png.webp" text="数码电器" />
        <van-grid-item icon="//m.360buyimg.com/mobilecms/s120x120_jfs/t1/140012/8/1804/3641/5efbf318E38bd5dad/0db99d859ab16ce9.png.webp" text="京东服饰" />
        <van-grid-item icon="//m.360buyimg.com/mobilecms/s120x120_jfs/t1/129215/21/5978/3618/5efbf344Ebec23ae8/59712d986b10bb0a.png.webp" text="京东生鲜" />
        <van-grid-item icon="//m.360buyimg.com/mobilecms/s120x120_jfs/t1/116602/7/11200/3796/5efbf375Ebba41029/f07cc166f368fa05.png.webp" text="京东到家" />
        <van-grid-item icon="//m.360buyimg.com/mobilecms/s120x120_jfs/t1/146390/3/1846/4909/5efbf39aEe5f5f797/300071558a9ab078.png.webp" text="充值缴费" />
        <van-grid-item icon="//m.360buyimg.com/mobilecms/s120x120_jfs/t1/143365/25/1824/3716/5efbf3c0E5175e1fb/88f6227257a29f1d.png.webp" text="9.9拼" />
        <van-grid-item icon="//m.360buyimg.com/mobilecms/s120x120_jfs/t1/113589/24/11332/4897/5efbf3feE705d87db/e5c12d5e943266b9.png.webp" text="领券" />
        <van-grid-item icon="//m.360buyimg.com/mobilecms/s120x120_jfs/t1/131663/33/3380/3674/5efbf50fEf79cf314/af4b57d2383e605d.png.webp" text="领津贴" />
        <van-grid-item icon="//m.360buyimg.com/mobilecms/s120x120_jfs/t1/123730/37/5924/4189/5efbf567E0a226121/d04df7c74c87cf68.png.webp" text="plus会员" />
      </van-grid>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
      <!-- 字符串拼接写法 -->
       <!-- <router-link :to="'/detail/' + item.proid"  v-for="item of prolist"
              :key="item.proid">
            <van-card
              :price="item.price"
              :desc="item.desc"
              :title="item.proname"
              :thumb="item.proimg"
            />
          </router-link> -->
          <!-- 命名路由传递参数 -->
          <!-- <router-link :to="{ name: 'detail', params: { proid: item.proid}}"  v-for="item of prolist"
              :key="item.proid">
            <van-card
              :price="item.price"
              :desc="item.desc"
              :title="item.proname"
              :thumb="item.proimg"
            />
          </router-link> -->
          <!-- <van-card
          v-for="(item, index) of prolist"
          :key="item.proid"
          :num="index + 1"
          :price="item.price"
          :desc="item.desc"
          :title="item.proname"
          :thumb="item.proimg"
          @click="$router.push('/detail/' + item.proid)"
          /> -->
          <!-- <van-card
          v-for="(item, index) of prolist"
          :key="item.proid"
          :num="index + 1"
          :price="item.price"
          :desc="item.desc"
          :title="item.proname"
          :thumb="item.proimg"
          @click="$router.push({ name: 'detail', params: { proid: item.proid }})"
          /> -->
           <!-- <van-card
            v-for="(item, index) of prolist"
            :key="item.proid"
            :num="index + 1"
            :price="item.price"
            :desc="item.desc"
            :title="item.proname"
            :thumb="item.proimg"
            @click="$router.push({ path: '/detail/' + item.proid})"
            /> -->
            <!-- js中使用编程式跳转 -->
             <van-card
              v-for="(item, index) of prolist"
              :key="item.proid"
              :num="index + 1"
              :price="item.price"
              :desc="item.desc"
              :title="item.proname"
              :thumb="item.proimg"
              @click="toDetail(item)"
            />
        </van-list>
      </van-pull-refresh>
      <div class="backtop" @click="backtop" v-show="flag">
        ⬆️
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Swipe, SwipeItem, Image as VanImage, Card, Grid, GridItem, List, PullRefresh, NavBar, Icon } from 'vant'
import { getBannerData, getProData } from './../../api'
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(VanImage)
Vue.use(Card)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(NavBar)
Vue.use(Icon)

export default {
  // router跳转离开前，记录当前页面的位置
  beforeRouteLeave (to, from, next) {
    this.scroll = this.$refs.content.scrollTop
    next()
  },
  // 页面进入前
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$refs.content.scrollTop = vm.scroll
    })
  },
  data () {
    return {
      flag: false,
      bannerlist: [],
      isLoading: false, // 当前是不是处于下拉加载的状态中
      prolist: [],
      count: 1, // 默认加载了第一页的数据 --- 更具后端的接口设定
      loading: false, // 默认不加载
      finished: false // 默认数据没有完全加载完毕 --- 如果只为true，那么就可以再继续上拉了
    }
  },
  methods: {
    toDetail (item) {
      // this.$router.push('/detail' + item.proid)
      // this.$router.push({ name: 'detail', params: { proid: item.proid } })
      this.$router.push({ path: '/detail/' + item.proid })
    },
    onRefresh () {
      this.isLoading = true
      getProData().then(res => {
        this.isLoading = false
        this.prolist = res.data.data
        this.count = 1 // 页码重置
        this.finished = false // 保证数据可以正确的加载
      })
    },
    backtop () {
      this.$refs.content.scrollTop = 0
    },
    onLoad () { // 上拉加载的事件
      this.loading = true // 表示现在正是加载状态
      // 异步请求数据
      getProData({
        limit: 10,
        count: this.count
      }).then(res => {
        // 设置加载状态结束
        this.loading = false
        this.count++ // 每加载一次，页码加1
        // 判断本次请求有没有请求到数据，如果没有请求到数据，说明所有的数据已经全部展示出来了，如果有数据，拼接数据
        if (res.data.data.length === 0) {
          this.finished = true // 没有数据了
        } else {
          this.prolist = [...this.prolist, ...res.data.data] // 拓展运算符 合并数组
        }
      })
    }
  },
  mounted () {
    getBannerData().then(res => {
      console.log(res.data.data)
      this.bannerlist = res.data.data
    })
    getProData().then(res => {
      this.prolist = res.data.data
    })
    this.$refs.content.addEventListener('scroll', () => {
      console.log(this.$refs.content.scrollTop)
      if (this.$refs.content.scrollTop > 250) {
        this.flag = true
      } else {
        this.flag = false
      }
    })
  }
}
</script>

<style lang="scss">
  .my-swipe .van-swipe-item {
    height: 1.5rem;
    background-color: #efefef;
  }
  .backtop {
    position: fixed;
    font-size: 30px;
    right: 10px;
    bottom: 60px;
  }
  .searchBg {
    background-color: #efefef;
    padding: 5px 20px;
    color: #999;
    border-radius: 10px;
  }
  .van-nav-bar__title {
    max-width: 80%;
    margin: 0 auto;
    color: #323233;
    font-weight:normal;
    font-size: 16px;
  }
</style>
