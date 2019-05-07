<template>
	<view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="title">真实姓名</view>
				<input class="input" placeholder="李晓华" />
			</view>
			<view class="uni-list-cell">
				<view class="title">性别</view>
				<picker class="input" @change="bindPickerChange" :range="array">
					<input placeholder="男" :value="array[index]" />
				</picker>
			</view>
			<view class="uni-list-cell">
				<view class="title">出生日期</view>
				<picker class="input" mode="date" @change="bindDateChange">
					<input :value="date" :start="startDate" :end="endDate" placeholder="1980-01-01" />
				</picker>
			</view>
			<view class="uni-list-cell"> 
				<view class="title">所在地区</view>
				<input class="input" :value="pickerText" placeholder="湖北省-武汉市" @click="showMulLinkageTwoPicker" />
			</view>
			<view class="uni-list-cell">
				<view class="title">个人描述</view>
				<textarea class="input" auto-height >
					<input placeholder="时代赋予我们使命" maxlength="20" />
				</textarea>
			</view>
		</view>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</view>
</template>

<script>
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue';

	import cityData from '../../../common/city.data.js';
	export default{
		components: {
			mpvuePicker,
		},
		data(){
			return {
				mulLinkageTwoPicker: cityData,
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				pickerText: '',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray:[],
				date: '',
				array: ['男', '女'],
				index: '',
				}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.target.value)
				this.index = e.target.value
			},
			showMulLinkageTwoPicker() {
				this.pickerValueArray = this.mulLinkageTwoPicker
				this.mode = 'multiLinkageSelector'
				this.deepLength = 2
				this.pickerValueDefault = [0, 0]
				this.$refs.mpvuePicker.show()
			},
			onConfirm(e) {
				this.pickerText = e.label
				console.log('picker发送选择改变，携带值为：' + this.pickerText);
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			getDate(type) {
				const date = new Date();
			
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
			
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
			
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style>
	.uni-list-cell{
		padding-left:35upx;
		height: 100upx;
		display: flex;
	}
	.title{
		font-size: 35upx;
		float: left;
		width: 25%;
	}
	.input{
		font-size: 35upx;
		float: left;
		width: 75%;
	}
</style>
