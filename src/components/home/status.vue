<template>
  <Icon class="" size="16" type="record" :color="color"></Icon>
</template>
<script>
export default {
  props: ['status'],
  computed: {
    isStart() {
      return this.status === 1
    },
    color() {
      return this.isStart ? '#19be6b' : '#ed3f14'
    }
  }
}
</script>
<style>

</style>

