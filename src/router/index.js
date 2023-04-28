import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import ScrollPosition from '@/lib/scrollPosition';
// NProgress.configure({
//     showSpinner: false
// });
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
                // name: 'Address',
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
    NProgress.start();
    // console.log(to, from);
    console.log(JSON.parse(JSON.stringify(to.query)), JSON.parse(JSON.stringify(from.query)));
    const toMeta = to.meta || {};
    const toQuery = to.query;
    const toName = to.name;
    const toPath = to.path;
    const fromMeta = from.meta || {};
    const fromPath = from.path;

    // query.refresh判断
    if (toQuery.refresh) {
        delete to.query.refresh;
        if (toPath === fromPath) {
            console.error(`[keepAlive error] path: ${to.path}相同不允许使用query.refresh`);
            next();
            return;
        }
        if (toMeta.keepAlive) {
            toName && Vue.prototype.$Bus.$emit('delTag', toName);
            Vue.prototype.$nextTick(() => {
                next(to);
            });
        } else {
            next(to);
        }
        return;
    }

    // 保存滚动条位置
    if (fromMeta.keepAlive) {
        console.log(`%c 保存${from.path}的位置`, 'color: green;');
        ScrollPosition.save(from.path);
    }

    // 设置include
    if (toMeta.keepAlive) {
        if (!toName) {
            console.error(`[keepAlive error] path: ${to.path}缺少name配置`);
            next();
            return;
        }
        if (!sessionStorage.getItem('firstKeepAliveTag')) {
            console.log('初始化设置tags');
            sessionStorage.setItem('firstKeepAliveTag', toName);
        }
        Vue.prototype.$Bus.$emit('addTag', toName);
    }
    next();
});
router.afterEach(() => {
    NProgress.done();
});
export default router;
