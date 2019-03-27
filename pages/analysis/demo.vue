<template>
	<view class="page">
		<scroll-view scroll-x="true" scroll-y="true" class="table">
			<view v-for="(cloumnItem,cloumnIndex) in tableBody" :key="cloumnIndex" class="columnItem" :class="cloumnIndex == 0 ? 'columnFirst' : ''">
				<view v-for="(rowItem,rowIndex) in cloumnItem" :key="rowIndex" class="rowItem" :class="rowIndex == 0 ? 'rowFirst' : ''">{{rowItem}}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			let tableBody = [
				['表头1表头1表头头1表头1', 'item1', 'item2', 'item3', 'item4'],
				['表头2表头1表头1表', 'xiaoming', 'xiaohong', 'lining', '233'],
				['表头3', '9000000000', '80', '70', '233'],
				['表头3', '900', '80', '70', '233'],
				['表头3', '900', '80', '70', '233'],
				['表头3', '900', '80', '70', '233']
			];
			return {
				tableBody: tableBody,
			}
		},


	}
</script>

<style>
	.page {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
	}

	.table {
		width: 100%;
		overflow: hidden;
		max-height: 500upx;
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
