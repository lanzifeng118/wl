import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Util from './libs/util';
import App from './app.vue';
import store from './store/index'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'iview/dist/styles/iview.css';


// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts 

Vue.use(VueRouter);
Vue.use(iView);
Vue.use(VueAxios, axios);

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    
    let cookie = Util.getCookie()
    
    let user = cookie.account
    store.commit('setUsername', user)
    
    let matched = to.matched
    
    if (matched.length === 0) {
        from.name ? next({ name: from.name }) : next('/home')
        return
    }

    if (matched.some(v => v.meta.hasLogin)) {
        if (!user) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else if (to.meta.loginPage) {
        if (user) {
            next('/home')
        } else {
            next()
        }
    } else {
        next()
    }
    next()
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
