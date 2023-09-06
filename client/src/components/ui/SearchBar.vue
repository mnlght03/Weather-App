<script setup lang="ts">
import { ref } from 'vue'
import vClickOutside from '@/directives/VClickOutside'
import { type IHistoryItem } from '@/types'
import { useSearchHistoryStore } from '@/stores/useSearchHistoryStore'
import { useAppStateStore } from '@/stores/useAppStateStore'
import { capitalize } from '@/util'

interface IProps {
  isLoading?: boolean
  errorMessage?: string
}

const props = defineProps<IProps>()

const emit = defineEmits<{
  submit: [value: string]
}>()

const { appState } = useAppStateStore()

const inputValue = ref('')
const isFocused = ref(false)
const setIsFocused = (value: boolean) => (isFocused.value = value)

const inputRef = ref()

const history = useSearchHistoryStore()

const submitSearch = () => {
  appState.errorMessage = ''
  const searchQuery = inputValue.value.trim()
  emit('submit', searchQuery)
  history.push(searchQuery)
  inputValue.value = ''
  inputRef.value.blur()
  setIsFocused(false)
}

const handleHistoryClick = (item: IHistoryItem) => {
  inputValue.value = item.value
  submitSearch()
}
</script>

<template>
  <div class="search">
    <form @submit.prevent="submitSearch">
      <div v-click-outside="() => setIsFocused(false)" class="search-form">
        <input
          ref="inputRef"
          @focus="() => setIsFocused(true)"
          v-model="inputValue"
          type="text"
          name="text"
          required
          autocomplete="off"
        />
        <input type="submit" value="search" />
        <ul class="search__history" v-if="isFocused">
          <li
            v-for="item in history.searchHistory"
            :key="item.id"
            @click="() => handleHistoryClick(item)"
          >
            {{ item.value }}
            <span @click.stop="() => history.remove(item)" class="text-danger ml-auto">delete</span>
          </li>
        </ul>
      </div>
      <div class="mt-2">
        <div v-if="appState.isRequestPending" class="loading">Loading</div>
        <div v-if="appState.errorMessage.length > 0" class="error-message">{{ capitalize(appState.errorMessage) }}</div>
      </div>
    </form>
  </div>
</template>
<style lang=""></style>
