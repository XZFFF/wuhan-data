<template>
	<view>
		<view>
			<!-- 账户信息 -->
			<view style="padding: 35upx 30upx 0;">
				<text style="color: #868686; font-size: 32upx; ">账户信息</text>
			</view>
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="chooseImg()">
					<view class="uni-list-cell-navigate uni-navigate-right uni-media-list" style="height: 130upx;display: flex;">
						<view class="uni-media-list-body" style="justify-content: center">
							<view class="uni-media-list-text" style="font-size: 30upx">我的头像</view>
						</view>
						<view class="media-list-logo">
							<image style="height: 100upx; width: 100upx;margin-top: 10upx;" :src="user.head"></image>
						</view>
					</view>
				</view>
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate uni-media-list">
						<view class="uni-media-list-text" style="font-size: 30upx">手机号码</view>
						<view class="uni-media-list-text" style="float: right;color: #868686;font-size: 25upx;">{{user.tel}}</view>
					</view>
				</view>
				<information-list title="职务" :content="user.roleName"></information-list>
			</view>
			<view class="uni-list" style="margin-top: 20upx;">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="goDetailPage('change_tel')">
					<view class="uni-list-cell-navigate uni-navigate-right uni-media-list">
						<view class="uni-media-list-text" style="font-size: 30upx">更换手机号</view>
					</view>
				</view>
			</view>
			<view style="padding: 35upx 30upx 0;">
				<text style="color: #868686; font-size: 32upx; ">个人信息</text>
				<image src="../../../static/icon/mine/tune.png" style="width:40upx;height: 40upx;float: right;" @click="goDetailPage('edit_information')"></image>
			</view>
			<view class="uni-list">
				<information-list title="真实姓名" :content="user.realName"></information-list>
				<information-list title="性别" :content="user.gender"></information-list>
				<information-list title="出生日期" :content="user.birthday"></information-list>
				<information-list title="所在地区" :content="user.city"></information-list>
				<information-list title="个人描述" :content="user.description"></information-list>
			</view>
			<input type="button" class="exitButton" style="line-height:80upx" value="退出登录" @click="goDetailPage('exit')" />
		</view>
	</view>
</template>

<script>
	import informationList from '@/components/information-list/information-list.vue';
	import checkApi from '@/common/checkApi.js';
	import getUserApiJson from "@/common/api/getUser.json";

	export default {
		components: {
			informationList,
		},
		data() {
			return {
				token: "",
				user: {
					"userId": "",
					"tel": "",
					"realName": "",
					"gender": "",
					"head": "",
					"birthday": "",
					"city": "",
					"description": "",
					"department": "",
					"roleName": ""
				}, // 用户信息
				showImg: true,
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
			this.initUser();
		},
		methods: {
			initUser() {
				checkApi.checkNetwork();
				uni.request({
					url: 'http://www.baidu.com',
					data: {
						"token": this.token,
					},
					success: (res) => {
						let dataApi = getUserApiJson;
						checkApi.isApi(dataApi);
						this.user = dataApi.data;
						let userStr = JSON.stringify(this.user);
						uni.setStorageSync('user', userStr);
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
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						/*uni.uploadFile({
							//url: 'http://192.168.124.11:8080/wuhan_data1/UpImagesHead', //仅为示例，非真实的接口地址
							url: 'http://192.168.1.104/personInfo.php',
							filePath: tempFilePaths[0],
							header:{"content-type": "multipart/form-data"},
							formData: {
								"token": this.token,
								},
							name: 'file',
							success: (uploadFileRes) => {
								console.log("上传："+tempFilePaths[0]);
								console.log(uploadFileRes.data);
							}
						});*/
						this.user.head = '';
						this.user.head = this.user.head.concat(chooseImageRes.tempFilePaths);
					},
				})
			},
			goDetailPage(func) {
				let url = "";
				switch (func) {
					case 'change_tel':
						url = "../change_tel/change_tel";
						break;
					case 'edit_information':
						url = "../edit_information/edit_information";
						break;
					case 'exit':
						uni.showModal({
							title: '提示',
							content: '是否退出登录？',
							success: res => {
								if (res.confirm) {
									uni.removeStorage({
										key: "token"
									});
									uni.removeStorage({
										key: "user"
									});
									url = "../login/login";
									uni.navigateTo({
										url: url
									});
									return;
								}
							}
						});
						break;
					default:
						url = "";
						break;
				}
				if (url != "") {
					console.log(url);
					uni.navigateTo({
						url: url
					});
				}
				return;
			}
		}
	}
</script>

<style>
	.exitButton {
		width: 90%;
		height: 80upx;
		font-size: 35upx;
		color: #FFFFFF;
		background-color: rgb(229, 28, 35);
		border-radius: 5px;
		margin-top: 60upx;
	}
</style>
