const routers = [
  { 
    path: '/login', 
    component: (slv) => require(['./views/login.vue'], slv), 
    meta: { loginPage: true, title: '登陆' }
  },
  {
    path: '/',
    meta: { hasLogin: true },
    component: (slv) => require(['./views/index.vue'], slv),
    redirect: { name: 'home' },
    children: [
      { path: 'home', component: (slv) => require(['./views/home.vue'], slv), name: 'home', meta: { title: '控制面板'} },
      {
        path: 'setting', component: (slv) => require(['./views/setting.vue'], slv),
        children: [
          { path: '/', component: (slv) => require(['./views/setting-list.vue'], slv), meta: { title: '应用配置' } },
          { path: 'detail', meta: { title: '应用配置' }, component: (slv) => require(['./views/setting-detail.vue'], slv) }
        ]
      },
      {
        path: 'appstore', component: (slv) => require(['./views/appstore.vue'], slv),
        children: [
          { path: '/', meta: { title: '应用商店' }, component: (slv) => require(['./views/appstore-list.vue'], slv) },
          { path: 'detail', meta: { title: '应用商店' }, component: (slv) => require(['./views/appstore-detail.vue'], slv) }
        ]
      },
      { path: 'task', meta: { title: '定时任务' }, component: (slv) => require(['./views/task.vue'], slv) },
      { 
        path: 'me', component: (slv) => require(['./views/me.vue'], slv), redirect: { name: 'msg'},
        children: [
          { path: 'message', meta: { title: '消息中心' }, component: (slv) => require(['./views/me-message.vue'], slv), name: 'msg'},
          { path: 'password', meta: { title: '修改密码' }, component: (slv) => require(['./views/me-password.vue'], slv)}
        ]
      }
      
    ]
  }
];
export default routers