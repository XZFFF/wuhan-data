<template>

	<view class="table-main">
		<view class="table-nav">
			<image src="../../../static/icon/echarts/table.png"></image>
			<text>{{title}}</text>
		</view>

		<view class="page">
			<scroll-view scroll-x="true" scroll-y="true" class="table">
				<view v-for="(cloumnItem,cloumnIndex) in tableBodyTran" :key="cloumnIndex" class="columnItem" :class="cloumnIndex == 0 ? 'columnFirst' : ''">
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
			},
			title: {
				type: String,
				default: '表格展示',
			},
		},
		computed: {
			classHeight: function() {
				let classHeight = 0;
				let _self = this;
				try {
					let tableParam = tableBody[0].length;
					classHeight = (tableParam + 1) * 40;
				} catch (e) {
					//TODO handle the exception
				}
				return classHeight;
			},
			tableBodyTran: function() {
				let _self = this;
				let tableBodyTran = _self.tableBody;
				for (let i = 0; i < tableBodyTran.length; i++) {
					for (let j = 0; j < tableBodyTran[i].length; j++) {
						if (tableBodyTran[i][j] == "null" || tableBodyTran[i][j] == "" ||
							tableBodyTran[i][j] == null) {
							tableBodyTran[i][j] = '-';
						}
					}
				}
				return tableBodyTran;
			}
		},
		data() {
			return {};
		}
	}
</script>

<style>
	.table-main {
		margin-top: 30upx;
		display: flex;
		flex-direction: column;
		width: 100%;
		background-color: #FFFFFF;
	}

	.table-nav {
		display: flex;
		width: 100%;
		height: 90upx;
		background-color: #FFFFFF;
		border-bottom-color: #E7E7E7;
		border-bottom-style: solid;
		border-bottom-width: 3upx;
	}

	.table-nav image {
		margin: 20upx 0upx 20upx 20upx;
		width: 50upx;
		height: 50upx;
	}

	.table-nav text {
		margin: auto 20upx;
		font-size: 14px;
	}

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
