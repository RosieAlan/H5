export interface User {
    /**
     * 用户名
     */
    account: string
    /**
     * 头像
     */
    avatar: string
    /**
     * 用户id
     */
    id: string
    /**
     * 脱敏手机号，带星号的手机号
     */
    mobile: string
    /**
     * refreshToken
     */
    refreshToken: string
    /**
     * token
     */
    token: string
  }
  // 短信验证码类型，登录|注册|修改手机号|忘记密码|绑定手机号
export type CodeType = 'login' | 'register' | 'changeMobile' | 'forgetPassword' | 'bindMobile'