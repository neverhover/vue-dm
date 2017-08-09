/**
 * Created by blood on 2017/7/17.
 */
import Vue from 'vue'

let util = {}

/*
 * @brief 设置本地语言
 * @param lang 语言,like : zh-CN, en-US ...
 */
util.setLocalLanguage = (lang) => {
  // Auto set language
  if (lang !== '') {
    Vue.config.lang = lang
    window.localStorage.setItem('language', lang)
    return true
  }
  const navLang = navigator.language
  const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false
  let setLang = window.localStorage.getItem('language') || localLang || 'zh-CN'
  Vue.config.lang = setLang
}

/*
 * @brief 获取本地语言
 * @return lang 语言,like : zh-CN, en-US ...
 */
util.getLocalLanguage = () => {
  if (Vue.config.lang) {
    return Vue.config.lang
  }
  const navLang = navigator.language
  const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false
  const setLang = window.localStorage.getItem('language') || localLang || 'zh-CN'
  return setLang
}

// 判断是否是个空对象
util.isEmptyObject = (e) => {
  let t
  for (t in e) { return !1 }
  return !0
}

// 对象克隆
util.myclone = (obj) => {
  // Handle the 3 simple types, and null or undefined
  if (obj == null || typeof obj !== 'object') return obj

  // Handle Date
  if (obj instanceof Date) {
    let copy = new Date()
    copy.setTime(obj.getTime())
    return copy
  }

  // Handle Array
  if (obj instanceof Array) {
    let copy = []
    let i = 0
    let len = obj.length
    for (; i < len; ++i) {
      copy[i] = util.myclone(obj[i])
    }
    return copy
  }

  // Handle Object
  if (obj instanceof Object) {
    let copy = {}
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = util.myclone(obj[attr])
      }
    }
    return copy
  }

  throw new Error("Unable to copy obj! Its type isn't supported.")
}

// 判断是否是一个数组
util.this_isArray = (obj) => {
  if (Object.prototype.toString.call(obj) === '[object Array]') {
    return true
  } else if (obj['0'] != null && typeof (obj['0']) === 'object') {
    return true
  }
  return false
}
// 借鉴Avalon v1
let rarraylike = /(Array|List|Collection|Map|Arguments)\]$/
let rfunction = /^\s*\bfunction\b/
/* 判定是否类数组，如节点集合，纯数组，arguments与拥有非负整数的length属性的纯JS对象 */
/* istanbul ignore next */
util.isArrayLike = (obj) => {
  if (!obj) return false
  let n = obj.length
  if (n === n >>> 0) {
    // 检测length属性是否为非负整数
    let type = Object.prototype.toString.call(obj).slice(8, -1)
    if (rarraylike.test(type)) return true
    if (type === 'Array') return true
    try {
      if ({}.propertyIsEnumerable.call(obj, 'length') === false) {
        // 如果是原生对象
        return rfunction.test(obj.item || obj.callee)
      }
      return true
    } catch (e) {
      // IE的NodeList直接抛错
      return !obj.window // IE6-8 window
    }
  }
  return false
}

util.arrayEach = (obj, fn) => {
  if (obj) {
    // 排除null, undefined
    let i = 0
    if (util.isArrayLike(obj)) {
      for (let n = obj.length; i < n; i++) {
        if (fn(i, obj[i]) === false) break
      }
    } else {
      for (i in obj) {
        if (obj.hasOwnProperty(i) && fn(i, obj[i]) === false) {
          break
        }
      }
    }
  }
}

util.convertArray = (array) => {
  let ret = []
  let i = 0
  for (let key in array) {
    if (array.hasOwnProperty(key)) {
      ret[i] = array[key]
      i++
    }
  }
  return ret
}

util.recovery = (ret, array, callback) => {
  for (let i = 0, n = array.length; i < n; i++) {
    callback(array[i])
  }
  return ret
}

util.sliceArray = (obj, index) => {
  let t = {}
  t = this.convertArray(obj)
  return Array.prototype.slice.call(t, index)
}

