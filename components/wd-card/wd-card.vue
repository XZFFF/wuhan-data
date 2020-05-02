<template>
	<view class="card-text-main">
		<view class="card-text-nav">
			<image src="../../static/icon/echarts/card.png"></image>
			<text>{{classTitle}}</text>
		</view>

		<scroll-view scroll-x="false" scroll-y="true" class="card-text-page">
			<rich-text :nodes="cardTextStr"></rich-text>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			classTitle: {
				type: String,
				default: '专题描述',
			},
			cardText: {
				type: String,
				default: '专题描述的内容',
			}
		},
		computed: {
			cardTextStr: function() {
				var _self = this;
				try {
					return '<ul>' + _self.cardText + '</ul>';
				} catch (e) {
					return _self.cardText;
				}
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
		display: flex;
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
		width: 90%;
		max-height: 100px;
		padding: 17upx 34upx;
		font-size: 26upx;
		word-wrap: break-word;
		word-break: normal;
	}
</style>
