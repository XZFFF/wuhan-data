<template>
	<view>
		<!-- 标签栏 -->
		<view class="tab-bar">
			<view id="tab-bar" class="swiper-tab" scroll-x :scroll-left="scrollLeft">
				<view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :id="tab.id"
				 :data-current="index" @click="tapTab(index)">{{tab.name}}</view>
			</view>
		</view>
		<!-- 内容 -->
		<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab" style="height: 2000upx;">
			<swiper-item>
				<view class="uni-list">
					<view class="list-cell" hover-class="uni-list-cell-hover" v-for="(item,key) in menu_list1" :key="key" @click="goDetailPage(item)">
						<view class="list-body">
							<view class="list-text" style="font-size: 35upx">{{item.indexName}}</view>
							<view class="tag-view">
								<wd-tag :text="item.source" size="small" :circle="true"></wd-tag>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="uni-list">
					<view class="list-cell" hover-class="uni-list-cell-hover" v-for="(item,key) in menu_list2" :key="key" @click="goDetailPage(item)">
						<view class="list-body">
							<view class="list-text" style="font-size: 35upx">{{item.indexName}}</view>
							<view class="tag-view">
								<wd-tag :text="item.source" size="small" :circle="true"></wd-tag>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import wdTag from '@/components/wd-tag/wd-tag.vue';
	import checkApi from '@/common/checkApi.js';
	import getCollectApiJson from "@/common/api/getCollect.json";

	export default {
		components: {
			wdTag,
		},
		data() {
			return {
				token: "",
				scrollLeft: 0,
				isClickChange: false,
				tabIndex: 0,
				tabBars: [{
					name: '经济分析',
				}, {
					name: '指标数据',
				}],
				menu_list1: [],
				menu_list2: []
			}
		},
		onShow: function() {
			if (checkApi.checkToken()) {
				this.token = uni.getStorageSync('token');
			} else {
				uni.showToast({
					icon: 'none',
					title: "您还没有登录，请先登录",
					duration: 1000,
				});
				setTimeout(function() {
					uni.switchTab({
						url: "../../tabbar/mine/mine"
					});
				}, 1000);
			}
			this.initCollect();
		},
		methods: {
			initCollect() {
				checkApi.checkNetwork();
				uni.request({
					url: 'http://www.baidu.com',
					method: 'POST',
					data: {
						"token": this.token,
					},
					success: (res) => {
						try {
							let dataApi = getCollectApiJson;
							checkApi.isApi(dataApi);
							this.menu_list1 = dataApi.data.economyData;
							this.menu_list2 = dataApi.data.indexData;
							uni.setStorageSync('footprint_economy', JSON.stringify(this.menu_list1));
							uni.setStorageSync('footprint_index', JSON.stringify(this.menu_list2));
						} catch (e) {
							console.log(e.errMsg);
							this.getFootprintStorage();
						}
					},
					fail: (e) => {
						console.log(e.errMsg);
						this.getFootprintStorage();
					},
				});
			},
			getFootprintStorage() {
				try {
					let footprintEconomy = uni.getStorageSync('footprint_economy');
					if (footprintEconomy) {
						this.menu_list1 = footprintEconomy;
					}
					let footprintIndex = uni.getStorageSync('footprint_index');
					if (footprintIndex) {
						this.menu_list2 = footprintIndex;
					}
				} catch (e) {
					console.log(e.message);
				}
			},
			async changeTab(e) {
				let index = e.detail.current;
				if (this.isClickChange) {
					this.tabIndex = index;
					this.isClickChange = false;
					return;
				}
				let tabBar = await this.getElSize("tab-bar"),
					tabBarScrollLeft = tabBar.scrollLeft;

				this.isClickChange = false;
				this.tabIndex = index; //一旦访问data就会出问题
			},
			getElSize(id) { //得到元素的size
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select('#' + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
				});
			},
			async tapTab(index) { //点击tab-bar
				if (this.tabIndex === index) {
					return false;
				} else {
					let tabBar = await this.getElSize("tab-bar"),
						tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
					this.scrollLeft = tabBarScrollLeft;
					this.isClickChange = true;
					this.tabIndex = index;
				}
			},
		}
	}
</script>

<style>
	.swiper-tab {
		width: 100%;
		height: 100upx;
		background-color: #3A82CC;
		border-bottom: 1px solid rgb(229, 229, 229);
	}

	.swiper-tab-list {
		margin-top: 25upx;
		width: 50%;
		height: 70upx;
		font-size: 32upx;
		color: #FFFFFF;
	}

	.active {
		border-bottom: 2px solid #FFFFFF;
	}

	.list-cell {
		border-bottom: 2upx solid rgb(229, 229, 229);
	}

	.list-body {
		height: 80upx;
		display: inline-flex;
	}

	.list-text {
		margin-left: 50upx;
		margin-top: 15upx;
	}

	.tag-view {
		margin: 20upx 40upx;
		display: inline-block;
	}
</style>
