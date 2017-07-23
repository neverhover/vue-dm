import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'

Vue.use(Router)

const home = r => require.ensure([], () => r(require('@/pages/home')), 'home')
const systemTunnelSyslog = r => require.ensure([], () => r(require('@/pages/System/TunnelSyslog')), 'system_tunnel_syslog')
const systemSysSyslog = r => require.ensure([], () => r(require('@/pages/System/SysSyslog')), 'system_sys_syslog')

const routes = [
  {
    name: 'Main',
    path: '/',
    component: home,
    children: [
      { name: 'system_tunnel_syslog', path: 'system/tunnel_syslog', component: systemTunnelSyslog },
      { name: 'system_sys_syslog', path: 'system/sys_syslog', component: systemSysSyslog },
      { name: 'network_route', path: 'network/route', component: resolve => require(['@/pages/Network/Route/list'], resolve) },
      { name: 'network_route_form', path: 'network/route/form/:id?', component: resolve => require(['@/pages/Network/Route/form'], resolve) },
      { name: 'network_interface', path: 'network/interface', component: resolve => require(['@/pages/Network/Interface/list'], resolve) },
      { name: 'network_interface_form', path: 'network/interface/form/:id?', component: resolve => require(['@/pages/Network/Interface/form'], resolve) },
      { name: 'network_switch', path: 'network/switch', component: resolve => require(['@/pages/Network/Switch/list'], resolve) },
      { name: 'network_switch_form', path: 'network/switch/form/:id?', component: resolve => require(['@/pages/Network/Switch/form'], resolve) },
      { name: 'network_traffic', path: 'network/traffic', component: resolve => require(['@/pages/Network/Traffic/list'], resolve) },
      { name: 'network_traffic_form', path: 'network/traffic/form/:id?', component: resolve => require(['@/pages/Network/Traffic/form'], resolve) },
      { name: 'wireless_main', path: 'wireless/main', component: resolve => require(['@/pages/Wireless/main'], resolve) }
    ],
    meta: {
      requiredAuth: true
    }
  },
  {
    name: 'Edit',
    path: '/edit/:sid',
    component: home,
    meta: {
      requiredAuth: true
    }
  }
]

const router = new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production'
})

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  // console.log(to)
  // console.log(from)
  // console.log(Home.methods.getActiveName())
  if (to.matched.some(record => record.meta.requiredAuth)) {
    // 请参考vue-router中关于路由元信息的使用方法
    // console.log('need auth')
    next()
  } else {
    next()
  }
})

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish()
})

export default router
