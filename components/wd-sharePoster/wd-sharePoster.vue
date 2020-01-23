<template>
	<view class="content">
		<view class="flex_row_c_c modalView" :class="qrShow?'show':''" @tap="hideQr()">
			<view class="flex_column">
				<view class="backgroundColor-white padding1vh border_radius_10px">
					<image :src="poster.finalPath" mode="widthFix" class="posterImage"></image>
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
		<!-- <view class="hideCanvas">
			<canvas canvas-id="hideCanvas" :style="{height: canvasHeight+'px',width: windowWidth+'px'}"></canvas>
		</view> -->
	</view>
</template>

<script>
	import _app from '@/common/app.js';
	// import getSharePoster from '@/common/QS-SharePoster.js';
	export default {
		data() {
			return {
				poster: {},
				qrShow: false,
				canvasId: 'default_PosterCanvasId',
				canvasHeight: 200,
				windowWidth: 200
			};
		},
		updated() {
			const {
				windowWidth,
				windowHeight
			} = uni.getSystemInfoSync();
			this.windowWidth = windowWidth;
			var echartArr = uni.getStorageSync('echartArr');
			var hei = 60;
			console.log("windowWidth:" + windowWidth);
			for (var i of echartArr) {
				hei += parseInt(i.echartHeight);
			}
			console.log("hei:" + hei);
			this.canvasHeight = hei;
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
				this.poster.finalPath = "";
				try {
					if (!this.poster.finalPath) {
						const d = await this.getSharePoster({
							type: 'testShareType',
							posterCanvasId: this.canvasId,
							setCanvasWH: ({
								bgObj,
								type,
								bgScale
							}) => { // 为动态设置画布宽高的方法，
								console.log("bgObj.height:" + bgObj.height);
								this.poster = bgObj;
								if (this.poster.height > 1400) {
									this.poster.height = 1400;
								}
								console.log("画布高度："+this.poster.height);
								console.log("画布宽度："+this.poster.width);
							},
							// setDraw: ({Context, bgObj, type, bgScale}) => {
							// 	Context.setFillStyle('black');
							// 	Context.setGlobalAlpha(0.3);
							// 	Context.fillRect(0, bgObj.height - bgObj.height*0.2, bgObj.width, bgObj.height*0.2);
							// }
						});
						console.log('海报生成成功， 临时路径: ' + d.poster.tempFilePath)
						this.poster.finalPath = d.poster.tempFilePath;
					}
					this.qrShow = true;
				} catch (e) {
					_app.hideLoading();
					_app.showToast(JSON.stringify(e));
					console.log(JSON.stringify(e));
				}
			},
			saveImage() {
				// #ifndef H5
				const finalPath = uni.getStorageSync("drawImg");
				console.log("drawImg:" + finalPath);
				uni.saveImageToPhotosAlbum({
					// filePath: this.poster.finalPath,
					filePath: finalPath,
					success(res) {
						_app.showToast('保存成功');
					}
				})
				// #endif
				// #ifdef H5
				_app.showToast('保存了');
				// #endif
			},
			shareImg() {
				const finalPath = uni.getStorageSync("drawImg");
				// #ifdef APP-PLUS
				// _app.getShare(false, false, 2, '', '', '', this.poster.finalPath, false, false);
				_app.getShare(false, false, 2, '', '', '', finalPath, false, false);
				// #endif

				// #ifndef APP-PLUS
				_app.showToast('分享了');
				// #endif
			},
			hideQr() {
				this.qrShow = false;
			},
			getSharePoster(obj) {
				return new Promise(async (resolve, reject) => {
					try {
						const result1 = await this.returnPromise(obj);
						resolve(result1);
					} catch (e) {
						//TODO handle the exception
						this.removePosterStorage(obj.type);
						try {
							_app.log('------------清除缓存后, 开始第二次尝试------------');
							const result2 = await this.returnPromise(obj);
							resolve(result2);
						} catch (e) {
							//TODO handle the exception
							reject(e);
						}
					}
				})
			
			},
			returnPromise(obj) {
				let {
					type,
					background,
					posterCanvasId,
					backgroundImage,
					reserve,
					textArray,
					qrCodeArray,
					imagesArray,
					setCanvasWH,
					setCanvasToTempFilePath,
					setDraw,
					bgScale,
					Context
				} = obj;
				return new Promise(async (rs, rj) => {
					try {
						_app.showLoading('正在准备海报数据');
						if (!Context)
							Context = uni.createCanvasContext(posterCanvasId);
						let bgObj;
						if (background && background.width && background.height) {
							bgObj = background;
						} else {
							bgObj = await this.getShreUserPosterBackground({
								backgroundImage,
								type
							});
						}
						// 为了ios 缩放一些
						bgScale = bgScale || .75;
						// bgObj.width = bgObj.width * bgScale;
						// bgObj.height = bgObj.height * bgScale;
			
						_app.log('获取背景图信息对象成功:' + JSON.stringify(bgObj));
						const params = {
							bgObj,
							type,
							bgScale
						};
						if (setCanvasWH && typeof(setCanvasWH) == 'function') setCanvasWH(params);
						if (imagesArray) {
							if (typeof(imagesArray) == 'function')
								imagesArray = imagesArray(params);
							_app.showLoading('正在生成需绘制图片的临时路径');
							imagesArray = await setImagesArray(imagesArray);
							_app.hideLoading();
						}
						if (textArray) {
							if (typeof(textArray) == 'function')
								textArray = textArray(params);
							textArray = setTextArray(Context, textArray);
			
						}
						if (qrCodeArray) {
							if (typeof(qrCodeArray) == 'function')
								qrCodeArray = qrCodeArray(params);
							_app.showLoading('正在生成需绘制图片的临时路径');
							for (let i = 0; i < qrCodeArray.length; i++) {
								if (qrCodeArray[i].image)
									qrCodeArray[i].image = await _app.downloadFile_PromiseFc(qrCodeArray[i].image);
							}
							_app.hideLoading();
						}
						const poster = await this.drawShareImage({
							Context,
							type,
							posterCanvasId,
							reserve,
							textArray,
							imagesArray,
							bgObj,
							qrCodeArray,
							setCanvasToTempFilePath,
							setDraw,
							bgScale
						});
						_app.hideLoading();
						rs({
							bgObj,
							poster,
							type
						});
					} catch (e) {
						//TODO handle the exception
						rj(e);
					}
				});
			},
			drawShareImage(obj) { //绘制海报方法
				let {
					Context,
					type,
					posterCanvasId,
					reserve,
					bgObj,
					textArray,
					qrCodeArray,
					imagesArray,
					setCanvasToTempFilePath,
					setDraw,
					bgScale
				} = obj;
				return new Promise((rs, rj) => {
					try {
						_app.showLoading('正在绘制海报');
						if (bgObj && bgObj.path) {
							console.log("bgObj.path:"+bgObj.path);
							Context.drawImage(bgObj.path, 0, 0, bgObj.width, bgObj.height);
						} else {
							if (bgObj.backgroundColor) {
								Context.setFillStyle(bgObj.backgroundColor)
								Context.fillRect(0, 0, bgObj.width, bgObj.height);
							}
						}
			
						_app.showLoading('准备绘制图片');
						drawImage(Context, imagesArray);
			
						_app.showLoading('准备绘制自定义内容');
						if (setDraw && typeof(setDraw) == 'function') setDraw({
							Context,
							bgObj,
							type,
							bgScale
						});
			
						_app.showLoading('准备绘制文本');
						drawText(Context, textArray, bgObj);
			
						_app.showLoading('准备绘制二维码');
						if (qrCodeArray && qrCodeArray.length > 0) {
							for (let i = 0; i < qrCodeArray.length; i++) {
								drawQrCode(Context, qrCodeArray[i]);
							}
						}
						_app.showLoading('绘制中')
						Context.draw((typeof(reserve) == 'boolean' ? reserve : false), () => {
							_app.showLoading('准备输出图片');
							let setObj = {};
							if (setCanvasToTempFilePath && typeof(setCanvasToTempFilePath) == 'function')
								setObj = setCanvasToTempFilePath(bgObj, type);
							// #ifdef H5
							rs({
								tempFilePath: document.querySelector(`uni-canvas[canvas-id=${posterCanvasId}]>canvas`).toDataURL(
									'image/jpeg', setObj.quality || 1)
							});
							// #endif
							// #ifndef H5
							const data = {
								x: 0,
								y: 0,
								width: bgObj.width,
								height: bgObj.height,
								destWidth: bgObj.width * 2, // 若H5使用这里请不要乘以二
								destHeight: bgObj.height * 2, // 若H5使用这里请不要乘以二
								quality: 1,
								...setObj
							};
							_app.log('canvasToTempFilePath的data对象:' + JSON.stringify(data));
							_app.showLoading('正在输出图片');
							const canvasToTempFilePathFn = function () {
								uni.canvasToTempFilePath({ //输出为图片
									...data,
									canvasId: posterCanvasId,
									success(res) {
										_app.hideLoading();
										rs(res);
									},
									fail(err) {
										_app.hideLoading();
										_app.log('输出图片失败:' + JSON.stringify(err));
										rj('输出图片失败:' + JSON.stringify(err))
									}
								})
							}
							// #ifdef MP
							let textLength = 0;
							if(qrCodeArray) {
								qrCodeArray.forEach(item=>{
									if(item.text) {
										textLength = Number(item.text.length);
									}
								})
							}
							setTimeout(canvasToTempFilePathFn, textLength * 10);
							// #endif
							// #ifndef MP
							canvasToTempFilePathFn();
							// #endif
							// #endif
						});
					} catch (e) {
						//TODO handle the exception
						_app.hideLoading();
						rj(e);
					}
				});
			},
			getShreUserPosterBackground(objs) { //检查背景图是否存在于本地， 若存在直接返回， 否则调用getShreUserPosterBackgroundFc方法
				let {
					backgroundImage,
					type
				} = objs;
				return new Promise(async (resolve, reject) => {
					try {
						_app.showLoading('正在获取海报背景图');
						let pbg;
						// #ifndef H5
						// pbg = getPosterStorage(type);
						// #endif
						// #ifdef H5
						pbg = false;
						// #endif
							const savedFilePath = await this.getShreUserPosterBackgroundFc(objs)
							_app.hideLoading();
							resolve(savedFilePath);
						// }
					} catch (e) {
						_app.hideLoading();
						_app.showToast('获取分享用户背景图失败:' + JSON.stringify(e));
						_app.log(JSON.stringify(e));
						reject(e);
					}
				})
			},
			removePosterStorage(type) {
				const ShreUserPosterBackgroundKey = this.getStorageKey(type);
				const pbg = _app.getStorageSync(ShreUserPosterBackgroundKey);
				if (pbg && pbg.path) {
					_app.removeSavedFile(pbg.path);
					_app.removeStorageSync(ShreUserPosterBackgroundKey);
				}
			},
			
			// function setPosterStorage(type, data) {
			// 	// _app.setStorage(getStorageKey(type), data);
			// }
			
			getStorageKey(type) {
				const ShreUserPosterBackgroundKey = 'ShrePosterBackground_';
				return ShreUserPosterBackgroundKey + (type || 'default');
			},
			
			getShreUserPosterBackgroundFc(objs, upimage) { //下载并保存背景图方法
				let {
					backgroundImage,
					type
				} = objs;
				_app.log('获取分享背景图, 尝试清空本地数据');
				this.removePosterStorage(type);
				return new Promise(async (resolve, reject) => {
					try {
						_app.showLoading('正在下载海报背景图');
						if (upimage) {
							_app.log('有从后端获取的背景图片路径');
							_app.log('尝试下载并保存背景图');
							const name = _app.fileNameInPath(upimage);
							const savedFilePath = await _app.downLoadAndSaveFile_PromiseFc(upimage);
							if (savedFilePath) {
								_app.log('下载并保存背景图成功:' + savedFilePath);
								const imageObj = await _app.getImageInfo_PromiseFc(savedFilePath);
								const returnObj = {
									path: savedFilePath,
									width: imageObj.width,
									height: imageObj.height,
									name
								}
								// #ifndef H5
								setPosterStorage(type, { ...returnObj
								});
								// #endif
								_app.hideLoading();
								resolve(returnObj);
							} else {
								_app.hideLoading();
								reject('not find savedFilePath');
							}
						} else {
							_app.log('没有从后端获取的背景图片路径, 尝试从后端获取背景图片路径');
							const image = await this.getPosterUrl(objs);
							_app.log('尝试下载并保存背景图:' + image);
							const savedFilePath = await _app.downLoadAndSaveFile_PromiseFc(image);
							if (savedFilePath) {
								_app.log('下载并保存背景图成功:' + savedFilePath);
								const imageObj = await _app.getImageInfo_PromiseFc(savedFilePath);
								_app.log('获取图片信息成功');
								const returnObj = {
									path: savedFilePath,
									width: imageObj.width,
									height: imageObj.height,
									name: _app.fileNameInPath(image)
								}
								_app.log('拼接背景图信息对象成功:' + JSON.stringify(returnObj));
			
								// #ifndef H5
								setPosterStorage(type, { ...returnObj
								});
								// #endif
			
								_app.hideLoading();
								_app.log('返回背景图信息对象');
								resolve({ ...returnObj
								});
							} else {
								_app.hideLoading();
								reject('not find savedFilePath');
							}
						}
					} catch (e) {
						//TODO handle the exception
						reject(e);
					}
				});
			},
			
			getPosterUrl(objs) { // 后端获取背景图的url路径方法
			let log = console.log;
				let {
					backgroundImage,
					type
				} = objs;
				let that = this;
				return new Promise((rs, rj) => {
					let image = new Promise((rs, rj) => {
						const {
							windowWidth,
							windowHeight
						} = uni.getSystemInfoSync();
						var drawArr = uni.getStorageSync('drawArr');
						var canvasTitle = uni.getStorageSync('canvasTitle');
						var echartArr = uni.getStorageSync('echartArr');
						const ctx = uni.createCanvasContext('default_PosterCanvasId');
						ctx.setFillStyle("#FFFFFF");
						ctx.fillRect(0, 0, windowWidth, 1000000);
						var hei = 0;
						var wid = 0;
						var url;
						var imgObj;
						ctx.setFillStyle('#3A82CC');
						ctx.fillRect(0, 0, windowWidth, 70);
						hei += 60;
						ctx.font = "24px bold 黑体";
						ctx.setFillStyle('white');
						// 绘制文字（参数：要写的字，x坐标，y坐标）
						var title = uni.getStorageSync('drawTitle');
						// ctx.setFontSize(17);
						ctx.setTextAlign('center');
						ctx.fillText(title, windowWidth/2, hei - 18, windowWidth * 2.7);
						async function f1() {
							for (var i = 0; i < echartArr.length; i++) {
								await new Promise((rs, rj) => {
											uni.saveFile({
												tempFilePath: echartArr[i].echartUrl,
												success(res) {
													log('保存成功:' + JSON.stringify(res));
													url = res.savedFilePath;
													console.log("url" + i + ":" + url);
													uni.getImageInfo({
														src: res.savedFilePath,
														success: res => {
															log('获取图片信息成功:' + JSON.stringify(res));
															imgObj = res;
															rs(res);
														},
														fail: err => {
															log('获取图片信息失败:' + JSON.stringify(err));
														}
													})
												},
											})
								}).then(function() {
									const {
										windowWidth,
										windowHeight
									} = uni.getSystemInfoSync();
									//#ifndef H5
									ctx.setFillStyle('#F5F5F5');
									ctx.fillRect(0, hei, windowWidth, 15);
									ctx.font = "15px bold 黑体";
									hei += 40;
									ctx.setFillStyle('black');
									// 设置水平对齐方式
									ctx.setTextBaseline = "middle";
									// 绘制文字（参数：要写的字，x坐标，y坐标）
									var txt = echartArr[i].echartHeight;
									ctx.setFontSize(15);
									ctx.setTextAlign('left');
									ctx.fillText(txt, 20, hei, windowWidth * 2.7 - 40);
									// ctx.draw();
									ctx.setStrokeStyle('#D3D3D3');
									hei += 10;
									ctx.moveTo(0, hei);
									ctx.lineTo(windowWidth-20, hei);
									ctx.stroke();
									// ctx.draw();
									console.log("url:"+url);
									console.log("wid:"+imgObj.width);
									console.log("hei:"+imgObj.height);
									ctx.drawImage(url, wid, hei, imgObj.width / 3, imgObj.height / 3);
									hei += imgObj.height / 3+10;
									//#endif
									console.log("绘图成功" + i);
									if (i === drawArr.length - 1) {
										f2();
									}
								})
							}
						}
			
						function f2() {
							console.log("绘图到画布");
							ctx.draw();
							setTimeout(function() {
								uni.canvasToTempFilePath({
									canvasId: 'default_PosterCanvasId',
									success: function(res) {
										console.log("成功保存到default_PosterCanvasId");
										console.log("res.tempFilePath:" + res.tempFilePath);
										uni.saveFile({
											tempFilePath: res.tempFilePath,
											success(res) {
												log('保存成功:' + JSON.stringify(res));
												uni.setStorageSync("drawImg", res.savedFilePath);
												uni.saveImageToPhotosAlbum({
												            filePath: res.savedFilePath,
												            success: function () {
												                console.log('save success');
												            }
												        });
												uni.getImageInfo({
													src: res.savedFilePath,
													success: res => {
														console.log("image.width:" + res.width);
														console.log("image.height:" + res.height);
													},
													fail: err => {
														log('获取图片信息失败:' + JSON.stringify(err));
													}
												})
											}
										})
										rs(res.tempFilePath);
										image = res.tempFilePath;
									},
									fail: err => {
										console.log('fail:' + JSON.stringify(err));
									}
								},that)
							}, 500);
						}
						f1();
					})
			
					if (image) {
						console.log("image:" + image);
						rs(image);
					} // resolve图片的路径
					else
						rj('背景图片路径不存在');
					
				})
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
