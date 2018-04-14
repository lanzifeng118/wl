<template>
  <Tooltip placement="top" :disabled="status === 'success'">
    <div :class="`color-${status}`">
      <Icon v-if="status !== 'success'" type="android-alert" style="margin-right: 5px;"></Icon>{{text}}
    </div>
    <div slot="content">
      提示
    </div>
  </Tooltip>
</template>

<script>
import util from 'libs/util'
export default {
  props: ['data', 'type'],
  data() {
    return {
      cpu: {
        warn: 70,
        error: 80
      },
      memory: {
        warn: 150,
        error: 300
      },
      delay: {
        warn: 300,
        error: 500
      }
    }
  },
  computed: {
    status() {
      let zone = this[this.type]
      let data = this.data || 0
      let status

      if (this.type === 'memory') {
        data = data / 1024 / 1024
      } else if (this.type === 'delay'){
        data = parseInt(data)   
      }

      if (data >= zone.error) {
        status = 'error' 
      } else if (data >= zone.warn) {
        status = 'warning'
      } else {
        status = 'success'
      }
      return status
    },
    text() {
      let text = this.data
      if (this.type === 'cpu') {
        text = `${text}%`
      } else if (this.type === 'memory') {
        text = util.bytesToSize(text)
      }
      return text
    }
  }
}
</script>
<style>
</style>
