<template>
  <div v-if="data">
    <Button size="small" type="success" :disabled="isStart" @click="start">Start</Button>
    <Button size="small" type="warning" :disabled="!isStart">Stop</Button>
    <Button size="small" type="primary" :disabled="!isStart">Restart</Button>
  </div>
</template>
<script>
export default {
  props: ['data'],
  computed: {
    isStart() {
      return this.data.status === 1
    }
  },
  methods: {
    start() {
      console.log('1')
    }
  }
}
</script>
<style>

</style>

