import { ref } from 'vue'
import { defineStore } from 'pinia'

interface PortfolioContent {
  tabs: string[]
  aboutPage?: {
    aboutLabel?: string
    summary?: string
  }
  homePage?: {
    yourName?: string
    yourRole?: string
  }
  contactPage?: {
    contactLabel?: string
    emailAddress?: string
    emailHost?: string
  }
}

export const useApiHandling = defineStore('apiHandling', () => {
  const loadingSpinner = ref(false);
  const apiError = ref<string | null>(null);
  const data = ref<PortfolioContent | null>(null);
  const extendedTimeoutFetcher = ref<boolean>(false);

  function apiLoadFn() {
    loadingSpinner.value = true
    apiError.value = null
    extendedTimeoutFetcher.value = false;
    // If Api is taking more than 5 sec we show below message.
    setTimeout(() => {
      if (loadingSpinner.value) {
        extendedTimeoutFetcher.value = true;
        loadingSpinner.value = false;
      } else {
        extendedTimeoutFetcher.value = false;
      }
    }, 5000);
  }

  function apiErrorFn(message?: string) {
    loadingSpinner.value = false;
    extendedTimeoutFetcher.value = false;
    apiError.value = message ?? 'Something went wrong'
  }

  function apiSuccessFn(payload: PortfolioContent) {
    loadingSpinner.value = false
    data.value = payload
    apiError.value = null;
    extendedTimeoutFetcher.value = false;
  }

  return {
    loadingSpinner,
    apiError,
    data,
    extendedTimeoutFetcher,
    apiLoadFn,
    apiErrorFn,
    apiSuccessFn
  }
})