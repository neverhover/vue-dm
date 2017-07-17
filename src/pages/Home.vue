/**
* Created by blood on 2017/7/12.
*/
<template>
  <div class="layout" id="app">
    <Menu mode="horizontal" theme="dark" >
      <div class="layout-logo"></div>
      <div class="layout-nav">
        <Row>
          <Col span="8">
          <Input v-model="configName" :placeholder="$t('common.configPlaceholder')"/>
            <!--<span slot="prepend">{{$t('common.configName')}}</span>-->
          </Col>
          <Col span="8" style="padding-left:10px">
              <Select v-model="selPro" filterable @on-change="getProTemp">
                <Option v-for="item in proList" :value="item.value" :key="item">{{ item.label }}</Option>
             </Select>
          </Col>
          <Col span="4" style="padding-left:10px">
            <Button type="primary" :loading="loading" icon="checkmark-round" @click="toApply">
              <span v-if="!loading">{{$t('common.textSave')}}</span>
              <span v-else>Loading...</span>
            </Button>
          </Col>

          <Col span="4" style="padding-left:10px">
          <Select v-model="curLang" filterable @on-change="setLanguage">
            <Option v-for="item in langList" :value="item.value" :key="item">{{ item.label }}</Option>
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

            <Menu-group title="无线设置">

              <Menu-item name="wireless_main">
                <Icon type="wifi"></Icon>
                无线设置
              </Menu-item>
            </Menu-group>
            <Menu-group title="网络设置">

              <Menu-item name="network_route">
                <Icon type="merge"></Icon>
                路由
              </Menu-item>
              <Menu-item name="network_interface">
                <Icon type="network"></Icon>
                接口
              </Menu-item>
              <Menu-item name="network_traffic">
                <Icon type="levels"></Icon>
                流控
              </Menu-item>
              <Menu-item name="network_switch">
                <Icon type="shuffle"></Icon>
                交换机
              </Menu-item>
            </Menu-group>
            <Menu-group title="APP设置">
              <Menu-item name="app_main">
                <Icon type="android-apps"></Icon>
                APP配置
              </Menu-item>
            </Menu-group>
            <Menu-group title="系统设置">

              <Menu-item name="system_tunnel_syslog" >
                <Icon type="ios-color-wand"></Icon>
                隧道代理日志
              </Menu-item>
              <Menu-item name="system_sys_syslog">
                <Icon type="ios-color-wand-outline"></Icon>
                系统日志
              </Menu-item>
            </Menu-group>
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
  import api from '@/api'
  import Util from '@/libs/utils'

  export default {
    name: 'home',
    data () {
      return {
        configName: '',
        activeName: 'wireless_main',
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
        selPro: 'chongqing',
        langList: [
          {
            value: 'zh-CN',
            label: '简体中文'
          },
          {
            value: 'en-US',
            label: 'English'
          },
          {
            value: 'zh-TW',
            label: '繁体中文'
          }
        ],
        curLang: 'zh-CN',
        loading: false
      }
    },
    methods: {
      setLanguage (e) {
        console.log(e)
        Util.setLocalLanguage(e)
      },
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
      },
      toApply () {
        this.loading = true
        // TODO: ajax保存配置

        let param = {
          selPro: this.selPro
        }
        api.commitProCfg(param).then((res) => {
          this.$Message.success({
            content: '成功',
            top: 100,
            duration: 3
          })
          this.loading = false
          console.info(res.data)
        }).catch((err) => {
          console.warn(err)
        })
      }
    },
    created () {
      this.routeChange(this.activeName)
      this.curLang = Util.getLocalLanguage()
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
    width: 60%;
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

