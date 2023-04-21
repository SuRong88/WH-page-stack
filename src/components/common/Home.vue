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
		<transition name="fade-transform" mode="out-in">
			<router-view></router-view>
			<!-- <keep-alive :include="tagsList"><router-view></router-view></keep-alive> -->
		</transition>
		<v-tabbar></v-tabbar>
		<v-tabbar hidden></v-tabbar>
	</div>
</template>

<script>
import vHeader from './Header.vue';
import vSidebar from './Sidebar.vue';
import vTags from './Tags.vue';
import vTabbar from './Tabbar.vue';

export default {
	data() {
		return {
			tagsList: [],
			collapse: false
		};
	},
	components: {
		vHeader,
		vSidebar,
		vTags,
		vTabbar,
	},
	created() {
		this.$Bus.$on('collapse-content', msg => {
			this.collapse = msg;
		});

		// 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
		this.$Bus.$on('tags', msg => {
			let arr = [];
			for (let i = 0, len = msg.length; i < len; i++) {
				msg[i].name && arr.push(msg[i].name);
			}
			this.tagsList = arr;
		});
	}
};
</script>
