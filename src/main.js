import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import message from "@/common/message"
import popbox from "@/common/popbox"

//统一各个浏览器css的效果
import 'normalize.css/normalize.css'

Vue.use(message)  //使用自制消息通知插件
Vue.use(popbox)   //使用自制右键弹出小弹窗

Vue.config.productionTip = false

Vue.prototype.$EventBus = new Vue()

import Router from 'vue-router'

//解决路由bug(不能从当前路由跳转到当前路由)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
