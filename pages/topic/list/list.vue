<template>
	<view class="container">
		<!-- 专题 -->
		<view class="topic">
			<view v-for="(item,index) in topic" :key="index" @click="open_topic_detail(item)">
				<wd-card-item :image="item.image" :title="item.title"></wd-card-item>
			</view>
		</view>
	</view>
</template>

<script>
	// 引入公共样式
	import wdCardItem from '@/components/wd-card-item/wd-card-item.vue';
	import topicListApiJson from '@/common/api/topicList.json';
	export default {
		components: {
			wdCardItem
		},
		data() {
			return {
				topic: []
			};
		},
		onShow: function() {
			this.initTopicList();
		},
		onPullDownRefresh: function() {
			this.removeStorage();
			this.initTopicList();
			uni.stopPullDownRefresh();
		},
		methods: {
			removeStorage() {
				uni.removeStorage({
					key: 'topic_list',
				});
				this.topic = [];
			},
			checkNetwork() {
				uni.getNetworkType({
					success: function(res) {
						if (res.networkType == 'none') {
							uni.showToast({
								title: '无网络连接',
								duration: 1000,
								icon: 'loading'
							});
						}
					}
				});
			},
			initTopicList() {
				this.checkNetwork();
				uni.request({
					url: 'http://wuhandata.applinzi.com/topicList.php',
					method: 'GET',
					data: {},
					success: res => {
						// 获取topicList的数据
						let topicListApi = topicListApiJson;
						// 检查json数据
						if (topicListApi.errCode != 0 || topicListApi.errCode != '0') {
							// TODO 记录到服务端日志表中
							uni.showToast({
								icon: 'none',
								title: topicListApi.errMsg,
								duration: 500
							})
						}
						// 设置各部分数据
						this.topic = topicListApi.data.topic;
						// 数据存入缓存
						uni.setStorage({
							key: 'topic_list',
							data: this.topic,
						});
					},
					fail: (e) => {
						let topicList = uni.getStorageSync('topic_list');
						if (topicList) {
							this.topic = topicList;
						}
					},
					complete: () => {}
				});
			},
			open_topic_detail(item) {
				uni.navigateTo({
					url: '../detail/detail?topicId=' + item.id + '&topicName=' + item.title
				})
			}
		}
	}
</script>

<style>
	.topic {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 20upx 0upx 5upx 0upx;
		background-color: #FFFFFF;
	}

	.topic-image {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		height: 120upx;
	}

	.topic-image-src {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 30upx;
		margin-right: 30upx;
		width: 690upx;
		height: 100%;
	}
</style>
