<template>
	<view>
		<view style="margin-bottom: 20px;"></view>
		<view v-for="(item,index) in messageList" :key="index" @click="openNews(index)">
			<view style="display: flex; flex-direction: row; align-items: center; justify-content: center;">
				<wd-tag type="time" :text="item.tranTime"></wd-tag>
			</view>
			<wd-message-card :title="item.title" :content="item.content" :thumbnail="item.icon" :extra="item.label">
			</wd-message-card>
			<view style="margin-top: 20px;"></view>
		</view>
		<view v-if="message.length == 0" class="no-data">您还没有任何消息</view>
	</view>
</template>

<script>
	import wdTag from '@/components/wd-tag/wd-tag.vue';
	import wdMessageCard from '@/components/wd-message-card/wd-message-card.vue';
	import checkApi from '@/common/checkApi.js';
	import getNewsApiJson from "@/common/api/getMessage.json";
	
	export default {
		components: {
			wdTag,
			wdMessageCard
		},
		data() {
			return {
				message: [],
			}
		},
		onShow: function() {
			this.getNewsStorage();
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
		computed: {
			messageList: function() {
				let messageList = this.message;
				try {
					for (let i = 0; i < messageList.length; i++) {
						messageList[i].tranTime = this.tranTime(messageList[i].dateTime);
						let iconPath = '../../../static/icon/message/';
						switch (messageList[i].type) {
							case "pdf":
								messageList[i].icon = iconPath + 'file.png';
								break;
							case "excel":
								messageList[i].icon = iconPath + 'file.png';
								break;
							case "link":
								messageList[i].icon = iconPath + 'link.png';
								break;
							case "message":
								messageList[i].icon = iconPath + 'message.png';
								break;
							default:
								messageList[i].icon = iconPath + 'message.png';
								break;
						}
					}
					return messageList;
				} catch (e) {
					console.log(JSON.stringify(e));
				}

			}
		},
		methods: {
			tranTime(time) {
				var timestamp = Math.round(new Date(time) / 1000);
				var mistiming = Math.round(new Date() / 1000) - timestamp;
				console.log(mistiming);
				var arrr = ['年', '个月', '星期', '天', '小时', '分钟', '秒'];
				var arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1];
				for (var i = 0; i <= 6; i++) {
					var inm = Math.floor(mistiming / arrn[i]);
					if (inm != 0) {
						return inm + arrr[i] + '前';
					}
				}
			},
			initMyNews() {
				checkApi.checkNetwork();
				uni.request({
					url: this.apiUrl + "getMessageApp",
					method: 'POST',
					data: {
						"token": this.token,
					},
					success: (res) => {
						try {
							let dataApi = res.data;
							// let dataApi = getNewsApiJson;
							checkApi.isApi(dataApi);
							this.message = dataApi.data.message;
							console.log(JSON.stringify(this.message));
							uni.setStorageSync('my_news', this.message);
						} catch (e) {
							console.log(e.errMsg);
							this.getNewsStorage();
						}
					},
					fail: (e) => {
						console.log(e.errMsg);
						this.getNewsStorage();
					},
				});
			},
			getNewsStorage() {
				try {
					let myNews = uni.getStorageSync('my_news');
					if (myNews) {
						this.message = myNews;
					}
				} catch (e) {
					console.log(e.message);
				}
			},
			openNews(index) {
				let myNews = uni.getStorageSync('my_news');
				let type = myNews[index].type;
				if (type == 'message') {
					uni.setStorageSync('news_index', index);
					uni.navigateTo({
						url: 'news_details/news_details'
					});
					return false;
				}
				if (type == 'pdf' || type == 'excel') {
					let path = myNews[index].path;
					uni.downloadFile({
						url: path,
						success: function(res) {
							uni.showToast({
								title: '文档下载成功'
							});
							var filePath = res.tempFilePath;
							uni.openDocument({
								filePath: filePath,
								success: function(res) {
									console.log('打开文档成功');
								}
							});
						},
						fail: function(e) {
							uni.showToast({
								title: '文档下载失败'
							});
						}
					});
				}
				if (type == 'link') {
					let path = myNews[index].path;
					plus.runtime.openURL(path);
					return;
				}
			},
		}
	}
</script>

<style>
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #fff
	}

	view {
		font-size: 28upx;
		line-height: inherit
	}

	.no-data {
		text-align: center;
		color: #999;
		margin: 100upx;
	}
</style>
