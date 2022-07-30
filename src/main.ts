import { createSSRApp } from "vue";
import uView from 'uview-ui';
import httpInterceptor from './utils/http.interceptor.ts'

import App from "./App.vue";
export function createApp() {
  const app = createSSRApp(App);
	app.use(uView)
	app.use(httpInterceptor)
  return {
    app,
  };
}
