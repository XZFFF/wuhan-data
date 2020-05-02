<template>
	<view class="canvas-view" :style="{height:classHeight + 'px'}">
		<view style="display: flex;justify-content: space-between;flex-direction: row;align-items: center;">
			<view class="echart-nav" style="display: flex;justify-content: flex-start;flex-direction: row">
				<image src="../../static/icon/echarts/trend-upward.png"></image>
				<text>{{classTitle}}</text>
			</view>
			<text class="lg text-black cuIcon-down" style="margin-right: 20upx;" @tap="downEcharts()"></text>
		</view>
		<mpvue-echarts :echarts="echarts" @onInit="onInit" :canvasId="canvasId" ref="echarts" />
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
				if (this.echartOption.legend.formatter != null) {
					this.echartOption.legend.formatter = function(name) {
						return name.length > 15 ? name.substr(0, 5) + "..." + name.substr(-10, 10) : name;
					};
					this.echartOption.tooltip.formatter = function(params) {
						var tips = "";
						if (params != null && params.length > 0) {
							for (var i = 0; i < params.length; i++) {
								// console.log(JSON.stringify(params));
								var name = params[i].seriesName.length > 15 ? params[i].seriesName.substr(0, 5) + "..." + params[i].seriesName
									.substr(
										-10, 10) : params[i].seriesName;
								tips += name + ":" + params[i].value + "\n";
							}
						}
						return tips;
					};
				}

				//console.log(this.$refs.echarts.chart);
				wdChart = this.$refs.echarts.chart;
				wdChart.setOption(this.echartOption);

				// setTimeout(() => {
				// 	console.log('调用save函数');
				// 	this.saveEcharts();
				// }, 2000);
			}
		},
		onLoad() {},
		mounted() {
			// setTimeout(() => {
			// 	console.log('调用save函数');
			// 	this.saveEcharts();
			// }, 2000);
			let that = this;
			var count = 0;
			var inervalId = setInterval(function() {
				count++;
				// if(count>=7) clearInterval(inervalId);
				//其它操作
				that.saveEcharts();
				// console.log("count:"+count);
			}, 1000);
		},
		methods: {
			// 2.2.2
			// onInit(canvas, width, height) {
			// 	wdChart = echarts.init(canvas, null, {
			// 		width: width,
			// 		height: height
			// 	})
			// 	canvas.setChart(wdChart)
			// 	wdChart.setOption(this.echartOption)
			// 	return wdChart
			// },

			onInit(e) {
				if (this.echartOption.hasOwnProperty('legend') &&
					this.echartOption.hasOwnProperty('tooltip')) {
					this.echartOption.legend.formatter = function(name) {
						return name.length > 15 ? name.substr(0, 5) + "..." + name.substr(-10, 10) : name;
					};
					this.echartOption.tooltip.formatter = function(params) {
						var tips = "";
						if (params != null && params.length > 0) {
							for (var i = 0; i < params.length; i++) {
								// console.log(JSON.stringify(params));
								var name = params[i].seriesName.length > 15 ? params[i].seriesName.substr(0, 5) + "..." + params[i].seriesName
									.substr(
										-10, 10) : params[i].seriesName;
								tips += name + ":" + params[i].value + "\n";
							}
						}
						return tips;
					};
				}
				// console.log(JSON.stringify(this.echartOption.legend.formatter));
				let {
					width,
					height
				} = e;
				let canvas = document.getElementById('echarts').canvas
				// let canvas = this.$refs.echarts.canvas;
				echarts.setCanvasCreator(() => canvas);
				wdChart = echarts.init(canvas, null, {
					width: width,
					height: height
				});
				canvas.setChart(wdChart);
				wdChart.setOption(this.echartOption);
				this.$refs.echarts.setChart(wdChart);
			},

			downEcharts() {
				let canvas = this.$refs.echarts.canvas;
				echarts.setCanvasCreator(() => canvas);
				this.$refs.echarts.canvasToTempFilePath({
					success: function(res) {
						uni.saveFile({
							tempFilePath: res.tempFilePath,
							success(res) {
								let url = res.savedFilePath;
								uni.saveImageToPhotosAlbum({
									filePath: url,
									success(res) {
										uni.showToast({
											title: '保存成功'
										});
									}
								})
							},
						})
					},
					fail: function(e) {
						console.log(JSON.stringify(e));
						uni.showToast({
							icon: 'none',
							title: "图表正在加载，请稍后再试"
						});
						return false;
					}
				});
			},

			saveEcharts() {
				// console.log('进入saveEcharts()');
				let that = this;
				let canvas = this.$refs.echarts.canvas;
				echarts.setCanvasCreator(() => canvas);
				this.$refs.echarts.canvasToTempFilePath({
					success: function(res) {
						// console.log("success");
						that.setEchart(res.tempFilePath);
					},
					fail: function(e) {
						console.log(JSON.stringify(e));
						uni.showToast({
							icon: 'none',
							title: "图表正在加载，请稍后再试"
						});
						return false;
					}
				});

			},

			setEchart(echartUrl) {
				let that = this;
				var echartArr = uni.getStorageSync('echartArr');
				var newEchartArr = [];
				var flag = 0;
				if (echartUrl) {
					var echartObj = {
						echartID: that.canvasId,
						echartUrl: echartUrl,
						echartTitle: that.classTitle,
						echartHeight: that.classHeight
					};
					if (!echartArr) {
						newEchartArr.push(echartObj);
						// console.log("newEchartArr:" + JSON.stringify(newEchartArr));
					} else {
						for (var i = 0; i < echartArr.length; i++) {
							// console.log("echartObj:"+JSON.stringify(echartObj));
							// console.log("echartArr:"+JSON.stringify(echartArr));
							if (echartObj.echartID === echartArr[i].echartID) {
								flag = 1;
								echartArr[i] = echartObj;
								// console.log("echartArr111:"+JSON.stringify(echartArr));
							}
						}
						if (flag === 0) {
							echartArr.push(echartObj);
						}
						newEchartArr = echartArr;
						// console.log("newEchartArr:" + JSON.stringify(newEchartArr));
					}
					uni.setStorageSync('echartArr', newEchartArr);
				}
			}
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
</style>
