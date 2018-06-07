<template>
  <div class="appstore-detail">
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
          data.data.logo = 'https://t.alipayobjects.com/images/T1HHFgXXVeXXXXXXXX.png'
          this.data = data.data
        }
      })
    },
    change() {
      this.getData()
    }
  },
  components: {
    buttons
  }
}
</script>

<style>
.appstore-detail {
  padding: 25px;
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

.appstore-detail .ivu-table-wrapper {
  /* border: none; */
}

.appstore-detail .ivu-table th {
  /* border-bottom: none; */
}
</style>
