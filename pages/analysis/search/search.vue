<template>
	<view class="box">
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="栏目搜索" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-blue shadow-blur round" @click="doSearch">搜索</button>
			</view>
		</view>
		<block v-if="searchResult.length > 0">
			<view class="cu-list menu">
				<view class="cu-item arrow" v-for="(item,index) in searchResult" :key="index" @click="openDetail(item.indexId, item.indexName, item.typeName)">
					<view class="content">
						<!-- <text class="cuIcon-titles text-blue" style="color: #3A82CC;"></text> -->
						<text class="text-black">{{item.indexName}}</text>
					</view>
					<view class="action">
						<wd-tag :text="item.typeName" size="small" :circle="true"></wd-tag>
						<!-- <wd-tag :text="item.labelName" size="small" :circle="true"></wd-tag> -->
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import wdTag from '@/components/wd-tag/wd-tag.vue';
	import checkApi from '@/common/checkApi.js';
	import analysisSearchApiJson from '@/common/api/analysisSearch.json';

	export default {
		components: {
			wdTag,
		},
		data() {
			return {
				keyword: '',
				searchResult: []
			}
		},
		onLoad() {},
		methods: {
			InputFocus(e) {
				console.log(e.detail.value)
			},
			InputBlur(e) {
				console.log(e.detail.value)
				this.keyword = e.detail.value;
			},
			doSearch() {
				uni.showLoading({
					title: "正在搜索...",
				});
				checkApi.checkNetwork();
				uni.request({
					url: this.apiUrl + 'searchAnalysis',
					method: 'POST',
					data: {
						keyword: this.keyword
					},
					success: (res) => {
						let dataApi = res.data;
						// 检查json数据
						checkApi.isApi(dataApi);
						// 设置各部分数据
						this.searchResult = dataApi.data.result;
						// this.searchResult = analysisSearchApiJson.data.result;
						console.log(JSON.stringify(dataApi));
					},
					fail: (e) => {},
					complete: () => {
						uni.hideLoading();
					}
				});
			},
			// 跳转到指标详情页
			openDetail(indexId, indexName, source) {
				console.log(indexId + indexName + source);
				uni.navigateTo({
					url: '../../analysis/detail/detail?indexId=' + indexId + '&indexName=' + indexName +
						'&source=' + source
				});
			},
		}
	}
</script>

<style>
	.box {}

	.box view.cu-bar {}
</style>
