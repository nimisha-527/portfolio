import axios from 'axios'
import { storeToRefs } from 'pinia'
import { useApiHandling } from '../stores/apiHandling'
import mockData from '../mockContent.json'
const mock = true

export const useInitialContent = () => {
  const apiStore = useApiHandling()
  const { apiLoadFn, apiSuccessFn, apiErrorFn } = apiStore
  const { loadingSpinner, apiError, data, extendedTimeoutFetcher } = storeToRefs(apiStore)
  const serverURL = import.meta.env.VITE_BACKEND_URL

  const getInitialContent = async () => {
    apiLoadFn()
    if (mock) {
      apiSuccessFn(mockData)
    } else {
      try {
        const response = await axios.get(`${serverURL}/portfolio-content`)
        if (response.data.load) {
          apiSuccessFn(response.data)
        } else {
          apiErrorFn('Please initialize your server url')
        }
      } catch (error) {
        console.error('Failed to fetch initial content:', error)
        apiErrorFn(error instanceof Error ? error.message : 'Unknown error')
      }
    }
  }

  return {
    getInitialContent,
    loadingSpinner,
    apiError,
    data,
    extendedTimeoutFetcher,
  }
}
