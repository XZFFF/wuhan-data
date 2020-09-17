<template>
	<view class="container">
		<view class="page-body">
			<!-- 一级列表 -->
			<scroll-view class="nav-left" scroll-y :style="'height:'+height+'px'">
				<view class="nav-left-item" @click="categoryClickMain(item,index)" :key="index" :class="index==typeActive?'active':''"
				 v-for="(item,index) in typeList">
					<!-- <view :class="index==typeActive?'active-block':''" class="'orgin-block'"></view> -->
					<view style="flex: 1; text-align: center;font-size: 28upx;">
						{{item.typeName}}
					</view>
				</view>
			</scroll-view>
			<!-- 二级列表 -->
			<scroll-view class="nav-right" scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+height+'px'"
			 scroll-with-animation>
				<view v-for="(item,index) in labelList" :key="index" class="padding-top padding-lr">
					<view class="cu-bar solid-bottom bg-white" style="min-height: 80upx;">
						<view class="action" style="font-size: 28upx;min-height: 80upx;">
							<text class="cuIcon-titles text-blue" style="color: #3A82CC;"></text>
							<text style="font-size: 28upx;color:#3A82CC">{{item.labelName}}</text>
						</view>
					</view>
					<view class="cu-list menu sm-border">
						<view v-for="(item2,index2) in item.themeList" :key="index2" class="cu-item arrow" @click="openDetail(item2.indexId, item2.indexName)">
							<view class="content">
								<text class="text-grey" style="color: #212121;">{{item2.indexName}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="padding-top padding-lr"></view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	// 引入公共样式
	import wdIndiItem from '@/components/wd-indi-item/wd-indi-item.vue';
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue';
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue';
	import checkApi from '@/common/checkApi.js';
	import analysisListApiJson from '@/common/api/analysisList.json';

	export default {
		components: {
			wdIndiItem,
			uniCollapse,
			uniCollapseItem
		},
		data() {
			return {
				itemKey: 0,
				height: 0,
				typeActive: 0,
				scrollTop: 0,
				scrollHeight: 0,
				typeList: [],
				labelList: [],
				source: ""
			};
		},
		onShow() {
			this.showStorage();
			this.setScroll();
		},
		onLoad: function(e) {
			if (JSON.stringify(e) != '{}') {
				this.itemKey = e.itemKey;
			}
			console.log("进入经济分析栏目详情页;" + JSON.stringify(e));
			uni.showLoading({
				title: "加载栏目列表中",
			});
			this.showStorage();
			this.initAnalysisList();
		},
		onNavigationBarButtonTap(e) {
			console.log(JSON.stringify(e));
			if (e.type == 'none') {
				uni.navigateTo({
					url: '../search/search',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		methods: {
			// 初始化经济分析栏目列表
			initAnalysisList() {
				let token = uni.getStorageSync('token');
				uni.request({
					// url: 'https://www.baidu.com',
					url: this.apiUrl + "getAnalysisList",
					method: 'POST',
					data: {
						token: token,
					},
					success: (res) => {
						// 获取homepage的数据
						let dataApi = res.data;
						// let dataApi = analysisListApiJson;
						// 检查json数据
						checkApi.isApi(dataApi);
						// 设置各部分数据
						console.log(JSON.stringify(dataApi));
						this.typeList = dataApi.data.list;
						// 数据存入缓存
						uni.setStorageSync('analysis_list', this.typeList);
					},
					fail: (e) => {
						// 调用缓存数据
						let analysisList = uni.getStorageSync('analysis_list');
						if (analysisList) {
							this.typeList = analysisList
						}
					},
					complete: () => {
						// 设置初始化的左右侧子栏数据(默认为第一个)
						this.typeActive = this.itemKey;
						console.log('typeActive' + this.typeActive);
						this.source = this.typeList[this.typeActive].typeName;
						this.labelList = this.typeList[this.typeActive].labelList;
						uni.hideLoading();
						this.setScroll();
					}
				});
				this.height = uni.getSystemInfoSync().windowHeight;
			},
			// 展示经济分析列表缓存数据
			showStorage() {
				let analysisList = uni.getStorageSync('analysis_list');
				if (analysisList) {
					this.typeList = analysisList;
					this.typeActive = this.itemKey;
					this.source = this.typeList[this.typeActive].typeName;
					this.labelList = this.typeList[this.typeActive].labelList;
					uni.hideLoading();
				}
			},
			// 右侧数据根据左侧的一级栏目选择做出对应的变化
			categoryClickMain(categroy, index) {
				this.typeActive = index;
				this.source = this.typeList[this.typeActive].typeName;
				// 右侧栏数据根据左侧栏变更做出变化
				this.labelList = categroy.labelList;
				this.scrollTop = -this.scrollHeight * index;
				uni.setStorageSync('analysis_list_scroll_index', this.typeActive);
			},
			// 记录滑轮位置
			scroll(e) {
				this.scrollHeight = e.detail.scrollHeight;
				uni.setStorageSync('analysis_list_scroll_top', e.detail.scrollTop);
			},
			// 从其他页面进入时，设置滑轮高度
			setScroll() {
				try {
					let analysisListScrollIndex = uni.getStorageSync('analysis_list_scroll_index');
					let analysisListScrollTop = uni.getStorageSync('analysis_list_scroll_top');
					this.typeActive = analysisListScrollIndex;
					this.labelList = this.typeList[this.typeActive].labelList;
					this.scrollTop = analysisListScrollTop;
				} catch (e) {
					console.log("发生异常;" + JSON.stringify(e));
				}
			},
			// 跳转到指标详情页
			openDetail(indexId, indexName) {
				let source = this.source;
				console.log(source);
				uni.navigateTo({
					url: '../../analysis/detail/detail?indexId=' + indexId + '&indexName=' + indexName +
						'&source=' + source
				});
			},
		},
	}
</script>

<style>
	.page-body {
		display: flex;
	}

	.nav {
		display: flex;
		width: 100%;
	}

	.nav-left {
		width: 20%;
		background-color: #FFFFFF;
	}

	.nav-left-item {
		height: 100upx;
		/* border-right: solid 1px #E0E0E0; */
		/* border-bottom: solid 1px #E0E0E0; */
		font-size: 30upx;
		display: flex;
		align-items: center;
	}

	.active {
		color: #1A82D2;
		background-color: #F6F7F7;
	}

	.orgin-block {
		width: 8upx;
		background-color: #F8F8F8;
		height: 100%;
	}

	.active-block {
		background-color: #7DACF0;
	}

	.nav-right {
		width: 80%;
		background-color: #F6F7F7;
	}

	/* 侧边分类右侧样式#F0AD4E */
	.nav-right-item {
		display: flex;
		width: 80%;
		height: 120upx;
		margin: 40upx auto;
		background: #FFFFFF;
	}
</style>
