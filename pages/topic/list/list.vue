<template>
	<view class="container">
		<!-- 专题 -->
		<view class="topic">
			<view v-for="(item,index) in topic" :key="index" @click="open_topic_detail(item)">
				<wd-card-image :image="item.image" :title="item.title"></wd-card-image>
			</view>
		</view>
	</view>
</template>

<script>
	// 引入公共样式
	import wdCardImage from '@/components/wd-card-image/wd-card-image.vue';
	import {
		isApi
	} from '@/common/checkApi.js';
	import topicListApiJson from '@/common/api/topicList.json';
	export default {
		components: {
			wdCardImage
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
					// url: 'http://192.168.124.20:8089/wuhan_data1/initIndexTopic',
					url: this.apiUrl + 'initIndexTopic',
					method: 'GET',
					data: {},
					success: res => {
						console.log("获取成功;" + JSON.stringify(res.data));
						// 获取topicList的数据
						let dataApi = res.data;
						// 检查json数据
						isApi(dataApi);
						// 设置各部分数据
						this.topic = dataApi.data.topic;
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
					url: '../detail/detail?indexId=' + item.id + '&indexName=' + item.title
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
