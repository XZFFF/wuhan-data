<template>
	<view>
		{{indexId}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indexId: "1000",
				indexName: "指标详情页"
			};
		},
		// 导航栏自定义按钮
		onNavigationBarButtonTap(e) {
			uni.showToast({
				title: e.index === 0 ? "你点了分享按钮" : "你点了收藏按钮",
				icon: "none"
			})
		},
		onLoad: function(e) {
			console.log(e);
			// typeof(e.indexId) != "undefined"
			if (JSON.stringify(e) != '{}') {
				console.log(e);
				this.indexId = e.indexId;
				uni.setNavigationBarTitle({
					title: e.indexName
				})
			}
		}
	}
</script>

<style>

</style>
