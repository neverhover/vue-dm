/**
* Created by blood on 2017/7/13.
*/
<template>
  <div>
    <Row>
      <Col :xs="2" :sm="4" :md="4" :lg="4">
      &nbsp;
      </Col>
      <Col :xs="20" :sm="16" :md="16" :lg="16">
        <Form :model="currData" label-position="right" :label-width="100">
          <Form-item :label="$t('wireless.bandSteering')">
            <i-switch size="large" v-model="currData.bandsteering.enabled">
              <span slot="open">{{$t('common.textEnabled')}}</span>
              <span slot="close">{{$t('common.textDisabled')}}</span>
            </i-switch>
            <Select v-model="currData.bandsteering.mode" style="width:200px" :disabled="!currData.bandsteering.enabled">
              <Option v-for="item in bandSteeringList" :value="item.value" :key="item">{{ item.label }}</Option>
            </Select>
          </Form-item>
          <Form-item :label="$t('wireless.countryCode')" >
            <Select v-model="currData.countrycode" style="width:30%">
              <Option v-for="item in countryList" :value="item.value" :key="item" >{{ item.label }}</Option>
            </Select>
          </Form-item>

        </Form>
        <Tabs :animated="true">
          <Tab-pane v-for="(el, idx) in currTemp.radio" :key="el.frequency" :label="initRadioLabel(el, idx)">
            <Form :model="el" label-position="right" :label-width="100">
              <!--@@启用Radio-->
              <Form-item :label="$t('wireless.radioStatus')">
                <i-switch size="large" v-model="getRadioObj(idx).enabled">
                  <span slot="open">{{$t('common.textEnabled')}}</span>
                  <span slot="close">{{$t('common.textDisabled')}}</span>
                </i-switch>
              </Form-item>
              <!--@@模式-->
              <Form-item :label="$t('wireless.ieeeMode')" >
                <Select v-model="getRadioObj(idx).ieeemode" style="width:30%">
                  <Option v-for="item in el.ieeemode.list" :value="item" :key="item" >{{ item }}</Option>
                </Select>
              </Form-item>
              <!--@@信道-->
              <Form-item :label="$t('wireless.channel')" >
                <Select v-model="getRadioObj(idx).channel" style="width:30%">
                  <Option v-for="item in el.ieeemode.list" :value="item" :key="item" >{{ item }}</Option>
                </Select>
              </Form-item>
              <!--@@频宽-->
              <Form-item :label="$t('wireless.htmode')">
                <Select v-model="getRadioObj(idx).htmode" style="width:30%">
                  <Option v-for="item in el.htmode.list" :value="item" :key="item" >{{ item }}</Option>
                </Select>
              </Form-item>
              <!--@@功率-->
              <Form-item :label="$t('wireless.txpower')" style="width:45%">
                <Slider v-model="getRadioObj(idx).txpower" show-input :min="initPower(el, 'min')"
                        :max="initPower(el, 'max')"></Slider>
              </Form-item>
              <!--@@高级选项-->
              <Collapse>
                <Panel name="1">
                  {{ $t('wireless.advanceSettings') }}
                  <p slot="content">
                    <Form-item :label="$t('wireless.txpower')" style="width:45%">
                      <Slider v-model="getRadioObj(idx).txpower" show-input :min="initPower(el, 'min')"
                              :max="initPower(el, 'max')"></Slider>
                    </Form-item>
                  </p>
                </Panel>
              </Collapse>
              <br>
              <Table width="100%" border :columns="columns2" :data="data3"></Table>
              <br>
              <Button type="primary" size="large" ><Icon type="ios-download-outline"></Icon> 导出自定义数据</Button>
            </Form>
          </Tab-pane>
        </Tabs>
      </Col>
      <Col :xs="2" :sm="4" :md="4" :lg="4">
      &nbsp;
      </Col>
    </Row>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'wirelss-main',
    data () {
      return {
        currData: {},
        currTemp: {},
        countryList: [],
        bandSteeringList: [],
        columns2: [
          {
            title: '姓名',
            key: 'name',
            width: 100,
            fixed: 'left'
          },
          {
            title: '年龄',
            key: 'age',
            width: 100
          },
          {
            title: '省份',
            key: 'province',
            width: 100
          },
          {
            title: '市区',
            key: 'city',
            width: 100
          },
          {
            title: '地址',
            key: 'address',
            width: 200
          },
          {
            title: '邮编',
            key: 'zip',
            width: 100
          },
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 120,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  }
                }, '编辑')
              ])
            }
          }
        ],
        data3: [
          {
            name: '王小明',
            age: 18,
            address: '北京市朝阳区芍药居',
            province: '北京市',
            city: '朝阳区',
            zip: 100000
          },
          {
            name: '张小刚',
            age: 25,
            address: '北京市海淀区西二旗',
            province: '北京市',
            city: '海淀区',
            zip: 100000
          },
          {
            name: '李小红',
            age: 30,
            address: '上海市浦东新区世纪大道',
            province: '上海市',
            city: '浦东新区',
            zip: 100000
          },
          {
            name: '周小伟',
            age: 26,
            address: '深圳市南山区深南大道',
            province: '广东',
            city: '南山区',
            zip: 100000
          }
        ]
      }
    },
    created () {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      console.log('WirelessMain created')
      this.fetchData()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData',
      '$lang': (e) => {
        console.log('Language changed')
        this.initCountryList()
        this.initBandSteeringList()
      }
    },
    methods: {
      computeRules () {
        console.log('cc')
      },
      getRadioObj (index) {
        return this.currData.radio[index]
      },
      initRadioLabel (item, index) {
        return `${item.frequence.default} (Radio${index})`
      },
      initCountryList () {
        for (let j in this.currTemp.country.list) {
          Vue.set(this.countryList, j, {
            label: Vue.t('wireless.countryCodeList.' + this.currTemp.country.list[j]),
            value: this.currTemp.country.list[j]
          })
        }
      },
      initBandSteeringList () {
        for (let j in this.currTemp.bandsteering.default.mode.list) {
          Vue.set(this.bandSteeringList, j, {
            label: Vue.t('wireless.' + this.currTemp.bandsteering.default.mode.list[j]),
            value: this.currTemp.bandsteering.default.mode.list[j]
          })
        }
      },
      initPower (radio, name) {
        if (radio && radio.txpower && radio.txpower.spec.range) {
          if (name === 'max') {
            return radio.txpower.spec.range.max
          } else if (name === 'min') {
            return radio.txpower.spec.range.minx
          }
        }
        console.log(radio.txpower.spec.range.max)
      },
      fetchData () {
        console.log('Do something')
        // Template 合并
        // userData 合并
        // TODO: 这并不是最好的方法，请参考vuex中关于vm-model说明，应使用mutations来处理
        if (this.$store.state.wireless.curTemplate) {
          this.currTemp = this.$store.state.wireless.curTemplate
          this.initCountryList()
          this.initBandSteeringList()
        }
        if (this.$store.state.wireless.data) {
          this.currData = this.$store.state.wireless.data
        }
      }
    }
  }
</script>

<style scoped>
</style>
