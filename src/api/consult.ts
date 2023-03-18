import { request } from '@/utils/request'
import type { KnowledgeParams, KnowledgePage } from '@/types/consult'

// 获取推荐/减脂/饮食健康/关注页面--百科文章列表
export const getKnowledgePage = (params: KnowledgeParams) => {
  return request<KnowledgePage>('/patient/home/knowledge', 'GET', params)
}
