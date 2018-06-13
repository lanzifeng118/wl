<template>
  <div class="appstore-detail">
    <!-- back -->
    <div class="appstore-detail-back">
      <Button type="text" size="small" icon="ios-arrow-back" @click="_back">返回</Button>
      <!-- <span>返回列表页</span> -->
      <!-- <Button type="error" size="small" shape="circle" icon="ios-arrow-back" @click="_back"></Button> 返回 -->
    </div>
    <div class="appstore-detail-top f-clearfix">
      <div class="appstore-detail-logo"><img :src="data.logo"></div>
      <div class="appstore-detail-info">
        <h3>{{data.alias}}</h3>
        <p>简介: {{data.brief}}</p>
        <div class="appstore-detail-buttoms">
          <buttons :item="data" @change="change"></buttons>
        </div>
      </div>
    </div>
    <Tabs type="card" :animated="true">
      <TabPane label="详细内容">
        {{data.content}}
      </TabPane>
      <TabPane label="客户案例">
        <Table :height="tableHeight" :columns="cus.columns" :data="data.install_info" :width="650" size="small"></Table>
      </TabPane>
      <TabPane label="更新日志">
        <Table :height="tableHeight" :columns="upgrade.columns" :data="data.upgrade_info" :width="650" size="small"></Table>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import buttons from 'components/appstore/buttons.vue'
import api from 'libs/api'
export default {
  data() {
    return {
      data: {},
      cus: {
        columns: [
          { title: '客户名称', key: 'name', align: 'center' },
          { title: '行业', key: 'industry', align: 'center' },
          { title: '下载时间', key: 'time', align: 'center' }
        ],
        data: []
      },
      upgrade: {
        columns: [
          { title: '版本', key: 'version', align: 'center' },
          { title: '更新内容', key: 'content', align: 'center' },
          { title: '更新时间', key: 'time', align: 'center' }
        ],
        data: []
      }
    }
  },
  computed: {
    name() {
      return this.$route.query.name
    },
    tableHeight() {
      return this.$store.getters.winHeigth - 250
    }
  },
  created() {
    this.getData()
  },
  watch: {
    name() {
      this.getData()
    }
  },
  methods: {
    getData() {
      this.axios(api.appstore.detail(this.name)).then(res => {
        let data = res.data
        console.log(data)
        if (data.code === 200) {
          this.data = data.data
        } else if (data.code === 101) {
          this.$Message.error('应用不存在，返回列表页')
          this._back()
        } else {
          this.$Message.error('查询有误，返回列表页')
          this._back()
        }
      })
    },
    change() {
      this.getData()
    },
    _back() {
      this.$router.push('/appstore')
    }
  },
  components: {
    buttons
  }
}
</script>

<style>
.appstore-detail {
  position: relative;
  margin: 23px;
}
.appstore-detail-logo {
  float: left;
  padding: 5px;
  width: 100px;
  height: 80px;
  line-height: 70px;
  background: #f1f1f1;
  margin-right: 10px;
}
.appstore-detail-logo img {
  vertical-align: middle;
  width: 100%;
}
.appstore-detail-top {
  margin-bottom: 15px;
}
.appstore-detail-info {
  float: left;
}
.appstore-detail-info h3 {
  margin-bottom: 8px;
}
.appstore-detail-info p {
  margin-bottom: 8px;
}
.appstore-detail-back {
  position: absolute;
  top: 60px;
  right: 25px;
}
/* .appstore-detail-back span {
  float: left;
  margin-right: 5px;
  line-height: 24px;
  font-weight: bold;
  color: #999;
} */
</style>
