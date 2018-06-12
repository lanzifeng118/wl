<template>
  <div class="me-sms">
    <div class="me-sms-buttons f-clearfix">
      <Select v-model="selectType" style="width:140px; float: left;" @on-change="changeType" placeholder="选择消息类型">
        <Option value="0">查看所有消息</Option>
        <Option value="1">查看已读消息</Option>
        <Option value="2">查看未读消息</Option>
      </Select>
      <Button style="float: right;" type="primary" icon="trash-a" @click="deleteM('all')">一键删除</Button>
    </div>
    <Table :height="tableHeight" :columns="columns" :data="data" :border="true" size="small" :loading="loading" @on-selection-change="select"></Table>
    <Page class-name="me-sms-page" :total="total" :page-size="list.page_size" @on-change="changePage"></Page>
  </div>
</template>
<script>
import action from 'components/me/sms-action'
import api from 'libs/api'

export default {
  data() {
    return {
      loading: true,
      columns: [
        {
          type: 'selection',
          align: 'center'
        },
        {
          title: '标题',
          align: 'center',
          key: 'title'
        },
        {
          title: '时间',
          align: 'center',
          key: 'time'
        },
        {
          title: '已读',
          align: 'center',
          render: this.renderMark
        },
        {
          title: '操作',
          align: 'center',
          width: 260,
          render: this.renderAction
        }
      ],
      total: 0,
      list: {
        type: 'A', // A 0 Y 1 N 2
        page_no: 0,
        page_size: 15
      },
      selectType: '',
      data: [],
      dataSelected: []
    }
  },
  computed: {
    tableHeight() {
      let w = this.$store.getters.winHeigth - 260
      let c = 40 * this.list.page_size + 32
      return Math.min(w, c)
    },
    queryType() {
      return this.$route.query.type || '0'
    }
  },
  watch: {
    $route(to, from) {
      this.selectType = this.queryType
      this.getData()
    }
  },
  created() {
    this.selectType = this.queryType
    this.getData()
  },
  methods: {
    initType() {
      switch (this.queryType) {
        case '1':
          this.list.type = 'Y'
          break;
        case '2':
          this.list.type = 'N'
          break;
      
        default:
          this.list.type = 'A'
          break;
      }
    },
    getData() {
      this.initType()
      this.loading = true
      this.axios(api.personal.smsList(this.list))
        .then(res => {
          let data = res.data
          console.log(data)
          if (data.code === 200) {
            this.loading = false
            // data.data[0].loop_delay = '600ms'
            this.data = data.data.list
            this.total = data.data.total
          }
        })
        .catch(err => {
          console.log(err)
          this.$Message.error(`获取列表失败`)
        })
    },
    renderMark(h, params) {
      let type =
        params.row.mark === 'Y'
          ? 'checkmark-circled'
          : 'android-radio-button-off'
      return h('Icon', {
        props: {
          type
        }
      })
    },
    renderAction(h, params) {
      // console.log(params)
      return h(action, {
        props: {
          params: params
        },
        on: {
          deleteM: () => {
            this.deleteM('one', params)
          },
          mark: () => {
            this.mark(params)
          }
        }
      })
    },
    mark(params) {
      let row = params.row
      if (row.mark === 'N') {
        this.axios(api.personal.smsMark([row.id])).then(res => {
            let data = res.data
            console.log(data)
            if (data.code === 200) {
              this.data[params.index].mark = 'Y'
              this.$store.dispatch('setUsersms')
            } else {
              this.$Message.error('标志已读失败!')
            }
          })
      }
      this.$Modal.info({
        title: row.title,
        content: row.content
      })
    },
    deleteM(type = 'all', params) {
      let content = '',
        ids = []
      if (type === 'all') {
        content = `<p>确定删除所选消息吗？</p>`
        if (this.dataSelected.length === 0) {
          return this.$Message.error('请选择所需删除的消息')
        }
        this.dataSelected.forEach(val => {
          ids.push(val.id)
        })
      } else {
        content = `<p>确定删除【${params.row.title}】吗？</p>`
        ids.push(params.row.id)
      }
      this.$Modal.confirm({
        title: 'DELETE',
        content,
        loading: true,
        onOk: () => {
          this.axios(api.personal.smsDelete(ids)).then(res => {
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
    select(selection) {
      this.dataSelected = selection
    },
    changeType() {
      this.$router.push({
        path: '/me/message',
        query: {
          type: this.selectType
        }
      })
    },
    changePage(page) {
      this.list.page_no = page - 1
      this.getData()
    },
  },
  components: {
    action
  }
}
</script>

<style>
.me-sms {
  padding-top: 20px;
}
.me-sms-buttons {
  margin-bottom: 20px;
}
.me-sms-page {
  margin-top: 20px;
  text-align: center;
}
</style>
