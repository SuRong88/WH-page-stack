<template>
	<div id="app">
		<navigation :max="8" :tabbars="['Index', 'Manage', 'Me']">
			<router-view></router-view>
		</navigation>
	</div>
</template>
<script>
export default {
	created() {
		// this.$navigation.on('forward', (to, from) => {
		// 	console.log('App.vue forward 重置页面高度');
		// 	// if(to.meta.isTabbar) {
		// 	// 	console.log('tabbar保持滚动高度');
		// 	// 	return
		// 	// }
      	// 	document.documentElement.scrollTop = 0
		// })
	},
};
</script>
<style>
@import './assets/css/color-dark.css';
</style>
