<template>
	<view>
		<wd-table v-if="requestItem.type === 'table'" :tableBody="requestItem.tableBody"></wd-table>
		<wd-echarts v-if="requestItem.type === 'echarts'" :nbOption="requestItem.option" :canvasId="itemId" :nbHeight="requestItem.height"></wd-echarts>
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
