<template>
	<view>
		<!-- 轮播图 -->
		<view>
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<view v-for="(item,index) in slideshow" :key="index">
							<swiper-item>
								<image mode="widthFix" :src="item.image" class="slide-image"></image>
							</swiper-item>
						</view>
					</swiper>
				</view>
			</view>
		</view>
		<!-- 搜索框 -->
		<view class="search">
			<view class="input-view">
				<uni-icon type="search" size="18" color="#8E8E93"></uni-icon>
				<input confirm-type="search" @confirm="confirm" class="input" type="text" placeholder="输入搜索关键词" />
			</view>
		</view>
		<!-- 经济分析 -->
		<view class="icon-layout">
			<view class="icon-single-layout" v-for="(item,index) in analysis_icon" :key="index">
				<view class="icon-single-background" :style="'background: '+item.background" @click="open_analysis_list"
				 :data-analysisid=item.id>
					<image class="icon-single-backicon" :src="item.icon_url"></image>
				</view>
				<text class="icon-single-text">{{item.icon_name}}</text>
			</view>
		</view>
		<!-- 专题 -->
		<view class="topic">
			<view class="topic-image">
				<image class="topic-image-src" src="../../../static/home/title/topic_title.png" @click="open_topic_list"></image>
			</view>
			<view v-for="(item,index) in topic" :key="index" @click="open_topic_detail">
				<card-item :image="item.image" :title="item.title"></card-item>
			</view>
		</view>
	</view>
</template>

<script>
	// 引入公共样式
	import uniIcon from '../../../components/uni-icon/uni-icon.vue';
	import cardItem from '../../../components/card-item/card-item.vue';
	export default {
		components: {
			uniIcon,
			cardItem
		},
		data() {

			return {
				slideshow: [],
				analysis_icon: [],
				topic: [],
				indicatorDots: true, // 是否显示面板指示点
				autoplay: true, // 是否自动切换
				interval: 2000, // 自动切换时长
				duration: 500 // 切换时长
			};
		},
		onLoad: function() {
			// TODO 此处似乎有生命周期的bug
			uni.showLoading({
				title: "Loading..."
			})
			setTimeout(function() {
				uni.hideLoading();
			}, 2000);
			// 通过请求接口获取启动图
			uni.request({
				url: 'http://wuhandata.applinzi.com/slideshow.php',
				method: 'GET',
				data: {},
				success: res => {
					this.slideshow = res.data;
				},
				fail: (e) => {},
				complete: () => {}
			});
			// 
			uni.request({
				url: 'http://wuhandata.applinzi.com/analysisIcon.php',
				method: 'GET',
				data: {},
				success: res => {
					this.analysis_icon = res.data;
				},
				fail: (e) => {},
				complete: () => {}
			});
			// 通过请求接口获取专题数据
			uni.request({
				url: 'http://wuhandata.applinzi.com/topicList.php',
				method: 'GET',
				data: {},
				success: res => {
					uni.hideLoading();
					let res_topic = res.data;
					let t = [];
					let len = res_topic.length;
					let topic_id1 = Math.floor(Math.random() * len);
					t.push(res_topic[topic_id1]);
					// 防止出现重复的
					let topic_id2 = Math.floor(Math.random() * len);
					while (1) {
						topic_id2 = Math.floor(Math.random() * len);
						if (topic_id2 != topic_id1) {
							t.push(res_topic[topic_id2]);
							break;
						}
					}
					this.topic = t;
					console.log(t);
				},
				fail: (e) => {},
				complete: () => {}
			});
		},
		methods: {
			open_analysis_list(e) {
				var analysis_id = e.currentTarget.dataset.analysisid;
				uni.navigateTo({
					url: '../../analysis/list?analysis_id=' + analysis_id
				});
			},
			open_topic_list(e) {
				uni.navigateTo({
					url: '../../topic/list'
				});
			},
			open_topic_detail(e) {
				uni.showToast({
					title: "该专题暂未开放",
					icon: "none",
					duration: 1000,
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
