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
  const setLang = window.localStorage.getItem('language') || localLang || 'zh-CN'
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

export default util
