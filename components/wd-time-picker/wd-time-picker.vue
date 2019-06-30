<template>
	<view class="ti-main">
		<view class="ti-nav">
			<image src="../../../static/icon/echarts/calender.png"></image>
			<text>时间选择</text>
		</view>

		<view class="ti-condition">
			<view class="ti-condition-name">
				<text>时间频度:</text>
			</view>
			<view class="ti-condition-choose uni-list-cell-db">
				<picker @change="bindFreqPickerChange" :value="freqIndex" :range="freqArray">
					<text>{{freqArray[freqIndex]}}</text>
				</picker>
			</view>
		</view>

		<view class="ti-condition">
			<view class="ti-condition-name">
				<text>起始时间:</text>
			</view>
			<view class="ti-condition-choose uni-list-cell-db">
				<picker @change="bindStartPickerChange" :value="startIndex" :range="startArray">
					<text>{{startArray[startIndex]}}</text>
				</picker>
			</view>
		</view>

		<view class="ti-condition">
			<view class="ti-condition-name">
				<text>结束时间:</text>
			</view>
			<view class="ti-condition-choose uni-list-cell-db">
				<picker @change="bindEndPickerChange" :value="endIndex" :range="endArray">
					<text>{{endArray[endIndex]}}</text>
				</picker>
			</view>
		</view>
		<view class="ti-condition" style="padding-bottom: 20upx;">
			<button type="default" plain="true" size="mini" @tap="pickerConfirm">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			timeCondition: {
				type: Array,
			}
		},
		data() {
			return {
				freqArray: [],
				freqIndex: 0,
				startArray: [],
				startIndex: 0,
				endArray: [],
				endIndex: 0,
			}
		},
		watch: {
			// 监听timeCodition数据
			timeCondition(newValue, oldValue) {
				this.setTimeCondition();
			}
		},
		onLoad() {
			this.setTimeCondition();
		},
		methods: {
			setTimeCondition() {
				let pageTimeCondition = this.timeCondition;
				console.log(pageTimeCondition);
				if (pageTimeCondition.length != 0) {
					let freqCondition = [];
					for (let i = 0; i < pageTimeCondition.length; i++) {
						freqCondition[i] = pageTimeCondition[i].freqName;
						if (pageTimeCondition[i].hasOwnProperty("current")) {
							this.freqIndex = i;
						}
					}
					this.freqArray = freqCondition;
					this.startArray = pageTimeCondition[this.freqIndex].startArray;
					this.endArray = pageTimeCondition[this.freqIndex].endArray;
					if (pageTimeCondition[this.freqIndex].hasOwnProperty("current")) {
						this.startIndex = pageTimeCondition[this.freqIndex].current[0];
						this.endIndex = pageTimeCondition[this.freqIndex].current[1];
					}
				}
			},
			bindFreqPickerChange: function(e) {
				this.freqIndex = e.target.value;
				this.startArray = this.timeCondition[this.freqIndex].startArray;
				this.endArray = this.timeCondition[this.freqIndex].endArray;
			},
			bindStartPickerChange: function(e) {
				this.startIndex = e.target.value
			},
			bindEndPickerChange: function(e) {
				this.endIndex = e.target.value
			},
			pickerConfirm(e) {
				let timeFreq = this.freqArray[this.freqIndex];
				let startTime = this.startArray[this.startIndex];
				let endTime = this.endArray[this.endIndex];
				console.log(timeFreq + startTime + endTime);
				if (startTime > endTime) {
					uni.showModal({
						title: "提示",
						content: "结束时间不能小于开始时间",
					});
				}
				this.$emit("confirm", {
					startTime: startTime,
					endTime: endTime,
					timeFreq: timeFreq,
				});
			},
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
		margin: auto 20upx;
		font-size: 14px;
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
