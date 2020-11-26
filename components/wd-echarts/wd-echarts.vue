<template>
	<view class="canvas-view" :style="{height:classHeight2+ 'px'}" :class="setClass">
		<view style="display: flex;justify-content: space-between;flex-direction: row;align-items: center;">
			<view class="echart-nav" style="display: flex;justify-content: flex-start;flex-direction: row">
				<image src="../../static/icon/echarts/trend-upward.png"></image>
				<text>{{classTitle}}</text>
			</view>
			<!-- <text class="lg text-black cuIcon-down" style="margin-right: 20upx;" @tap="downEcharts()"></text> -->
		</view>
		<!-- 特定栏目的多legend多选框__(测试) -->
		<view v-if="canvasId=='echart58'" class="cu-form-group margin-top">
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
					"硫酸_万吨", "硫酸_万吨去年同期", "烧碱_万吨", "烧碱_万吨去年同期", "纯碱_万吨", "纯碱_万吨去年同期", "化学纤维_万吨", "化学纤维_万吨去年同期", "纱_万吨", "纱_万吨去年同期",
					"布_亿米", "布_亿米去年同期", "水泥_万吨", "水泥_万吨去年同期", "平板玻璃_万重量箱", "平板玻璃_万重量箱去年同期", "汽车_万辆", "汽车_万辆去年同期", "载重汽车_万辆",
					"载重汽车_万辆去年同期", "轿车_万辆", "轿车_万辆去年同期", "生铁_万吨", "生铁_万吨去年同期", "粗钢_万吨", "粗钢_万吨去年同期", "成品钢材_万吨", "成品钢材_万吨去年同期",
					"十种有色金属_万吨", "十种有色金属_万吨去年同期", "饮料酒_万千升", "饮料酒_万千升去年同期", "卷烟_亿支", "卷烟_亿支去年同期", "农用氮、磷、钾化学肥料（折纯）_万吨",
					"农用氮、磷、钾化学肥料（折纯）_万吨去年同期", "化学农药原药（折有效成分100%）_万吨", "化学农药原药（折有效成分100%）_万吨去年同期", "房间空气调节器_万台", "房间空气调节器_万台去年同期",
					"工业机器人_套", "工业机器人_套去年同期", "新能源汽车_辆", "新能源汽车_辆去年同期", "光纤_万千米", "光纤_万千米去年同期", "光缆_万芯千米", "光缆_万芯千米去年同期",
					"锂离子电池_万只", "锂离子电池_万只去年同期", "太阳能电池（光伏电池）_万千瓦", "太阳能电池（光伏电池）_万千瓦去年同期", "微型计算机设备_万台", "微型计算机设备_万台去年同期",
					"移动通信手持机_万台", "移动通信手持机_万台去年同期"
				],

			};
		},
		computed: {
			classHeight2() {
				if (this.canvasId == 'echart58') {
					return '370';
				}
				return this.classHeight;
			},
			setClass() {
				if (this.canvasId == 'echart58') {
					return ['margin-bottom'];
				}
			}
		},
		watch: {},
		onReady() {

		},
		onLoad() {},
		mounted() {},
		methods: {
			PickerChange(e) {
				console.log(JSON.stringify(e));
				this.pickerIndex = e.detail.value;
				for (let i = 0; i < this.pickerArray.length; i++) {
					this.echartOption["legend"]["selected"][this.pickerArray[i]] = false;
				}
				this.echartOption["legend"]["selected"][this.pickerArray[this.pickerIndex]] = true;
				let unitname = this.pickerArray[this.pickerIndex];
				let newUnitname = unitname.replace('去年同期', '').split('_')[1];
				console.log(newUnitname);
				this.echartOption["yAxis"][0]["name"] = newUnitname;
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

	.margin-bottom {
		margin-bottom: 70px;
	}
</style>
