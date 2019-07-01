<template>
	<view class="canvas-view" :style="{height:classHeight + 'px'}">
		<view class="echart-nav">
			<image src="../../../static/icon/echarts/trend-upward.png"></image>
			<text>{{classTitle}}</text>
		</view>
		<mpvue-echarts :echarts="echarts" :onInit="onInit" :canvasId="canvasId" ref="echarts" />
	</view>
</template>

<script>
	import * as echarts from '@/components/echarts/echarts.min.js';
	import mpvueEcharts from '@/components/mpvue-echarts/src/echarts.vue';

	let wdChart = null;

	export default {
		components: {
			mpvueEcharts
		},
		props: {
			echartOption: {
				type: Object
			},
			canvasId: {
				type: String,
				default: 'ec-canvas',
			},
			classHeight: {
				type: String,
				default: "400",
			},
			classTitle: {
				type: String,
				default: 'ECharts图例',
			},
		},
		data() {
			return {
				echarts: echarts
			};
		},
		watch: {
			echartOption(newOption, oldOption) {
				//console.log(this.$refs.echarts.chart);
				wdChart = this.$refs.echarts.chart;
				wdChart.setOption(this.echartOption)
			}
		},
		onLoad() {},
		methods: {
			onInit(canvas, width, height) {
				wdChart = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(wdChart)
				wdChart.setOption(this.echartOption)
				return wdChart
			}
		}
	}
</script>

<style>
	.canvas-view {
		flex: 1;
		flex-direction: column;
		background-color: #FFFFFF;
		width: 100%;
		height: 400upx;
		margin-top: 30upx;
	}

	.echart-nav {
		width: 100%;
		height: 90upx;
		background-color: #FFFFFF;
		border-bottom-color: #E7E7E7;
		border-bottom-style: solid;
		border-bottom-width: 3upx;
	}

	.echart-nav image {
		margin: 20upx 0upx 20upx 20upx;
		width: 50upx;
		height: 50upx;
	}

	.echart-nav text {
		margin: auto 20upx;
		font-size: 14px;
	}
</style>
