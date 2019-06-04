<template>
	<scroll-view scroll-y="true" class="container">
		<uni-card title="专题描述">
			{{desc}}
		</uni-card>
		<wd-choose-item v-for="(requestItem, index) in requestTestData" :key="index" :requestItem="requestItem"></wd-choose-item>
	</scroll-view>
</template>

<script>
	import uniCard from '@/components/uni-card/uni-card.vue';
	import wdChooseItem from '../../../components/wd-choose-item/wd-choose-item.vue';

	let requestTestData = [{
		"id": "1",
		"title": "GDP发展趋势",
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
		"title": "GDP累计值",
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
	}, {
		"id": "3",
		"title": "GDP及三大产业累计值趋势",
		"type": "echarts",
		"height": "400",
		"option": {
			"legend": {
				"top": "bottom",
				"data": ['第三产业', '第二产业', '第一产业', 'GDP']
			},
			"grid": {
				"containLabel": true
			},
			"xAxis": {
				"type": "category",
				"boundaryGap": false,
				"data": ['2018Q1', '2018Q2', '2018Q3', '2018Q4', '2019Q1', '2019Q2']
			},
			"yAxis": {
				"type": "value"
			},
			"series": [{
					"name": '第三产业',
					"type": 'line',
					"stack": '总量',
					"areaStyle": {},
					"data": [120, 132, 101, 134, 90, 230]
				},
				{
					"name": '第二产业',
					"type": 'line',
					"stack": '总量',
					"areaStyle": {},
					"data": [220, 182, 191, 234, 290, 330]
				},
				{
					"name": '第一产业',
					"type": 'line',
					"stack": '总量',
					"areaStyle": {},
					"data": [150, 232, 201, 154, 190, 340]
				},
				{
					"name": 'GDP',
					"type": 'line',
					"stack": '总量',
					"areaStyle": {"normal": {}},
					"data": [490, 546, 493, 522, 570, 900]
				}
			]
		}
	}];


	export default {
		components: {
			uniCard,
			wdChooseItem
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
