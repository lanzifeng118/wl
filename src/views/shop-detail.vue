<template>
  <div class="shop-detail">
    <div class="shop-detail-top f-clearfix">
      <div class="shop-detail-logo"><img :src="data.logo"></div>
      <div class="shop-detail-info">
        <h3>{{data.app_name}}</h3>
        <p>简介: {{data.brief}}</p>
        <div class="shop-detail-buttoms">
          <Button v-if="data.install_status === '0'" type="success" size="small" @click.stop="action">安装</Button>
          <Button v-if="data.install_status === '2'" type="warning" size="small" @click.stop="action">更新</Button>
          <Button v-if="data.install_status === '1' || data.install_status === '2'" size="small" @click.stop="action">卸载</Button>
        </div>
      </div>
    </div>
    <Tabs type="card" :animated="false">
      <TabPane label="详细内容">
        {{data.content}}
      </TabPane>
      <TabPane label="客户案例">
        <Table :columns="cus.columns" :data="cus.data" :width="650" size="small"></Table>
      </TabPane>
      <TabPane label="更新日志">
        <Table :columns="upgrade.columns" :data="upgrade.data" :width="650" size="small"></Table>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      cus: {
        columns: [
          { title: '客户名称', key: 'customer', align: 'center' },
          { title: '行业', key: 'industry', align: 'center' },
          { title: '下载时间', key: ' download_time', align: 'center' }
        ],
        data: []
      },
      upgrade: {
        columns: [
          { title: '版本', key: 'upg_version', align: 'center' },
          { title: '更新内容', key: 'upg_content', align: 'center' },
          { title: '更新时间', key: 'time', align: 'center' }
        ],
        data: []
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      let data = {
        "code": 83817,
        "data": {
          "alias_name": "测试内容9c4r",
          "app_name": "支付宝当面支付",
          "brief": "全球领先的独立第三方支付平台",
          "content": "全球领先的独立第三方支付平台,致力于为广大用户提供安全快速的电子支付/网上支付/安全支付/手机支付体验",
          "install_info": [
            {
              "customer": "真功夫",
              "industry": "餐饮",
              " download_time": "2018-03-19"
            },
            {
              "customer": "新东方",
              "industry": "教育",
              " download_time": "2018-03-19"
            }
          ],
          "install_status": "0",
          "download_count": 86532,
          "logo": "https://t.alipayobjects.com/images/T1HHFgXXVeXXXXXXXX.png",
          "upgrade_info": [
            {
              "time": "2018.01.02",
              "upg_content": "添加X功能",
              "upg_version": "v1.2.1"
            },
            {
              "time": "2018.01.18",
              "upg_content": "修复xbug",
              "upg_version": "v1.2.2"
            }
          ],
          "version": "测试内容5v97"
        },
        "msg": "测试内容oy4v"
      }
      this.data = data.data
      this.cus.data = data.data.install_info
      this.upgrade.data = data.data.upgrade_info
    }
  },
  components: {

  }
}
</script>

<style>
.shop-detail {
  padding: 25px;
}
.shop-detail-logo {
  float: left;
  padding: 5px;
  width: 100px;
  height: 80px;
  line-height: 70px;
  background: #f1f1f1;
  margin-right: 10px;
}
.shop-detail-logo img {
  vertical-align: middle;
  width: 100%;
}
.shop-detail-info {
  margin-bottom: 15px;
  float: left;
}
.shop-detail-info h3 {
  margin-bottom: 8px;
}
.shop-detail-info p {
  margin-bottom: 8px;
}

.shop-detail .ivu-table-wrapper {
  /* border: none; */
}

.shop-detail .ivu-table th {
  /* border-bottom: none; */
}
</style>
