<template>
	<view class="content">
		<view class="flex_row_c_c modalView" :class="qrShow?'show':''" @tap="hideQr()">
			<view class="flex_column">
				<view class="backgroundColor-white padding1vh border_radius_10px">
					<image :src="poster.finalPath" mode="aspectFill" class="posterImage"></image>
				</view>
				<view class="flex_row marginTop2vh">
					<button type="primary" size="mini" @tap.prevent.stop="saveImage()">保存图片</button>
					<button type="primary" size="mini" @tap.prevent.stop="shareImg()">分享图片</button>
				</view>
			</view>
		</view>
		<!--显示的按钮样式 -->
		<button type="primary" @tap="shareFc()">生成海报</button>
		<view class="hideCanvasView">
			<canvas class="hideCanvas" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||0) + 'px', height: (poster.height||0) + 'px'}"></canvas>
		</view>

	</view>
</template>

<script>
	import _app from '@/common/app.js';
	import {
		getSharePoster
	} from '@/common/QS-SharePoster.js';
	export default {
		data() {
			return {
				poster: {},
				qrShow: false,
				canvasId: 'default_PosterCanvasId',
				canvasHeight: 0,
				windowWidth: 0
			};
		},
		onLoad() {
			uni.clearStorage();
		},
		onNavigationBarButtonTap(e) {
			switch (e.type) {
				case "share": //点击分享按钮
					this.shareFc();
					break;
			}
		},
		methods: {
			async shareFc() {
				try {
					console.log('准备生成:' + new Date())
					const d = await getSharePoster({
						_this: this, //若在组件中使用 必传
						type: 'testShareType',
						formData: {
							//访问接口获取背景图携带自定义数据

						},
						posterCanvasId: this.canvasId, //canvasId
						delayTimeScale: 20, //延时系数
						/* background: {
							width: 1080,
							height: 1920,
							backgroundColor: '#666'
						}, */
						drawArray: ({
							bgObj,
							type,
							bgScale
						}) => {
							// console.log("bgObj.height:" + bgObj.height);
							// this.poster = bgObj;
							// if (this.poster.height > 1200) {
							// 	this.poster.height = 1200;
							// }	
							return new Promise((rs, rj) => {
								const {
									windowWidth,
									windowHeight
								} = uni.getSystemInfoSync();
								const ctx = uni.createCanvasContext('default_PosterCanvasId');
								var hei = 0;
								hei += 70;
								var echartArr = uni.getStorageSync('echartArr');
								var echartId = uni.getStorageSync('drawArr');
								var title = uni.getStorageSync('drawTitle');
								echartArr.sort((a,b)=>{
								    return echartId.indexOf(a.echartID)-echartId.indexOf(b.echartID);
								});
								var drawArr = [{
									type: 'text',
									fontStyle: 'normal',
									text: title,
									size: '35',
									color: 'black',
									alpha: 1,
									textAlign: 'center',
									textBaseline: 'middle',
									mWidth: windowWidth * 1.4,
									dx: windowWidth * 0.75,
									dy: hei - 35,
									serialNum: 0,
									id: 'tag1' //自定义标识
								}];
								var i = echartArr.length;
								for (i = 0; i < echartArr.length; i++) {
									let url;
									let imgObj;
									let txt = echartArr[i].echartTitle;
									uni.saveFile({
										tempFilePath: echartArr[i].echartUrl,
										success(res) {
											_app.log('保存成功:' + JSON.stringify(res));
											url = res.savedFilePath;
											// console.log("url" + i + ":" + url);
											uni.getImageInfo({
												src: res.savedFilePath,
												success: res => {
													hei += 40;
													let txtDraw = {
														type: 'text',
														fontStyle: 'normal',
														text: txt,
														size: "20",
														color: 'black',
														alpha: 1,
														textAlign: 'left',
														textBaseline: 'middle',
														mWidth: windowWidth * 1.8,
														dx: 20,
														dy: hei - 20,
														serialNum: i + 1,
														id: 'tag' + (i + 2) //自定义标识
													}
													drawArr.push(txtDraw);
													hei += 10;
													_app.log('获取图片信息成功:' + JSON.stringify(res));
													imgObj = res;
													let echartDraw = {
														type: 'image',
														url: url,
														// alpha: .3,
														dx: 0,
														dy: hei,
														dWidth: imgObj.width / 2,
														dHeight: imgObj.height / 2
													};
													hei += imgObj.height / 2;
													drawArr.push(echartDraw);
													hei += 20;
													if (i === echartArr.length) {
														rs(drawArr);
													}
												},
												fail: err => {
													_app.log('获取图片信息失败:' + JSON.stringify(err));
												}
											})
										},
									})
								}

							})

						},
						setCanvasWH: ({
							bgObj,
							type,
							bgScale
						}) => { // 为动态设置画布宽高的方法，
							this.poster = bgObj;
						}
					});
					console.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath)
					this.poster.finalPath = d.poster.tempFilePath;

					this.qrShow = true;
				} catch (e) {
					_app.hideLoading();
					_app.showToast(JSON.stringify(e));
					console.log(JSON.stringify(e));
				}
			},
			saveImage() {
				let url = uni.getStorageSync("posterUrl");
				// #ifndef H5
				uni.saveImageToPhotosAlbum({
					filePath: this.poster.finalPath,
					success(res) {
						_app.showToast('保存成功');
					}
				})
				// #endif
				// #ifdef H5
				_app.showToast('保存了');
				// #endif
			},
			share() {
				let url = uni.getStorageSync("posterUrl");
				// #ifdef APP-PLUS
				_app.getShare(false, false, 2, '', '', '', this.poster.finalPath, false, false);
				// #endif

				// #ifndef APP-PLUS
				_app.showToast('分享了');
				// #endif
			},
			hideQr() {
				this.qrShow = false;
			}

		}
	}
</script>

<style>
	.hideCanvasView {
		position: relative;
	}

	.hideCanvas {
		position: fixed;
		top: -99999upx;
		left: -99999upx;
		z-index: -99999;
	}

	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.modalView {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		outline: 0;
		/* transform: scale(3); */
		transform: scale(1);
		perspective: 2500upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all .3s ease-in-out;
		pointer-events: none;
		backface-visibility: hidden;
		z-index: 999;
	}

	.modalView.show {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
	}

	.flex_column {
		display: flex;
		flex-direction: column;
	}

	.backgroundColor-white {
		background-color: white;
	}

	.border_radius_10px {
		border-radius: 10px;
	}

	.padding1vh {
		padding: 1vh;
	}

	.posterImage {
		width: 60vw;
	}

	.flex_row {
		display: flex;
		flex-direction: row;
	}

	.marginTop2vh {
		margin-top: 2vh;
	}
</style>
