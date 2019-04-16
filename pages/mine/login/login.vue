<template>
	<view style="height: 100%;background-image: url(../../../static/icon/mine/loginBackground.png);background-size: cover;">
		<view style="padding-top: 250upx;">
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
										<input class="input" type="text" value="user" v-model="uname" placeholder="默认为手机号" />
								</view>
							</view>
							<view class="login-list">
								<text class="title">密码</text>
								<view class="list">
									<input class="input" password="true" type="text" value="pass" v-model="passw" placeholder="请输入密码" />
								</view>
							</view>
							<view class="forget-password" v-for="(value,key) in forget_password" @click="goDetailPage(value)">
								忘记密码？
							</view>
							<button class="login-button" @tap="lands">
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
	var self;
	var webapiaddress = null;
	export default {
		data() {
			lists: [], (self = this);
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
		//页面初始加载
    mounted() {
        let that = this;

        //缓存的账号
        const HCuname = uni.getStorageSync('HCuname');
        //缓存的密码
        const HCpassw = uni.getStorageSync('HCpassw');
        //         console.log(HCpassw+"缓存的密码")
        //         console.log(HCuname)
        //有缓存就赋值给文本没有就清空
        if (HCuname && HCpassw) {
            that.uname = HCuname;
            that.passw = HCpassw;
        } else {
            that.uname = '';
            that.passw = '';
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
				let url = ~path.indexOf('platform') ? path : '../../mine/' + path + '/' + path;
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
			},
			//             //用户名：
        //         nameChange:function(e){
        //             this.uname=e.traget.value
        //         },
        //         //密码：
        //         passChange:function(e){
        //             this.passw=e.traget.value
        //         },

        //登陆
        lands() {
            if (this.uname.length <= 0 || this.passw.length <= 0) {
                uni.showToast({
                    title: '账号或密码不能为空',
                    icon: 'none'
                });
                return;
            } else {
                let TFTwoName = this.uname.substring(0, 2);
                let TFLastName = this.uname.substring(2);
                let Passwd = this.passw;
          

                var that = this;
                //链接登录  （我这是两次，第一次获取链接地址，第二次才为登录 ）
                uni.request({
                    url: 'http链接地址',
                    success: res => {
                        var sabb = [];
                    
                        // console.log(webapiaddress+"链接地址")
                        //打印链接地址
                       

                       //这里是登录（你可以直接在这里进行操作你的登录链接上面的你要删除包含对应的括号）
                        var that = this;
                        uni.request({
                            url: '' + webapiaddress + '/api/User', //链接地址
                            data: {
                                strUser: TFLastName,
                                strPwd: Passwd
                            },
                            dataType: 'json',
                            success: res => {
                                //成功
                                if (res.data.IsSuccess == true) {
                                    
                                    //缓存账号和密码
                                    if (that.rememberPsw) {
                                        uni.setStorageSync('HCuname', that.uname);
                                        uni.setStorageSync('HCpassw', that.passw);
                                    } else {
                                        uni.removeStorageSync('HCuname');
                                        uni.removeStorageSync('HCpassw');
//                                         that.uname = '';
//                                         that.passw = '';
                                    }
                                    uni.navigateTo({
                                        url: '../index/index'
                                    });
                                } else {
                                    uni.showToast({
                                        title: '用户名或密码错误',
                                        icon: 'none'
                                    });
                                }
                            }
                        });
                    }
                });
            }
        },
        //复选框
			checkboxChange: function(e) {
				console.log(e.detail.value.length);
				if (e.detail.value.length == 1) {
					//获取缓存的账号
					uni.getStorageSync('HCuname',this.uname);
					uni.getStorageSync('HCpassw',this.passw);
				}
				else {
						uni.removeStorageSync('HCuname');
						uni.removeStorageSync('HCpassw');              
				}
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
