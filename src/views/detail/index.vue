<template>
  <div class="box">
    <div class="content" ref="content">
      <header class="detailheader">
        <transition name="van-fade">
          <ul class="no" v-if="scrollTop < 44">
            <li @click="$router.back()">
              <van-icon name="arrow-left" />
            </li>
            <li></li>
            <li @click="showShare=true">
              <van-icon name="weapp-nav" />
            </li>
          </ul>
        </transition>
        <transition name="van-fade">
          <ul class="ok" v-if="scrollTop >= 44">
            <li @click="$router.back()">
              <van-icon name="arrow-left" />
            </li>
            <li>
              <div :class="activeindex === 0 ? 'active' : ''">商品</div>
              <div :class="activeindex === 1 ? 'active' : ''">评价</div>
              <div :class="activeindex === 2 ? 'active' : ''">详情</div>
              <div :class="activeindex === 3 ? 'active' : ''">推荐</div>
            </li>
            <li @click="showShare=true">
              <van-icon name="weapp-nav" />
            </li>
          </ul>
        </transition>
      </header>
      <div class="banner" @click="previewImages">
        <!-- <van-image :src="proimg" fit="contain"/>
         -->
         <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
           <van-swipe-item v-for="(item, index) of images" :key="index">
             <van-image height="375px" :src="item" fit="fill"/>
             </van-swipe-item>
           </van-swipe>
      </div>
      <div class="info">
        <!-- 价格 -->
        <div class="price">￥{{price}}</div>
        <!-- 品牌 + 名称 -->
        <div class="title">
          <h3><van-tag type="danger">{{ brand }}</van-tag> - {{ proname }}</h3>
        </div>
        <!-- 描述 -->
        <div class="desc van-multi-ellipsis--l3">
          {{ desc }}
        </div>
      </div>
       <div class="info">
        <!-- 价格 -->
        <div class="price">¥{{price}}</div>
        <!-- 品牌 + 名称 -->
        <div class="title">
          <h3> <van-tag type="danger">{{ brand }}</van-tag> - {{ proname }}</h3>
        </div>
        <!-- 描述 -->
        <div class="desc van-multi-ellipsis--l3">
          {{ desc }}
        </div>
      </div>
       <div class="info">
        <!-- 价格 -->
        <div class="price">¥{{price}}</div>
        <!-- 品牌 + 名称 -->
        <div class="title">
          <h3> <van-tag type="danger">{{ brand }}</van-tag> - {{ proname }}</h3>
        </div>
        <!-- 描述 -->
        <div class="desc van-multi-ellipsis--l3">
          {{ desc }}
        </div>
      </div>
       <div class="info" ref="appraise">
        <!-- 价格 -->
        <div class="price">¥{{price}}</div>
        <!-- 品牌 + 名称 -->
        <div class="title">
          <h3> <van-tag type="danger">{{ brand }}</van-tag> - {{ proname }}</h3>
        </div>
        <!-- 描述 -->
        <div class="desc van-multi-ellipsis--l3">
          {{ desc }}
        </div>
      </div>
       <div class="info">
        <!-- 价格 -->
        <div class="price">¥{{price}}</div>
        <!-- 品牌 + 名称 -->
        <div class="title">
          <h3> <van-tag type="danger">{{ brand }}</van-tag> - {{ proname }}</h3>
        </div>
        <!-- 描述 -->
        <div class="desc van-multi-ellipsis--l3">
          {{ desc }}
        </div>
      </div>
       <div class="info" ref="desc">
        <!-- 价格 -->
        <div class="price">¥{{price}}</div>
        <!-- 品牌 + 名称 -->
        <div class="title">
          <h3> <van-tag type="danger">{{ brand }}</van-tag> - {{ proname }}</h3>
        </div>
        <!-- 描述 -->
        <div class="desc van-multi-ellipsis--l3">
          {{ desc }}
        </div>
      </div>
       <div class="info">
        <!-- 价格 -->
        <div class="price">¥{{price}}</div>
        <!-- 品牌 + 名称 -->
        <div class="title">
          <h3> <van-tag type="danger">{{ brand }}</van-tag> - {{ proname }}</h3>
        </div>
        <!-- 描述 -->
        <div class="desc van-multi-ellipsis--l3">
          {{ desc }}
        </div>
      </div>
       <div class="info" ref="recommend">
        <!-- 价格 -->
        <div class="price">¥{{price}}</div>
        <!-- 品牌 + 名称 -->
        <div class="title">
          <h3> <van-tag type="danger">{{ brand }}</van-tag> - {{ proname }}</h3>
        </div>
        <!-- 描述 -->
        <div class="desc van-multi-ellipsis--l3">
          {{ desc }}
        </div>
      </div>
       <div class="info">
        <!-- 价格 -->
        <div class="price">¥{{price}}</div>
        <!-- 品牌 + 名称 -->
        <div class="title">
          <h3> <van-tag type="danger">{{ brand }}</van-tag> - {{ proname }}</h3>
        </div>
        <!-- 描述 -->
        <div class="desc van-multi-ellipsis--l3">
          {{ desc }}
        </div>
      </div>
       <div class="info">
        <!-- 价格 -->
        <div class="price">¥{{price}}</div>
        <!-- 品牌 + 名称 -->
        <div class="title">
          <h3> <van-tag type="danger">{{ brand }}</van-tag> - {{ proname }}</h3>
        </div>
        <!-- 描述 -->
        <div class="desc van-multi-ellipsis--l3">
          {{ desc }}
        </div>
      </div>
       <div class="info">
        <!-- 价格 -->
        <div class="price">¥{{price}}</div>
        <!-- 品牌 + 名称 -->
        <div class="title">
          <h3> <van-tag type="danger">{{ brand }}</van-tag> - {{ proname }}</h3>
        </div>
        <!-- 描述 -->
        <div class="desc van-multi-ellipsis--l3">
          {{ desc }}
        </div>
      </div>
      <van-share-sheet
      v-model = "showShare"
      title = "立即分享给好友"
      :options= "options"
      />
      <!-- 详情的底部 safe-area-insert-buttom -->
      <van-goods-action safe-area-inset-buttom>
        <van-goods-action-icon icon="chat-o" text="客服" dot />
        <van-goods-action-icon icon="cart-o" text="购物车" :badge="totalNum" @click="$router.push('/cart')"/>
        <van-goods-action-icon :icon="icon" :text="text" color="#ff5000" @click="collect"/>
        <van-goods-action-button type="warning" text="加入购物车" @click="addCartFn" />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import { getProDetailData, addCart } from './../../api'
