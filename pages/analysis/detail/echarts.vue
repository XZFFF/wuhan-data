<template>
	<view class="container" :style="{height:totalHeight + 'px'}">
		<view class="class-block" :style="{height:classTotalHeight + 'px'}">
			<block v-for="(item, index) in indexDetail" :key="index">
				<wd-table v-if="item.classType === 'table'" :title="item.classTitle" :tableBody="item.tableBody"></wd-table>
				<wd-echarts v-if="item.classType === 'echarts'" :canvasId="'echart'+item.id" :echartOption="item.echartOption"
				 :classHeight="item.classHeight" :classTitle="item.classTitle"></wd-echarts>
			</block>
		</view>
		<view>这就是底部了</view>
	</view>
</template>

<script>
	// 引入文件
	import checkApi from '@/common/checkApi.js';
	import wdEcharts from '@/components/wd-echarts/wd-echarts.vue';
	import wdTable from '@/components/wd-table/wd-table.vue';
	import echartsData from "@/common/api/echarts.json";

	var _self;
	export default {
		components: {
			wdEcharts,
			wdTable
		},
		data() {
			return {
				indexDetail: {},
				classTotalHeight: 400,
				totalHeight: 400,
			};
		},
		onLoad: function(e) {
			_self = this;
			console.log('onLoad')
			this.initIndexDetail();
		},
		onShow: function() {

		},
		methods: {

			initIndexDetail() {
				let serverData = echartsData;
				this.indexDetail = serverData.data.classInfo;
				this.setHeight();
				//this.totalHeight = serverData.data.classInfo.length * 400;
			},
			// 根据服务端传入的数据计算classInfo需要的高度及界面需要的总高度
			setHeight() {
				let classHeight = 0;
				if (_self.indexDetail) {
					classHeight = checkApi.calClassInfoHeight(_self.indexDetail);
				}
				_self.classTotalHeight = classHeight;
				_self.totalHeight = classHeight;
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
		/* display: flex; */
	}

	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.class-block {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
</style>
