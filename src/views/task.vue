<template>
  <div class="task">
    <Table :height="tableHeight" :columns="columns" :data="data" :border="true" size="small" :loading="loading"></Table>
    <div v-if="mask" class="task-form ivu-modal-mask">
      <div class="task-form-content">
        <Button type="error" size="small" shape="circle" icon="close-round" class="task-form-close" @click="close"></Button>
        <Form ref="formValidate" :model="model" label-position="right" :label-width="100">
          <FormItem label="任务名称">
            {{model.name}}
          </FormItem>
          <FormItem 
            label="时间表达式" 
            :prop="model.repeat_interval" 
            :rules="{required: true, message: '时间表达式不能为空', trigger: 'blur'}">
            <Input type="text" v-model="model.repeat_interval"></Input>
          </FormItem>
            <!-- <Input type="text" v-model="model[label.name]"></Input> -->
          <FormItem>
            <Button type="primary" @click="submit('formValidate')" :loading="submiting">提交</Button>
            <Button type="ghost" @click="reset('formValidate')" style="margin-left: 8px">重置</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import action from 'components/task/action'
import note from 'components/home/note'
import restart from 'components/home/restartTime'
import status from 'components/home/status'
import api from 'libs/api'

export default {
  data() {
    return {
      mask: false,
      model: {},
      loading: true,
      submiting: false,
      columns: [
        {
          title: '应用名称',
          align: 'center',
          key: 'app_name'
        },
        {
          title: '任务名',
          align: 'center',
          key: 'name'
        },
        {
          title: '运行状态',
          align: 'center',
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
          width: 260,
          render: this.renderAction
        }
      ],
      data: []
    }
  },
  computed: {
    tableHeight() {
      return this.$store.getters.winHeigth - 100
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
            this.data = data.data
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
          status: params.row.status
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
          edit: () => {
            this.mask = true
            this.model = this.data[params.index]
          }
        }
      })
    },
    actionClick(type, params) {
      console.log(type)
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
        content: `<p>确定${text}应用【${name}】</p>`,
        loading: true,
        onOk: () => {
          this.axios(api.dashboard[type](name))
            .then(res => {
              let data = res.data
              console.log(data)
              if (data.code === 200) {
                this.getData(true, () => {
                  this.$Message.success(`${text}成功`)
                  this.$Modal.remove()
                })
              }
            })
            .catch(err => {
              this.$Message.error(`${text}失败`)
              this.$Modal.remove()
            })
        }
      })
    },
    close() {
      this.mask = false
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
.task {
  margin: 25px;
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
.task-form-content .ivu-btn-circle.ivu-btn-icon-only.ivu-btn-small.task-form-close{
  position: absolute;
  z-index: 2;
  top: 12px;
  right: 12px;
  width: 20px;
  height: 20px;
  font-size: 12px;
}
</style>
