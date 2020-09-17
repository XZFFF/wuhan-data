<template>
	<view class="container" :style="{height:totalHeight + 'px'}">
		<view style="margin: 10upx 20upx;">{{path}}</view>
		<wd-area-picker v-if="isArea=='1' || isArea==1" @confirm="onConfirm" :timeCondition="timeCondition"></wd-area-picker>
		<wd-time-picker v-else @confirm="onConfirm" :timeCondition="timeCondition"></wd-time-picker>
		<view class="class-block" :style="{height:classTotalHeight + 'px'}">
			<block v-for="(item, index) in indexDetail" :key="index">
				<wd-table v-if="item.classType === 'table'" :classTitle="item.classTitle" :tableBody="item.tableBody"></wd-table>
				<wd-echarts v-if="item.classType === 'echarts'" :canvasId="'echart'+item.id" :echartOption="item.echartOption"
				 :classHeight="item.classHeight" :classTitle="item.classTitle"></wd-echarts>
			</block>
		</view>
		<wd-related-list :relatedData="relatedData"></wd-related-list>
		<!-- <wd-share-poster ref="shareComp"></wd-share-poster> -->
	</view>
</template>

<script>
	import wdTimePicker from '@/components/wd-time-picker/wd-time-picker.vue';
	import wdAreaPicker from '@/components/wd-time-picker/wd-area-picker.vue';
	import wdEcharts from '@/components/wd-echarts/wd-echarts.vue';
	import wdTable from '@/components/wd-table/wd-table.vue';
	import wdRelatedList from '@/components/wd-related-list/wd-related-list.vue';
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
			wdSharePoster
		},
		data() {
			return {
				indexId: "1000",
				indexName: "指标详情页",
				source: "",
				sourceArea: "",
				isFavorite: false,
				isArea: 1,
				path: "",
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
				_self.sourceArea = e.sourceArea;
				_self.isArea = e.isArea;
				_self.path = e.path;
			}
			console.log("收藏状态：" + this.isFavorite);
			// 初始化页面数据
			uni.showLoading({
				title: "数据加载中...",
			});
			checkApi.setFootprint("search", this.indexId, this.indexName, this.source, this.sourceArea, this.path);
			this.showStorage();
			this.initSearchDetail();
			this.initNav();

			uni.removeStorageSync('echartArr');
		},
		onNavigationBarButtonTap(e) {
			console.log("source:" + this.source);
			switch (e.type) {
				case "favorite":
					if (this.isArea == '1' || this.isArea == 1) {
						uni.showToast({
							title: '该指标暂不支持收藏'
						});
						return;
					}
					if (this.isFavorite == false || this.isFavorite == "false") {
						if (checkApi.setCollect("search", this.indexId, this.indexName, this.source, this.sourceArea, this.path)) {
							this.isFavorite = true;
						}
					} else if (this.isFavorite == true || this.isFavorite == "true") {
						if (checkApi.delCollect("search", this.indexId, this.indexName, this.source, this.sourceArea, this.path)) {
							this.isFavorite = false;
						}
					} else {
						console.log("收藏状态异常" + this.isFavorite);
					}
					// 更新导航栏
					this.initNav();
					break;
				case "share": //点击分享按钮
					console.log("进入了page的分享监听");
					this.capture()
					// this.$refs.shareComp.shareFc();
					break;
				default:
					console.log(e.type);
			}
		},
		methods: {
			// 初始化指标数据
			initSearchDetail() {
				let token = uni.getStorageSync('token');
				checkApi.checkNetwork();
				let dataApi;
				let requestData = {
					token: token,
					indexId: this.indexId,
					source: this.source,
					sourceArea: this.sourceArea,
					isArea: this.isArea,
					path: this.path
				};
				console.log(JSON.stringify(requestData));
				uni.request({
					url: this.apiUrl + 'searchDetail',
					// url: 'http://www.baidu.com',
					method: 'POST',
					data: requestData,
					success: (res) => {
						uni.removeStorageSync('echartArr');
						dataApi = res.data;
						// dataApi = searchDetailApiJson;
						console.log("获取ok;" + JSON.stringify(dataApi));
						let search_detail_key = 'search_detail' + _self.indexId;
						uni.setStorageSync(search_detail_key, dataApi);
					},
					fail: (e) => {
						console.log("获取失败;" + JSON.stringify(e));
					},
					complete: () => {
						// 检查json数据
						checkApi.isApi(dataApi);
						// 设置各部分数据
						try {
							_self.isFavorite = dataApi.data.baseInfo.isFavorite;
							_self.timeCondition = dataApi.data.timeCondition;
							_self.indexDetail = dataApi.data.classInfo;
							_self.relatedData = dataApi.data.relatedData;
							// 计算classHeight及总Height
							this.setHeight();
							// 设置画布数据
							// this.setDrawCanvas();
						} catch (e) {
							console.log("发生异常;" + JSON.stringify(e));
						}
						uni.hideLoading();
					}
				});
			},
			// 再请求指标数据
			onConfirm(val) {
				uni.showLoading({
					title: "数据加载中...",
				});
				let token = uni.getStorageSync('token');
				checkApi.checkNetwork();
				let dataApi;
				let requestData = {
					token: token,
					indexId: _self.indexId,
					source: _self.source,
					sourceArea: this.sourceArea,
					isArea: _self.isArea,
					path: _self.path,
					timeFreq: val.timeFreq,
					startTime: val.startTime,
					endTime: val.endTime,
				};
				console.log(JSON.stringify(requestData));
				uni.request({
					url: this.apiUrl + 'searchConfirm',
					// url: 'http://www.baidu.com',
					method: 'POST',
					data: requestData,
					success: (res) => {
						// console.log("获取成功;" + JSON.stringify(res.data));
						try {
							uni.removeStorageSync('echartArr');
							dataApi = res.data;
							// dataApi = searchConfirmApiJson;
							checkApi.isApi(dataApi);
							_self.indexDetail = dataApi.data.classInfo;
							this.setHeight();
							// this.setDrawCanvas();
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
			showStorage() {
				let dataApi;
				let search_detail_key = 'search_detail' + _self.indexId;
				let search_detail = uni.getStorageSync(search_detail_key);
				if (search_detail) {
					try {
						dataApi = search_detail;
						_self.timeCondition = dataApi.data.timeCondition;
						_self.indexDetail = dataApi.data.classInfo;
						_self.relatedData = dataApi.data.relatedData;
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
					favColor = "#e54d42"; // red-#e54d42 yellow-#f9da74
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
			// 根据服务端传入的数据计算classInfo需要的高度及界面需要的总高度
			setHeight() {
				let pathHeight = 100;
				let timeConditionHeight = 250;
				let classHeight = 0;
				let relatedHeight = 0;
				if (_self.indexDetail) {
					classHeight = checkApi.calClassInfoHeight(_self.indexDetail);
				}
				if (_self.relatedData) {
					relatedHeight = _self.relatedData.length == 0 ? 0 : (_self.relatedData.length + 1) * 40;
				}
				_self.classTotalHeight = classHeight;
				_self.totalHeight = pathHeight + timeConditionHeight + classHeight + relatedHeight;
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
			capture() {
				var pages = getCurrentPages();
				var page = pages[pages.length - 1];
				console.log("当前页" + pages.length - 1);
				var bitmap = null;
				var currentWebview = page.$getAppWebview();
				bitmap = new plus.nativeObj.Bitmap('amway_img');
				// 将webview内容绘制到Bitmap对象中  
				currentWebview.draw(bitmap, function() {
					console.log('截屏绘制图片成功');
					bitmap.save("_doc/a.jpg", {}, function(i) {
						console.log('保存图片成功：' + JSON.stringify(i));
						//拉起分享
						// #ifdef APP-PLUS
						_app.getShare(false, false, 2, '', '', '', i.target, false, false);
						// #endif
						// #ifndef APP-PLUS
						_app.showToast('请在APP中进行分享');
						// #endif
						uni.saveImageToPhotosAlbum({
							filePath: i.target,
							success: function() {
								bitmap.clear(); //销毁Bitmap图片  
								uni.showToast({
									title: '保存图片成功',
									mask: false,
									duration: 1500
								});
							}
						});

					}, function(e) {
						console.log('保存图片失败：' + JSON.stringify(e));
					});
				}, function(e) {
					console.log('截屏绘制图片失败：' + JSON.stringify(e));
				});
				//currentWebview.append(amway_bit);    
			},
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
