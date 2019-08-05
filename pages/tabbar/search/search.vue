<template>
	<view class="wrapper">
		<!-- 搜索主界面-包含搜索历史和搜索趋势 -->
		<view v-if="isHistory" class="orgin-box">
			<!-- 历史搜索列表 -->
			<view class="history-box">
				<view class="history-title">
					<view style="display: flex; align-items: center;">
						<image src="../../../static/icon/search/history.png" style="height: 50upx; width: 50upx;"></image>
						<text style="font-size: 36upx; margin-left: 8upx;">搜索历史</text>
					</view>

					<text class="uni-icon uni-icon-trash" @click="clearSearch"></text>
				</view>
				<view v-if="historyList.length > 0" class="history-content">
					<view class="history-item" v-for="(item, index) in tranName" :key="index">
						{{item.name}}
					</view>
				</view>
				<view v-else class="no-data">您还没有历史记录</view>
			</view>
			<!-- 搜索趋势列表 -->
			<view class="trend-box">
				<view class="trend-title">
					<view style="display: flex; align-items: center;">
						<image src="../../../static/icon/search/trend.png" style="height: 50upx; width: 50upx;"></image>
						<text style="font-size: 36upx; margin-left: 8upx;">搜索趋势</text>
					</view>
				</view>
				<uni-list style="background-color: #FFFFFF;">
					<view v-for="(item, index) in trendList" :key="index" @click="searchTrendTap(item)">
						<wd-trend-list-item :trendId="item.id" :title="item.name" :trendArrow="item.arrow" :trendRate="item.rate"></wd-trend-list-item>
					</view>
				</uni-list>
			</view>
		</view>
		<!-- 搜索结果列表 -->
		<view v-else class="">
			<view v-if="resultList.length > 0" class="history-list-box">
				<view class="history-list-item" v-for="(item, index) in resultList" :key="index" @click="searchResultTap(item)">
					<rich-text style="display: flex; align-items: center;" :nodes="item.nameNodes"></rich-text>
					<view class="tag-view">
						<wd-tag :text="item.source" size="small" :circle="true"></wd-tag>
					</view>
				</view>
			</view>
			<view v-else class="no-data">没有搜索到相关内容</view>
		</view>
	</view>
</template>

