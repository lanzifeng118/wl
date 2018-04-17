<template>
  <div class="config-form ivu-modal-mask">
    <div class="config-form-content">
      <p class="config-form-title">{{type === 'edit' ? '修改' : '添加'}} - {{title}}</p>
      <Button type="error" size="small" shape="circle" icon="close-round" class="config-form-close" @click="close"></Button>
      <Form ref="formValidate" :model="row" label-position="left" :label-width="80">
        <FormItem 
          v-for="(label, index) in labels" 
          :label="label.title" 
          :prop="label.key" 
          :rules="{required: true, message: label.title + '不能为空', trigger: 'blur'}"
        >
          <Input type="text" v-model="row[label.key]"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="submit('formValidate')">提交</Button>
          <Button type="ghost" @click="reset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  props: ['type', 'labels', 'row', 'title', 'type'],
  data() {
    return {
    }
  },
  methods: {
    submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success('提交成功!')
          this.close()
        }
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
.config-form-content {
  position: relative;
  padding: 20px;
  border-radius: 5px;
  background-color: #fff;
  width: 500px;
  margin: 100px auto;
}
.config-form-title {
  text-align: center;
  margin-bottom: 20px;
}
.config-form-content .ivu-btn-circle.ivu-btn-icon-only.ivu-btn-small.config-form-close{
  position: absolute;
  top: 12px;
  right: 12px;
  width: 20px;
  height: 20px;
  font-size: 12px;
}
</style>

