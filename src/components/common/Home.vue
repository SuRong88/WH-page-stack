<template>
    <div class="wrapper">
        <!-- <v-header></v-header> -->
        <!-- <v-sidebar></v-sidebar> -->
        <!-- <div class="content-box" :class="{ 'content-collapse': collapse }"> -->
        <!-- <v-tags></v-tags> -->
        <!-- <div class="content" style="position: relative;">
				<transition name="fade-transform" mode="out-in">
					<keep-alive :include="tagsList"><router-view></router-view></keep-alive>
				</transition>
			</div> -->
        <!-- </div> -->
        <!-- <transition name="fade-transform" mode="out-in">
            <keep-alive><router-view v-if="$route.meta.keepAlive"></router-view></keep-alive>
        </transition>
        <transition name="fade-transform" mode="out-in">
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition> -->
        <v-navbar></v-navbar>
        <transition name="fade-transform" mode="out-in">
            <keep-alive :include="tagsList"><router-view v-if="$route.meta.keepAlive && isRouterAlive"></router-view></keep-alive>
        </transition>
        <transition name="fade-transform" mode="out-in">
            <router-view v-if="!$route.meta.keepAlive && isRouterAlive"></router-view>
        </transition>
        <!-- <router-view v-if="isRouterAlive"></router-view> -->
        <v-tabbar></v-tabbar>
        <!-- <v-tabbar hidden></v-tabbar> -->
        <!-- <v-tags></v-tags> -->
    </div>
</template>

<script>
import vHeader from './Header.vue';
import vSidebar from './Sidebar.vue';
import vTags from './Tags.vue';
import vNavbar from './Navbar.vue';
import vTabbar from './Tabbar.vue';

export default {
    provide() {
        return {
            reload: this.reload
        };
    },
    data() {
        return {
            tagsList: [],
            collapse: false,
            isRouterAlive: true
        };
    },
    components: {
        vNavbar,
        // vHeader,
        // vSidebar,
        // vTags,
        vTabbar
    },
    methods: {
        reload(pageName) {
            console.log('reload执行', pageName);
            this.isRouterAlive = false;
            const pageIndex = this.tagsList.findIndex(tag => tag === pageName);
            if (pageIndex !== -1) {
                this.tagsList.splice(pageIndex, 1);
            }
            //通过this.$nextTick()产生一个微任务,在一次dom事件循环后,重新创建组件
            this.$nextTick(() => {
                this.isRouterAlive = true;
                if (pageIndex !== -1) {
                    this.tagsList.splice(pageIndex, 0, pageName);
                }
            });
        },
        // 设置标签
        setTags(tag) {
            const isExist = this.tagsList.includes(tag);
            if (!isExist) {
                if (this.tagsList.length >= 8) {
                    this.tagsList.shift();
                }
                this.tagsList.push(tag);
            }
			// const existIndex = this.tagsList.findIndex(item => item === tag);
            // if (existIndex !== -1) {
            //     this.tagsList.splice(existIndex, 1)
			// 	this.tagsList.push(tag)
            // } else {
			// 	if (this.tagsList.length >= 2) {
            //         this.tagsList.shift();
            //     }
            //     this.tagsList.push(tag);
			// }
        }
    },
    created() {
        this.$Bus.$on('collapse-content', msg => {
            this.collapse = msg;
        });

        const tag = sessionStorage.getItem('firstTag');
        this.setTags(tag);
        sessionStorage.setItem('homeInit', true);

        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        this.$Bus.$on('tags', tag => {
            // this.tagsList = tag;
            console.log('$on', tag);
            this.setTags(tag);
        });
    }
};
</script>
