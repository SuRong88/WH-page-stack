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
                }
            },
            {
                name: 'Manage',
                path: 'manage',
                component: resolve => require(['@/pages/manage'], resolve),
                meta: {
                    title: '管理',
                    isTabbar: true
                }
            },
            
            {
                name: 'Me',
                path: 'me',
                component: resolve => require(['@/pages/me'], resolve),
                meta: {
                    title: '我的',
                    isTabbar: true
                }
            },
            // {
            //     name: 'List',
            //     path: 'list',
            //     component: resolve => require(['@/pages/list'], resolve),
            //     meta: {
            //         title: '列表',
            //     }
            // },
            // {
            //     name: 'Detail',
            //     path: 'detail/:id',
            //     component: resolve => require(['@/pages/detail'], resolve),
            //     meta: {
            //         title: '详情',
            //     }
            // },
            // {
            //     name: 'Address',
            //     path: 'address',
            //     component: resolve => require(['@/pages/address'], resolve),
            //     meta: {
            //         title: '地址',
            //     }
            // },
            // {
            //     name: 'Other',
            //     path: 'other',
            //     component: resolve => require(['@/pages/other'], resolve),
            //     meta: {
            //         title: '其他',
            //     }
            // }
        ]
    },
    {
        name: 'List',
        path: '/list',
        component: resolve => require(['@/pages/list'], resolve),
        meta: {
            title: '列表',
        }
    },
    {
        name: 'Detail',
        path: '/detail/:id',
        component: resolve => require(['@/pages/detail'], resolve),
        meta: {
            title: '详情',
        }
    },
    {
        name: 'Address',
        path: '/address',
        component: resolve => require(['@/pages/address'], resolve),
        meta: {
            title: '地址',
        }
    },
    {
        name: 'Other',
        path: '/other',
        component: resolve => require(['@/pages/other'], resolve),
        meta: {
            title: '其他',
        }
    },
    {
        name: 'Department',
        path: '/department',
        component: resolve => require(['@/pages/department'], resolve),
        meta: {
            title: '部门管理',
        }
    },
    {
        name: 'Info',
        path: '/info',
        component: resolve => require(['@/pages/info'], resolve),
        meta: {
            title: '个人信息',
        }
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
