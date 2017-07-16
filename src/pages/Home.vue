/**
* Created by blood on 2017/7/12.
*/
<template>
  <div class="layout" id="app">
    <Menu mode="horizontal" theme="dark" >
      <div class="layout-logo"></div>
      <div class="layout-nav">
        <Row>
          <Col span="12">
          <Input v-model="configName" placeholder="请输入配置名"  />
          </Col>
          <Col span="12" style="padding-left:10px">

              <Select v-model="selPro" filterable @on-change="getProTemp">
                <Option v-for="item in proList" :value="item.value" :key="item">{{ item.label }}</Option>
             </Select>
          </Col>
        </Row>

      </div>
    </Menu>
    <!--
    <Menu mode="horizontal" active-name="1">
      <div class="layout-assistant">
        <Menu-item name="1">二级导航</Menu-item>
        <Menu-item name="2">二级导航</Menu-item>
        <Menu-item name="3">二级导航</Menu-item>
      </div>
    </Menu>
    -->
    <div class="layout-content">
      <Row>
        <i-col span="3">
          <Menu :active-name="activeName" width="auto" :open-names="[openName]" @on-select="routeChange" ref="sidebar" >
            <Submenu name="system">
              <template slot="title">
                <Icon type="gear-b"></Icon>
                系统设置
              </template>

              <Menu-item name="system_tunnel_syslog" >
                隧道代理日志
              </Menu-item>
              <Menu-item name="system_sys_syslog">
                系统日志
              </Menu-item>
            </Submenu>
            <Submenu name="wireless">
              <template slot="title">
                <Icon type="wifi"></Icon>
                无线设置
              </template>
              <Menu-item name="wireless_main">无线</Menu-item>
            </Submenu>
            <Submenu name="network">
              <template slot="title">
                <Icon type="network"></Icon>
                网络设置
              </template>
              <Menu-item name="network_route">路由</Menu-item>
              <Menu-item name="network_interface">接口</Menu-item>
              <Menu-item name="network_traffic">流控</Menu-item>
              <Menu-item name="network_switch">交换机</Menu-item>
            </Submenu>
            <Submenu name="4">
              <template slot="title">
                <Icon type="android-apps"></Icon>
                APP设置
              </template>
              <Menu-item name="4-1">选项 1</Menu-item>
              <Menu-item name="4-2">选项 2</Menu-item>
            </Submenu>
          </Menu>
        </i-col>
        <i-col span="21">
          <div class="layout-content-main">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </div>
        </i-col>
      </Row>
    </div>
    <div class="layout-copy">
      2011-2016 &copy; Ligowave
    </div>
  </div>
</template>

<script>
  import api from '@/api/index'
  export default {
    name: 'home',
    data () {
      return {
        configName: '',
        activeName: 'system_tunnel_syslog',
        openName: 'system',
        proList: [
          {
            value: 'beijing',
            label: '北京市'
          },
          {
            value: 'shanghai',
            label: '上海市'
          },
          {
            value: 'shenzhen',
            label: '深圳市'
          },
          {
            value: 'hangzhou',
            label: '杭州市'
          },
          {
            value: 'nanjing',
            label: '南京市'
          },
          {
            value: 'chongqing',
            label: '重庆市'
          }
        ],
        selPro: 'chongqing'
      }
    },
    methods: {
      routeChange (e) {
        this.$router.push({ name: e })
      },
      getProTemp (v) {
        console.log(v)
        let param = {
//          pname: v
        }
        api.getProTemp(param).then((res) => {
          console.log(res)
        }).catch((err) => {
          console.warn(err)
        })
      },
      activeChnage (e) {
        this.activeName = e
        this.$nextTick(() => {
          this.$refs.sidebar.updateActiveName()
          this.$refs.sidebar.$children.forEach((item) => {
            item.opened = false
          })
          this.$refs.sidebar.updateOpened()
        })
      },
      getActiveName () {
        return this.activeName
      }
    },
    created () {
      this.routeChange(this.activeName)
    }
  }
</script>

<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #eee;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav{
    width: 420px;
    margin: 0 auto;
  }
  .layout-assistant{
    width: 300px;
    margin: 0 auto;
    height: inherit;
  }
  .layout-breadcrumb{
    padding: 10px 15px 0;
  }
  .layout-content{
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  .layout-content-main{
    padding: 10px;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
</style>

