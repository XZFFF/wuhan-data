<template>
	<view>
		<wd-table v-if="requestItem.classType === 'table'" :title="requestItem.classTitle" :tableBody="requestItem.tableBody"></wd-table>
		<wd-echarts v-if="requestItem.classType === 'echarts'" :title="requestItem.classTitle" :nbOption="requestItem.echartOption" :canvasId="itemId" :nbHeight="requestItem.classHeight"></wd-echarts>
	</view>
</template>

<script>
	import wdEcharts from '@/components/wd-echarts/wd-echarts.vue';
	import wdTable from '@/components/wd-table/wd-table.vue';

	export default {
		props: {
			requestItem: {
				type: Object
			}
		},
		components: {
			wdEcharts,
			wdTable
		},
		data() {
			let itemId = "echarts" + this.requestItem.id.toString();
			return {
				itemId: itemId
			};
		},
		onLoad() {},
		methods: {}
	}
</script>

<style>

</style>
