<template>
  <div class="shop-list">
    <div class="shop-list-search">
      <Input v-model="search" placeholder="搜索..." clearable style="width: 200px"></Input>
      <Button type="text" shape="circle" icon="ios-search" style="position: absolute; right: 0; top: 0; z-index: 20;"></Button>
    </div>
    <Tabs :animated="false">
      <TabPane label="全部应用" icon="ios-keypad">
        <card :data="data"></card>
      </TabPane>
      <TabPane label="已安装" icon="android-download">
        <card :data="installedData"></card>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import card from 'components/shop/card.vue';
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
      let data = {
        "code": 32216,
        "data": [
          {
            "app_id": "1",
            "app_name": "alipay",
            "brief": "支付宝当面付",
            "install_status": "2", // 2更新 1安装 0未安装
            "version": "1.0.1"
          },
          {
            "app_id": "5",
            "app_name": "唯品支付",
            "brief": "唯品支付",
            "install_status": "0", // 2更新 1安装 0未安装
            "version": "1.5.1"
          },
          {
            "app_id": "7",
            "app_name": "alipay",
            "brief": "支付宝当面付",
            "install_status": "1", // 2更新 1安装 0未安装
            "version": "1.0.1"
          },
          {
            "app_id": "2",
            "app_name": "JDEC",
            "brief": "京东电商",
            "install_status": "1", // 1安装 0未安装
            "version": "2.1.1"
          },
          {
            "app_id": "3",
            "app_name": "测试内容6278",
            "brief": "测试内容iqxn",
            "install_status": "0", // 1安装 0未安装
            "version": "2.0.8"
          }
        ],
        "msg": "测试内容dwi1"
      }
      this.data = data.data
      data.data.forEach(v => {
        if (v.install_status !== '0'){
          this.installedData.push(v)
        }
      })
    }
  },
  components: {
    card
  }
}
</script>
<style>
.shop-list {
  position: relative;
  padding: 0 25px 25px;
}
.shop-list-search {
  z-index: 3;
  position: absolute;
  right: 25px;
  top: 8px;
}
.shop-list .ivu-tabs-nav .ivu-tabs-tab {
  padding: 14px 20px 15px;
  /* padding-bottom: 15px; */
}
.shop-list .ivu-tabs-nav .ivu-tabs-tab .ivu-icon {
  margin-right: 6px;
}
</style>

