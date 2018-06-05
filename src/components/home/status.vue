<template>
  <Icon class="" size="16" type="record" :color="color"></Icon>
</template>
<script>
export default {
  // 1：online；2：stopped；3：unload
  props: ['status'],
  computed: {
    isStart() {
      return this.status === 1
    },
    color() {
      let color
      switch (this.status) {
        case 1:
          color = '#19be6b'
          break;
        case 2:
          color = '#ed3f14'
          break;
        case 3:
          color = '#999'
          break;
      }
      return color
    }
  }
}
</script>
<style>

</style>

