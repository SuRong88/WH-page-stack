import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import nProgress from 'nprogress';
NProgress.inc(0.2);
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};
Vue.use(Router);

export const routes = [
    {
        path: '/',
        redirect: '/index'
    },
    // {
    //     name: 'Index',
    //     path: '/index',
    //     component: resolve => require(['@/pages/index'], resolve),
    //     meta: {
    //         title: '首页',
    //         // keepAlive: true
    //     }
    // },
    // {
    //     name: 'List',
    //     path: '/list',
    //     component: resolve => require(['@/pages/list'], resolve),
    //     meta: {
    //         title: '列表',
    //         keepAlive: true
    //     }
    // },
    // {
    //     name: 'Detail',
    //     path: '/detail/:id',
    //     component: resolve => require(['@/pages/detail'], resolve),
    //     meta: {
    //         title: '详情',
    //         keepAlive: true
    //     }
    // },
    // {
    //     name: 'Address',
    //     path: '/address',
    //     component: resolve => require(['@/pages/address'], resolve),
    //     meta: {
    //         title: '地址',
    //         keepAlive: true
    //     }
    // }
    {
        path: '/',
        component: resolve => require(['@/components/common/Home.vue'], resolve),
        meta: {
            title: '自述文件'
        },
        children: [
            {
                name: 'Index',
                path: 'index',
                component: resolve => require(['@/pages/index'], resolve),
                meta: {
                    title: '首页',
                    isTabbar: true
                    // keepAlive: true
                }
            },
            {
                name: 'List',
                path: 'list',
                component: resolve => require(['@/pages/list'], resolve),
                meta: {
                    title: '列表',
                    isTabbar: true
                    // keepAlive: true,
                }
            },
            {
                name: 'Detail',
                path: 'detail/:id',
                component: resolve => require(['@/pages/detail'], resolve),
                meta: {
                    title: '详情',
                    keepAlive: true
                }
            },
            {
                name: 'Address',
                path: 'address',
                component: resolve => require(['@/pages/address'], resolve),
                meta: {
                    title: '地址',
                    keepAlive: true
                }
            }
        ]
    }
];

const router = new Router({
    mode: 'history',
    routes
});

router.afterEach((to, from) => {
    NProgress.done()
})

export default router;
