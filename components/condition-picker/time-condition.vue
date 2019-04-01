<template>
	<view class="ti-main">
		<view class="ti-nav">
			<image src="../../static/icon/echarts/calender.png"></image>
			<text>时间选择</text>
		</view>

		<view class="ti-condition">
			<view class="ti-condition-name">
				<text>起始时间:</text>
			</view>
			<view class="ti-condition-choose uni-list-cell-db">
				<picker @change="bindPickerChange1" :value="index1" :range="array1">
					<text>{{array1[index1]}}</text>
				</picker>
			</view>
		</view>

		<view class="ti-condition">
			<view class="ti-condition-name">
				<text>结束时间:</text>
			</view>
			<view class="ti-condition-choose uni-list-cell-db">
				<picker @change="bindPickerChange2" :value="index2" :range="array2">
					<text>{{array2[index2]}}</text>
				</picker>
			</view>
		</view>

		<view class="ti-condition" style="padding-bottom: 30upx;">
			<view class="ti-condition-name">
				<text>季/年度:</text>
			</view>
			<view class="ti-condition-radio uni-list-cell-db">
				<radio-group name="radio">
					<label>
						<radio value="radio1" />选项一
					</label>
					<label>
						<radio value="radio2" />选项二
					</label>
				</radio-group>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index1: 0,
				index2: 0,
				array1: ['2017Q1', '2017Q2', '2017Q3', '2017Q4'],
				array2: ['2018Q1', '2018Q2', '2018Q3', '2018Q4'],
			};
		},
		methods: {
			bindPickerChange1: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.target.value)
				this.index1 = e.target.value
			},
			bindPickerChange2: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.target.value)
				this.index2 = e.target.value
			}
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

	.ti-condition {
		display: flex;
		width: 100%;
		background-color: #FFFFFF;
		padding-top: 20upx;
	}

	.ti-condition-name {
		flex: 2;
	}

	.ti-condition-name text {
		margin: 0upx 0upx 0upx 100upx;
		font-size: 12px;
	}

	.ti-condition-choose {
		flex: 3;
		border-style: solid;
		border-color: #EEEEEE;
		border-radius: 10upx;
		border-width: 3upx;
		height: 50upx;
		margin: 0upx 100upx 0upx 0upx;
		padding-left: 20upx;
	}

	.ti-condition-choose text {
		color: #595959;
	}

	.ti-condition-radio {
		flex: 3;
		height: 50upx;
		margin: 0upx 100upx 0upx 0upx;
		padding-left: 20upx;
	}
</style>
