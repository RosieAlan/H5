<template>
  <div class="">
    <van-button type="primary" @click="login">登录</van-button>
    &nbsp; &nbsp;
    <van-button type="primary" @click="getUserInfo">获取用户信息</van-button>
  </div>
</template>

<script lang="ts" setup>
import { request } from '@/utils/request'
import { useUserStore } from '@/stores'
import type { User } from '@/types/user'
const store = useUserStore()
// 登录
const login = () => {
  request<User>('login/password', 'POST', {
    mobile: '13211112222',
    password: 'abc12345'
  })
    .then(res => {
      console.log(res)
      store.setUser(res.data)
    })
    .catch(err => {
      console.log('err is ', err)
    })
}
// 获取用户信息
const getUserInfo = () => {
  request<User>('patient/myUser')
    .then(res => {
      console.log(res.data)
    })
    .catch(error => {
      console.log('error is ', error)
    })
}
</script>
