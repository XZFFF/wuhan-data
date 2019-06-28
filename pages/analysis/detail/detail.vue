<template>
	<view class="container" :style="{height:totalHeight + 'px'}">
		<wd-time-picker @confirm="onConfirm" :timeCondition="timeCondition"></wd-time-picker>
		<view class="class-block" :style="{height:classTotalHeight + 'px'}">
			<block v-for="(item, index) in indexDetail" :key="index">
				<wd-table v-if="item.classType === 'table'" :title="item.classTitle" :tableBody="item.tableBody"></wd-table>
				<wd-echarts v-if="item.classType === 'echarts'" :canvasId="'echart'+item.id" :echartOption="item.echartOption"
				 :classHeight="item.classHeight" :classTitle="item.classTitle"></wd-echarts>
			</block>
		</view>
		<wd-related-list :relatedData="relatedData"></wd-related-list>
		<wd-share :indexId="indexId" :indexName="indexName"></wd-share>
	</view>
</template>

<script>
	import wdTimePicker from '@/components/wd-time-picker/wd-time-picker.vue';
	import wdEcharts from '@/components/wd-echarts/wd-echarts.vue';
	import wdTable from '@/components/wd-table/wd-table.vue';
	import wdRelatedList from '@/components/wd-related-list/wd-related-list.vue';
	import wdShare from '@/components/wd-share/wd-share.vue';

	import echartsData from "../../../common/echarts.json";

	export default {
		components: {
			wdTimePicker,
			wdEcharts,
			wdTable,
			wdRelatedList,
			wdShare
		},
		data() {
			return {
				timeCondition: [],
				indexDetail: {},
				relatedData: [],
				indexId: "1000",
				indexName: "指标详情页",
				totalHeight: 1000,
				classTotalHeight: 400

			};
		},
		onLoad: function(e) {
			if (JSON.stringify(e) != '{}') {
				this.indexId = e.indexId;
				this.indexName = e.indexName;
				uni.setNavigationBarTitle({
					title: e.indexName
				})
			}
		},
		onShow: function() {
			this.initIndexDetail();
			this.initRelatedData();
			this.initTimeCondition();
		},
		methods: {
			initTimeCondition() {
				this.timeCondition = echartsData.data.timeCondition;
			},
			initIndexDetail() {
				// uni.request({
				// 	url: 'http://wuhandata.applinzi.com/analysisDetail.php',
				// 	method: 'GET',
				// 	data: {},
				// 	success: res => {
				// 		this.indexDetail = res.data;
				// 	},
				// 	fail: (e) => {
				// 		console.log(e.errMsg);
				// 	},
				// 	complete: () => {}
				// });
				this.indexDetail = echartsData.data.classInfo;
				let classHeight = 0;
				for (let i = 0; i < echartsData.data.classInfo.length; i++) {
					let item = echartsData.data.classInfo[i];
					let h = 0;
					if (item.classType == 'table') {
						if (typeof item.classHeight === 'string') {
							h = parseInt(item.classHeight);
						} else {
							h = 500;
						}
					} else if (item.classType == 'echarts') {
						if (typeof item.classHeight === 'string') {
							h = parseInt(item.classHeight);
						} else {
							h = 400;
						}
					}
					classHeight += h;
				}
				this.classTotalHeight = classHeight;
				this.totalHeight = 200 + classHeight + (echartsData.data.relatedData.length + 1) * 40;
				console.log(this.classTotalHeight);
				console.log(this.totalHeight);
			},
			initRelatedData() {
				this.relatedData = echartsData.data.relatedData;
			},
			onConfirm(val) {
				console.log('发起更新数据请求');
				console.log(val);
				// http://1.wuhandata.applinzi.com/searchDetail.php
				uni.request({
					url: 'http://1.wuhandata.applinzi.com/searchDetail.php',
					method: 'GET',
					data: {},
					success: res => {
						this.indexDetail = res.data;
					},
					fail: (e) => {
						console.log(e.errMsg);
					},
					complete: () => {}
				});
				this.relatedData = [{
					indexId: '4',
					indexName: '金融机构贷款余额改变'
				}];
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
		flex: 1;
		width: 100%;
		flex-direction: column;
		box-sizing: border-box;
	}

	.class-block {
		display: flex;
		flex-direction: column;
		width: 100%;
	}


	.bottom-text {
		margin-top: 100upx;
		font-size: 25upx;
		text-align: center;
		color: #CDCDCD;
	}

	.active {
		position: absolute;
		margin-left: 35upx;
		margin-top: 5upx;
		width: 15upx;
		height: 15upx;
		background: red;
		border-radius: 50%;
	}

	.bottom-title {
		line-height: 60upx;
		font-size: 24upx;
		padding: 15upx 0;
	}

	.bottom-content {
		display: flex;
		flex-wrap: wrap;
		padding: 0 35upx;
	}

	.bottom-content-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 15upx;
		width: 25%;
		box-sizing: border-box;
	}

	.bottom-content-image {
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		border-radius: 10upx;
	}

	.bottom-content-text {
		font-size: 26upx;
		color: #333;
		margin-top: 10upx;
	}

	.bottom-btn {
		height: 90upx;
		line-height: 90upx;
	}
</style>
