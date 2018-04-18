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
        path: 'config', component: (slv) => require(['./views/config.vue'], slv),
        children: [
          { path: '/', component: (slv) => require(['./views/config-list.vue'], slv) },
          { path: 'detail', component: (slv) => require(['./views/config-detail.vue'], slv) }
        ]
      },
      {
        path: 'shop', component: (slv) => require(['./views/shop.vue'], slv),
        children: [
          { path: '/', component: (slv) => require(['./views/shop-list.vue'], slv) },
          { path: 'detail', component: (slv) => require(['./views/shop-detail.vue'], slv) }
        ]
      },
      { path: 'statistics', component: (slv) => require(['./views/statistics.vue'], slv) },
      { path: 'interface', component: (slv) => require(['./views/interface.vue'], slv)},
      { path: 'task', component: (slv) => require(['./views/interface.vue'], slv) },
      { 
        path: 'me', component: (slv) => require(['./views/me.vue'], slv), redirect: {name: 'warn'},
        children: [
          { path: 'warn', component: (slv) => require(['./views/me-warn.vue'], slv), name: 'warn' },
          { path: 'message', component: (slv) => require(['./views/me-message.vue'], slv)},
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