<template>
  <div class="setting-detail" :style="{height: wrapHeight + 'px'}">
    <div class="setting-detail-back">
      <span>{{alias}}</span>
      <Button type="error" size="small" shape="circle" icon="close-round" @click="_back"></Button>
    </div>
    <!-- Tabs -->
    <Tabs v-if="data.length" :animated="true" type="card" v-model="activeTab" @on-click="tabChange">
      <TabPane v-for="(item, index) in data" :label="item.cfg_statement" :name="index.toString()">
        <Button class="setting-detail-add" type="primary" size="small" shape="circle" icon="plus-round" @click="setForm('add')">添加</Button>
        <!-- table -->
        <Table :height="tableHeight" :columns="item.columns" :data="item.values" :border="true" size="small"></Table>
      </TabPane>
    </Tabs>
    <!-- form -->
    <v-form v-if="form.show" :type="form.type" :index="form.index" :data="activeData" @close="closeForm" @update="getData"></v-form>
    <!-- loading -->
    <Spin fix v-show="spin">
      <Icon type="load-c" size=18 class="spin-icon-load"></Icon>
      <div>加载中</div>
    </Spin>
  </div>
</template>
<script>
import api from 'libs/api'
import action from 'components/setting/action'
import vForm from 'components/setting/form'
export default {
  data() {
    return {
      spin: true,
      data: [],
      activeTab: '0',
      form: {
        show: false,
        type: '',
        index: ''
      }
    }
  },
  computed: {
    alias() {
      try {
        return decodeURI(this.$route.query.alias)
      } catch (error) {
        this._back()
      }
    },
    name() {
      let name = this.$route.query.name
      if (name) {
        return name
      }
      this._back()
    },
    activeData() {
      return this.data[this.activeTab]
    },
    tableHeight() {
      return this.$store.getters.winHeigth - 178
    },
    wrapHeight() {
      return this.$store.getters.winHeigth - 95
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
      this.spin = true
      this.axios(api.setting.detail(this.name)).then(res => {
        let data = res.data
        console.log(data)
        if (data.code === 200) {
          this.spin = false
          data.data.forEach(val => {
            val.columns = this._getColumns(val)
          })
          this.data = data.data
        }
      })
    },
    _getColumns(data) {
      let columns = []
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
      return columns
    },
    tabChange(name) {
      this.activeTab = name
    },
    renderAction(h, params) {
      return h(action, {
        on: {
          edit: () => {
            this.setForm('edit', params.index)
          },
          deleteM: () => {
            this._delete(params)
          }
        }
      })
    },
    setForm(type = 'add', index) {
      this.form.type = type
      this.form.show = true
      this.form.index = index
    },
    closeForm() {
      this.form.show = false
    },
    _delete(params) {
      this.$Modal.confirm({
        title: 'DELETE',
        content: `<p>确定删除${this._getRowTitle(params)}</p>`,
        loading: true,
        onOk: () => {
          this.axios(api.setting.delete({
            cfg_id: this.activeData.cfg_id,
            row_id: this.activeData.values[params.index].id
          })).then(res => {
            this.$Modal.remove()
            let data = res.data
            console.log(data)
            if (data.code === 200) {
              this.$Message.success('删除成功!')
              this.getData()
            } else {
              this.$Message.error('删除失败!')
            }
          })
        }
      })
    },
    _back() {
      this.$router.push('/setting')
    },
    _getRowTitle(params) {
      let title = `【${this.alias}】-【${this.activeData.cfg_statement}】`
      if (params) {
        title = `${title} -【第${params.row._index + 1}行】`
      }
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
.setting-detail {
  position: relative;
  margin: 20px 25px 25px;
}
.setting-detail-back {
  position: absolute;
  right: 25px;
  top: 0px;
  z-index: 2;
}
.setting-detail-back span {
  float: left;
  margin-right: 5px;
  line-height: 24px;
  font-weight: bold;
  color: #999;
}
.setting-detail .ivu-tabs-tabpane {
  position: relative;
  padding-top: 35px;
}
.setting-detail-add {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
}
.setting-detail-add.ivu-btn > .ivu-icon + span,
.ivu-btn > span + .ivu-icon {
  margin-left: 0;
}
</style>
