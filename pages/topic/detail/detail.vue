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
	import demoToic from "@/common/api/demoTopic.json";

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
				indexId: "1",
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
			uni.showLoading({
				title: "加载中",
			});
			this.showStorage();
			this.initTopicDetail();
			_self.initNav();
		},
		onUnload() {
			// 退出界面时重新初始化数据
			this.indexId = "1";
			this.indexName = "专题详情页";
			this.indexDetail = [];
			this.totalHeight = 1000;
			this.classTotalHeight = 400;
		},
		methods: {
			// 初始化数据，请求数据进行页面渲染
			initTopicDetail() {
				checkApi.checkNetwork();
				let dataApi;
				uni.request({
					url: 'http://192.168.124.20:8089/wuhan_data1/topic' + this.indexId,
					// url: this.apiUrl + 'topic' + _self.indexId,
					method: 'POST',
					data: {},
					success: (res) => {
						console.log("获取成功;" + JSON.stringify(res.data));
						dataApi = res.data;
						// dataApi = demoToic;
						let topic_detail_key = 'topic_detail' + this.indexId;
						uni.setStorage({
							key: topic_detail_key,
							data: dataApi
						});
					},
					fail: (e) => {
						console.log(e.errMsg);
						// dataApi = topicDetailApiJson;
					},
					complete: () => {
						try {
							// 检查json数据
							checkApi.isApi(dataApi);
							// 设置各部分数据
							_self.indexId = dataApi.data.baseInfo.indexId;
							_self.indexName = dataApi.data.baseInfo.indexName;
							_self.indexDetail = dataApi.data.classInfo;
							// 计算classHeight及总Height
							this.setHeight();
						} catch (e) {
							console.log("发生异常;" + JSON.stringify(e));
						}
						uni.hideLoading();
					}
				});
			},
			showStorage() {
				let dataApi;
				let topic_detail_key = 'topic_detail' + this.indexId;
				let topic_detail = uni.getStorageSync(topic_detail_key);
				if (topic_detail) {
					try {
						// console.log("缓存数据" + JSON.stringify(topic_detail));
						dataApi = topic_detail;
						// 检查json数据
						checkApi.isApi(dataApi);
						// 设置各部分数据
						_self.indexId = dataApi.data.baseInfo.indexId;
						_self.indexName = dataApi.data.baseInfo.indexName;
						_self.indexDetail = dataApi.data.classInfo;
						// 计算classHeight及总Height
						this.setHeight();
						uni.hideLoading();
					} catch (e) {
						console.log("缓存数据加载失败"+e.message);
					}
				}
			},
			// 渲染导航栏title
			initNav() {
				uni.setNavigationBarTitle({
					title: _self.indexName
				});
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
