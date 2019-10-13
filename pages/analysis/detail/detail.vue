<template>
	<view class="container" :style="{height:totalHeight + 'px'}">
		<wd-time-picker @confirm="onConfirm" :timeCondition="timeCondition" hasArea='0'></wd-time-picker>
		<view class="class-block" :style="{height:classTotalHeight + 'px'}">
			<block v-for="(item, index) in indexDetail" :key="index">
				<wd-table v-if="item.classType === 'table'" :title="item.classTitle" :tableBody="item.tableBody"></wd-table>
				<wd-echarts v-if="item.classType === 'echarts'" :canvasId="'echart'+item.id" :echartOption="item.echartOption"
				 :classHeight="item.classHeight" :classTitle="item.classTitle"></wd-echarts>
			</block>
		</view>
		<wd-related-list :relatedData="relatedData"></wd-related-list>
		<wd-share-poster></wd-share-poster>
	</view>
</template>

<script>
	import wdTimePicker from '@/components/wd-time-picker/wd-time-picker.vue';
	import wdEcharts from '@/components/wd-echarts/wd-echarts.vue';
	import wdTable from '@/components/wd-table/wd-table.vue';
	import wdRelatedList from '@/components/wd-related-list/wd-related-list.vue';
	import wdSharePoster from '@/components/wd-sharePoster/wd-sharePoster.vue';
	import checkApi from '@/common/checkApi.js';
	import analysisDetailApiJson from "@/common/api/analysisDetail.json";
	import analysisConfirmApiJson from "@/common/api/analysisConfirm.json";

	var _self;
	export default {
		components: {
			wdTimePicker,
			wdEcharts,
			wdTable,
			wdRelatedList,
			wdSharePoster
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
				classTotalHeight: 400,
			};
		},
		onLoad: function(e) {
			_self = this;
			if (JSON.stringify(e) != '{}') {
				this.indexId = e.indexId;
				this.indexName = e.indexName;
				this.source = e.source;
			}
			checkApi.setFootprint("analysis", this.indexId, this.indexName, this.source);
			// 初始化页面数据
			uni.showLoading({
				title: "加载栏目:" + this.indexId,
			});
			this.showStorage(this.indexId);
			this.initAnalysisDetail(this.indexId);
			this.initNav();
		},
		onNavigationBarButtonTap(e) {
			switch (e.type) {
				case "favorite":
					if (this.isFavorite == false || this.isFavorite == "false") {
						if (checkApi.setCollect(this.type, this.indexId, this.indexName, this.source)) {
							this.isFavorite = true;
							favColor = "#f9da74";
						}
					} else if (this.isFavorite == true || this.isFavorite == "true") {
						if (checkApi.delCollect(this.type, this.indexId, this.indexName, this.source)) {
							this.isFavorite = false;
							favColor = "#ffffff";
						}
					} else {
						console.log("收藏状态异常" + this.isFavorite);
					}
					// 更新导航栏
					this.initNav();
					break;
				default:
					console.log(e.type);
			}
		},
		methods: {
			// 初始化数据，请求数据进行页面渲染
			initAnalysisDetail(indexId) {
				let token = uni.getStorageSync('token');
				checkApi.checkNetwork();
				let dataApi;
				uni.request({
					url: this.apiUrl + 'getAnalysisDetail',
					method: 'POST',
					data: {
						token: token,
						indexId: this.indexId,
					},
					success: (res) => {
						dataApi = res.data;
						console.log(JSON.stringify(dataApi));
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
							this.isFavorite = dataApi.data.baseInfo.isFavorite;
							this.timeCondition = dataApi.data.timeCondition;
							this.indexDetail = dataApi.data.classInfo;
							this.relatedData = dataApi.data.relatedData;
							// 计算classHeight及总Height
							this.setHeight();
							// 设置画布数据
							this.setDrawCanvas();
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
							checkApi.isApi(dataApi);
							_self.indexDetail = dataApi.data.classInfo;
							this.setHeight();
							this.setDrawCanvas();
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
			// 展示缓存数据
			showStorage(indexId) {
				let dataApi;
				let analysis_detail_key = 'analysis_detail' + indexId;
				let analysis_detail = uni.getStorageSync(analysis_detail_key);
				if (analysis_detail) {
					try {
						dataApi = analysis_detail;
						this.isFavorite = dataApi.data.baseInfo.isFavorite;
						this.source = dataApi.data.baseInfo.source;
						this.timeCondition = dataApi.data.timeCondition;
						this.indexDetail = dataApi.data.classInfo;
						this.relatedData = dataApi.data.relatedData;
						this.setHeight();
						uni.hideLoading();
					} catch (e) {
						console.log("缓存数据加载失败" + e.message);
					}
				}
			},
			// 渲染导航栏title及icon
			initNav() {
				console.log("收藏状态:" + this.isFavorite);
				let favColor = "#ffffff";
				// 渲染收藏icon
				if (this.isFavorite == false || this.isFavorite == "false") {
					this.isFavorite == false;
					favColor = "#ffffff";
				} else {
					this.isFavorite == true;
					favColor = "#e54d42"; // red-#e54d42 yellow-#f9da74
				}
				let pages = getCurrentPages();
				let page = pages[pages.length - 1];
				// #ifdef APP-PLUS
				let currentWebview = page.$getAppWebview();
				let titleObj = currentWebview.getStyle().titleNView;
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
				// #endif
			},
			// 根据服务端传入的数据计算classInfo需要的高度及界面需要的总高度
			setHeight() {
				let timeConditionHeight = 300;
				let classHeight = 0;
				let relatedHeight = 0;
				if (_self.indexDetail) {
					classHeight = checkApi.calClassInfoHeight(_self.indexDetail);
				}
				if (_self.relatedData) {
					relatedHeight = _self.relatedData.length == 0 ? 0 : (_self.relatedData.length + 1) * 70;
				}
				_self.classTotalHeight = classHeight;
				_self.totalHeight = timeConditionHeight + classHeight + relatedHeight;
			},
			// 设置画布数据
			setDrawCanvas() {
				try {
					var drawCanvas = _self.indexDetail;
					var drawArr = [];
					var canvasTitle = [];
					var canvasHeight = [];
					for (var i of drawCanvas) {
						if (i.classType === "echarts") {
							drawArr.push("echart" + i.id);
							canvasTitle.push(i.classTitle);
							canvasHeight.push(i.classHeight);
						}
					}
					console.log("drawArr:" + drawArr);
					uni.setStorageSync('drawTitle', _self.indexName);
					uni.setStorageSync('drawArr', drawArr);
					uni.setStorageSync('canvasTitle', canvasTitle);
					uni.setStorageSync('canvasHeight', canvasHeight);
				} catch (e) {
					uni.showToast({
						title: e.message
					});
				}
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
