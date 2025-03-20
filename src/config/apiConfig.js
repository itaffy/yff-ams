let env = ''
if (process.env.VUE_APP_CURRENT_MODE === 'development') {
  env = 'dev' // 开发环境
} else if (process.env.VUE_APP_CURRENT_MODE === 'test') {
  env = 'test' // test环境
} else if (process.env.VUE_APP_CURRENT_MODE === 'preview') {
  env = 'preview' // test环境
} else if (process.env.VUE_APP_CURRENT_MODE === 'production') {
  env = 'production' // 正式环境
}

const baseURL = {
  dev: '/Api',
  test: 'http://test.yffbalance.jisheyun.com/Api', // 测试
  staging: 'http://47.104.166.153:9038/Api', // 预发布
  production: 'https://c3api.jisheyun.com' // 预发布/生产
}
// 聚合支付接口
const payURL = {
  dev: '/pay',
  test: 'http://121.42.175.177:8049', // test 环境
  staging: 'http://121.42.242.91:8049', // 预发布
  production: 'https://c3.jisheyun.com/capi' // 生产
}
// 电能图表订单
const orderURL = {
  dev: '/order',
  test: 'https://c3.jisheyun.com/service/testorderapi', // test 环境
  staging: 'https://c3.jisheyun.com/service/orderapi', // 预发布
  production: 'https://c3.jisheyun.com/service/orderapi' // 生产
}

const config = {
  env,
  baseURL: baseURL[env],
  payURL: payURL[env],
  orderURL: orderURL[env],
}

module.exports = config