util.resetVueRows = (src, newObj) => {
  let t = this.myclone(src)
  switch (newObj.action) {
    case 'delete':
      Vue.delete(t, newObj.key)
      break
    case 'update':
      Vue.set(t, newObj.key, newObj.value)
      break
    case 'new':
      break
    default:
      console.warn('Action error. Please check your action ')
  }
  // 修改完对象后push到数组中
  let i = 0
  let ret = []
  for (let key in t) {
    if (t.hasOwnProperty(key)) {
      ret[i] = t[key]
      i++
    }
  }
  if (t.action === 'new') {
    ret[i] = t.value
  }
  // 返回后的对象请自行进行Set
  // 如Vue.set(mystore.state.pro_model[0].network,'trafficcontrol',ret)
  return ret
}
// 不唯一，即没有通过测试，则返回false
// 唯一，则通过测试，返回true
util.uniqueTest = (objects, test, mode) => {
  let tmpArr = this.convertArray(objects)
  let count = 0
  // 遍历每一个元素，只有全部都与test不符合时，才是测试通过
  return tmpArr.every(function (item) {
    let r = true
    for (let key in test) {
      r = r && (item[key] === test[key])
    }
    if (mode === 'update' && count === 0 && r) {
      count += 1
      r = false
    }
    return !r
  })
}

// 判断一个元素是否在一个特定中，返回true 或false
util.in_array = (needle, haystack) => {
  let i = 0
  let n = haystack.length

  for (;i < n; ++i) {
    if (haystack[i] === needle) { return {'found': true, 'index': i} }
  }

  return {'found': false, 'index': i}
}
// 混合base_obj和new_obj
/*
 * 支持调用
 * mix_object(cur_pro, null, {}) 新添加配置
 * mix_object(cur_pro, cur_cfg, {}) 编辑配置
 */
util.mix_object = (baseObj, newObj, parentObj) => {
  if (parentObj === null) {
    // 当新对象为空时，将baseObj直接copy过来
    // 该情况用于页面中的内容版本高，而产品的配置模版版本低，即属性少
    if (newObj === null || typeof (newObj) === 'undefined') {
      newObj = {}
    }
    for (let index in baseObj) {
      if (!baseObj.hasOwnProperty(index)) {
        continue
      }
      if (!newObj.hasOwnProperty(index)) {
        newObj[index] = util.myclone(baseObj[index])
      }
    }
  }
  // 递归处理属性
  for (let i in baseObj) {
    if (!baseObj.hasOwnProperty(i)) {
      continue
    }
    // 找到新对象中对应属性的值
    if (baseObj[i].$template === true) {
      // 是个table，那么跳过此template的赋值，并将new_obj对象混入到base_obj中来
      let index = parseInt(i) + 1
      for (let j in newObj) {
        baseObj[index] = newObj[j]
        index = index + 1
      }
      break
    }
    // console.warn('键:' + i + ' >')
    // console.warn(parentObj)
    let valObj = {}
    if (newObj !== null && typeof (newObj) !== 'undefined') {
      valObj = newObj[i]
    }
    // if(valObj != null && typeof(valObj) != 'object'){
    //    //如果该值不为空且也不是对象，说明是真正的值。
    //    //则需要覆盖到对应base对象的值
    //    console.log('i='+i+' typeof:'+ typeof(valObj)+ '\n'
    //    + 'cur base is:'+ baseObj[i].key)
    // }
    if (typeof (baseObj[i]) === 'object' && baseObj[i].key) {
      // 表示该对象是我们想找的对象，那么赋值给它
      let wantKey = baseObj[i].key
      if (typeof (newObj) !== 'undefined' &&
        newObj !== null &&
        newObj !== {} &&
        newObj[wantKey] !== null &&
        baseObj[i].$template !== true &&
        baseObj[i].type !== 'object') {
        // console.log(i + ' 普通赋值  ' + wantKey)
        // console.log(newObj[wantKey])
        let curBaseObj = baseObj[i]
        let curNewObj = newObj[i]
        if (curNewObj !== undefined && curBaseObj !== undefined) {
          for (let ii in curBaseObj) {
            if (!curBaseObj.hasOwnProperty(ii)) {
              continue
            }
            if (!curNewObj.hasOwnProperty(ii)) {
              curNewObj[ii] = util.myclone(curBaseObj[ii])
            }
          }
        }
        if (newObj[wantKey] !== undefined) {
          baseObj[i].value = newObj[wantKey]
        }
        // console.log(baseObj[i].value)
      } else if (typeof (newObj) !== 'undefined' && newObj !== null && newObj !== {} && newObj[wantKey] !== null && baseObj[i].$template !== true && baseObj[i].type === 'object') {
        console.log(i + ' 嵌套子对象  ' + wantKey)
        if (baseObj[i].default !== undefined) {
          baseObj[i].value = this.myclone(baseObj[i].default)
          this.mix_object(baseObj[i].value, valObj, baseObj)
        }
        // console.log(baseObj[i].value)
      } else {
        // 在new_obj中并没有这个值，那么采用默认值
        // console.log(i + ' 他是模版-->  ' + baseObj[i].$template)
        if (baseObj[i].default !== undefined) {
          baseObj[i].value = baseObj[i].default !== null ? baseObj[i].default : 'error! please check your base object'
        }
        // console.log(baseObj[i].value)
        if (typeof (baseObj[i].value) === 'object' && baseObj[i].type === 'object') {
          util.mix_object(baseObj[i], valObj, baseObj)
        }
      }
      //  console.log('changing key:'+ wantKey+'\n'+
      //  'value:'+baseObj[i].default + '\n' +
      //  'valObj.val:' + valObj )
      //  console.log(newObj[wantKey])
    } else if (typeof (baseObj[i]) !== 'object' || baseObj[i] === null) {
      //  表明到了当前base对象的值了
      //  console.log('我们找到了,不理他')
      //  console.log(baseObj[i])
    } else {
      // console.log(i + '----------')
      util.mix_object(baseObj[i], valObj, baseObj)
    }
  }
  return baseObj
}

