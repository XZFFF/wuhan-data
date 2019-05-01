<template>
	<view class="echarts-wrap">
		<mpvue-echarts :echarts="echarts" :onInit="onInit" canvasId="demo-canvas" />
	</view>
</template>

<script>
	import * as echarts from '@/components/echarts/echarts.min.js';
	import mpvueEcharts from '@/components/mpvue-echarts/src/echarts.vue';
	
	let requestTestData = [{
		"id": "1",
		"type": "echarts",
		"height": "300",
		"option": {
			"grid": {
				"containLabel": true
			},
			"xAxis": {
				"type": "category",
				"data": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
			},
			"yAxis": {
				"type": "value"
			},
			"series": [{
				"type": "line",
				"data": [820, 932, 901, 934, 1290, 1330, 1920]
			}]
		}
	}];
	export default {
		components: {
			mpvueEcharts
		},
		data() {
			return {
				nbOption: {},
				indexDetail: [],
				echarts: echarts
			}
		},
		onShow: function() {
			this.initIndexDetail();
		},
		methods: {
			onInit(canvas, width, height) {
				console.log(Boolean(this.nbOption));
				let nbChart = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(nbChart)

				nbChart.setOption(this.nbOption)
				return nbChart
			},
			initIndexDetail() {
				uni.request({
					url: 'http://wuhandata.applinzi.com/analysisDetail.php',
					method: 'GET',
					data: {},
					success: res => {
						this.indexDetail = res.data;
						console.log(this.indexDetail);
					},
					fail: (e) => {
						this.indexDetail = requestTestData;
						console.log(e.errMsg);
					},
					complete: () => {
						this.nbOption = this.indexDetail[0].option;
						console.log(this.nbOption);
					}
				});
			}
		}
	}
</script>

<style>
	.echarts-wrap {
		width: 100%;
		height: 300px;
	}
</style>
