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
						<input class="input"  placeholder="请输入您的手机号" />
				</view>
			</view>
			<view class="change-list">
				<view class="list" style="width: 55%;">
						<input class="input"  placeholder="请输入短信中的验证码" />
				</view>
				<button class="verification-code">
					获取验证码
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
		methods: {
			goChangePassword(e) {
				let url = '../change_password/change_password';
				uni.navigateTo({
					url: url
				});
				return false;
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
		width: 40%;
		height: 100upx;
		font-size: 30upx;
		color: #FFFFFF;
		padding: 10upx;
		background-color: rgb(26,130,210);
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
