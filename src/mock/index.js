/**
 * Created by blood on 2017/7/17.
 */
import Mock from 'mockjs'

let base = 'http://api.example.com'
let proTemp = {
  name: 'product/template',
  json: {
    name: 'ligowave'
  }
}

let proCommit = {
  name: 'product/config',
  json: {
    data: {
      code: 200
    }
  }
}

let data = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|1-10': [{
    // 属性 id 是一个自增数，起始值为 1，每次增 1
    'id|+1': 1
  }]
})

const line = `${base}/${proTemp.name}`

// 输出结果
console.log(JSON.stringify(data, null, 4))

Mock.mock(`${base}/${proTemp.name}`, proTemp.json)

Mock.mock(`${base}/${proCommit.name}`, proCommit.json)

export default {
  line
}
