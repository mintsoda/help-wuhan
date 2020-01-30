import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import common from './mixin/common.js'

Vue.use(Vant)
Vue.config.productionTip = false
Vue.mixin(common)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
