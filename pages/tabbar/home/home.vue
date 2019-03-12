<template>
	<view>
		<!-- 轮播图 -->
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<!-- 动态循环展示轮播图 -->
						<view v-for="(item,index) in slideshow" :key="index">
							<swiper-item>
								<image :src="item.image_url" class="slide-image" mode="center"></image>
							</swiper-item>
						</view>
					</swiper>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
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

</style>
