<template>
	<scroll-view scroll-y="true" class="container">
		<!-- 标题栏 -->
		<time-condition></time-condition>
		<choose-item v-for="(requestItem, index) in requestTestData" :key="index" :requestItem="requestItem"></choose-item>
	</scroll-view>
</template>

<script>
	import timeCondition from '../../components/condition-picker/time-condition.vue';
	import chooseItem from '../../components/choose-item/choose-item.vue';

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
	}, {
		"id": "3",
		"type": "echarts",
		"height": "400",
		"option": {
			"legend": {
				"top": "bottom",
				"data": ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
			},
			"grid": {
				"containLabel": true
			},
			"xAxis": {
				"type": "category",
				"data": ["周一", "周二", "周三", "周四", "周五", "周六", "周日", "周一", "周二", "周三", "周四", "周五"]
			},
			"yAxis": {
				"type": "value"
			},
			"series": [{
				"name": "邮件营销",
				"type": "line",
				"stack": "总量",
				"data": [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 213]
			}, {
				"name": "联盟广告",
				"type": "line",
				"stack": "总量",
				"data": [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290]
			}, {
				"name": "视频广告",
				"type": "line",
				"stack": "总量",
				"data": [150, 232, 201, 154, 190, 330, 410, 232, 201, 154, 190, 223]
			}, {
				"name": "直接访问",
				"type": "line",
				"stack": "总量",
				"data": [320, 332, 301, 334, 390, 330, 320, 332, 301, 334, 390, 422]
			}, {
				"name": "搜索引擎",
				"type": "line",
				"stack": "总量",
				"data": [820, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1321]
			}]
		}
	}];

	export default {
		components: {
			timeCondition,
			chooseItem
		},
		data() {
			return {
				requestTestData: requestTestData,
				requestData: {},
				indexId: "1000",
				indexName: "指标详情页",
			};
		},
		onLoad: function(e) {
			if (JSON.stringify(e) != '{}') {
				this.indexId = e.indexId;
				this.indexName = e.indexName;
				uni.setNavigationBarTitle({
					title: e.indexName
				})
			}

			uni.request({
				url: 'http://wuhandata.applinzi.com/analysisDetail.php',
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
		// 导航栏自定义按钮
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				uni.share({

				})
			}
			uni.showToast({
				title: e.index === 0 ? "你点了分享按钮" : "你点了收藏按钮",
				icon: "none"
			})
		},
		methods: {}
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
