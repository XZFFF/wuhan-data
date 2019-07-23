<template>
	<view>
		<view class="tops" style=" background-color: #3A82CC;height: 180upx; ">
			<!-- 个人信息栏 -->
			<view class="personal" style="color: #FFFFFF;" @click="goUserDetail()" v-if="token">
				<view class="uni-list-cell-navigate uni-media-list" style="width: 100%;">
					<image class="head" :src="user.head"></image>
					<view class="information">
						<view class="name-rank" style="display: inline-flex;">
							<view v-if="user.realName" class="username" style="font-size: 35upx;float: left;margin-top: 15upx;">
								{{user.realName}}
							</view>
							<view v-if="user.roleName" class="rank">
								{{user.roleName}}
							</view>
						</view>
						<view v-if="user.tel" class="tel" style="font-size: 30upx;">
							{{user.tel}}
						</view>
					</view>
					<view v-if="user.userId" class="right-arrow"></view>
				</view>
			</view>
			<view class="loginPrompt" v-if="!token" @click="goLogin(e)">
				<image class="head" src="../../../static/icon/mine/head.png"></image>
				<font style="margin-left: 20upx; line-height: 110upx;text-align: center;">
					点击进行登录
				</font>
			</view>
		</view>
		<!-- 个人浏览 -->
		<view class="personal-browse">
			<view class="icon-single-layout" v-for="(value,index) in browse_icon" :key="index" @click="goDetailPage(value)">
				<view style="display: table">
					<span :class="['red-point',index == 2 ? 'active' : '']"></span>
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
			<uni-popup :show="type === 'middle-update'" position="middle" mode="fixed" @hidePopup="togglePopup('')">
				<view style="height: 330upx;width: 450upx;">
					<view style="font-size: 35upx;">更新提示</view>
					<view style="margin-top: 20upx;margin-bottom: 20upx;height: 150upx;">{{updateText}}</view>
					<input type="button" class="pop-button" value="下载" @click="Update()" />
					<input type="button" class="pop-button" style="float: right;" value="取消" @click="togglePopup('')" />
				</view>
			</uni-popup>
			<uni-popup :show="type === 'middle-download'" position="middle" mode="fixed" @hidePopup="togglePopup('')">
				<view style="height: 200upx;width: 400upx;">
					<view>下载进度</view>
					<view class="progress-box">
						<progress :percent="downProgress" show-info stroke-width="3" />
					</view>
					<input type="button" class="pop-button" style="float: right;" value="取消" @click="togglePopup('')" />
				</view>
			</uni-popup>
			<uni-popup :show="type === 'bottom-share'" position="bottom" @hidePopup="togglePopup('')">
				<view class="bottom-title">分享到</view>
				<view class="bottom-content">
					<view class="bottom-content-box" v-for="(item, index) in bottomData" :key="index">
						<view class="bottom-content-image" :class="item.name">
							<image class="icon" style="height: 90upx; width: 90upx;" :src="item.img" @click="share(item)"></image>
						</view>
						<view class="bottom-content-text">{{item.text}}</view>
					</view>
				</view>
				<view class="bottom-btn" @click="togglePopup('')">取消分享</view>
			</uni-popup>
		</view>
		<!-- 底部 -->
		<view class="bottom-text">
			武汉市发展与改革委员会<br />
			All rights reserved ©2019
		</view>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import checkApi from '@/common/checkApi.js';
	import mineConfig from "@/common/config/mine.json";
	import getUserApiJson from "@/common/api/getUser.json";
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				token: "",
				user: {
					"userId": "",
					"tel": "",
					"realName": "",
					"gender": "",
					"head": "",
					"birthday": "",
					"city": "",
					"description": "",
					"department": "",
					"roleName": ""
				}, // 用户信息
				showImg: true,
				type: '', // 弹窗类型
				versionUpdate: {
					"version": "",
					"description": "版本更新说明",
					"download": "",
					"downProgress": ""
				},
				bottomData: mineConfig.bottomData,
				browse_icon: mineConfig.browse_icon,
				menu_list: mineConfig.menu_list,
			};
		},
		onLoad() {},
		onShow: function() {
			if (checkApi.checkToken()) {
				this.token = uni.getStorageSync('token');
			} else {
				this.token = "";
				this.user = {
					"userId": "",
					"tel": "",
					"realName": "",
					"gender": "",
					"head": "",
					"birthday": "",
					"city": "",
					"description": "",
					"department": "",
					"roleName": ""
				};
			}
			this.initUser();
		},
		onBackPress() {
			if (this.type !== '') {
				this.type = '';
				return true;
			}
		},
		methods: {
			initUser() {
				if (!this.token) {
					return;
				}
				checkApi.checkNetwork();
				console.log("token:" + this.token);
				uni.request({
					method: 'POST',
					url: this.apiUrl + 'getUserApp',
					data: {
						"token": this.token,
					},
					success: (res) => {
						let dataApi = res.data;
						console.log(dataApi);
						checkApi.isApi(dataApi);
						try {
							this.user = dataApi.data;
							let userStr = JSON.stringify(this.user);
							uni.setStorageSync('user', userStr);
						} catch (e) {
							console.log(e.message);
						}
					},
					fail: (e) => {
						console.log(e.errMsg);
					},
				});
			},
			goLogin() {
				uni.navigateTo({
					url: "../../mine/login/login",
				});
			},
			goUserDetail() {
				if (!this.token) {
					uni.showToast({
						icon: 'none',
						title: "您还没有登录，请先登录",
						duration: 500,
					});
					return;
				} else {
					uni.navigateTo({
						url: "../../mine/information/information"
					});
				}
			},
			goDetailPage(e) {
				if (!this.token) {
					uni.showToast({
						icon: 'none',
						title: "您还没有登录，请先登录",
						duration: 500,
					});
				} else {
					let path = e.url ? e.url : e;
					let url = ~path.indexOf('platform') ? path : '../../mine/' + path + '/' + path;
					uni.navigateTo({
						url: url
					});
					return false;
				}
			},
			goDetailPage1(e) {
				if (e.id == 0) {
					//#ifdef APP-PLUS
					var req = { //升级检测数据  
						"appid": "__UNI__123456",
						"version": "1.0.0"
					};
					checkApi.checkNetwork();
					uni.request({
						method: "GET",
						url: this.apiUrl + "getVersionApp",
						data: req,
						success: (res) => {
							console.log(JSON.stringify(res.data));
							console.log("返回值：" + res.data.code);
							if (res.data.code === 1) {
								this.type = 'middle-update';
								if (uni.getSystemInfoSync().platform == "ios") {
									this.updateText = res.data.IOS.description;
									this.downloadUrl = res.data.IOS.url;
								}
								if (uni.getSystemInfoSync().platform == "android") {
									this.updateText = res.data.Android.description;
									this.downloadUrl = res.data.Android.url;
								}
							} else if (res.data.code === 0) {
								uni.showModal({
									title: "已为最新版本，无需更新"
								})
							}
						},
						fail: () => {}
					})
					//#endif
				} else if (e.id == 1) {
					uni.showModal({
						title: '提示',
						content: '是否清理全部缓存？',
						success: res => {
							if (res.confirm) {
								try {
									uni.removeStorageSync('home_slideshow');
									uni.removeStorageSync('home_analysis');
									uni.removeStorageSync('home_topic');
									uni.removeStorageSync('analysis_list');
									uni.removeStorageSync('topic_list');
									uni.removeStorageSync('search_trend');
									uni.removeStorageSync('user');
									uni.removeStorageSync('collection_economy');
									uni.removeStorageSync('collection_index');
									uni.removeStorageSync('footprint_economy');
									uni.removeStorageSync('footprint_index');
									uni.removeStorageSync('changeTel');
									uni.removeStorageSync('my_news');
									uni.removeStorageSync('news_index');
									uni.showToast({
										icon: 'none',
										title: "缓存清除成功",
										duration: 500,
									});
								} catch (e) {
									uni.showToast({
										icon: 'none',
										title: "缓存清除失败",
										duration: 500,
									});
								}
							}
						}
					});
				} else if (e.id == 2) {
					this.type = 'bottom-share';
				} else {
					let path = e.url ? e.url : e;
					let url = ~path.indexOf('platform') ? path : '../../mine/' + path + '/' + path;
					uni.navigateTo({
						url: url
					});
					return false;
				}
			},
			Update() {
				this.type = ''
				this.type = 'middle-download';
				//#ifdef APP-PLUS
				let updateUrl = this.downloadUrl;
				const downloadTask = uni.downloadFile({
					url: updateUrl, //仅为示例，并非真实的资源
					success: (res) => {
						console.log("正在下载");
						if (res.statusCode === 200) {
							console.log('下载成功');
							this.type = '';
							var tempFilePaths = res.tempFilePath;
							this.install(tempFilePaths);
							return;
						}
					}
				});
				downloadTask.onProgressUpdate((res) => {
					this.downProgress = res.progress;
					//console.log('下载进度' + res.progress);
					//console.log('已经下载的数据长度' + res.totalBytesWritten);
					//console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
				});
				//#endif
			},
			install: function(path) { //安装  
				console.log(path)
				plus.runtime.install(path, {
					force: true
				}, function() {
					//uni.hideNavigationBarLoading();  
					console.log("加载完成！");
					uni.navigateBack({
						delta: 1,
					});
				}, function(e) {

					console.log(JSON.stringify(e));

				});
			},
			togglePopup(type) {
				this.type = type;
			},
			share(e) {
				let pro = "";
				let sce = "";
				let type = 0;
				if (e.text === "微信") {
					pro = "weixin";
					sce = "WXSceneSession";
				} else if (e.text === "朋友圈") {
					pro = "weixin";
					sce = "WXSenceTimeline";
				} else if (e.text === "QQ") {
					pro = "qq";
					type = 1;
				} else if (e.text === "微博") {
					pro = "sinaweibo";
				}
				uni.share({
					//provider: "weixin",
					//scene: "WXSceneSession",
					provider: pro,
					scene: sce,
					type: type,
					href: "https://www.baidu.com",
					title: "数说武汉",
					summary: "数说武汉app测试",
					imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			}
		}
	}
</script>

<style>
	.personal {
		height: 200upx;
	}

	.head {
		width: 110upx;
		height: 110upx;
		float: left;
		border-radius: 100%;
		overflow: hidden;
	}

	.information {
		font-size: 35upx;
		width: 500upx;
		display: inline-block;
	}

	.rank {
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
		line-height: 40upx;
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

	.menu {
		margin-top: 50upx;
	}

	.uni-list-cell {
		padding-top: 4px;
		padding-bottom: 4px;
	}

	.bottom-text {
		margin-top: 100upx;
		font-size: 25upx;
		text-align: center;
		color: #CDCDCD;
	}

	.active {
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

	.pop-button {
		font-size: 30upx;
		float: left;
		background-color: rgba(255, 255, 255, 1);
		border: rgba(255, 255, 255, 1) solid;
	}

	.loginPrompt {
		font-size: 35upx;
		margin-left: 30upx;
		padding-top: 30upx;
		color: #FFFFFF;
	}
</style>
