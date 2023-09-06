<script setup lang="ts">
import vClickOutside from '@/directives/VClickOutside'
  interface IProps {
    title: string
    submitName: string
    clickOutsideFn: () => void
  }
  const props = defineProps<IProps>()
</script>

<template>
  <div class="popup-curtain">
    <login-modal-window 
      :title="title"
      :submitName="submitName"
      v-click-outside="clickOutsideFn"
    />
  </div>
</template>

<style scoped>
.popup-curtain {
  z-index: 3;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(38, 55, 69, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
