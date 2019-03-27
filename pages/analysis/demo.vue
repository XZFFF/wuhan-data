<template>
	<!-- <view class="page">
		<scroll-view scroll-x="true" scroll-y="true" class="table">
			<view v-for="(cloumnItem,cloumnIndex) in tableBody" :key="cloumnIndex" class="columnItem" :class="cloumnIndex == 0 ? 'columnFirst' : ''">
				<view v-for="(rowItem,rowIndex) in cloumnItem" :key="rowIndex" class="rowItem" :class="rowIndex == 0 ? 'rowFirst' : ''">{{rowItem}}</view>
			</view>
		</scroll-view>
	</view> -->
	<view style="width: 500upx;">
		<table-item :tableBody="tableBody"></table-item>
	</view>
</template>

<script>
	import tableItem from '../../components/table-item/table-item.vue';
	export default {
		components: {
			tableItem
		},
		data() {
			let tableBody = [
				['表头1表头1表头头1表头1', 'item1', 'item2', 'item3', 'item4', '233'],
				['表头2表头1表头1表', 'xiaoming', 'xiaohong', 'lining', '233', '233'],
				['表头3', '9000000000', '80', '70', '233', '233'],
				['表头3', '900', '80', '70', '233', '233'],
				['表头3', '900', '80', '70', '233', '233'],
				['表头3', '900', '80', '70', '233', '233']
			];
			return {
				maxHeight: "300upx",
				tableBody: tableBody,
			}
		},


	}
</script>

<style>
</style>
