import Vue from 'vue'
import Cube from 'cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Mint from 'mint-ui'
import "mint-ui/lib/style.css"
Vue.use(Mint)

axios.defaults.baseURL="http://localhost:5000/"
Vue.prototype.axios=axios;
// //7:配置axios 保存session信息
axios.defaults.withCredentials=true

Vue.config.productionTip = false
Vue.use(Cube)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
