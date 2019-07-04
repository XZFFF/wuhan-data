<template>
	<view>
		<view class="uni-list" v-for="(user,index) in userInformation" :key="index">
			<view class="uni-list-cell">
				<view class="title">真实姓名</view>
				<input class="input" :placeholder="user.realName" v-model="realName" maxlength="10"/>
			</view>
			<view class="uni-list-cell">
				<view class="title">性别</view>
				<picker class="input" @change="bindPickerChange" :range="array">
					<input disabled="true" :placeholder="user.sex" v-model="sex" />
				</picker>
			</view>
			<view class="uni-list-cell">
				<view class="title">出生日期</view>
				<picker class="input" mode="date" @change="bindDateChange">
					<input disabled="true" :start="startDate" :end="endDate" :placeholder="user.birth" v-model="birth" />
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
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue';
	import cityData from '../../../common/city.data.js';
	export default{
		components: {
			mpvuePicker,
		},
		data(){
			return {
				realName: '',
				realName1: '',
				sex: '',
				sex1: '',
				birth: '',
				city: '',
				city1: '',
				description: '',
				description1: '',
				mulLinkageTwoPicker: cityData,
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				pickerText: '',
				mode: '',
				deepLength: 1,
				userInformation: [],
				pickerValueDefault: [0],
				pickerValueArray:[],
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
						this.userInformation = userInfo;
						let list=JSON.stringify(userInfo);
						console.log("返回数据状态:" + list);
						this.realName = userInfo[0].realName;
						this.sex = userInfo[0].sex;
						this.birth = userInfo[0].birth;
						this.city = userInfo[0].city;
						this.description = userInfo[0].description;
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
				const userID = uni.getStorageSync('user_id');
				uni.request({
					url: 'http://192.168.124.18/personInfo.php',
					data: {
						"id": userID
					},
					success: res => {
						this.userInformation = res.data;
						console.log(this.userInformation);
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
				this.index = e.target.value;
				this.sex = this.array[this.index];
				console.log('picker发送选择改变，携带值为：' + this.sex);
			},
			showMulLinkageTwoPicker() {
				this.pickerValueArray = this.mulLinkageTwoPicker
				this.mode = 'multiLinkageSelector'
				this.deepLength = 2
				this.pickerValueDefault = [0, 0]
				this.$refs.mpvuePicker.show()
			},
			onConfirm(e) {
				this.city = e.label;
				console.log('picker发送选择改变，携带值为：' + this.city);
			},
			bindDateChange: function(e) {
				this.birth = e.target.value;
				console.log('picker发送选择改变，携带值为：' + this.birth);
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
				this.realName1 = encodeURI(this.realName);
				this.sex1 = encodeURI(this.sex);
				this.city1 = encodeURI(this.city);
				this.description1 = encodeURI(this.description);
				uni.request({
					url: 'http://192.168.124.11:8080/wuhan_data1/changeInfo',
					method: 'POST',
					data: {
						"id": 22,
						"realName": this.realName1,
						"sex": this.sex1,
						"birth": this.birth,
						"city": this.city1,
						"description": this.description1,
					},
					success: res => {
						if(res.data.code == 1)
						{
							let list=JSON.stringify(res.data);
							console.log("返回数据状态:" + list);
							setTimeout(function() {  
							        uni.showToast({
										title: '成功修改个人信息',
							        	icon: 'none',
							        }); 
							    }, 300);
							uni.navigateBack();
							return false;
						}
						if(res.data.code == 0)
						{
							uni.showToast({
								title: '修改失败，请稍后重试',
								icon: 'none',
							});
						}
					},
					fail: () => {
						uni.showToast({
							icon: 'none',
							title: '网络异常,请稍后重试'
						});
					},
				});
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
	.confirm-button{
		width: 90%;
		height: 80upx;
		font-size: 35upx;
		color: #FFFFFF;
		background-color: rgb(26,130,210);
		border-radius: 5px; 
		margin-top: 80upx;
	}
</style>
