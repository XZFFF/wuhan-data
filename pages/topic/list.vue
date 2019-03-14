<template>
	<view class="container">
		<!-- 专题 -->
		<view class="topic">
			<view v-for="(item,index) in topic" :key="index">
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
			let topic = [{
					title: "湖北高质量发展",
					image: "../../static/topic/topic1.png"
				},
				{
					title: "宏观形势分析",
					image: "../../static/topic/topic2.png"
				},
				{
					title: "武汉供给测结构",
					image: "../../static/topic/topic3.png"
				},
				{
					title: "武汉工业经济发展",
					image: "../../static/topic/topic4.png"
				}
			]
			return {
				topic: topic
			};
		}
	}
</script>

<style>
	.topic {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-top: 30upx;
		padding: 5upx;
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
