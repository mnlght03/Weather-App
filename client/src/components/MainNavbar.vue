<script setup lang="ts">
import vClickOutside from '@/directives/VClickOutside'
import { useOpenToggle } from '@/hooks/useOpenToggle'

const { isOpened, setIsOpened } = useOpenToggle(false)

const emit = defineEmits<{
  selectFavorite: [value: string]
}>()

const loginToggler = useOpenToggle()
const registerToggler = useOpenToggle()
</script>

<template>
  <nav v-click-outside="() => setIsOpened(false)">
    <login-popup
      v-if="loginToggler.isOpened.value"
      title="log in"
      submitName="log in"
      :clickOutsideFn="() => loginToggler.setIsOpened(false)"
    />
    <login-popup
      v-if="registerToggler.isOpened.value"
      title="register"
      submitName="register"
      :clickOutsideFn="() => registerToggler.setIsOpened(false)"
    />
    <div class="container-fluid">
      <button
        class="toggle-menu-button"
        @click="() => setIsOpened(!isOpened)"
        aria-label="Toggle navigation"
      >
        <i v-if="!isOpened" class="bi bi-list"></i>
        <i v-else class="bi bi-x"></i>
      </button>
    </div>
    <div v-if="isOpened" class="nav__aside">
      <div class="d-flex mb-4">
        <button
          type="button"
          class="ml-3 btn btn-outline-light"
          @click="
            () => {
              setIsOpened(false)
              registerToggler.setIsOpened(false)
              loginToggler.setIsOpened(true)
            }
          "
        >
          Log In
        </button>
        <button
          type="button"
          class="ml-4 btn btn-outline-light"
          @click="
            () => {
              setIsOpened(false)
              loginToggler.setIsOpened(false)
              registerToggler.setIsOpened(true)
            }
          "
        >
          Register
        </button>
      </div>
      <favorites-dropdown
        name="Favorites"
        @select="
          (value: string) => {
            $emit('selectFavorite', value)
            setIsOpened(false)
          }
        "
      />
    </div>
  </nav>
</template>
<style scoped>
nav {
  padding-top: 1rem;
}
.toggle-menu-button {
  background-color: transparent;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 2rem;
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
  z-index: 2;
  position: relative;
}
.nav__aside {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(38, 55, 69, 0.7);
  width: 400px;
  z-index: 1;
  padding-top: 4rem;
}

@media (max-width: 575px) {
  .nav__aside {
    background-color: rgba(38, 55, 69, 0.9);
    width: 100%;
  }
}

.nav__aside__item {
  color: rgba(0, 0, 0, 1);
  background-color: rgba(255, 255, 255, 0.4);
  width: 100%;
  padding: 0.5rem 1rem;
}
</style>
