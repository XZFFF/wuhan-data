<template>
	<view>
		<view style="height: 23%; width: 100%;background-color: #1E90FF;position: fixed;top: 0upx;">
			<!-- 设置 -->
			<view class="setting" style="padding-top: 10upx;" >
				设置
			</view>
			<!-- 个人信息 -->
			<view class="persional-information">
			</view>
		</view>
		<!-- 个人浏览 -->
		<view class="persional-browse">
			<view class="icon-single-layout" v-for="(item,index) in browse_icon" :key="index">
				<cover-image style="width: 50upx;" :src="item"></cover-image>
			</view>
		</view>
		<!-- 菜单 -->
		<view class="menu">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			let browse_icon = [
				"../../../static/icon/favorite.png",
				"../../../static/icon/clock.png",
				"../../../static/icon/mail.png"
			];
			let menu_list = [{
				name: '手势密码',
				//url: 'gesture-password'
			}, {
				name: '检查更新',
				//url: 'update'
			}, {
				name: '关于我们',
				//url: 'about'
			}, {
				name: '清除缓存',
				//url: 'clear-cache'
			}];
			return {
				browse_icon: browse_icon

			};
		}
	}
</script>

<style>
	.title {
		display: flex;
		padding-top: 8%;
		margin-left: auto;
		color: #FFFFFF;
		font-size: 40upx;
	}

	.setting {
		padding-top: 5%;
		margin-left: 80%;
		color: #FFFFFF;
		font-size: 30upx;
	}

	.persional-browse {
		display: flex;
		flex-direction: row;
		margin-top: 25%;
		padding: 5upx;
		background-color: #FFFFFF;
	}

	.icon-single-layout {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 33%;
		padding-top: 20upx;
		padding-bottom: 20upx;
	}
</style>
