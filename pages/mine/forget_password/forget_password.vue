<template>
	<view>
		<view>
			<image class="sure" src="../../../static/icon/mine/sure.png"></image>
			<p style="text-align: center; font-size: 60upx;margin-top: 20upx;color: #1A82D2;">
				数说武汉<br />
				账户中心<br />
			</p>
		</view>
		<view style="margin-top: 80upx;">
			<view class="change-list">
				<view class="list">
					<input class="input"  placeholder="请输入手机号" v-model="tel" />
				</view>
			</view>
			<view class="change-list">
				<view class="list" style="width: 55%;">
					<input class="input" placeholder="请输入验证码" v-model="verCode" />
				</view>
				<button :class="['verification-code',smsText==='获取验证码' ? 'active1' : '']" style="line-height: 80upx;" @click="smsVerification" >
					{{smsText}}
				</button>
			</view>
			<button class="finish-button" @click="goChangePassword">
				完成验证
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
			}
		},
		methods: {
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
			goChangePassword(e) {
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
				esle*/
				{
					uni.request({
						url: 'http://192.168.1.101:8080/wuhan_data1/checkSMSForgetPassword',
						data: {
							tel: this.tel,
							verCode: this.verCode,
						},
						success: (res) => {
							console.log("返回值："+res.data);
							if(res.data.code == 0){
								uni.showToast({
									icon: 'none',
									title: '验证码错误'
								});
							}
							else if(res.data.code == 1){
								uni.setStorageSync({
									key: 'user_id',
									data: res.data.id,
									success: function() {
										console.log('成功请求个人ID并存入本地缓存');
									}
								});
								uni.showToast({
									icon: 'none',
									title: '验证成功'
								});
								let url='../change_password/change_password';
								uni.navigateTo({
									url: url
								});
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
		margin-top: 20upx;
		margin-left: 20upx;
	}
	.list{
		width: 98%;
		clolor: rgb(255,255,255);
		float: left;
	}
	.input{
		height: 100upx;
		background-color: rgb(255,255,255);
		border-radius: 5px;
		font-size: 30upx;
		padding: 0 20upx;
	}
	.verification-code{
		margin-top: 10upx;
		width: 40%;
		height: 80upx;
		line-height: 80upx;
		font-size: 30upx;
		color: #FFFFFF;
		background-color: rgb(95,99,104);
	}
	.active1{
		background-color: rgb(26,130,210);
		font-size: 30upx;
	}
	.finish-button{
		width: 96%;
		height: 80upx;
		font-size: 35upx;
		color: #FFFFFF;
		background-color: rgb(26,130,210);
		border-radius: 5px; 
		margin-top: 60upx;
	}
</style>
