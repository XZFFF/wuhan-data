<template>
	<view class="container" :style="{height:totalHeight + 'px'}">
		<view style="margin: 10upx 20upx;">综合-同步-PMI指数-采购经理版块-全省采购经理指数</view>
		<wd-area-picker v-if="isArea=='1' || isArea==1" @confirm="onConfirm" :timeCondition="timeCondition"></wd-area-picker>
		<wd-time-picker v-else @confirm="onConfirm" :timeCondition="timeCondition"></wd-time-picker>
		<wdSharePoster></wdSharePoster>
		<view class="class-block" :style="{height:classTotalHeight + 'px'}">
			<block v-for="(item, index) in indexDetail" :key="index">
				<wd-table v-if="item.classType === 'table'" :title="item.classTitle" :tableBody="item.tableBody"></wd-table>
				<wd-echarts v-if="item.classType === 'echarts'" :canvasId="'echart'+item.id" :echartOption="item.echartOption"
				 :classHeight="item.classHeight" :classTitle="item.classTitle"></wd-echarts>
			</block>
		</view>
		<wd-related-list :relatedData="relatedData"></wd-related-list>
		<wd-share type="search" :indexId="indexId" :indexName="indexName" :isFavorite="isFavorite" :source="source"></wd-share>
		
	</view>
</template>

<script>
	import wdTimePicker from '@/components/wd-time-picker/wd-time-picker.vue';
	import wdAreaPicker from '@/components/wd-time-picker/wd-area-picker.vue';
	import wdEcharts from '@/components/wd-echarts/wd-echarts.vue';
	import wdTable from '@/components/wd-table/wd-table.vue';
	import wdRelatedList from '@/components/wd-related-list/wd-related-list.vue';
	import wdShare from '@/components/wd-share/wd-share.vue';
	import wdSharePoster from '@/components/wd-sharePoster/wd-sharePoster.vue';
	import checkApi from '@/common/checkApi.js';
	import searchDetailApiJson from "@/common/api/searchDetail.json";
	import searchConfirmApiJson from "@/common/api/searchConfirm.json";

	var _self;

	export default {
		components: {
			wdTimePicker,
			wdAreaPicker,
			wdEcharts,
			wdTable,
			wdRelatedList,
			wdShare,
			wdSharePoster
		},
		data() {
			return {
				indexId: "1000",
				indexName: "指标详情页",
				source: "",
				isFavorite: false,
				isArea: 1,
				timeCondition: [],
				indexDetail: [],
				relatedData: [],
				totalHeight: 1000,
				classTotalHeight: 400,
			};
		},
		onLoad: function(e) {
			_self = this;
			console.log("进入页面;" + JSON.stringify(e));
			if (JSON.stringify(e) != '{}') {
				_self.indexId = e.indexId;
				_self.indexName = e.indexName;
				_self.isFavorite = e.isFavorite;
				_self.source = e.source;
				_self.isArea = e.isArea;
			}
			console.log("收藏状态：" + this.isFavorite);
			// 初始化页面数据
			uni.showLoading({
				title: "加载栏目:" + _self.indexId,
			});
			checkApi.setFootprint("search", this.indexId, this.indexName, this.source);
			// this.showStorage();
			this.initSearchDetail();
			this.initNav();
		},
		methods: {
			initSearchDetail() {
				let token = uni.getStorageSync('token');
				checkApi.checkNetwork();
				let dataApi;
				console.log("token:" + token + "indexId:" + this.indexId + "source:" + this.source)
				uni.request({
					// url: this.apiUrl + 'searchDetail',
					url: "https://www.baidu.com",
					method: 'POST',
					data: {
						token: token,
						indexId: this.indexId,
						source: this.source,
						isArea: this.isArea
					},
					success: res => {
						console.log(JSON.stringify(res.data));
						dataApi = res.data;
						let search_detail_key = 'search_detail' + _self.indexId;
						uni.setStorageSync(search_detail_key, dataApi);
					},
					fail: (e) => {
						console.log("获取失败;" + JSON.stringify(e));
					},
					complete: () => {
						dataApi = searchDetailApiJson;
						// 检查json数据
						checkApi.isApi(dataApi);
						// 设置各部分数据
						try {
							_self.indexId = dataApi.data.baseInfo.indexId;
							_self.indexName = dataApi.data.baseInfo.indexName;
							_self.isFavorite = dataApi.data.baseInfo.isFavorite;
							_self.timeCondition = dataApi.data.timeCondition;
							_self.indexDetail = dataApi.data.classInfo;
							_self.relatedData = dataApi.data.relatedData;
							var drawCanvas = _self.indexDetail;
							var drawArr = [];
							var canvasTitle = [];
							var canvasHeight = [];
							for (var i of drawCanvas) {
								if (i.classType === "echarts") {
									drawArr.push("echart"+i.id);
									canvasTitle.push(i.classTitle);
									canvasHeight.push(i.classHeight);
								}
							}
							console.log("drawArr:"+drawArr);
							uni.setStorageSync('drawArr',drawArr);
							uni.setStorageSync('canvasTitle',canvasTitle);
							uni.setStorageSync('canvasHeight',canvasHeight);
							// 计算classHeight及总Height
							this.setHeight();
							// this.isFavorite = true;
							this.initNav();
						} catch (e) {
							console.log("发生异常;" + JSON.stringify(e));
						}
						uni.hideLoading();
					}
				});
			},
			onConfirm(val) {
				uni.showLoading({
					title: "数据加载中...",
				});
				checkApi.checkNetwork();
				uni.request({
					url: this.apiUrl + 'searchConfirm',
					method: 'POST',
					data: {
						indexId: _self.indexId,
						source: _self.source,
						isArea: _self.isArea,
						timeFreq: val.timeFreq,
						startTime: val.startTime,
						endTime: val.endTime,
					},
					success: (res) => {
						console.log("获取成功;" + JSON.stringify(res.data));
						try {
							let dataApi = res.data;
							// 检查json数据
							checkApi.isApi(dataApi);
							// 更新图例数据
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
			showStorage() {
				let dataApi;
				let search_detail_key = 'search_detail' + _self.indexId;
				let search_detail = uni.getStorageSync(search_detail_key);
				if (search_detail) {
					try {
						dataApi = search_detail;
						_self.source = dataApi.data.baseInfo.source;
						_self.timeCondition = dataApi.data.timeCondition;
						_self.indexDetail = dataApi.data.classInfo;
						_self.relatedData = dataApi.data.relatedData;
						// 计算classHeight及总Height
						this.setHeight();
						uni.hideLoading();
					} catch (e) {
						console.log("缓存数据加载失败" + e.message);
					}
				}
			},
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
				console.log("设置收藏按钮颜色：" + favColor);
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
</style>
