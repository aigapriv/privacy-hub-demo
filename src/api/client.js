import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use(async (config) => {
  // Add auth token if needed
  return config
})

export default api 