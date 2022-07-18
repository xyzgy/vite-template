import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import { pinia } from '@/pinia'
import router from '@/router'

import '@/utils/flexible.js'

const app = createApp(App)
app.config.productionTip = false
app
  .use(pinia)
  .use(router)
  .use(ElementPlus, { locale: zhCn })
  .mount('#app')

export default app

