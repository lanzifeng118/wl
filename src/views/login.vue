<template>
  <div class="login">
    Login
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    kkk(name) {
      this.$router.push(`/${name}`);
    }
  }
};
</script>
<style scoped>
.login {
}
</style>
