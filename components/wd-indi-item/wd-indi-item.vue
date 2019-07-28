<template>
	<view class="index-item">
		<!-- 指标起始竖条 -->
		<view class="index-item-start-bar"></view>
		<view class="index-item-name" @tap="openDetail(indexId, indexName, isFavorite, source)">
			<text>{{tranIndexName}}</text>
		</view>
		<!-- <wd-tag :text="item.source" size="small" :circle="true"></wd-tag> -->
		<!-- 指标描述 蓝#4F90F8 红#CE7670 #C45C56 -->
		<!-- <view class="index-item-desc" @tap="openDetail(indexId, indexName, isFavorite)">
			<view class="index-item-desc-item" v-for="(item, i) in desc" :key="i">
				<text>{{item.descName}}:</text>
				<text style="margin-left: 5upx; color: #C45C56;">{{item.descNum}}</text>
				<text style="margin-left: 10upx;">{{item.descUnit}}</text>
			</view>
		</view> -->
		<view class="index-item-end-bar"></view>
		<view class="index-item-fav" @tap="changeFav">
			<image class="" :src="'../../../static/icon/fav/'+favIcon"></image>
		</view>
	</view>
</template>

<script>
	import wdTag from '@/components/wd-tag/wd-tag.vue';
	export default {
		components: {
			wdTag,
		},
		props: {
			item: {
				type: Object
			},
			indexId: {
				type: String,
				default: "1000"
			},
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
			},
			source: {
				type: String,
				default: '未知来源'
			}
		},
		computed: {
			tranIndexName() {
				if (this.indexName.length > 10) {
					let newstr = this.indexName.substring(0, 13) + '..';
					return newstr;
				} else {
					return this.indexName
				}
			},
			favIcon() {
				if (this.isFavorite) {
					return 'favorite-active.png';
				} else {
					return 'favorite-orgin.png';
				}
			}
		},
		data() {
			return {

			};
		},
		methods: {
			// 跳转到指标详情页
			openDetail(indexId, indexName, isFavorite, source) {
				uni.navigateTo({
					url: '../../analysis/detail/detail?indexId=' + indexId + '&indexName=' + indexName + '&isFavorite=' + isFavorite +
						'&source=' + source
				});
			},
			changeFav() {
				this.isFavorite = !this.isFavorite;
				if (this.isFavorite == false) {
					uni.showToast({
						title: "已取消收藏",
						icon: "none",
						duration: 1000,
					})
				} else {
					uni.showToast({
						title: "收藏成功",
						icon: "none",
						duration: 1000,
					})
				}
			}
		}
	}
</script>

<style>
	.index-item {
		display: flex;
		width: 90%;
		height: 120upx;
		margin: 40upx auto;
		background: #FFFFFF;
		box-shadow: 2px 2px 1px #aaaaaa;
	}

	.index-item-start-bar {
		background: #7DACF0;
		width: 5upx;
		height: 100%;
	}

	.index-item-name {
		position: relative;
		margin: 20upx 10upx 20upx 20upx;
		width: 50%;
		max-width: 50%;
	}

	.index-item-name text {
		font-size: 13px;
		position: absolute;
		left: 55%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		line-height: 1.5;
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
