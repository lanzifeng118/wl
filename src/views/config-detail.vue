<template>
  <div class="config-detail">
    <div class="config-detail-back">
      <span>{{name}}</span>
      <Button type="error" size="small" shape="circle" icon="close-round" @click="back"></Button>
    </div>
    <Tabs v-if="items.length" :animated="false" type="card" v-model="activeTab" @on-click="tabChange">
      <TabPane v-for="(item, index) in items" :label="item.cfg_statement" :name="index.toString()">
        <Button class="config-detail-add" type="primary" size="small" shape="circle" icon="plus-round" @click="setForm('add')">添加</Button>
        <Table height="600" :columns="columns" :data="tableData" :border="true" size="small"></Table>
      </TabPane>
    </Tabs>
    <Spin fix v-show="loading">
      <Icon type="load-c" size=18 class="spin-icon-load"></Icon>
      <div>加载中</div>
    </Spin>
    <v-form v-if="form.show" :type="form.type" :labels="form.labels" :row="form.row" :title="form.title" @close="closeForm"></v-form>
  </div>
</template>
<script>
import action from 'components/config/action'
import vForm from 'components/config/form'
export default {
  data() {
    return {
      loading: true,
      activeTab: '0',
      items: [],
      columns: [],
      tableData: [],
      form: {
        type: '',
        show: false,
        params: null,
        labels: [],
        title: ''
      }
    }
  },
  computed: {
    name() {
      try {
        return decodeURI(this.$route.query.name)
      } catch (error) {
        return void 0
      }
    }
  },
  watch: {
    $route(to, from) {
      this.getData()
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      if (!this.name) {
        this.back()
      }
      console.log(this.name)

      this.loading = true

      this.loading = false
      let data = {
        code: 57808,
        data: [
          {
            cfg_id: 32073,
            cfg_statement: '第一项配置',
            properties: [
              {
                name: 'app_key',
                title: '应用密钥',
                format: 'input',
                type: 'string'
              },
              {
                name: 'app_secret',
                title: '应用私钥',
                format: 'input',
                type: 'string'
              }
            ],
            values: [
              {
                app_key: 'xxxxx111',
                app_secret: 'xxxx222',
                row_id: 1
              },
              {
                app_key: 'xxxxx44',
                app_secret: 'xxxx',
                row_id: 2
              }
            ]
          },
          {
            cfg_id: 32073,
            cfg_statement: '第2项配置',
            properties: [
              {
                name: 'app_key',
                title: '应用密钥1',
                format: 'input',
                type: 'string'
              },
              {
                name: 'app_secret',
                title: '应用私钥',
                format: 'input',
                type: 'string'
              }
            ],
            values: [
              {
                app_key: 'xxxxx1',
                app_secret: 'xxxx2',
                row_id: 1
              },
              {
                app_key: 'xxxxx',
                app_secret: 'xxxx',
                row_id: 2
              }
            ]
          }
        ],
        msg: '测试内容5n6f'
      }
      this.items = data.data
      this.setColumns()
      this.setTableData()
    },
    setColumns() {
      let columns = []
      let data = this.items[this.activeTab]
      data &&
        data.properties &&
        data.properties.forEach(val => {
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
      return h(action, {
        on: {
          edit: () => {
            console.log('1111')
            this.setForm('edit', params)
          },
          deleteM: () => {
            this.deleteM(params)
          }
        }
      })
    },
    setForm(type, params) {  
      this.form.type = type
      this.form.labels = this.columns.slice(0, -1)
      this.form.row = params ? params.row : {}
      this.form.title = this.getRowTitle(params)
      this.form.show = true
    },
    deleteM(params) {
      this.$Modal.confirm({
        title: 'DELETE',
        content: `<p>确定删除${this.getRowTitle(params)}</p>`,
        loading: true,
        onOk: () => {
          setTimeout(() => {
            this.$Modal.remove()
            this.$Message.info( `删除成功`)
          }, 500)
        }
      })
    },
    closeForm(){
      this.form.show = false
    },
    back() {
      this.$router.push('/config')
    },
    getRowTitle(params) {
      let title = `【${this.name}】-【${this.items[this.activeTab].cfg_statement}】`
      if (params) {
        title = `${title} -【第${params.row._index + 1}行】`
      }
      console.log(title)
      return title
    }
  },
  components: {
    action,
    vForm
  }
}
</script>
<style>
.config-detail {
  position: relative;
  padding: 20px 25px 25px;
}
.config-detail-back {
  position: absolute;
  right: 25px;
  top: 19px;
  z-index: 2;
}
.config-detail-back span {
  float: left;
  margin-right: 5px;
  line-height: 24px;
  font-weight: bold;
  color: #999;
}
.config-detail .ivu-tabs-tabpane {
  position: relative;
  padding-top: 35px
}
.config-detail-add {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
}
.config-detail-add.ivu-btn>.ivu-icon+span, .ivu-btn>span+.ivu-icon {
  margin-left: 0;
}
</style>
