import type { IFavoriteCity } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFavoriteStore = defineStore(
  'favorite',
  () => {
    const favorite = ref([] as IFavoriteCity[])

    const nextId = ref(0)

    const includes = (city: string): boolean => {
      return favorite.value
        .map((item) => item.name.toLocaleLowerCase())
        .includes(city.toLocaleLowerCase())
    }

    const remove = (item: IFavoriteCity) => {
      favorite.value = favorite.value.filter((fav) => fav.id !== item.id)
    }

    const removeByName = (city: string) => {
      favorite.value = favorite.value.filter(
        (fav) => fav.name.toLocaleLowerCase() !== city.toLocaleLowerCase()
      )
    }

    const push = (city: string) => {
      removeByName(city)
      favorite.value.push({
        id: nextId.value,
        name: city
      })
      nextId.value++
    }

    return { favorite, push, remove, removeByName, includes, nextId }
  },
  {
    persist: true
  }
)
