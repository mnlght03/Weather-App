<script setup lang="ts">
import { useOpenToggle } from '@/hooks/useOpenToggle'
import { useFavoriteStore } from '@/stores/useFavoriteStore'
import { capitalize } from '@/util';

interface IProps {
  name: string
}

const props = defineProps<IProps>()

const emit = defineEmits<{
  select: [value: string]
}>()

const { isOpened, setIsOpened } = useOpenToggle(true)

const favoriteStore = useFavoriteStore()
</script>

<template>
  <div class="dropdown">
    <h4 @click="() => setIsOpened(!isOpened)">
      {{ name }}
      <div
        :class="{
          rotate: isOpened,
          'ml-4': true
        }"
      >
        <i class="bi bi-chevron-down"></i>
      </div>
    </h4>
    <ul v-if="isOpened">
      <li
        v-for="city in favoriteStore.favorite"
        :key="city.id"
        @click="$emit('select', city.name)"
        class="mt-2 list-item"
      >
        <i class="mr-2 bi bi-star-fill"></i>
        {{ capitalize(city.name) }}
        <button
          class="ml-auto btn btn-outline-danger"
          @click.stop="() => {
            favoriteStore.remove(city)
          }"
        >
          <i class="bi bi-x"></i>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.dropdown {
  width: 100%;
  padding: 0 1rem;
}
.dropdown h4 {
  cursor: pointer;
  display: flex;
  width: 100%;
}
.rotate {
  transform: rotate(180deg);
}

.dropdown ul {
  list-style-type: none;
}

.dropdown ul li {
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  width: 80%;
  align-items: center;
}

button {
  width: 1.5rem;
  height: 1.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
