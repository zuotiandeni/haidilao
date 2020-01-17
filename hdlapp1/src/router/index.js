import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Family from '../components/Family.vue'
import Install from '../components/Install.vue'
import Home from '../views/Home.vue'
import Index from './../components/Index.vue'
import ExchangeList from './../components/ExchangeList.vue'
import Address from './../components/Address.vue'
import scroll from '../components/scroll.vue'
import cart from '../components/cart.vue'
import hiscart from '../components/hiscart.vue'
import ecaluate from '../components/ecaluate.vue'
import details from '../components/details.vue'
Vue.use(VueRouter)

const routes = [
  {path:'/',name:'index',component:Index},
  {path:'/scroll',component:scroll},
  {path:'/details',component:details},
  {path:'/cart',component:cart},
  {path:'/hiscart',component:hiscart},
  {path: '/Login',component:Login},
  {path: '/ecaluate',component:ecaluate},
  {path:'/Family',component:Family},
  {path:'/Install',component:Install},
  {path:'/Home',component:Home},
  {path:'/Index',component:Index},
  {path:'/ExchangeList',component:ExchangeList},
  {path:'/Address',component:Address},
  {
    path: '/about',
    // name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }

]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
