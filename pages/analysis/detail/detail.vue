<template>
	<scroll-view scroll-y="true" class="container">
		<wd-time-picker @confirm="onConfirm" :timeCondition="timeCondition"></wd-time-picker>
		<wd-choose-item v-for="(indexDetailItem, index) in indexDetail" :key="index" :requestItem="indexDetailItem"></wd-choose-item>
		<wd-related-list :relatedData="relatedData"></wd-related-list>
	</scroll-view>
</template>

<script>
	import wdTimePicker from '@/components/wd-time-picker/wd-time-picker.vue';
	import wdChooseItem from '@/components/wd-choose-item/wd-choose-item.vue';
	import wdRelatedList from '@/components/wd-related-list/wd-related-list.vue';

	export default {
		components: {
			wdTimePicker,
			wdChooseItem,
			wdRelatedList
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
		/* padding-bottom: 30upx; */
		box-sizing: border-box;
	}
</style>
