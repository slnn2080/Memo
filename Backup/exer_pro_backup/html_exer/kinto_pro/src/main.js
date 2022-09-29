import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 引入全局样式文件
import "@/assets/style/style.scss"

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
