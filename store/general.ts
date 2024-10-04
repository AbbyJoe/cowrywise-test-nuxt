import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGeneralStore = defineStore('general', () => {
  const loading = ref(false)
  function setLoading(state: boolean) {
    loading.value = state
  }
  return { loading, setLoading }
})
