<template>
	<view>

	</view>
</template>

<script>
	import checkApi from '@/common/checkApi.js'
	const open = uni.requireNativePlugin("Html5App-openFile");
	// #ifdef APP-PLUS
	// 如下为分享内容定义，可根据业务需求自行定义
	var strShareUrl = "hubeidata://pages/analysis/detail/detail??indexId=1&indexName=PMI(全国)&isFavorite=false"
	var strShareTitle = "数说湖北"
	var strShareSummary = "湖北省发展和改革委员会宏观经济移动应用"
	var strShareImageUrl = "" //https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png

	//以下为计算菜单的nview绘制布局，为固定算法，使用者无关关心
	var screenWidth = plus.screen.resolutionWidth
	//以360px宽度屏幕为例，上下左右边距及2排按钮边距留25像素，图标宽度55像素，同行图标间的间距在360宽的屏幕是30px，但需要动态计算，以此原则计算4列图标分别的left位置
	//图标下的按钮文字距离图标5像素，文字大小12像素
	//底部取消按钮高度固定为44px
	//TODO 未处理横屏和pad，这些情况6个图标应该一排即可 25+55+5+12+25(+55+5+12+25+)+44
	var margin = 25,
		iconWidth = 55,
		icontextSpace = 5,
		textHeight = 12
	var left1 = margin / 360 * screenWidth
	var iconSpace = (screenWidth - (left1 * 2) - (iconWidth * 4)) / 3 //屏幕宽度减去左右留白间距，再减去4个图标的宽度，就是3个同行图标的间距
	if (iconSpace <= 5) { //屏幕过窄时，缩小边距和图标大小，再算一次
		margin = 15
		iconWidth = 40
		left1 = margin / 360 * screenWidth
		iconSpace = (screenWidth - (left1 * 2) - (iconWidth * 4)) / 3 //屏幕宽度减去左右留白间距，再减去4个图标的宽度，就是3个同行图标的间距
	}
	var left2 = left1 + iconWidth + iconSpace
	var left3 = left1 + (iconWidth + iconSpace) * 2
	var left4 = left1 + (iconWidth + iconSpace) * 3
	var top1 = left1
	var top2 = top1 + iconWidth + icontextSpace + textHeight + left1
	// 	console.log("screenWidth: " + screenWidth + " ;height: " + plus.screen.resolutionHeight);
	// 	console.log("left1: " + left1);
	// 	console.log("iconSpace: " + iconSpace);
	var nvMask = new plus.nativeObj.View("nvMask", { //先创建遮罩层
		top: '0px',
		left: '0px',
		height: '100%',
		width: '100%',
		backgroundColor: 'rgba(0,0,0,0.2)'
	});
	nvMask.addEventListener("click", function() { //处理遮罩层点击
		nvMask.hide();
		nvImageMenu.hide();
	})
	var nvImageMenu = new plus.nativeObj.View("nvImageMenu", { //创建底部图标菜单
		bottom: '0px',
		left: '0px',
		height: '166px',
		width: '100%',
		backgroundColor: 'rgb(255,255,255)'
	});
	//绘制底部图标菜单的内容
	nvImageMenu.draw([{
			tag: 'rect', //菜单顶部的分割灰线
			color: '#e7e7e7',
			position: {
				top: '0px',
				height: '1px'
			}
		},
		{
			tag: 'font',
			id: 'sharecancel', //底部取消按钮的文字
			text: '取消分享',
			textStyles: {
				size: '14px'
			},
			position: {
				bottom: '0px',
				height: '44px'
			}
		},
		{
			tag: 'rect', //底部取消按钮的顶部边线
			color: '#e7e7e7',
			position: {
				bottom: '45px',
				height: '1px'
			}
		},
		{
			tag: 'img',
			id: 'imgwechatfriend',
			src: '/static/sharemenu/wechatfriend.png',
			position: {
				top: top1,
				left: left1,
				width: iconWidth,
				height: iconWidth
			}
		},
		{
			tag: 'font',
			id: 'fontwechatfriend',
			text: '微信好友',
			textStyles: {
				size: textHeight
			},
			position: {
				top: top1 + iconWidth + icontextSpace,
				left: left1,
				width: iconWidth,
				height: textHeight
			}
		},
		{
			tag: 'img',
			id: 'imgwechatmoments',
			src: '/static/sharemenu/wechatmoments.png',
			position: {
				top: top1,
				left: left2,
				width: iconWidth,
				height: iconWidth
			}
		},
		{
			tag: 'font',
			id: 'fontwechatmoments',
			text: '微信朋友圈',
			textStyles: {
				size: textHeight
			},
			position: {
				top: top1 + iconWidth + icontextSpace,
				left: left2 - 2.5,
				width: iconWidth + 5,
				height: textHeight
			}
		},
		{
			tag: 'img',
			id: 'imgmore',
			src: '/static/sharemenu/more.png',
			position: {
				top: top1,
				left: left3,
				width: iconWidth,
				height: iconWidth

			}
		},
		{
			tag: 'font',
			id: 'fontmore',
			text: '更多',
			textStyles: {
				size: textHeight
			},
			position: {
				top: top1 + iconWidth + icontextSpace,
				left: left3,
				width: iconWidth,
				height: textHeight

			}
		},
		//如果想要增加更多按钮，请在这里继续添加，第二列还有2个空位
	])
	nvImageMenu.addEventListener("click", function(e) { //处理底部图标菜单的点击事件，根据点击位置触发不同的逻辑
		// console.log("click menu"+JSON.stringify(e));
		if (e.screenY > plus.screen.resolutionHeight - 44) { //点击了底部取消按钮
			nvMask.hide();
			nvImageMenu.hide();
		} else if (e.clientX < 5 || e.clientX > screenWidth - 5 || e.clientY < 5) {
			//屏幕左右边缘5像素及菜单顶部5像素不处理点击
		} else { //点击了图标按钮
			var iClickIndex = -1 //点击的图标按钮序号，第一个图标按钮的index为0
			var iRow = e.clientY < (top2 - (left1 / 2)) ? 0 : 1
			var iCol = -1
			if (e.clientX < (left2 - (iconSpace / 2))) {
				iCol = 0
			} else if (e.clientX < (left3 - (iconSpace / 2))) {
				iCol = 1
			} else if (e.clientX < (left4 - (iconSpace / 2))) {
				iCol = 2
			} else {
				iCol = 3
			}
			if (iRow == 0) {
				iClickIndex = iCol
			} else {
				iClickIndex = iCol + 4
			}
			console.log("点击按钮的序号: " + iClickIndex);
			if (iClickIndex >= 0 && iClickIndex <= 5) { //处理具体的点击逻辑，此处也可以自行定义逻辑。如果增减了按钮，此处也需要跟着修改
				var strProvider = "",
					strScene = ""
				switch (iClickIndex) {
					case 0:
						strProvider = "weixin"
						strScene = "WXSceneSession"
						break;
					case 1:
						strProvider = "weixin"
						strScene = "WXSenceTimeline"
						break;
					case 2:
						plus.share.sendWithSystem({
							content: strShareUrl,
						})
						break;
				}
				if (strProvider != "") { //点击了0-3序号的这4个按钮
					uni.share({
						provider: strProvider,
						scene: strScene,
						type: 0,
						href: strShareUrl,
						title: strShareTitle,
						summary: strShareSummary,
						imageUrl: strShareImageUrl,
						success: function(res) {
							console.log("success:" + JSON.stringify(res));
						},
						fail: function(err) {
							console.log("fail:" + JSON.stringify(err));
						}
					})
				}
			}
		}
	})
	// #endif
	export default {
		props: {
			type: {
				type: String
			},
			indexId: {
				type: String
			},
			indexName: {
				type: String
			},
			isFavorite: {
				type: Boolean,
				default: false
			},
			source: {
				type: String
			}
		},
		data() {
			return {
				title: ''
			};
		},
		// onBackPress() {
		// 	//监听back键，关闭弹出菜单
		// 	if (nvImageMenu.isVisible()) {
		// 		nvImageMenu.hide()
		// 		nvMask.hide()
		// 		return true
		// 	}
		// },
		onNavigationBarButtonTap(e) {
			switch (e.type) {
				case "share": //点击分享按钮
					// #ifdef APP-PLUS
					nvMask.show()
					nvImageMenu.show() //5+应支持从底部向上弹出的动画
					// #endif
					break;
				case "favorite":
					let favColor = "#ffffff";
					if (this.isFavorite == false || this.isFavorite == "false") {
						if (checkApi.setCollect(this.type, this.indexId, this.indexName, this.source)) {
							this.isFavorite = true;
							this.updateAnaylsisListStorage(this.indexId, this.isFavorite);
							favColor = "#f9da74";
						}
					} else if (this.isFavorite == true || this.isFavorite == "true") {
						if (checkApi.delCollect(this.type, this.indexId, this.indexName, this.source)) {
							this.isFavorite = false;
							this.updateAnaylsisListStorage(this.indexId, this.isFavorite);
							favColor = "#ffffff";
						}
					} else {
						console.log("收藏状态异常" + this.isFavorite);
					}
					// 更新导航栏收藏按钮颜色
					let pages = getCurrentPages();
					let page = pages[pages.length - 1];
					// #ifdef APP-PLUS  
					let currentWebview = page.$getAppWebview();
					let titleObj = currentWebview.getStyle().titleNView;
					if (!titleObj.buttons) {
						return;
					}
					titleObj.buttons[1].color = favColor;
					currentWebview.setStyle({
						titleNView: titleObj
					});
					// #endif
					break;
				case "none":
					// #ifdef APP-PLUS
					if (e.text == '导出') {
						let path = "";
						switch (this.indexId) {
							case "1":
							case 1:
								path =
									"http://1.wuhandata.applinzi.com/%E6%96%87%E4%BB%B6/topic/1908/%E6%B9%96%E5%8C%97%E7%9C%81%E9%AB%98%E8%B4%A8%E9%87%8F%E5%8F%91%E5%B1%95%E7%9B%91%E6%B5%8B%E5%88%86%E6%9E%90%E6%8A%A5%E5%91%8A2019%E5%B9%B48%E6%9C%88%20.pdf";
								this.downloader(path);
								break;
							case "2":
							case 2:
								path =
									"http://1.wuhandata.applinzi.com/%E6%96%87%E4%BB%B6/topic/1908/%E6%B9%96%E5%8C%97%E7%9C%81%E5%AE%8F%E8%A7%82%E7%BB%8F%E6%B5%8E%E7%9B%91%E6%B5%8B%E5%88%86%E6%9E%90%E6%8A%A5%E5%91%8A2019%E5%B9%B48%E6%9C%88.pdf";
								this.downloader(path);
								break;
							case "3":
							case 3:
								path =
									"http://1.wuhandata.applinzi.com/%E6%96%87%E4%BB%B6/topic/1908/%E6%B9%96%E5%8C%97%E7%9C%81%E4%BA%A7%E4%B8%9A%E7%BB%8F%E6%B5%8E%E7%9B%91%E6%B5%8B%E5%88%86%E6%9E%90%E6%8A%A5%E5%91%8A2019%E5%B9%B48%E6%9C%88.pdf";
								this.downloader(path);
								break;
							case "4":
							case 4:
								path =
									"http://1.wuhandata.applinzi.com/%E6%96%87%E4%BB%B6/topic/1908/%E6%B9%96%E5%8C%97%E7%9C%81%E5%9B%BA%E5%AE%9A%E8%B5%84%E4%BA%A7%E6%8A%95%E8%B5%84%E7%9B%91%E6%B5%8B%E5%88%86%E6%9E%90%E6%8A%A5%E5%91%8A2019%E5%B9%B48%E6%9C%88.pdf";
								this.downloader(path);
								break;
							default:
								uni.showToast({
									title: "专题" + this.indexId + "导出失败",
									duration: 1000
								});
								break;
						}

					}
					// #endif
					break;
				default:
					uni.showToast({
						title: e.type,
						icon: "none"
					});
			}
		},
		methods: {
			updateAnaylsisListStorage(indexId, isFavorite) {
				let analysisList = uni.getStorageSync('analysis_list');
				if (analysisList) {
					for (let i = 0; i < analysisList.length; i++) {
						let subList = analysisList[i].subList;
						for (let j = 0; j < subList.length; j++) {
							if (subList[j].indexId == indexId) {
								analysisList[i].subList[j].isFavorite = isFavorite;
							}
						}
					}
					uni.setStorageSync('analysis_list', analysisList);
				}
			},
			downloader: function(path) {
				var filename = path.substring(path.lastIndexOf("/") + 1); //分割文件名出来
				//判断文件是否存在
				plus.io.resolveLocalFileSystemURL("_downloads/" + filename, function(entry) {
					//如果文件存在直接打开。
					open.openFile({
						filename: entry.fullPath
					});
				}, function(e) {
					//如果文件不存在，则下载文件到本地
					uni.showLoading({
						title: "文件下载中..."
					});
					// 创建下载任务					
					const dtask = plus.downloader.createDownload(path, {
						filename: "_downloads/" + filename
					}, function(d, status) {
						uni.hideLoading();
						if (status == 200) {
							uni.showToast({
								title: "下载完成"
							});
							let filepath = plus.io.convertLocalFileSystemURL(d.filename);
							open.openFile({
								filename: filepath
							});
						} else {
							uni.showToas({
								title: "下载失败"
							});
						}
					});
					dtask.start(); //开始下载
				});
			}
		}
	}
</script>

<style>

</style>
