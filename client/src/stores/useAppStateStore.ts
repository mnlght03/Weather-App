import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { IAppState } from '@/types'

export const useAppStateStore = defineStore('appState', () => {
  const windowWidth = ref(window.innerWidth)
  const isMobile = computed(() => windowWidth.value < 575)

  const requestsPerHour = ref(0)

  const canSendUnauthenticatedRequest = computed(
    () => requestsPerHour.value <= import.meta.env.VITE_APP_REQUEST_PER_HOUR_LIMIT
  )

  window.addEventListener('resize', () => (windowWidth.value = window.innerWidth))

  const appState = ref({
    isRequestPending: false,
    errorMessage: '',
    windowWidth: windowWidth,
    isMobile: isMobile,
    requestsPerHour: requestsPerHour,
    lastRequestTime: Date.now(),
    canSendUnauthenticatedRequest: canSendUnauthenticatedRequest
  } as IAppState)
  return { appState }
},
{
  persist: true
})
