import axios, { type Method } from 'axios'
import { useUserStore } from '@/stores'
import { showToast } from 'vant'
import router from '@/router'
import type { ApiRes } from '@/types/data'
const baseURL = 'https://consult-api.itheima.net/'

// 创建axios实例
const instance = axios.create({
  baseURL,
  timeout: 10000 // 超时时间10s
})

// 请求拦截器
// 会遇到问题:https://blog.csdn.net/m0_72976487/article/details/128559358
instance.interceptors.request.use(
  (config: any) => {
    const store = useUserStore()
    if (store.user?.token && config.headers) {
      config.headers['Authorization'] = `Bearer ${store.user?.token}`
    }

    return config
  },
  err => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  res => {
    // 当http状态码是2xx的时候，会进入到该回调函数，但是http状态码ok，不代表业务也是ok的
    if (res.data.code !== 10000) {
      showToast(res.data.message || '网络异常')
      return Promise.reject(res.data)
    }

    // 只返回请求体的数据
    return res.data
  },
  err => {
    // 当http的状态码是4xx、5xx的时候，会进入该回调函数
    if (err.response.status === 401) {
      // 我们这个项目，后台约定，token无效就是401
      const store = useUserStore()
      store.deleteUser()

      // 跳转到登录页面，并且携带回调地址
      router.push(`/login?returnUrl=${router.currentRoute.value.fullPath}`)
    }
    return Promise.reject(err)
  }
)

// 封装请求工具函数，方便到时候，对应的api进行调用
const request = <T>(
  url: string,
  method: Method = 'GET',
  submitData?: object
) => {
  /**
   * 参数1：泛型，但是这个类型，会赋值给res.data
   * 参数2：服务器返回数据的泛型，这个数据直接会赋值给res
   */
  return instance.request<T, ApiRes<T>>({
    url,
    method,
    [method.toLocaleLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}

export { baseURL, request }

