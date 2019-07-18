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
				<text class="title">原手机号</text>
				<view class="list">
					<input class="input" type="number" maxlength="11" placeholder="请输入原手机号" v-model="tel0" />
				</view>
			</view>
			<view class="change-list">
				<text class="title">新手机号</text>
				<view class="list">
					<input class="input" type="number" maxlength="11" placeholder="请输入新手机号" v-model="tel1" />
				</view>
			</view>
			<button class="finish-button" @click="changeTel">
				下一步
			</button>
		</view>
	</view>
</template>

<script>
	import checkApi from '@/common/checkApi.js';
	import changeTelApiJson from "@/common/api/changeTel.json";
	export default {
		data() {
			return {
				tel0: '',
				tel1: '',
				token: ''
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
			goTelIndex(e) {
				let url = '../login/telIndex/telIndex';
				uni.navigateTo({
					url: url
				});
				return false;
			},
			changeTel(e) {
				if (this.tel0.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '原手机号码格式错误',
						duration: 500
					});
					return;
				}
				if (this.tel1.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '新手机号码格式错误',
						duration: 500
					});
					return;
				}
				if (this.tel0 == this.tel1) {
					uni.showToast({
						icon: 'none',
						title: '手机号不能相同',
						duration: 500
					});
					return;
				}
				let token = uni.getStorageSync('token');
				checkApi.checkNetwork();
				uni.request({
					//url: 'http://192.168.1.101:8080/wuhan_data1/changeTel',
					url: "http://www.baidu.com",
					method: 'POST',
					data: {
						"token": this.token,
						"oriTel": this.tel0,
						"newTel": this.tel1,
					},
					success: (res) => {
						try {
							let dataApi = changeTelApiJson;
							checkApi.isApi(dataApi);
							uni.navigateTo({
								url: "ver_tel",
							});
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
				});
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
		margin-top: 50upx;
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

	.finish-button {
		width: 90%;
		height: 80upx;
		font-size: 35upx;
		color: #FFFFFF;
		background-color: rgb(26, 130, 210);
		border-radius: 5px;
		margin-top: 60upx;
	}

	.verification-code {
		width: 35%;
		height: 60upx;
		font-size: 30upx;
		color: #FFFFFF;
		background-color: rgb(95, 99, 104);
	}

	.active1 {
		background-color: rgb(26, 130, 210);
		font-size: 30upx;
	}

	.title {
		float: left;
		width: 150upx;
		font-size: 35upx;
		line-height: 60upx;
		text-align: center;
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
