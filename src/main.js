import Vue from 'vue'
import App from './App'
import $https from '@/kits/https'

Vue.prototype.$https = $https
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
