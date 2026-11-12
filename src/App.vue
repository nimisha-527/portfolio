<script setup lang="ts">
import { nextTick, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useInitialContent } from './composables/useInitialContent.ts'
import ModalInfo from './components/modals/Info.vue'
import RunningSpinner from './components/RunningSpinner.vue'

const { getInitialContent, loadingSpinner, apiError, extendedTimeoutFetcher } = useInitialContent()

onMounted(async () => {
  const contentRequest = getInitialContent()
  await nextTick()
  document.getElementById('app-preloader')?.remove()
  await contentRequest
})
</script>

<template>
  <main id="root">
    <ModalInfo v-if="extendedTimeoutFetcher" />

    <div v-if="loadingSpinner" class="spinner-container">
      <RunningSpinner />
    </div>
    <p v-else-if="apiError" class="api-error" role="alert">{{ apiError }}</p>
    <section v-else class="page-content">
      <RouterView />
    </section>
  </main>
</template>

<style scoped>
#root {
  min-height: 100vh;
  color: #302722;
}

.page-content {
  padding: 0 1.5rem 2rem;
}

.spinner-container {
  display: grid;
  min-height: 60vh;
  place-items: center;
}

.api-error {
  width: min(100% - 3rem, 72rem);
  margin: 2rem auto;
  padding: 1rem 1.25rem;
  border-radius: 0.5rem;
  background: #fff;
  color: #8b3028;
}

@media (max-width: 36rem) {
  .site-header {
    width: calc(100% - 2rem);
  }

  .site-header nav a {
    padding: 0.5rem 0.7rem;
  }

  .page-content {
    padding: 0 1rem 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .site-header nav a {
    transition: none;
  }
}
</style>
