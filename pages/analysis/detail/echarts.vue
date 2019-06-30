<template>
	<view class="container" :style="{height:totalHeight + 'px'}">
		<block v-for="(item, index) in indexDetail" :key="index">
			<wd-table v-if="item.classType === 'table'" :title="item.classTitle" :tableBody="item.tableBody"></wd-table>
			<wd-echarts v-if="item.classType === 'echarts'" :canvasId="'echart'+item.id" :echartOption="item.echartOption"
			 :classHeight="item.classHeight" :classTitle="item.classTitle"></wd-echarts>
		</block>
	</view>
</template>

<script>
	import wdEcharts from '@/components/wd-echarts/wd-echarts.vue';
	import wdTable from '@/components/wd-table/wd-table.vue';
	import echartsData from "@/common/api/echarts.json";
	export default {
		components: {
			wdEcharts,
			wdTable
		},
		data() {
			return {
				indexDetail: {},
				totalHeight: 400
			};
		},
		onLoad: function(e) {
			this.initIndexDetail();
		},
		onShow: function() {

		},
		methods: {
			initIndexDetail() {
				let serverData = echartsData;
				this.indexDetail = serverData.data.classInfo;
				this.totalHeight = serverData.data.classInfo.length * 400;
			},
		}
	}
</script>

<style>
	page {
		display: flex;
		background: #f4f5f6;
		width: 750upx;
		overflow-x: hidden;
	}

	view {
		/* 设置flex会导致classHeight无效，但不设置会导致classTitle错位 */
		display: flex;
	}

	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
</style>
