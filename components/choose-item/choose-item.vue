<template>
	<view>
		<!-- <view style="height: 20px; width: 20px;"></view> -->
		<table-item v-if="requestItem.type === 'table'" :tableBody="requestItem.tableBody"></table-item>
		<nb-echarts v-if="requestItem.type === 'echarts'" :nbOption="demoOption" :canvasId="requestItem.id" nbHeight="300"></nb-echarts>
	</view>
</template>

<script>
	import nbEcharts from '../../components/xzf-echarts/nb-echarts.vue';
	import tableItem from '../../components/table-item/table-item.vue';

	export default {
		props: {
			requestItem: {
				type: Object
			}
		},
		components: {
			tableItem,
			nbEcharts
		},
		data() {
			let demoOption = {
				grid: {
					containLabel: true
				},
				xAxis: {
					type: 'category',
					data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
				},
				yAxis: {
					type: 'value'
				},
				series: [{
					data: [820, 932, 901, 934, 1290, 1330, 1320],
					type: 'line'
				}]
			};
			return {
				demoOption: demoOption
			};
		},
		onLoad() {
			console.log(this.demoOption);
		},
		methods: {

		}
	}
</script>

<style>

</style>
