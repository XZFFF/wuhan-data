<script>
	import request from '@/components/request/index.js';
	export default {
		onLaunch: function() {
			try {
				let isFirst = uni.getStorageSync('isFirst');
				if (isFirst != 1) {
					this.callback1(1);
					this.callback2(1);
					uni.setStorageSync('isFirst', 1);
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
				let r = request.get({
					url: this.apiUrl + 'topic' + topicId,
					success: res => {
						uni.showToast({
							title: '专题' + topicId + '加载成功',
							icon: 'none'
						});
						console.log(JSON.stringify(res.data));
						let dataApi = res.data;
						let topic_detail_key = 'topic_detail' + topicId;
						uni.setStorageSync(topic_detail_key, dataApi);
					},
					fail: err => {
						uni.showToast({
							title: '专题' + topicId + '加载失败',
							icon: 'none'
						});
						console.log(JSON.stringify(err));
					},
					complete: res => {
						if (topicId < 4) {
							this.sleep(1000);
							this.callback1(topicId + 1)
						}
					}
				});
				// request.stop(r);
			},
			callback2(analysisId) {
				let r = request.post({
					url: this.apiUrl + 'getAnalysisDetail',
					header: {
						"content-type": "application/json"
					},
					data: {
						indexId: analysisId,
					},
					success: res => {
						uni.showToast({
							title: '栏目' + analysisId + '加载成功',
							icon: 'none'
						});
						console.log(JSON.stringify(res.data));
						let dataApi = res.data;
						let analysis_detail_key = 'analysis_detail' + analysisId;
						uni.setStorageSync(analysis_detail_key, dataApi);
					},
					fail: err => {
						uni.showToast({
							title: '栏目' + analysisId + '加载失败',
							icon: 'none'
						});
						console.log(JSON.stringify(err));
					},
					complete: res => {
						if (analysisId < 10) {
							this.sleep(1000);
							this.callback2(analysisId + 1)
						}
					}
				});
				// request.stop(r);
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
