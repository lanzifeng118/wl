<template>
  <div class="config-list">
    <Table height="600" :columns="columns" :data="data" :border="true" size="small" :loading= "loading"></Table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
      columns: [{
        title: '应用名称',
        align: 'center',
        key: 'name'
      }, {
        title: '应用版本',
        align: 'center',
        key: 'version'
      }, {
        title: '最后更新时间',
        align: 'center',
        key: 'time'
      }, {
        title: '管理',
        align: 'center',
        render: this.renderStatus
      }],
      data: []
    }
  },
  created() {
    // console.log(action)
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      let data = {
        "code": 63008,
        "data": [
          {
            "alias": "测试内容x672",
            "name": "测试内容l3e7",
            "time": "测试内容p2qw",
            "version": "测试内容44z4"
          }
        ],
        "msg": "测试内容2326"
      }
      this.loading = false
      this.data = data.data
    },
    renderStatus(h, params) {
      return h('Button', {
        props: {
          type: 'primary',
          size: 'small'
        },
        on: {
          click: () => {
            this.toDetail(params.row)
          }
        }
      }, '修改配置')
    },
    toDetail(data) {
      this.$router.push('/config/detail')
    }
  },
  components: {
  }
}
</script>
<style>
.config-list {
  padding: 25px;
}
</style>
