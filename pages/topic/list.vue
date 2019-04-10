<template>
	<view class="container">
		<!-- 专题 -->
		<view class="topic">
			<view v-for="(item,index) in topic" :key="index" @click="open_topic_detail">
				<card-item :image="item.image" :title="item.title"></card-item>
			</view>
		</view>
	</view>
</template>

<script>
	// 引入公共样式
	import cardItem from '../../components/card-item/card-item.vue';
	export default {
		components: {
			cardItem
		},
		data() {
			return {
				topic: []
			};
		},
		onLoad: function() {
			// TODO 此处似乎有生命周期的bug
			uni.showLoading({
				title: "Loading..."
			})
			setTimeout(function() {
				uni.hideLoading();
			}, 2000);
			// 通过请求接口获取专题数据
			uni.request({
				url: 'http://wuhandata.applinzi.com/topicList.php',
				method: 'GET',
				data: {},
				success: res => {
					uni.hideLoading();
					this.topic = res.data;
				},
				fail: (e) => {},
				complete: () => {}
			});
		},
		methods: {
			open_topic_detail(e) {
				uni.navigateTo({
					url:'./detail'
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
