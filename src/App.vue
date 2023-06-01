<template>
	<div id="app">
		<navigation :max="2">
			<router-view></router-view>
		</navigation>
	</div>
</template>
<script>
export default {
	created() {
		this.$navigation.on('forward', (to, from) => {
			console.log('App.vue forward 重置页面高度');
      		document.documentElement.scrollTop = 0
		})
	},
};
</script>
<style>
@import './assets/css/color-dark.css';
</style>
