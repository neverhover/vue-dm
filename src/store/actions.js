/**
 * Created by blood on 2017/7/15.
 */
import * as types from './mutation-types'

export default {
  setProTempl ({commit}, payload) {
    commit(types.SET_PRO_TEMP, payload)
  },
  setUsrData ({commit}, payload) {
    commit(types.SET_USR_CONFIG, payload)
  }
}
