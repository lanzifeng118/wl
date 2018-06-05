<template>
  <p :class="{'color-disabled': isDisable}">{{isDisable ? '-' : data.restart_time}}</p>
</template>
<script>
export default {
  props: ['data'],
  computed: {
    isDisable() {
      return this.data.status === 3
    }
  }
}
</script>
<style>

</style>

