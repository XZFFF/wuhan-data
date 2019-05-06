<template>
	<scroll-view scroll-y="true" class="container">
		<!-- 标题栏 -->
		<wd-time-picker></wd-time-picker>
		<wd-choose-item v-for="(indexDetailItem, index) in indexDetail" :key="index" :requestItem="indexDetailItem"></wd-choose-item>
	</scroll-view>
</template>

<script>
	import wdTimePicker from '@/components/wd-time-picker/wd-time-picker.vue';
	import wdChooseItem from '@/components/wd-choose-item/wd-choose-item.vue';

	export default {
		components: {
			wdTimePicker,
			wdChooseItem
		},
		data() {
			return {
				indexDetail: {},
				indexId: "1000",
				indexName: "指标详情页",
			};
		},
		onLoad: function(e) {
			if (JSON.stringify(e) != '{}') {
				this.indexId = e.indexId;
				this.indexName = e.indexName;
				uni.setNavigationBarTitle({
					title: e.indexName
				})
			}
		},
		onShow: function() {
			this.initIndexDetail();
		},
		onPullDownRefresh: function() {
			this.initIndexDetail();
			uni.stopPullDownRefresh();
		},
		// 导航栏自定义按钮
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				uni.share({

				})
			}
			uni.showToast({
				title: e.index === 0 ? "你点了分享按钮" : "你点了收藏按钮",
				icon: "none"
			})
		},
		methods: {
			initIndexDetail() {
				uni.request({
					url: 'http://wuhandata.applinzi.com/analysisDetail.php',
					method: 'GET',
					data: {},
					success: res => {
						this.indexDetail = res.data;
						console.log(this.indexDetail);
					},
					fail: (e) => {
						console.log(e.errMsg);
					},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
	page,
	view {
		display: flex;
	}

	page {
		min-height: 100%;
	}

	.container {
		flex: 1;
		flex-direction: column;
		padding-bottom: 30upx;
		box-sizing: border-box;
	}
</style>