<script>
	import util from '@/components/wd-search/js/util.js';
	import uniList from '@/components/uni-list/uni-list.vue';
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
	import wdTag from '@/components/wd-tag/wd-tag.vue';
	import wdTrendListItem from '@/components/wd-trend-list-item/wd-trend-list-item.vue';
	import checkApi from '@/common/checkApi.js';
	import searchApiJson from '@/common/api/search.json';
	import searchResultApiJson from '@/common/api/searchResult.json';

	export default {
		components: {
			wdTag,
			uniList,
			uniListItem,
			wdTrendListItem
		},
		computed: {
			// 搜索结果指标名称过长则截断
			tranName: function() {
				let result = this.historyList;
				for (var i = 0; i < result.length; i++) {
					if (result[i].name.length > 6) {
						result[i].name = result[i].name.substring(0, 4) + '..';
					}
				}
				return result;
			},
		},
		data() {
			return {
				source: '全部',
				isHistory: true,
				historyList: [],
				trendList: [],
				resultList: []
			};
		},
		onShow() {
			this.isHistory = true;
			this.initSearch();
		},
		methods: {
			initSearch() {
				checkApi.checkNetwork();
				this.isHistory = true;
				// 取出历史搜索缓存数据
				this.historyList = uni.getStorageSync('search_history');
				// 取出搜索趋势缓存数据
				let searchTrend = uni.getStorageSync('search_trend');
				if (searchTrend) {
					this.trendList = searchTrend
				}
				// 获取搜索趋势数据
				uni.request({
					url: this.apiUrl + 'searchTrend',
					method: 'GET',
					data: {},
					success: (res) => {
						console.log(JSON.stringify(res.data));
						try {
							let searchApi = res.data;
							// 检查json数据
							checkApi.isApi(searchApi);
							// 设置各部分数据
							this.trendList = res.data.data.trend;
							// this.trendList = searchApi.data.trend;
							uni.setStorage({
								key: 'search_trend',
								data: this.trendList,
							});
						} catch (e) {
							console.log(e.message);
						}
					},
					fail: (e) => {
						console.log(e.errMsg);
					},
					complete: () => {}
				});
			},
			//关键字搜索
			getInputtips(val) {
				checkApi.checkNetwork();
				uni.request({
					url: this.apiUrl + 'searchIndi',
					method: 'POST',
					data: {
						keyword: val,
						source: this.source,
					},
					success: res => {
						let searchResultApi = res.data;
						// 检查json数据
						checkApi.isApi(searchResultApi);
						// 设置各部分数据
						let dataObj = searchResultApi.data.result;
						// let dataObj = res.data;
						dataObj = util.dataHandle(dataObj, val);
						this.resultList = dataObj;
					},
					fail: (e) => {},
					complete: () => {}
				});
			},
			/**
			 * 清理历史搜索数据
			 */
			clearSearch() {
				uni.showModal({
					title: '提示',
					content: '是否清理全部搜索历史？',
					success: res => {
						if (res.confirm) {
							this.historyList = util.removeHistory();
						}
					}
				});
			},
			/**
			 * 搜索趋势点击（这里可能改成直接跳转到对应指标页，因为关键词难以分析）
			 */
			searchTrendTap(item) {
				util.setHistory(item.name);
				console.log(JSON.stringify(item));
				uni.navigateTo({
					url: "../../search/detail/detail?indexId=" + item.indexId + "&indexName=" + item.name + "&source=" + item.source
				})
			},
			/**
			 * 搜索结果列表点击
			 */
			searchResultTap(item) {
				item = JSON.parse(JSON.stringify(item));
				// 如果当前是历史搜索页面,那么点击不储存,直接跳转
				if (this.isHistory) {
					return;
				} else {
					this.isHistory = true;
					// 点击列表存储搜索数据,更新历史搜索记录
					util.setHistory(item);
					this.historyList = uni.getStorageSync('search_history');
					// TODO 记录历史搜索记录到服务端
					// 跳转到对应的界面,这里先做的是返回上一个界面
					console.log("source" + item.source);
					uni.navigateTo({
						url: "../../search/detail/detail?indexId=" + item.id + "&indexName=" + item.name + "&source=" + item.source
					})
				}
			},
		},
		/**
		 * 当 searchInput 输入时触发
		 */
		onNavigationBarSearchInputChanged(e) {
			let text = e.text;
			if (!text) {
				this.isHistory = true;
				this.historyList = [];
				this.historyList = uni.getStorageSync('search_history');
				return;
			} else {
				this.isHistory = false;
				this.getInputtips(text);
			}
		},
		/**
		 * 点击软键盘搜索按键触发
		 */
		onNavigationBarSearchInputConfirmed(e) {
			let text = e.text;
			if (!text) {
				this.isHistory = true;
				this.historyList = [];
				this.historyList = uni.getStorageSync('search_history');
				uni.showModal({
					title: '提示',
					content: '请输入内容。',
					success: res => {
						if (res.confirm) {}
					}
				});
				return;
			}
		},
		/**
		 *  点击导航栏 buttons 时触发
		 */
		onNavigationBarButtonTap(e) {
			let self = this;
			uni.showActionSheet({
				itemList: ['全部', '国统', '湖统', '大数据'],
				success: function(res) {
					var itemList = ['全部', '国统', '湖统', '大数据'];
					// 这里无法直接调用前面的itemList，所以重新声明一次
					self.source = itemList[res.tapIndex];
					// 通过控制该页面的webview对象来重置导航栏的button中text数值
					let pages = getCurrentPages();
					let page = pages[pages.length - 1];
					// #ifdef APP-PLUS  
					let currentWebview = page.$getAppWebview();
					let titleObj = currentWebview.getStyle().titleNView;
					if (!titleObj.buttons) {
						return;
					}
					titleObj.buttons[0].text = self.source;
					currentWebview.setStyle({
						titleNView: titleObj
					});
					// #endif
				},
				fail: function(res) {
					console.log(res.errMsg);
				}
			});
		}
	}
</script>

<style>
	.orgin-box {
		display: flex;
		flex-direction: column;
	}

	.history-box {
		background-color: #FFFFFF;
		height: 355upx;
		margin-bottom: 30upx;
	}

	.trend-box {
		background-color: #FFFFFF;
		felx: 1;
		margin-bottom: 50upx;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		font-size: 28upx;
		line-height: inherit;
	}

	.history-title {
		display: flex;
		justify-content: space-between;
		padding: 20upx 30upx;
		padding-bottom: 0;
		font-size: 34upx;
		color: #333;
	}

	.history-content {
		display: flex;
		flex-wrap: wrap;
		padding: 15upx;
	}

	.history-item {
		padding: 4upx 35upx;
		border: 1px #f1f1f1 solid;
		background: #f0f2f5;
		border-radius: 50upx;
		margin: 12upx 10upx;
		color: #999;
	}

	.history-list-box {
		/* margin: 10upx 0; */
	}

	.history-list-item {
		display: flex;
		justify-content: flex-start;
		padding: 30upx 0;
		margin-left: 30upx;
		border-bottom: 1px #EEEEEE solid;
		font-size: 28upx;
	}

	.trend-title {
		display: flex;
		justify-content: space-between;
		padding: 20upx 30upx;
		padding-bottom: 0;
		font-size: 34upx;
		color: #333;
		margin-bottom: 15upx;
	}

	.no-data {
		text-align: center;
		color: #999;
		margin: 100upx;
	}

	.tag-view {
		margin: 10upx 20upx;
		display: inline-block;
	}
</style>
