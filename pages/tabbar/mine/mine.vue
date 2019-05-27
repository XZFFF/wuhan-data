<template>
	<view>
		<view class="tops" style=" background-color: #3A82CC;height: 180upx; ">
			<!-- 个人信息栏 -->
			<view class="personal" style="color: #FFFFFF;"  v-for="(value,index) in personal_information" :key="index" @click="goDetailPage(value)">
				<view class="uni-list-cell-navigate uni-media-list" style="; width: 100%;"> 
					<image class="head" src="../../../static/icon/mine/head.png"></image>
					<view class="information" v-for="(user,key) in userInformation" :key="key">
						<view class="name-rank" style="display: inline-flex;">
							<view class="username" style="font-size: 35upx;float: left;margin-top: 15upx;">
								{{user.username}}
							</view>
							<view class="rank">
								{{user.rank}}
							</view>
						</view>
						<view class="tel" style="font-size: 30upx;">
							{{user.tel}}
						</view>
					</view>
				<view class="right-arrow"></view>	
				</view>
			</view>
		</view>
		<!-- 个人浏览 -->
		<view class="personal-browse">
			<view class="icon-single-layout" v-for="(value,index) in browse_icon" :key="index" @click="goDetailPage(value)">
				<view style="display: table">
					<span :class="['red-point',tabIndex==index ? 'active' : '']"></span>
					<image style="width: 50upx; height: 50upx; display:flex" :src="value.img"></image>
					<view class="text" style="font-size:30upx; color:#1E90FF">{{value.title}}</view>
				</view>
			</view>
		</view>
		<!-- 菜单 -->
		<view class="menu">
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in menu_list" :key="key" @click="goDetailPage1(value)">
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
			<uni-popup :show="type === 'bottom-share'" position="bottom" @hidePopup="togglePopup('')">
				<view class="bottom-title">分享到</view>
				<view class="bottom-content">
					<view class="bottom-content-box" v-for="(item, index) in bottomData" :key="index">
						<view class="bottom-content-image" :class="item.name">
							<image class="icon" style="height: 90upx; width: 90upx;" :src="item.img" @click="share(item)" ></image>
						</view>
						<view class="bottom-content-text">{{item.text}}</view>
					</view>
				</view>
				<view class="bottom-btn" @click="togglePopup('')">取消分享</view>
			</uni-popup>
		</view>
		<!-- 底部 -->
		<view class="bottom-text">
			武汉市发展与改革委员会<br/>
			All rights reserved ©2019
		</view>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				tabIndex: 2,
				title: 'list',
				showImg: true,
				type: '',
				personal_information: [{
					url: "information"
				}], 
				userInformation:[],
				bottomData: [{
						text: '微信',
						img: '../../../static/icon/mine/wechatfriend.png',
						name: 'wx'
					},
					{
						text: '朋友圈',
						img: '../../../static/icon/mine/wechatmoments.png',
						name: 'wx'
					},
					{
						text: 'QQ',
						img: '../../../static/icon/mine/qq.png',
						name: 'qq'
					},
					{
						text: '微博',
						img: '../../../static/icon/mine/weibo.png',
						name: 'weibo'
					},
					{
						text: '复制',
						img: '../../../static/icon/mine/copyurl.png',
						name: 'copy'
					},
					{
						text: '更多',
						img: '../../../static/icon/mine/more.png',
						name: 'more'
					}
				],
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
				},],
					
				menu_list: [
					{
					id: 0,
					title: "检查更新",
					url: "update",
					img: "../../../static/icon/mine/update.png"
				},{
					id: 1,
					title: "清除缓存",
					url: "clear_cache",
					img: "../../../static/icon/mine/clear.png"
				},{
					id: 2,
					title: "分享应用",
					url: "share_app",
					img: "../../../static/icon/mine/share.png"
				},{
					id: 3,
					title: "关于我们",
					url: "about_us",
					img: "../../../static/icon/mine/about.png"
				},{
					id: 4,
					title: "问题反馈",
					url: "help_feedback",
					img: "../../../static/icon/mine/feedback.png"
				},
				],
				exit: [{
					url: "login",
				}]
			};
		},
		onLoad() {
			setTimeout(() => {
				this.showImg = true;
			}, 400);
		},
		onLoad:function(){
			try {
					const userInfo = uni.getStorageSync('user_Info');
					if (userInfo) {
						this.userInformation = userInfo
					} else {
						this.initUserInformation();
					}
				} catch (e) {
					console.log('无法从本地缓存获取相应数据');
				}
			this.checkNetwork();
			this.initUserInformation();
		},
		onBackPress() {
			if (this.type !== '') {
				this.type = '';
				return true;
			}
		},
		methods: {
			checkNetwork() {
				uni.getNetworkType({
					success: function(res) {
						console.log(res.networkType);
						if (res.networkType == 'none') {
							console.log('network:' + res.networkType);
							uni.showToast({
								title: '无网络连接',
								duration: 1000,
								icon: 'loading'
							});
						}
					}
				});
			},
			initUserInformation() {
				uni.request({
					url: 'http://192.168.43.119/personInfo.php',
					method: 'GET',
					data: {},
					success: res => {
						this.userInformation = res.data;
						console.log(this.userInformation);
						uni.setStorage({
							key: 'user_Info',
							data: this.userInformation,
							success: function() {
								console.log('成功请求个人信息数据并存入本地缓存');
							}
						});
					},
					fail: (e) => {},
					complete: () => {}
				});
			},
			goDetailPage(e) {
				let path = e.url ? e.url : e;
				let url = ~path.indexOf('platform') ? path : '../../mine/' + path + '/' + path;
				uni.navigateTo({
					url: url
				});
				return false;
			},
			goDetailPage1(e) {
				if(e.id == 0){
					//#ifdef APP-PLUS
					var req = { //升级检测数据  
						"appid": "__UNI__123456",  
						"version": "1.0.0"
					}; 
					uni.request({  
						url: "http://192.168.43.119/checkUpdate.php",  
						data: req,
						success: (res) => {
							let updateUrl = res.data.url;
							if (res.statusCode == 200 && res.data.status === 1) {
								uni.showModal({ //提醒用户更新  
									title: "更新提示",
									content: res.data.note,
									success: (res) => {
										const downloadTask = uni.downloadFile({
											url: updateUrl, //仅为示例，并非真实的资源
											success: (res) => {
												console.log(updateUrl);
												if (res.statusCode === 200) {
													console.log('下载成功');
												}
											}
										});
										downloadTask.onProgressUpdate((res) => {
											console.log('下载进度' + res.progress);
											console.log('已经下载的数据长度' + res.totalBytesWritten);
											console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
											// 测试条件，取消下载任务。
											if (res.progress > 50) {
												downloadTask.abort();
											}
										});
									}
								})
							}
							else if(res.data.status === 0)
							{
								uni.showModal({
									title: "已为最新版本，无需更新"
								})
							}
						},
						fail: () => {
							uni.showModal({
								title: "网络错误",
								icon: none,
							})
						}
					})
					//#endif
				}
				else if(e.id == 1){
					
				}
				else if(e.id == 2){
					this.togglePopup('bottom-share');
				}
				else
				{
					let path = e.url ? e.url : e;
					let url = ~path.indexOf('platform') ? path : '../../mine/' + path + '/' + path;
					uni.navigateTo({
						url: url
					});
					return false;
				}
			},
			togglePopup(type) {
				this.type = type;
			},
			share(e) {
				var pro;
				var sce;
				if(e.text === "微信")
				{
					pro = "weixin";
					sce = "WXSceneSession";
				}
				else if(e.text === "朋友圈")
				{
					pro = "weixin";
					sce = "WXSenceTimeline";
				}
				else if(e.text === "QQ")
				{
					pro = "qq";
					sce = "";
				}
				else if(e.text === "微博")
				{
					pro = "sinaweibo";
					sce = "";
				}
					uni.share({
						provider: pro,
						service: sce,
						href: "https://www.baidu.com",
						type: 2,
						title: "数说武汉",
						summary: "数说武汉app测试",
						imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
						success: function (res) {
							console.log("success:" + JSON.stringify(res));
						},
						fail: function (err) {
							console.log("fail:" + JSON.stringify(err));
						}
					})
			}
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
		padding: 2upx 10upx;
		margin-left: 15upx;
		margin-top: 20upx;
		background-color: rgba(255, 255, 255, 0.11); 
		border-color: rgba(255, 255, 255, 0.2); 
		border-radius: 10px; 
		border-width: 1px; 
		float: left;
		border-style: solid; 
		text-align: center; 
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
	
	.bottom-title {
		line-height: 60upx;
		font-size: 24upx;
		padding: 15upx 0;
	}
	
	.bottom-content {
		display: flex;
		flex-wrap: wrap;
		padding: 0 35upx;
	}
	
	.bottom-content-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 15upx;
		width: 25%;
		box-sizing: border-box;
	}
	
	.bottom-content-image {
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		border-radius: 10upx;
	}
	
	.bottom-content-text {
		font-size: 26upx;
		color: #333;
		margin-top: 10upx;
	}
	
	.bottom-btn {
		height: 90upx;
		line-height: 90upx;
	}
		
	
</style>
