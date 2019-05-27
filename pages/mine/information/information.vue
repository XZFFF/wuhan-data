<template>
	<view>
	<view v-for="(user,index) in userInformation" :key="index">
		<!-- 账户信息 -->
		<view style="padding: 35upx 30upx 0;">
			<text style="color: #868686; font-size: 32upx; ">账户信息</text>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in list0" :key="key" @click="chooseImg">
				<view class="uni-list-cell-navigate uni-navigate-right uni-media-list" style="height: 130upx;display: flex;">
					<view class="uni-media-list-body" style="justify-content: center">
						<view class="uni-media-list-text" style="font-size: 30upx">{{value.title}}</view>
					</view>
					<view class="media-list-logo">
						<image style="height: 100upx; width: 100upx;margin-top: 10upx;" :src="head"></image>
					</view>
				</view>
			</view>
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in list1" :key="key" @click="goDetailPage(value)">
				<view class="uni-list-cell-navigate uni-navigate-right uni-media-list">
					<view class="uni-media-list-text" style="font-size: 30upx">{{value.title}}</view>
					<view class="uni-media-list-text" style="float: right;color: #868686;font-size: 25upx;">{{user.area+' '+user.tel}}</view>
				</view>
			</view>
			<information-list title="职务" :content="user.rank"></information-list>
		</view>
		<view class="uni-list" style="margin-top: 20upx;">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in list2" :key="key" @click="goDetailPage(value)">
				<view class="uni-list-cell-navigate uni-navigate-right uni-media-list">
					<view class="uni-media-list-text" style="font-size: 30upx">{{value.title}}</view>
				</view>
			</view>
		</view>
		<view style="padding: 35upx 30upx 0;">
			<text style="color: #868686; font-size: 32upx; ">个人信息</text>
			<image v-for="(value,key) in edit" :key="key" src="../../../static/icon/mine/tune.png" style="width:40upx;height: 40upx;float: right;" @click="goDetailPage(value)"></image>
		</view>
		<view class="uni-list">
			<information-list title="真实姓名" :content="user.username"></information-list>
			<information-list title="性别" :content="user.sex"></information-list>
			<information-list title="出生日期" :content="user.birth"></information-list>
			<information-list title="所在地区" :content="user.city"></information-list>
			<information-list title="个人描述" :content="user.personDescription"></information-list>
		</view>
		<input type="button" class="exitButton" style="line-height:80upx" value="退出登录" v-for="(value,key) in exit" :key="key" @click="goDetailPage(value)" />
	</view>
	</view>
</template>

<script>
	import informationList from '../../../components/information-list/information-list.vue';
	export default{
		components: {
			informationList,
		},
		data(){
			return {
				title: 'list',
				showImg: true,
				userInformation: [],
				list0: [
					{
						title: "我的头像",
						img: "../../../static/icon/mine/head.png"
					},
				],
				head: '../../../static/icon/mine/head.png',
				list1: [
					{
						title: "手机认证",
						url: "change_tel"
					}
				],
				list2: [
					{
						title: "修改密码",
						url: "change_password"
					}
				],
				edit: [
					{
						url: "edit_information"
					}
				],
				exit: [
					{
						url: "login"
					}
				]
			}
		},
		onLoad:function(){
			try {
					const userInfo = uni.getStorageSync('user_Info');
					if (userInfo) {
						this.userInformation = userInfo
					} else {
						this.initUserInformation();
					}
				} catch (e) {
					console.log('无法从本地缓存获取相应数据');
				}
				this.checkNetwork();
				this.initUserInformation();
		},
		methods: {
			checkNetwork() {
				uni.getNetworkType({
					success: function(res) {
						console.log(res.networkType);
						if (res.networkType == 'none') {
							console.log('network:' + res.networkType);
							uni.showToast({
								title: '无网络连接',
								duration: 1000,
								icon: 'loading'
							});
						}
					}
				});
			},
			initUserInformation() {
				uni.request({
					url: 'http://localhost/personInfo.php',
					method: 'GET',
					data: {},
					success: res => {
						this.userInformation = res.data;
						console.log(this.userInformation);
						uni.setStorage({
							key: 'user_Info',
							data: this.userInformation,
							success: function() {
								console.log('成功请求个人信息数据并存入本地缓存');
							}
						});
					},
					fail: (e) => {},
					complete: () => {}
				});
			},
			chooseImg() { //选择图片
			    uni.chooseImage({
			        sourceType: ["camera", "album"],
			        sizeType: "compressed",
			        count: 1,
			        success: (res) => {
						this.head = '',
			            this.head = this.head.concat(res.tempFilePaths);
			        }
			    })
			},
			goDetailPage(e) {
				let path = e.url ? e.url : e;
				let url = ~path.indexOf('platform') ? path : '../' + path + '/' + path;
				uni.navigateTo({
					url: url
				});
				return false;
			}
		}
	}
</script>

<style>
	.exitButton{
		width: 90%;
		height: 80upx;
		font-size: 35upx;
		color: #FFFFFF;
		background-color: rgb(229,28,35);
		border-radius: 5px; 
		margin-top: 60upx;
	}
</style>
