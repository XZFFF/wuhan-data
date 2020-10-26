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
				<text class="title">旧手机号</text>
				<view class="init" v-if="user.tel">
					{{user.tel}}
				</view>
			</view>
			<view class="change-list">
				<text class="title">新手机号</text>
				<view class="list">
					<input class="input" type="number" maxlength="11" placeholder="请输入新手机号" v-model="newtel" />
				</view>
			</view>
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
				newtel: "",
			}
		},
		onShow: function() {
			this.getUserStorage();
			if (checkApi.checkToken()) {
				this.token = uni.getStorageSync('token');
				console.log(this.token);
				//this.user = uni.getStorageSync('user');
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
			getUserStorage() {
				try {
					let user = uni.getStorageSync('user');
					if (user) {
						console.log("读取用户信息缓存");
						var userJson=JSON.parse(user);
						this.user = userJson;
					}
				} catch (e) {
					console.log(e.message);
				}
			},
			changeTel(e) {
				let myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
				if (this.newtel.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '新手机号码格式错误',
						duration: 500
					});
					return;
				}
				if (!myreg.test(this.newtel)) {
					uni.showToast({
						icon: 'none',
						title: '请输入有效的新手机号'
					});
					return;
				} {
					checkApi.checkNetwork();
					uni.request({
						method: 'POST',
						url: this.apiUrl + "changeTelApp",
						// url: 'http://www.baidu.com',
						data: {
							"token": this.token,
							"tel": this.newtel,
						},
						success: (res) => {
							let dataApi = res.data;
							// let dataApi = loginApiJson;
							checkApi.isApi(dataApi);
							try {

								let userData = dataApi.data;
								// 验证账号密码的正确性
								let reNum = dataApi.errCode;
								// let reNum = this.verify(userData)
								console.log(reNum);
								if (reNum == 0) {
									let dataApi = confirmChangeApiJson;
									checkApi.isApi(dataApi);
									uni.showToast({
										icon: 'none',
										title: '手机号修改成功',
										duration: 1000
									});
									setTimeout(function() {
										uni.navigateBack({
											url: '../../mine/information/information',
										})
									}, 1000);
									return;
								} else if (reNum == -1) {
									uni.showToast({
										icon: 'none',
										title: '数据库操作错误'
									});
									return;
								} else if (reNum == -2) {
									uni.showToast({
										icon: 'none',
										title: '请求参数异常'
									});
									return;
								} else if (reNum == -3) {
									uni.showToast({
										icon: 'none',
										title: 'token令牌错误'
									});
									return;
								} else if (reNum == -4) {
									uni.showToast({
										icon: 'none',
										title: '该手机号已被注册'
									});
									return;
								} else {
									uni.showToast({
										icon: 'none',
										title: '旧手机号未注册'
									});
									return;
								}
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
						},
					})
				}
			},
			//登录验证
			// verify(userStr) {
			// 	console.log(userStr)
			// 	console.log(userStr.tel)
			// 	console.log(this.password)
			// 	if (userStr.tel === this.oldtel && userStr.password === this.password) {
			// 		// 手机号、密码正确，验证成功
			// 		return 0;
			// 	} else if (userStr.tel === this.oldtel && userStr.password !== this.password) {
			// 		// 密码不存在
			// 		return -1;
			// 	} else {
			// 		//手机号码不存在
			// 		return -2;
			// 	}

			// }
			/**
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
			}**/
		}
	}
</script>

<style>
	.sure {
		height: 400upx;
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
		width: 150upx;
		font-size: 35upx;
		line-height: 60upx;
		text-align: center;
	}
</style>
