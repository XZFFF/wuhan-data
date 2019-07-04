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
				<view class="title" @click="goTelIndex" style="display: flex;">{{countryTel}}
					<view class="triangle">
					</view>
				</view>
				<view class="list">
					<input class="input"  placeholder="请输入手机号" v-model="tel" />
				</view>
			</view>
			<view class="change-list">
				<text class="title">验证码</text>
				<view class="list" style="width: 35%;">
					<input class="input"  placeholder="请输入验证码" v-model="verificationCode" />
				</view>
				<button :class="['verification-code',smsText==='获取验证码' ? 'active1' : '']" style="line-height: 60upx;" @click="smsVerification" >
					{{smsText}}
				</button>
			</view>
			<button class="finish-button" @click="changeTel">
				更换手机
			</button>
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
			return{
				smsText: '获取验证码',
				seconds: 0,
				timer: null,
				tel: '',
				verificationCode: '',
				countryTel: "+86",
			}
		},
		onShow() {
			const changeTel = uni.getStorageSync('changeTel');
			if(changeTel.flag)
				this.countryTel = changeTel.tel;
			uni.removeStorageSync('changeTel');
		},
		methods: {
			goTelIndex(e) {
				let url = '../login/telIndex/telIndex';
				uni.navigateTo({
					url: url
				});
				return false;
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
			changeTel(e){
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
								uni.navigateBack()
								return false;
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
	.finish-button{
		width: 90%;
		height: 80upx;
		font-size: 35upx;
		color: #FFFFFF;
		background-color: rgb(26,130,210);
		border-radius: 5px; 
		margin-top: 60upx;
	}
	.verification-code{
		width: 35%;
		height: 60upx;
		font-size: 30upx;
		color: #FFFFFF;
		background-color: rgb(95,99,104);
	}
	.active1{
		background-color: rgb(26,130,210);
		font-size: 30upx;
	}
	.title{
		float: left;
		width: 120upx;
		font-size: 35upx;
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
