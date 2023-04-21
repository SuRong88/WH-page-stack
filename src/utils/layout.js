import dayjs from 'dayjs';
import md5 from 'md5';

export default {
	install: function(Vue) {
		let loading = null;
		let last = 0;
		let timer = '';

		// 获取精确乘法结果
		Vue.prototype.accMul = function(arg1, arg2) {
			arg1 += '';
			arg2 += '';
			let m = 0;
			let s1 = arg1.toString();
			let s2 = arg2.toString();
			try {
				m += s1.split('.')[1].length;
			} catch (e) {}
			try {
				m += s2.split('.')[1].length;
			} catch (e) {}
			return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
		};

		// 节流
		Vue.prototype.throttle = function(func, wait) {
			const current_time = Date.now();
			if (current_time - last > wait) {
				func.call(this, arguments);
				last = Date.now();
			}
		};

		// 防抖
		Vue.prototype.debounce = function(func, wait) {
			timer && clearTimeout(timer);
			timer = setTimeout(func, wait);
		};

		// 错误通知
		Vue.prototype.errorNotify = function(msg, title = '提示', duration = 2000) {
			if (msg) {
				let that = this;
				// 延迟用于解决通知框重叠问题
				setTimeout(function() {
					that.$notify.error({
						title: title,
						message: msg,
						duration: duration
					});
				}, 100);
			}
		};

		// 成功通知
		Vue.prototype.successNotify = function(msg, title = '提示', duration = 2000) {
			if (msg) {
				let that = this;
				// 延迟用于解决通知框重叠问题
				setTimeout(function() {
					that.$notify.success({
						title: title,
						message: msg,
						duration: duration
					});
				}, 100);
			}
		};

		// 错误提示
		Vue.prototype.errorToast = function(msg, duration = 2000) {
			if (msg) {
				this.$message({
					message: msg,
					type: 'error',
					duration: duration,
					showClose: true
				});
			}
		};

		// 成功提示
		Vue.prototype.successToast = function(msg, duration = 2000) {
			if (msg) {
				this.$message({
					message: msg,
					type: 'success',
					duration: duration,
					showClose: true
				});
			}
		};

		// 显示loading
		Vue.prototype.loading = function(type, text = '加载中...') {
			loading = this.$loading({
				lock: true,
				text: text,
				background: 'rgba(255,255,255,0)'
				// 加载图标
				// spinner: 'el-icon-loading',
			});
		};

		// 隐藏loading
		Vue.prototype.loadEnd = function(type) {
			loading && loading.close();
		};

		// md5加密
		Vue.prototype.md5 = function(text) {
			return md5(text);
		};

		// 日期格式化
		Vue.prototype.formatDate = function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
			if (!dataStr) return '';
			return dayjs(dataStr).format(pattern);
		};

		// 图片转base64
		Vue.prototype.getImgBase64 = function(url) {
			const imgExtension = url.substring(url.lastIndexOf('.') + 1) || 'jpeg';
			return new Promise(function(resolve, reject) {
				let Img = new Image();
				Img.setAttribute('crossOrigin', 'anonymous'); //处理跨域
				let dataURL = '';
				Img.src = url;
				Img.onload = function() { //确保图片完整获取
					const canvas = document.createElement("canvas") //创建canvas元素
					const width = Img.width; //canvas的尺寸和图片一样
					const height = Img.height;
					canvas.width = width;
					canvas.height = height;
					canvas.getContext("2d").drawImage(Img, 0, 0, width, height); //绘制canvas
					dataURL = canvas.toDataURL(`image/${imgExtension}`); //转换为base64
					resolve(dataURL);
				};
			});
		};

		// 处理图片上传
		Vue.prototype.uploadImgSuccess = function(that, param) {
			const {
				imgUrl,
				keyPath
			} = param;
			let val = that;
			const keyArr = keyPath.split('.');
			const keyNum = keyArr.length
			if (keyNum > 1) {
				for (let i = 0; i < keyNum - 1; i++) {
					val = val[keyArr[i]];
				}
			}
			val[keyArr[keyNum - 1]] = imgUrl
		};

		// 处理图片上传
		Vue.prototype.removeImgSuccess = function(that, keyPath) {
			let val = that;
			const keyArr = keyPath.split('.');
			const keyNum = keyArr.length
			if (keyNum > 1) {
				for (let i = 0; i < keyNum - 1; i++) {
					val = val[keyArr[i]];
				}
			}
			val[keyArr[keyNum - 1]] = ''
		};
	}
};
