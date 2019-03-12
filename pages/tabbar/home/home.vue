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
		<view style="margin-top: 20upx; padding: 5upx; background-color: #FFFFFF;">
			<view class="header">
				<view class="input-view">
					<uni-icon type="search" size="22" color="#666666"></uni-icon>
					<input confirm-type="search" @confirm="confirm" class="input" type="text" placeholder="输入搜索关键词" />
				</view>
			</view>
		</view>
		<view style="margin-top: 20upx; padding: 5upx; background-color: #FFFFFF;display: flex;flex-direction: row;flex-wrap: wrap;">
			<view class="" style="width: 25%; height: 50%;display: flex; align-items: center;justify-content: center;padding: 20upx;">
				<cover-image style="width: 50upx;" src="../../../static/icon/home-active.png"></cover-image>
			</view>
			<view class="" style="width: 25%; height: 50%;display: flex; align-items: center;justify-content: center;">
				<cover-image style="width: 50upx;" src="../../../static/icon/home-active.png"></cover-image>
			</view>
			<view class=""></view>
			<view class=""></view>
			<view class=""></view>
		</view>
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
			const slideshow = [{
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
			return {
				slideshow: slideshow,
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
	.header {
		display: flex;
		flex-direction: row;
		padding: 10px 15px;
		align-items: center;
	}

	.input-view {
		display: flex;
		align-items: center;
		flex-direction: row;
		background-color: #e7e7e7;
		height: 30px;
		border-radius: 15px;
		padding: 0 10px;
		flex: 1;
	}

	.input {
		flex: 1;
		padding: 0 5px;
		height: 24px;
		line-height: 24px;
		font-size: 16px;
	}

	.icon {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 10px;
	}
</style>
