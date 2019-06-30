<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show');
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
