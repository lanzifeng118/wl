<template>
  <div class="home">
    <Table height="600" :columns="columns" :data="data" :border="true" size="small" :loading="loading"></Table>
  </div>
</template>
<script>
import action from 'components/home/action'
import cpu from 'components/home/cpu'
import memory from 'components/home/memory'
import delay from 'components/home/delay'
import status from 'components/home/status'

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
          key: 'restart_time'
        },
        {
          title: '操作',
          align: 'center',
          width: 200,
          render: this.renderAction
        }
      ],
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
        code: 63008,
        data: [
          {
            ins_id: 34461,
            loop_delay: '302ms',
            monit: {
              cpu: 60,
              memory: 26040
            },
            name: '测试内容n7cz',
            restart_time: 2538400,
            status: 1, // 1 online 2 stopped
            up_time: 21347
          },
          {
            ins_id: 34461,
            loop_delay: '30ms',
            monit: {
              cpu: 75,
              memory: 26040541547
            },
            name: '测试内容n7cz',
            restart_time: 25384,
            status: 2, // 1 online 2 stopped
            up_time: 21347
          },
          {
            ins_id: 34461,
            loop_delay: '800ms',
            monit: {
              cpu: 81,
              memory: 260400541
            },
            name: '测试内容n7cz',
            restart_time: 25384,
            status: 2, // 1 online 2 stopped
            up_time: 21347
          }
        ],
        msg: '测试内容ns04'
      }
      this.loading = false
      this.data = data.data
    },
    renderStatus(h, params) {
      return h(status, {
        props: {
          status: params.row.status
        }
      })
    },
    renderCpu(h, params) {
      return h(cpu, {
        props: {
          data: params.row.monit.cpu,
          type: 'cpu'
        }
      })
    },
    renderMemory(h, params) {
      return h(memory, {
        props: {
          data: params.row.monit.memory,
          type: 'memory'
        }
      })
    },
    renderDelay(h, params) {
      return h(delay, {
        props: {
          data: params.row.loop_delay,
          type: 'delay'
        }
      })
    },
    renderAction(h, params) {
      console.log(params)
      return h(action, {
        props: {
          params: params
        },
        on: {
          start: () => { this.actionClick('start', params) },
          stop: () => { this.actionClick('stop', params) },
          restart: () => { this.actionClick('restart', params) }
        }
      })
    },
    actionClick(type, params) {
      console.log(type)
      let text
      switch (type) {
        case 'start':
          text = '开启'
          break;
        case 'stop':
          text = '停止'
          break;
        case 'restart':
          text = '重启'
          break;
      }
      this.$Modal.confirm({
        title: type.toUpperCase(),
        content: `<p>确定${text}应用【${params.row.name}】</p>`,
        loading: true,
        onOk: () => {
          setTimeout(() => {
            this.$Modal.remove()
            this.data[params.index].status = type === 'stop' ? 2 : 1 // 1 online 2 stopped
            this.$Message.info( `${text}成功`)
          }, 500)
        }
      })
    }
  },
  components: {
    action,
    cpu,
    memory,
    delay,
    status
  }
}
</script>
<style>
.home {
  padding: 25px;
}
</style>
