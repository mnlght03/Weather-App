<script setup lang="ts">
import { useWeatherForecast } from '@/hooks/useWeatherForecast'
import { useFavoriteStore } from '@/stores/useFavoriteStore'
import { capitalize } from '@/util';

import { toRef } from 'vue'

interface IProps {
  city: string
}

const favorites = useFavoriteStore()

const props = defineProps<IProps>()

const city = toRef(props, 'city')

// TODO: return city ref from hook
const { weatherItems, currentWeather, updateCurrent } = useWeatherForecast(city)
</script>

<template>
  <h1 class="text-center">
    {{ capitalize(city) }}
    <i
      v-if="favorites.includes(city)"
      class="ml-2 bi bi-star-fill"
      role="button"
      @click="() => {
        favorites.removeByName(city)
      }"
    ></i>
    <i v-else role="button" class="ml-4 bi bi-star" @click="() => favorites.push(city)"></i>
  </h1>
  <weather-main-item v-if="weatherItems.length > 0" :weather="currentWeather" />
  <weather-line :items="weatherItems" :active="currentWeather" @updateActive="updateCurrent" />
</template>

<style scoped></style>
