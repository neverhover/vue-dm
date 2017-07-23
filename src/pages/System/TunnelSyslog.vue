/**
* Created by blood on 2017/7/13.
*/
<template>
  <div>
    <Row>
      <Col :xs="2" :sm="4" :md="4" :lg="8"></Col>
      <Col :xs="20" :sm="16" :md="16" :lg="8">
        <Form :model="currData" label-position="right" :label-width="200">
          <Form-item label="启用隧道日志">
            <i-switch size="large" v-model="currData.enabled">
              <span slot="open">启用</span>
              <span slot="close">禁用</span>
            </i-switch>
          </Form-item>
          <Form-item label="监听地址">
            <Input v-model="currData.ipaddr"></Input>
          </Form-item>
          <Form-item label="端口号">
            <Input :max="65535" :min="1" v-model="currData.port"></Input>
          </Form-item>
        </Form>
      </Col>
      <Col :xs="2" :sm="4" :md="4" :lg="8"></Col>
    </Row>

  </div>
</template>

<script>
  export default {
    name: 'tunnel-syslog',
    data () {
      return {
        currData: {},
        currTemp: {},
        vmodel: {}
      }
    },
    created () {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      console.log('Tunnel created')
      this.fetchData()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        console.log('Do something')
        // Template 合并
        // userData 合并
      }
    }
  }
</script>

<style scoped>
</style>
