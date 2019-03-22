<template>
	<div class="echarts-wrap">
		<mpvue-echarts :echarts="echarts" :onInit="onInit" canvasId="demo-canvas" />
	</div>
</template>

<script>
	import * as echarts from '../../components/echarts/echarts.min.js';
	import mpvueEcharts from '../../components/mpvue-echarts/src/echarts.vue';


	let chart = null;

	function initChart(canvas, width, height) {
		chart = echarts.init(canvas, null, {
			width: width,
			height: height
		});
		canvas.setChart(chart);

		var option = {
    tooltip : {
        formatter: "{a} <br/>{b} : {c}%"
    },
    toolbox: {
        feature: {
            restore: {},
            saveAsImage: {}
        }
    },
    series: [
        {
            name: '业务指标',
            type: 'gauge',
            detail: {formatter:'12%'},
            data: [{value: 50, name: '完成率'}]
        }
    ]
};
		chart.setOption(option);

		return chart; // 返回 chart 后可以自动绑定触摸操作
	}

	export default {
		components: {
			mpvueEcharts
		},
		data() {
			return {
				echarts,
				onInit: initChart
			}
		}
	}
</script>

<style scoped>
	.echarts-wrap {
		width: 100%;
		height: 300px;
	}
</style>
