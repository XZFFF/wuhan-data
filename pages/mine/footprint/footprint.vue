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
			try {
				const footprintEconomy = uni.getStorageSync('footprint_economy');
				if (footprintEconomy) {
					this.menu_list1 = footprintEconomy
				} else {
					this.initFootprintEconomy();
				}
				const footprintIndex = uni.getStorageSync('footprint_index');
				if (footprintIndex) {
					this.menu_list2 = footprintIndex
				} else {
					this.initFootprintEconomy();
				}
			} catch (e) {
				console.log('无法从本地缓存获取相应数据');
			}
			this.checkNetwork();
			this.initFootprintEconomy();
		},
		methods: {
			/*async tapTab(e) { //点击tab-bar
				var that = this;
			    if (this.tabIndex === e.target.dataset.current) {
			        return false;
			    } else {
			        that.tabIndex = e.target.dataset.current   
			    }
			}*/
			checkNetwork() {
				uni.getNetworkType({
					success: function(res) {
						console.log(res.networkType);
						if (res.networkType == 'none') {
							console.log('network:' + res.networkType);
							uni.showToast({
								title: '无网络连接',
								duration: 1000,
								icon: 'loading'
							});
						}
					}
				});
			},
			initFootprintEconomy() {
				const userID = uni.getStorageSync('user_id');
				uni.request({
					url: 'http://192.168.124.5/FootprintEconomy.php',
					method: 'GET',
					data: {
						"id": userID,
					},
					success: res => {
						let list=JSON.stringify(res.data);
						console.log("返回数据状态:" + list);
						this.menu_list1 = res.data.economyData;
						this.menu_list2 = res.data.indexData;
						uni.setStorageSync({
							key: 'footprint_economy',
							data: this.menu_list1,
							success: function() {
								console.log('成功请求经济分析足迹数据并存入本地缓存');
							}
						});
						uni.setStorageSync({
							key: 'footprint_index',
							data: this.menu_list2,
							success: function() {
								console.log('成功请求指标数据足迹数据并存入本地缓存');
							}
						});
					},
					fail: (e) => {
						uni.showModal({
							title: "网络错误,请稍后重试",
							icon: none,
						})
					},
				});
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
	.uni-list{
		
	}
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
		padding: 0 30upx;
		min-width: 0;
		height: 45upx;
		border-radius: 20px; 
		background-color: #1A82D2;
		font-size: 25upx;
		color: #FFFFFF;
		text-align: center;
	}
</style>
