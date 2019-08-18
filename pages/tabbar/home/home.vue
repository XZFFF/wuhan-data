<template>
	<view>
		<!-- 轮播图 -->
		<view>
			<swiper style="width: 750upx; height: 350upx;" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
			 :duration="duration" :circular="true">
				<view v-for="(item,index) in slideshow" :key="index">
					<swiper-item>
						<image mode="widthFix" :src="item.image" class="slide-image"></image>
					</swiper-item>
				</view>
			</swiper>
		</view>
		<!-- 搜索框 -->
		<view class="search">
			<view class="input-view" @click="openSearch">
				<uni-icon type="search" size="18" color="#8E8E93"></uni-icon>
				<input disabled="true" confirm-type="search" @confirm="confirm" class="input" type="text" placeholder="输入搜索关键词" />
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
			<view class="topic-image" @click="openTopicList()">
				<image class="topic-image-src" src="../../../static/home/title/topic_title.png"></image>
			</view>
			<view v-for="(item,index) in topic" :key="index" @click="openTopicDetail(item)">
				<wd-card-image :image="item.image" :title="item.title"></wd-card-image>
			</view>
		</view>
	</view>
</template>

<script>
	// 引入公共样式
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	import wdCardImage from '@/components/wd-card-image/wd-card-image.vue';
	import checkApi from '@/common/checkApi.js';
	import homeApiJson from '@/common/api/home.json';

	export default {
		components: {
			uniIcon,
			wdCardImage
		},
		data() {
			return {
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
			console.log(this.apiUrl);
			this.showStorage();
			this.initHomePage();
			this.initAnalysisList();
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
					// url: 'http://192.168.124.20:8089/wuhan_data1/initHome',
					// url: this.apiUrl + 'initHome',
					url: 'https://www.baidu.com',
					method: 'GET',
					data: {},
					success: res => {
						console.log("获取成功;" + JSON.stringify(res.data));
						// 获取homepage的数据
						// dataApi = res.data;
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
						} catch (e) {
							console.log("发生异常;" + JSON.stringify(e));
						}
					}
				});
			},
			initAnalysisList() {
				// 预加载经济分析列表
				let token = uni.getStorageSync('token');
				uni.request({
					url: this.apiUrl + "getAnalysisList",
					method: 'POST',
					data: {
						token: token
					},
					success: (res) => {
						let dataApi = res.data;
						checkApi.isApi(dataApi);
						uni.setStorageSync('analysis_list', dataApi.data.list);
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
				// var analysisId = e.currentTarget.dataset.analysisid;
				uni.setStorageSync('analysis_list_scroll_top', 0);
				uni.setStorageSync('analysis_list_scroll_index', index);
				uni.navigateTo({
					url: '../../analysis/list/list?itemKey=' + index
				});
			},
			openTopicList(e) {
				uni.navigateTo({
					url: '../../topic/list/list'
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
			}
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
		margin-top: 20upx;
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
		margin-top: 30upx;
		padding: 5upx;
		background-color: #FFFFFF;
	}

	.icon-single-layout {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 20%;
		padding-top: 20upx;
		padding-bottom: 20upx;
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
		padding: 5upx;
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
