<template>
	<view>
		<!-- 轮播图 -->
		<view>
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<view v-for="(item,index) in slideshow" :key="index">
							<swiper-item>
								<image :src="item.image_url" class="slide-image" mode="center"></image>
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
		<!-- 经济分析icon -->
		<view class="icon-layout">
			<view class="icon-single-layout" v-for="(item,index) in analysis_icon" :key="index">
				<cover-image style="width: 50upx;" :src="item"></cover-image>
			</view>
		</view>
		<!-- 底部布局 -->
		<view style="height: 100upx; width: 100%;background-color: #00B26A;position: fixed;bottom: 20upx;">
		</view>
	</view>
</template>

<script>
	import uniIcon from '../../../components/uni-icon/uni-icon.vue';
	export default {
		components: {
			uniIcon
		},
		data() {
			// TODO 这里应该改成动态获取接口
			let slideshow = [{
					id: '1',
					name: '全国经济进入新常态',
					image_url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552393018721&di=f9f33a37f5caa9a75af34c3ddfcfeef8&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01b5555a0d934ca80121985ce63b3b.jpg%401280w_1l_2o_100sh.jpg"
				},
				{
					id: '2',
					name: '大数据专题分析报告',
					image_url: "https://img.zcool.cn/community/01f1b05a0d9354a80121985cbef4da.jpg@1280w_1l_2o_100sh.jpg"
				},
				{
					id: '3',
					name: '新时代下的互联网经济形势',
					image_url: "https://img.zcool.cn/community/0170555a0d9350a80121985ca70245.jpg@1280w_1l_2o_100sh.jpg"
				}
			];
			let analysis_icon = [
				"../../../static/icon/home-active.png",
				"../../../static/icon/home-active.png",
				"../../../static/icon/home-active.png",
				"../../../static/icon/home-active.png",
				"../../../static/icon/home-active.png",
				"../../../static/icon/home-active.png",
				"../../../static/icon/home-active.png",
				"../../../static/icon/home-active.png",
				"../../../static/icon/home-active.png",
				"../../../static/icon/home-active.png"
			];
			return {
				slideshow: slideshow,
				analysis_icon: analysis_icon,
				indicatorDots: true, // 是否显示面板指示点
				autoplay: true, // 是否自动切换
				interval: 2000, // 自动切换时长
				duration: 500 // 切换时长
			};
		},
		onLoad: function() {},
		methods: {}
	}
</script>

<style>
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
		margin-top: 20upx;
		padding: 5upx;
		background-color: #FFFFFF;
	}

	.icon-single-layout {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20%;
		padding-top: 20upx;
		padding-bottom: 20upx;
	}
</style>
