/**
 * Created by blood on 2017/7/15.
 */
import * as types from './mutation-types'

export default {
  [types.SET_PRO_TEMP] (state, payload) {
    state.proTemplate = payload
  },
  [types.SET_USR_CONFIG] (state, paylaod) {
    state.userConfig = paylaod
  }
}
