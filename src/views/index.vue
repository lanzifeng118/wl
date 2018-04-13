<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            Item 1
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            Item 2
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            Item 3
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            Item 4
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu theme="light" active-name="1" width="100%" @on-select="kkk">
                        <MenuItem v-for="item in menu" :name="item.name">
                            <Icon :type="item.icon"></Icon>
                            {{item.title}}
                        </MenuItem>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '20px'}">
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        Content
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
                        icon: 'ios-clock',
                        name: 'task'
                    }, {
                        title: '应用商店',
                        icon: 'ios-cart',
                        name: 'shop'
                    }, {
                        title: '个人中心',
                        icon: 'person',
                        name: 'me'
                    } , {
                        title: '流量统计',
                        icon: 'arrow-graph-up-right',
                        name: 'data'
                    } 
                ]
            }
        },
        methods: {
            kkk(name) {
                this.$router.push(`/${name}`)
            }
        }
    }
</script>
<style scoped>
.layout{
    border-bottom: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>
