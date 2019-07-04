<template>
	<view>
		<view class="tops" style=" background-color: #3A82CC;height: 180upx; ">
			<!-- 个人信息栏 -->
			<view class="personal" style="color: #FFFFFF;"  v-for="(value,index) in personal_information" :key="index" @click="goDetailPage(value)">
				<view class="uni-list-cell-navigate uni-media-list" style="width: 100%;" v-for="(user,key) in userInformation" :key="key"> 
					<image class="head" :src="head"></image>
					<!--image class="head" v-for="(index,key) in headImg" :key="key"></image-->
					<view class="information">
						<view class="name-rank" style="display: inline-flex;">
							<view class="username" style="font-size: 35upx;float: left;margin-top: 15upx;">
								{{user.realName}}
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
			uniPopup,
		},
		data() {
			return {
				head: '',
				downProgress: '',
				tabIndex: 2,
				title: 'list',
				showImg: true,
				type: '',
				updateText: '123',
				downloadUrl: '',
				personal_information: [{
					url: "information"
				}], 
				userInformation:[{
					//realName: "1",
					//rank: "2",
					//tel: "3",
					//head: "https://img-blog.csdn.net/20180426190001195?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2FubmluZzg2NTI1/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70",
				}
				],
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
		//onLoad:function(){
		onShow: function(){
			try {
					const userInfo = uni.getStorageSync('user_Info');
					//const userHead = uni.getStorageSync('user_Head');
					if (userInfo) {
						this.userInformation = userInfo;
						this.head = userHead;
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
				const userID = uni.getStorageSync('user_id');
				uni.request({
					url: 'http://192.168.1.104/personInfo.php',
					//url: 'http://192.168.124.11:8080/wuhan_data1/homePage',
					method: 'GET',
					data: {
						"id": userID,
					},
					success: (res) => {
						//this.userInformation = res.data.data;
						this.userInformation = res.data;
						//this.head = "http://192.168.124.11:8080/wuhan_data1/"+res.data.data[0].head;
						//console.log("头像："+this.head);
						//console.log("返回数据:" + res.data.data);
						let list=JSON.stringify(res.data);
						console.log("返回数据状态:" + list);
						uni.setStorage({
							key: 'user_Info',
							data: this.userInformation,
							success: function() {
								console.log('成功请求个人信息数据并存入本地缓存');
							}
						});
						/*uni.setStorage({
							key: 'user_Head',
							data: this.head,
							success: function() {
								console.log('成功请求个人头像数据并存入本地缓存');
							}
						});*/
					},
					fail: () => {
						uni.showToast({
							icon: 'none',
							title: '网络异常,请稍后重试'
						});
					},
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
						url: "http://100.64.206.197/checkUpdate.php",  
						data: req,
						success: (res) => {
							console.log("返回值："+res.data.code);
							if (res.data.code === 1) {
								this.type = 'middle-update';
								this.updateText = res.data.text;
								this.downloadUrl = res.data.url;
							}
							else if(res.data.code === 0)
							{
								uni.showModal({
									title: "已为最新版本，无需更新"
								})
							}
						},
						fail: () => {
							uni.showModal({
								title: "网络错误,请稍后重试",
								icon: none,
							})
						}
					})
					//#endif
				}
				else if(e.id == 1){
					this.userInformation={"realName":"aaa",};
				}
				else if(e.id == 2){
					this.type = 'bottom-share';
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
			install: function (path) {//安装  
                console.log(path)  
                plus.runtime.install(path, {  
                    force: true  
                }, function () {  
                    //uni.hideNavigationBarLoading();  
                    console.log("加载完成！");  
                    uni.navigateBack({  
                        delta: 1,  
                    });  
                }, function (e) {  

                    console.log(JSON.stringify(e));  

                });  
            } ,
			togglePopup(type) {
				this.type = type;
			},
			share(e) {
				let pro = "";
				let sce = "";
				let type = 0;
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
					type = 1;
				}
				else if(e.text === "微博")
				{
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
						success: function (res) {
							console.log("success:" + JSON.stringify(res));
						},
						fail: function (err) {
							console.log("fail:" + JSON.stringify(err));
						}
					});
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
	
	.pop-button {
		font-size: 30upx;
		float: left;
		background-color: rgba(255,255,255,1);
		border: rgba(255,255,255,1) solid;
	}
		
	
</style>
