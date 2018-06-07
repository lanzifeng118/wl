<template>
  <div class="setting-form ivu-modal-mask">
    <div class="setting-form-content">
      <p class="setting-form-title">{{type === 'edit' ? '修改' : '添加'}} - {{data.cfg_statement}}</p>
      <Button type="error" size="small" shape="circle" icon="close-round" class="setting-form-close" @click="close"></Button>
      <Form ref="formValidate" :model="model" label-position="right" :label-width="100">
        <FormItem 
          v-for="(label, index) in data.properties" 
          :label="label.title" 
          :prop="label.name" 
          :rules="{required: true, message: label.title + '不能为空', trigger: 'blur'}"
        >
          <Input type="text" v-model="model[label.name]"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="submit('formValidate')" :loading="loading">提交</Button>
          <Button type="ghost" @click="reset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
import api from 'libs/api'
export default {
  props: ['type', 'data', 'index'],
  data() {
    return {
      loading: false
    }
  },
  computed: {
    row() {
      return this.type === 'add' ? null : this.data.values[this.index]
    },
    model() {
      let model = {}
      this.data.properties.forEach(val => {
        let key = val.name
        console.log(val)
        this.type === 'add' ? model[key] = '' : model[key] = this.row[key]
      })
      return model
    }
  },
  created() {
    console.log(this.data)
    // console.log(this.model)
  },
  methods: {
    submit(name) {
      this.$refs[name].validate(valid => {
        if (!valid) {
          return
        }
        this.loading = true
        let data = {
          cfg_id: this.data.cfg_id,
          row: this.model
        }
        if (this.type === 'edit') {
          data.row_id = this.row.id
        }
        this.axios(api.setting[this.type](data)).then(res => {
          this.loading = false
          let data = res.data
          console.log(data)
          if (data.code === 200) {
            this.$Message.success('提交成功!')
            this.close()
            this.$emit('update')
          } else {
            this.$Message.error('提交失败!')
          }
        })
      })
    },
    reset(name) {
      this.$refs[name].resetFields()
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>
<style>
.setting-form-content {
  position: relative;
  padding: 20px;
  border-radius: 5px;
  background-color: #fff;
  width: 600px;
  margin: 100px auto;
}
.setting-form-title {
  text-align: center;
  margin-bottom: 20px;
}
.setting-form-content .ivu-btn-circle.ivu-btn-icon-only.ivu-btn-small.setting-form-close{
  position: absolute;
  top: 12px;
  right: 12px;
  width: 20px;
  height: 20px;
  font-size: 12px;
}
</style>

