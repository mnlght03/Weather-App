<script setup lang="ts">
import { ref } from 'vue'
import { useAppStateStore } from './stores/useAppStateStore'

const city = ref('Novosibirsk')

const { appState } = useAppStateStore()

const updateCity = (value: string) => {
  if (appState.errorMessage.length === 0) city.value = value
}
</script>

<template>
  <main-navbar @selectFavorite="updateCity"></main-navbar>
  <main id="main" class="d-flex align-items-center">
    <div class="container d-flex flex-column align-items-center">
      <weather-widget :city="city" />
      <search-bar @submit="updateCity" class="mt-4" />
      <!-- <div class="social-links text-center">
        <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
        <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
        <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
        <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
      </div> -->
    </div>
  </main>
  <main-footer></main-footer>
  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"
    ><i class="bi bi-arrow-up-short"></i
  ></a>
</template>

<style scoped></style>
