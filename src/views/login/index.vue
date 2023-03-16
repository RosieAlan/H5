<script lang="ts" setup>
import { ref, onUnmounted } from 'vue'
//vant
import { showToast, showSuccessToast, type FormInstance } from 'vant'
//路由
import { useRoute, useRouter } from 'vue-router'
// 规则
import { mobileRules, passwordRules, codeRules } from '@/utils/rules'
//pinia仓库
import { useUserStore } from '@/stores'
//接口
import { loginByPassword, sendMobileCode,loginByCode  } from '@/api/user'
//---------------------------------------------------------
//账号密码登录
const mobile = ref('13230000001')
const password = ref('abc12345')
const show = ref(false)
const agree = ref(false)
// 表单提交
const store = useUserStore()
const router = useRouter()
const route = useRoute()
const login = async () => {
  if (!agree.value) return showToast('请勾选我已同意')
    // 验证完毕，进行登录
    const res = isPass.value
    ? await loginByPassword(mobile.value, password.value)
    : await loginByCode(mobile.value, code.value)
    store.setUser(res.data)
    // 如果有回跳地址就进行回跳，没有跳转到个人中心
    router.push((route.query.returnUrl as string) || '/user')
    // 提示下
    showSuccessToast('登录成功~')
}
//---------------------------------------------------------
//短信登录
const isPass = ref(true)
const code = ref('') // 验证码
//vant
const time = ref(0)
//路由
const form = ref<FormInstance>()
// 规则

const send = async () => {
  if (time.value > 0) return
  try {
    await form.value?.validate('mobile')
    await sendMobileCode(mobile.value, 'login')
    showToast({
      type: 'success',
      message: '发送成功'
    })
    time.value = 60
    clearInterval(timerId)
    timerId = window.setInterval(() => {
      time.value--
      if (time.value <= 0) clearInterval(timerId)
    }, 1000)
  } catch (error) {
    console.log('---error---', error)
  }
}
//倒计时逻辑
let timerId: number
//生命周期,记得导入
onUnmounted(() => {
  clearInterval(timerId)
})
</script>

<template>
  <div class="login-page">
    <cp-nav-bar rightText="注册" @click-right="$router.push('/register')" />
    <!-- 头部 -->
    <div class="login-head">
      <h3>{{ isPass ? '密码登录' : '短信验证码登录' }}</h3>
      <a href="javascript:;" @click="isPass = !isPass">
        <span>{{ !isPass ? '密码登录' : '短信验证码登录' }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- 表单 -->
    <van-form autocomplete="off" @submit="login" ref="form">
      <van-field name="mobile" placeholder="请输入手机号" type="tel" v-model="mobile" :rules="mobileRules"></van-field>
      <van-field v-if="isPass" placeholder="请输入密码" :type="`${show ? 'text' : 'password'}`" v-model="password"
        :rules="passwordRules">
        <template #button>
          <cp-icon @click="show = !show" :name="`login-eye-${show ? 'on' : 'off'}`" />
        </template>
      </van-field>
      <van-field v-else v-model="code" :rules="codeRules" placeholder="短信验证码">
        <template #button>
          <span class="btn-send" :class="{ active: time > 0 }" @click="send">
            {{ time > 0 ? `${time}s后再次发送` : '发送验证码' }}
          </span>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button block round type="primary" native-type="submit">登 录</van-button>
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>
    <!-- 底部 -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &-page {
    padding-top: 46px;
  }

  &-head {
    display: flex;
    padding: 30px 30px 50px;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;

    h3 {
      font-weight: normal;
      font-size: 24px;
    }

    a {
      font-size: 15px;
    }
  }

  &-other {
    margin-top: 60px;
    padding: 0 30px;

    .icon {
      display: flex;
      justify-content: center;

      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}

.van-form {
  padding: 0 14px;

  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    .van-checkbox {
      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }
  }

  .btn-send {
    color: var(--cp-primary);

    &.active {
      color: rgba(22, 194, 163, 0.5);
    }
  }
}
</style>
