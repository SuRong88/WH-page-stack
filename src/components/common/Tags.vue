<template>
	<div class="tags" v-if="showTags">
		<ul class="tags-ul flex">
			<li class="tags-li" v-for="(item, index) in tagsList" :class="{ active: isActive(item.path) }" :key="index">
				<router-link :to="item.path" class="tags-li-title">{{ item.title }}</router-link>
				<span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
			</li>
		</ul>
		<div class="tags-close-box">
			<el-dropdown @command="handleTags">
				<el-button size="mini" type="primary">
					标签选项
					<i class="el-icon-arrow-down el-icon--right"></i>
				</el-button>
				<el-dropdown-menu size="small" slot="dropdown">
					<el-dropdown-item command="other">关闭其他</el-dropdown-item>
					<el-dropdown-item command="all">关闭所有</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			tagsList: []
		};
	},
	methods: {
		isActive(path) {
			return path === this.$route.path;
		},
		// 关闭单个标签
		closeTags(index) {
			const delItem = this.tagsList.splice(index, 1)[0];
			const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
			if (item) {
				delItem.path === this.$route.path && this.$router.push(item.path);
			} else {
				this.$router.push('/');
			}
		},
		// 关闭全部标签
		closeAll() {
			this.tagsList = [];
			this.$router.push('/');
		},
		// 关闭其他标签
		closeOther() {
			const curItem = this.tagsList.filter(item => {
				return item.path === this.$route.path;
			});
			this.tagsList = curItem;
		},
		// 设置标签
		setTags(route) {
			const isExist = this.tagsList.some(item => {
				return item.name === route.name;
			});
			if (!isExist) {
				if (this.tagsList.length >= 8) {
					this.tagsList.shift();
				}
				this.tagsList.push({
					title: route.meta.title,
					path: route.fullPath,
					name: route.name
					// name: route.matched[1].components.default.name
				});
			}
			let tags = [];
            for (let i = 0; i < this.tagsList.length; i++) {
                this.tagsList[i].name && tags.push(this.tagsList[i].name);
            }
			// this.$Bus.$emit('tags', tags);
		},
		handleTags(command) {
			command === 'other' ? this.closeOther() : this.closeAll();
		}
	},
	computed: {
		showTags() {
			return this.tagsList.length > 0;
		}
	},
	watch: {
		$route(newValue, oldValue) {
			// if(newValue.query.refresh) {
			// 	console.log("don't do anything");
			// 	return;
			// }

			// console.info(1, 'watch');

			// this.setTags(newValue);
		}
	},
	created() {
		this.setTags(this.$route);
		// 监听关闭当前页面的标签页
		this.$Bus.$on('close_current_tags', () => {
			for (let i = 0, len = this.tagsList.length; i < len; i++) {
				const item = this.tagsList[i];
				if (item.path === this.$route.path) {
					if (i < len - 1) {
						this.$router.push(this.tagsList[i + 1].path);
					} else if (i > 0) {
						this.$router.push(this.tagsList[i - 1].path);
					} else {
						this.$router.push('/');
					}
					this.tagsList.splice(i, 1);
					break;
				}
			}
		});
	}
};
</script>

<style>
.tags {
	z-index: 99;
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	opacity: 0.7;
	/* display: none; */
	/* position: relative; */
	height: 40px;
	overflow: hidden;
	background: #fff;
	padding-right: 120px;
	box-shadow: 0 5px 10px #ddd;
	border-bottom: 1px solid #f0f0f0;
}

.tags ul {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
}

.tags-li {
	margin: 5px;
	border-radius: 3px;
	font-size: 12px;
	overflow: hidden;
	flex-shrink: 0;
	cursor: pointer;
	height: 30px;
	line-height: 30px;
	border: 1px solid #e9eaec;
	background: #fff;
	padding: 0 8px 0 15px;
	vertical-align: middle;
	color: #666;
	-webkit-transition: all 0.3s ease-in;
	-moz-transition: all 0.3s ease-in;
	transition: all 0.3s ease-in;
}

.tags-li:not(.active):hover {
	background: #f8f8f8;
}

.tags-li.active {
	color: #fff;
}

.tags-li-title {
	float: left;
	max-width: 80px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	margin-right: 5px;
	color: #666;
}

.tags-li.active .tags-li-title {
	color: #fff;
}

.tags-close-box {
	position: absolute;
	right: 0;
	top: 0;
	box-sizing: border-box;
	padding-top: 1px;
	text-align: center;
	width: 110px;
	height: 40px;
	padding: 5px 0;
	background: #fff;
	box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
	z-index: 10;
}
.tags-ul {
	width: 100%;
	overflow-y: hidden;
	overflow-x: auto;
	flex-wrap: nowrap;
}
.tags-ul::-webkit-scrollbar {
	width: 4px;
	height: 4px;
}

.tags-ul::-webkit-scrollbar-thumb {
	border-radius: 5px;
	-webkit-box-shadow: inset 0 0 5px rgba(50, 65, 87, 0.2);
	background: rgba(50, 65, 87, 0.1);
}
</style>
