import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import ScrollPosition from '@/lib/scrollPosition';
NProgress.configure({
    showSpinner: false
});

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
                    keepAlive: true
                }
            },
            {
                name: 'List',
                path: 'list',
                component: resolve => require(['@/pages/list'], resolve),
                meta: {
                    title: '列表',
                    keepAlive: true
                }
            },
            {
                name: 'Detail',
                path: 'detail',
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
                    keepAlive: false
                }
            }
        ]
    }
];

const router = new Router({
    mode: 'history',
    routes
    // scrollBehavior(to, from, savedPosition) {
    //     console.log('savedPosition:', savedPosition);
    //     if (savedPosition) {
    //         return savedPosition;
    //     } else {
    //         return {
    //             left: 0,
    //             top: 0
    //         };
    //     }
    // }
});

sessionStorage.removeItem('firstKeepAliveTag');
document.title = '';
router.beforeEach((to, from, next) => {
    console.log(to, from);
    const fromMeta = from.meta || {};
    const toMeta = to.meta || {};
    const toName = to.name;
    // document.title = toMeta.title;
    if (fromMeta.keepAlive) {
        ScrollPosition.save(from.path);
    }
    if (toMeta.keepAlive) {
        // 保存滚动条位置
        if (!toName) {
            console.error(`path: ${to.path}缺少name配置`);
            next();
            return;
        }
        if (!sessionStorage.getItem('firstKeepAliveTag')) {
            console.log('初始化设置tags');
            sessionStorage.setItem('firstKeepAliveTag', toName);
        }
        Vue.prototype.$Bus.$emit('tags', toName);
    }
    next();
});

export default router;
