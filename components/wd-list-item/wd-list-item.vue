<template>
	<view class="wd-list-item" @click="onClick">
		<view class="wd-list-item__container">
			<view class="wd-list-item__content">
				<view class="wd-list-item__content-title">{{title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: String
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
</style>
