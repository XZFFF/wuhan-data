<template>
	<view class="container">
		<view class="page-body">
			<scroll-view class="nav-left" scroll-y :style="'height:'+height+'px'">
				<view class="nav-left-item" @click="categoryClickMain(item,index)" :key="index" :class="index==categoryActive?'active':''"
				    v-for="(item,index) in categoryList">
					<!-- TODO 左侧加一个可变化颜色的active块 -->
					{{item.name}}
				</view>
			</scroll-view>
			<scroll-view class="nav-right" scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+height+'px'" scroll-with-animation>
				<view :id="index===0?'first':''" class="nav-right-item" v-for="(item,index) in subCategoryList" :key="index">
					<!-- TODO 完善指标卡片样式 -->
					<view>名称:{{item.name}} 增量:{{item.total}} 累积量:{{item.increase}}</view>
				</view>
				<page-foot :name="name" v-if="subCategoryList.length > 1"></page-foot>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			let categoryList = [
				{name:"综合",subCategoryList:[{name:"GDP",increase:"7.0%",total:"110亿元"}]},
				{name:"工业",subCategoryList:[]},
				{name:"农业",subCategoryList:[]},
				{name:"服务业",subCategoryList:[]},
				{name:"消费",subCategoryList:[]},
				{name:"投资",subCategoryList:[]},
				{name:"对外开放",subCategoryList:[]},
				{name:"新经济",subCategoryList:[]},
				{name:"绿色发展",subCategoryList:[]}
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
		onLoad: function () {
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
		justify-content: center;
	}

	.nav-right {
		width: 70%;
	}

	/* 侧边分类右侧样式 */
	.nav-right-item {
		width: 80%;
		height: 140upx;
		float: left;
		text-align: center;
		padding: 10upx;
		font-size: 28upx;
	}

	.nav-right-item image {
		width: 100upx;
		height: 100upx;
	}

	.active {
		color: #1A82D2;
	}
</style>
