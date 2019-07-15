<template>
	<view class="card-text-main">
		<view class="card-text-nav">
			<image src="../../../static/icon/echarts/card.png"></image>
			<text>{{title}}</text>
		</view>

		<scroll-view scroll-x="false" scroll-y="true" class="card-text-page">
			{{cardText}}
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: '专题描述',
			},
			cardText: {
				type: String,
				default: '专题描述的内容',
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style>
	.card-text-main {
		margin-top: 30upx;
		display: flex;
		flex-direction: column;
		width: 100%;
		background-color: #FFFFFF;
	}

	.card-text-nav {
		width: 100%;
		height: 90upx;
		background-color: #FFFFFF;
		border-bottom-color: #E7E7E7;
		border-bottom-style: solid;
		border-bottom-width: 3upx;
	}

	.card-text-nav image {
		margin: 20upx 0upx 20upx 20upx;
		width: 50upx;
		height: 50upx;
	}

	.card-text-nav text {
		margin: auto 20upx;
		font-size: 14px;
	}

	.card-text-page {
		display: inline-block;
		width: 750upx;
		max-height: 200upx;
		padding: 15upx;
		font-size: 26upx;
		word-wrap: break-word;
		word-break: normal;
	}
</style>
