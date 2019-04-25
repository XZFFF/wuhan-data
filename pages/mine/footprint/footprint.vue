<template>
	<view>
		<!-- 标签栏 -->
		<view class="tab-bar">
			<view class="swiper-tab">
				<view v-for="(tab,index) in tabBars" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :data-current="index" @click="tapTab">
					{{tab.name}}
				</view>
			</view>
		</view>
		<!-- 内容 -->
		<swiper :current="tabIndex" class="swiper-box" duration="300">
			<swiper-item>
				<view class="uni-list">
					<view class="list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in menu_list1" :key="key" @click="goDetailPage(value)">
						<view class="list-body">
							<view class="list-text" style="font-size: 35upx">{{value.title}}</view>
							<view class="list-label">{{value.label}}</view>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="uni-list">
					<view class="list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in menu_list2" :key="key" @click="goDetailPage(value)">
						<view class="list-body">
							<view class="list-text" style="font-size: 35upx">{{value.title}}</view>
							<view class="list-label">{{value.label}}</view>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'list',
				isClickChange: false,
				tabIndex: 0,
				tabBars: [{
					name: '经济分析',
				}, {
					name: '指标数据',
				}],
				menu_list1: [
					 {
					title: "GDP",
					label: "综合"
				},{
					title: "工业用电总量",
					label: "工业"
				},],
				menu_list2: [
					 {
					title: "GDP",
					label: "综合"
				},{
					title: "工业用电总量",
					label: "工业"
				},]
			}
		},
		methods: {
			async tapTab(e) { //点击tab-bar
				var that = this;
			    if (this.tabIndex === e.target.dataset.current) {
			        return false;
			    } else {
			        that.tabIndex = e.target.dataset.current   
			    }
			}
		}
	}
</script>

<style>
	.swiper-tab{
		width: 100%;
		height: 100upx;
		background-color: #3A82CC;
		border-bottom: 1px solid rgb(229,229,229);
	}
	.swiper-tab-list{
		margin-top: 25upx;
		width: 50%;
		height: 70upx;
		font-size: 32upx;
		color: #FFFFFF;
	}
	.active{
		border-bottom: 2px solid #FFFFFF;
	}
	.list-cell{
		border-bottom: 2upx solid rgb(229,229,229);	
	}
	.list-body{
		height: 80upx;
		display: inline-flex;
	}
	.list-text{
		margin-left: 50upx;
		margin-top: 15upx;
	}
	.list-label{
		margin-left: 40upx;
		margin-top: 20upx;
		width: 100upx;
		height: 45upx;
		border-radius: 20px; 
		background-color: #1A82D2;
		font-size: 25upx;
		color: #FFFFFF;
		text-align: center;
	}
</style>
