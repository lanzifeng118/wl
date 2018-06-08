<template>
  <div class="setting-form">
    <p class="setting-form-title">{{type === 'edit' ? '修改' : '添加'}} - {{data.cfg_statement}}</p>
    <Form ref="formValidate" :model="model" label-position="right" :label-width="100">
      <FormItem 
        v-for="(label, index) in data.properties" 
        :label="label.title" 
        :prop="label.name" 
        :rules="{required: true, message: label.title + '不能为空', trigger: 'blur'}"
      >
        <Input v-if="label.format === 'input'" type="text" v-model="model[label.name]"></Input>
        <Select v-else="label.format === 'select'" v-model="model[label.name]">
          <Option v-for="item in label.enum" :value="item">{{ item }}</Option>
        </Select>
      </FormItem>
      <div class="setting-form-buttons">
        <Button type="text" size="large" @click="close">取消</Button>
        <Button type="primary" size="large" @click="submit('formValidate')" :loading="loading">提交</Button>
      </div>
    </Form>
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
      return this.type === 'edit' ? this.data.values[this.index] : null
    },
    model() {
      let model = {}
      this.data.properties.forEach(val => {
        let key = val.name
        this.type === 'edit' ? model[key] = this.row[key] : model[key] = ''
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
    close() {
      this.$emit('close')
    }
  }
}
</script>
<style>
.setting-form-title {
  text-align: center;
  margin-bottom: 20px;
}
.setting-form-buttons {
  text-align: right;
}
</style>

