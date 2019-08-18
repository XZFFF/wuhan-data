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
		<wd-share type="analysis" :indexId="indexId" :indexName="indexName" :isFavorite="isFavorite" :source="source"></wd-share>
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
				source: "未知来源",
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
				console.log("初始化数据" + e.indexId)
				this.indexId = e.indexId;
				this.indexName = e.indexName;
				this.source = e.source;
				this.isFavorite = e.isFavorite;
			}
			this.initNav();
			console.log("onload 进入经济分析栏目详情页;" + JSON.stringify(e));
			checkApi.setFootprint("analysis", this.indexId, this.indexName, this.source);
			// 初始化页面数据
			uni.showLoading({
				title: "加载栏目:" + this.indexId,
			});
			this.showStorage(this.indexId);
			console.log("0请求的indexId=" + this.indexId);
			this.initAnalysisDetail(this.indexId);
		},
		methods: {
			// 初始化数据，请求数据进行页面渲染
			initAnalysisDetail(indexId) {
				let token = uni.getStorageSync('token');
				checkApi.checkNetwork();
				let dataApi;
				let timestamp = Date.parse(new Date());
				console.log("1请求的indexId" + indexId);
				console.log("2请求的indexId=" + this.indexId);
				uni.request({
					url: this.apiUrl + 'getAnalysisDetail',
					method: 'POST',
					data: {
						token: token,
						indexId: this.indexId,
					},
					success: (res) => {
						console.log("获取成功;" + JSON.stringify(res.data));
						let timestamp2 = Date.parse(new Date());
						// uni.showToast({
						// 	title: "请求时间:" + (timestamp2 - timestamp)
						// });
						dataApi = res.data;
						let analysis_detail_key = 'analysis_detail' + this.indexId;
						uni.setStorageSync(analysis_detail_key, dataApi);
					},
					fail: (e) => {
						console.log("获取失败;" + JSON.stringify(e));
					},
					complete: () => {
						// 检查json数据
						checkApi.isApi(dataApi);
						// 设置各部分数据
						try {
							this.indexId = dataApi.data.baseInfo.indexId;
							this.indexName = dataApi.data.baseInfo.indexName;
							this.isFavorite = dataApi.data.baseInfo.isFavorite;
							this.source = dataApi.data.baseInfo.source;
							this.timeCondition = dataApi.data.timeCondition;
							this.indexDetail = dataApi.data.classInfo;
							this.relatedData = dataApi.data.relatedData;
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
				uni.showLoading({
					title: "数据加载中...",
				});
				checkApi.checkNetwork();
				let dataApi;
				uni.showLoading({
					title: "加载栏目:" + this.indexId,
				});
				let requestData = {
					"indexId": _self.indexId,
					"timeFreq": val.timeFreq,
					"startTime": val.startTime,
					"endTime": val.endTime
				};
				console.log(JSON.stringify(requestData));
				uni.request({
					url: this.apiUrl + 'getAnalysisDetailByTime',
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
			showStorage(indexId) {
				let dataApi;
				let analysis_detail_key = 'analysis_detail' + indexId;
				let analysis_detail = uni.getStorageSync(analysis_detail_key);
				if (analysis_detail) {
					try {
						dataApi = analysis_detail;
						this.indexName = dataApi.data.baseInfo.indexName;
						this.isFavorite = dataApi.data.baseInfo.isFavorite;
						this.source = dataApi.data.baseInfo.source;
						this.timeCondition = dataApi.data.timeCondition;
						this.indexDetail = dataApi.data.classInfo;
						this.relatedData = dataApi.data.relatedData;
						// 计算classHeight及总Height
						this.setHeight();
						uni.hideLoading();
					} catch (e) {
						console.log("缓存数据加载失败" + e.message);
					}
				}
			},
			// 渲染导航栏title及icon
			initNav() {
				let favColor = "#ffffff";
				// 渲染收藏icon
				if (this.isFavorite == false || this.isFavorite == "false") {
					this.isFavorite == false;
					favColor = "#ffffff";
				} else {
					this.isFavorite == true;
					favColor = "#f9da74";
				}
				let pages = getCurrentPages();
				let page = pages[pages.length - 1];
				// #ifdef APP-PLUS
				let currentWebview = page.$getAppWebview();
				let titleObj = currentWebview.getStyle().titleNView;
				console.log(this.indexName);
				try {
					if (!titleObj.titleText) {
						return;
					}
					if (!titleObj.buttons) {
						return;
					}
					titleObj.titleText = this.indexName;
					titleObj.buttons[1].color = favColor;
					currentWebview.setStyle({
						navigationBarTitleText: this.indexName,
						titleNView: titleObj
					});
				} catch (e) {
					console.log(JSON.stringify(e));
				}
				console.log(JSON.stringify(currentWebview));
				// #endif
			},
			initNavTitle() {
				// 更新导航栏收藏按钮颜色
				let pages = getCurrentPages();
				let page = pages[pages.length - 1];
				// #ifdef APP-PLUS
				let currentWebview = page.$getAppWebview();
				let titleObj = currentWebview.getStyle().titleNView;
				try {
					if (!titleObj.titleText) {
						return;
					}
					titleObj.titleText = this.indexName;
					currentWebview.setStyle({

						titleNView: titleObj
					});
				} catch (e) {
					console.log(JSON.stringify(e));
				}
				// #endif
			},
			// 根据参数初始化导航栏中按钮的颜色
			initFavColor(initColor) {
				// 更新导航栏收藏按钮颜色
				let pages = getCurrentPages();
				let page = pages[pages.length - 1];
				// #ifdef APP-PLUS
				let currentWebview = page.$getAppWebview();
				let titleObj = currentWebview.getStyle().titleNView;
				try {
					if (!titleObj.buttons) {
						return;
					}
					titleObj.buttons[1].color = initColor;
					currentWebview.setStyle({
						titleNView: titleObj
					});
				} catch (e) {
					console.log(JSON.stringify(e));
				}
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
