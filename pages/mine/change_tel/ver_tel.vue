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
				<text class="title">验证码</text>
				<view class="list">
					<input class="input"  placeholder="请输入验证码" v-model="verificationCode" />
				</view>
			</view>
			<button :class="['sms-button',smsText==='获取验证码' ? 'active' : '']" style="font-size: 35upx;" @click="smsVerification" >
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
	export default {
		props: {
			second: {
				type: Number,
				default: 0
			}
		},
		data() {
			return{
				smsText: '获取验证码',
				seconds: 0,
				timer: null,
				tel: '',
				verificationCode: '',
			}
		},
		methods: {
			smsVerification(e) {
				if(this.smsText === '获取验证码'){
					this.smsText = 'loading';
					checkApi.checkNetwork();
					uni.request({
						url: 'http://192.168.0.104/return1.php',
						//url: "http://192.168.1.101:8080/wuhan_data1/sendSMS",
						data: {
							"verCode": this.verificationCode
						},
						success: (res) => {
							try{
								let dataApi = getVercodeApiJson;
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
							}catch(e){
								console.log(e.message);
								uni.showToast({
									icon: 'none',
									title: e.message
								});
								this.smsText = '获取验证码';
							}
							
						},fail: (e) => {
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
			changeTel(e){
				/*
				if(this.verCode.length == null)
				{
					uni.showToast({
						icon: 'none',
						title: '请输入验证码'
					});
				}
				else*/
				{
					const userID = uni.getStorageSync('user_id');
					uni.request({
						url: 'http://192.168.1.101:8080/wuhan_data1/changeTel',
						method: 'POST',
						data: {
							"id": userID,
							"tel": this.tel,
							"verCode": this.verificationCode,
						},
						success: (res) => {
							let list=JSON.stringify(res.data);
							console.log("返回数据状态:" + list);
							try{
								if(res.data.code == 0){
									uni.showToast({
										icon: 'none',
										title: '验证码错误'
									});
								}
								else if(res.data.code == 1){
									setTimeout(function() {  
									        uni.showToast({
												title: '手机号更换成功',
									        	icon: 'none',
									        }); 
									    }, 300);
									uni.navigateTo({
										url: "../../tabbar/mine/mine"
									});
								}
							}catch(e){
								uni.showToast({
									title: '请求错误',
									icon: 'none',
								}); 
							}
						},
						fail: () => {
							uni.showToast({
								icon: 'none',
								title: '网络异常,请稍后重试'
							});
						},
					});
				}
			}
		}
	}
</script>

<style>
	.sure{
		height: 350upx;
		width: 350upx;
		display:block;
		margin-left: auto;
		margin-right: auto;
		padding-top: 100upx;
	}
	.change-list{
		display: flex;
		margin-top: 50upx;
		margin-left: 50upx;
	}
	.list{
		width: 70%;
		float: left;
	}
	.input{
		background-color: rgb(255,255,255);
		border-radius: 5px;
		font-size: 30upx;
		padding: 0 20upx;
	}
	.sms-button{
		width: 90%;
		height: 80upx;
		font-size: 35upx;
		color: #FFFFFF;
		background-color: rgb(95,99,104);
		border-radius: 5px; 
		margin-top: 60upx;
	}
	.finish-button{
		width: 90%;
		height: 80upx;
		font-size: 35upx;
		color: #FFFFFF;
		background-color: rgb(26,130,210);
		border-radius: 5px; 
		margin-top: 60upx;
	}
	.active{
		background-color: rgb(26,130,210);
	}
	.title{
		float: left;
		width: 120upx;
		font-size: 30upx;
	}
</style>
