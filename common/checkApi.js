module.exports = {
	error: '',
	isApi: function(apiData) {
		if (apiData && apiData.errCode) {
			if (apiData.errCode != 0 || apiData.errCode != '0') {
				// TODO 记录到服务端日志表中
				// 提示api获取错误
				uni.showToast({
					icon: 'none',
					title: apiData.errMsg,
					duration: 500
				});
				return false;
			}
			return true;
		}
	},
	isJSON: function(str) {
		if (typeof str == 'string') {
			try {
				var obj = JSON.parse(str);
				if (typeof obj == 'object' && obj) {
					return true;
				} else {
					return false;
				}
			} catch (e) {
				console.log('error：' + str + '!!!' + e);
				return false;
			}
		}
	},
	isNumber: function(checkVal) {
		var reg = /^-?[1-9][0-9]?.?[0-9]*$/;
		return reg.test(checkVal);
	}
}
