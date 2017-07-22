/**
 * Created by blood on 2017/7/12.
 */
import Vue from 'vue'
import Vuex from 'vuex'

// Import root elem
import actions from './actions'
import mutations from './mutations'

import System from './modules/system'

Vue.use(Vuex)

// 用户状态数据全局
let state = {
  userConfig: {},
  proTemplate: {}
}

let getters = {
  dataSystem: (state, getters) => {
    return state.userConfig.system ? state.userConfig.system : null
  },
  templSystem: (state, getters) => {
    return state.proTemplate.system ? state.proTemplate.system : null
  }
}

export default new Vuex.Store({
  state: state,
  actions: actions,
  mutations,
  getters,
  modules: {
    system: System
  }
})
