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
