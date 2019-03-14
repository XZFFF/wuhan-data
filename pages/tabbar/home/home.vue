<template>
	<view>
		<!-- 轮播图 -->
		<view>
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<view v-for="(item,index) in slideshow" :key="index">
							<swiper-item>
								<image :src="'../../../static/home/slideshow/'+item.image_name" class="slide-image" mode="center"></image>
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
				 :data-analysisname=item.icon_name>
					<image class="icon-single-backicon" :src="'../../../static/home/analysis_icon/'+item.icon_name+'.png'"></image>
				</view>
				<text class="icon-single-text">{{item.icon_name}}</text>
			</view>
		</view>
		<!-- 专题 -->
		<view class="topic">
			<view class="topic-image">
				<!-- TODO 图片资源要重新给一下 -->
				<image class="topic-image-src" src="../../../static/home/title/专题标题图.png" @click="open_topic_list"></image>
			</view>
			<view v-for="(item,index) in topic" :key="index">
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
			// TODO 这里应该改成动态获取接口
			let slideshow = [{
					id: '1',
					name: '全国经济进入新常态',
					image_name: "image1.jpg"
				},
				{
					id: '2',
					name: '大数据专题分析报告',
					image_name: "image2.jpg"
				},
				{
					id: '3',
					name: '新时代下的互联网经济形势',
					image_name: "image3.jpg"
				}
			];
			let analysis_icon = [{
					background: "#72ACF6",
					icon_name: "综合",
				},
				{
					background: "#61C4E6",
					icon_name: "工业",
				},
				{
					background: "#76C1A1",
					icon_name: "农业",
				},
				{
					background: "#F3B861",
					icon_name: "服务业",
				},
				{
					background: "#EB8873",
					icon_name: "消费",
				},
				{
					background: "#C869A5",
					icon_name: "投资",
				},
				{
					background: "#8F8BE1",
					icon_name: "对外开放",
				},
				{
					background: "#757EDA",
					icon_name: "新经济",
				},
				{
					background: "#6C8DCF",
					icon_name: "绿色发展",
				},
				{
					background: "#8AA4D8",
					icon_name: "民生",
				}
			];
			let topic = [{
					title: "湖北高质量发展",
					image: "../../../static/topic/湖北高质量发展.png"
				},
				{
					title: "宏观形势分析",
					image: "../../../static/topic/宏观形势分析.png"
				},
				{
					title: "武汉供给测结构",
					image: "../../../static/topic/武汉供给测结构.png"
				},
				{
					title: "武汉工业经济发展",
					image: "../../../static/topic/武汉工业经济发展.png"
				}
			]
			return {
				slideshow: slideshow,
				analysis_icon: analysis_icon,
				topic: topic,
				indicatorDots: true, // 是否显示面板指示点
				autoplay: true, // 是否自动切换
				interval: 2000, // 自动切换时长
				duration: 500 // 切换时长
			};
		},
		onLoad: function() {
			let topic = this.topic;
			let t = [];
			let topic_id1 = Math.floor(Math.random() * 4);
			t.push(topic[topic_id1]);
			let topic_id2 = Math.floor(Math.random() * 4);
			// 防止出现重复的
			while (topic_id2 == topic_id1) {
				topic_id2 = Math.floor(Math.random() * 4);
			}
			t.push(topic[topic_id2]);
			this.topic = t;
		},
		methods: {
			open_analysis_list(e) {
				var analysisname = e.currentTarget.dataset.analysisname;
				uni.navigateTo({
					url: '../../analysis/list?analysisname=' + analysisname
				});
			},
			open_topic_list(e) {
				uni.navigateTo({
					url: '../../topic/list'
				});
			},
		}
	}
</script>

<style>
	.slide-image {
		width: 100%;
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
