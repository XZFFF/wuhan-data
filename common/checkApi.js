module.exports = {
	error: '',
	isApi: function(apiData) {
		try {
			if (apiData && apiData.errMsg) {
				if (apiData.errMsg == "token令牌错误") {
					uni.removeStorageSync('token');
					console.log(this.checkToken());
					return false;
				}
			}
			if (apiData && apiData.errCode) {
				if (apiData.errCode != 0 || apiData.errCode != '0') {
					// TODO 记录到服务端日志表中
					console.log(JSON.stringify(apiData));
					return false;
				}
			}
			return true;
		} catch (e) {
			console.log(JSON.stringify(apiData));
			return false;
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
	},
	checkNetwork: function() {
		uni.getNetworkType({
			success: function(res) {
				if (res.networkType == 'none') {
					uni.showToast({
						title: '无网络连接',
						duration: 1000,
						icon: 'loading'
					});
					return false;
				} else {
					return true;
				}
			}
		});
		return false;
	},
	checkToken: function() {
		// 检查token令牌是否存在
		let token = uni.getStorageSync('token');
		if (!token) {
			// 提示登录状态过期
			// uni.showToast({
			// 	icon: 'none',
			// 	title: "登录已过期",
			// 	duration: 500
			// });
			return false;
		}
		return true;
	},
	calClassInfoHeight: function(classInfo) {
		let classHeight = 0;
		try {
			for (let i = 0; i < classInfo.length; i++) {
				let item = classInfo[i];
				let h = 0;
				if (item.classType == 'table') {
					let tableParam = item.tableBody[0].length;
					h = (tableParam + 1) * 40;
				} else if (item.classType == 'echarts') {
					if (typeof item.classHeight === 'string') {
						//h = parseInt(item.classHeight); // 不允许设置
						h = 400;
					}
				} else if (item.classType == 'card') {
					h = 200;
				}
				classHeight += h;
			}
		} catch (e) {
			console.log(e.message);
		}
		return classHeight;
	},
	setFootprint: function(type, indexId, indexName, source) {
		// 检查token令牌是否存在
		let token = uni.getStorageSync('token');
		if (!token) {
			return false;
		}
		let typeName = '';
		if (type == 'analysis') {
			typeName = "经济分析";
		} else if (type == 'search') {
			typeName = "指标数据";
		} else {
			typeName = "未知类型";
		}
		uni.request({
			url: 'http://www.baidu.com',
			method: 'POST',
			data: {
				"token": token,
				"type": typeName,
				"indexId": indexId,
				"indexName": indexName,
				"source": source
			},
			success: (res) => {
				return true;
			},
			fail(e) {
				return false;
			}
		});
		return true;
	}
}
