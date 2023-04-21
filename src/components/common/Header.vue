<template>
	<div class="header">
		<!-- 折叠按钮 -->
		<div class="collapse-btn" @click="collapseChage">
			<i v-if="!collapse" class="el-icon-s-fold"></i>
			<i v-else class="el-icon-s-unfold"></i>
		</div>
		<div class="logo">{{ title }}</div>
		<div class="header-right">
			<div class="header-user-con">
				<!-- 全屏显示 -->
				<div class="btn-fullscreen" @click="handleFullScreen">
					<el-tooltip effect="dark" :content="fullscreen ? `取消全屏` : `全屏`" placement="bottom"><i class="el-icon-rank"></i></el-tooltip>
				</div>
				<!-- 消息中心 -->
				<div class="btn-bell">
					<el-tooltip effect="dark" :content="message ? `有${message}条未读消息` : `消息中心`" placement="bottom">
						<router-link to="/"><i class="el-icon-bell"></i></router-link>
					</el-tooltip>
					<span class="btn-bell-badge" v-if="message"></span>
				</div>
				<!-- 用户头像 -->
				<div class="user-avator"><img src="@/assets/images/img.jpg" /></div>
				<!-- 用户名下拉菜单 -->
				<el-dropdown class="user-name" trigger="click" @command="handleCommand">
					<span class="el-dropdown-link">
						{{ userInfo.userName }}
						<i class="el-icon-caret-bottom"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="resetPwd">重置密码</el-dropdown-item>
						<el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
		<!-- 重置弹出框 -->
		<el-dialog title="重置密码" :visible.sync="resetVisible" width="30%" @close="closeResetDialog">
			<el-form ref="resetForm" :model="resetForm" label-width="100px">
				<el-form-item class="mb10" label="旧密码" prop="pwd0" :rules="formRules['pwd']"><el-input type="password" v-model="resetForm.pwd0"></el-input></el-form-item>
				<el-form-item label="新密码" prop="pwd1" :rules="formRules['pwd']"><el-input type="password" v-model="resetForm.pwd1"></el-input></el-form-item>
				<el-form-item label="确认密码" prop="pwd2" :rules="formRules['pwd']"><el-input type="password" v-model="resetForm.pwd2"></el-input></el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="closeResetDialog">取 消</el-button>
				<el-button type="primary" @click="saveReset('resetForm')">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
export default {
	data() {
		return {
			title: '运营支撑平台',
			collapse: false,
			fullscreen: false,
			name: '用户名',
			message: 0,
			resetVisible: false,
			resetForm: {},
			formRules: {
				pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }, { type: 'string', min: 6, max: 12, message: '密码长度6~12', trigger: ['blur', 'change'] }]
			}
		};
	},
	computed: {
		userInfo() {
			return this.$store.state.userInfo;
		}
	},
	methods: {
		// 用户名下拉菜单选择事件
		handleCommand(command) {
			if (command == 'logout') {
				sessionStorage.removeItem('token');
				window.location.href = window.location.origin + '/login';
			} else if (command == 'resetPwd') {
				this.showResetDialog();
			}
		},
		// 侧边栏折叠
		collapseChage() {
			this.collapse = !this.collapse;
			this.$Bus.$emit('collapse', this.collapse);
		},
		// 全屏事件
		handleFullScreen() {
			let element = document.documentElement;
			if (this.fullscreen) {
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if (document.webkitCancelFullScreen) {
					document.webkitCancelFullScreen();
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} else if (document.msExitFullscreen) {
					document.msExitFullscreen();
				}
				this.$Bus.$emit('fullscreen', false);
			} else {
				if (element.requestFullscreen) {
					element.requestFullscreen();
				} else if (element.webkitRequestFullScreen) {
					element.webkitRequestFullScreen();
				} else if (element.mozRequestFullScreen) {
					element.mozRequestFullScreen();
				} else if (element.msRequestFullscreen) {
					// IE11
					element.msRequestFullscreen();
				}
				this.$Bus.$emit('fullscreen', true);
			}
			this.fullscreen = !this.fullscreen;
		},
		showResetDialog() {
			this.resetVisible = true;
		},
		closeResetDialog() {
			this.$refs.resetForm.resetFields();
			this.resetVisible = false;
		},
		saveReset(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					const resetForm = this.resetForm;
					if (resetForm.pwd1 != resetForm.pwd2) {
						this.$message.error(`两次密码不一致`);
						return;
					}
					const { id, pwd0, pwd1, pwd2 } = resetForm;
					this.$post(this.$API.resetUserPwd, {
						method: 'cur',
						md5Password: this.md5(pwd1),
						oldpasswordmd5: this.md5(pwd0)
					})
						.then(res => {
							this.$message.success(`修改成功`);
							this.resetVisible = false;
							setTimeout(() => {
								sessionStorage.removeItem('token');
								window.location.href = window.location.origin + '/login';
							}, 1500);
						})
						.catch(err => {
							this.$message.error(err.data.message || `操作失败`);
						});
				} else {
					this.$message.error(`表单校验不通过`);
				}
			});
		}
	},
	created() {
		if (window.$config.HOST.includes('test-')) {
			this.title += '-测试接口';
		}
	},
	mounted() {
		if (document.body.clientWidth < 1500) {
			this.collapseChage();
		}
	}
};
</script>
<style scoped>
.header {
	position: relative;
	box-sizing: border-box;
	width: 100%;
	height: 70px;
	font-size: 22px;
	color: #fff;
}

.collapse-btn {
	float: left;
	padding: 0 21px;
	cursor: pointer;
	line-height: 70px;
}

.header .logo {
	float: left;
	width: 250px;
	line-height: 70px;
}

.header-right {
	float: right;
	padding-right: 50px;
}

.header-user-con {
	display: flex;
	height: 70px;
	align-items: center;
}

.btn-fullscreen {
	transform: rotate(45deg);
	margin-right: 5px;
	font-size: 24px;
}

.btn-bell,
.btn-fullscreen {
	position: relative;
	width: 30px;
	height: 30px;
	text-align: center;
	border-radius: 15px;
	cursor: pointer;
}

.btn-bell-badge {
	position: absolute;
	right: 0;
	top: -2px;
	width: 8px;
	height: 8px;
	border-radius: 4px;
	background: #f56c6c;
	color: #fff;
}
.btn-bell .el-icon-view,
.btn-bell .el-icon-bell,
.btn-bell .el-icon-house {
	color: #fff;
}
.btn-bell .el-icon-house {
	margin-left: 5px;
}
.user-name {
	margin-left: 10px;
}

.user-avator {
	margin-left: 20px;
}

.user-avator img {
	display: block;
	width: 40px;
	height: 40px;
	border-radius: 50%;
}

.el-dropdown-link {
	color: #fff;
	cursor: pointer;
}

.el-dropdown-menu__item {
	text-align: center;
}
</style>
