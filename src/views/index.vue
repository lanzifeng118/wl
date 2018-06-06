<template>
  <div class="layout">
    <Layout>
      <Header class="header" style="height: 50px; line-height: 50px; color: #ccc; background: #292f3b; font-size: 20px;">
        <div class="header-name">DOAPI</div>
        <div class="header-info">
          <Badge count="5" style="margin-right: 10px;">
            <Icon type="ios-bell-outline" size="26"></Icon>
          </Badge>
          <Avatar shape="circle" icon="person" size="small" />
        </div>
      </Header>
    <Layout>
        <Sider hide-trigger style="background: #fff">
          <Menu theme="dark" :active-name="activeName" width="100%" @on-select="menuSelect" :style="`height: ${contentHeight}px`">
              <MenuItem v-for="item in menu" :name="item.name">
                <Icon :type="item.icon"></Icon>
                {{item.title}}
              </MenuItem>
          </Menu>
        </Sider>
        <Layout>
          <Content :style="{minHeight: '280px', background: '#fff'}">
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'config',
      menu: [{
        title: '控制面板',
        icon: 'home',
        name: 'home'
      }, {
        title: '应用配置',
        icon: 'gear-a',
        name: 'config'
      }, {
        title: '接口管理',
        icon: 'cloud',
        name: 'interface'
      }, {
        title: '定时任务',
        icon: 'ios-alarm',
        name: 'task'
      }, {
        title: '应用商店',
        icon: 'ios-cart',
        name: 'appstore'
      }, {
        title: '个人中心',
        icon: 'person',
        name: 'me'
      }, {
        title: '流量统计',
        icon: 'arrow-graph-up-right',
        name: 'statistics'
      }
      ]
    }
  },
  computed: {
    contentHeight() {
      return this.$store.getters.winHeigth - 50
    }
  },
  watch: {
    '$route'(to, from) {
      this.setMenuActive()
    }
  },
  mounted() {
    this.setMenuActive()
    // this.activeName = name
  },
  methods: {
    setMenuActive() {
      let path = this.$route.path.split('/')[1]
      this.activeName = path
    },
    menuSelect(name) {
      this.$router.push(`/${name}`)
    }
  }
}
</script>
<style>
.layout {
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
}
.header-name {
  float: left;
}
.header-info {
  float: right;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.header .ivu-badge-count {
  width: 16px;
  height: 16px;
  top: -6px;
  line-height: 15px;
  min-width: 16px;
  padding: 0;
  box-shadow: none;
}
</style>

