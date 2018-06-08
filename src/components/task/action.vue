<template>
  <div class="task-action" v-if="this.params">
    <Button size="small" type="success" :disabled="isStop || enable" @click="start" icon="play">启动</Button>
    <Button size="small" type="warning" :disabled="isStop || !enable" @click="stop" icon="pause">停止</Button>
    <Button size="small" type="primary" @click="edit" icon="edit">修改</Button>
  </div>
</template>
<script>
export default {
  props: ['params', 'schedule'],
  computed: {
    isStop() {
      return this.schedule === 0
    },
    enable() {
      return this.params.row.enable
    }
  },
  methods: {
    ok() {

    },
    start() {
      this.$emit('start')
    },
    stop() {
      this.$emit('stop')
    },
    edit() {
      this.$emit('edit')
    }
  }
}
</script>
<style>
</style>

