import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)
// 将组件映射到路由 --- 路由的配置规则
// 先导入组件，然后 映射组件
// 路由的懒加载，用时再加载，用时再映射
// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]

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
    component: () => import(/* webpackChunkName: "base" */ './../views/home/index.vue')
  },
  {
    path: '/kind',
    alias: '/k',
    name: 'kind',
    component: () => import(/* webpackChunkName: "base" */ './../views/kind/index.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "base" */ './../views/cart/index.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "base" */ './../views/user/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
