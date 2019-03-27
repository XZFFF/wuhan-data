<template>
	<!-- <view> -->
	<view class="container">
		<!-- 标题栏 -->
		<time-condition></time-condition>
		<!--
		<view class="canvasView">
			<view class="canvas-bar">
				<view class="title">饼图示例</view>
			</view>
			<mpvue-echarts :echarts="echarts" :onInit="pieInit" canvasId="pie" ref="pieChart" />
		</view>
		
		<view class="canvasView">
			<view class="title">折线图示例</view>
			<mpvue-echarts :echarts="echarts" :onInit="lineInit" canvasId="line" ref="lineChart" />
		</view>
		 -->
		<!-- </view> -->

	</view>
</template>

<script>
	import * as echarts from '../../components/echarts/echarts.simple.min.js';
	import mpvueEcharts from '../../components/mpvue-echarts/src/echarts.vue';
	import timeCondition from '../../components/condition-picker/time-condition.vue';

	let cityList = [{
		value: 55,
		name: '北京'
	}, {
		value: 38,
		name: '上海'
	}, {
		value: 20,
		name: '广州'
	}];

	let pieOption = {
		animation: false,
		backgroundColor: '#F8F8F8',
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
			data: [],
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

	let pickerSingleArray = [{
			label: '中国',
			value: 1
		},
		{
			label: '俄罗斯',
			value: 2
		},
		{
			label: '美国',
			value: 3
		},
		{
			label: '日本',
			value: 4
		}
	];
	export default {
		components: {
			mpvueEcharts,
			timeCondition
		},
		data() {
			return {
				echarts: echarts,
				indexId: "1000",
				indexName: "指标详情页",
				pickerSingleArray: pickerSingleArray,
				themeColor: '#007AFF',
				pickerText: '',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray: [],
				index1: 0,
				index2: 0,
				array1: ['2017Q1', '2017Q2', '2017Q3', '2017Q4'],
				array2: ['2018Q1', '2018Q2', '2018Q3', '2018Q4'],
			};
		},
		onLoad: function(e) {
			console.log(e);
			// typeof(e.indexId) != "undefined"
			if (JSON.stringify(e) != '{}') {
				this.indexId = e.indexId;
				this.indexName = e.indexName;
				uni.setNavigationBarTitle({
					title: e.indexName
				})
			}
			pieOption.series[0].data = cityList.slice(0);
			console.log("indexId:" + this.indexId);
		},
		// 导航栏自定义按钮
		onNavigationBarButtonTap(e) {
			uni.showToast({
				title: e.index === 0 ? "你点了分享按钮" : "你点了收藏按钮",
				icon: "none"
			})
		},
		methods: {
			bindPickerChange1: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.target.value)
				this.index1 = e.target.value
			},
			bindPickerChange2: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.target.value)
				this.index2 = e.target.value
			},
			onCancel(e) {
				console.log(e)
			},
			showPicker() {
				this.array = ['2018Q1', '2018Q2', '2018Q3', '2018Q4'],
					this.$refs.picker.show()
			},
			// 单列
			showSinglePicker() {
				this.pickerValueArray = this.pickerSingleArray
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
			},
			onConfirm(e) {
				this.pickerText = JSON.stringify(e)
			},
			pieInit(canvas, width, height) {
				let pieChart = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(pieChart)

				pieChart.setOption(pieOption)
				return pieChart
			},
			lineInit(canvas, width, height) {
				let lineChart = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(lineChart)

				lineChart.setOption(lineOption)
				return lineChart
			}
		},
		onBackPress() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel();
				return true;
			}
		},
		onUnload() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel()
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

	.title {
		margin-left: 30upx;
		color: #8f8f94;
	}

	.container {
		padding-bottom: 30upx;
		box-sizing: border-box;
	}

	.container,
	.canvasView {
		flex: 1;
		flex-direction: column;
	}

	.canvas-bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
