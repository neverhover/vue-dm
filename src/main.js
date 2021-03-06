// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// Import base lib
import Vue from 'vue'
import iView from 'iview'
import App from './App'
import router from './router'
import store from './store'
import 'iview/dist/styles/iview.css'
import '../my-theme/dist/iview.css'

// Import i18n
import VueI18n from 'vue-i18n'
import Locales from './locale'
import zhLocale from 'iview/src/locale/lang/zh-CN'
import enLocale from 'iview/src/locale/lang/en-US'
import Util from './libs/utils'

// Import data template
// import defaultTempl from '@/viewModel'

// Import mockjs
import * as mock from './mock'

console.log(mock.default.line)
// console.log(defaultTempl.schema)

// Add components
Vue.use(VueI18n)
Vue.use(iView)

// Multi language config
const locales = Locales
const mergeZH = Object.assign(zhLocale, locales['zh-CN'])
const mergeEN = Object.assign(enLocale, locales['en-US'])
Vue.locale('zh-CN', mergeZH)
Vue.locale('en-US', mergeEN)

// Auto language
Util.setLocalLanguage('')

Vue.config.productionTip = false

/* eslint-disable no-new */
var vmApp = new Vue({
  el: '#app',
  router,
  store: store,
  template: '<App/>',
  components: { App }
})

window.vueAPP = vmApp
