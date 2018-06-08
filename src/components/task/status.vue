<template>
  <Icon class="" size="16" type="record" :color="color"></Icon>
</template>
<script>
export default {
  // 1：online；2：stopped
  props: ['status'],
  computed: {
    color() {
      return this.status ? '#19be6b' : '#ed3f14'
    }
  }
}
</script>
<style>

</style>

