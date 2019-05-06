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
				<view v-if="searchHistoryList.length > 0" class="history-content">
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
					<view v-for="(item, index) in searchTrendList" :key="index" @click="searchTrendTap(item)">
						<wd-trend-list-item :trendId="item.id" :title="item.title" :trendArrow="item.arrow" :trendRate="item.rate"></wd-trend-list-item>
					</view>
				</uni-list>
			</view>
		</view>
		<!-- 搜索结果列表 -->
		<view v-else class="">
			<view v-if="searchResultList.length > 0" class="history-list-box">
				<view class="history-list-item" v-for="(item, index) in searchResultList" :key="index" @click="searchResultTap(item)">
					<rich-text :nodes="item.nameNodes"></rich-text>
				</view>
			</view>
			<view v-else class="no-data">没有搜索到相关内容</view>
		</view>
	</view>
</template>

<script>
	import util from '@/components/wd-search/js/util.js';
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import wdTrendListItem from '@/components/wd-trend-list-item/wd-trend-list-item.vue'

	export default {
		components: {
			uniList,
			uniListItem,
			wdTrendListItem
		},
		computed: {
			tranName: function() {
				let result = this.searchHistoryList;
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
				type: '全部（默认）',
				flng: true,
				timer: null,
				isHistory: true,
				list: [],
				searchHistoryList: [],
				searchTrendList: [],
				searchResultList: []
			};
		},
		onShow() {
			console.log('search page onShow');
			this.isHistory = true;

			this.searchHistoryList = uni.getStorageSync('search_history');
			this.getInputtips('GDP');

			const searchTrend = uni.getStorageSync('search_trend');
			if (searchTrend) {
				this.searchTrendList = searchTrend
			} else {
				this.initSearchTrend();
			}
		},
		methods: {
			initSearchTrend() {
				// 获取搜索趋势的接口
				uni.request({
					url: 'http://wuhandata.applinzi.com/searchTrend.php',
					method: 'GET',
					data: {},
					success: res => {
						this.searchTrendList = res.data;
						uni.setStorage({
							key: 'search_trend',
							data: this.searchTrendList,
							success: function() {
								console.log('成功请求搜索趋势数据并存入本地缓存');
							}
						});
					},
					fail: (e) => {},
					complete: () => {}
				});
			},
			/**
			 * 搜索趋势点击（这里可能改成直接跳转到对应指标页，因为关键词难以分析）
			 */
			searchTrendTap(item) {
				util.setHistory(item.title);
				uni.navigateTo({
					url: "../../search/detail/detail?indexId=" + item.id + "&indexName=" + item.title
				})
			},
			/**
			 * 搜索结果列表点击
			 */
			searchResultTap(item) {
				item = JSON.parse(JSON.stringify(item));
				// 如果当前是历史搜索页面 ，那么点击不储存,直接 跳转
				if (this.isHistory) {
					return;
				} else {
					this.isHistory = true;
					// 点击列表存储搜索数据
					util.setHistory(item);
					this.searchHistoryList = uni.getStorageSync('search_history');
					// 跳转到对应的界面,这里先做的是返回上一个界面
					console.log(item.id + item.name);
					uni.navigateTo({
						url: "../../search/detail/detail?indexId=" + item.id + "&indexName=" + item.name
					})
				}
			},
			/**
			 * 清理历史搜索数据
			 */
			clearSearch() {
				console.log('触发的类型:' + this.type);
				uni.showModal({
					title: '提示',
					content: '是否清理全部搜索历史？',
					success: res => {
						if (res.confirm) {
							this.searchHistoryList = util.removeHistory();
						}
					}
				});
			},
			/**
			 * 关键字搜索
			 */
			getInputtips(val) {
				console.log('当前类型是:' + this.type);
				uni.request({
					url: 'http://wuhandata.applinzi.com/searchResult.php',
					method: 'POST',
					data: {
						keyword: val,
						type: this.type,
					},
					success: res => {
						let dataObj = res.data;
						dataObj = util.dataHandle(dataObj, val);
						this.searchResultList = dataObj;
					},
					fail: (e) => {},
					complete: () => {}
				});

			}
		},
		/**
		 * 当 searchInput 输入时触发
		 */
		onNavigationBarSearchInputChanged(e) {
			let text = e.text;
			if (!text) {
				this.isHistory = true;
				this.searchHistoryList = [];
				this.searchHistoryList = uni.getStorageSync('search_history');
				return;
			} else {
				this.isHistory = false;
				this.getInputtips(text);
			}
		},
		/**
		 * 点击软键盘搜索按键触发
		 */
		/*
		onNavigationBarSearchInputConfirmed(e) {
			let text = e.text;
			if (!text) {
				this.isHistory = true;
				this.searchHistoryList = [];
				this.searchHistoryList = uni.getStorageSync('search_history');
				uni.showModal({
					title: '提示',
					content: '请输入内容。',
					success: res => {
						if (res.confirm) {}
					}
				});
				return;
			} else {
				uni.showModal({
					title: '提示',
					content: `您输入的内容为"${text}",如果点击确定,将记录到历史搜索,并返回.如果取消不做操作`,
					success: res => {
						if (res.confirm) {
							util.setHistory(text);
							uni.navigateBack();
						}
					}
				});
			}
		},
		*/
		/**
		 *  点击导航栏 buttons 时触发
		 */
		onNavigationBarButtonTap(e) {
			uni.showActionSheet({
				itemList: ['全部', '国统', '湖统', '大数据'],
				success: function(res) {
					var itemList = ['全部', '国统', '湖统', '大数据'];
					// 这里无法直接调用前面的itemList，所以重新声明一次
					console.log('选择了' + itemList[res.tapIndex]);
					this.type = itemList[res.tapIndex];
					// 通过控制该页面的webview对象来重置导航栏的button中text数值
					let pages = getCurrentPages();
					let page = pages[pages.length - 1];
					// #ifdef APP-PLUS  
					let currentWebview = page.$getAppWebview();
					let titleObj = currentWebview.getStyle().titleNView;
					if (!titleObj.buttons) {
						return;
					}
					titleObj.buttons[0].text = this.type;
					currentWebview.setStyle({
						titleNView: titleObj
					});
					console.log('搜索类型更改为:' + this.type);
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
</style>
