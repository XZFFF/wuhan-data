<template>
	<view class="uni-card">
		<view class="uni-card-content image-view">
			<image :src="image" class="image"></image>
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
		margin-left: 40upx;
		margin-right: 40upx;
		border-radius:15px 15px 0 0;
	}

	.image-view {
		height: 350upx;
		border-radius:15px 15px 0 0;
		overflow: hidden;
	}
	
	.image {
	    width: 670upx;
		border-radius:15px 15px 0 0;
	}
</style>
