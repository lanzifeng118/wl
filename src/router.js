const routers = [
  {
    path: '/',
    meta: {
      title: ''
    },
    component: (slv) => require(['./views/index.vue'], slv),
    redirect: 'home',
    children: [
      { path: 'home', component: (slv) => require(['./views/home.vue'], slv), name: 'home' },
      {
        path: 'config', component: (slv) => require(['./views/config.vue'], slv),
        children: [
          { path: '/', component: (slv) => require(['./views/config-list.vue'], slv) },
          { path: 'detail', component: (slv) => require(['./views/config-detail.vue'], slv) }
        ]
      },
      { path: 'statistics', component: (slv) => require(['./views/statistics.vue'], slv)}
    ]
  },
  {
    path: '/login', component: (slv) => require(['./views/login.vue'], slv)
  }
];
export default routers