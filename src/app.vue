<style scoped>
@import "styles/common.css";
</style>
<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  created() {
    this.setWinSize()
  },
  mounted() {
    window.addEventListener('resize', this.setWinSize)
  },
  methods: {
    setWinSize() {
      let width = 0
      let heigth = 0

      if (window.innerWidth) {
        width = window.innerWidth
      } else if ((document.body) && (document.body.clientWidth)) {
        width = document.body.clientWidth
      }
      // 获取窗口高度
      if (window.innerHeight) {
        heigth = window.innerHeight
      } else if ((document.body) && (document.body.clientHeight)) {
        heigth = document.body.clientHeight
      }
      // 通过深入Document内部对body进行检测，获取窗口大小
      if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        heigth = document.documentElement.clientHeight
        width = document.documentElement.clientWidth
      }
      
      let store = this.$store
      store.commit('setWinWidth', width)
      store.commit('setWinHeigth', heigth)
    }
  }
}
</script>
