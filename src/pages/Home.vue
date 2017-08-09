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
            <Select v-model="selPro"  @on-change="getProTemp" :disabled="selProDisable">
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
  // Import Event Bus

  export default {
    name: 'home',
    data () {
      return {
        configName: '',
        activeName: 'wireless_main',
        openName: 'system',
        proList: [
          {
            value: 'NFT 2ac',
            label: 'NFT 2ac'
          },
          {
            value: 'NFT 3ac',
            label: 'NFT 3ac'
          },
          {
            value: 'NSAP A160',
            label: 'NSAP-A160'
          },
          {
            value: 'DLB 2-9B',
            label: 'DLB 2-9B'
          },
          {
            value: 'NFT 1N AF',
            label: 'NFT 1N AF'
          },
          {
            value: 'DLB 2-15',
            label: 'DLB 2-15'
          }
        ],
        selPro: 'NFT 3ac',
        selProDisable: false,
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
        this.$store.dispatch('setCurUserConfig', {})
        console.log('Commit user config')
        console.log(this.$store.getters.getCurUserConfig)
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
      // 设置默认语言
      this.curLang = Util.getLocalLanguage()
      console.log(this.$route.params.sid)
      let comThis = this
      // 如果是编辑模式则向服务端获取数据，并重新初始化界面
      if (this.$route.params.sid !== undefined) {
        this.selProDisable = true
        // 根据id获取其对应的产品名称
        let param = {
//        pname: this.$route.params.sid
        }

        let editPage = async () => {
          let res = await api.getConfigSetInfo(param, comThis)
          console.info('**********************')
          console.info(res)
          console.info('**********************')
          // 成功获取用户的配置后，初始化该界面
          comThis.selPro = res.data.proTemplName
          comThis.configName = res.data.configName
          // 根据所选择的产品名，获取该产品的配置模版
          let proData = await api.getProTempInfo(res)
          console.warn('vvvvvvvvvvvvvvv')
          console.log(proData)
          console.log(res.data)
          console.warn('vvvvvvvvvvvvvvv')
          // 通过vuex设置root下的状态数据
          comThis.$store.dispatch('setProTempl', proData)
          comThis.$store.dispatch('setUsrData', res.data.usrData)
          // 数据初始化完成后切换到默认页
          // TODO:该部分还需要优化调整，存在重复。#1 在数据异步获取完成后初始化组件
          this.routeChange(this.activeName)
        }
        editPage()
        // 混合用户配置 和 产品模版
      } else {
        let newPage = async () => {
          // 通过vuex设置root下的状态数据
          let res = {
            data: {
              proTemplName: ''
            }
          }
          res.data.proTemplName = comThis.selPro
          let proData = await api.getProTempInfo(res)
          comThis.$store.dispatch('setProTempl', proData)
          comThis.$store.dispatch('setUsrData', {})
          // 数据初始化完成后切换到默认页
          // TODO:该部分还需要优化调整，存在重复。#1 在数据异步获取完成后初始化组件
          this.routeChange(this.activeName)
        }
        newPage()
      }
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
    /*background: #5b6270;*/
    background-image: url('/static/static/img/favicons/favicon.ico');
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
    min-height: 300px;
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

