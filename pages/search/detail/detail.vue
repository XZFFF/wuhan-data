<template>
	<scroll-view scroll-y="true" class="container">
		<wd-time-picker></wd-time-picker>
		<wd-choose-item v-for="(requestItem, index) in requestData" :key="index" :requestItem="requestItem"></wd-choose-item>
	</scroll-view>
</template>

<script>
	import wdTimePicker from '@/components/wd-time-picker/wd-time-picker.vue';
	import wdChooseItem from '@/components/wd-choose-item/wd-choose-item.vue';

	export default {
		components: {
			wdTimePicker,
			wdChooseItem
		},
		data() {
			return {
				requestData: {},
				indexId: "1000",
				indexName: "指标详情页",
			};
		},
		onLoad: function(e) {
			if (JSON.stringify(e) != '{}') {
				console.log(e);
				this.indexId = e.indexId;
				this.indexName = e.indexName;
				uni.setNavigationBarTitle({
					title: e.indexName
				})
			}

			uni.request({
				url: 'http://wuhandata.applinzi.com/searchDetail.php',
				method: 'GET',
				data: {},
				success: res => {
					this.requestData = res.data;
				},
				fail: (e) => {
					console.log(e.errMsg);
				},
				complete: () => {}
			});

		},
	}
</script>

<style>
	page,
	view {
		display: flex;
	}

	page {
		min-height: 100%;
	}

	.container {
		flex: 1;
		flex-direction: column;
		padding-bottom: 30upx;
		box-sizing: border-box;
	}
</style>
