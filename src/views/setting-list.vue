<template>
  <div class="config-list">
    <Table :height="tableHeight" :columns="columns" :data="data" :border="true" size="small" :loading= "loading"></Table>
  </div>
</template>
<script>
import api from 'libs/api'
export default {
  data() {
    return {
      loading: true,
      columns: [{
        title: '应用名称',
        align: 'center',
        key: 'alias'
      }, {
        title: '应用版本',
        align: 'center',
        key: 'version'
      }, {
        title: '最后更新时间',
        align: 'center',
        key: 'modify_time'
      }, {
        title: '管理',
        align: 'center',
        render: this.renderStatus
      }],
      data: []
    }
  },
  computed: {
    tableHeight() {
      return this.$store.getters.winHeigth - 100
    }
  },
  created() {
    // console.log(action)
    this.getData()
  },
  methods: {
    getData() {
      // 1安装中 2已安装 3未安装 4更新中 5需更新 6卸载中
      this.loading = true
      this.installedData = []
      this.axios(api.setting.list())
        .then(res => {
          this.loading = false

          let data = res.data
          console.log(data)
          if (data.code === 200) {
            // this.loading = false
            this.data = data.data
          }
        })
        .catch(err => {
          console.log(err)
          this.$Message.error(`获取列表失败`)
        })
    },
    renderStatus(h, params) {
      return h('Button', {
        props: {
          type: 'primary',
          size: 'small',
          icon: 'edit'
        },
        on: {
          click: () => {
            this.toDetail(params.row)
          }
        }
      }, '修改配置')
    },
    toDetail(data) {
      this.$router.push({
        path: '/setting/detail',
        query: {
          name: data.name,
          alias: encodeURI(data.alias)
        }
      })
    }
  },
  components: {
  }
}
</script>
<style>
.config-list {
  margin: 23px;
}
</style>
