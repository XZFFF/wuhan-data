<template>

	<view class="ti-main">
		<view class="ti-nav">
			<image src="../../static/icon/echarts/table.png"></image>
			<text>表格展示</text>
		</view>

		<view class="page">
			<scroll-view scroll-x="true" scroll-y="true" class="table"  style="height: 200upx;">
				<view v-for="(cloumnItem,cloumnIndex) in tableBody" :key="cloumnIndex" class="columnItem" :class="cloumnIndex == 0 ? 'columnFirst' : ''">
					<view v-for="(rowItem,rowIndex) in cloumnItem" :key="rowIndex" class="rowItem" :class="rowIndex == 0 ? 'rowFirst' : ''">{{rowItem}}</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			tableBody: {
				type: Array,
				default: function(e) {
					return [
						['表头1', ''],
						['表头2', '']
					]
				}
			}
		},
		data() {
			return {};
		}
	}
</script>

<style>
	.ti-main {
		display: flex;
		width: 100%;
		flex-direction: column;
	}

	.ti-nav {
		width: 100%;
		height: 90upx;
		background-color: #FFFFFF;
		border-bottom-color: #E7E7E7;
		border-bottom-style: solid;
		border-bottom-width: 3upx;
	}

	.ti-nav image {
		margin: 20upx 0upx 20upx 20upx;
		width: 50upx;
		height: 50upx;
	}

	.ti-nav text {
		margin: 20upx 20upx 20upx 20upx;
		font-size: 12px;
	}

	.page {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
	}

	.table {
		width: 100%;
		overflow: hidden;
		max-height: 700upx;
	}

	.columnItem {
		display: inline-block;
		text-align: center;
		border-right: 2rpx solid #EBEEF4;
		box-sizing: border-box
	}

	.columnFirst {
		border-left: 2rpx solid #EBEEF4;
	}

	.rowItem {
		border-bottom: 2rpx solid #EBEEF4;
		padding: 15upx;
	}

	/* 表头样式 */
	.rowFirst {
		border-top: 2rpx solid #EBEEF4;
		padding-top: 25upx;
		padding-bottom: 25upx;
		background-color: #F5F7FA;
	}
</style>
