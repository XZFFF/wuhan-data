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

		},
		onShow: function() {},
		onHide: function() {},
		methods: {}
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
