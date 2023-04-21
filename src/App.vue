<template>
	<div id="app">
		<router-view></router-view>
		<!-- <div ref="googleAd" class="google-ad testAd" style="opacity: 0;">这里放置Google广告代码</div> -->
	</div>
</template>
<script>
export default {
	// mounted() {
	// 	if (this.$refs.googleAd.offsetHeight === 0) {
	// 		this.$alert('使用本系统之前，请关闭Adblock插件', '温馨提示', {
	// 			confirmButtonText: '确定'
	// 		});
	// 	}
	// }
};
</script>
<style>
@import './assets/css/color-dark.css';
</style>
