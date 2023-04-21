<template>
	<div style="display: inline-block;">
		<el-upload
			ref="uploadRef"
			class="banner-uploader"
			v-loading="loading"
			element-loading-background="rgba(0, 0, 0, 0.3)"
			:limit="1"
			:data="QiniuData"
			action="https://upload.qiniup.com"
			:show-file-list="showFileList"
			:drag="drag"
			accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG,.webp,.gif"
			:on-success="uploadSuccess"
			:before-upload="beforeUpload"
		>
			<template v-if="imgUrl">
				<img :src="imgUrl" class="banner" />
				<div class="control-box flex flex-ver flex-align-center">
					<i class="el-icon-zoom-in" @click.stop="previewImg"></i>
					<!-- <i class="el-icon-download" @click.stop="downloadImg"></i> -->
					<i class="el-icon-delete" @click.stop="removeImg"></i>
				</div>
			</template>
			<i v-else slot="default" class="el-icon-plus banner-uploader-icon"></i>
		</el-upload>
		<el-dialog :visible.sync="previewVisible"><img width="100%" :src="imgUrl" alt="" /></el-dialog>
	</div>
</template>
<script>
import upload from '@/utils/upload.js';
export default {
	props: {
		imgUrl: {
			type: String,
			required: true,
			default: ''
		},
		imgName: {
			type: String,
			default: 'pic'
		},
		keyPath: {
			type: String,
			required: true
		},
		drag: {
			type: Boolean,
			default: true
		},
		showFileList: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			loading: false,
			previewVisible: false,
			QiniuData: {
				key: '', //图片名字处理
				token: '', //七牛云token
				data: {} //图片信息
			}
		};
	},
	methods: {
		async beforeUpload(file) {
			this.loading = true;
			this.QiniuData = await upload.getImgName(file);
		},
		uploadSuccess(res, file) {
			this.loading = false;
			this.$message.success('上传成功');
			const imgUrl = `https://img.bazhuay.com/${res.key}`;
			this.$refs.uploadRef.clearFiles();
			this.$emit('uploadImg', {
				keyPath: this.keyPath,
				imgUrl
			});
		},
		previewImg() {
			this.previewVisible = true;
		},
		downloadImg() {
			this.getImgBase64(this.imgUrl).then(base64=>{
				const a = document.createElement('a');
				a.download = this.imgName
				a.href = base64;
				a.click();
			})
		},
		removeImg() {
			this.$message.success('移除成功');
			this.$emit('removeImg', this.keyPath);
		}
	}
};
</script>

<style scoped lang="less">
.banner-uploader {
	display: inline-block;
	height: 178px;
	position: relative;
	&:hover {
		.control-box {
			display: flex;
		}
	}
	.control-box {
		display: none;
		position: absolute;
		z-index: 2;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.3);
		.el-icon-zoom-in,
		.el-icon-download,
		.el-icon-delete {
			font-size: 24px;
			color: #f5f5f5;
			margin: 0 10px;
		}
	}
	.el-upload-dragger {
		height: 178px;
	}
}
</style>
