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
					<view class="list-cell" hover-class="uni-list-cell-hover" v-for="(item,key) in menu_list1" :key="key" @click="goAnalysisDetail(item)">
						<view class="list-body">
							<view class="list-text" style="font-size: 35upx">{{item.indexName}}</view>
							<view class="tag-view">
								<wd-tag :text="item.source" size="small" :circle="true"></wd-tag>
							</view>
						</view>
					</view>
				</view>
				<view v-if="menu_list1.length == 0" class="no-data">您还没有收藏任何经济分析</view>
			</swiper-item>
			<swiper-item>
				<view class="uni-list">
					<view class="list-cell" hover-class="uni-list-cell-hover" v-for="(item,key) in menu_list2" :key="key" @click="goSearchDetail(item)">
						<view class="list-body">
							<view class="list-text" style="font-size: 35upx">{{item.indexName}}</view>
							<view class="tag-view">
								<wd-tag :text="item.source" size="small" :circle="true"></wd-tag>
							</view>
						</view>
					</view>
				</view>
				<view v-if="menu_list2.length == 0" class="no-data">您还没有收藏任何指标数据</view>
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
					url: this.apiUrl + 'getCollectApp',
					method: 'POST',
					data: {
						"token": this.token,
					},
					success: (res) => {
						try {
							let dataApi = res.data;
							checkApi.isApi(dataApi);
							console.log(dataApi);
							this.menu_list1 = dataApi.data.economyData;
							this.menu_list2 = dataApi.data.indexData;
							uni.setStorageSync('collect_economy', JSON.stringify(this.menu_list1));
							uni.setStorageSync('collect_index', JSON.stringify(this.menu_list2));
						} catch (e) {
							console.log(e.errMsg);
							this.getCollectStorage();
						}
					},
					fail: (e) => {
						console.log(e.errMsg);
						this.getCollectStorage();
					},
				});
			},
			getCollectStorage() {
				try {
					let collectEconomy = uni.getStorageSync('collect_economy');
					if (collectEconomy) {
						this.menu_list1 = collectEconomy;
					}
					let collectIndex = uni.getStorageSync('collect_index');
					if (collectIndex) {
						this.menu_list2 = collectIndex;
					}
				} catch (e) {
					console.log(e.message);
				}
			},
			goAnalysisDetail(item) {
				uni.navigateTo({
					url: "../../analysis/detail/detail?indexId=" + item.indexId + "&indexName=" + item.indexName + "&source=" + item
						.source + "&isFavorite=true"
				})
			},
			goSearchDetail(item) {
				uni.navigateTo({
					url: "../../search/detail/detail?indexId=" + item.indexId + "&indexName=" + item.indexName + "&source=" + item.source +
						"&isFavorite=true"
				})
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
		max-width: 500upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.tag-view {
		margin: 20upx 40upx;
		display: inline-block;
	}
	
	.no-data {
		text-align: center;
		color: #999;
		margin: 100upx;
	}
</style>
