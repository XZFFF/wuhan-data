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
		"title": "GDP总量",
		"type": "echarts",
		"height": "300",
		"option": {
			"grid": {
				"containLabel": true
			},
			"xAxis": {
				"type": "category",
				"data": ['2018Q1', '2018Q2', '2018Q3', '2018Q4', '2019Q1', '2019Q2']
			},
			"yAxis": {
				"type": "value",
				"min": 400,
				"max": 1000
			},
			"series": [{
				"type": "line",
				"data": [490, 546, 493, 522, 570, 900]
			}]
		}
	}, {
		"id": "2",
		"title": "GDP总量",
		"type": "table",
		"tableBody": [
			[" ", "GDP总量", "第一产业", "第二产业", "第三产业"],
			["2018Q1", "490", "150", "220", "120"],
			["2018Q2", "546", "232", "182", "132"],
			["2018Q3", "493", "201", "191", "101"],
			["2018Q4", "522", "154", "234", "134"],
			["2019Q1", "570", "190", "290", "90"],
			["2018Q2", "900", "340", "330", "230"],
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
