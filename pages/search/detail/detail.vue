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
	import wdShare from '@/components/wd-share/wd-share.vue'

	import searchDetailApiJson from "@/common/api/searchDetail.json";

	var _self;

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
				indexId: "1000",
				indexName: "指标详情页",
				timeCondition: [],
				indexDetail: [],
				relatedData: [],
				totalHeight: 1000,
				classTotalHeight: 400,
			};
		},
		onLoad: function(e) {
			_self = this;
			if (JSON.stringify(e) != '{}') {
				console.log(e);
				this.indexId = e.indexId;
				this.indexName = e.indexName;
				uni.setNavigationBarTitle({
					title: e.indexName
				})
			}
			this.initSearchDetail();
		},
		onUnload() {
			// 退出界面时重新初始化数据
			this.indexId = "1000";
			this.indexName = "指标详情页";
			this.timeCondition = [];
			this.indexDetail = [];
			this.relatedData = [];
			this.totalHeight = 1000;
			this.classTotalHeight = 400;
		},
		methods: {
			initSearchDetail() {
				this.checkNetwork();
				uni.request({
					url: 'http://wuhandata.applinzi.com/searchDetail.php',
					method: 'GET',
					data: {},
					success: res => {
						let searchDetailApi = searchDetailApiJson;
						// 检查json数据
						if (searchDetailApi.errCode != 0 || searchDetailApi.errCode != '0') {
							// TODO 记录到服务端日志表中
							uni.showToast({
								icon: 'none',
								title: searchDetailApi.errMsg,
								duration: 500
							})
						}
						// 设置各部分数据
						_self.timeCondition = searchDetailApi.data.timeCondition;
						console.log(searchDetailApi.data.timeCondition);
						_self.indexDetail = searchDetailApi.data.classInfo;
						_self.relatedData = searchDetailApi.data.relatedData;
						// 计算classHeight及总Height
						this.setHeight();
					},
					fail: (e) => {
						console.log(e.errMsg);
					},
					complete: () => {}
				});
			},
			onConfirm(val) {
				this.checkNetwork();
				console.log('发起更新数据请求' + val);
				uni.request({
					url: 'http://1.wuhandata.applinzi.com/searchDetail.php',
					method: 'GET',
					data: {},
					success: res => {
						let searchDetailApi = searchDetailApiJson;
						// 检查json数据
						if (searchDetailApi.errCode != 0 || searchDetailApi.errCode != '0') {
							// TODO 记录到服务端日志表中
							uni.showToast({
								icon: 'none',
								title: searchDetailApi.errMsg,
								duration: 500
							})
						}
						// 更新图例数据
						_self.indexDetail = searchDetailApi.data.classInfoNew;
						// 计算classHeight及总Height
						this.setHeight();
					},
					fail: (e) => {
						console.log(e.errMsg);
					},
					complete: () => {}
				});
			},
			checkNetwork() {
				uni.getNetworkType({
					success: function(res) {
						if (res.networkType == 'none') {
							uni.showToast({
								title: '无网络连接',
								duration: 1000,
								icon: 'loading'
							});
						}
					}
				});
			},
			setHeight() {
				let classHeight = 0;
				let classInfo = _self.indexDetail;
				let relatedInfo = _self.relatedData;
				for (let i = 0; i < classInfo.length; i++) {
					let item = classInfo[i];
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
				_self.classTotalHeight = classHeight;
				_self.totalHeight = 200 + classHeight + (relatedInfo.length + 1) * 40;
			}
		},
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
</style>
