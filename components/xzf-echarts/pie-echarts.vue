<template>
	<view class="canvasView">
		<view class="ti-nav">
			<image src="../../static/icon/echarts/pie.png"></image>
			<text>饼图展示</text>
		</view>
		<mpvue-echarts :echarts="echarts" :onInit="pieInit" canvasId="pie" ref="pieChart" />
	</view>
</template>

<script>
	import * as echarts from '../echarts/echarts.min.js';
	import mpvueEcharts from '../mpvue-echarts/src/echarts.vue';

	export default {
		props: {
			pieOption: {
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
			pieInit(canvas, width, height) {
				let pieChart = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(pieChart)

				pieChart.setOption(this.pieOption)
				return pieChart
			}
		}
	}
</script>

<style>
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
		/* flex: 1; */
		flex-direction: column;
	}
</style>
