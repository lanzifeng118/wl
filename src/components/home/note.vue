<template>
  <Tooltip class="home-note" placement="top" :disabled="status === 'success'">
    <div :class="`color-${status}`">
      <Icon v-if="status === 'warning' || status === 'error'" type="android-alert" style="margin-right: 5px;"></Icon>{{text}}
    </div>
    <div slot="content">
      {{note}}
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
    isDisable() {
      return this.data.status === 3 || this.data.status === 2
    },
    target() {
      let target
      if (!this.isDisable) {
        switch (this.type) {
          case 'memory':
            target = this.data.monit.memory
            break;
          case 'cpu':
            target = this.data.monit.cpu
            break;
          case 'delay':
            target = this.data.loop_delay
            break;
        }
      }
      return target
    },
    status() {
      let status
      if (this.isDisable) {
        status = 'disabled'
      } else {
        let target = this.target
        if (this.type === 'memory') {
          target = target / 1024 / 1024
        } else if (this.type === 'delay'){
          target = parseInt(target)   
        }
  
        let zone = this[this.type]
        if (target >= zone.error) {
          status = 'error' 
        } else if (target >= zone.warn) {
          status = 'warning'
        } else {
          status = 'success'
        }
      }
      return status
    },
    text() {
      let text = this.target
      if (this.isDisable) {
        text = '-'
      } else {
        if (this.type === 'cpu') {
          text = `${text}%`
        } else if (this.type === 'memory') {
          text = util.bytesToSize(text)
        }
      }
      return text
    },
    note() {
      let type = ''
      switch (this.type) {
        case 'memory':
          type = '内存占用大小'
          break;
        case 'cpu':
          type = 'CPU利用率'
          break;
        case 'delay':
          type = '延时时间'
          break;
      }

      let note = ''
      switch (this.status) {
        case 'warning':
          note = `${type}稍微偏高,请持续关注系统运行状态`
          break;
        case 'error':
          note = `${type}过高,请持续查看系统运行负荷`
          break
      }
      return note
    }
  }
}
</script>
<style>
.home-note .ivu-tooltip-inner {
  max-width: none;
}
</style>
