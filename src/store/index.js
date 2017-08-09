/**
 * Created by blood on 2017/7/12.
 */
import Vue from 'vue'
import Vuex from 'vuex'

// Import root elem
import actions from './actions'
import mutations from './mutations'

// Import modules
import System from './modules/system'
import Wireless from './modules/wireless'

Vue.use(Vuex)

// 用户状态数据全局
let state = {
  userConfig: {},
  proTemplate: {},
  curUserConfig: {}
}

let getters = {
  getUserConfig: (state, getters) => {
    return state.userConfig
  },
  getProTemplate: (state, getters) => {
    return state.proTemplate
  },
  getCurUserConfig: (state, getters) => {
    return state.curUserConfig
  }
}

export default new Vuex.Store({
  state: state,
  actions: actions,
  mutations,
  getters,
  modules: {
    system: System,
    wireless: Wireless
  }
})
