<template>
	<view style="height:100%; background-image: url(../../../static/icon/mine/loginBackground.png);background-size: cover;">
		<view style="padding-top: 120upx;">
			<view class="login-box">
				<view>
					<view class="tab-bar">
						<view class="swiper-tab">
							<view v-for="(tab,index) in tabBars" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :data-current="index" @click="tapTab">
								{{tab.name}}
							</view>
						</view>
					</view>
					<swiper :current="tabIndex" class="swiper-box" duration="300" style="height: 800upx;">
						<swiper-item>
							<view style="font-size: 50upx; margin-left: 50upx; margin-top: 70upx; ">
								手机验证
							</view>
							<view style="font-size: 35upx; margin-left: 50upx; margin-bottom: 80upx;">
								请输入您的手机号码完成验证
							</view>
							<view class="login-list">
								<view class="title" @click="goTelIndex" style="display: flex;">+86
								<view class="triangle">
								</view>
								</view>
								<view class="list">
										<input class="input"  placeholder="请输入手机号" />
								</view>
							</view>
							<view class="login-list">
								<text class="title">验证码</text>
								<view class="list" style="width: 35%;">
									<input class="input"  placeholder="请输入验证码" />
								</view>
								<button class="verification-code">
									获取验证码
								</button>
							</view>
							<view class="login-list">
								<text class="title">密码</text>
								<view class="list">
									<input class="input"  placeholder="请输入密码" />
								</view>
							</view>
							<button class="login-button">
								注册
							</button>
						</swiper-item>
						<swiper-item>
							<view style="font-size: 50upx; margin-left: 50upx; margin-top: 70upx; ">
								账户登录
							</view>
							<view style="font-size: 35upx; margin-left: 50upx; margin-bottom: 80upx;">
								请输入您的手机号码和密码登录
							</view>
							<view class="login-list">
								<text class="title">账户</text>
								<view class="list">
										<input class="input"  placeholder="默认为手机号" />
								</view>
							</view>
							<view class="login-list">
								<text class="title">密码</text>
								<view class="list">
									<input class="input"  placeholder="请输入密码" />
								</view>
							</view>
							<view class="forget-password" v-for="(value,key) in forget_password" @click="goDetailPage(value)">
								忘记密码？
							</view>
							<button class="login-button">
								登录
							</button>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isClickChange: false,
				tabIndex: 1,
				tabBars: [{
					name: '注册',
				}, {
					name: '登录',
				}],
				forget_password: [
					{
						url: 'forget_password',
				}],
			}
		},
		methods: {
			async tapTab(e) { //点击tab-bar
				var that = this;
			    if (this.tabIndex === e.target.dataset.current) {
			        return false;
			    } else {
			        that.tabIndex = e.target.dataset.current   
			    }
			},
			goDetailPage(e) {
				let path = e.url ? e.url : e;
				let url = ~path.indexOf('platform') ? path : '../../mine/login/' + path + '/' + path;
				uni.navigateTo({
					url: url
				});
				return false;
			},
			goTelIndex(e) {
				let url = '../../mine/login/telIndex/telIndex';
				uni.navigateTo({
					url: url
				});
				return false;
			}
		}
	}
</script>

<style>
	
	.login-box{
		height: 900upx;
		width: 90%;
		background-color: #FFFFFF;
		margin-left: auto;
		margin-right: auto;
		border-radius: 10px;
	}
	.swiper-tab{
		border-top: 1px solid rgb(72,155,219);
		width: 100%;
		height: 100upx;
	}
	.swiper-tab-list{
		width: 20%;
		height: 80upx;
		margin-top: 25upx;
		margin-left: 15%;
		margin-right: 15%;
		font-size: 40upx;
		color: rgb(134,134,134);
	}
	.active{
		color: #3A82CC;
		border-bottom: 4px solid #3A82CC;
	}
	.login-list{
		display: flex;
		margin-top: 50upx;
		margin-left: 50upx;
	}
	.title{
		float: left;
		width: 120upx;
		font-size: 35upx;
	}
	.list{
		width: 70%;
		clolor: rgb(247,247,247);
		float: left;
	}
	.input{
		background-color: rgb(247,247,247);
		border-radius: 5px;
		font-size: 30upx;
		padding: 0 20upx;
	}
	.verification-code{
		width: 35%;
		height: 60upx;
		font-size: 30upx;
		color: #FFFFFF;
		background-color: rgb(26,130,210);
	}
	.login-button{
		width: 90%;
		height: 80upx;
		font-size: 35upx;
		color: #FFFFFF;
		background-color: rgb(26,130,210);
		border-radius: 5px; 
		margin-top: 80upx;
	}
	.forget-password{
		margin-left: 50upx;
		margin-top: 50upx;
		font-size: 35upx;
		color: rgb(26,130,210);
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
