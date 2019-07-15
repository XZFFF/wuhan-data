<template>
	<view class="container" :style="{height:totalHeight + 'px'}">

		<view class="class-block" :style="{height:classTotalHeight + 'px'}">
			<block v-for="(item, index) in indexDetail" :key="index">
				<wd-card-text v-if="item.classType === 'card'" :title="item.classTitle" :cardText="item.cardText"></wd-card-text>
				<wd-table v-if="item.classType === 'table'" :title="item.classTitle" :tableBody="item.tableBody"></wd-table>
				<wd-echarts v-if="item.classType === 'echarts'" :canvasId="'echart'+item.id" :echartOption="item.echartOption"
				 :classHeight="item.classHeight" :classTitle="item.classTitle"></wd-echarts>
			</block>
		</view>
		<wd-share :indexId="topicId" :indexName="topicName"></wd-share>
	</view>
</template>

<script>
	import uniCard from '@/components/uni-card/uni-card.vue';
	import wdEcharts from '@/components/wd-echarts/wd-echarts.vue';
	import wdTable from '@/components/wd-table/wd-table.vue';
	import wdShare from '@/components/wd-share/wd-share.vue';
	import wdCardText from '@/components/wd-card-text/wd-card-text.vue';
	import {
		isApi
	} from '@/common/checkApi.js';
	import topicDetailApiJson from "@/common/api/topicDetail.json";

	var _self;
	export default {
		components: {
			uniCard,
			wdEcharts,
			wdTable,
			wdShare,
			wdCardText
		},
		data() {
			return {
				topicId: "1000",
				topicName: "专题详情页",
				topicDesc: "",
				indexDetail: [],
				totalHeight: 1000,
				classTotalHeight: 400
			};
		},
		onLoad: function(e) {
			_self = this;
			if (JSON.stringify(e) != '{}') {
				this.topicId = e.topicId;
				this.topicName = e.topicName;
				uni.setNavigationBarTitle({
					title: e.topicName
				})
			}
			this.initTopicDetail();
		},
		onUnload() {
			// 退出界面时重新初始化数据
			this.topicId = "1000";
			this.topicName = "专题详情页";
			this.topicDesc = "";
			this.indexDetail = [];
			this.totalHeight = 1000;
			this.classTotalHeight = 400;
		},
		methods: {
			initTopicDetail() {
				uni.request({
					url: 'http://wuhandata.applinzi.com/analysisDetail.php',
					method: 'GET',
					data: {},
					success: res => {
						let topicDetailApi = topicDetailApiJson;
						// 检查json数据
						isApi(topicDetailApi);
						// 设置各部分数据
						_self.topicId = topicDetailApi.data.topicInfo.topicId;
						_self.topicName = topicDetailApi.data.topicInfo.topicName;
						uni.setNavigationBarTitle({
							title: _self.topicName
						})
						_self.indexDetail = topicDetailApi.data.classInfo;
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
