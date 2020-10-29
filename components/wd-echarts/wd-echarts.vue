<template>
	<view class="canvas-view" :style="{height:classHeight+ 'px'}">
		<view style="display: flex;justify-content: space-between;flex-direction: row;align-items: center;">
			<view class="echart-nav" style="display: flex;justify-content: flex-start;flex-direction: row">
				<image src="../../static/icon/echarts/trend-upward.png"></image>
				<text>{{classTitle}}</text>
			</view>
			<!-- <text class="lg text-black cuIcon-down" style="margin-right: 20upx;" @tap="downEcharts()"></text> -->
		</view>
		<!-- 特定栏目的多legend多选框__(测试) -->
		<view class="cu-form-group margin-top" style="display: none;">
			<view class="title">选择指标</view>
			<picker @change="PickerChange" :value="pickerIndex" :range="pickerArray">
				<view class="picker">
					{{pickerIndex>-1?pickerArray[pickerIndex]:'暂未选择'}}
				</view>
			</picker>
		</view>
		<echarts-el :option="echartOption" class="ec-canvas" ref="echarts"></echarts-el>
	</view>
</template>

<script>
	import * as echarts from '@/components/echarts/echarts.min.js';
	import uniEcCanvas from "@/components/uni-ec-canvas/uni-ec-canvas";
	import mpvueEcharts from '@/components/mpvue-echarts/src/echarts.vue';
	import EchartsEl from '@/components/echarts-renderjs/echarts-el.vue';
	import EchartsRenderjs from '@/components/echarts-renderjs/echarts.vue'

	let wdChart = null;

	export default {
		components: {
			mpvueEcharts,
			uniEcCanvas,
			EchartsEl,
			EchartsRenderjs
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
				echarts: echarts,
				pickerIndex: -1,
				pickerArray: ["发电量_亿千瓦小时", "发电量_亿千瓦小时去年同期", "原油_万吨", "原油_万吨去年同期", "汽油_万吨", "汽油_万吨去年同期", "水电_亿千瓦时", "水电_亿千瓦时去年同期",
					"硫酸_万吨", "硫酸_万吨去年同期", "烧碱_万吨"
				],
			};
		},
		watch: {},
		onReady() {

		},
		onLoad() {

		},
		mounted() {},
		methods: {
			PickerChange(e) {
				this.pickerIndex = e.detail.value;
				this.echartOption["legend"]["selected"][this.pickerArray[this.pickerIndex]] = true;
			},
			/**
			 * 点击事件
			 * @param {Object} params
			 */
			echartsClick(params) {
				console.log('点击数据', params)
			},

		}
	}
</script>

<style>
	.canvas-view {
		/* flex: 1; */
		flex-direction: column;
		background-color: #FFFFFF;
		width: 100%;
		height: 400upx;
		margin-top: 30upx;
	}

	.echart-nav {
		display: flex;
		width: 100%;
		height: 90upx;
		background-color: #FFFFFF;
		border-bottom-color: #E7E7E7;
		border-bottom-style: solid;
		border-bottom-width: 3upx;
	}

	.echart-nav image {
		margin: auto 0upx auto 20upx;
		width: 50upx;
		height: 50upx;
	}

	.echart-nav text {
		margin: auto 20upx;
		font-size: 14px;
	}

	.ec-canvas {
		width: 100%;
		height: 88%;
		flex: 1;
		/* width: 100%;
		height: 100%;
		display: block; */
	}
</style>
