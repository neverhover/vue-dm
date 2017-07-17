# vue-dm

> A Device Managment with Vue2

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 目录说明

### src目录内

  api 存放需要与后台交互的请求，使用axios
  components 存放公共的组件
  event 存放全局事件总线
  libs 存放工具库，包含国际化设置
  locale 国际化文件存放
  mock 模拟后台数据，目前使用mockjs实现，需要改成express
  pages 实际所有的页面
  router 路由定义
  store 存储定义
  styles 样式表
