<template>
	<input type="button" class="button" style="line-height:80upx" value="返回" @tap="getback"/>
</template>

<script>
	export default {
		methods: {
			getback() {
				uni.navigateBack();
			}
		},
	}
</script>

<style>
	.button{
		width: 80%;
	}
</style>
