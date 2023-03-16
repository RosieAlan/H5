import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/index'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/',
      component: () => import('@/views/layout/index.vue')
    }
  ]
})
// 访问权限控制
// 不需要登录的页面，白名单
const wihteList = ['/login']
router.beforeEach(to => {
  // 用户仓库
  const store = useUserStore()
  // 如果没有登录且不在白名单内，去登录
  if (!store.user?.token && !wihteList.includes(to.path)) return '/login'
  // 否则不做任何处理
})

export default router