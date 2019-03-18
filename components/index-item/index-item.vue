<template>
	<view class="index-item">
		<!-- 指标起始竖条 -->
		<view class="index-item-start-bar"></view>
		<view class="index-item-name">
			<text>{{indexName}}</text>
		</view>
		<!-- 指标描述 -->
		<view class="index-item-desc">
			<view class="index-item-desc-item" v-for="(item, i) in desc" :key="i">
				<text>{{item.descName}}:</text>
				<!-- 蓝#4F90F8 红#CE7670 #C45C56 -->
				<text style="color: #C45C56;">{{item.descNum}}</text>
				<text>{{item.descUnit}}</text>
			</view>
		</view>
		<view class="index-item-end-bar"></view>
		<view class="index-item-fav">
			<image class="" src="../../static/icon/favorite-orgin.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			//指标名称
			indexName: {
				type: String,
				default: '指标名称'
			},
			// 指标说明
			desc: {
				type: Array,
				default: function(e) {
					return [{
						'descName': '累积量',
						'descNum': '0',
						'descUnit': '亿元'
					}]
				}
			},
			// 是否收藏
			isFavorite: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style>
	.index-item {
		display: flex;
		width: 90%;
		height: 110upx;
		margin: 30upx auto;
		background: #FFFFFF;
	}

	.index-item-start-bar {
		background: #7DACF0;
		width: 5upx;
		height: 100%;
	}

	.index-item-name {
		position: relative;
		margin: 20upx 10upx 20upx 20upx;
		width: 30%;
		max-width: 30%;
	}

	.index-item-name text {
		font-size: 11px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		line-height: 1;
		word-wrap: break-word;
		overflow: auto;
	}

	.index-item-desc {
		display: flex;
		flex-direction: column;
		margin: 18upx 10upx;
		max-width: 50%;
	}

	.index-item-desc-item {
		display: flex;
		flex: 1;
		align-items: center;
	}

	.index-item-desc-item text {
		font-size: 11px;
	}

	.index-item-end-bar {
		margin: auto 0 auto auto;
		width: 3upx;
		height: 80%;
		background: #F0F0F0;
	}

	.index-item-fav {
		margin: auto 25upx auto 25upx;
	}

	.index-item-fav image {
		width: 50upx;
		height: 50upx;
	}
</style>
