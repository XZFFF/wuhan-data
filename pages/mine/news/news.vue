<template>
	<view>
		<view class="uni-list">
			<view class="list-cell" hover-class="uni-list-cell-hover" v-for="(value,index) in menu_list" :key="index" :data-current="index" @click="goDetailPage(index)">
				<!--view class="readSign"-->
				<view style="width: 50upx;position: relative;">
					<view :class="['redPoint',tabIndex[index]==index ? 'active' : '']">
					</view>
				</view>
				<view>
					<view class="uni-list-cell-navigate">
						<view class="list-cell-title">{{value.title}}</view>
						<view class="list-cell-badge">{{value.badge}}</view>
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
				tabIndex: [0,1,2],
				menu_list: [{
					title: "数说武汉v2.0即将发布",
					badge: "系统通知",
					datetime: "1天前",
					text: "新版本马上更新，请继续关注我们的最新进展。想获取更多帮助可以联系客服人员",
					url: "newsA"
				},
				{
					title: '您关注的"湖北经济"有新内容',
					badge: "推送消息",
					datetime: "2天前",
					text: "湖北经济在2019.3.6新增了内容，您可以及时查看感兴趣的内容",
					url: "newsA"
				},
				{
					title: '您关注的"湖北经济"有新内容',
					badge: "推送消息",
					datetime: "2天前",
					text: "湖北经济在2019.3.6新增了内容，您可以及时查看感兴趣的内容",
					url: "newsA"
				},
				]
			}
		},
		onShow() {
			const readIndex = uni.getStorageSync('readIndex'); 
			if (readIndex.flag) {  
				console.log(readIndex);  
				this.tabIndex = readIndex.read;
			};
			uni.removeStorageSync('readIndex');
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
				uni.request({
					url: 'http://192.168.126.1/MyNews.php',
					method: 'GET',
					data: {},
					success: res => {
						this.menu_list = res.data;
						uni.setStorage({
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
				this.tabIndex[index]=-1;
				console.log("index:"+index);
				console.log("tab:"+this.tabIndex);
				uni.setStorageSync('readIndex',{
					flag: 1,
					read: this.tabIndex});
				uni.navigateTo({
					url: 'newsA/newsA'
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
