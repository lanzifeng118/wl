<template>
  <div v-if="this.params">
    <Button size="small" type="success" :disabled="isStart" @click="start">Start</Button>
    <Button size="small" type="warning" :disabled="!isStart" @click="stop">Stop</Button>
    <Button size="small" type="primary" :disabled="!isStart" @click="restart">Restart</Button>
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
    restart() {
      this.$emit('restart')
    }
  }
}
</script>
<style>

</style>

