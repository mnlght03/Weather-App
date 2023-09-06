<script setup lang="ts">
import { type IWeather } from '@/types'
import { toRef } from 'vue'

interface IProps {
  items: IWeather[],
  active?: IWeather
}

const props = defineProps<IProps>()

defineEmits<{
  updateActive: [value: IWeather]
}>()
</script>

<template>
  <div class="widgets row justify-content-center">
    <small-weather-item
      v-for="item in items"
      :temperature="item.temperature"
      :weekDay="item.weekDay"
      :key="item.timestamp"
      :isCurrent="active && item.timestamp === active.timestamp"
      @click="$emit('updateActive', item)"
    />
  </div>
</template>

<style></style>
