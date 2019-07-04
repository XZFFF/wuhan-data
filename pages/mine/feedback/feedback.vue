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
    export default {
        data() {
			const userID = uni.getStorageSync('user_id');
            return {
                imageList: [],
                sendDate: {
					id: userID,
                    score: 0,
                    text: "",
                    contact: ""
                }
            }
        },
        onLoad() {
            let deviceInfo = {
                /*appid: plus.runtime.appid,
                imei: plus.device.imei, //设备标识
                p: plus.os.name === "Android" ? "a" : "i", //平台类型，i表示iOS平台，a表示Android平台。
                md: plus.device.model, //设备型号
                app_version: plus.runtime.version,
                plus_version: plus.runtime.innerVersion, //基座版本号
                os: plus.os.version,
                net: "" + plus.networkinfo.getCurrentType()*/
            }
            this.sendDate = Object.assign(deviceInfo, this.sendDate);
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
                console.log(JSON.stringify(this.sendDate));
                let imgs = this.imageList.map((value, index) => {
                    return {
                        name: "image" + index,
                        uri: value
                    }
                })
                uni.uploadFile({
                    url: "http://192.168.124.11:8080/wuhan_data1/ttt",
                    files: imgs,
                    formData: this.sendDate,
                    success: (res) => {
						console.log("success");
                        if (res.data.code == 1) {
                            uni.showToast({
                                title: "反馈成功"
                            });
                            this.imageList = [];
                            this.sendDate = {
                                score: 0,
                                text: "",
                                contact: ""
                            }
                        }
						else if(res.data.code == 0)
						{
							uni.showToast({
							    title: "反馈失败，请稍后重试"
							});
						}
                    },
                    fail: () => {
                        uni.showToast({
                        	icon: 'none',
                        	title: '网络异常,请稍后重试'
                        });
                    }
                });
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
</style>