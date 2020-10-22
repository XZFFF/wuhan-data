<template>
	<view style="height: 100%; ">
		<view>
			<image class="sure" src="../../../../static/icon/mine/sure.png"></image>
			<p style="text-align: center; font-size: 60upx;margin-top: 20upx; color: #1A82D2;">
				数说武汉<br />
				账户中心<br />
			</p>
		</view>
		<view style="margin-top: 80upx;">
			<view class="change-list">
				<text class="title">手机号</text>
				<view class="list">
					<input class="input" type="number" maxlength="11" placeholder="请输入手机号" v-model="tel" />
				</view>
			</view>
			<view class="change-list">
				<text class="title">新 密 码</text>
				<view class="list">
					<input class="input" type="password" placeholder="请输入新密码" v-model="password" />
				</view>
			</view>
			<view class="change-list">
				<text class="title">真实姓名</text>
				<view class="list">
					<input class="input" type="number" maxlength="11" placeholder="请输入真实姓名" v-model="name" />
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
				token: '',
				// smsText: '获取验证码',
				// seconds: 0,
				// timer: null,
				tel: '',
				password: '',
				name: '',
				// verificationCode: '',
			}
		},
		onShow() {
			const changeTel = uni.getStorageSync('changeTel');
			if (changeTel.flag) {
				this.countryTel = changeTel.tel;
			}
			let winHeight = uni.getSystemInfoSync().windowHeight;
			uni.setStorageSync('winHeight',winHeight);
		},
		methods: {
			changeTel(e) {
				let myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
				let mypas = /(?!^\d+$)(?!^[A-Za-z]+$)(?!^[^A-Za-z0-9]+$)(?!^.*[\u4E00-\u9FA5].*$)^\S{6,20}$/
				if (this.tel.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '手机号码格式错误',
						duration: 500
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
						title: '请输入新密码'
					});
					return;
				}
				if (this.password.length < 10) {
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
				if (this.name == "") {
					uni.showToast({
						icon: 'none',
						title: '姓名不能为空'
					});
					return;
				}{
					checkApi.checkNetwork();
					uni.request({
						method: 'POST',
						// url: this.apiUrl + 'editUserApp',
						url: 'http://www.baidu.com',
						data: {
							"token": this.token,
							"tel": this.newtel,
							"password": this.password,
							"name": this.name
						},
						success: (res) => {
							// let dataApi = res.data;
							let dataApi = loginApiJson;
							checkApi.isApi(dataApi);
							try {
								
								let userData = dataApi.data;
								// 验证账号密码的正确性
								let reNum = this.verify(userData);
								console.log(reNum);
								if(reNum === 0){
									uni.showToast({
										icon: 'none',
										title: '密码重置成功',
										duration: 1000
									});
									setTimeout(function() {
										uni.switchTab({
											url: '../../login/login',
										})
									}, 1000);
								}
								else if(reNum === -1){
									uni.showToast({
										icon: 'none',
										title: '真实姓名错误'
									});
									return;
								}
								else{
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
			verify(userStr) {
				if(userStr.tel === this.tel && userStr.name === this.name) {
					// 手机号、真实姓名正确，验证成功
					return 0;
				}
				else if(userStr.tel === this.tel && userStr.name !== this.name) {
					// 真实姓名不正确
					return -1;
				}
				else{
					//手机号码不存在
					return -2;
				}
				
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
		width: 150upx;
		font-size: 35upx;
		line-height: 60upx;
		text-align: center;
	}
</style>
