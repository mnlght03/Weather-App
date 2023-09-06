import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IHistoryItem } from '@/types'

export const useSearchHistoryStore = defineStore(
  'searchHistory',
  () => {
    const searchHistory = ref([] as IHistoryItem[])

    const nextId = ref(0)

    const includes = (value: string): boolean => {
      return searchHistory.value
        .map((item) => item.value.toLocaleLowerCase())
        .includes(value.toLocaleLowerCase())
    }

    const remove = (item: IHistoryItem) => {
      searchHistory.value = searchHistory.value.filter((historyItem) => historyItem.id !== item.id)
    }

    const removeByValue = (value: string) => {
      searchHistory.value = searchHistory.value.filter(
        (historyItem) => historyItem.value.toLocaleLowerCase() !== value.toLocaleLowerCase()
      )
    }

    const push = (value: string) => {
      removeByValue(value)
      searchHistory.value.push({
        id: nextId.value,
        value: value
      })
      nextId.value++
    }

    return { searchHistory, push, remove, removeByValue, includes, nextId }
  },
  {
    persist: true
  }
)
