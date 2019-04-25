<template>
	<view>
		<view class="tops" style=" background-color: #3A82CC;height: 180upx; ">
			<!-- 个人信息栏 -->
			<view class="personal" style="color: #FFFFFF;"  v-for="(value,key) in personal_information" :key="key" @click="goDetailPage(value)">
				<view class="uni-list-cell-navigate uni-media-list" style="; width: 100%;"> 
					<image class="head" src="../../../static/icon/mine/head.png"></image>
					<view class="information">
						<view class="name-rank" style="display: inline-block;">
							<view class="name" style="font-size: 35upx;float: left;margin-top: 15upx;">
								李晓华
							</view>
							<view class="rank">
								<text style="font-size: 28upx;">
									处长
								</text>
							</view>
						</view>
						<view class="tel" style="font-size: 30upx;">
							181 **** 0000
						</view>
					</view>
				<view class="right-arrow"></view>	
				</view>
			</view>
		</view>
		<!-- 个人浏览 -->
		<view class="personal-browse">
			<view class="icon-single-layout" v-for="(value,key) in browse_icon" :key="key" @click="goDetailPage(value)">
				<view style="display: table">
					<span :class="['red-point',tabIndex==key ? 'active' : '']"></span>
					<image style="width: 50upx; height: 50upx; display:flex" :src="value.img"></image>
					<view class="text" style="font-size:30upx; color:#1E90FF">{{value.title}}</view>
				</view>
			</view>
		</view>
		<!-- 菜单 -->
		<view class="menu">
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in menu_list" :key="key" @click="goDetailPage(value)">
					<view class="uni-list-cell-navigate uni-navigate-right uni-media-list" style="padding: 0 30upx;">
						<view class="uni-media-list-logo">
							<image style="height: 50upx; width: 50upx; margin-top: 20upx;" v-if="showImg" :src="value.img"></image>
						</view>
						<view class="uni-media-list-body" style="justify-content: center">
							<view class="uni-media-list-text" style="font-size: 35upx">{{value.title}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部 -->
		<view class="bottom-text">
			武汉市发展与改革委员会<br/>
			All rights reserved ©2019
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex: 2,
				title: 'list',
				showImg: false,
					personal_information: [{
						url: "information"
					}], 
					browse_icon: [{
					title: "收藏",
					url: "collection",
					img: "../../../static/icon/mine/favorite.png"
				}, {
					title: "足迹",
					url: "footprint",
					img: "../../../static/icon/mine/clock.png"
				}, {
					title: "消息",
					url: "news",
					img: "../../../static/icon/mine/mail.png"
				},
				],
					
				menu_list: [
					 {
					title: "检查更新",
					url: "update",
					img: "../../../static/icon/mine/update.png"
				},{
					title: "清除缓存",
					url: "clear_cache",
					img: "../../../static/icon/mine/clear.png"
				},{
					title: "分享应用",
					url: "share_app",
					img: "../../../static/icon/mine/share.png"
				},{
					title: "关于我们",
					url: "about_us",
					img: "../../../static/icon/mine/about.png"
				},{
					title: "问题反馈",
					url: "help_feedback",
					img: "../../../static/icon/mine/feedback.png"
				},
				],
				
				exit: [{
					url: "login",
				}
				]
			};
		},
		onLoad() {
			setTimeout(() => {
				this.showImg = true;
			}, 400)
		//#ifdef APP-PLUS  
		var server = "https://www.example.com/update"; //检查更新地址  
		var req = { //升级检测数据  
			"appid": plus.runtime.appid,  
			"version": plus.runtime.version  
		};
		uni.request({  
			url: server,  
			data: req,  
			success: (res) => {
				if (res.statusCode == 200 && res.data.status === 1) {  
					uni.showModal({ //提醒用户更新  
						title: "更新提示",  
						content: res.data.note,  
						success: (res) => {
							if (res.confirm) {  
								plus.runtime.openURL(res.data.url);  
							}  
						}  
					})  
				}  
			}  
		})  
		//#endif 
		},
		
		methods: {
			goDetailPage(e) {
				let path = e.url ? e.url : e;
				let url = ~path.indexOf('platform') ? path : '../../mine/' + path + '/' + path;
				uni.navigateTo({
					url: url
				});
				return false;
			},
		}
	}
</script>

<style>	
	
	.personal{
		height: 200upx;
	}
	
	.head{
		width: 110upx;
		height: 110upx;
		float: left;
		border-radius:100%; 
		overflow:hidden;
	}
	
	.information{
		font-size:35upx;
		width: 500upx;
		display: inline-block;
	}
	
	.rank{
		width: 80upx; 
		height: 40upx;
		margin-left: 15upx;
		margin-top: 25upx;
		background-color: rgba(255, 255, 255, 0.11); 
		border-color: rgba(255, 255, 255, 0.2); 
		border-radius: 10px; 
		border-width: 1px; 
		float: left;
		border-style: solid; 
		text-align: center; 
		line-height: 20px; 
	}
	
	.personal-browse {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-top: 5upx;
		padding: 5upx;
		background-color: #FFFFFF;
	}
	.right-arrow {
		float: right;
		width: 8px;
		height: 8px;
		margin-right: 5px;
		border-width: 2px 2px 0 0;
		border-color: #FFFFFF;
		border-style: solid;
		transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
	}
	
	.icon-single-layout {
		display: flex;
		justify-content: center;
		width: 33%;
		padding-top: 20upx;
		padding-bottom: 20upx;
	}
	
	.menu{
		margin-top: 50upx;
	}
	
	.uni-list-cell{
		padding-top: 4px;
		padding-bottom: 4px;
	}
	
	.bottom-text{
		margin-top: 100upx;
		font-size: 25upx;
		text-align: center;
		color: #CDCDCD;
	}
	
	.active{
    position: absolute;
	margin-left: 35upx;
	margin-top: 5upx;
    width: 15upx;
    height: 15upx;
    background: red;
    border-radius: 50%;
	}
	
</style>
