<template>
  <div class="home-action" v-if="this.params">
    <Button size="small" type="success" :disabled="isStart" @click="start" icon="play">启动</Button>
    <Button size="small" type="warning" :disabled="!isStart" @click="stop" icon="pause">停止</Button>
    <Button size="small" type="primary" @click="edit" icon="edit">修改</Button>
  </div>
</template>
<script>
export default {
  props: ['params'],
  computed: {
    isStart() {
      return this.params.row.status === 1
    }
  },
  methods: {
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

