<script>
	export default {
		onLaunch: function() {
			try {
				let versionStorage = uni.getStorageSync('version');
				let versionApp = plus.runtime.version;
				if (versionStorage != versionApp) {
					uni.showToast({
						title: '检测到版本更新，正在初始化数据',
						icon: 'none',
						duration: 2000
					});
					// 版本不一致，可能是版本更新
					// 更新了版本需要清除原有所有缓存
					uni.clearStorageSync();
					uni.setStorageSync('version', versionApp);
					// 初始化请求一些数据
					this.callback1(1);
					this.callback2(1);
				}
			} catch (e) {
				console.log(JSON.stringify(e));
			}

			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show');
			// this.checkStorage();
			//var args = plus.runtime.arguments;
			//if (args) {
			// console.log(args);
			// let argsJson = JSON.parse(args);
			// let argsJson = {
			// 	"name": "analysis-detail",
			// 	"pathName": "pages/analysis/detail/detail",
			// 	"query": "indexId=1001&indexName=GDP"
			// };
			// let navigateUrl = "/" + argsJson.pathName + "?" + argsJson.query;
			// console.log(navigateUrl);
			// // 处理args参数，如直达到某新页面等
			// setTimeout(function() {
			// 	uni.reLaunch({
			// 		url: navigateUrl,
			// 		success(res) {
			// 			console.log('success jump');
			// 		},
			// 		fail(e) {
			// 			console.log('fail jump');
			// 		}
			// 	});
			// }, 1000);
			//}
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			callback1(topicId) {
				uni.request({
					url: this.apiUrl + 'topic' + topicId,
					// url: 'https://www.baidu.com',
					method: 'POST',
					data: {},
					success: (res) => {
						// uni.showToast({
						// 	title: '专题' + topicId + '加载成功',
						// 	icon: 'none'
						// });
						console.log(JSON.stringify(res.data));
						let dataApi = res.data;
						let topic_detail_key = 'topic_detail' + topicId;
						uni.setStorageSync(topic_detail_key, dataApi);
					},
					fail: err => {
						// uni.showToast({
						// 	title: '专题' + topicId + '加载失败',
						// 	icon: 'none'
						// });
						console.log(JSON.stringify(err));
					},
					complete: res => {
						if (topicId < 4) {
							this.sleep(1000);
							this.callback1(topicId + 1)
						}
					}
				});
			},
			callback2(analysisId) {
				uni.request({
					url: this.apiUrl + 'getAnalysisDetail',
					// url: 'https://www.baidu.com',
					method: 'POST',
					data: {
						indexId: analysisId,
					},
					success: res => {
						// uni.showToast({
						// 	title: '栏目' + analysisId + '加载成功',
						// 	icon: 'none'
						// });
						console.log(JSON.stringify(res.data));
						let dataApi = res.data;
						let analysis_detail_key = 'analysis_detail' + analysisId;
						uni.setStorageSync(analysis_detail_key, dataApi);
					},
					fail: err => {
						// uni.showToast({
						// 	title: '栏目' + analysisId + '加载失败',
						// 	icon: 'none'
						// });
						console.log(JSON.stringify(err));
					},
					complete: res => {
						if (analysisId < 200) {
							this.sleep(1000);
							this.callback2(analysisId + 1)
						}
					}
				});
			},

			sleep(numberMillis) {
				var now = new Date();
				var exitTime = now.getTime() + numberMillis;
				while (true) {
					now = new Date();
					if (now.getTime() > exitTime)
						return;
				}
			},
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/uni.css';

	page {
		background-color: #F8F8F8;
		height: 100%;
		font-size: 28upx;
		line-height: 1.8;
	}
</style>
