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
	import {
		isApi
	} from '@/common/checkApi.js';
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
			if (JSON.stringify(e) != '{}') {
				this.indexId = e.indexId;
				this.indexName = e.indexName;
			}
			this.initNav();
			// 初始化指标数据
			this.initSearchDetail();
			this.initNav();
		},
		onUnload() {
			// 退出界面时重新初始化数据
			this.indexId = "1000";
			this.indexName = "指标详情页";
			this.source = "";
			this.isFavorite = false;
			this.timeCondition = [];
			this.indexDetail = [];
			this.relatedData = [];
			this.totalHeight = 1000;
			this.classTotalHeight = 400;
			this.initFavColor("ffffff");
		},
		methods: {
			initSearchDetail() {
				this.checkNetwork();
				uni.request({
					url: 'http://wuhandata.applinzi.com/searchDetail.php',
					method: 'GET',
					data: {
						"indexId": this.indexId,
						"source": this.source
					},
					success: res => {
						let dataApi = searchDetailApiJson;
						// 检查json数据
						isApi(dataApi);
						// 设置各部分数据
						_self.indexId = dataApi.data.baseInfo.indexId;
						_self.indexName = dataApi.data.baseInfo.indexName;
						_self.isFavorite = dataApi.data.baseInfo.isFavorite;
						_self.timeCondition = dataApi.data.timeCondition;
						_self.indexDetail = dataApi.data.classInfo;
						_self.relatedData = dataApi.data.relatedData;
						// 计算classHeight及总Height
						this.setHeight();
					},
					fail: (e) => {
						console.log(e.errMsg);
						let dataApi = searchDetailApiJson;
						// 检查json数据
						isApi(dataApi);
						// 设置各部分数据
						_self.indexId = dataApi.data.baseInfo.indexId;
						_self.indexName = dataApi.data.baseInfo.indexName;
						_self.isFavorite = dataApi.data.baseInfo.isFavorite;
						_self.timeCondition = dataApi.data.timeCondition;
						_self.indexDetail = dataApi.data.classInfo;
						_self.relatedData = dataApi.data.relatedData;
						// 计算classHeight及总Height
						this.setHeight();
					},
					complete: () => {}
				});
			},
			onConfirm(val) {
				this.checkNetwork();
				uni.request({
					url: 'http://1.wuhandata.applinzi.com/searchDetail.php',
					method: 'GET',
					data: {
						"indexId": this.indexId,
						"source": this.source,
						"startTime": val.stratTime,
						"endTime": val.endTime,
						"timeFreq": val.timeFreq
					},
					success: res => {
						let dataApi = searchConfirmApiJson;
						// 检查json数据
						isApi(dataApi);
						// 更新图例数据
						_self.indexDetail = dataApi.data.classInfo;
						// 计算classHeight及总Height
						this.setHeight();
					},
					fail: (e) => {
						console.log(e.errMsg);
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
				let relatedHeight = relatedInfo.length == 0 ? 0 : (relatedInfo.length + 1) * 40;
				_self.totalHeight = 200 + classHeight + relatedHeight;
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
