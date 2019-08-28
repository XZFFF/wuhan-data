<template>
	<view class="uni-card">
		<image :src="image" class="image-view"></image>
		<!-- <view class="uni-card-footer">
			<view class="uni-card-media-text-bottom" style="color: #2B2B2C; font-size: 18px; font-weight: bold;">{{title}}</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		props: {
			/**
			 * 图片链接
			 */
			image: String,
			/**
			 * 标题
			 */
			title: String,
		}
	}
</script>

<style>
	.uni-card {
		display:flex;
		height: 175upx;
		width: 335upx;
		margin: 0upx 20upx 25upx 20upx;
		padding: 0;
		border-radius: 5px 5px 5px 5px;
	}

	.image-view {
		height: 175upx;
		width: 335upx;
		margin: 0;
		border-radius: 5px 5px 5px 5px;
		overflow: hidden;
	}
</style>
