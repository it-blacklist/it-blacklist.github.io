import Vue from 'vue'
import App from './App.vue'
import uView from "uview-ui";
import httpInterceptor from '@/utils/http.interceptor.js'

Vue.config.productionTip = false

Vue.use(uView);

const app = new App({
  ...App
})

Vue.use(httpInterceptor, app)

app.$mount();
