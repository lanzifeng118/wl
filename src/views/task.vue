<template>
  <div class="task">
    <div class="task-top">
      <Button v-if="schedule !== null" :type="schedule ? 'warning' : 'success'" :icon="schedule ? 'pause' : 'play'" @click="changeSchedule">{{schedule ? '停止' : '启动'}}任务调度器</Button>
    </div>
    <Table :height="tableHeight" :columns="columns" :data="jobs" :border="true" size="small" :loading="loading"></Table>
    <!-- edit -->
    <Modal class="task-modal" v-model="edit.modal" width="600" :closable="false" :mask-closable="false">
      <v-form :data="edit.data" @input="editInput"></v-form>
      <div slot="footer">
        <Button size="large" type="text" :loading="edit.submiting" @click="cancle">取消</Button>
        <Button type="primary" size="large" :loading="edit.submiting" @click="submit">提交</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import action from 'components/task/action'
import status from 'components/task/status'
import vForm from 'components/task/v-form'
import api from 'libs/api'

export default {
  data() {
    return {
      edit: {
        modal: false,
        data: {},
        submiting: false
      },
      loading: true,
      columns: [
        {
          title: '应用名称',
          align: 'center',
          key: 'app_name'
        },
        {
          title: '任务名称',
          align: 'center',
          key: 'name'
        },
        {
          title: '状态',
          align: 'center',
          width: 120,
          render: this.renderStatus
        },
        {
          title: '上一次执行时间',
          align: 'center',
          key: 'last_run_at'
        },
        {
          title: '下一次执行时间',
          align: 'center',
          key: 'next_run_at'
        },
        {
          title: '时间表达式',
          align: 'center',
          key: 'repeat_interval'
        },
        {
          title: '操作',
          align: 'center',
          width: 240,
          render: this.renderAction
        }
      ],
      jobs: [],
      schedule: null // 0：停止；1：启动
    }
  },
  computed: {
    tableHeight() {
      return this.$store.getters.winHeigth - 150
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData(reload = false, callback) {
      // 1：online；2：stopped；3：unload
      if (!reload) {
        this.loading = true
      }
      this.axios(api.task.list())
        .then(res => {
          let data = res.data
          console.log(data)
          this.loading = false
          if (data.code === 200) {
            // data.data[0].loop_delay = '600ms'
            this.jobs = data.data.job
            this.schedule = data.data.schedule
            callback && callback()
          }
        })
        .catch(err => {
          console.log(err)
          callback && callback()
          this.$Message.error(`获取列表失败`)
        })
    },
    renderStatus(h, params) {
      return h(status, {
        props: {
          status: params.row.enable,
          schedule: this.schedule
        }
      })
    },
    renderAction(h, params) {
      // console.log(params)
      return h(action, {
        props: {
          params: params,
          schedule: this.schedule
        },
        on: {
          start: () => {
            this.actionClick('start', params)
          },
          stop: () => {
            this.actionClick('stop', params)
          },
          edit: () => {
            let job = this.jobs[params.index]
            this.$set(this.edit.data, 'name', job.name)
            this.$set(this.edit.data, 'repeat_interval', job.repeat_interval)
            this.edit.modal = true
          }
        }
      })
    },
    editInput(val) {
      this.$set(this.edit.data, 'repeat_interval', val)
    },
    actionClick(type, params) {
      let text,
        name = params.row.name
      switch (type) {
        case 'start':
          text = '开启'
          break
        case 'stop':
          text = '停止'
          break
      }
      this.$Modal.confirm({
        title: type.toUpperCase(),
        content: `<p>确定${text}任务【${name}】</p>`,
        loading: true,
        onOk: () => {
          this.axios(api.task[`${type}Job`](name))
            .then(res => {
              let data = res.data
              console.log(data)
              if (data.code === 200) {
                this.getData(true, () => {
                  this.$Message.success(`${text}任务【${name}】成功`)
                  this.$Modal.remove()
                })
              }
            })
            .catch(err => {
              this.$Message.error(`${text}任务【${name}】失败`)
              this.$Modal.remove()
            })
        }
      })
    },
    changeSchedule() {
      let text, action
      console.log(this.schedule)
      switch (this.schedule) {
        case 0:
          action = 'start'
          text = '开启'
          break
        case 1:
          action = 'stop'
          text = '停止'
          break
      }
      this.$Modal.confirm({
        title: action.toUpperCase(),
        content: `<p>确定${text}任务调度器</p>`,
        loading: true,
        onOk: () => {
          this.axios(api.task[`${action}Scheduel`]())
            .then(res => {
              let data = res.data
              console.log(data)
              if (data.code === 200) {
                this.getData(true, () => {
                  this.$Message.success(`${text}任务调度器成功`)
                  this.$Modal.remove()
                })
              }
            })
            .catch(err => {
              this.$Message.error(`${text}任务调度器失败`)
              this.$Modal.remove()
            })
        }
      })
    },
    submit() {
      this.edit.submiting = true
      this.axios(api.task.editJob(this.edit.data))
        .then(res => {
          this.edit.submiting = false
          let data = res.data
          console.log(data)
          if (data.code === 200) {
            this.edit.modal = false
            this.getData(true, () => {
              this.$Message.success('修改成功!')
            })
          } else if (data.code === 101) {
            this.$Message.error('时间表达式有误，修改失败!')
          } else {
            this.$Message.error('修改失败!')
          }
        })
        .catch(err => {
          this.edit.submiting = false
          this.$Message.error('服务器出错了!')
        })
    },
    cancle() {
      this.edit.modal = false
    },
    close() {
      this.mask = false
    }
  },
  components: {
    action,
    status,
    vForm
  }
}
</script>

<style>
.task {
  margin: 23px;
}
.task-top {
  margin-bottom: 15px;
}
.task-form-content {
  position: relative;
  padding: 20px;
  border-radius: 5px;
  background-color: #fff;
  width: 600px;
  margin: 100px auto;
}
.task-form-title {
  text-align: center;
  margin-bottom: 20px;
}
.task-form-content
  .ivu-btn-circle.ivu-btn-icon-only.ivu-btn-small.task-form-close {
  position: absolute;
  z-index: 2;
  top: 12px;
  right: 12px;
  width: 20px;
  height: 20px;
  font-size: 12px;
}
.task-tooltip {
  position: absolute;
  top: 0;
  left: -95px;
}
.task-tooltip a {
  color: #fff;
}
.task-modal .ivu-modal-footer {
  border-top: none;
}
</style>
