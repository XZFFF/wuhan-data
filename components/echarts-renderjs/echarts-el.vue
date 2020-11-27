<template>
	<view>
		<view class="echarts" :prop="option" :change:prop="echarts.delay"></view>
	</view>
</template>

<script>
	export default {
		name: 'EchartsEl',
		props: {
			option: {
				type: Object,
				required: true
			}
		}
	}
</script>

<script module="echarts" lang="renderjs">
	export default {
		data() {
			return {
				timeoutId: null,
				chart: null
			}
		},
		mounted() {
			// console.log('in mounted')
			if (typeof window.echarts === 'object') {
				// console.log('init echart')
				this.init()
			} else {
				// 动态引入类库
				const script = document.createElement('script')
				script.src = './static/echarts/echarts.js'
				script.onload = this.init
				document.head.appendChild(script)
			}
		},
		methods: {
			/**
			 * 初始化echarts
			 */
			init() {
				// 根据id初始化图表
				this.chart = echarts.init(this.$el)
				this.update(this.option)
			},
			/**
			 * 防抖函数，500毫秒内只运行最后一次的方法
			 * @param {Object} option
			 */
			delay(option) {
				if (this.timeoutId) {
					clearTimeout(this.timeoutId)
					this.timeoutId = null
				}
				this.timeoutId = setTimeout(() => {
					this.update(option)
				}, 500)
			},
			/**
			 * 监测数据更新
			 * @param {Object} option
			 */
			update(option) {
				if (this.chart) {
					// 因App端，回调函数无法从renderjs外传递，故在此自定义设置相关回调函数
					//！！！单位换算会导致部分图例出现抖动
					// if (option) {
					// 	// 单位换算
					// 	for (let j in option.yAxis) {
					// 		if (option.yAxis[j]["axisLabel"]) {
					// 			option.yAxis[j]["axisLabel"] = {
					// 				"formatter": function(value) {
					// 					let s = parseInt(value)
					// 					if (s === NaN) {
					// 						return name
					// 					} else if (s >= 10000) {
					// 						return (s / 10000).toString() + '万'
					// 					} else {
					// 						return value
					// 					}
					// 				}
					// 			}
					// 		}
					// 	}
					// }
					// 设置新的option
					this.chart.setOption(option, option.notMerge)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.echarts {
		width: 100%;
		height: 100%;
		flex: 1;
	}
</style>
