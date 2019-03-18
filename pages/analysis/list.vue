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
				<view :id="index===0?'first':''" class="nav-right-item" v-for="(item,index) in subCategoryList" :key="index">
					<!-- TODO 完善指标卡片样式 -->
					<view style="background: #007AFF; width: 20upx; height: 100%;"></view>
					<view style="position: relative; margin: 20upx 10upx; width: 30%; max-width: 30%;">
						<text style="font-size: 12px; position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); width: 100%; line-height: 1; word-wrap: break-word; overflow:auto;">{{item.name}}</text>
					</view>
					<view style="display: flex; flex-direction: column; margin: 20upx 10upx; max-width: 40%;">
						<view style="display: flex; flex: 1;align-items: center;">
							<text>{{item.item.name}}:{{item.item.num}} {{item.item.unit}}</text>
						</view>
						<view style="display: flex; flex: 1;align-items: center;">
							<text>{{item.item.name}}:{{item.item.num}} {{item.item.unit}}</text>
						</view>
					</view>

					<view style="margin: auto 0; width: 5upx; height: 80%; background: #00B26A;"></view>

					<view style="margin: auto;">
						<image style="width: 50upx; height: 50upx;" src="../../static/icon/favorite-orgin.png"></image>
					</view>

				</view>
				<page-foot :name="name" v-if="subCategoryList.length > 1"></page-foot>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			let categoryList = [{
					name: "综合",
					subCategoryList: [{
							// 这里要用js截断
							name: "社会消费品总产值",
							item: {
								name: '当期',
								num: '110',
								unit: '亿元'
							}
						},
						{
							name: "GDP",
							item: {
								name: '当期',
								num: '110',
								unit: '亿元'
							}
						}
					]
				},
				{
					name: "工业",
					subCategoryList: []
				},
				{
					name: "农业",
					subCategoryList: []
				},
				{
					name: "服务业",
					subCategoryList: []
				},
				{
					name: "消费",
					subCategoryList: []
				},
				{
					name: "投资",
					subCategoryList: []
				},
				{
					name: "对外开放",
					subCategoryList: []
				},
				{
					name: "新经济",
					subCategoryList: []
				},
				{
					name: "绿色发展",
					subCategoryList: []
				}
			];

			return {
				categoryList: categoryList,
				subCategoryList: [],
				height: 0,
				categoryActive: 0,
				scrollTop: 0,
				scrollHeight: 0
			};
		},
		methods: {
			scroll(e) {
				this.scrollHeight = e.detail.scrollHeight;
			},
			categoryClickMain(categroy, index) {
				this.categoryActive = index;
				// 右侧栏数据根据左侧栏变更做出变化
				this.subCategoryList = categroy.subCategoryList;
				this.scrollTop = -this.scrollHeight * index;
			}
		},
		onLoad: function() {
			this.height = uni.getSystemInfoSync().windowHeight;
			// 设置初始化的右侧子栏数据(默认为第一个)
			this.subCategoryList = this.categoryList[0].subCategoryList;
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
		width: 30%;
	}

	.nav-left-item {
		height: 100upx;
		border-right: solid 1px #E0E0E0;
		border-bottom: solid 1px #E0E0E0;
		font-size: 30upx;
		display: flex;
		align-items: center;
	}

	.active {
		color: #7DACF0;
	}

	.orgin-block {
		width: 5upx;
		background-color: #F8F8F8;
		height: 100%;
	}

	.active-block {
		background-color: #7DACF0;
	}


	.nav-right {
		width: 70%;
	}

	/* 侧边分类右侧样式 */
	.nav-right-item {
		display: flex;
		width: 80%;
		height: 120upx;
		margin: 40upx auto;
		background: #F0AD4E;
		/* float: left; */
		/* text-align: center; */
		/* padding: 10upx; */
		/* font-size: 28upx; */
	}

	.nav-right-item image {
		width: 100upx;
		height: 100upx;
	}
</style>
