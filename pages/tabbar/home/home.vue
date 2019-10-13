<template>
	<view>
		<!-- 轮播图 -->
		<view style="background-color: #FFFFFF; margin-bottom: 0upx; max-height: 480upx;">
			<!-- 全屏宽轮播图 -->
			<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
			 duration="500">
				<swiper-item v-for="(item,index) in slideshow" :key="index">
					<image :src="item.image" style="max-height: 480upx;" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 搜索框 -->
		<view class="cu-bar bg-white search" style="min-height: 120upx;margin-top: 0upx;background-color: #FFFFFF;padding: 20upx 0upx;">
			<view class="search-form radius" style="height: 72upx;border-radius: 50upx;" @click="openSearch">
				<text class="cuIcon-search"></text>
				<text class="text-grey">指标搜索</text>
			</view>
		</view>
		<!-- 经济分析 -->
		<view class="icon-layout">
			<view class="icon-single-layout" v-for="(item,index) in analysis" :key="index">
				<view class="icon-single-background" :style="'background: '+item.background" @click="openAnalysisList(index)">
					<image class="icon-single-backicon" :src="item.icon_url"></image>
				</view>
				<text class="icon-single-text">{{item.icon_name}}</text>
			</view>
		</view>
		<!-- 专题 -->
		<view class="topic">
			<view class="cu-bar bg-white" style="min-height: 100upx; width: 750upx;margin: 0upx;">
				<view class="action">
					<text class="cuIcon-titles text-blue" style="color: #3A82CC;"></text>
					<text class="text-xl  text-blue" style="color: #3A82CC;">专题</text>
				</view>
			</view>
			<view class="flex flex-wrap justify-around" style="flex-direction: row;" v-for="(item,index) in topic" :key="index"
			 @click="openTopicDetail(item)">
				<image style="height: 175upx;width: 330upx;margin: 0upx 0upx 30upx 30upx;padding: 0;border-radius: 5px 5px 5px 5px;overflow: hidden;"
				 :src="item.image"></image>
			</view>
		</view>
	</view>
</template>

<script>
	// 引入公共样式
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	import wdTopicCard from '@/components/wd-topic-card/wd-topic-card.vue';
	import checkApi from '@/common/checkApi.js';
	import homeApiJson from '@/common/api/home.json';


	export default {
		components: {
			uniIcon,
			wdTopicCard
		},
		data() {
			return {
				cardCur: 0,
				dotStyle: true,
				indicatorDots: true, // 是否显示面板指示点
				autoplay: true, // 是否自动切换
				interval: 2000, // 自动切换时长
				duration: 500, // 切换时长
				slideshow: [],
				analysis: [],
				topic: [],
			};
		},
		onShow: function() {
			uni.showLoading({
				title: "加载中",
			});
			this.showStorage();
			this.initHomePage();
		},
		onPullDownRefresh: function() {
			this.removeHomeStorage();
			this.initHomePage();
			uni.stopPullDownRefresh();
		},
		methods: {
			initHomePage() {
				checkApi.checkNetwork();
				let dataApi;
				// 通过请求接口获取轮播图
				uni.request({
					url: this.apiUrl + 'initHome',
					method: 'GET',
					data: {},
					success: res => {
						console.log("获取成功;" + JSON.stringify(res.data));
						// 获取homepage的数据
						dataApi = homeApiJson;
					},
					fail: (e) => {
						//取出缓存数据并绑定到data
						console.log("获取失败;" + JSON.stringify(e));
					},
					complete: () => {
						try {
							// 检查json数据
							checkApi.isApi(dataApi);
							// 设置各部分数据
							this.slideshow = dataApi.data.slideshow;
							this.analysis = dataApi.data.analysis;
							// this.topic = this.randTopic(dataApi.data.topic);
							this.topic = dataApi.data.topic;
							// 数据存入缓存
							this.setHomeStorage();
							uni.hideLoading();
						} catch (e) {
							console.log("发生异常;" + JSON.stringify(e));
						}
					}
				});
			},
			setHomeStorage() {
				uni.setStorageSync('home_slideshow', this.slideshow);
				uni.setStorageSync('home_analysis', this.analysis);
				uni.setStorageSync('home_topic', this.topic);
			},
			showStorage() {
				let homeSlideshow = uni.getStorageSync('home_slideshow');
				if (homeSlideshow) {
					this.slideshow = homeSlideshow;
				}
				let homeAnalysis = uni.getStorageSync('home_analysis');
				if (homeAnalysis) {
					this.analysis = homeAnalysis;
				}
				let homeTopic = uni.getStorageSync('home_topic');
				if (homeTopic) {
					this.topic = homeTopic;
				}
				uni.hideLoading();
			},
			removeHomeStorage() {
				uni.removeStorageSync('home_slideshow');
				this.slideshow = [];
				uni.removeStorageSync('home_analysis');
				this.analysis = [];
				uni.removeStorageSync('home_topic');
				this.topic = [];
			},
			randTopic(resTopic) {
				let t = [];
				let len = resTopic.length;
				let tid1 = Math.floor(Math.random() * len);
				t.push(resTopic[tid1]);
				if (len > 1) {
					// 防止出现重复的
					let tid2 = Math.floor(Math.random() * len);
					while (1) {
						tid2 = Math.floor(Math.random() * len);
						if (tid2 != tid1) {
							t.push(resTopic[tid2]);
							break;
						}
					}
					return t;
				} else {
					return t;
				}
			},
			openAnalysisList(index) {
				uni.setStorageSync('analysis_list_scroll_top', 0);
				uni.setStorageSync('analysis_list_scroll_index', index);
				uni.navigateTo({
					url: '../../analysis/list/list?itemKey=' + index
				});
			},
			openTopicDetail(item) {
				uni.navigateTo({
					url: '../../topic/detail/detail?indexId=' + item.id + '&indexName=' + item.title
				})
			},
			openSearch(e) {
				uni.switchTab({
					url: "../search/search"
				})
			},
		}
	}
</script>

<style>
	.slide-image {
		/* height: 350upx; */
		width: 750upx;
	}

	.search {
		display: flex;
		flex-direction: row;
		background-color: #F8F8F8;
		align-items: center;
	}

	.input-view {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex: 1;
		background-color: #FFFFFF;
		height: 50upx;
		border-radius: 20upx;
		margin-left: 20upx;
		margin-right: 20upx;
		padding: 10upx;
	}

	.input {
		padding: 0 5px;
	}

	.icon-layout {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-top: 0upx;
		padding: 5upx;
		background-color: #FFFFFF;
	}

	.icon-single-layout {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 20%;
		padding-top: 15upx;
		padding-bottom: 15upx;
	}

	.icon-single-background {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 90upx;
		width: 90upx;
		background: #007AFF;
		border-radius: 50%;
	}

	.icon-single-backicon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 50upx;
		height: 50upx;
	}

	.icon-single-text {
		margin-top: 5upx;
		color: #2B2B2C;
	}

	.topic {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-top: 30upx;
		/* padding: 5upx; */
		background-color: #FFFFFF;
	}

	.topic-image {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		height: 100upx;
	}

	.topic-image-src {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 30upx;
		margin-right: 30upx;
		width: 690upx;
		height: 100%;
	}
</style>
