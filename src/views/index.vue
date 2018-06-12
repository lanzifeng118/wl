<template>
  <div class="layout">
    <Layout>
      <Header class="header" style="height: 50px; line-height: 50px; color: #ccc; background: #292f3b; font-size: 20px;">
        <div class="header-name">DOAPI</div>
        <div class="header-info">
          <!-- 消息 -->
          <div class="header-sms" @click="goSms">
            <Badge :overflow-count="9" :count="usersms">
              <Icon type="ios-bell-outline" size="26"></Icon>
            </Badge>
          </div>
          <!-- 头像 -->
          <Poptip trigger="hover" placement="bottom-end" class="header-person">
            <Avatar size="small" icon="person" />
            <div slot="content">
              <div class="header-person-btn">
                 <router-link to="/me"><Icon type="person"></Icon>个人中心</router-link>
              </div>
              <div class="header-person-btn" @click="logout">
                <Icon type="power"></Icon>退出
              </div>
            </div>
          </Poptip>
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
import api from 'libs/api'
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
        name: 'setting'
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
      }]
    }
  },
  computed: {
    contentHeight() {
      return this.$store.getters.winHeigth - 50
    },
    usersms() {
      return this.$store.getters.usersms
    }
  },
  watch: {
    '$route'(to, from) {
      this.setMenuActive()
    }
  },
  created() {
    this.$store.dispatch('setUsersms')
  },
  mounted() {
    this.setMenuActive()
  },
  methods: {
    getUsersms() {
      this.axios(api.signout()).then(res => {
        let data = res.data
        console.log(data)
        if (data.code === 200) {
          this.$router.push({
            path: '/logout',
            query: {
              redirect: this.$route.path
            }
          })
        }
      })
    },
    goSms() {
      this.$router.push({
        path: '/me/message',
        query: {
          type: '2'
        }
      })
    },
    setMenuActive() {
      let path = this.$route.path.split('/')[1]
      this.activeName = path
    },
    menuSelect(name) {
      this.$router.push(`/${name}`)
    },
    logout() {
      this.axios(api.signout()).then(res => {
        let data = res.data
        console.log(data)
        if (data.code === 200) {
          this.$router.push({
            path: '/logout',
            query: {
              redirect: this.$route.path
            }
          })
        }
      })
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
.header-sms {
  margin-right: 15px; 
  cursor: pointer;
  display: inline-block;
}
.header-sms .ivu-icon-ios-bell-outline {
  transition: all 0.2s;
}
.header-sms:hover .ivu-icon-ios-bell-outline {
  color: #fff;
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
.header-person-btn {
  color: #999;
  text-align: center;
  line-height: 50px;
  border-bottom: 1px solid #f3f3f3;
  transition: all 0.2s;
  cursor: pointer;
}
.header-person-btn a {
  color: #999;
}
.header-person-btn:last-child {
  padding-bottom: 0;
  border-bottom: none;
}
.header-person-btn:hover, .header-person-btn:hover a {
  color: #666;
  background-color: #f3f3f3;
}
.header-person .ivu-poptip-body {
  padding: 0;
}
.header-person-btn .ivu-icon {
  margin-right: 5px;
}
</style>

