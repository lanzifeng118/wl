<template>
  <div>
    <Button size="small" type="success" icon="edit" @click="edit">修改</Button>
    <Button size="small" type="warning" icon="trash-a" @click="deleteM">删除</Button>
  </div>
</template>
<script>
export default {
  methods: {
    edit() {
      this.$emit('edit')
    },
    deleteM() {
      this.$emit('deleteM')
    }
  }
}
</script>
<style>

</style>

