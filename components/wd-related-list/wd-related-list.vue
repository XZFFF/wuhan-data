<template>
	<view class="related-main">
		<view class="related-nav">
			<image src="../../../static/icon/link/link.png"></image>
			<text>相关指标</text>
		</view>
		<!-- <view class="related-list"> -->
		<uni-list>
			<uni-list-item title="12"></uni-list-item>
			<uni-list-item title="132"></uni-list-item>
			<uni-list-item title="132"></uni-list-item>
			<uni-list-item v-for="(item, index) in relatedData" :key="index" :title="item.indexName"></uni-list-item>
			<!-- <wd-list-item v-for="(item, index) in relatedData" :key="index" :title="item.indexName"></wd-list-item> -->
			<!-- <view v-for="(item, index) in relatedData" :key="index" @click="openRelatedDetail(item)"> -->
			<!-- <wd-list-item :title="item.indexName"></wd-list-item> -->
			<!-- </view> -->
		</uni-list>
		<!-- </view> -->
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue';
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
	import wdListItem from '@/components/wd-list-item/wd-list-item.vue';

	export default {
		components: {
			uniList,
			uniListItem,
			wdListItem
		},
		props: {
			relatedData: {
				type: Array,
				default: function() {
					return [{
						indexId: '0',
						indexName: '相关指标1',
					}];
				}
			},
		},

		data() {
			return {

			};
		},
		methods: {
			openRelatedDetail(listItem) {
				console.log('listItem:' + listItem);
				uni.navigateTo({
					url: '../../analysis/detail/detail?indexId=' + listItem.indexId + '&indexName=' + listItem.indexName
				});
			}
		}
	}
</script>

<style>
	.related-main {
		margin-top: 30upx;
		display: flex;
		flex-direction: column;
		width: 100%;
		background-color: #FFFFFF;
	}

	.related-nav {
		width: 100%;
		height: 90upx;
		background-color: #FFFFFF;
	}

	.related-nav image {
		margin: 20upx 0upx 20upx 20upx;
		width: 50upx;
		height: 50upx;
	}

	.related-nav text {
		margin: auto 20upx;
		font-size: 14px;
	}

	.related-list {
		display: flex;
		flex-direction: column;
		/* box-sizing: border-box; */
		background-color: #FFFFFF;
		font-size: 28upx;
		line-height: inherit;
	}
</style>
