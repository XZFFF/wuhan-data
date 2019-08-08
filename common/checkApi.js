module.exports = {
	error: '',
	apiUrl: 'http://59.208.244.108:8080/wuhan-data-panel/',
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
				if (apiData.errCode == -2 || apiData.errCode == '-2') {
					uni.showToast({
						title: apiData.errMsg,
						duration: 1000,
						icon: 'none'
					});
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
					if (tableParam < 6) {
						h = (tableParam + 1) * 60;
					} else {
						h = 450;
					}
				} else if (item.classType == 'echarts') {
					if (typeof item.classHeight === 'string') {
						h = parseInt(item.classHeight); // 允许设置
						console.log("版块" + i + "高度" + h);
					} else {
						console.log("版块" + i + "未设置高度");
						h = 400;
					}
				} else if (item.classType == 'card') {
					h = 180;
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
			url: this.apiUrl + 'setTrackApp',
			method: 'POST',
			data: {
				"token": token,
				"type": typeName,
				"indexId": indexId,
				"indexName": indexName,
				"source": source
			},
			success: (res) => {
				console.log(JSON.stringify(res.data));
				return true;
			},
			fail(e) {
				console.log(JSON.stringify(e));
				return false;
			}
		});
		return true;
	},
	setCollect: function(type, indexId, indexName, source) {
		// 检查token令牌是否存在
		let token = uni.getStorageSync('token');
		if (!token) {
			uni.showToast({
				title: "请先登录",
				icon: "none",
				duration: 1000,
			});
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
		console.log(token + typeName + indexId + indexName + source);
		uni.request({
			url: this.apiUrl + 'setCollectApp',
			method: 'POST',
			data: {
				"token": token,
				"type": typeName,
				"indexId": indexId,
				"indexName": indexName,
				"source": source
			},
			success: (res) => {
				console.log(JSON.stringify(res.data));
				uni.showToast({
					title: "收藏成功",
					icon: "none",
					duration: 1000,
				});
				return true;
			},
			fail(e) {
				console.log(JSON.stringify(e));
				uni.showToast({
					title: "收藏失败",
					icon: "none",
					duration: 1000,
				});
				return false;
			}
		});
		return true;
	},
	delCollect: function(type, indexId) {
		// 检查token令牌是否存在
		let token = uni.getStorageSync('token');
		if (!token) {
			uni.showToast({
				title: "请先登录",
				icon: "none",
				duration: 1000,
			});
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
		console.log(token + typeName + indexId);
		uni.request({
			url: this.apiUrl + 'delCollectApp',
			method: 'POST',
			data: {
				"token": token,
				"type": typeName,
				"indexId": indexId
			},
			success: (res) => {
				console.log(JSON.stringify(res));
				uni.showToast({
					title: "已取消收藏",
					icon: "none",
					duration: 1000,
				});
				return true;
			},
			fail(e) {
				console.log(JSON.stringify(e));
				uni.showToast({
					title: "取消收藏失败",
					icon: "none",
					duration: 1000,
				});
				return false;
			}
		});
		return true;
	}
}
