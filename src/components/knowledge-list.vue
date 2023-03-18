<script setup lang="ts">
import { ref } from 'vue'
import type { KnowledgeType, KnowledgeParams, KnowledgeList } from '@/types/consult'
import KnowledgeCard from './knowledge-card.vue'
import { getKnowledgePage } from '@/api/consult'
const props = defineProps<{
  type: KnowledgeType
}>()
const loading = ref(false)
const finished = ref(false)
const list = ref<KnowledgeList>([])
const params = ref<KnowledgeParams>({
  type: props.type,
  current: 1,
  pageSize: 10
})
const onLoad = async () => {
  // 加载数据
  console.log('loading...')

  const res = await getKnowledgePage(params.value)
  list.value.push(...res.data.rows)
  if (list.value.length >= res.data.total) {
    finished.value = true
  } else {
    params.value.current++
  }

  loading.value = false
}
</script>

<template>
  <div class="knowledge-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <knowledge-card v-for="item in list" :key="item.id" :item="item" />
    </van-list>
  </div>
</template>
<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
