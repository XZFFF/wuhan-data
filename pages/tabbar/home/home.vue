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
			<view class="icon-single-layout" v-for="(item,index) in analysisIcon" :key="index">
				<view class="icon-single-background" :style="'background: '+item.background" @click="openAnalysisList"
				 :data-analysisid=item.id>
					<image class="icon-single-backicon" :src="item.icon_url"></image>
				</view>
				<text class="icon-single-text">{{item.icon_name}}</text>
			</view>
		</view>
		<!-- 专题 -->
		<view class="topic">
			<view class="topic-image">
				<image class="topic-image-src" src="../../../static/home/title/topic_title.png" @click="openTopicList"></image>
			</view>
			<view v-for="(item,index) in topic" :key="index" @click="openTopicDetail">
				<wd-card-item :image="item.image" :title="item.title"></wd-card-item>
			</view>
		</view>
	</view>
</template>

<script>
	// 引入公共样式
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	import wdCardItem from '@/components/wd-card-item/wd-card-item.vue';
	export default {
		components: {
			uniIcon,
			wdCardItem
		},
		data() {
			return {
				indicatorDots: true, // 是否显示面板指示点
				autoplay: true, // 是否自动切换
				interval: 2000, // 自动切换时长
				duration: 500, // 切换时长
				slideshow: [],
				analysisIcon: [],
				topic: [],
			};
		},
		onShow: function() {
			this.initHomePage();
		},
		onPullDownRefresh: function() {
			this.removeStorage();
			this.initHomePage();
			uni.stopPullDownRefresh();
		},
		methods: {
			initHomePage() {
				this.checkNetwork();
				this.initSlideShow();
				this.initAnalysisIcon();
				this.initTopic();
			},
			removeStorage() {
				uni.removeStorage({
					key: 'home_slideshow',
				});
				this.slideshow = [];
				uni.removeStorage({
					key: 'home_analysis_icon',
				});
				this.analysisIcon = [];
				uni.removeStorage({
					key: 'home_topic',
				});
				this.topic = [];
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
			initSlideShow() {
				// 通过请求接口获取轮播图
				uni.request({
					url: 'http://wuhandata.applinzi.com/slideshow.php',
					method: 'GET',
					data: {},
					success: res => {
						this.slideshow = res.data;
						uni.setStorage({
							key: 'home_slideshow',
							data: this.slideshow,
							success: function() {
								console.log('成功请求轮播图数据并存入本地缓存');
							}
						});
					},
					fail: (e) => {
						let homeSlideshow = uni.getStorageSync('home_slideshow');
						if (homeSlideshow) {
							console.log('成功取出缓存数据');
							this.slideshow = homeSlideshow;
						}
					},
					complete: () => {}
				});
			},
			initAnalysisIcon() {
				// 获取经济分析所有icon数据
				uni.request({
					url: 'http://wuhandata.applinzi.com/analysisIcon.php',
					method: 'GET',
					data: {},
					success: res => {
						this.analysisIcon = res.data;
						uni.setStorage({
							key: 'home_analysis_icon',
							data: this.analysisIcon
						});
					},
					fail: (e) => {
						let homeAnalysisIcon = uni.getStorageSync('home_analysis_icon');
						if (homeAnalysisIcon) {
							this.analysisIcon = homeAnalysisIcon;
						}
					},
					complete: () => {}
				});
			},
			initTopic() {
				// 通过请求接口获取专题数据
				uni.request({
					url: 'http://wuhandata.applinzi.com/topicList.php',
					method: 'GET',
					data: {},
					success: res => {
						let resTopic = res.data;
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
							this.topic = t;
						} else {
							this.topic = t;
						}

						uni.setStorage({
							key: 'home_topic',
							data: this.topic
						});
					},
					fail: (e) => {
						let homeTopic = uni.getStorageSync('home_topic');
						if (homeTopic) {
							this.topic = homeTopic;
						}
					},
					complete: () => {}
				});
			},
			openAnalysisList(e) {
				var analysisId = e.currentTarget.dataset.analysisid;
				uni.navigateTo({
					url: '../../analysis/list/list?analysis_id=' + analysisId
				});
			},
			openTopicList(e) {
				uni.navigateTo({
					url: '../../topic/list/list'
				});
			},
			openTopicDetail(e) {
				uni.navigateTo({
					url: '../../topic/detail/detail'
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
