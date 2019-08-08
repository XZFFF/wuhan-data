<template>
	<view class="container">
		<view class="page-body">
			<scroll-view class="nav-left" scroll-y :style="'height:'+height+'px'">
				<view class="nav-left-item" @click="categoryClickMain(item,index)" :key="index" :class="index==categoryActive?'active':''"
				 v-for="(item,index) in categoryList">
					<view :class="index==categoryActive?'active-block':''" class="'orgin-block'"></view>
					<view style="flex: 1; text-align: center;">
						{{item.listName}}
					</view>
				</view>
			</scroll-view>
			<scroll-view class="nav-right" scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+height+'px'"
			 scroll-with-animation>
				<view v-for="(item,index) in subCategoryList" :key="index">
					<wd-indi-item :indexId="item.indexId" :indexName="item.indexName" :desc="item.desc" :isFavorite="item.isFavorite"
					 :source="source" :item="item"></wd-indi-item>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	// 引入公共样式
	import wdIndiItem from '@/components/wd-indi-item/wd-indi-item.vue';
	import checkApi from '@/common/checkApi.js';
	import analysisListApiJson from '@/common/api/analysisList.json';

	export default {
		components: {
			wdIndiItem
		},
		data() {
			return {
				itemKey: 0,
				height: 0,
				categoryActive: 0,
				scrollTop: 0,
				scrollHeight: 0,
				categoryList: [],
				subCategoryList: [],
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
		methods: {
			initAnalysisList() {
				let token = uni.getStorageSync('token');
				uni.request({
					url: this.apiUrl + "getAnalysisList",
					method: 'POST',
					data: {
						token: token
					},
					success: (res) => {
						// 获取homepage的数据
						let dataApi = res.data;
						// 检查json数据
						checkApi.isApi(dataApi);
						// 设置各部分数据
						console.log(JSON.stringify(dataApi));
						this.categoryList = dataApi.data.list;
						// 数据存入缓存
						uni.setStorageSync('analysis_list', this.categoryList);
					},
					fail: (e) => {
						// 调用缓存数据
						let analysisList = uni.getStorageSync('analysis_list');
						if (analysisList) {
							this.categoryList = analysisList
						}
					},
					complete: () => {
						// 设置初始化的左右侧子栏数据(默认为第一个)
						this.categoryActive = this.itemKey;
						this.source = this.categoryList[this.categoryActive].listName;
						this.subCategoryList = this.categoryList[this.categoryActive].subList;
						uni.hideLoading();
						uni.setStorageSync('analysis_list_scroll_index', this.categoryActive);
					}
				});
				this.height = uni.getSystemInfoSync().windowHeight;
			},
			showStorage() {
				console.log("show storage list");
				let analysisList = uni.getStorageSync('analysis_list');
				if (analysisList) {
					this.categoryList = analysisList;
					this.categoryActive = this.itemKey;
					this.source = this.categoryList[this.categoryActive].listName;
					this.subCategoryList = this.categoryList[this.categoryActive].subList;
					uni.hideLoading();
				}
			},
			scroll(e) {
				console.log(JSON.stringify(e));
				this.scrollHeight = e.detail.scrollHeight;
				uni.setStorageSync('analysis_list_scroll_top', e.detail.scrollTop);
			},
			categoryClickMain(categroy, index) {
				this.categoryActive = index;
				this.source = this.categoryList[this.categoryActive].listName;
				// 右侧栏数据根据左侧栏变更做出变化
				this.subCategoryList = categroy.subList;
				this.scrollTop = -this.scrollHeight * index;
				uni.setStorageSync('analysis_list_scroll_index', this.categoryActive);
			},
			setScroll() {
				try {
					let analysisListScrollIndex = uni.getStorageSync('analysis_list_scroll_index');
					let analysisListScrollTop = uni.getStorageSync('analysis_list_scroll_top');
					this.categoryActive = analysisListScrollIndex;
					this.subCategoryList = this.categoryList[this.categoryActive].subList;
					this.scrollTop = analysisListScrollTop;
				} catch (e) {
					console.log("发生异常;" + JSON.stringify(e));
				}

			}

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
		width: 25%;
		background-color: #F6F7F7;
	}

	.nav-left-item {
		height: 120upx;
		/* border-right: solid 1px #E0E0E0; */
		border-bottom: solid 1px #E0E0E0;
		font-size: 30upx;
		display: flex;
		align-items: center;
	}

	.active {
		color: #1A82D2;
		background-color: #FFFFFF;
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
		width: 75%;
		background-color: #FFFFFF;
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
