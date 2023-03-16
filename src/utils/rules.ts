import type { FieldRule } from 'vant'

const mobileRules: FieldRule[] = [
  {
    required: true,
    message: '手机号不能为空'
  },
  {
    pattern: /^1[3-9]\d{9}$/,
    message: '手机号格式不正确'
  }
]

const passwordRules: FieldRule[] = [
  {
    required: true,
    message: '密码不能为空'
  },
  {
    pattern: /^\w{8,24}$/,
    message: '密码需8-24个字符'
  }
]

export { mobileRules, passwordRules }
