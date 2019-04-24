<template>
	<view class="container">
		<view class="page-body">
			<scroll-view class="nav-left" scroll-y :style="'height:'+height+'px'">
				<view class="nav-left-item" @click="categoryClickMain(item,index)" :key="index" :class="index==categoryActive?'active':''"
				 v-for="(item,index) in categoryList">
					<view :class="index==categoryActive?'active-block':''" class="'orgin-block'"></view>
					<view style="flex: 1; text-align: center;">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
			<scroll-view class="nav-right" scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+height+'px'"
			 scroll-with-animation>
				<view v-for="(item,index) in subCategoryList" :key="index">
					<wd-indi-item :indexId="item.indexId" :indexName="item.indexName" :desc="item.desc" :isFavorite="item.isFavorite"
					 :item="item"></wd-indi-item>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	// 引入公共样式
	import wdIndiItem from '@/components/wd-indi-item/wd-indi-item.vue';
	export default {
		components: {
			wdIndiItem
		},
		data() {
			return {
				analysisId: 0,
				height: 0,
				categoryActive: 0,
				scrollTop: 0,
				scrollHeight: 0,
				categoryList: [],
				subCategoryList: []
			};
		},
		methods: {
			scroll(e) {
				this.scrollHeight = e.detail.scrollHeight;
			},
			categoryClickMain(categroy, index) {
				console.log(categroy);
				this.categoryActive = index;
				// 右侧栏数据根据左侧栏变更做出变化
				this.subCategoryList = categroy.subList;
				this.scrollTop = -this.scrollHeight * index;
			}
		},
		onLoad: function(e) {
			uni.showLoading({
				title: "Loading..."
			})
			setTimeout(function() {
				uni.hideLoading();
			}, 2000);
			uni.request({
				url: "http://wuhandata.applinzi.com/analysisList.php",
				method: 'GET',
				data: {},
				success: res => {
					uni.hideLoading();
					this.categoryList = res.data;
				},
				fail: (e) => {},
				complete: () => {
					if (JSON.stringify(e) != '{}') {
						this.analysisId = e.analysis_id;
						console.log(this.analysisId);
						// 设置初始化的左右侧子栏数据(默认为第一个)
						this.categoryActive = this.analysisId;
						this.subCategoryList = this.categoryList[this.analysisId].subList;
					}
				}
			});
			this.height = uni.getSystemInfoSync().windowHeight;
		}
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
