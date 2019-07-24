<template>
	<view>
		<view>
			<view class="list-cell" v-for="(value,index) in menu_list" :key="index" :data-current="index" @click="goDetailPage(index)">
				<view>
					<view class="uni-list-cell-navigate">
						<view class="list-cell-title">{{value.title}}</view>
						<view class="list-cell-badge">{{value.label}}</view>
						<view class="list-cell-datetime">{{value.dateTime}}</view>
					</view>
					<view class="list-cell-text">{{value.content}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import checkApi from '@/common/checkApi.js';
	import getNewsApiJson from "@/common/api/getMessage.json";
	export default {
		data() {
			return {
				menu_list: []
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
					uni.switchTab({
						url: "../../tabbar/mine/mine"
					});
				}, 1000);
			}
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
				checkApi.checkNetwork();
				uni.request({
					url: "http://192.168.124.11:8080/wuhan_data1/getMessageApp",
					//url: "http://www.baidu.com",
					method: 'POST',
					data: {
						"token": this.token,
					},
					success: (res) => {
						try {
							let dataApi = res.data;
							//let dataApi = getNewsApiJson;
							checkApi.isApi(dataApi);
							this.menu_list = dataApi.data.message;
							uni.setStorageSync('my_news', this.menu_list);
						} catch (e) {
							console.log(e.errMsg);
							this.getCollectStorage();
						}
					},
					fail: (e) => {
						console.log(e.errMsg);
						this.getNewsStorage();
					},
				});
			},
			getCollectStorage() {
				try {
					let myNews = uni.getStorageSync('my_news');
					if (myNews) {
						this.menu_list = myNews;
					}
				} catch (e) {
					console.log(e.message);
				}
			},
			goDetailPage(index) {
				uni.setStorageSync('news_index', index);
				uni.navigateTo({
					url: 'news_details/news_details'
				});
				return false;
			},
		}
	}
</script>

<style>
	.list-cell {
		border-bottom: 2upx solid rgb(229, 229, 229);
		display: flex;
	}

	.uni-list-cell-navigate{
		display: flex;
		justify-content: space-between;
	}
	
	.list-cell-title {
		font-size: 35upx;
		width: 460upx;
	}

	.list-cell-badge {
		width: 140upx;
		height: 45upx;
		border-radius: 20px;
		background-color: #1A82D2;
		font-size: 23upx;
		color: #FFFFFF;
		text-align: center;
	}

	.list-cell-datetime {
		color: rgb(159, 159, 159);
		padding-left: 30upx;
	}

	.list-cell-text {
		color: rgb(159, 159, 159);
		width: 600upx;
		padding-left: 30upx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp:2;
		-webkit-box-orient:vertical;
	}
</style>
