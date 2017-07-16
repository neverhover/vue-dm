/**
 * Created by blood on 2017/7/17.
 */
import axios from 'axios'

// 请参考https://www.npmjs.com/package/axios查看所有信息

let base = ''

// baseURL优先级高于base，请注意
axios.defaults.baseURL = 'http://api.example.com'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export const commitProCfg = params => {
  return axios.post(`${base}/product/config`, {
    params: params
  })
}

export const getProTemp = params => {
  return axios.get(`${base}/product/template`, {
    params: params
  })
}
