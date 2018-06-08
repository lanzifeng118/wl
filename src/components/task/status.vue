<template>
  <Icon class="" size="16" type="record" :color="color"></Icon>
</template>
<script>
export default {
  // 1：online；2：stopped
  props: ['status', 'schedule'],
  computed: {
    color() {
      let color
      if (this.schedule === 0) {
        color = '#999'
      } else {
        color = this.status ? '#19be6b' : '#ed3f14'
      }
      return color
    }
  }
}
</script>
<style>

</style>

