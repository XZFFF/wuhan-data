<template>
	<view>
		<view class="top" style="height: 300upx; width: 100%; background-color: #1E90FF; margin-top: 0upx; display: flex;">
			<!-- 设置 -->
			<view class="setting" v-for="(value,key) in setting_button" :key="key" @click="goDetailPage(value)">
				<view class="text" style="color: #FFFFFF; font-size: 35upx;">{{value.title}}</view>
			</view>
			<!-- 个人信息 -->
			<view class="persional-information">
			</view>
		</view>
		<!-- 个人浏览 -->
		<view class="persional-browse">
			<view class="icon-single-layout" v-for="(value,key) in browse_icon" :key="key" @click="goDetailPage(value)">
				<view style="display: table">
					<cover-image style="width: 50upx; display:flex" :src="value.img"></cover-image>
					<view class="text" style="font-size:30upx; color:#1E90FF">{{value.title}}</view>
				</view>
			</view>
		</view>
		<!-- 菜单 -->
		<view class="menu">
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in menu_list" :key="key" @click="goDetailPage(value)">
					<view class="uni-list-cell-navigate uni-navigate-right uni-media-list">
						<view class="uni-media-list-logo">
							<image style="height: 60upx; width: 60upx; margin-top: 10upx" v-if="showImg" :src="value.img"></image>
						</view>
						<view class="uni-media-list-body" style="justify-content: center">
							<view class="uni-media-list-text" style="font-size: 35upx">{{value.title}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
					setting_button: [{
						title: "设置",
						url: "setting"
					}], 
					browse_icon: [{
					title: "收藏",
					url: "collection",
					img: "../../../static/icon/favorite.png"
				}, {
					title: "足迹",
					url: "footprint",
					img: "../../../static/icon/clock.png"
				}, {
					title: "消息",
					url: "news",
					img: "../../../static/icon/mail.png"
				},
				],
					
				title: 'list',
				showImg: false,
				menu_list: [
					{
					title: "手势密码",
					url: "gesture-password",
					img: "../../../static/icon/key.png"
				}, {
					title: "检查更新",
					url: "update",
					img: "../../../static/icon/update.png"
				}, {
					title: "关于我们",
					url: "about-us",
					img: "../../../static/icon/about.png"
				}, {
					title: "清除缓存",
					url: "clear-cache",
					img: "../../../static/icon/clear.png"
				},
				]
			};
		},
		onLoad() {
			setTimeout(() => {
				this.showImg = true;
			}, 400)
		},
		
		methods: {
			goDetailPage(e) {
				let path = e.url ? e.url : e;
				let url = ~path.indexOf('platform') ? path : '/pages/mine/' + path + '/' + path;
				uni.navigateTo({
					url: url
				});
				return false;
			}
		}
	}
</script>

<style>	

	.setting {
		margin-top: 7%;
		margin-left: 85%;
		
	}
	
	.persional-browse {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-top: 5upx;
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
	
	.menu{
		margin-top: 50upx;
	}
	
	.uni-list{
		height: 400upx;
	}
	
</style>
