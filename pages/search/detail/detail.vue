<template>
	<scroll-view scroll-y="true" class="container">
		<wd-time-picker></wd-time-picker>
		<wd-choose-item v-for="(requestItem, index) in requestTestData" :key="index" :requestItem="requestItem"></wd-choose-item>
	</scroll-view>
</template>

<script>
	import wdTimePicker from '@/components/wd-time-picker/wd-time-picker.vue';
	import wdChooseItem from '@/components/wd-choose-item/wd-choose-item.vue';

	let requestTestData = [{
		"id": "1",
		"type": "echarts",
		"height": "300",
		"option": {
			"grid": {
				"containLabel": true
			},
			"xAxis": {
				"type": "category",
				"data": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
			},
			"yAxis": {
				"type": "value"
			},
			"series": [{
				"type": "line",
				"data": [820, 932, 901, 934, 1290, 1330, 1320]
			}]
		}
	}, {
		"id": "2",
		"type": "table",
		"tableBody": [
			["表头1表头1表头头1表头1", "item1", "item2", "item3", "item4", "233"],
			["表头2表头1表头1表", "xiaoming", "xiaohong", "lining", "233", "233"],
			["表头3", "9000000000", "80", "70", "233", "233"],
			["表头3", "900", "80", "70", "233", "233"],
			["表头3", "900", "80", "70", "233", "233"],
			["表头3", "900", "80", "70", "233", "233"]
		]
	}];


	export default {
		components: {
			wdTimePicker,
			wdChooseItem
		},
		data() {
			return {
				requestData: {},
				requestTestData: requestTestData,
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
