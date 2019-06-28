<template>
	<view class="canvas-view" :style="{height:classHeight + 'px'}">
		<view class="echart-nav">
			<image src="../../../static/icon/echarts/trend-upward.png"></image>
			<text>{{classTitle}}</text>
		</view>
		<u-charts :canvas-id="canvasId" :chartType="chartType" :opts="uchartOption"></u-charts>
		<!-- <mpvue-echarts :echarts="echarts" :onInit="onInit" :canvasId="canvasId" ref="echarts" /> -->
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/component.vue';

	export default {
		components: {
			uCharts
		},
		props: {
			uchartOption: {
				type: Object
			},
			chartType: {
				type: String
			},
			canvasId: {
				type: String,
				default: 'uc-canvas',
			},
			classHeight: {
				type: String,
				default: "300",
			},
			classTitle: {
				type: String,
				default: 'uCharts图例',
			},
		},
		data() {
			return {};
		},
		onLoad() {
			console.log(this.classHeight);
		},
		methods: {}
	}
</script>

<style>
	.canvas-view {
		display: flex;
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
