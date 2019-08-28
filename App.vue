<script>
	export default {
		onLaunch: function() {
			try {
				let versionStorage = uni.getStorageSync('version');
				let versionApp = plus.runtime.version;
				if (versionStorage != versionApp) {
					// 版本不一致，可能是版本更新
					// 更新了版本需要清除原有所有缓存
					uni.clearStorageSync();
					uni.setStorageSync('version', versionApp);
					// 初始化请求一些数据
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
	@import "./colorui/main.css";
	@import "./colorui/icon.css";

	page {
		background-color: #F8F8F8;
		height: 100%;
		font-size: 28upx;
		line-height: 1.8;
	}
</style>
