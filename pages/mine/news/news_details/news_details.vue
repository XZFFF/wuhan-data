<template>
	<view>
		<view class='title'>
			{{title}}
		</view>
		<view class='datetime'>
			{{datetime}}
		</view>
		<view class='text' >
			{{text}}
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return{
				title: '',
				datetime: '',
				text: ""
			}
		},
		onShow: function() {
			const index = uni.getStorageSync('news_index');
			try{
				const myNews = uni.getStorageSync('my_news');
				this.title = myNews[index].title;
				this.datetime = myNews[index].datetime;
				this.text = myNews[index].text;
			}
			catch (e) {
				console.log('无法从本地缓存获取相应数据');
			}
		}
	}
</script>

<style>
	.title{
		margin-top: 30upx;
		font-size: 50upx;
		text-align: center;
	}
	.datetime{
		text-align: right;
		margin-right: 100upx;
		margin-bottom: 15upx;
		font-size: 25upx;
	}
	.text{
		font-size: 35upx;
		margin-left: 30upx;
		margin-right: 30upx;
		white-space: pre-wrap;
	}
</style>
