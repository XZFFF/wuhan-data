<template>
	<view class="page">
		<view class='feedback-title'>
			<text>问题和意见</text>
		</view>
		<view class="feedback-body">
			<textarea placeholder="请详细描述您的问题和意见" v-model="sendDate.text" class="feedback-textare" />
			</view>
        <view class='feedback-title'>
            <text>图片(选填,提供问题截图,总大小10M以下)</text>
        </view>
        <view class="feedback-body feedback-uploader">
            <view class="uni-uploader">
                <view class="uni-uploader-head">
                    <view class="uni-uploader-title">点击预览图片</view>
                    <view class="uni-uploader-info">{{imageList.length}}/8</view>
                </view>
                <view class="uni-uploader-body">
                    <view class="uni-uploader__files">
                        <block v-for="(image,index) in imageList" :key="index">
                            <view class="uni-uploader__file" style="position: relative;">
                                <image class="uni-uploader__img" :src="image" @tap="previewImage"></image>
                                <view class="close-view" @click="close(index)">x</view>
                            </view>
                        </block>
                        <view class="uni-uploader__input-box" v-show="imageList.length < 8">
                        	<view class="uni-uploader__input" @tap="chooseImg"></view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class='feedback-title'>
            <text>QQ/邮箱</text>
        </view>
        <view class="feedback-body">
            <input class="feedback-input" v-model="sendDate.contact" placeholder="填写您的联系方式以便我们后续联系您" />
        </view>
        <button type="default" class="feedback-submit" @tap="send">提交</button>
    </view>
</template>

<script>
	import checkApi from '@/common/checkApi.js';
	import feedbackApiJson from "@/common/api/feedback.json";
    export default {
        data() {
            return {
                imageList: [],
                sendDate: {
                    text: "",
                    contact: "",
					token: ""
                },
				contact:"",
				sendDateTxt:""
            }
        },
		onShow() {
			try {
				let user = uni.getStorageSync('user');
				if (user) {
					let userJson = JSON.parse(user);
					this.contact = userJson.tel;
				}
			} catch (e) {
				console.log(e.message);
			}
		},
        methods: {
            close(e){
                this.imageList.splice(e,1);
            },
            chooseImg() { //选择图片
                uni.chooseImage({
                    sourceType: ["camera", "album"],
                    sizeType: "compressed",
                    count: 8 - this.imageList.length,
                    success: (res) => {
                        this.imageList = this.imageList.concat(res.tempFilePaths);
                    }
                })
            },
            previewImage() { //预览图片
                uni.previewImage({
                    urls: this.imageList
                });
            },
            send(e) { //发送反馈
				this.sendDate.token = uni.getStorageSync('token');
                console.log(JSON.stringify(this.sendDate));
				checkApi.checkNetwork();
				if(this.sendDate.text.length == 0){
					uni.showToast({
						icon: 'none',
					    title: "请描述您的问题"
					});
					return;
				}
				let imgs = this.imageList.map((value, index) => {
				    return {
				        name: "image" + index,
				        uri: value
				    }
				});
				if(this.imageList.length == 0)
				{
					uni.request({
						url: this.apiUrl+'uploadFeedback1',
						method: 'POST',
						data: this.sendDate,
						success: (res) => {
							try{
								let dataApi = res.data;
								checkApi.isApi(dataApi);
								uni.showToast({
								    title: "谢谢你的反馈，我们会及时处理",
									duration:1000
								});
								setTimeout(function() {
									uni.switchTab({
										url: '../../tabbar/mine/mine',
									})
								}, 1000);
								this.imageList = [];
								this.sendDate = {
								    text: "",
								    contact: ""
								};
							}
							catch(e){
								console.log(e.message);
								uni.showToast({
									icon: 'none',
									title: e.message
								});
							}
						},
						fail: (e) => {
						    console.log(e.errMsg);
						    uni.showToast({
						    	icon: 'none',
						    	title: e.errMsg
						    });
						}
					})
				}
				else
				{
					let imgs = this.imageList.map((value, index) => {
					    return {
					        name: "image" + index,
					        uri: value
					    }
					});
					uni.uploadFile({
						url: this.apiUrl+'uploadFeedback',
					    files: imgs,
					    formData: this.sendDate,
					    success: (res) => {
							try{
								let dataApi = res.data;
								checkApi.isApi(dataApi);
								uni.showToast({
								    title: "谢谢你的反馈，我们会及时处理",
									duration:1000
								});
								setTimeout(function() {
									uni.switchTab({
										url: '../../tabbar/mine/mine',
									})
								}, 1000);
								this.imageList = [];
								this.sendDate = {
								    text: "",
								    contact: ""
								};
							}
							catch(e){
								console.log(e.message);
								uni.showToast({
									icon: 'none',
									title: e.message
								});
							}
					    },
					    fail: (e) => {
					        console.log(e.errMsg);
					        uni.showToast({
					        	icon: 'none',
					        	title: e.errMsg
					        });
					    }
					});
				}
            }
        }
    }
</script>

<style>
    page {
        background-color: #EFEFF4;
    }

    .input-view {
        font-size: 28upx;
    }
    .close-view{
        text-align: center;
		line-height:14px;
		height: 16px;
		width: 16px;
		border-radius: 50%;
		background: #FF5053;
		color: #FFFFFF;
		position: absolute;
		top: -6px;
		right: -4px;
		font-size: 12px;
    }
	.feedback-submit{
		margin-top: 125upx;
	}
	.feedback-input{
		height: 80upx;
	}
</style>
