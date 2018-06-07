const routers = [
  {
    path: '/',
    meta: {
      title: ''
    },
    component: (slv) => require(['./views/index.vue'], slv),
    redirect: { name: 'home' },
    children: [
      { path: 'home', component: (slv) => require(['./views/home.vue'], slv), name: 'home' },
      {
        path: 'setting', component: (slv) => require(['./views/setting.vue'], slv),
        children: [
          { path: '/', component: (slv) => require(['./views/setting-list.vue'], slv) },
          { path: 'detail', component: (slv) => require(['./views/setting-detail.vue'], slv) }
        ]
      },
      {
        path: 'appstore', component: (slv) => require(['./views/appstore.vue'], slv),
        children: [
          { path: '/', component: (slv) => require(['./views/appstore-list.vue'], slv) },
          { path: 'detail', component: (slv) => require(['./views/appstore-detail.vue'], slv) }
        ]
      },
      { path: 'task', component: (slv) => require(['./views/task.vue'], slv) },
      { 
        path: 'me', component: (slv) => require(['./views/me.vue'], slv), redirect: { name: 'msg'},
        children: [
          { path: 'message', component: (slv) => require(['./views/me-message.vue'], slv), name: 'msg'},
          { path: 'password', component: (slv) => require(['./views/me-password.vue'], slv)}
        ]
      }
      
    ]
  },
  {
    path: '/login', component: (slv) => require(['./views/login.vue'], slv)
  }
];
export default routers