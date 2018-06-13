<template>
  <div class="me">
    <Menu mode="horizontal" :active-name="activeName" style="height: 50px; line-height: 50px;" @on-select="menuSelect">
      <MenuItem name="message">
      <Icon type="ios-bell"></Icon>
      消息中心
      </MenuItem>
      <MenuItem name="password">
      <Icon type="settings"></Icon>
      修改密码
      </MenuItem>
    </Menu>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: ''
    }
  },
  watch: {
    $route(to, from) {
      this.setMenuActive()
    }
  },
  mounted() {
    this.setMenuActive()
  },
  methods: {
    setMenuActive() {
      let path = this.$route.path.split('/')[2]
      console.log(this.$route.path.split('/'))
      this.activeName = path
    },
    menuSelect(name) {
      this.$router.push(`/me/${name}`)
    }
  }
}
</script>
<style>
.me {
  padding: 0 23px 23px;
}
</style>
