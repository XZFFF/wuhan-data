<template>
	<view>
		<view class="uni-list">
			<view class="list-cell" hover-class="uni-list-cell-hover" v-for="(value,index) in menu_list" :key="index" @click="goDetailPage(value)">
				<view class="readSign">
				</view>
				<view>
					<view class="uni-list-cell-navigate">
						<view class="list-cell-title">{{value.title}}</view>
						<view class="list-cell-badge">{{value.badge}}</view>
						<view class="list-cell-datetime">{{value.datetime}}</view>
					</view>
					<view class="list-cell-text">{{value.text}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menu_list: [{
					title: "数说武汉v2.0即将发布",
					badge: "系统通知",
					datetime: "1天前",
					text: "新版本马上更新，请继续关注我们的最新进展。想获取更多帮助可以联系客服人员"
				},
				{
					title: '您关注的"湖北经济"有新内容',
					badge: "推送消息",
					datetime: "2天前",
					text: "湖北经济在2019.3.6新增了内容，您可以及时查看感兴趣的内容"
				},
				{
					title: '您关注的"湖北经济"有新内容',
					badge: "推送消息",
					datetime: "2天前",
					text: "湖北经济在2019.3.6新增了内容，您可以及时查看感兴趣的内容"
				},
				]
			}
		},
		methods: {
			goDetailPage(e) {
				readSign(e);
				let path = e.url ? e.url : e;
				let url = ~path.indexOf('platform') ? path : '../../mine/' + path + '/' + path;
				uni.navigateTo({
					url: url
				});
				return false;
			}
		}
	}
</script>
<style>
	.list-cell{
		border-bottom: 2upx solid rgb(229,229,229);
		display: flex;
	}
	.readSign{
		width: 0;
		height: 0;
		background-color: rgb(204,62,62);
		border-radius: 50%;
		margin-top: 80upx;
		margin-left: 20upx;
		padding: 15upx;

	}
	.list-cell-title{
		padding-left: 20upx;
		font-size: 30upx;
		width: 400upx;
	}
	.list-cell-badge{
		width: 120upx;
		height: 40upx;
		border-radius: 20px; 
		background-color: #1A82D2;
		font-size: 25upx;
		color: #FFFFFF;
		text-align: center;
	}
	.list-cell-datetime{
		color: rgb(159,159,159);
	}
	.list-cell-text{
		color: rgb(159,159,159);
		padding-left: 50upx;
		width: 80%;
	}
</style>
