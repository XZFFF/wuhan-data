<template>
	<view class="canvasView" :style="{height:nbHeight + 'px'}">
		<view class="echart-nav">
			<image src="../../static/icon/echarts/trend-upward.png"></image>
			<text>ECharts展示</text>
		</view>
		<mpvue-echarts :echarts="echarts" :onInit="onInit" :canvasId="canvasId" />
	</view>
</template>

<script>
	import * as echarts from '../echarts/echarts.min.js';
	import mpvueEcharts from '../mpvue-echarts/src/echarts.vue';

	export default {
		props: {
			nbOption: {
				type: Object
			},
			canvasId: {
				type: String,
				default: 'ec-canvas',
			},
			nbHeight: Number
		},
		components: {
			mpvueEcharts
		},
		data() {
			return {
				echarts: echarts,
			};
		},
		methods: {
			onInit(canvas, width, height) {
				let nbChart = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(nbChart)

				nbChart.setOption(this.nbOption)
				return nbChart
			}
		}
	}
</script>

<style>
	.canvasView {
		margin-top: 30upx;
		height: 1000upx;
		width: 750upx;
		background-color: #FFFFFF;
		flex: 1;
		flex-direction: column;
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
		margin: 20upx 20upx 20upx 20upx;
		font-size: 12px;
	}
</style>
