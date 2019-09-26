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
				<view class="cu-item arrow" v-for="(item,index) in searchResult" :key="index" @click="openDetail(item.indexId, item.indexName)">
					<view class="content">
						<text class="cuIcon-titles text-blue" style="color: #3A82CC;"></text>
						<text class="text-grey">{{item.title}}</text>
					</view>
					<view class="action">
						<wd-tag style="margin-right: 10upx;" text="综合" size="small" :circle="true"></wd-tag>
						<wd-tag text="先行" size="small" :circle="true"></wd-tag>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue';
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
	import wdTag from '@/components/wd-tag/wd-tag.vue';

	export default {
		components: {
			uniList,
			uniListItem,
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
				this.searchResult = [{
						'id': '1',
						'title': '栏目1'
					},
					{
						'id': '2',
						'title': '栏目2'
					}
				];
			},
			// 跳转到指标详情页
			openDetail(indexId, indexName) {
				let source = this.source;
				console.log(source);
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
