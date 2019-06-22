<template>
	<scroll-view scroll-y="true" class="container">
		<wd-time-picker @confirm="onConfirm" :timeCondition="timeCondition"></wd-time-picker>
		<wd-choose-item v-for="(indexDetailItem, index) in indexDetail" :key="index" :requestItem="indexDetailItem"></wd-choose-item>
		<wd-related-list :relatedData="relatedData"></wd-related-list>
		<wd-share></wd-share>
	</scroll-view>
</template>

<script>
	import wdTimePicker from '@/components/wd-time-picker/wd-time-picker.vue';
	import wdChooseItem from '@/components/wd-choose-item/wd-choose-item.vue';
	import wdRelatedList from '@/components/wd-related-list/wd-related-list.vue';
	import wdShare from '@/components/wd-share/wd-share.vue';

	export default {
		components: {
			wdTimePicker,
			wdChooseItem,
			wdRelatedList,
			wdShare
		},
		data() {
			return {
				timeCondition: [],
				indexDetail: {},
				relatedData: [],
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
			this.initRelatedData();
			this.initTimeCondition();
		},

		methods: {
			initTimeCondition() {
				this.timeCondition = [{
						freqName: '月度',
						startArray: ['201701', '201702'],
						endArray: ['201709', '201710'],
						current: [0, 1]
					},
					{
						freqName: '年度',
						startArray: ['2016', '2017'],
						endArray: ['2017', '2018'],
					},
				];
			},
			initIndexDetail() {
				uni.request({
					url: 'http://wuhandata.applinzi.com/analysisDetail.php',
					method: 'GET',
					data: {},
					success: res => {
						this.indexDetail = res.data;
					},
					fail: (e) => {
						console.log(e.errMsg);
					},
					complete: () => {}
				});
			},
			initRelatedData() {
				this.relatedData = [{
					indexId: '1',
					indexName: '全社会用电量'
				}, {
					indexId: '2',
					indexName: '工业用电量'
				}, {
					indexId: '3',
					indexName: '铁路货运量'
				}, {
					indexId: '4',
					indexName: '金融机构贷款余额'
				}];
			},
			onConfirm(val) {
				console.log('发起更新数据请求');
				console.log(val);
				// http://1.wuhandata.applinzi.com/searchDetail.php
				uni.request({
					url: 'http://1.wuhandata.applinzi.com/searchDetail.php',
					method: 'GET',
					data: {},
					success: res => {
						this.indexDetail = res.data;
					},
					fail: (e) => {
						console.log(e.errMsg);
					},
					complete: () => {}
				});
				this.relatedData = [{
					indexId: '1',
					indexName: '全社会用电量'
				}, {
					indexId: '2',
					indexName: '工业用电量'
				}, {
					indexId: '3',
					indexName: '铁路货运量'
				}, {
					indexId: '4',
					indexName: '金融机构贷款余额改变'
				}];
			},
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
		/* padding-bottom: 30upx; */
		box-sizing: border-box;
	}

	.bottom-text {
		margin-top: 100upx;
		font-size: 25upx;
		text-align: center;
		color: #CDCDCD;
	}

	.active {
		position: absolute;
		margin-left: 35upx;
		margin-top: 5upx;
		width: 15upx;
		height: 15upx;
		background: red;
		border-radius: 50%;
	}

	.bottom-title {
		line-height: 60upx;
		font-size: 24upx;
		padding: 15upx 0;
	}

	.bottom-content {
		display: flex;
		flex-wrap: wrap;
		padding: 0 35upx;
	}

	.bottom-content-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 15upx;
		width: 25%;
		box-sizing: border-box;
	}

	.bottom-content-image {
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		border-radius: 10upx;
	}

	.bottom-content-text {
		font-size: 26upx;
		color: #333;
		margin-top: 10upx;
	}

	.bottom-btn {
		height: 90upx;
		line-height: 90upx;
	}
</style>
