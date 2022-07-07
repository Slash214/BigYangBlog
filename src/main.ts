import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// import 'default-passive-events' 
// 添加事件管理者'passive'，来阻止'touchstart'事件，让页面更加流畅。 解决chrome下的warning问题

import 'element-plus/dist/index.css'
import '@/styles/normalize.css'


const app = createApp(App)
app.use(ElementPlus, {
	locale: zhCn
})
app.use(router)
app.mount('#app')