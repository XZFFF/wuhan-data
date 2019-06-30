<template>
	<view v-if="relatedData.length != 0" class="related-main">
		<view class="related-nav">
			<image src="../../../static/icon/link/link.png"></image>
			<text>相关指标</text>
		</view>
		<uni-list>
			<uni-list-item v-for="(item, index) in relatedData" :key="index" :title="item.indexName" @click="openRelatedDetail(item)"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue';
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue';

	export default {
		components: {
			uniList,
			uniListItem
		},
		props: {
			relatedData: {
				type: Array,
				default: function() {
					return [];
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
</style>
