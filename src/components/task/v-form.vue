<template>
  <Form ref="formValidate" v-model="data" label-position="right" :label-width="100">
    <FormItem label="任务名称">
      {{data.name}}
    </FormItem>
    <FormItem label="时间表达式" :prop="data.repeat_interval">
      <Input type="text" v-model="data.repeat_interval" @input="input"></Input>
      <Tooltip placement="top" class="task-tooltip">
        <Icon type="help-circled"></Icon>
        <div slot="content">
          <a href="http://cron.qqe2.com" target="_blank">生成工具http://cron.qqe2.com</a>
        </div>
      </Tooltip>
    </FormItem>
  </Form>
</template>
<script>
export default {
  props: ['data'],
  methods: {
    input() {
      console.log(this.data)
      this.$emit('input', this.data.repeat_interval)
    }
  }
}
</script>
<style>
.task-tooltip {
  position: absolute;
  top: 0;
  left: -95px;
}
.task-tooltip a {
  color: #fff;
}
</style>

