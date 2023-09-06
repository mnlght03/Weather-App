<script setup lang="ts">
import { type IWeather } from '../types'

interface Props {
  weather: IWeather
}

const props = defineProps<Props>()
</script>

<template>
  <div class="container py-4 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-8 col-lg-6 col-xl-4">
        <div class="card" style="color: #4b515d; border-radius: 35px">
          <div class="card-body p-4">
            <div class="d-flex">
              <h6 class="flex-grow-1">{{ weather.weekDay }}</h6>
              <h6>{{ weather.time }}</h6>
            </div>

            <div class="d-flex flex-column text-center mt-5 mb-4">
              <h6 class="display-4 mb-0 font-weight-bold" style="color: #1c2331">
                {{ weather.temperature }}°C
              </h6>
              <span class="small" style="color: #868b94">{{ weather.description }}</span>
            </div>

            <div class="d-flex align-items-center">
              <div class="flex-grow-1" style="font-size: 1rem">
                <div>
                  <i class="bi bi-wind" style="color: #868b94"></i>
                  <span class="ml-2"> {{ weather.wind }} m/s </span>
                </div>
                <div>
                  <i class="bi bi-droplet" style="color: #868b94"></i>
                  <span class="ml-2"> {{ weather.humidity }} % </span>
                </div>
                <div>
                  <i class="bi bi-cloudy" style="color: #868b94"></i>
                  <span class="ml-2"> {{ weather.clouds }} % </span>
                </div>
              </div>
              <div>
                <img
                  src="../assets/openweatherlogo.png"
                  width="100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
