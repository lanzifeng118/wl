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
      <TabPane label="详细内容">详细内容
      </TabPane>
      <TabPane label="客户案例">客户案例
      </TabPane>
      <TabPane label="更新日志">更新日志
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {}
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
          "brief": "测试内容0828",
          "content": "测试内容r2i6",
          "install_info": [
            {
              "customer": "测试内容ficx",
              "industry": "测试内容b4s5"
            }
          ],
          "install_status": "0",
          "install_time": 86532,
          "logo": "https://t.alipayobjects.com/images/T1HHFgXXVeXXXXXXXX.png",
          "upgrade_info": [
            {
              "time": "测试内容avux",
              "upg_content": "测试内容8l62",
              "upg_version": "测试内容08q7"
            }
          ],
          "version": "测试内容5v97"
        },
        "msg": "测试内容oy4v"
      }
      this.data = data.data
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
</style>
