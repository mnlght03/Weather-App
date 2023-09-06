<script setup lang="ts">
import { ref } from 'vue';
import { type IUserBrief } from '@/types'
import { capitalize } from '@/util';

interface IProps {
  title: string
  submitName: string
}

const props = defineProps<IProps>()

const username = ref('')
const password = ref('')

const emit = defineEmits<{
  submit: [userInfo: IUserBrief]
}>()

const submitLogin = () => {
  emit('submit', {
    username: username.value,
    password: password.value
  })
} 
</script>

<template>
  <form @submit.prevent="submitLogin" class="popup-modal">
    <h3>{{ capitalize(title) }}</h3>
    <label for="username">Username</label>
    <input v-model="username" type="text" name="username" required />
    <label for="password">Password</label>
    <input v-model="password" type="password" name="password" required />
    <button type="submit">{{ capitalize(submitName) }}</button>
  </form>
</template>

<style scoped>
.popup-modal {
  z-index: 3;
  background-color: rgba(38, 55, 69, 0.9);
  width: 400px;
  height: 400px;
  border-radius: 50px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #24b7a4;
}

.popup-modal button[type='submit'] {
  background: #24b7a4;
  border: 0;
  padding: 10px 24px;
  color: #fff;
  transition: 0.4s;
  border-radius: 50px;
  margin-top: auto;
  font-weight: 600;
}

.popup-modal button[type='submit']:hover {
  background: #22ae9c;
}

.popup-modal label {
  font-size: 1.2rem;
  margin-top: 2rem;
  margin-left: 1rem;
  /* text-align: center; */
}

.popup-modal input {
  border: 1px solid #24b7a4;
  padding: 8px;
  border-radius: 20px;
}

.popup-modal h3 {
  text-align: center;
  font-weight: 600;
}
</style>
