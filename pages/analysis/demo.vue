<template>
	<!-- class="mpvue-picker" -->
	<view style="">
		<!-- class="uni-padding-wrap uni-common-mt" -->
		<view style="">
			<input :value="pickerText" disabled placeholder="请选择"></input>
			<!-- class="uni-btn-v" -->
			<view style="">
				<button type="default" @click="showSinglePicker">单列选择</button>
			</view>
		</view>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</view>
</template>

<script>
	import mpvuePicker from '../../components/mpvue-picker/mpvuePicker.vue';
	import cityData from '../../common/city.data.js';

	let pickerSingleArray = [{
			label: '中国',
			value: 1
		},
		{
			label: '俄罗斯',
			value: 2
		},
		{
			label: '美国',
			value: 3
		},
		{
			label: '日本',
			value: 4
		}
	];
	export default {

		components: {
			mpvuePicker
		},
		data() {
			return {
				title: "mpvue-picker 使用示例",
				pickerSingleArray: pickerSingleArray,
				// mulLinkageTwoPicker: cityData,
				// cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				pickerText: '',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray: []
			};
		},
		methods: {
			onCancel(e) {
				console.log(e)
			},
			// 单列
			showSinglePicker() {
				this.pickerValueArray = this.pickerSingleArray
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
			},
			onConfirm(e) {
				this.pickerText = JSON.stringify(e)
			}
		},
		onBackPress() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel();
				return true;
			}
		},
		onUnload() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel()
			}
		}
	};
</script>

<style>

</style>
