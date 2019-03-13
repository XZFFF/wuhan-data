<template>
	<view class="uni-card">
		<view class="uni-card-content image-view">
			<cover-image :src="image" class="image"></cover-image>
		</view>
		<view class="uni-card-footer">
			<view class="uni-card-media-text-bottom" style="color: #2B2B2C;">{{title}}</view>
		</view>
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
		margin-left: 30upx;
		margin-right: 30upx;
	}

	.image-view {
		height: 350upx;
		overflow: hidden;
	}
	
	.image {
	    width: 690upx;
	}
</style>
