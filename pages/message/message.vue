<template>
	<view>
		<view v-for="(item,index) in messageList" :key="index">
			<view style="display: flex; flex-direction: row; align-items: center; justify-content: center;">
				<wd-tag type="time" :text="item.tranTime"></wd-tag>
			</view>
			<wd-message-card :title="item.title" :content="item.content" :thumbnail="item.icon" :extra="item.label">
			</wd-message-card>
			<view style="margin-top: 20px;"></view>
		</view>
	</view>
</template>

<script>
	import wdTag from '@/components/wd-tag/wd-tag.vue'
	import wdMessageCard from '@/components/wd-message-card/wd-message-card.vue'
	export default {
		components: {
			wdTag,
			wdMessageCard
		},
		data() {
			return {
				message: [{
					title: '标题1',
					content: '缩略内容略内容缩略内容缩略内容缩略内容缩略内容缩略内容缩略',
					time: '2019/07/30 16:10:10',
					type: 'link',
					label: '系统通知'
				}, {
					title: '标题2',
					content: '缩略内容缩略内容缩略内容缩略内容缩略内容缩略内容缩略内容缩略内容缩略内容缩略内容缩略内容缩略内容缩略内容缩略内容缩略内容缩略内容缩略内容缩略内容',
					time: '2019/07/27',
					type: 'pdf',
					label: '专属推送'
				}, {
					title: '标题2',
					content: '缩略内容缩略内容缩略内容缩略内容缩略内容缩略内容缩略内容缩略内容缩略内容缩略内容缩略内容缩略内容缩略内容缩略内容缩略内容缩略内容缩略内容缩略内容',
					time: '2019/07/27',
					type: 'message',
					label: '专属推送'
				}],
			}
		},
		computed: {
			messageList: function() {
				let messageList = this.message;
				for (let i = 0; i < messageList.length; i++) {
					messageList[i].tranTime = this.tranTime(messageList[i].time);
					let iconPath = '../../static/icon/message/';
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
							break;
					}
				}
				return messageList;
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
			}
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
</style>
