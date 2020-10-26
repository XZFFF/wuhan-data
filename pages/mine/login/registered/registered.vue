<template>
	<view style="height: 100%;background-image: url(../../../../static/splash.png);background-size: cover;">
		<view style="padding-top: 200upx;">
			<view class="registered-box">
				<view style="padding-top: 60upx;">
					<view style="font-size: 50upx; margin-left: 50upx;">
						账户注册
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
						<text class="title">密  码 ：</text>
						<view class="list">
							<input class="input" type="password" v-model="password" placeholder="请输入密码" />
						</view>
					</view>
					<view style="font-size: 28upx;margin-left: 200upx;color: rgb(100,100,100);">密码至少为字母、数字、符号两种组成</view>
					<view class="confirm-list">
						<text class="title">确认密码</text>
						<view class="list">
							<input class="input" type="password" v-model="repassword" placeholder="请再次输入密码" />
						</view>
					</view>
					<view class="login-list">
						<text class="title">姓  名 ：</text>
						<view class="list">
							<input class="input" type="text" v-model="name" placeholder="请输入真实姓名" />
						</view>
					</view>
					<button class="login-button" style="line-height:80upx;" @tap="lands">提交</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import checkApi from '@/common/checkApi.js';
	import loginApiJson from "@/common/api/login.json";

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
				tel: "",
				password: "",
				repassword: "",
				countryTel: "+86",
				name: "",
			}
		},
		//页面初始加载
		onShow() {
			const changeTel = uni.getStorageSync('changeTel');
			if (changeTel.flag) {
				this.countryTel = changeTel.tel;
			}
			let winHeight = uni.getSystemInfoSync().windowHeight;
			uni.setStorageSync('winHeight', winHeight);
		},
		methods: {
			goTelIndex(e) {
				let url = '../../login/telIndex/telIndex';
				uni.navigateTo({
					url: url
				});
				return false;
			},
			lands() {
				let myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
				let mypas = /(?!^\d+$)(?!^[A-Za-z]+$)(?!^[^A-Za-z0-9]+$)(?!^.*[\u4E00-\u9FA5].*$)^\S{6,20}$/
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
				if (this.password.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入密码'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码过于简单，请重设'
					});
					return;
				}
				if (!mypas.test(this.password)) {
					uni.showToast({
						icon: 'none',
						title: '至少为字母、数字、符号两种组成,不包含空格和中文'
					});
					return;
				}
				if (this.password != this.repassword) {
					uni.showToast({
						icon: 'none',
						title: '密码不匹配'
					});
					return;
				}
				if (this.name == "") {
					uni.showToast({
						icon: 'none',
						title: '姓名不能为空'
					});
					return;
				} {
					console.log("11111111111111")
					checkApi.checkNetwork();
					uni.request({
						method: 'POST',
						url: this.apiUrl + "userRegister",
						// url: 'http://www.baidu.com',
						data: {
							"token": this.token,
							"tel": this.tel,
							"password": this.password,
							"name": encodeURI(this.name)
						},
						success: (res) => {
							let dataApi = res.data;
							// let dataApi = loginApiJson;
							checkApi.isApi(dataApi);
							try {
								let userData = dataApi.data;
								// 验证账号密码的正确性
								let reNum = this.verify(userData);
								if (reNum != -1) {
									uni.showToast({
										icon: 'none',
										title: '该手机号已被注册',
										duration: 1000
									});
									return;
								} else {
									if (dataApi.errCode == 0) {
										setTimeout(function() {
											uni.showToast({
												title: '注册成功',
												icon: 'none',
											});
										}, 300);
									}
									let url = '../../login/login';
									uni.navigateTo({
										url: url
									});
									return false;
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
			verify(userStr) {
				if (userStr.tel === this.tel) {
					// 手机号已被注册
					return 0;
				} else {
					//手机号码未注册
					return -1;
				}

			}
		}
	}
</script>

<style>
	.registered-box {
		height: 870upx;
		width: 90%;
		background-color: #FFFFFF;
		margin-left: auto;
		margin-right: auto;
		border-radius: 10px;
	}

	.login-list {
		height: 60upx;
		margin-top: 70upx;
		margin-left: 50upx;
	}
	
	.confirm-list {
		height: 60upx;
		margin-top: 40upx;
		margin-left: 50upx;
	}

	.title {
		float: left;
		width: 150upx;
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

	.login-button {
		width: 90%;
		height: 80upx;
		margin-left: auto;
		margin-right: auto;
		text-align: center;
		font-size: 35upx;
		color: #FFFFFF;
		background-color: rgb(26, 130, 210);
		border-radius: 5px;
		margin-top: 70upx;
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
