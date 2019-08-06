<template>
	<!-- <view class="container" :style="{height:totalHeight + 'px'}">
		<block v-for="(item, index) in indexDetail" :key="index">
			<wd-table v-if="item.classType === 'table'" :title="item.classTitle" :tableBody="item.tableBody"></wd-table>
			<wd-echarts v-if="item.classType === 'echarts'" :canvasId="'echart'+item.id" :echartOption="item.echartOption"
			 :classHeight="item.classHeight" :classTitle="item.classTitle"></wd-echarts>
		</block>
	</view> -->
	<view>
	</view>
</template>

<script>
	// 引入文件
	import request from '@/components/request/index.js';
	import wdEcharts from '@/components/wd-echarts/wd-echarts.vue';
	import wdTable from '@/components/wd-table/wd-table.vue';
	import echartsData from "@/common/api/echarts.json";

	export default {
		components: {
			wdEcharts,
			wdTable
		},
		data() {
			return {
				indexDetail: {},
				totalHeight: 400,
				topicLen: 4
			};
		},
		onLoad: function(e) {
			console.log('onLoad')
			this.initPage();
			let isFirst = uni.getStorageSync('isFirst');
			if (isFirst == 0) {
				this.$_callback1(1);
				uni.setStorageSync('isFirst', 1);
			} else {
				console.log("no isFirst");
			}

			// this.$_promise();
			// this.initIndexDetail();
		},
		onShow: function() {

		},
		methods: {
			initPage() {
				try {
					const res = uni.getStorageInfoSync();
					if (res.keys.indexOf("home_topic")) {
						let topicList = uni.getStorageSync('home_topic');
						console.log(topicList);
						if (topicList) {
							this.topicLen = topicList.length;
						}
					}
				} catch (e) {
					// error
				}
			},
			$_callback1(topicId) {
				let r = request.get({
					url: this.apiUrl + 'topic' + topicId,
					success: res => {
						uni.showToast({
							title: '专题' + topicId + '加载成功',
							icon: 'none'
						});
						console.log(JSON.stringify(res.data));
					},
					fail: err => {
						uni.showToast({
							title: '专题' + topicId + '加载失败',
							icon: 'none'
						});
						console.log(JSON.stringify(err));
					},
					complete: res => {
						if (topicId < this.topicLen) {
							this.sleep(1000);
							this.$_callback1(topicId + 1)
						}
					}
				});

				// request.stop(r);
			},

			$_promise() {
				let r = request
					.post({
						url: "/5cda87e31d38be0d2dd91a44/example/post"
					})
					.then(res => {
						console.log("then: " + this.requestId);
					})
					.catch(err => {
						console.log("catch" + this.requestId);
					})
					.finally(() => {
						console.log("is finally" + this.requestId);
					});

				// request.stop(r);
			},

			sleep(numberMillis) {
				var now = new Date();
				var exitTime = now.getTime() + numberMillis;
				while (true) {
					now = new Date();
					if (now.getTime() > exitTime)
						return;
				}
			},

			initIndexDetail() {
				// let serverData = echartsData;
				// this.indexDetail = serverData.data.classInfo;
				// this.totalHeight = serverData.data.classInfo.length * 400;
			},
		}
	}
</script>

<style>
	page {
		display: flex;
		background: #f4f5f6;
		width: 750upx;
		overflow-x: hidden;
	}

	view {
		/* 设置flex会导致classHeight无效，但不设置会导致classTitle错位 */
		display: flex;
	}

	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
</style>
