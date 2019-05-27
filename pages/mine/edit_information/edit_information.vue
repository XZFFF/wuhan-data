<template>
	<view>
		<view class="uni-list" v-for="(user,index) in userInformation" :key="index">
			<view class="uni-list-cell">
				<view class="title">真实姓名</view>
				<input class="input" :placeholder="user.username" v-model="username" />
			</view>
			<view class="uni-list-cell">
				<view class="title">性别</view>
				<picker class="input" @change="bindPickerChange" :range="array">
					<input :placeholder="user.sex" :value="array[index]" v-model="sex" />
				</picker>
			</view>
			<view class="uni-list-cell">
				<view class="title">出生日期</view>
				<picker class="input" mode="date" @change="bindDateChange">
					<input :value="date" :start="startDate" :end="endDate" :placeholder="user.birth" v-model="birth" />
				</picker>
			</view>
			<view class="uni-list-cell"> 
				<view class="title">所在地区</view>
				<input class="input" :value="pickerText" :placeholder="user.city" @click="showMulLinkageTwoPicker" v-model="city" />
			</view>
			<view class="uni-list-cell">
				<view class="title">个人描述</view>
				<input class="input" :placeholder="user.personDescription" maxlength="20" v-model="personDescription" />
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
				username: '',
				sex: '',
				birth: '',
				city: '',
				personDescription: '',
				mulLinkageTwoPicker: cityData,
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				pickerText: '',
				mode: '',
				deepLength: 1,
				userInformation: [],
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
		onLoad:function(){
			try {
					const userInfo = uni.getStorageSync('user_Info');
					if (userInfo) {
						this.userInformation = userInfo
					} else {
						this.initUserInformation();
					}
				} catch (e) {
					console.log('无法从本地缓存获取相应数据');
				}
			this.checkNetwork();
			this.initUserInformation();
		},
		methods: {
			checkNetwork() {
				uni.getNetworkType({
					success: function(res) {
						console.log(res.networkType);
						if (res.networkType == 'none') {
							console.log('network:' + res.networkType);
							uni.showToast({
								title: '无网络连接',
								duration: 1000,
								icon: 'loading'
							});
						}
					}
				});
			},
			initUserInformation() {
				uni.request({
					url: 'http://192.168.43.119/personInfo.php',
					method: 'GET',
					data: {},
					success: res => {
						this.userInformation = res.data;
						console.log(this.userInformation.sex);
						uni.setStorage({
							key: 'user_Info',
							data: this.userInformation,
							success: function() {
								console.log('成功请求个人信息数据并存入本地缓存');
							}
						});
					},
					fail: () => {
						uni.showToast({
							icon: 'none',
							title: '网络异常,请稍后重试'
						});
					},
					complete: () => {}
				});
			},
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
			},
			confirmRevision (){
				/*uni.request({
					url: '',
					method: 'POST',
					data: {
						username: this.username,
						sex: this.sex,
						birth: this.birth,
						city: this.city,
						personDescription: this.personDescription,
					},
					success: res => {
						console.log("成功修改个人信息");
					},
					fail: (e) => {},
					complete: () => {}
				});*/
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
