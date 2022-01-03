import axios from 'axios'

//let BASE_URL = 'https://it-blacklist-a6de4b.service.tcloudbase.com/'

const BASE_URL = '/api'

const request = axios.create({
  baseURL: BASE_URL,
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
  if (!res.requestId && !res.data) {
    console.log('异常')
  }
  return res.data
})

export default request