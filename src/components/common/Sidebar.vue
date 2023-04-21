<template>
	<div class="sidebar">
		<el-menu
			class="sidebar-el-menu"
			:default-active="onRoutes"
			:collapse="collapse"
			background-color="#324157"
			text-color="#bfcbd9"
			active-text-color="#20a0ff"
			unique-opened
			router
		>
			<template v-for="item in navs">
				<template v-if="item.children">
					<el-submenu :index="convertIndex(item)" :key="item.id">
						<template slot="title">
							<i :class="item.menuIcon"></i>
							<span slot="title">{{ item.moduleName }}</span>
						</template>
						<template v-for="subItem in item.children">
							<el-submenu v-if="subItem.children" :index="convertSubIndex(subItem)" :key="subItem.id">
								<template slot="title">
									{{ subItem.moduleName }}
								</template>
								<el-menu-item v-for="(threeItem, i) in subItem.children" :key="i" :index="threeItem.url">{{ threeItem.moduleName }}</el-menu-item>
							</el-submenu>
							<el-menu-item v-else :index="subItem.url" :key="subItem.id">{{ subItem.moduleName }}</el-menu-item>
						</template>
					</el-submenu>
				</template>
				<template v-else>
					<el-menu-item :index="item.url" :key="item.id">
						<i :class="item.menuIcon"></i>
						<span slot="title">{{ item.moduleName }}</span>
					</el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
</template>

<script>
export default {
	data() {
		return {
			collapse: false
		};
	},
	computed: {
		onRoutes() {
			// return this.$route.path.replace('/', '');
			return this.$route.path.replace('', '');
		},
		navs() {
			return this.$store.state.navs;
		}
	},
	created() {
		// 通过 Event this.$Bus 进行组件间通信，来折叠侧边栏
		this.$Bus.$on('collapse', msg => {
			this.collapse = msg;
			this.$Bus.$emit('collapse-content', msg);
		});
	},
	methods: {
		convertIndex(item) {
			return item.url != '#' ? item.url : item.id.toString();
		},
		convertSubIndex(subItem) {
			return subItem.url != '#' ? subItem.url : subItem.parentId + subItem.id.toString();
			// return subItem.url != '#' ? subItem.url : subItem.parentId + '-' +subItem.id.toString();
		}
	}
};
</script>

<style scoped lang="less">
.sidebar {
	display: block;
	position: absolute;
	left: 0;
	top: 70px;
	bottom: 0;
	z-index: 999;
	overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
	width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
	width: 250px;
}

.sidebar > ul {
	height: 100%;
}
/deep/.el-menu-item i,
/deep/.el-submenu__title i {
	color: inherit;
}
</style>
