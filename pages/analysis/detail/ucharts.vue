<template>
	<view class="container" :style="{height:totalHeight + 'px'}">
		<block v-for="(item, index) in indexDetail" :key="index">
			<!-- <wd-table v-if="item.classType === 'table'" :title="item.classTitle" :tableBody="item.tableBody"></wd-table> -->
			<wd-ucharts v-if="item.classType === 'ucharts'" :canvasId="'uchart'+item.id" :uchartOption="item.uchartOption"
			 :chartType="item.chartType" :classHeight="item.classHeight" :classTitle="item.classTitle"></wd-ucharts>
		</block>
	</view>
</template>

<script>
	import wdUcharts from '@/components/wd-ucharts/wd-ucharts.vue';
	import wdTable from '@/components/wd-table/wd-table.vue';
	import uchartsData from "../../../common/ucharts.json";
	export default {
		components: {
			wdUcharts,
			wdTable
		},
		data() {
			return {
				indexDetail: {},
				totalHeight: 300
			};
		},
		onLoad: function(e) {
			this.initIndexDetail();
		},
		onShow: function() {

		},
		methods: {
			initIndexDetail() {
				let serverData = uchartsData;
				this.indexDetail = serverData.data.classInfo;
				this.totalHeight = serverData.data.classInfo.length * 300;
			}
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
		display: flex;
	}

	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
</style>
