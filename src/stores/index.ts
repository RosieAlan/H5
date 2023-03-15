import { createPinia } from 'pinia'
const pinia = createPinia()
export default pinia
/**
 * 把pinia做一个统一导出
 * 这个语法的意思是，先把user中的所有内容导进来，然后再全部导出去
 */
export * from './user'
