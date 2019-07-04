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
				<view class="list">
					<input class="input" password="true" placeholder="输入您的新密码" v-model="modifiedPass" />
				</view>
			</view>
			<view class="change-list">
				<view class="list">
					<input class="input" password="true" placeholder="再次输入新密码以确认" v-model="modifiedPass1" />
				</view>
			</view>
			<button class="finish-button" @click="goLogin">
				修改密码
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				modifiedPass: '',
				modifiedPass1: '',
			}
		},
		methods: {
			goLogin(e){
				var regNumber = /\d+/;
				var regString = /[a-zA-Z]+/;
				if(this.modifiedPass != this.modifiedPass1){
					uni.showToast({
						title: '两次输入的密码不一致',
						icon: 'none'
					});
				}
				/*else if(this.modifiedPass.length<6 || this.modifiedPass.length>14){
					uni.showToast({
						title: '请输入6至14位密码',
						icon: 'none'
					});
				}
				else if (!(regNumber.test(this.modifiedPass) && regString.test(this.modifiedPass))) {
					uni.showToast({
						icon: 'none',
						title: '密码只能为且必须包含字母和数字'
					});
				}*/
				else {
					const userID = uni.getStorageSync('user_id');
					uni.request({
						url: "http://192.168.1.101:8080/wuhan_data1/changePassword", //仅为示例，并非真实接口地址。
						method: 'POST',
						data: {
							"id": userID,
							password: this.modifiedPass,
						},
						success: (res) => {
							if(res.data.code == 1){
								uni.showToast({
									title: '修改成功，请重新登录',
									icon: 'none'
								});
								let url = '../login/login';
								uni.navigateTo({
									url: url
								});
								return false;
							}
							else if(res.data.code == 0)
							{
								uni.showToast({
									title: '修改失败，请稍后重试',
									icon: 'none'
								});
							}
						},
						fail: () => {
							uni.showToast({
								icon: 'none',
								title: '网络异常,请稍后重试'
							});
						},
					})
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
