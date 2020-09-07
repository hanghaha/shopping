import axios from 'axios'
import Router from './../router'
// process.env.NODE_ENV 环境变量
// development 开发环境  yarn serve /  cnpm run serve /  npm run serve
// prouction 生产环境 yarn build / cnpm run build / npm run build
const isDev = process.env.NODE_ENV === 'development'

// 提前配置好 接口的请求 路径，项目即使在上线时也无需修改
// 自定义axios
const request = axios.create({
  // http://localhost:3000/api/pro   ===>  /pro
  baseURL: isDev ? 'http://localhost:3000/api' : 'http://120.26.163.48/api',
  timeout: 16000
})

// 请求拦截器 - 所有的请求都要展示 加载状态laoding的效果 - 操作时需要登录的token信息
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么 - 发送token信息
  config.headers.common.token = localStorage.getItem('token')
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 响应拦截器 - 取消loading效果的展示
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log(response)
  if (response.data.code === '10119') {
    Router.push('/login')
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default request
