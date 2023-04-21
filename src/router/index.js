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
                path: 'index',
                component: resolve => require(['@/pages/index'], resolve),
                meta: {
                    title: '首页'
                }
            },
            {
                path: 'list',
                component: resolve => require(['@/pages/list'], resolve),
                meta: {
                    title: '列表'
                }
            },
            {
                path: 'detail',
                component: resolve => require(['@/pages/detail'], resolve),
                meta: {
                    title: '详情'
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

router.beforeEach((to, from, next) => {
    console.log(to.path);
    document.title = to.meta.title;
	// 保存滚动条位置
	ScrollPosition.save(from.path);
    next();
});

export default router;
