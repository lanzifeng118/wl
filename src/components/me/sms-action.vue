<template>
  <div>
    <Button size="small" type="success" icon="eye" @click="mark">查看</Button>
    <Button size="small" type="warning" icon="trash-a" @click="deleteM">删除</Button>
  </div>
</template>
<script>
export default {
  methods: {
    mark() {
      this.$emit('mark')
    },
    deleteM() {
      this.$emit('deleteM')
    }
  }
}
</script>
<style>

</style>

