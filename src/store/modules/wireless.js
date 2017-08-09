/**
 * Created by blood on 2017/7/18.
 */
import Wireless from '@/viewModel/Wireless'
import Util from '@/libs/utils'
import * as types from '@/store/mutation-types'

// template表述的是界面的展示部分和默认值
// schema为类似据数据库插入行的默认样式
// data为当前的用户实际配置的值，用于最终保存时作用

// 子模块暂时不加入命名空间，即希望收到rootStore中分发的action及mutations

const state = {
  data: {},
  template: Wireless.template,
  schema: Wireless.schema,
  curTemplate: {},
  curSchema: {},
  errors: {}
}

const actions = {
  setProTempl ({ dispatch, commit, getters, rootGetters }, payload) {
    // commit(types.SET_PRO_TEMP, payload)
    commit('SYSTEM_SET_TEMPL', {
      payload: payload,
      template: rootGetters.getProTemplate
    })
    // console.log('zzzzzzzzzzzzzzzzzzzzzz')
  },
  setUsrData ({ dispatch, commit, getters, rootGetters }, payload) {
    // commit(types.SET_USR_CONFIG, payload)
    commit('SYSTEM_SET_SCHEMA', {
      payload: payload,
      uconfig: rootGetters.getUserConfig
    })
    // 所有的mutations完成之后才会调用后续内容
    // console.log('zzzzzzzzzzzzzzzzzzzzzzXXXXXXXXXX')
  },
  setCurUserConfig ({ dispatch, commit, getters, rootGetters, state, rootState }, payload) {
    commit(types.SET_CUR_USR_CONFIG, {
      name: 'wireless',
      data: state.data
    })
  }
}

export default {
  // namespaced: true,
  state: state,
  actions,
  mutations: {
    SYSTEM_SET_TEMPL (state, payload) {
      // root设置了产品的模版，则当前混合本地默认与厂家定义的模版，写入curTemplate
      // 后续该内容用于计算该模块的schema
      // console.log(payload.template.templ)
      console.log('in module wireless set pro template --- start')
      let dt = Util.myclone(state.template)
      let pt = null
      if (payload.template.templ) {
        pt = Util.myclone(payload.template.templ.wireless)
        if (pt === null || typeof (pt) === 'undefined') {
          pt = {}
        }
        Util.mix_object(dt, pt, null)
        console.log(pt)
      }
      state.curTemplate = pt
      console.log('in module wireless set pro template --- end')
    },
    SYSTEM_SET_SCHEMA (state, payload) {
      // 读取当前的curTemplate，并得到一个临时的schema，
      // 该临时的schema与模块的schema混合获得当前的schema
      // 根据root下的data与curSchema获得当前数据，类似与数据库升级后，旧数据与新数据混合到一行记录中。
      console.log('in module wireless set user config --- start')
      // 开始设置当前Schema
      let ct = Util.myclone(state.curTemplate)
      let ss = Util.myclone(state.schema)
      let tmpSchema = Util.clone_cfg(ct, {})
      Util.mix_object(ss, tmpSchema, null)
      state.curSchema = tmpSchema
      // 开始设置当前数据
      let tmpData = null
      if (payload.uconfig.wireless) {
        tmpData = Util.myclone(payload.uconfig.wireless)
        Util.mix_object(tmpSchema, tmpData, null)
      } else {
        tmpData = Util.mix_object(tmpSchema, tmpData, {})
      }
      state.data = tmpData
      console.log('in module wireless set user config --- end')
    }
  }
}
