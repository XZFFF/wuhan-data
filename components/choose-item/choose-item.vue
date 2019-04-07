<template>
	<view>
		<table-item v-if="requestItem.type === 'table'" :tableBody="requestItem.tableBody"></table-item>
		<nb-echarts v-if="requestItem.type === 'echarts'" :nbOption="requestItem.option" :canvasId="itemId" :nbHeight="requestItem.height"></nb-echarts>
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
