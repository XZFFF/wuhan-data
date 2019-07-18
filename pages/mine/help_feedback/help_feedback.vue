<template>
	<view>
		<view class="uni-list">
			<view class="list-cell" hover-class="uni-list-cell-hover" v-for="(item,key) in menu_list" :key="key" @click="goHelpDetail(item.id)">
				<view class="uni-list-cell-navigate uni-navigate-right uni-media-list">
					<view class="uni-media-list-body" style="justify-content: center">
						<view class="uni-media-list-text" style="font-size: 35upx">{{item.title}}</view>
					</view>
				</view>
			</view>
		</view>
		<input type="button" class="feedback-submit" style="line-height:80upx" value="反馈我的问题" @click="goFeedback()" />
	</view>
</template>

<script>
	import checkApi from '@/common/checkApi.js';
	import helpFeedbackApiJson from "@/common/api/helpFeedback.json";

	export default {
		data() {
			return {
				menu_list: [],
			}
		},
		onShow: function() {
			this.initHelp();
		},
		methods: {
			initHelp() {
				checkApi.checkNetwork();
				uni.request({
					url: 'http://www.baidu.com',
					method: 'GET',
					data: {},
					success: (res) => {
						try {
							let dataApi = helpFeedbackApiJson;
							checkApi.isApi(dataApi);
							this.menu_list = dataApi.data.help;
							uni.setStorageSync('help', this.menu_list);
						} catch (e) {
							console.log(e.errMsg);
							this.getHelpStorage();
						}
					},
					fail: (e) => {
						console.log(e.errMsg);
						this.getHelpStorage();
					},
				});
			},
			getHelpStorage() {
				try {
					let helpInfo = uni.getStorageSync('help');
					if (helpInfo) {
						this.menu_list = helpInfo;
					}
				} catch (e) {
					console.log(e.message);
				}
			},
			goHelpDetail(id) {
				uni.navigateTo({
					url: "help?id=" + id
				});
			},
			goFeedback() {
				uni.navigateTo({
					url: "../feedback/feedback"
				});
			}
		}
	}
</script>

<style>
	page {
		background-color: #EFEFF4;
	}

	.list-cell {
		border-bottom: 1upx solid rgb(229, 229, 229);
	}

	.feedback-submit {
		margin-top: 600upx;
		margin-left: 5%;
		width: 90%;
		height: 80upx;
		font-size: 35upx;
		color: black;
		background-color: #FFFFFF;
		border-radius: 5px;
	}
</style>
