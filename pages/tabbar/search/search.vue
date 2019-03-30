<template>
	<view>
		<uni-nav-bar color="#333333" background-color="#FFFFFF" fixed="false" right-icon="scan" @click-left="showCity"
		 @click-right="scan">
			<block slot="left">
				<view class="city">
					<text>{{city}}</text>
					<uni-icon type="arrowdown" color="#333333" size="22"></uni-icon>
				</view>
			</block>
			<view class="input-view">
				<uni-icon type="search" size="22" color="#666666"></uni-icon>
				<input confirm-type="search" @confirm="confirm" class="input" type="text" placeholder="输入搜索关键词" />
			</view>
		</uni-nav-bar>
	</view>
</template>

<script>
	import uniNavBar from '../../../components/uni-nav-bar/uni-nav-bar.vue'
	import uniIcon from '../../../components/uni-icon/uni-icon.vue'
	
	export default {
		components: {
			uniNavBar,
			uniIcon
		},
		data() {
			return {
				city: '北京'
			};
		},
		onLoad() {
			uni.showToast({
				title: "该模块正在开发中...",
				icon: "none",
				duration: 1000,
			})
		},
		methods: {
			search() {
				uni.showToast({
					title: '搜索'
				})
			},
			showCity() {
				uni.showToast({
					title: '选择城市'
				})
			},
			scan() {
				uni.showToast({
					title: '扫码'
				})
			},
			confirm() {
				uni.showToast({
					title: '搜索'
				})
			}
		}
	}
</script>

<style>
	.input-view {
		width: 92%;
		display: flex;
		background-color: #e7e7e7;
		height: 30px;
		border-radius: 15px;
		padding: 0 4%;
		flex-wrap: nowrap;
		margin: 7px 0;
		line-height: 30px;
	}

	.input-view .uni-icon {
		line-height: 30px !important;
	}

	.input-view .input {
		height: 30px;
		line-height: 30px;
		width: 94%;
		padding: 0 3%;
	}
</style>
