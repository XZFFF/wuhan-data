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
				if(this.modifiedPass != this.modifiedPass1){
					uni.showToast({
						title: '两次输入的密码不一致',
						icon: 'none'
					});
				}
				else if(this.modifiedPass.length<6 || this.modifiedPass.length>14){
					uni.showToast({
						title: '请输入6至14位密码',
						icon: 'none'
					});
				}
				else {
					uni.request({
						url: "http://localhost/personInfo.php", //仅为示例，并非真实接口地址。
						method: 'POST',
						data: this.modifiedPass,
						success: (res) => {
							uni.showToast({
								title: '修改密码需要重新登录',
								icon: 'none'
							});
							let url = '../login/login';
							uni.navigateTo({
								url: url
							});
							return false;
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
