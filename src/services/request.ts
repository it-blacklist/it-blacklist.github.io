import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 20000,
  validateStatus: function (status) {
    return status >= 200 && status < 300
  },
})

request.interceptors.request.use((config) => {
  return config
})

request.interceptors.response.use((response) => {
  const res = response.data
  return res.data ?? res
})

export default request