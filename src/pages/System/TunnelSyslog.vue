/**
* Created by blood on 2017/7/13.
*/
<template>
  <div>
    <Row>
      <Col :xs="2" :sm="4" :md="4" :lg="8"></Col>
      <Col :xs="20" :sm="16" :md="16" :lg="8">
        <Form :model="currData" label-position="right" :label-width="200" :rules="rules">
          <Form-item label="启用隧道日志">
            <i-switch size="large" v-model="currData.enabled">
              <span slot="open">启用</span>
              <span slot="close">禁用</span>
            </i-switch>
          </Form-item>
          <Form-item label="监听地址" prop="user">
            <Input v-model="currData.ipaddr"></Input>
          </Form-item>
          <Form-item label="端口号" prop="password">
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
        rules: {
          user: [
            { required: true, message: '请填写用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请填写密码', trigger: 'blur' },
            { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
          ]
        }
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
      computeRules () {
        console.log('cc')
      },
      fetchData () {
        console.log('Do something')
        // Template 合并
        // userData 合并
        // TODO: 这并不是最好的方法，请参考vuex中关于vm-model说明，应使用mutations来处理
        if (this.$store.state.system.curTemplate.tun_syslog) {
          this.currTemp = this.$store.state.system.curTemplate.tun_syslog
        }
        if (this.$store.state.system.data.tun_syslog) {
          this.currData = this.$store.state.system.data.tun_syslog
        }
      }
    }
  }
</script>

<style scoped>
</style>
