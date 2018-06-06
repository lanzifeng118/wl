<template>
  <div class="appstore-cards f-clearfix">
    <div class="appstore-card" v-for="item in data" @click="toDetail(item.app_id)">
      <Card>
        <div class="appstore-cards-title f-clearfix">
          <h4>{{item.alias}}</h4>
          <p>{{item.version}}</p>
        </div>
        <p class="appstore-cards-brief">{{item.brief}}</p>
        <div class="appstore-cards-buttoms">
          <Button v-if="item.install_status === 1" type="success" size="small" loading>安装中</Button>
          <Button v-if="item.install_status === 3" type="success" size="small" @click.stop="install(item)">安装</Button>
          <Button v-if="item.install_status === 5" type="warning" size="small" @click.stop="update(item)">更新</Button>
          <Button v-if="item.install_status === 2 || item.install_status === 5" size="small" @click.stop="uninstall(item)">卸载</Button>
          <Button v-if="item.install_status === 6" type="success" size="small" loading>卸载中</Button>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import api from 'libs/api'
export default {
  data() {
    return {
      auth_code: '4220C05A-5E73-6A80-A807-A7E5846EF120'
    }
  },
  // 1安装中 2已安装 3未安装 4更新中 5需更新 6卸载中
  props: ['data'],
  methods: {
    toDetail(id) {
      console.log(id)
      this.$router.push({
        path: '/appstore/detail',
        query: {
          id
        }
      })
    },
    update(item) {
      
    },
    install(item) {
      this.$Modal.confirm({
        render: h => {
          return h('Input', {
            props: {
              value: this.auth_code,
              autofocus: true,
              placeholder: '请输入授权码'
            },
            on: {
              input: val => {
                this.auth_code = val
              }
            }
          })
        },
        loading: true,
        onOk: () => {
          console.log(this.auth_code)
          if (!this.auth_code) {
            this.$Message.error('请输入授权码')
            this.$Modal.remove()
            return
          }
          this.$Modal.remove()
          item.install_status = 1
          this.axios(api.appstore.install(item.name, this.auth_code)).then(res => {
            this.auth_code = ''
            let data = res.data
            console.log(data)

            if (data.code === 200) {
              this.$Message.success('安装成功')
              this.$emit('change')
            } else {
              this.$Message.error(data.msg)
            }
          })
        }
      })
    },
    uninstall(item) {
      console.log(item)
      this.$Modal.confirm({
        title: '卸载',
        content: `<p>确定卸载应用【${item.alias}】</p>`,
        loading: true,
        onOk: () => {
          this.$Modal.remove()
          item.install_status = 6
          this.axios(api.appstore.uninstall(item.name)).then(res => {
            this.uninstalling = false

            let data = res.data
            console.log(data)
            if (data.code === 200) {
              this.$Message.success('卸载成功')
              this.$emit('change')
            }
          })
        }
      })
    }
  }
}
</script>
<style>
.appstore-card {
  float: left;
  cursor: pointer;
  width: 270px;
  margin-bottom: 10px;
  margin-right: 10px;
}
.appstore-cards-title {
  margin-bottom: 5px;
}
.appstore-cards-title > h4 {
  float: left;
}
.appstore-cards-title > p {
  float: right;
}
.appstore-cards-brief {
  color: #aaa;
  margin-bottom: 5px;
}
.appstore-cards-buttoms {
  text-align: right;
}
</style>

