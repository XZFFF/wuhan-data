<template>
	<view style="height: 100%;background-image: url(../../../static/icon/mine/loginBackground.png);background-size: cover;">
		<view style="padding-top: 250upx;">
			<view class="login-box">
				<view>
					<view class="tab-bar">
						<view id="tab-bar" class="swiper-tab" scroll-x :scroll-left="scrollLeft">
							<view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :id="tab.id"
							 :data-current="index" @click="tapTab(index)">{{tab.name}}</view>
						</view>
					</view>
					<swiper :current="tabIndex" class="swiper-box" duration="300" style="height: 800upx;" @change="changeTab">
						<swiper-item>
							<view style="font-size: 50upx; margin-left: 50upx; margin-top: 70upx; ">
								手机验证
							</view>
							<view style="font-size: 35upx; margin-left: 50upx; margin-bottom: 80upx;">
								请输入您的手机号码完成验证
							</view>
							<view class="login-list">
								<view class="title" @click="goTelIndex" style="display: flex;">{{countryTel}}
									<view class="triangle">
									</view>
								</view>
								<view class="list">
									<input class="input" v-model="tel0" placeholder="请输入手机号" />
								</view>
							</view>
							<view class="login-list">
								<text class="title">验证码</text>
								<view class="list" style="width: 35%;">
									<input class="input" v-model="verCode" placeholder="请输入验证码" />
								</view>
								<button :class="['verification-code',smsText==='获取验证码' ? 'active1' : '']" style="line-height: 60upx;" @click="smsVerification" >
									{{smsText}}
								</button>
								<!--input type="button" class="verification-code" id="code" style="line-height: 60upx;" :value="smsText" @click="smsVerification()"-->
							</view>
							<view class="login-list">
								<text class="title">密码</text>
								<view class="list">
									<input class="input" password="true" placeholder="请输入6-14位密码" v-model="passw0" />
								</view>
							</view>
							<input type="button" class="login-button" style="line-height:80upx" value="注册" @click="registe" />
						</swiper-item>
						<swiper-item>
							<view style="font-size: 50upx; margin-left: 50upx; margin-top: 70upx; ">
								账户登录
							</view>
							<view style="font-size: 35upx; margin-left: 50upx; margin-bottom: 80upx;">
								请输入您的手机号码和密码登录
							</view>
							<view class="login-list">
								<text class="title">账户</text>
								<view class="list">
									<input class="input" type="text" v-model="tel1" placeholder="默认为手机号" />
								</view>
							</view>
							<view class="login-list">
								<text class="title">密码</text>
								<view class="list">
									<input class="input" password="true" type="text" v-model="passw" placeholder="请输入密码" />
								</view>
							</view>
							<view class="forget-password" v-for="(value,key) in forget_password" :key="key" @click="goDetailPage(value)">
								忘记密码？
							</view>
							<input type="button" class="login-button" style="line-height:80upx" value="登录" @tap="lands" />
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			second: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				isClickChange: false,
				tabIndex: 0,
				smsText: '获取验证码',
				seconds: 0,
				timer: null,
				tel0: "",
				tel1: "",
				codeButton: "获取验证码",
				passw: "",
				countryTel: "+86",
				tabBars: [{
					name: '注册',
				}, {
					name: '登录',
				}],
				forget_password: [
					{
						url: 'forget_password',
				}],
			}
		},
		//页面初始加载
		onShow() {
			const changeTel = uni.getStorageSync('changeTel');
			if(changeTel.flag)
				this.countryTel = changeTel.tel;
			uni.removeStorageSync('changeTel');
		},
		created: function (e) {
			
		},
		methods: {
			async changeTab(e) {
				let index = e.detail.current;
				if (this.isClickChange) {
					this.tabIndex = index;
					this.isClickChange = false;
					return;
				}
				let tabBar = await this.getElSize("tab-bar"),
					tabBarScrollLeft = tabBar.scrollLeft;
				
				this.isClickChange = false;
				this.tabIndex = index; 
			},
			getElSize(id) { //得到元素的size
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select('#' + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
				});
			},
			async tapTab(index) { //点击tab-bar
				if (this.tabIndex === index) {
					return false;
				} else {
					let tabBar = await this.getElSize("tab-bar"),
						tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
					this.scrollLeft = tabBarScrollLeft;
					this.isClickChange = true;
					this.tabIndex = index;
				}
			},
			goDetailPage(e) {
				let path = e.url ? e.url : e;
				let url = ~path.indexOf('platform') ? path : '../../mine/' + path + '/' + path;
				uni.navigateTo({
					url: url
				});
				return false;
			},
			goTelIndex(e) {
				let url = '../../mine/login/telIndex/telIndex';
				uni.navigateTo({
					url: url
				});
				return false;
			},
			lands() {
				if (this.tel1.length <= 0 || this.passw.length <= 0) {
					uni.showToast({
						title: '账号或密码不能为空',
						icon: 'none'
					});
					return;
            	} else {
					var req = {
						"tel": this.tel1,
						"password": this.passw
					};
					console.log("参数:" + req);
					uni.request({
						method: 'POST',
						url: "http://192.168.124.11:8080/wuhan_data1/loginchekByTel", //仅为示例，并非真实接口地址。
						data: req,
						success: (res) => {
							let list=JSON.stringify(res.data);
							console.log("返回数据状态:" + list);
							if(res.data.code === 1){
								uni.setStorage({
									key: 'user_id',
									data: res.data.id,
									success: function() {
										console.log('成功请求个人ID并存入本地缓存');
									}
								});
								uni.showToast({
									icon: 'none',
									title: '登录成功'
								});
								uni.switchTab({
									url: '../../tabbar/home/home',
								})
							}
							else if(res.data.code === 0){
								uni.showToast({
									icon: 'none',
									title: '用户名或密码错误'
								});
								return;
							}
						},fail: () => {
							uni.showToast({
								icon: 'none',
								title: '网络异常,请稍后重试'
							});
						},
					})
				}
			},
			smsVerification(e) {
				if(this.smsText === '获取验证码'){
					/*let tel = this.tel0;
					let code = this.verCode;
					if (tel.length == 0) {
						uni.showToast({
							icon: 'none',
							title: '手机号不能为空'
						});
						return;
					}
					else if (tel.length != 11) {
						uni.showToast({
							icon: 'none',
							title: '请输入正确的手机号'
						});
						return;
					}
					else */
					{
						uni.request({
							url: 'http://192.168.1.104/return1.php',
							//url: "http://192.168.1.101:8080/wuhan_data1/sendSMS",
							data: {
								"tel": this.tel0
							},
							success: (res) => {
								let list=JSON.stringify(res.data);
								console.log("返回数据状态:" + list);
								if(res.data.code === 1){
									uni.showToast({
										icon: 'none',
										title: '验证码发送成功'
									});
									console.log("已发送验证码");
									this.second = 12;
									this.seconds = this.second
									this.countDown()
									this.timer = setInterval(() => {
									  this.seconds--
									  if (this.seconds < 1) {
									    //this.timeUp()
										this.smsText = '获取验证码'
										clearInterval(this.timer)
									    return
									  }
									  this.countDown()
									}, 1000)
								}
								else if(res.data.code === 0){
									uni.showToast({
										icon: 'none',
										title: '验证码发送失败，请重试'
									});
								}
							},fail: () => {
								uni.showToast({
									icon: 'none',
									title: '网络异常,请稍后重试'
								});
							},
						})
					}
				}
			},
			countDown () {
				let seconds = this.seconds
				let [second] = [1]
				if (seconds > 1) {
					second = Math.floor(seconds)
				}
				if (second < 10) {
					second = '0' + second
				}
				second = '重新发送(' + second + 's)'
				this.smsText = second
			},
			registe(){
				var req={
					"tel": this.tel0,
					"verCode": this.verCode,
					"password": this.passw0
				}
				var regNumber = /\d+/;
				var regString = /[a-zA-Z]+/;
				/*if(this.tel0.length != 11)
				{
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号'
					});
				}
				else if(this.verCode.length == null)
				{
					uni.showToast({
						icon: 'none',
						title: '请输入验证码'
					});
				}
				//判断密码是否合法
				else if(this.passw0.length<6||this.passw0.length>14)
				{
					uni.showToast({
						icon: 'none',
						title: '密码长度应为6到14位'
					});
				}
				else if (!(regNumber.test(this.passw0) && regString.test(this.passw0))) {
					uni.showToast({
						icon: 'none',
						title: '密码只能为且必须包含字母和数字'
					});
				}*/
				//else
				{
					uni.request({
						method: 'POST',
						url: "http://192.168.1.101:8080/wuhan_data1/userRegisterlAPP", //仅为示例，并非真实接口地址。
						data: req,
						success: (res) => {
							if(res.data.code != 1){
								uni.showToast({
									icon: 'none',
									title: '验证码错误'
								});
								return;
							}
							else if(res.data.code == 1){
								setTimeout(function() {
								        uni.showToast({
								        	icon: 'none',
								        	title: '注册成功'
								        }); 
								    }, 1000);
								this.tabIndex = 1;
							}
						},fail: () => {
							uni.showToast({
								icon: 'none',
								title: '网络异常,请稍后重试'
							});
						},
					})
				}
			}
		},
	}
	
