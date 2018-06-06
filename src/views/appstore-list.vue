<template>
  <div class="appstore-list">
    <div class="appstore-list-search">
      <Input v-model="search" placeholder="搜索..." clearable style="width: 200px"></Input>
      <Button type="text" shape="circle" icon="ios-search" style="position: absolute; right: 0; top: 0; z-index: 20;"></Button>
    </div>
    <Tabs :animated="false">
      <TabPane label="全部应用" icon="ios-keypad">
        <card :data="data" @change="getData"></card>
      </TabPane>
      <TabPane label="已安装" icon="android-download">
        <card :data="installedData"></card>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import card from 'components/appstore/card.vue'
import api from 'libs/api'
export default {
  data() {
    return {
      search: '',
      data: [],
      installedData: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      // 1安装中 2已安装 3未安装 4更新中 5需更新 6卸载中
      this.axios(api.appstore.list())
        .then(res => {
          let data = res.data
          console.log(data)
          if (data.code === 200) {
            // this.loading = false
            this.data = data.data
            data.data.forEach(v => {
              if (v.install_status === 2 || v.install_status === 5) {
                this.installedData.push(v)
              }
            })
          }
        })
        .catch(err => {
          console.log(err)
          this.$Message.error(`获取列表失败`)
        })
    },

  },
  components: {
    card
  }
}
</script>
<style>
.appstore-list {
  position: relative;
  padding: 0 25px 25px;
}
.appstore-list-search {
  z-index: 3;
  position: absolute;
  right: 25px;
  top: 8px;
}
.appstore-list .ivu-tabs-nav .ivu-tabs-tab {
  padding: 14px 20px 15px;
  /* padding-bottom: 15px; */
}
.appstore-list .ivu-tabs-nav .ivu-tabs-tab .ivu-icon {
  margin-right: 6px;
}
</style>

