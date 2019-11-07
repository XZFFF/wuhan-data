<template>
	<view class="wd-list-item" @click="onClick">
		<view class="wd-list-item__container">
			<view class="wd-list-item__id">
				<view class="wd-list-item__id-background" :style="{'background':trendIdBackground}">
					<text class="wd-list-item__id-text">{{trendId}}</text>
				</view>
			</view>
			<!-- <view style="display: flex; flex-direction: column; justify-content: flex-start;"> -->
				<view class="wd-list-item__content" style="display: flex; flex-direction: row; justify-content: flex-start;font-size: 30upx;">
					<view class="wd-list-item__content-title" style="display: flex; align-items: center;max-width: 400upx;font-size: 30upx;">{{title}}</view>
					<view class="tag-view" style="display: flex; flex-direction: row;">
						<wd-tag :text="trendSource" size="small" :circle="true"></wd-tag>
					</view>
				</view>
				<!-- <view style="color: #666666;font-size: 20upx;max-width: 500upx;font-family:'Courier New', Courier, monospace;">地区生产总值(GDP)-三次产业-第三产业-地区生产总值(GDP)-三次产业-第三产业</view> -->
			<!-- </view> -->
			<view class="wd-list-item__extra">
				<text style="margin-left: 6upx; margin-right: 10upx; font-size: 11px;">{{trendRate}}</text>
				<image v-if="trendArrow === 'up'" src="../../../static/icon/search/up.png" style="height: 35upx; width: 35upx;"></image>
				<image v-if="trendArrow === 'down'" src="../../../static/icon/search/down.png" style="height: 35upx; width: 35upx;"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import wdTag from '@/components/wd-tag/wd-tag.vue';

	export default {
		components: {
			wdTag
		},
		props: {
			trendId: String, //序号
			title: String, //列表标题
			trendArrow: String,
			trendRate: String, // 趋势数据
			trendSource: String // 趋势来源
		},
		computed: {
			trendIdBackground() {
				let backgroundColor = '#595E66';
				switch (this.trendId) {
					case '1':
						backgroundColor = '#CC3E3E';
						break;
					case '2':
						backgroundColor = '#FD6E2E';
						break;
					case '3':
						backgroundColor = '#FF9800';
						break;
					default:
						backgroundColor = '#595E66';
						break;
				}
				return backgroundColor;
			}
		},
		data() {
			return {

			};
		},
		methods: {
			onClick() {
				this.$emit('click')
			}
		}
	}
</script>

<style>
	@charset "UTF-8";

	.wd-list-item {
		font-size: 32upx;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center
	}

	.wd-list-item__container {
		padding: 24upx 30upx;
		width: 100%;
		box-sizing: border-box;
		flex: 1;
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center
	}

	.wd-list-item__container:after {
		position: absolute;
		z-index: 3;
		right: 0;
		bottom: 0;
		left: 30upx;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc
	}

	.wd-list-item__id {
		margin-right: 22upx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center
	}


	.wd-list-item__id-background {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 40upx;
		width: 40upx;
		background: #007AFF;
		border-radius: 50%;
	}

	.wd-list-item__id-text {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 40upx;
		width: 40upx;
		font-size: 12px;
		color: #FFFFFF;
	}

	.wd-list-item__content {
		flex: 1;
		overflow: hidden;
		display: flex;
		flex-direction: column
	}

	.wd-list-item__content-title {
		font-size: 32upx;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: inherit;
		line-height: 1.5;
		overflow: hidden
	}

	.wd-list-item__extra {
		width: 15%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center
	}

	.tag-view {
		margin: auto 20upx;
		display: inline-block;
	}
</style>
