<template>
  <div class="home">
    <Table :height="tableHeight" :columns="columns" :data="data" :border="true" size="small" :loading="loading"></Table>
  </div>
</template>
<script>
import action from 'components/home/action'
import note from 'components/home/note'
import restart from 'components/home/restartTime'
import status from 'components/home/status'
import api from 'libs/api'

export default {
  data() {
    return {
      loading: true,
      columns: [
        {
          title: '应用名称',
          align: 'center',
          key: 'name'
        },
        {
          title: '运行状态',
          align: 'center',
          render: this.renderStatus
        },
        {
          title: 'CPU利用率',
          align: 'center',
          render: this.renderCpu
        },
        {
          title: '内存占用大小',
          align: 'center',
          render: this.renderMemory
        },
        {
          title: '延时时间',
          align: 'center',
          render: this.renderDelay
        },
        {
          title: '重启次数',
          align: 'center',
          render: this.renderRestartTime
        },
        {
          title: '操作',
          align: 'center',
          width: 260,
          render: this.renderAction
        }
      ],
      data: [],
      timer: null
    }
  },
  computed: {
    tableHeight() {
      return this.$store.getters.winHeigth - 100
    }
  },
  created() {
    this.getData()
    this.timer = setInterval(() => {
      this.getData(true)
    }, 5000)
  },
  destroyed() {
    clearInterval(this.timer)
  },
  methods: {
    getData(reload = false, callback) {
      // 1：online；2：stopped；3：unload
      if (!reload) {
        this.loading = true
      }
      this.axios(api.dashboard.list()).then(res => {
        let data = res.data
        console.log(data)
        if (data.code === 200) {
          this.loading = false
          // data.data[0].loop_delay = '600ms'
          this.data = data.data
          callback && callback()
        }
      }).catch(err => {
        console.log(err)
        callback && callback()
        this.$Message.error(`获取列表失败`)
      })
    },
    renderStatus(h, params) {
      return h(status, {
        props: {
          status: params.row.status
        }
      })
    },
    renderCpu(h, params) {
      // console.log(params.row.monit.cpu)
      return h(note, {
        props: {
          data: params.row,
          type: 'cpu'
        }
      })
    },
    renderMemory(h, params) {
      return h(note, {
        props: {
          data: params.row,
          type: 'memory'
        }
      })
    },
    renderDelay(h, params) {
      return h(note, {
        props: {
          data: params.row,
          type: 'delay'
        }
      })
    },
    renderRestartTime(h, params) {
      return h(restart, {
        props: {
          data: params.row
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
          start: () => {
            this.actionClick('start', params)
          },
          stop: () => {
            this.actionClick('stop', params)
          },
          restart: () => {
            this.actionClick('restart', params)
          }
        }
      })
    },
    actionClick(type, params) {
      console.log(type)
      let text, name = params.row.name
      switch (type) {
        case 'start':
          text = '开启'
          break
        case 'stop':
          text = '停止'
          break
        case 'restart':
          text = '重启'
          break
      }
      this.$Modal.confirm({
        title: type.toUpperCase(),
        content: `<p>确定${text}应用【${name}】</p>`,
        loading: true,
        onOk: () => {
          this.axios(api.dashboard[type](name)).then(res => {
            let data = res.data
            console.log(data)
            if (data.code === 200) {
              this.getData(true, () => {
                this.$Message.success(`${text}成功`)
                this.$Modal.remove()
              })
            }
          }).catch(err => {
            this.$Message.error(`${text}失败`)
            this.$Modal.remove()
          })
        }
      })
    }
  },
  components: {
    action,
    note,
    restart,
    status
  }
}
</script>
<style>
.home {
  margin: 23px;
}
</style>
