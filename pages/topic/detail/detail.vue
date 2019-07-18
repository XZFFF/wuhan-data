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
		<wd-share :indexId="indexId" :indexName="indexName"></wd-share>
	</view>
</template>

<script>
	import uniCard from '@/components/uni-card/uni-card.vue';
	import wdEcharts from '@/components/wd-echarts/wd-echarts.vue';
	import wdTable from '@/components/wd-table/wd-table.vue';
	import wdShare from '@/components/wd-share/wd-share.vue';
	import wdCardText from '@/components/wd-card-text/wd-card-text.vue';
	import checkApi from '@/common/checkApi.js';
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
				indexId: "1000",
				indexName: "专题详情页",
				indexDetail: [],
				totalHeight: 1000,
				classTotalHeight: 400
			};
		},
		onLoad: function(e) {
			_self = this;
			if (JSON.stringify(e) != '{}') {
				this.indexId = e.indexId;
				this.indexName = e.indexName;
			}
			this.initNav();
			this.initTopicDetail();
			this.initNav();
		},
		onUnload() {
			// 退出界面时重新初始化数据
			this.indexId = "1000";
			this.indexName = "专题详情页";
			this.indexDetail = [];
			this.totalHeight = 1000;
			this.classTotalHeight = 400;
		},
		methods: {
			initTopicDetail() {
				checkApi.checkNetwork();
				let dataApi;
				uni.request({
					url: 'http://wuhandata.applinzi.com/analysisDetail.php',
					method: 'GET',
					data: {},
					success: res => {
						dataApi = topicDetailApiJson;
					},
					fail: (e) => {
						console.log(e.errMsg);
						dataApi = topicDetailApiJson;
					},
					complete: () => {
						// 检查json数据
						checkApi.isApi(dataApi);
						// 设置各部分数据
						_self.indexId = dataApi.data.baseInfo.indexId;
						_self.indexName = dataApi.data.baseInfo.indexName;
						_self.indexDetail = dataApi.data.classInfo;
						// 计算classHeight及总Height
						this.setHeight();
					}
				});
			},
			initNav() {
				// 渲染导航栏title
				uni.setNavigationBarTitle({
					title: this.indexName
				});
			},
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
