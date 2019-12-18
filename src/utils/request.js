import { request, showToast } from 'remax/wechat'

const request_data = {
  platform: 'wap',
  rent_mode: 2,
}
const baseUrl = ''

export default (options = { method: 'GET', data: {} }) => {
  return request({
    url: baseUrl + options.url,
    data: {
      ...request_data,
      ...options.data,
    },
    header: {
      'Content-Type': 'application/json',
    },
    method: options.method.toUpperCase(),
  }).then(res => {
    const { statusCode, data } = res
    if (statusCode >= 200 && statusCode < 300) {
      if (data.status !== 'ok') {
        showToast({
          title: `${res.data.error.message}~` || res.data.error.code,
          icon: 'none',
          mask: true,
        })
      }
      return data
    } else {
      throw new Error(`网络请求错误，状态码${statusCode}`)
    }
  })
};
