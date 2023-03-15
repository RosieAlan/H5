import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/user'

export const useUserStore = defineStore(
  'userStore',
  () => {
    const user = ref<User | null>({} as User)
    const setUser = (data: User) => {
      user.value = data
    }
    const delUser = () => {
      user.value = null
    }
    return { user, setUser, delUser }
  },
  {
    persist: true
  }
)
