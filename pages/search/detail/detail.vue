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
	import searchDetailApiJson from "@/common/api/searchDetail.json";
	import searchConfirmApiJson from "@/common/api/searchConfirm.json";

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
				source: "",
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
			console.log(e.toString());
			if (JSON.stringify(e) != '{}') {
				this.indexId = e.indexId;
				this.indexName = e.indexName;
				this.source = e.source;
			}
			this.initNav();
			// 初始化指标数据
			this.initSearchDetail();
			this.initNav();
		},
		methods: {
			initSearchDetail() {
				checkApi.checkNetwork();
				let dataApi = {};
				console.log(this.indexId + this.indexName + this.source);
				uni.request({
					url: this.apiUrl + 'searchDetail',
					method: 'POST',
					data: {
						"indexId": this.indexId,
						"source": this.source
					},
					success: res => {
						console.log(JSON.stringify(res.data));
						dataApi = res.data;
						// dataAPi = searchDetailApiJson;
					},
					fail: (e) => {
						console.log(e.errMsg);
						dataApi = searchDetailApiJson;
					},
					complete: () => {
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
							// 计算classHeight及总Height
							this.setHeight();
						} catch (e) {
							console.log(e.message);
							uni.showToast({
								icon: 'none',
								title: e.message,
								duration: 500
							});
						}
					}
				});
			},
			onConfirm(val) {
				checkApi.checkNetwork();
				uni.request({
					url: this.apiUrl + 'searchConfirm',
					method: 'POST',
					data: {
						"indexId": this.indexId,
						"source": this.source,
						"startTime": val.startTime,
						"endTime": val.endTime,
						"timeFreq": val.timeFreq
					},
					success: res => {
						try {
							let dataApi = res.data;
							// 检查json数据
							checkApi.isApi(dataApi);
							// 更新图例数据
							_self.indexDetail = dataApi.data.classInfo;
							// 计算classHeight及总Height
							this.setHeight();
						} catch (e) {
							console.log(e.message);
						}
					},
					fail: (e) => {
						console.log(e.message);
						uni.showToast({
							icon: 'none',
							title: e.message,
							duration: 500
						});
					},
					complete: () => {}
				});
			},
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