</script>

<style>
	
	.login-box{
		height: 900upx;
		width: 90%;
		background-color: #FFFFFF;
		margin-left: auto;
		margin-right: auto;
		border-radius: 10px;
	}
	.swiper-tab{
		border-top: 1px solid rgb(72,155,219);
		width: 100%;
		height: 100upx;
	}
	.swiper-tab-list{
		width: 20%;
		height: 80upx;
		margin-top: 25upx;
		margin-left: 15%;
		margin-right: 15%;
		font-size: 40upx;
		color: rgb(134,134,134);
	}
	.active{
		color: #3A82CC;
		border-bottom: 4px solid #3A82CC;
	}
	.login-list{
		display: flex;
		margin-top: 50upx;
		margin-left: 50upx;
	}
	.title{
		float: left;
		width: 120upx;
		font-size: 35upx;
	}
	.list{
		width: 70%;
		float: left;
	}
	.input{
		background-color: rgb(247,247,247);
		border-radius: 5px;
		font-size: 30upx;
		padding: 0 20upx;
	}
	.verification-code{
		width: 35%;
		height: 60upx;
		font-size: 25upx;
		color: #FFFFFF;
		background-color: rgb(95,99,104);
	}
	.active1{
		background-color: rgb(26,130,210);
		font-size: 30upx;
	}
	.login-button{
		width: 90%;
		height: 80upx;
		font-size: 35upx;
		color: #FFFFFF;
		background-color: rgb(26,130,210);
		border-radius: 5px; 
		margin-top: 80upx;
	}
	.forget-password{
		margin-left: 50upx;
		margin-top: 50upx;
		font-size: 35upx;
		color: rgb(26,130,210);
	}
	.triangle{
		width: 0;
		height: 0;
		margin-top: 22upx;
		margin-left: 20upx;
		border-width: 5px 5px 0;
		border-style: solid;
		border-color: rgb(68,68,68) transparent transparent;
	}
</style>
