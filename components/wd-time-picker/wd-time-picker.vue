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
		<view class="ti-condition">
			<button type="primary" plain="true" @tap="pickerConfirm">确定</button>
		</view>

		<!-- 		<view v-if="chooseFreq.showMonth === true || chooseFreq.showMonth === 'true' || chooseFreq.showQuarter === true || chooseFreq.showQuarter === 'true' || chooseFreq.showYear === true || chooseFreq.showYear === 'true'"
		 class="ti-condition" style="padding-bottom: 30upx;">
			<view class="ti-condition-name">
				<text>季/年度:</text>
			</view>
			<view class="ti-condition-radio uni-list-cell-db">
				<radio-group name="ti-freq-group" @change="radioChange">
					<label v-if="chooseFreq.showMonth === true || chooseFreq.showMonth === 'true'">
						<radio value="radio-m" :checked="index === current" >月度</radio>
					</label>
					<label v-if="chooseFreq.showQuarter === true || chooseFreq.showQuarter === 'true'">
						<radio value="radio-q" :checked="index === current" >季度</radio>
					</label>
					<label v-if="chooseFreq.showYear === true || chooseFreq.showYear === 'true'">
						<radio value="radio-y" :checked="index === current" >年度</radio>
					</label>
				</radio-group>
			</view>
		</view> -->


	</view>
</template>

<script>
	export default {
		props: {
			timeCondition: {
				type: Object
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
		onReady() {
			let freqCondition = [];
			for (let i = 0; i < this.timeCondition.length; i++) {
				freqCondition[i] = this.timeCondition[i].freqName;
				if (this.timeCondition[i].hasOwnProperty("current")) {
					this.freqIndex = i;
				}
			}
			this.freqArray = freqCondition;
			this.startArray = this.timeCondition[this.freqIndex].startArray;
			this.endArray = this.timeCondition[this.freqIndex].endArray;
			if (this.timeCondition[this.freqIndex].hasOwnProperty("current")) {
				this.startIndex = this.timeCondition[this.freqIndex].current[0];
				this.endIndex = this.timeCondition[this.freqIndex].current[1];
			}
		},
		methods: {
			bindFreqPickerChange: function(e) {
				console.log('freq picker发送选择改变，携带值为：' + e.target.value)
				this.freqIndex = e.target.value;
				this.startArray = this.timeCondition[this.freqIndex].startArray;
				this.endArray = this.timeCondition[this.freqIndex].endArray;
			},
			bindStartPickerChange: function(e) {
				console.log('start picker发送选择改变，携带值为：' + e.target.value)
				this.startIndex = e.target.value
			},
			bindEndPickerChange: function(e) {
				console.log('end picker发送选择改变，携带值为：' + e.target.value)
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
