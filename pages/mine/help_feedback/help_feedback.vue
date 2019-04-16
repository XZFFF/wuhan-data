<template>
	<view>
		<view class="uni-list">
			<view class="list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in menu_list" @click="goDetailPage(value)">
				<view class="uni-list-cell-navigate uni-navigate-right uni-media-list">
					<view class="uni-media-list-body" style="justify-content: center">
						<view class="uni-media-list-text" style="font-size: 35upx">{{value.title}}</view>
					</view>
				</view>
			</view>
		</view>
		<button type="default" class="feedback-submit" v-for="(value,key) in feedback" @click="goDetailPage(value)">
			反馈我的问题
		</button>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				menu_list: [
					{
					title: "如何绑定/换绑手机号？",
				},{
					title: "如何获得职位认证？",
				},{
					title: "数据下载失败？",
				}
				],
				
				feedback: [
					{
					url: "feedback",
				}
				]
			}
		},
		methods: {
			goDetailPage(e) {
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
	page {
	    background-color: #EFEFF4;
	}
	.list-cell{
		border-bottom: 1upx solid rgb(229,229,229);
	}
	.feedback-submit{
		margin-top: 600upx;
	}
	
</style>
