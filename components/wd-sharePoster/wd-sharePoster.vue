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
		<!-- <button type="primary" @tap="shareFc()">生成海报</button> -->
		<view class="hideCanvasView">
			<canvas class="hideCanvas" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||0) + 'px', height: (poster.height||0) + 'px'}"></canvas>
		</view>
		<view class="hideCanvas">
			<canvas canvas-id="hideCanvas" :style="{height: canvasHeight+'px',width: windowWidth+'px'}"></canvas>
		</view>
	</view>
</template>

<script>
	import _app from '@/common/app.js';
	import getSharePoster from '@/common/QS-SharePoster.js';
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
		updated() {
			const {
				windowWidth,
				windowHeight
			} = uni.getSystemInfoSync();
			this.windowWidth = windowWidth;
			var heiArr = uni.getStorageSync("canvasHeight");
			var titleArr = uni.getStorageSync("canvasTitle");
			var hei = 50;
			console.log("windowWidth:" + windowWidth);
			for (var i of heiArr) {
				hei += parseInt(i) + 40;
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
				try {
					if (!this.poster.finalPath) {
						const d = await getSharePoster({
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
