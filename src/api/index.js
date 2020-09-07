import request from './../utils/request'

// 请求轮播图数据
export function getBannerData () {
  return request.get('/banner')
}

// 获取列表的数据 limit + count
export function getProData (params) {
  return request.get('/pro', { params })
}

// 请求数据详情 proid
export function getProDetailData (params) {
  return request.get('/pro/detail', { params })
}

// 发送短信验证码
export function sendCode (params) {
  return request.post('/user/sendCode', params)
}

// 注册
export function register (params) {
  return request.post('/user/register', params)
}

// 登录
export function login (params) {
  return request.post('/user/login', params)
}

// 获取购物车数据
export function getCartData (params) {
  return request.get('/cart', { params })
}

// 加入购物车
export function addCart (params) {
  return request.post('/cart/add', params)
}

// 删除购物车数据
export function deleteCart (params) {
  return request.get('/cart/delete', { params })
}

// 更新购物车
export function updateCart (params) {
  return request.get('/cart/update', { params })
}

// 全选 / 全不选
export function updateAllFlag (params) {
  return request.get('/cart/updateAllFlag', { params })
}

// 列表的选项
export function updateItemFlag (params) {
  return request.get('/cart/updateItemFlag', { params })
}

// 订单的添加
export function addOrder (params) {
  return request.post('/order/add', params)
}

// 获取订单的信息
export function getTimeOrder (params) {
  return request.post('/order/getTimeOrder', params)
}

// 更新订单的地址
export function updateOrderAddress (params) {
  return request.post('/order/updateOrderAddress', params)
}

// 删除购物车的数据
export function deleteCartData (params) {
  return request.post('/order/deleteCartData', params)
}

// 添加地址
export function addressAdd (params) {
  return request.post('/address/add', params)
}

// 获取地址
export function getAddresslist (params) {
  return request.get('/address', { params })
}

// 获取默认地址
export function getDefaultAddress (params) {
  return request.get('/address/default', { params })
}

// 搜索
export function getSearchData (params) {
  return request.get('/search', { params })
}

// 获取分类的列表
export function getKindListData () {
  return request.get('/search/kindlist')
}

// 根据分类查询品牌数据
export function getBrandListData (params) {
  return request.get('/search/brandlist', { params })
}

// 根据分类获取某品牌的商品列表
export function getKindandbrandlist (params) {
  return request.get('/search/kindandbrandlist', { params })
}

// 更新头像
export function updateAvatar (params) {
  return request.post('/user/updateAvatar', params)
}

// 获取个人信息
export function getUserInfo (params) {
  return request.get('/user/getUserInfo', { params })
}

// 支付
export function payment (params) {
  return request.get('/order/payment', { params })
}

// 更新订单状态
export function updateOrderState (params) {
  return request.post('/order/updateOrderState', params)
}