/*
 * @brief: 生成配置
 *  支持调用
 *  clone_cfg(cur_pro, {})
 *
 */
util.clone_cfg = (baseObj, newObj) => {
  for (let i in baseObj) {
    if (!baseObj.hasOwnProperty(i)) {
      continue
    }
    // console.log(baseObj[i])
    if (typeof (baseObj[i]) === 'object' && baseObj[i].key && baseObj[i].type && baseObj[i].type !== 'object') {
      // if (typeof (baseObj[i]) === 'object' &&
      // typeof (baseObj[i].key) !== 'undefined' &&
      // baseObj[i].key !== null &&
      // typeof (baseObj[i].type) !== 'undefined' &&
      // baseObj[i].type !== 'object') {
      // 表示该对象是我们想找的对象，那么赋值给它
      let wantKey = baseObj[i].key
      // console.log('开始加入键:' + wantKey + ' 值:' + (baseObj[i].value ? baseObj[i].value : baseObj[i].default))
      newObj[wantKey] = baseObj[i].value ? baseObj[i].value : baseObj[i].default
    } else if (typeof (baseObj[i]) === 'object' &&
      typeof (baseObj[i].key) !== 'undefined' &&
      baseObj[i].key !== null &&
      typeof (baseObj[i].type) !== 'undefined' &&
      baseObj[i].type === 'object') {
      // console.log('嵌套对象组合:' + i + ' 打算进入其子对象')
      let valObj = {}
      if (util.this_isArray(baseObj[i])) {
        newObj[i] = []
      } else {
        newObj[i] = {}
      }
      valObj = newObj[i]
      util.clone_cfg(baseObj[i].value ? baseObj[i].value : baseObj[i].default, valObj)
    } else if ((typeof (baseObj[i]) !== 'object') && (typeof (baseObj[i]) !== 'function') && (baseObj[i] !== null)) {
      // console.log('开始加入非对象 键:' + i + ' 值:' + baseObj[i])
      newObj[i] = baseObj[i]
    } else if (typeof (baseObj[i]) === 'object' && (baseObj[i].key === null || typeof (baseObj[i].key) === 'undefined') && baseObj[i].isview === true) {
      // console.log('view 忽略属性:' + i)
    } else if (typeof (baseObj[i]) === 'object' && baseObj[i].$template === true) {
      // console.log('view 忽略对象:' + i)
      newObj[i] = {}
    } else {
      // console.log('打算进入一下层 键:' + i + ' 当前对象是否为数组:' + util.this_isArray(baseObj[i]))
      let valObj = {}
      if (util.this_isArray(baseObj[i])) {
        newObj[i] = []
      } else {
        newObj[i] = {}
      }
      valObj = newObj[i]
      // console.log(valObj)
      util.clone_cfg(baseObj[i], valObj)
    }
  }
  return newObj
}

export default util
