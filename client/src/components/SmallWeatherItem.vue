<script setup lang="ts">
import { useAppStateStore } from '@/stores/useAppStateStore';

interface IProps {
  temperature: number
  weekDay: string
  isCurrent: boolean
}

defineProps<IProps>()

const {appState} = useAppStateStore()
</script>

<template lang="">
  <div class="widget" :class="{ current: isCurrent, 'col-3': appState.isMobile }">
    <h3>{{ temperature }}°C</h3>
    <h4>{{ appState.isMobile ? weekDay.substring(0, 3) : weekDay }}</h4>
  </div>
</template>

<style scoped>
.widget.current,
.widget:hover {
  cursor: pointer;
  background-color: #fff;
  color: #000;
}
</style>
