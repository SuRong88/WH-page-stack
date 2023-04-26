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
    routes,
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

sessionStorage.removeItem('homeInit');
sessionStorage.removeItem('firstTag');

router.beforeEach((to, from, next) => {
    console.info(2, to);
    document.title = to.meta.title;
	// 保存滚动条位置
	ScrollPosition.save(from.path);
    if(to.meta && to.meta.keepAlive) {
        if(!sessionStorage.getItem('homeInit')) {
            console.log('初始化设置tags');
            sessionStorage.setItem('firstTag', to.name)
        }
        Vue.prototype.$Bus.$emit('tags', to.name)
    }
    next();
});

export default router;
