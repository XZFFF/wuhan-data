let log = console.log; // 如果在项目的APP.vue文件中的onlaunch中设置 console.log = ()=> {} 则在此也不会有打印信息
// log = ()=>{};	// 打开注释则该插件不会打印任何信息
let _app = {
	log, // 打印控制
	getPosterUrl(objs) { // 后端获取背景图的url路径方法
		let {
			backgroundImage,
			type
		} = objs;
		// let p = new Promise(function (resolve, reject) {
		// 	var res;
		// 	var imgID = String(Date.parse( new Date()));
		// 	var self = plus.webview.currentWebview();  
		// 	var bitmap = new plus.nativeObj.Bitmap(imgID);  
		// 				
		// 	//绘制截图  
		// 	self.draw(bitmap,function(){  
		// 		res = bitmap.toBase64Data();
		// 		console.log(bitmap.toBase64Data());
		// 		resolve(res);
		// 	},function(e){  
		// 			console.log("截屏绘制失败");
		// 	});
		// });
		// p.then(function (val) { 
		// 	return new Promise((rs, rj) => {
		// 		console.log(val);
		// 		let image = val;
		// 		// if (image)
		// 		// 	rs(image); // resolve图片的路径
		// 		// else
		// 		// 	rj('背景图片路径不存在');
		// 	});
		// });
		return new Promise((rs, rj) => {
			let image = new Promise((rs, rj) => {
				const {
					windowWidth,
					windowHeight
				} = uni.getSystemInfoSync();
				var drawArr = uni.getStorageSync('drawArr');
				var canvasTitle = uni.getStorageSync('canvasTitle');
				const ctx = uni.createCanvasContext('hideCanvas');
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
					for (var i = 0; i < drawArr.length; i++) {
						await new Promise((rs, rj) => {
							uni.canvasToTempFilePath({
								canvasId: drawArr[i],
								success: function(res) {
									console.log("返回图片路径" + i + ":" + res.tempFilePath);
									uni.saveFile({
										tempFilePath: res.tempFilePath,
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
								},
								fail: function() {
									uni.showToast({
										icon: 'none',
										title: "图表正在加载，请稍后再试"
									});
									rj(false);
								}
							});
						}).then(function() {
							const {
								windowWidth,
								windowHeight
							} = uni.getSystemInfoSync();
							// uni.saveImageToPhotosAlbum({
							// 	filePath: url,
							// 	success: function () {
							// 		console.log('save success'+i);
							// 	}
							// });
							//#ifndef H5
							ctx.setFillStyle('#F5F5F5');
							ctx.fillRect(0, hei, windowWidth, 15);
							ctx.font = "15px bold 黑体";
							hei += 40;
							ctx.setFillStyle('black');
							// 设置水平对齐方式
							ctx.setTextBaseline = "middle";
							// 绘制文字（参数：要写的字，x坐标，y坐标）
							var txt = canvasTitle[i];
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
							ctx.drawImage(url, wid, hei, imgObj.width / 3, imgObj.height / 3);
							hei += imgObj.height / 3 - 40;
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
							canvasId: 'hideCanvas',
							success: function(res) {
								console.log("成功保存到hideCanvas");
								//#ifndef H5
								console.log("res.tempFilePath:" + res.tempFilePath);
								uni.saveFile({
									tempFilePath: res.tempFilePath,
									success(res) {
										log('保存成功:' + JSON.stringify(res));
										uni.setStorageSync("drawImg", res.savedFilePath);
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
								//#endif
							},
						})
					}, 500);
				}
				f1();
			});

			if (image) {
				console.log("image:" + image);
				rs(image);
			} // resolve图片的路径
			else
				rj('背景图片路径不存在');
		})
	},


	drawImg() {
		var imgID = String(Date.parse(new Date()));
		var self = plus.webview.currentWebview();
		var bitmap = new plus.nativeObj.Bitmap(imgID);

		//绘制截图  
		self.draw(bitmap, function() {
			var newImg = bitmap.toBase64Data();
			that.headImg = newImg;
		}, function(e) {
			console.log("截屏绘制失败");
		});
	},



	//下面一般不用动他
	shareTypeListSheetArray: {
		array: [0, 1, 2, 3, 4, 5]
	}, // 分享类型 0-图文链接 1-纯文字 2-纯图片 3-音乐 4-视频 5-小程序
	getStorage(key, scb, fcb) {
		uni.getStorage({
			key,
			success: function(res) {
				if (res.data && res.data != "") {
					if (scb) scb(res.data);
				} else {
					if (fcb) fcb();
				}
			},
			fail: function() {
				if (fcb) fcb();
			}
		})
	},
	setStorage(key, data) {
		log('设置缓存')
		log('key：' + key)
		log('data：' + JSON.stringify(data));
		uni.setStorage({
			key,
			data
		})
	},
	setStorageSync(key, data) {
		uni.setStorageSync(key, data);
	},
	getStorageSync(key) {
		return uni.getStorageSync(key);
	},
	clearStorageSync() {
		uni.clearStorageSync();
	},
	removeStorageSync(key) {
		uni.removeStorageSync(key);
	},
	showLoading(msg, ifmask) {
		uni.showLoading({
			title: msg,
			mask: ifmask || false
		})
	},
	hideLoading() {
		uni.hideLoading();
	},
	showToast(msg, icon) {
		uni.showToast({
			title: msg,
			icon: icon || 'none'
		})
	},
	getImageInfo(url, cb, fcb) {
		url = checkMPUrl(url);
		uni.getImageInfo({
			src: url,
			success(res) {
				if (cb && typeof(cb) == 'function') cb(res);
			},
			fail(err) {
				if (fcb && typeof(fcb) == 'function') fcb(err);
			}
		})
	},
	downloadFile(url, cb) {
		url = checkMPUrl(url);
		uni.downloadFile({
			url,
			success(res) {
				if (cb && typeof(cb) == 'function') cb(res);
			}
		})
	},
	downloadFile_PromiseFc(url) {
		return new Promise((rs, rj) => {
			if (url.substring(0, 4) !== 'http') {
				rs(url);
			} else {
				url = checkMPUrl(url);
				log('url:' + url);
				uni.downloadFile({
					url,
					success(res) {
						if (res && res.tempFilePath)
							rs(res.tempFilePath);
						else
							rj('not find tempFilePath');
					},
					fail(err) {
						rj(err);
					}
				})
			}
		});
	},
	saveFile(url) {
		uni.saveFile({
			tempFilePath: url,
			success(res) {
				log('保存成功:' + JSON.stringify(res))
			}
		})
	},
	downLoadAndSaveFile_PromiseFc(url) {
		return new Promise((rs, rj) => {
			log('准备下载并保存图片:' + url);
			if (url.substring(0, 4) === 'http') {
				url = checkMPUrl(url);
				uni.downloadFile({
					url,
					success(d_res) {
						log('下载背景图成功：' + JSON.stringify(d_res));
						if (d_res && d_res.tempFilePath) {

							// #ifdef H5
							rs(d_res.tempFilePath);
							// #endif

							// #ifndef H5
							uni.saveFile({
								tempFilePath: d_res.tempFilePath,
								success(s_res) {
									log('保存背景图成功:' + JSON.stringify(s_res));
									if (s_res && s_res.savedFilePath)
										rs(s_res.savedFilePath);
									else
										rs(d_res.tempFilePath);
								},
								fail(err) {
									rs(d_res.tempFilePath);
								}
							})
							// #endif

						} else {
							rj('not find tempFilePath');
						}
					},
					fail(err) {
						rj(err);
					}
				})
			} else {
				rs(url);
			}
		})
	},
	checkFile_PromiseFc(url) {
		return new Promise((rs, rj) => {
			uni.getSavedFileList({
				success(res) {
					let d = res.fileList;
					let index = d.findIndex(item => {
						return item.filePath === url;
					})
					rs(index);
				},
				fail(err) {
					rj(err);
				}
			})
		});
	},
	removeSavedFile(path) {
		uni.getSavedFileList({
			success(res) {
				let d = res.fileList;
				let index = d.findIndex(item => {
					return item.filePath === path;
				});
				if (index >= 0)
					uni.removeSavedFile({
						filePath: path
					})
			}
		})
	},
	fileNameInPath(path) {
		let s = path.split("/");
		return s[s.length - 1];
	},
	getImageInfo_PromiseFc(imgPath) {
		return new Promise((rs, rj) => {
			log('准备获取图片信息:' + imgPath);
			imgPath = checkMPUrl(imgPath);
			uni.getImageInfo({
				src: imgPath,
				success: res => {
					log('获取图片信息成功:' + JSON.stringify(res));
					rs(res);
				},
				fail: err => {
					log('获取图片信息失败:' + JSON.stringify(err));
					rj(err)
				}
			})
		});
	},
	previewImage(urls) {
		if (typeof(urls) == 'string')
			urls = [urls];
		uni.previewImage({
			urls,
		})
	},
	actionSheet(obj, cb) {
		let sheetArray = [];
		for (let i = 0; i < obj.array.length; i++) {
			switch (obj.array[i]) {
				case 'sinaweibo':
					sheetArray[i] = '新浪微博';
					break;
				case 'qq':
					sheetArray[i] = 'QQ';
					break;
				case 'weixin':
					sheetArray[i] = '微信';
					break;
				case 'WXSceneSession':
					sheetArray[i] = '微信好友';
					break;
				case 'WXSenceTimeline':
					sheetArray[i] = '微信朋友圈';
					break;
				case 'WXSceneFavorite':
					sheetArray[i] = '微信收藏';
					break;
				case 0:
					sheetArray[i] = '图文链接';
					break;
				case 1:
					sheetArray[i] = '纯文字';
					break;
				case 2:
					sheetArray[i] = '纯图片';
					break;
				case 3:
					sheetArray[i] = '音乐';
					break;
				case 4:
					sheetArray[i] = '视频';
					break;
				case 5:
					sheetArray[i] = '小程序';
					break;
				default:
					break;
			}
		}
		this.showActionSheet(sheetArray, cb);
	},
	showActionSheet(sheetArray, cb) {
		uni.showActionSheet({
			itemList: sheetArray,
			success: (e) => {
				if (cb && typeof(cb) == 'function') cb(e.tapIndex);
			}
		})
	},
	getProvider(type, cb, sheet) {
		let _this = this;
		uni.getProvider({
			service: type,
			success: function(res) {
				if (sheet) {
					let obj = {};
					obj.array = res.provider;
					_this.actionSheet(obj, function(index) {
						if (cb && typeof(cb) == "function") cb(res.provider[index]);
					});
				} else {
					if (type == 'payment') {
						let providers = res.provider;
						let payTypeArray = [];
						for (let i = 0; i < providers.length; i++) {
							if (providers[i] == 'wxpay') {
								payTypeArray[i] = {
									name: '微信支付',
									value: providers[i],
									img: '/static/image/wei.png'
								};
							} else if (providers[i] == 'alipay') {
								payTypeArray[i] = {
									name: "支付宝支付",
									value: providers[i],
									img: '/static/image/ali.png'
								};
							}
						}
						if (cb && typeof(cb) == "function") cb(payTypeArray);
					} else {
						if (cb && typeof(cb) == "function") cb(res);
					}
				}
			},
		})
	},
	// #ifdef APP-PLUS
	getShare(providerName, WXScene, shareType, title, summary, href, imageUrl, miniProgramObj, mediaUrl, scb, fcb) { //miniProgram: {path: '', type: 0, webUrl: ''}
		let _this = this;
		if (typeof(shareType) == 'number' && !isNaN(shareType) && shareType >= 0) {
			_this.readyShare(providerName, WXScene, shareType, title, summary, href, imageUrl, miniProgramObj, mediaUrl, scb,
				fcb);
		} else {
			_this.actionSheet(_this.shareTypeListSheetArray, function(index) {
				_this.readyShare(providerName, WXScene, _this.shareTypeListSheetArray.array[index], title, summary, href,
					imageUrl, miniProgramObj, mediaUrl, scb, fcb);
			});
		}
	},
	readyShare(providerName, WXScene, shareType, title, summary, href, imageUrl, miniProgramObj, mediaUrl, scb, fcb) {
		let _this = this;
		let shareObjData = {};
		switch (shareType) {
			case 0:
				shareObjData = {
					href: href,
					summary: summary,
					imageUrl: imageUrl
				};
				break;
			case 1:
				shareObjData = {
					summary: summary,
					href: href
				};
				break;
			case 2:
				shareObjData = {
					imageUrl: imageUrl
				};
				break;
			case 3:
				if (mediaUrl) {
					_this.showToast('暂不支持此分享类型');
					return;
				};
				shareObjData = {
					mediaUrl: mediaUrl
				};
				break;
			case 4:
				if (mediaUrl) {
					_this.showToast('暂不支持此分享类型');
					return;
				};
				shareObjData = {
					mediaUrl: mediaUrl
				};
				break;
			case 5:
				shareObjData = {
					miniProgram: { ...miniProgramObj,
						id: miniProgramId,
						type: miniProgramShareType
					},
					imageUrl: imageUrl
				};
				providerName = 'weixin';
				break;
			default:
				_this.showToast('分享参数-shareType错误');
				return;
				break;
		}
		shareObjData.title = title;
		_this.share(providerName, WXScene, shareType, shareObjData, function(res) {
			if (scb && typeof(scb) == 'function') scb(res);
		}, function(err) {
			if (fcb && typeof(fcb) == 'function') fcb(err);
		});
	},
	share(providerName, WXScene, shareType, data, scb, fcb) {
		let _this = this;
		let shareObj = {
			provider: '',
			success: Function,
			fail: Function
		};
		if (providerName && providerName != '') {
			shareObj.provider = providerName;
			if (providerName == 'weixin') {
				_this.readyShareWXScene(WXScene, function(Scene) {
					shareObj.scene = Scene;
					_this.doingShare(shareObj, shareType, data, scb, fcb);
				});
			} else {
				_this.doingShare(shareObj, shareType, data, scb, fcb);
			}
		} else {
			_this.getProvider('share', function(name) {
				shareObj.provider = name;
				if (name == 'weixin') {
					_this.readyShareWXScene(WXScene, function(Scene) {
						shareObj.scene = Scene;
						_this.doingShare(shareObj, shareType, data, scb, fcb);
					});
				} else {
					_this.doingShare(shareObj, shareType, data, scb, fcb);
				}
			}, true);
		}
	},
	readyShareWXScene(WXScene, cb) {
		let _this = this;
		let WXScenetypelist = {
			array: ['WXSceneSession', 'WXSenceTimeline', 'WXSceneFavorite']
		};
		if (WXScene && WXScene != "") {
			if (cb && typeof(cb) == 'function') cb(WXScene);
		} else {
			_this.actionSheet(WXScenetypelist, function(index) {
				if (cb && typeof(cb) == 'function') cb(WXScenetypelist.array[index]);
			});
		}
	},
	doingShare(shareObj, shareType, data, scb, fcb) {
		shareObj.type = shareType;
		if (data && data.title) shareObj.title = data.title;
		switch (shareType) {
			case 0: //图文链接
				shareObj.href = data.href;
				shareObj.summary = data.summary;
				shareObj.imageUrl = data.imageUrl;
				break;
			case 1: //纯文字
				shareObj.summary = data.summary;
				shareObj.href = data.href;
				break;
			case 2: //纯图片
				shareObj.imageUrl = data.imageUrl;
				break;
			case 3: //音乐
				if (!data.mediaUrl) {
					_this.showToast('暂不支持此分享类型');
					return;
				};
				shareObj.mediaUrl = data.mediaUrl;
				break;
			case 4: //视频
				if (!data.mediaUrl) {
					_this.showToast('暂不支持此分享类型');
					return;
				};
				shareObj.mediaUrl = data.mediaUrl;
				break;
			case 5: //小程序
				if (miniProgramId == '') {
					uni.showToast('未设置小程序ID, 请使用其他方式分享');
					return;
				}
				let mp = {
					id: miniProgramId
				};
				mp.path = data.miniProgram.path;
				mp.type = data.miniProgram.type;
				if (data.miniProgram.webUrl) mp.webUrl = data.miniProgram.webUrl;
				shareObj.miniProgram = mp;
				shareObj.imageUrl = data.imageUrl;
				break;
			default:
				appJS.showToast('分享参数-shareType错误');
				break;
		}
		shareObj.success = function(res) {
			if (scb && typeof(scb) == 'function') scb(res);
		}
		shareObj.fail = function(err) {
			if (fcb && typeof(fcb) == 'function') fcb(err);
		}
		log(JSON.stringify(shareObj));
		uni.share(shareObj);
	},
	// #endif
}


function checkMPUrl(url) {
	// #ifdef MP
	if (
		url.substring(0, 4) === 'http' &&
		url.substring(0, 12) !== 'http://store' &&
		url.substring(0, 10) !== 'http://tmp' &&
		url.substring(0, 5) !== 'https'
	) {
		url = 'https' + url.substring(4, url.length);
	}
	// #endif
	return url;
}

export default _app;
