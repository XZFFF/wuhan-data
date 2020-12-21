<template>
	<view>
		<view>
			<mpvue-gesture-lock :containerWidth="590" :cycleRadius="70" @end="onEnd" :password="password"></mpvue-gesture-lock>
		</view>
		<view class="uni-text">{{text}}</view>
	</view>
</template>

<script>
	import mpvueGestureLock from '@/components/mpvueGestureLock';

	export default {
		components: {
			mpvueGestureLock
		},
		data() {
			return {
				title: "手势图案",
				password: [],
				text: '请输入手势密码'
			}
		},
		methods: {
			onEnd(data) {
				if (uni.getStorageSync('lock') === data.join('')) {
					this.text = '手势密码正确'
					uni.redirectTo({
						url: '../news/news'
					})
				} else {
					this.text = '手势密码错误，请重试'
				}

			}
		}
	}
</script>

<style>
	.uni-text {
		font-size: 30upx;
		text-align: center;
		margin-top: 30upx;
	}
</style>