import Vue from 'vue'
import { Image as VanImage, ImagePreview, Swipe, SwipeItem, GoodsAction, GoodsActionIcon, GoodsActionButton, Tag, Toast, Icon, ShareSheet } from 'vant'

Vue.use(VanImage)
Vue.use(ImagePreview)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(GoodsAction)
Vue.use(GoodsActionIcon)
Vue.use(GoodsActionButton)
Vue.use(Tag)
Vue.use(Toast)
Vue.use(Icon)
Vue.use(ShareSheet)
export default {
  props: ['proid'],
  data () {
    return {
      icon: 'star-o',
      text: '收藏',
      showShare: false,
      totalNum: this.$store.getters.totalNum || 0,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ],
      activeindex: 0,
      scrollTop: 0,
      // proid: '',
      proname: '',
      price: 0,
      proimg: '',
      desc: '',
      sales: 0,
      stock: 0,
      rating: 0,
      discount: 0,
      category: '',
      brand: '',
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ]
    }
  },
  methods: {
    collect () {
      // 获取本地的收藏的数据
      const collectArrStr = localStorage.getItem('collection') || '[]'
      const collectArr = JSON.parse(collectArrStr)
      const index = collectArr.indexOf(this.proid)
      if (index === -1) {
        collectArr.unshift(this.proid)
        this.icon = 'star'
        this.text = '已收藏'
      } else {
        collectArr.splice(index, 1)
        this.icon = 'star-o'
        this.text = '收藏'
      }
      localStorage.setItem('collection', JSON.stringify(collectArr))
    },
    addCartFn () {
      console.log(this.$store)
      // // 先判断本地的登录状态
      // if (localStorage.getItem('loginState') === 'true') { // 本地存储 存的都是字符串
      // // 本地显示已登录
      //   addCart({
      //     userid: localStorage.getItem('userid'),
      //     proid: this.proid,
      //     num: 1
      //   }).then(res => {
      //     console.log(res)
      //     if (res.data.code === '10030') {
      //       Toast('没有找到该产品')
      //     } else if (res.data.code === '10032') {
      //       Toast('库存不足')
      //     } else {
      //       Toast('加入购物车成功')
      //     }
      //   })
      // } else {
      // // 本地找不到登录状态
      //   this.$router.push('/login')
      // }
      if (this.$store.state.user.loginState) { // 本地存储，存的都是字符串
        // 本地显示已登录
        addCart({
          userid: this.$store.state.user.userid,
          proid: this.proid,
          num: 1
        }).then(res => {
          if (res.data.code === '10030') {
            Toast('没有找到该产品')
          } else if (res.data.code === '10032') {
            Toast('库存不足')
          } else {
            Toast('加入购物车成功')
            this.totalNum += 1
          }
        })
      } else {
        // 本地找不到登录状态
        this.$router.push('/login')
      }
    },
    previewImages () {
      ImagePreview(this.images)
    }
  },
  mounted () {
    const collectArrStr = localStorage.getItem('collection') || '[]'
    const collectArr = JSON.parse(collectArrStr)
    const index = collectArr.indexOf(this.proid)
    if (index === -1) {
      this.icon = 'star-o'
      this.text = '收藏'
    } else {
      this.icon = 'star'
      this.text = '已收藏'
    }
    this.totalNum = this.$store.getters.totalNum
    getProDetailData({
      proid: this.proid
    }).then(res => {
      console.log(res.data.data)
      // this.proid = res.data.data.proid
      this.proname = res.data.data.proname
      this.price = res.data.data.price
      this.proimg = res.data.data.proimg
      this.desc = res.data.data.desc
      this.sales = res.data.data.sales
      this.stock = res.data.data.stock
      this.rating = res.data.data.rating
      this.discount = res.data.data.discount
      this.category = res.data.data.category
      this.brand = res.data.data.brand
      this.images.unshift(this.proimg)
    })
    this.$refs.content.addEventListener('scroll', () => {
      this.scrollTop = this.$refs.content.scrollTop
      if (this.scrollTop > 0 && this.scrollTop < this.$refs.appraise.offsetTop) {
        this.activeindex = 0
      } else if (this.scrollTop > this.$refs.appraise.offsetTop && this.scrollTop < this.$refs.desc.offsetTop) {
        this.activeindex = 1
      } else if (this.scrollTop > this.$refs.desc.offsetTop && this.scrollTop < this.$refs.recommend.offsetTop) {
        this.activeindex = 2
      } else {
        this.activeindex = 3
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.info {
  padding: 0 10px 70px;
  .price {
    font-size: 32px;
    color: #f66;
    font-weight: bold;
  }
  .desc {
    margin: 10px 0;
  }
}
.banner {
  height: 3.75rem;
  overflow: hidden;
  .my-swipe {
    height: 3.75rem;
    overflow: hidden;
  }
}
.detailheader {
  width: 100%;
  height: 0.44rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  ul {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 0.44rem;
    display: flex;
    &.ok {
      background-color: #fff;
      li {
        .van-icon {
          background-color: #fff;
        }
      }
    }
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      &:nth-child(1), &:nth-child(3) {
        width: 50px;
      }
      &:nth-child(2) {
        flex: 1;
        display: flex;
        div {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          &.active {
            border-bottom: 3px solid #f66;
          }
        }
      }
      .van-icon {
        background-color: #ccc;
        padding: 12px;
        border-radius: 50%;
      }
    }
  }
}
.van-fade-enter-active {
  transition:  all 5s;
}
</style>
