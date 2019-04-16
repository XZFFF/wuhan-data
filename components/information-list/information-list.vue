<template>
	<view class="uni-list-cell" style="height: 80upx;">
		<view class="uni-media-list" style="display: inline-block;">
			<view class="title" style="font-size: 30upx;float: left;">{{title}}</view>
			<view class="content">{{content}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
		    title: String,
			content: String,
		}
	}
</script>

<style>
	.content{
		float: right;
		color: #868686;
		font-size: 25upx;
		align-content: center;
		justify-content: center;
	}
</style>
