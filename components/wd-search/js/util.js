const util = {
	/**
	 * 关键字颜色变化
	 */
	serachNmme(val, name) {
		let namestr = new RegExp(val);
		let nameresult =
			`<div style="font-size: 16px;color: #333;line-height: 1.5;">
		    ${name.replace(namestr, "<span style='color:#66ccff;'>" + val + '</span>')}
		    </div>`
			.trim();

		return nameresult;
	},
	/**
	 * 数据处理
	 */
	dataHandleItem(item, val) {
		// 改变字体颜色
		if (val) {
			item.nameNodes = util.serachNmme(val, item.name);
		} else {
			item.nameNodes = `<div style="font-size: 16px;color: #333;line-height: 1.5;">${item.name}</div>`;
		}
		return item;
	},

	dataHandle(dataObj, val) {
		//console.log(dataObj);
		for (var i = 0; i < dataObj.length; i++) {
			let item = dataObj[i];
			dataObj[i] = util.dataHandleItem(item, val);
		}
		return dataObj;
	},
	/**
	 * 存储历史数据
	 * val [string | object]需要存储的内容
	 */
	setHistory(id, name, source, isArea) {
		let searchHistory = uni.getStorageSync('search_history');
		if (!searchHistory) searchHistory = [];
		let serachData = {};
		serachData = {
			id: id,
			name: name,
			source: source,
			isArea: isArea
		};

		// 判断数组是否存在，如果存在，那么将放到最前面
		for (var i = 0; i < searchHistory.length; i++) {
			if (searchHistory[i].name === serachData.name) {
				searchHistory.splice(i, 1);
				break;
			}
		}

		searchHistory.unshift(util.dataHandle(serachData));
		uni.setStorage({
			key: 'search_history',
			data: searchHistory,
			success: function() {
				console.log('success');
			}
		});
	},
	getHistory() {

	},
	removeHistory() {
		uni.removeStorage({
			key: 'search_history',
			success: function(res) {
				console.log('success');
			}
		});
		return []
	}

}

export default util;
