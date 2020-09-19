<template>
	<view style="height: 100%; ">
		<view>
			<image class="sure" src="../../../static/icon/mine/sure.png"></image>
			<p style="text-align: center; font-size: 60upx;margin-top: 20upx; color: #1A82D2;">
				数说武汉<br />
				账户中心<br />
			</p>
		</view>
		<view style="margin-top: 80upx;">
			<view class="change-list">
				<text class="title">手机号</text>
				<view class="list">
					<input class="input" type="number" maxlength="11" placeholder="请输入新手机号" v-model="tel" />
				</view>
			</view>
			<view class="change-list">
				<text class="title">验证码</text>
				<view class="list">
					<input class="input" type="number" placeholder="请输入验证码" v-model="verificationCode" />
				</view>
			</view>
			<button :class="['sms-button',smsText==='获取验证码' ? 'active' : '']" style="font-size: 35upx;" @click="smsVerification">
				{{smsText}}
			</button>
			<button class="finish-button" @click="changeTel">
				提交
			</button>
		</view>
	</view>
</template>

<script>
	import checkApi from '@/common/checkApi.js';
	import verTelApiJson from "@/common/api/verTel.json";
	import confirmChangeApiJson from "@/common/api/confirmChange.json";
	export default {
		props: {
			second: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				token: '',
				smsText: '获取验证码',
				seconds: 0,
				timer: null,
				tel: '',
				token: '',
				verificationCode: '',
			}
		},
		onShow: function() {
			if (checkApi.checkToken()) {
				this.token = uni.getStorageSync('token');
			} else {
				uni.showToast({
					icon: 'none',
					title: "您还没有登录，请先登录",
					duration: 1000,
				});
				setTimeout(function() {
					uni.navigateTo({
						url: "../login/login"
					})
				}, 1000);
			}
		},
		methods: {
			smsVerification(e) {
				if (this.tel.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '新手机号码格式错误',
						duration: 500
					});
					return;
				}
				if (this.smsText === '获取验证码') {
					this.smsText = 'loading';
					let token = uni.getStorageSync('token');
					checkApi.checkNetwork();
					uni.request({
						url: this.apiUrl + 'getVercodeApp',
						method: 'POST',
						data: {
							"tel": this.tel
						},
						success: (res) => {
							try {
								let dataApi = res.data;
								checkApi.isApi(dataApi);
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
							} catch (e) {
								console.log(e.message);
								uni.showToast({
									icon: 'none',
									title: e.message
								});
								this.smsText = '获取验证码';
							}
						},
						fail: (e) => {
							this.smsText = '获取验证码';
							console.log(e.errMsg);
							uni.showToast({
								icon: 'none',
								title: e.errMsg
							});
						},
					})
				}
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
			changeTel(e) {
				if (this.verificationCode.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入验证码'
					});
					return;
				}
				uni.request({
					url: this.apiUrl + "changeTelApp",
					method: 'POST',
					data: {
						"token": this.token,
						"newTel": this.tel,
						"verCode": this.verificationCode,
					},
					success: (res) => {
						try {
							let dataApi = confirmChangeApiJson;
							checkApi.isApi(dataApi);
							uni.showToast({
								icon: 'none',
								title: "手机号更换成功",
								duration: 1000,
							});
							setTimeout(function() {
								uni.navigateBack()
							}, 1000);

						} catch (e) {
							console.log(e.message);
							uni.showToast({
								icon: 'none',
								title: e.message
							});
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
			}
		}
	}
</script>

<style>
	.sure {
		height: 350upx;
		width: 350upx;
		display: block;
		margin-left: auto;
		margin-right: auto;
		padding-top: 100upx;
	}

	.change-list {
		display: flex;
		margin-top: 40upx;
		margin-left: 50upx;
	}

	.list {
		width: 70%;
		float: left;
	}

	.input {
		background-color: rgb(255, 255, 255);
		border-radius: 5px;
		font-size: 35upx;
		padding: 0 20upx;
		height: 60upx;
	}

	.sms-button {
		width: 90%;
		height: 80upx;
		font-size: 35upx;
		color: #FFFFFF;
		background-color: rgb(95, 99, 104);
		border-radius: 5px;
		margin-top: 40upx;
	}

	.finish-button {
		width: 90%;
		height: 80upx;
		font-size: 35upx;
		color: #FFFFFF;
		background-color: rgb(26, 130, 210);
		border-radius: 5px;
		margin-top: 40upx;
	}

	.active {
		background-color: rgb(26, 130, 210);
	}

	.title {
		float: left;
		width: 120upx;
		font-size: 35upx;
		line-height: 60upx;
		text-align: center;
	}
</style>
