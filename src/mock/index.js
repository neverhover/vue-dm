/**
 * Created by blood on 2017/7/17.
 */
import Mock from 'mockjs'

// Import mock data
import UsrData from './usrData.json'
import TestDev from './TestDevice.json'

let base = 'http://api.example.com'

// 用户数据
let usrData = {
  name: 'user/data',
  json: UsrData
}
Mock.mock(`${base}/${usrData.name}`, usrData.json)

// 获取产品模版对应的详细json
let proTemp = {
  name: 'product/template',
  json: {
    name: 'ligowave',
    templ: TestDev
  }
}
Mock.mock(`${base}/${proTemp.name}`, proTemp.json)

// 提交用户的配置
let proCommit = {
  name: 'product/config',
  json: {
    data: {
      code: 200
    }
  }
}
Mock.mock(`${base}/${proCommit.name}`, proCommit.json)

// 获取用户当前配置的所有信息
let configSetting = {
  name: 'config/setting',
  json: {
    data: {
      sid: 12,
      configName: 'NFT 2ac 配置1楼',
      proTemplName: 'NFT 2ac',
      usrData: UsrData
    }
  }
}
Mock.mock(`${base}/${configSetting.name}`, configSetting.json)

// let data = Mock.mock({
//   // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
//   'list|1-10': [{
//     // 属性 id 是一个自增数，起始值为 1，每次增 1
//     'id|+1': 1
//   }]
// })

const line = `${base}/${proTemp.name}`

// 输出结果
// console.log(JSON.stringify(data, null, 4))

export default {
  line
}
