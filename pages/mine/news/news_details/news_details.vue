<template>
	<view>
		<view class='title'>
			{{title}}
		</view>
		<view class='dateTime'>
			{{dateTime}}
		</view>
		<view class='content' >
			{{content}}
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return{
				title: '',
				dateTime: '',
				content: ""
			}
		},
		onShow: function() {
			let index = uni.getStorageSync('news_index');
			const myNews = uni.getStorageSync('my_news');
			try{
				this.title = myNews[index].title;
				this.dateTime = myNews[index].dateTime;
				this.content = myNews[index].content;
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
	.dateTime{
		text-align: right;
		margin-right: 100upx;
		margin-bottom: 15upx;
		font-size: 25upx;
	}
	.content{
		font-size: 35upx;
		margin-left: 30upx;
		margin-right: 30upx;
		white-space: pre-wrap;
	}
</style>
