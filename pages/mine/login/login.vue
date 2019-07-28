<template>
	<view style="height: 100%;background-image: url(../../../static/icon/mine/loginBackground.png);background-size: cover;">
		<view style="padding-top: 250upx;">
			<view class="login-box">
				<view style="padding-top: 60upx;">
					<view style="font-size: 50upx; margin-left: 50upx;">
						账户登录
					</view>
					<view style="font-size: 35upx; margin-left: 50upx; margin-bottom: 80upx;">
						请输入您的手机号码和验证码
					</view>
					<view class="login-list">
						<view class="title" @click="goTelIndex" style="display: flex;">{{countryTel}}
							<view class="triangle">
							</view>
						</view>
						<view class="list">
							<input class="input" type="number" v-model="tel" placeholder="请输入手机号" />
						</view>
					</view>
					<view class="login-list">
						<text class="title">验证码</text>
						<view class="list" style="width: 40%;">
							<input class="input" type="number" v-model="verCode" placeholder="请输入验证码" />
						</view>
						<button :class="['verification-code',smsText==='获取验证码' ? 'active1' : '']" style="line-height: 60upx;" @click="smsVerification">
							{{smsText}}
						</button>
					</view>
					<view style="font-size: 30upx;margin-top: 20upx;margin-left: 50upx;color: rgb(100,100,100);">
						未注册手机验证后自动注册
					</view>
					<input type="button" class="login-button" style="line-height:80upx" value="登录" @tap="lands" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import checkApi from '@/common/checkApi.js';
	import loginApiJson from "@/common/api/login.json";
	import getVercodeApiJson from "@/common/api/getVercode.json";

	export default {
		props: {
			second: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				smsText: '获取验证码',
				seconds: 0,
				timer: null,
				tel: "",
				verCode: "",
				codeButton: "获取验证码",
				countryTel: "+86",
			}
		},
		//页面初始加载
		onShow() {
			const changeTel = uni.getStorageSync('changeTel');
			if (changeTel.flag) {
				this.countryTel = changeTel.tel;
			}
		},
		// #ifdef APP-PLUS
		onBackPress() {
			console.log("执行关闭");
			uni.switchTab({
				url: "../../tabbar/mine/mine"
			});
			return true;
		},
		// #endif
		methods: {
			goTelIndex(e) {
				let url = '../../mine/login/telIndex/telIndex';
				uni.navigateTo({
					url: url
				});
				return false;
			},
			lands() {
				let myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
				if (this.tel.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '手机号格式错误'
					});
					return;
				}
				if (!myreg.test(this.tel)) {
					uni.showToast({
						icon: 'none',
						title: '请输入有效的手机号'
					});
					return;
				}
				if (this.verCode.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入验证码'
					});
					return;
				} {
					this.smsText = 'loading';
					checkApi.checkNetwork();
					uni.request({
						method: 'POST',
						url: this.apiUrl + "loginaa", //仅为示例，并非真实接口地址。
						data: {
							"tel": this.tel,
							"verCode": this.verCode
						},
						success: (res) => {
							let dataApi = res.data;
							checkApi.isApi(dataApi);
							try {
								let tokenStr = dataApi.data.token;
								let userStr = JSON.stringify(dataApi.data);
								uni.setStorageSync('token', tokenStr);
								uni.setStorageSync('user', userStr);
								uni.showToast({
									icon: 'none',
									title: '登录成功',
									duration: 1000
								});
								setTimeout(function() {
									uni.switchTab({
										url: '../../tabbar/mine/mine',
									})
								}, 1000);

							} catch (e) {
								this.smsText = '获取验证码';
								console.log(e.message);
								uni.showToast({
									icon: 'none',
									title: e.message
								});
							}
						},
						fail: (e) => {
							this.smsText = '获取验证码';
							console.log(e.errMsg);
						},
					})
				}

			},
			smsVerification(e) {
				if (this.smsText != '获取验证码') {
					return;
				}
				let myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
				if (this.tel.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '手机号格式错误'
					});
					return;
				}
				if (!myreg.test(this.tel)) {
					uni.showToast({
						icon: 'none',
						title: '请输入有效的手机号'
					});
					return;
				}
				checkApi.checkNetwork();
				uni.request({
					url: this.apiUrl + 'getVercodeApp',
					method: 'POST',
					data: {
						"tel": this.tel
					},
					success: (res) => {
						let dataApi = res.data;
						//let dataApi = getVercodeApiJson;
						checkApi.isApi(dataApi);
						try {
							uni.showToast({
								icon: 'none',
								title: '验证码发送成功'
							});
							this.second = 12;
							this.seconds = this.second
							this.countDown()
							this.timer = setInterval(() => {
								this.seconds--
								if (this.seconds < 1) {
									this.smsText = '获取验证码'
									clearInterval(this.timer)
									return
								}
								this.countDown()
							}, 1000);
						} catch (e) {
							console.log(e.message);
						}
					},
					fail: (e) => {
						console.log(e.errMsg);
						uni.showToast({
							icon: 'none',
							title: e.errMsg
						});
					},
				})
			},
			countDown() {
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
		},
	}
</script>

<style>
	.login-box {
		height: 780upx;
		width: 90%;
		background-color: #FFFFFF;
		margin-left: auto;
		margin-right: auto;
		border-radius: 10px;
	}

	.swiper-tab {
		border-top: 1px solid rgb(72, 155, 219);
		width: 100%;
		height: 100upx;
	}

	.swiper-tab-list {
		width: 20%;
		height: 80upx;
		margin-top: 25upx;
		margin-left: 15%;
		margin-right: 15%;
		font-size: 40upx;
		color: rgb(134, 134, 134);
	}

	.active {
		color: #3A82CC;
		border-bottom: 4px solid #3A82CC;
	}

	.login-list {
		height: 60upx;
		margin-top: 60upx;
		margin-left: 50upx;
	}

	.title {
		float: left;
		width: 120upx;
		font-size: 35upx;
		line-height: 60upx;
		text-align: center;
	}

	.list {
		height: 60upx;
		width: 70%;
		float: left;
	}

	.input {
		background-color: rgb(247, 247, 247);
		border-radius: 5px;
		font-size: 35upx;
		padding: 0 20upx;
		height: 60upx;
	}

	.verification-code {
		width: 35%;
		height: 60upx;
		font-size: 25upx;
		color: #FFFFFF;
		background-color: rgb(95, 99, 104);
	}

	.active1 {
		background-color: rgb(26, 130, 210);
		font-size: 30upx;
	}

	.login-button {
		width: 90%;
		height: 80upx;
		font-size: 35upx;
		color: #FFFFFF;
		background-color: rgb(26, 130, 210);
		border-radius: 5px;
		margin-top: 80upx;
	}

	.forget-password {
		margin-left: 50upx;
		margin-top: 50upx;
		font-size: 35upx;
		color: rgb(26, 130, 210);
	}

	.triangle {
		width: 0;
		height: 0;
		margin-top: 22upx;
		margin-left: 20upx;
		border-width: 5px 5px 0;
		border-style: solid;
		border-color: rgb(68, 68, 68) transparent transparent;
	}
</style>
