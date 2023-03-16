<template>
  <div>
    <van-nav-bar
      fixed
      :title="title"
      :right-text="rightText"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
// 使用组件时候才能确定的功能：标题，右侧文字，点击右侧文字行为（props传入）
defineProps<{
  title?: string
  rightText?: string
}>()
const emits = defineEmits<{
  (e: 'click-right'): void
}>()
const onClickLeft = () => {
  // 判断历史记录中是否有回退
  if (history.state?.back) {
    router.back()
  } else {
    router.push('/')
  }
}
const onClickRight = () => {
  emits('click-right')
}
</script>

<style lang="scss" scoped>
:deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }
    &__text {
      font-size: 15px;
    }
  }
}
</style>
