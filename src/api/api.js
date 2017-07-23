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

// 获取设备的配置，即用户的配置
export const commitProCfg = params => {
  return axios.post(`${base}/product/config`, {
    params: params
  })
}

// 获取产品的模版,
export const getProTemp = params => {
  return axios.get(`${base}/product/template`, {
    params: params
  })
}

// 获取当前配置模版的详细信息,
export const getConfigSet = params => {
  return axios.get(`${base}/config/setting`, {
    params: params
  })
}

// ***********************************************************************************
// 以下是包装过的异步请求

export let getConfigSetInfo = (param, comThis) => {
  return new Promise(function (resolve, reject) {
    getConfigSet(param).then((res) => {
      // 成功后开始异步请求获得产品所对应的相关配置
      // 获得产品模版后，写入到全局中
      console.info(res.data)
      let configSet = res.data.data
      // 设置当前产品配置信息，包含模版名，模版id，以及用户的数据
      comThis.$Notice.open({
        title: '成功获取当前配置信息',
        desc: `包含配置id: ${configSet.sid} <br>产品模版名称: ${configSet.proTemplName}<br>配置名称: ${configSet.configName}<br>`,
        duration: 0
      })
      resolve(res.data)
    }).catch((err) => {
      console.warn(err)
      reject(err)
    })
  })
}

export let getProTempInfo = (res) => {
  return new Promise(function (resolve, reject) {
    let templParam = {
//          templParam: res.data.proTemplName
    }
    getProTemp(templParam).then((pro) => {
      // 获得产品模版成功，变更select
      // console.info('----------------')
      // console.info(pro)
      // console.info('----------------')
      resolve(pro.data)
    }).catch((err) => {
      console.warn(err)
      reject(err)
    })
  })
}
