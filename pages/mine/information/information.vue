<template>
	<view>
		<!-- 账户信息 -->
		<view style="padding: 35upx 30upx 0;">
			<text style="color: #868686; font-size: 32upx; ">账户信息</text>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in list0" @click="goDetailPage(value)">
				<view class="uni-list-cell-navigate uni-navigate-right uni-media-list" style="height: 130upx;display: flex;">
					<view class="uni-media-list-body" style="justify-content: center">
						<view class="uni-media-list-text" style="font-size: 30upx">{{value.title}}</view>
					</view>
					<view class="media-list-logo">
						<image style="height: 100upx; width: 100upx;margin-top: 10upx;" v-if="showImg" :src="value.img"></image>
					</view>
				</view>
			</view>
			<information-list v-for="(value,key) in list1" :title="value.title" :content="value.content">
			</information-list>
		</view>
		<view class="uni-list" style="margin-top: 20upx;">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in list2" @click="goDetailPage(value)">
				<view class="uni-list-cell-navigate uni-navigate-right uni-media-list">
					<view class="uni-media-list-text" style="font-size: 30upx">{{value.title}}</view>
				</view>
			</view>
		</view>
		<view style="padding: 35upx 30upx 0;">
			<text style="color: #868686; font-size: 32upx; ">个人信息</text>
			<image v-for="(value,key) in edit" src="../../../static/icon/mine/tune.png" style="width:40upx;height: 40upx;float: right;" @click="goDetailPage(value)"></image>
		</view>
		<view class="uni-list">
			<information-list v-for="(value,key) in list3" :title="value.title" :content="value.content">
			</information-list>
		</view>
		<button class="exitButton" v-for="(value,key) in exit" @click="goDetailPage(value)">
			退出登录
		</button>
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
				list0: [
					{
						title: "我的头像",
						img: "../../../static/icon/mine/head.png"
					},
				],
				list1: [
					{
						title: "手机认证",
						content: "+86 181 **** 0000"
					},
					{
						title: "职务",
						content: "××处 处长"
					},
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
				list3: [
					{
						title: "真实姓名",
						content: "李晓华"
					},
					{
						title: "性别",
						content: "男"
					},
					{
						title: "出生日期",
						content: "1980-01-01"
					},
					{
						title: "所在地区",
						content: "中国大陆 湖北省 武汉市"
					},
					{
						title: "个人描述",
						content: "时代赋予我们使命"
					},
				],
				exit: [
					{
						url: "login"
					}
				]
			}
		},
		methods: {
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
