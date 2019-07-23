<template>
	<view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="title">真实姓名</view>
				<input class="input" :placeholder="user.realName" v-model="realName" maxlength="10" />
			</view>
			<view class="uni-list-cell">
				<view class="title">性别</view>
				<picker class="input" @change="bindPickerChange" :range="array">
					<input disabled="true" :placeholder="user.gender" v-model="sex" />
				</picker>
			</view>
			<view class="uni-list-cell">
				<view class="title">出生日期</view>
				<picker class="input" mode="date" @change="bindDateChange">
					<input disabled="true" :start="startDate" :end="endDate" :placeholder="user.birthday" v-model="birthday" />
				</picker>
			</view>
			<view class="uni-list-cell">
				<view class="title">所在地区</view>
				<input class="input" disabled="true" :placeholder="user.city" @click="showMulLinkageTwoPicker" v-model="city" />
			</view>
			<view class="uni-list-cell">
				<view class="title">个人描述</view>
				<input class="input" :placeholder="user.description" maxlength="20" v-model="description" />
			</view>
		</view>
		<input type="button" class="confirm-button" style="line-height:80upx" value="确认修改" @tap="confirmRevision" />
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</view>
</template>

<script>
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	import cityData from '@/common/city.data.js';
	import checkApi from '@/common/checkApi.js';
	import getUserApiJson from "@/common/api/getUser.json";

	export default {
		components: {
			mpvuePicker,
		},
		data() {
			return {
				token: "",
				user: {
					"userId": "",
					"tel": "",
					"realName": "",
					"gender": "",
					"head": "",
					"birthday": "",
					"city": "",
					"description": "",
					"department": "",
					"roleName": ""
				}, // 用户信息
				mulLinkageTwoPicker: cityData,
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				pickerText: '',
				mode: '',
				deepLength: 1,
				userInformation: [],
				pickerValueDefault: [0],
				pickerValueArray: [],
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
		onShow: function() {
			if (checkApi.checkToken()) {
				this.token = uni.getStorageSync('token');
			} else {
				uni.showToast({
					icon: 'none',
					title: "您还没有登录，请先登录",
					duration: 1000,
				});
				setTimeout(function() {
					uni.navigateTo({
						url: "../login/login"
					})
				}, 1000);
			}
			this.initUser();
		},
		methods: {
			initUser() {
				checkApi.checkNetwork();
				uni.request({
					//url: 'http://www.baidu.com',
					url: 'http://192.168.124.11:8080/wuhan_data1/getUserApp',
					method: 'POST',
					data: {
						"token": this.token,
					},
					success: (res) => {
						//let dataApi = getUserApiJson;
						let dataApi = res.data;
						checkApi.isApi(dataApi);
						this.user = dataApi.data;
						let userStr = JSON.stringify(this.user);
						uni.setStorageSync('user', userStr);
					},
					fail: (e) => {},
					complete: () => {}
				});
			},
			bindPickerChange: function(e) {
				this.index = e.target.value;
				this.user.gender = this.array[this.index];
			},
			bindDateChange: function(e) {
				this.user.birthday = e.target.value;
			},
			onConfirm(e) {
				this.user.city = e.label;
			},
			showMulLinkageTwoPicker() {
				this.pickerValueArray = this.mulLinkageTwoPicker
				this.mode = 'multiLinkageSelector'
				this.deepLength = 2
				this.pickerValueDefault = [0, 0]
				this.$refs.mpvuePicker.show()
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
			confirmRevision() {
				checkApi.checkNetwork();
				uni.request({
					//url: 'http://www.baidu.com',
					url: 'http://www.baidu.com',
					method: 'POST',
					data: {
						"token": this.token,
						"realName": encodeURI(this.user.realName),
						"sex": encodeURI(this.user.sex),
						"birthday": encodeURI(this.user.birthdayday),
						"city": encodeURI(this.user.city),
						"description": encodeURI(this.user.description),
					},
					success: (res) => {
						let dataApi = getUserApiJson;

						checkApi.isApi(dataApi);
						setTimeout(function() {
							uni.showToast({
								title: '成功修改个人信息',
								icon: 'none',
							});
						}, 300);
						uni.navigateBack();
					},
					fail: () => {},
				});
			}
		}
	}
</script>

<style>
	.uni-list-cell {
		padding-left: 35upx;
		height: 100upx;
		display: flex;
	}

	.title {
		font-size: 35upx;
		float: left;
		width: 25%;
	}

	.input {
		font-size: 35upx;
		float: left;
		width: 75%;
	}

	.confirm-button {
		width: 90%;
		height: 80upx;
		font-size: 35upx;
		color: #FFFFFF;
		background-color: rgb(26, 130, 210);
		border-radius: 5px;
		margin-top: 80upx;
	}
</style>
