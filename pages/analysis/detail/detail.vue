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
		<wd-share :indexId="indexId" :indexName="indexName" :isFavorite="isFavorite"></wd-share>
	</view>
</template>

<script>
	import wdTimePicker from '@/components/wd-time-picker/wd-time-picker.vue';
	import wdEcharts from '@/components/wd-echarts/wd-echarts.vue';
	import wdTable from '@/components/wd-table/wd-table.vue';
	import wdRelatedList from '@/components/wd-related-list/wd-related-list.vue';
	import wdShare from '@/components/wd-share/wd-share.vue';
	import checkApi from '@/common/checkApi.js';
	//import analysisDetailApiJson from "@/common/api/analysisDetail.json";
	import analysisConfirmApiJson from "@/common/api/analysisConfirm.json";

	//import analysisDetailApiJson from "@/common/api/anaDemo.json";
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
				isFavorite: false,
				timeCondition: [],
				indexDetail: [],
				relatedData: [],
				totalHeight: 1000,
				classTotalHeight: 400
			};
		},
		onLoad: function(e) {
			_self = this;
			if (JSON.stringify(e) != '{}') {
				_self.indexId = e.indexId;
				_self.indexName = e.indexName;
				_self.isFavorite = e.isFavorite;
			}
			console.log("进入经济分析栏目详情页;" + JSON.stringify(e));
			this.initNav();
			// 初始化页面数据
			this.initAnalysisDetail();
			this.initNav();
		},
		onUnload() {
			// 退出界面时重新初始化数据
			this.indexId = "1000";
			this.indexName = "指标详情页";
			this.isFavorite = false;
			this.timeCondition = [];
			this.indexDetail = [];
			this.relatedData = [];
			this.totalHeight = 1000;
			this.classTotalHeight = 400;
			this.initFavColor("ffffff");
		},
		methods: {
			// 初始化数据，请求数据进行页面渲染
			initAnalysisDetail() {
				checkApi.checkNetwork();
				let dataApi;
				uni.showLoading({
					title: "加载栏目:" + this.indexId,
				});
				uni.request({
					url: this.apiUrl + 'getAnalysisDetail',
					method: 'POST',
					data: {
						indexId: this.indexId,
					},
					success: (res) => {
						console.log("获取成功;" + JSON.stringify(res.data));
						dataApi = res.data;
					},
					fail: (e) => {
						console.log("获取失败;" + JSON.stringify(e));
						dataApi = analysisDetailApiJson;
					},
					complete: () => {
						// 检查json数据
						checkApi.isApi(dataApi);
						// 设置各部分数据
						try {
							//_self.indexId = dataApi.data.baseInfo.indexId;
							//_self.indexName = dataApi.data.baseInfo.indexName;
							//_self.isFavorite = dataApi.data.baseInfo.isFavorite;
							_self.timeCondition = dataApi.data.timeCondition;
							_self.indexDetail = dataApi.data.classInfo;
							_self.relatedData = dataApi.data.relatedData;
							// 计算classHeight及总Height
							this.setHeight();
						} catch (e) {
							console.log("发生异常;" + JSON.stringify(e));
						}
						uni.hideLoading();
					}
				});
			},
			// 点击确认按钮,根据筛选条件请求数据进行图例更新
			onConfirm(val) {
				checkApi.checkNetwork();
				let dataApi;
				uni.showLoading({
					title: "正在加载 栏目ID:" + this.indexId,
				});
				let requestData = {
					"indexId": _self.indexId,
					"startTime": val.startTime,
					"endTime": val.endTime,
					"freqName": val.timeFreq
				};
				console.log(JSON.stringify(requestData));
				uni.request({
					url: 'http://localhost:8080/wuhan_data1/getAnalysisDetailByTime',
					method: 'POST',
					data: requestData,
					success: (res) => {
						console.log("获取成功;" + JSON.stringify(res.data));
						try {
							dataApi = res.data;
							// 检查json数据
							checkApi.isApi(dataApi);
							// 设置各部分数据
							_self.indexDetail = dataApi.data.classInfo;
							// 计算classHeight及总Height
							this.setHeight();
						} catch (e) {
							console.log("发生异常;" + JSON.stringify(e));
						}
					},
					fail: (e) => {
						console.log("获取失败;" + JSON.stringify(e));
					},
					complete: () => {
						uni.hideLoading();
					}
				});
			},
			// 渲染导航栏title及icon
			initNav() {
				// 渲染导航栏title
				uni.setNavigationBarTitle({
					title: this.indexName
				});
				// 渲染收藏icon
				if (this.isFavorite == false || this.isFavorite == "false") {
					this.isFavorite == false;
					this.initFavColor("#ffffff");
				} else {
					this.isFavorite == true;
					this.initFavColor("#f9da74");
				}
			},
			// 根据参数初始化导航栏中按钮的颜色
			initFavColor(initColor) {
				// 更新导航栏收藏按钮颜色
				let pages = getCurrentPages();
				let page = pages[pages.length - 1];
				// #ifdef APP-PLUS
				let currentWebview = page.$getAppWebview();
				let titleObj = currentWebview.getStyle().titleNView;
				if (!titleObj.buttons) {
					return;
				}
				titleObj.buttons[1].color = initColor;
				currentWebview.setStyle({
					titleNView: titleObj
				});
				// #endif
			},
			// 根据服务端传入的数据计算classInfo需要的高度及界面需要的总高度
			setHeight() {
				let timeConditionHeight = 200;
				let classHeight = 0;
				let relatedHeight = 0;
				if (_self.indexDetail) {
					classHeight = checkApi.calClassInfoHeight(_self.indexDetail);
				}
				if (_self.relatedData) {
					relatedHeight = _self.relatedData.length == 0 ? 0 : (_self.relatedData.length + 1) * 40;
				}
				_self.classTotalHeight = classHeight;
				_self.totalHeight = timeConditionHeight + classHeight + relatedHeight;
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
