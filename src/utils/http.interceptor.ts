const install = (vm) => {
  const http = vm.config.globalProperties.$u.http
  http.setConfig({
    baseUrl: 'https://8d65ef68-cb72-4177-bf11-412930bdf7ee.bspapp.com/api',
    loadingText: '努力加载中~',
    showLoading: true,
    method: 'POST',
    loadingMask: true,
    loadingTime: 800
  });
  // 请求拦截，配置Token等参数
  http.interceptor.request = (config) => {
    return config;
  }
  // 响应拦截，判断状态码是否通过
  http.interceptor.response = (res) => {
    console.log(res, '====================')
    if (res) {
      return res.data || res;
    } else return false;
  }
}

export default {
  install
}
