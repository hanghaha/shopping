import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Footer from './../components/Footer.vue' // Footer多次被使用
Vue.use(VueRouter)
// 解决重复点击导航路由报错
const originalPush = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  // 一定要放在最开始，路由的匹配是从上到下，匹配到即停止
  // {
  //   path: '/',
  //   redirect: '/home'
  // },
  {
    path: '/',
    redirect: {
      name: 'home'
    }
  },
  {
    path: '/home',
    name: 'home', // 命名路由
    components: { // 路由懒加载 页面使用时才加载 - 路由的懒加载 webpackChunkName - 分解打包的js文件
      default: () => import(/* webpackChunkName: "base" */ './../views/home/index.vue'),
      footer: Footer
    },
    meta: {
      keepAlive: true // 路由的元信息，开启缓存
    }
  },
  {
    path: '/kind',
    alias: '/k',
    name: 'kind',
    components: {
      default: () => import(/* webpackChunkName: "base" */ './../views/kind/index.vue'),
      footer: Footer
    }
  },
  {
    path: '/kindlist',
    name: 'kindlist',
    components: {
      default: () => import(/* webpackChunkName: "base" */ './../views/kind/list.vue')
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "base" */ './../views/cart/index.vue')
    // 路由独享的导航守卫
    // beforeEnter: (to, from, next) => {
    //   if (localStorage.getItem('loginState') === 'true') {
    //     next()
    //   } else {
    //     next('/login')
    //   }
    // }
  },
  {
    path: '/user',
    name: 'user',
    components: {
      default: () => import(/* webpackChunkName: "base" */ './../views/user/index.vue'),
      footer: Footer
    }
  },
  {
    path: '/userset',
    name: 'userset',
    components: {
      default: () => import(/* webpackChunkName: "user" */ './../views/user/set.vue')
    }
  },
  {
    path: '/detail/:proid',
    name: 'detail',
    components: {
      default: () => import(/* webpackChunkName: "base" */ './../views/detail/index.vue')
    },
    props: { // 命名视图需要写成对象 如果没有命名视图  props: true
      default: true
    }
  },
  {
    path: '/register',
    name: 'register',
    components: {
      default: () => import(/* webpackChunkName: "user" */ './../views/register/index.vue')
    }
  },
  {
    path: '/login',
    name: 'login',
    components: {
      default: () => import(/* webpackChunkName: "user" */ './../views/login/index.vue')
    }
  },
  {
    path: '/order/:time',
    name: 'order',
    components: {
      default: () => import(/* webpackChunkName: "user" */ './../views/order/index.vue')
    }
  },
  {
    path: '/orderaddresslist/:time',
    name: 'orderaddresslist',
    components: {
      default: () => import(/* webpackChunkName: "order" */ './../views/order/addresslist.vue')
    }
  },
  {
    path: '/addressadd',
    name: 'addressadd',
    components: {
      default: () => import(/* webpackChunkName: "order" */ './../views/address/add.vue')
    }
  },
  {
    path: '/pay/:time',
    name: 'pay',
    components: {
      default: () => import(/* webpackChunkName: "order" */ './../views/pay/index.vue')
    }
  },
  {
    path: '/search',
    name: 'search',
    components: {
      default: () => import(/* webpackChunkName: "order" */ './../views/search/index.vue')
    }
  },
  {
    path: '/searchlist',
    name: 'searchlist',
    components: {
      default: () => import(/* webpackChunkName: "order" */ './../views/search/list.vue')
    }
  }
]

const router = new VueRouter({
  // hash 类似于前端中的 锚点   /#/home
  // history 类似于node项目中路由  /home   ----  项目上线需要后端的支持
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// 全局的导航守卫
// router.beforeEach((to, from, next) => {
//   console.log(to)
//   if (to.name === 'cart') {
//     if (localStorage.getItem('loginState') === 'true') {
//       next()
//     } else {
//       next('/login')
//     }
//   } else {
//     next()
//   }
// })
export default router
