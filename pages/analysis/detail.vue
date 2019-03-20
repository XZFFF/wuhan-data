<template>
	<view>
		{{indexId}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indexId: "1000"
			};
		},
		onLoad: function(e) {
			console.log(e);
			// typeof(e.indexId) != "undefined"
			if (JSON.stringify(e) != '{}') {
				console.log(e);
				this.indexId = e.indexId;
			}
		}
	}
</script>

<style>

</style>
