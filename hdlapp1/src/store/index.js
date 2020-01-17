import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 共享数据
  state: {
    addr:"",
    IsLogin:false,
    panl:"index",
  },
  // 修改数据方法
  mutations: {
    setaddr(state,set){
      state.addr=set
    },
    setLogin(state,log){
      state.IsLogin = log;
    },
    changePanl(state,pan){
      state.panl = pan;
    }
  },   
  actions: {
  },
  modules: {
  }
})
