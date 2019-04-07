<template>
	<scroll-view scroll-y="true" class="container">
		<uni-card title="专题描述">
			{{desc}}
		</uni-card>
		<choose-item v-for="(requestItem, index) in requestTestData" :key="index" :requestItem="requestItem"></choose-item>
	</scroll-view>
</template>

<script>
	import uniCard from '@/components/uni-card/uni-card.vue';
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
			uniCard,
			chooseItem
		},
		data() {
			let desc =
				"固定资产投资是拉动经济发展的重要引擎，涉及服务业、制造业、旅游、房地产等诸多领域，对国民经济的直接间接传导路径庞杂。因此，对固定资产投资的分析，历来是宏观经济综合分析的重点。本专题从规模、结构、质量、投资环境的角度展开，与同类型城市投资情况对比，帮助于发现湖北省投资发展中的问题，为湖北省投资规模扩大、结构优化提供决策参考。";
			return {
				topicId: "1000",
				topicName: "固定资产投资",
				desc: desc,
				requestTestData: requestTestData,
				requestData: {},
			};
		},
		onLoad: function(e) {
			if (JSON.stringify(e) != '{}') {
				this.topicId = e.topicId;
				this.topicName = e.topicName;
				uni.setNavigationBarTitle({
					title: e.topicName
				})
			}
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
