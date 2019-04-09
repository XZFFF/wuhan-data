<template>
	<view>
		<!-- 账户信息 -->
		<view style="padding: 35upx 30upx 0;">
			<text style="color: #868686; font-size: 32upx; ">账户信息</text>
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in list" :key="key">
					<view class="uni-list-cell-navigate uni-navigate-right uni-media-list">
						<view class="uni-media-list-logo">
							<image v-if="showImg" :src="value.img"></image>
						</view>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">{{value.title}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
	
</style>
