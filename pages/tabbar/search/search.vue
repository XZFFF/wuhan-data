<template>
	<view style="height: 2000upx; background-color: #00B26A;">
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				type: '全部'
			};
		},
		onLoad() {
			uni.showToast({
				title: "该模块正在开发中...",
				icon: "none",
				duration: 1000,
			})
		},
		onNavigationBarButtonTap(e) {
			uni.showActionSheet({
				itemList: ['全部', '国统', '湖统', '大数据'],
				success: function(res) {
					var itemList = ['全部', '国统', '湖统', '大数据'];
					// 这里无法直接调用前面的itemList，所以重新声明一次
					console.log('选择了' + itemList[res.tapIndex]);
					this.type = itemList[res.tapIndex];
					// 通过控制该页面的webview对象来重置导航栏的button中text数值
					let pages = getCurrentPages();
					let page = pages[pages.length - 1];
					// #ifdef APP-PLUS  
					let currentWebview = page.$getAppWebview();
					let titleObj = currentWebview.getStyle().titleNView;
					if (!titleObj.buttons) {
						return;
					}
					titleObj.buttons[0].text = this.type;
					currentWebview.setStyle({
						titleNView: titleObj
					});
					// #endif
				},
				fail: function(res) {
					console.log(res.errMsg);
				}
			});
		},
		methods: {}
	}
</script>

<style>
</style>
