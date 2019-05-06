<template>
	<scroll-view scroll-y="true" class="container">
		<!-- 标题栏 -->
		<wd-time-picker></wd-time-picker>
		<wd-choose-item v-for="(indexDetailItem, index) in indexDetail" :key="index" :requestItem="indexDetailItem"></wd-choose-item>
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
				indexDetail: {},
				requestTestData: requestTestData,
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
		},
		onShow: function() {
			this.initIndexDetail();
		},
		onPullDownRefresh: function() {
			this.initIndexDetail();
			uni.stopPullDownRefresh();
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
		methods: {
			initIndexDetail() {
				uni.request({
					url: 'http://wuhandata.applinzi.com/analysisDetail.php',
					method: 'GET',
					data: {},
					success: res => {
						this.indexDetail = res.data;
						console.log(this.indexDetail);
					},
					fail: (e) => {
						console.log(e.errMsg);
					},
					complete: () => {}
				});
			}
		}
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
