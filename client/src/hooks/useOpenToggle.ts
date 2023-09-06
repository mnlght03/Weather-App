import { ref } from "vue"

export const useOpenToggle = (initial = false) => {
  const isOpened = ref(initial)
  const setIsOpened = (value: boolean) => (isOpened.value = value)

  return {
    isOpened,
    setIsOpened
  }
}
