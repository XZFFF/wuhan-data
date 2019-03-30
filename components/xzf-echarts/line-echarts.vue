<template>
	<view class="canvasView">
		<view class="ti-nav">
			<image src="../../static/icon/echarts/profit-upward.png"></image>
			<text>折线图展示</text>
		</view>
		<mpvue-echarts :echarts="echarts" :onInit="lineInit" canvasId="line" ref="lineChart" />
	</view>
</template>

<script>
	import * as echarts from '../echarts/echarts.simple.min.js';
	import mpvueEcharts from '../mpvue-echarts/src/echarts.vue';

	export default {
		props: {
			lineOption: {
				type: Object
			}
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
			lineInit(canvas, width, height) {
				let lineChart = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(lineChart)

				lineChart.setOption(this.lineOption)
				return lineChart
			}
		}
	}
</script>

<style>
	.ti-main {
		display: flex;
		width: 100%;
		flex-direction: column;
	}

	.ti-nav {
		width: 100%;
		height: 90upx;
		background-color: #FFFFFF;
		border-bottom-color: #E7E7E7;
		border-bottom-style: solid;
		border-bottom-width: 3upx;
	}

	.ti-nav image {
		margin: 20upx 0upx 20upx 20upx;
		width: 50upx;
		height: 50upx;
	}

	.ti-nav text {
		margin: 20upx 20upx 20upx 20upx;
		font-size: 12px;
	}

	.canvasView {
		flex: 1;
		flex-direction: column;
	}
</style>
