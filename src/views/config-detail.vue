<template>
  <div class="config-detail">
    <div class="config-detail-back">
      <span>{{name}}</span>
      <Button type="error" size="small" shape="circle" icon="close-round" class="color-error" @click="back"></Button>
    </div>
    <Tabs v-if="items.length" :animated="false" type="card" v-model="activeTab" @on-click="tabChange">
        <TabPane v-for="(item, index) in items" :label="item.cfg_statement" :name="index.toString()">
          <Table height="600" :columns="columns" :data="tableData" :border="true" size="small"></Table>
        </TabPane>
    </Tabs>
    <Spin fix v-show="loading">
      <Icon type="load-c" size=18 class="spin-icon-load"></Icon>
      <div>加载中</div>
    </Spin>
  </div>
</template>
<script>
import action from 'components/config/action'
export default {
  data() {
    return {
      loading: true,
      activeTab: '0',
      items: [],
      columns: [],
      tableData: [],
      name: ''
    }
  },
  watch: {
    '$route'(to, from) {
      this.getData()
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData() {
      this.name = decodeURI(this.$route.query.name)

      this.loading = true

      this.loading = false
      let data = {
        "code": 57808,
        "data": [
          {
            "cfg_id": 32073,
            "cfg_statement": "第一项配置",
            "properties": [
              {
                "name": "app_key",
                "title": "应用密钥",
                "format": "input",
                "type": "string"
              },
              {
                "name": "app_secret",
                "title": "应用私钥",
                "format": "input",
                "type": "string"
              }
            ],
            "values": [
              {
                "app_key": "xxxxx111",
                "app_secret": "xxxx222",
                "row_id": 1

              },
              {
               "app_key": "xxxxx44",
                "app_secret": "xxxx",
                "row_id": 2
              }
            ]
          },
          {
            "cfg_id": 32073,
            "cfg_statement": "第2项配置",
            "properties": [
              {
                "name": "app_key",
                "title": "应用密钥1",
                "format": "input",
                "type": "string"
              },
              {
                "name": "app_secret",
                "title": "应用私钥",
                "format": "input",
                "type": "string"
              }
            ],
            "values": [
              {
                "app_key": "xxxxx1",
                "app_secret": "xxxx2",
                "row_id": 1

              },
              {
                "app_key": "xxxxx",
                "app_secret": "xxxx",
                "row_id": 2
              }
            ]
          }
        ],
        "msg": "测试内容5n6f"
      }
      this.items = data.data
      this.setColumns()
      this.setTableData()
    },
    setColumns() {
      let columns = []
      let data = this.items[this.activeTab]
      data && data.properties && data.properties.forEach(val => {
        columns.push({
          title: val.title,
          align: 'center',
          key: val.name
        })
      })
      columns.push({
        title: '管理',
        align: 'center',
        width: 200,
        render: this.renderAction
      })
      // console.log(columns)
      this.columns = columns
    },
    setTableData() {
      this.tableData = this.items[this.activeTab].values
    },
    tabChange(name) {
      this.activeTab = name
      this.setColumns()
      this.setTableData()
    },
    renderAction(h, params) {
      return h(
        action, {
          props: {
          }
        }
      )
    },
    back() {
      this.$router.push('/config')
    }
  },
  components: {
    action
  }
}
</script>
<style>
.config-detail {
  position: relative;
  padding: 10px 25px 25px;
}
.config-detail-back {
  position: absolute;
  right: 25px;
  top: 9px;
  z-index: 2;
}
.config-detail-back span{
  float: left;
  margin-right: 5px;
  line-height: 24px;
  font-weight: bold;
  color: #999;
}


</style>
