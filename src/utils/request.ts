import axios from 'axios'
import { useUserStore } from '@/stores'
import { showToast } from 'vant'
import router from '@/router'
const baseURL = 'https://consult-api.itheima.net/'

// 创建实例
const instance = axios.create({
  baseURL,
  timeout: 10000
})

// 请求拦截器（携带token）
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const store = useUserStore()
    if (store.user?.token && config.headers) {
      config.headers.Authorization = `Bearer ${store.user.token}`
    }
    // 如果有则携带token
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器（处理token过期401）
instance.interceptors.response.use(
  function (res) {
    // 2xx 范围内的状态码都会触发该函数。
    // 当http状态码是2xx的时候，会进入到该回调函数，但是http状态码ok，不代表业务也是ok的
    if (res.data.code !== 10000) {
      showToast(res.data.message || '网络异常')
      return Promise.reject(res.data)
    }

    // 下面是正常返回响应体数据
    return res.data
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    if (error.response.status === 401) {
      // token过期了

      // 清除token
      const store = useUserStore()
      store.delUser()

      // 跳转到登录页面，并且传递重定向页面的参数
      // router.currentRoute.value.fullPath 当前路由的path
      router.push(`/login?redirect=${router.currentRoute.value.fullPath}`)
    }

    return Promise.reject(error)
  }
)
export { baseURL }
