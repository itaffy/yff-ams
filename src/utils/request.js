import axios from 'axios'
import store from '@/store'
import storage from 'store'
import {message} from 'ant-design-vue'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'

// 创建 axios 实例
const request = axios.create({ 
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 60000 // 请求超时时间
})

const checkStatus = status => {
  switch (status) {
    case 400:
      message.error('请求失败！请您稍后重试')
      break
    case 401:
      message.error('登录失效！请您重新登录')
      const token = storage.get(ACCESS_TOKEN)
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
      break
    case 403:
      message.error('当前账号无权限访问！')
      break
    case 404:
      message.error('你所访问的资源不存在！')
      break
    case 405:
      message.error('请求方式错误！请您稍后重试')
      break
    case 408:
      message.error('请求超时！请您稍后重试')
      break
    case 500:
      message.error('服务异常！')
      break
    case 502:
      message.error('网关错误！')
      break
    case 503:
      message.error('服务不可用！')
      break
    case 504:
      message.error('网关超时！')
      break
    default:
      message.error('请求失败！')
  }
}

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    checkStatus(error.response.status)
    const data = error.response.data
    console.log('异常拦截 错误信息', data)
  } else {
    
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN)
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers[ACCESS_TOKEN] = token
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  if (!response.data.success) {
    message.error(response.data.msg)
  }
  return response.data
}, errorHandler)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
