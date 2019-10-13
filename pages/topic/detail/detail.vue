<template>
	<view class="container" :style="{height:totalHeight + 'px'}">
		<view class="class-block" :style="{height:classTotalHeight + 'px'}">
			<block v-for="(item, index) in indexDetail" :key="index">
				<wd-card v-if="item.classType === 'card'" :title="item.classTitle" :cardText="item.cardText"></wd-card>
				<wd-table v-if="item.classType === 'table'" :title="item.classTitle" :tableBody="item.tableBody"></wd-table>
				<wd-echarts v-if="item.classType === 'echarts'" :canvasId="'echart'+item.id" :echartOption="item.echartOption"
				 :classHeight="item.classHeight" :classTitle="item.classTitle"></wd-echarts>
			</block>
		</view>
	</view>
</template>

<script>
	import uniCard from '@/components/uni-card/uni-card.vue';
	import wdEcharts from '@/components/wd-echarts/wd-echarts.vue';
	import wdTable from '@/components/wd-table/wd-table.vue';
	import wdCard from '@/components/wd-card/wd-card.vue';
	import checkApi from '@/common/checkApi.js';
	import topicDetailApiJson from "@/common/api/topicDetail.json";
	import topic1 from "@/common/api/topic1.json";
	import topic2 from "@/common/api/topic2.json";
	import topic3 from "@/common/api/topic3.json";
	import topic4 from "@/common/api/topic4.json";

	var _self;
	export default {
		components: {
			uniCard,
			wdEcharts,
			wdTable,
			wdCard
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
			console.log("topicId" + this.indexId);
			// this.showStorage();
			this.initTopicDetail();
			_self.initNav();
		},
		onNavigationBarButtonTap(e) {
			switch (e.type) {
				case "none":
					// #ifdef APP-PLUS
					if (e.text == '导出') {
						let path = "";
						switch (this.indexId) {
							case "1":
							case 1:
								path = "http://www.html5-app.com/file/1.pdf";
								this.downloader(path);
								break;
							case "2":
							case 2:
								path = "http://www.html5-app.com/file/1.pdf";
								this.downloader1(path);
								break;
							case "3":
							case 3:
								path = "http://www.html5-app.com/file/1.pdf";
								this.downloader(path);
								break;
							case "4":
							case 4:
								path = "http://www.html5-app.com/file/1.pdf";
								this.downloader(path);
								break;
							default:
								uni.showToast({
									title: "专题" + this.indexId + "导出失败",
									duration: 1000
								});
								break;
						}

					}
					// #endif
					break;
				default:
					uni.showToast({
						title: e.type,
						icon: "none"
					});
			}
		},
		methods: {
			// 初始化数据，请求数据进行页面渲染
			initTopicDetail() {
				checkApi.checkNetwork();
				let dataApi;
				uni.request({
					// url: 'https://www.baidu.com',
					// url: 'http://192.168.124.14:8089/wuhan_data1/topic' + this.indexId,
					url: this.apiUrl + 'topic' + _self.indexId,
					method: 'POST',
					data: {},
					success: (res) => {
						console.log("获取成功;" + JSON.stringify(res.data));
						dataApi = res.data;
						// let topic_detail_key = 'topic_detail' + this.indexId;
						// uni.setStorageSync(topic_detail_key, dataApi);
					},
					fail: (e) => {
						console.log("获取失败;" + JSON.stringify(e));
					},
					complete: () => {
						try {
							// 检查json数据
							checkApi.isApi(dataApi);
							// 设置各部分数据
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
						console.log("缓存数据" + JSON.stringify(topic_detail));
						dataApi = topic_detail;
						// 检查json数据
						checkApi.isApi(dataApi);
						_self.indexDetail = dataApi.data.classInfo;
						// 计算classHeight及总Height
						this.setHeight();
						uni.hideLoading();
					} catch (e) {
						console.log("缓存数据加载失败" + e.message);
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
			downloader1(path) {
				uni.downloadFile({
					url: path,
					success: function(res) {
						var filePath = res.tempFilePath;
						uni.openDocument({
							filePath: filePath,
							success: function(res) {
								console.log('打开文档成功');
							}
						});
					}
				});
			},
			downloader(path) {
				var filename = path.substring(path.lastIndexOf("/") + 1); //分割文件名出来
				//判断文件是否存在
				plus.io.resolveLocalFileSystemURL("_downloads/" + filename, function(entry) {
					//如果文件存在直接打开。

					// 尝试其他方式
					uni.openDocument({
						filePath: entry.fullPath,
						success: function(res) {
							console.log('打开文档成功');
						},
						fail: function(e) {
							console.log('打开文档失败'.e.message);
						}
					})
					// open.openFile({
					// 	filename: entry.fullPath
					// });
				}, function(e) {
					//如果文件不存在，则下载文件到本地
					uni.showLoading({
						title: "文件下载中..."
					});
					// 创建下载任务					
					const dtask = plus.downloader.createDownload(path, {
						filename: "_downloads/" + filename
					}, function(d, status) {
						uni.hideLoading();
						if (status == 200) {
							uni.showToast({
								title: "下载完成"
							});
							let filepath = plus.io.convertLocalFileSystemURL(d.filename);
							// open.openFile({
							// 	filename: filepath
							// });
							uni.openDocument({
								filePath: filepath,
								success: function(res) {
									console.log('打开文档成功');
								},
								fail: function(e) {
									console.log('打开文档失败'.e.message);
								}
							})
						} else {
							uni.showToast({
								title: "下载失败"
							});
						}
					});
					dtask.start(); //开始下载
				});
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
