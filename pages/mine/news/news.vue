<template>
	<view>
		<view class="uni-list">
			<view class="list-cell" hover-class="uni-list-cell-hover" v-for="(value,index) in menu_list" :key="index" :data-current="index" @click="goDetailPage(index)">
				<view>
					<view class="uni-list-cell-navigate">
						<view class="list-cell-title">{{value.title}}</view>
						<view class="list-cell-badge">{{value.label}}</view>
						<view class="list-cell-datetime">{{value.datetime}}</view>
					</view>
					<view class="list-cell-text uni-ellipsis">{{value.text}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menu_list: []
			}
		},
		onShow: function() {
			try {
				const myNews = uni.getStorageSync('my_news');
				if (myNews) {
					this.menu_list = myNews
				} else {
					this.initMyNews();
				}
			} catch (e) {
				console.log('无法从本地缓存获取相应数据');
			}
			this.checkNetwork();
			this.initMyNews();
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
			initMyNews() {
				const userID = uni.getStorageSync('user_id');
				uni.request({
					url: 'http://192.168.124.11:8080/wuhan_data1/getMessage',
					method: 'GET',
					data: {
						"id": userID,
						},
					success: res => {
						let list=JSON.stringify(res.data);
						console.log("返回数据状态:" + list);
						this.menu_list = res.data.data;
						uni.setStorageSync({
							key: 'my_news',
							data: this.menu_list,
							success: function() {
								console.log('成功请求消息数据并存入本地缓存');
							}
						});
					},
					fail: (e) => {},
					complete: () => {}
				});
			},
			goDetailPage(index) {
				uni.setStorageSync({
					key: 'news_index',
					data: index,
					success: function() {
						console.log('消息索引存入本地缓存');
					}
				});
				uni.navigateTo({
					url: 'news_details/news_details'
				});
				return false;
			},
		}
	}
</script>

<style>
	.list-cell{
		border-bottom: 2upx solid rgb(229,229,229);
		display: flex;
	}
	.active1{
		width: 0;
		height: 0;
		background-color: rgb(204,62,62);
		border-radius: 50%;
		margin-top: 60upx;
		margin-left: 20upx;
		padding: 15upx;
	}
	.active{
		width: 0;
		height: 0;
		background-color: rgb(204,62,62);
		border-radius: 50%;
		padding: 10upx;
		position: absolute;
		margin: auto; 
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}
	.list-cell-title{
		font-size: 30upx;
		width: 400upx;
	}
	.list-cell-badge{
		width: 130upx;
		height: 45upx;
		border-radius: 20px; 
		background-color: #1A82D2;
		font-size: 23upx;
		color: #FFFFFF;
		text-align: center;
	}
	.list-cell-datetime{
		color: rgb(159,159,159);
		padding-left: 10upx;
	}
	.list-cell-text{
		color: rgb(159,159,159);
		width: 600upx;
		padding-left: 30upx;
	}
</style>
