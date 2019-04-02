<template>
	<!-- <view> -->
	<scroll-view scroll-y="true" class="container">
		<!-- 标题栏 -->
		<time-condition></time-condition>
		<table-item :tableBody="tableBody"></table-item>
		<nb-echarts :nbOption="demoOption" :canvasId="'demo'" nbHeight="300"></nb-echarts>
		<!-- <nb-echarts :nbOption="pieOption" :canvasId="'pie'"></nb-echarts> -->
		<nb-echarts :nbOption="linesOption" :canvasId="'line'"></nb-echarts>
		<nb-echarts :nbOption="nbOption" :canvasId="'nb'" nbHeight="400"></nb-echarts>

	</scroll-view>
</template>

<script>
	// import LineEcharts from '../../components/xzf-echarts/line-echarts.vue';
	// import PieEcharts from '../../components/xzf-echarts/pie-echarts.vue';
	import nbEcharts from '../../components/xzf-echarts/nb-echarts.vue';
	import timeCondition from '../../components/condition-picker/time-condition.vue';
	import tableItem from '../../components/table-item/table-item.vue';

	let demoOption = {
		grid: {
			containLabel: true
		},
		xAxis: {
			type: 'category',
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
		},
		yAxis: {
			type: 'value'
		},
		series: [{
			data: [820, 932, 901, 934, 1290, 1330, 1320],
			type: 'line'
		}]
	};

	let pieOption = {
		animation: false,
		backgroundColor: '#FFFFFF',
		color: ['#37A2DA', '#32C5E9', '#67E0E3', '#91F2DE', '#FFDB5C', '#FF9F7F'],
		series: [{
			label: {
				normal: {
					fontSize: 14
				}
			},
			type: 'pie',
			center: ['50%', '50%'],
			radius: [0, '60%'],
			data: [{
				value: 55,
				name: '北京'
			}, {
				value: 38,
				name: '上海'
			}, {
				value: 20,
				name: '广州'
			}],
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 2, 2, 0.3)'
				}
			}
		}]
	};

	let lineOption = {
		animation: false,
		color: ['#37A2DA', '#9FE6B8'],
		grid: {
			x: 35,
			x2: 10,
			y: 30,
			y2: 25
		},
		calculable: false,
		xAxis: [{
			type: 'category',
			data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
		}],
		yAxis: [{
			type: 'value',
			splitArea: {
				show: true
			}
		}],
		series: [{
			name: '蒸发量',
			type: 'line',
			data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
		}, {
			name: '降水量',
			type: 'line',
			data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
		}]
	};

	let nbOption = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				crossStyle: {
					color: '#999'
				}
			}
		},
		toolbox: {
			show: false
		},
		grid: {
			containLabel: true
		},
		legend: {
			top: "bottom",
			data: ['蒸发量', '降水量', '平均温度']
		},
		xAxis: [{
			type: 'category',
			data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
			axisPointer: {
				type: 'shadow'
			}
		}],
		yAxis: [{
				type: 'value',
				name: '水量',
				min: 0,
				max: 250,
				interval: 50,
				axisLabel: {
					formatter: '{value} ml'
				}
			},
			{
				type: 'value',
				name: '温度',
				min: 0,
				max: 25,
				interval: 5,
				axisLabel: {
					formatter: '{value} °C'
				}
			}
		],
		series: [{
				name: '蒸发量',
				type: 'bar',
				data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
			},
			{
				name: '降水量',
				type: 'bar',
				data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
			},
			{
				name: '平均温度',
				type: 'line',
				yAxisIndex: 1,
				data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
			}
		]
	};

	let linesOption = {
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			top: "bottom",
			data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
		},
		grid: {
			containLabel: true
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日', '周一', '周二', '周三', '周四', '周五']
		},
		yAxis: {
			type: 'value'
		},
		series: [{
				name: '邮件营销',
				type: 'line',
				stack: '总量',
				data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 213]
			},
			{
				name: '联盟广告',
				type: 'line',
				stack: '总量',
				data: [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290]
			},
			{
				name: '视频广告',
				type: 'line',
				stack: '总量',
				data: [150, 232, 201, 154, 190, 330, 410, 232, 201, 154, 190, 223]
			},
			{
				name: '直接访问',
				type: 'line',
				stack: '总量',
				data: [320, 332, 301, 334, 390, 330, 320, 332, 301, 334, 390, 422]
			},
			{
				name: '搜索引擎',
				type: 'line',
				stack: '总量',
				data: [820, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1321]
			}
		]
	};



	export default {
		components: {
			timeCondition,
			tableItem,
			// LineEcharts,
			// PieEcharts,
			nbEcharts
		},
		data() {
			let tableBody = [
				['表头1表头1表头头1表头1', 'item1', 'item2', 'item3', 'item4', '233'],
				['表头2表头1表头1表', 'xiaoming', 'xiaohong', 'lining', '233', '233'],
				['表头3', '9000000000', '80', '70', '233', '233'],
				['表头3', '900', '80', '70', '233', '233'],
				['表头3', '900', '80', '70', '233', '233'],
				['表头3', '900', '80', '70', '233', '233']
			];
			return {
				demoOption: demoOption,
				lineOption: lineOption,
				pieOption: pieOption,
				nbOption: nbOption,
				linesOption: linesOption,
				tableBody: tableBody,
				indexId: "1000",
				indexName: "指标详情页",
			};
		},
		onLoad: function(e) {
			console.log(e);
			if (JSON.stringify(e) != '{}') {
				this.indexId = e.indexId;
				this.indexName = e.indexName;
				uni.setNavigationBarTitle({
					title: e.indexName
				})
			}
			console.log("indexId:" + this.indexId);
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
