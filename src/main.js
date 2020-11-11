import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.prototype.globalMouseUp = (callback) => {
  document.onmouseup = () => {
    callback();
  }
}

import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
