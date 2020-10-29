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
				script.src = './static/echarts/echarts.min.js'
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
					if (option) {
						// 单位换算
						for (let j in option.yAxis) {
							if (option.yAxis[j]["axisLabel"]) {
								option.yAxis[j]["axisLabel"] = {
									"formatter": function(value) {
										let s = parseInt(value)
										if (s === NaN) {
											return name
										} else if (s >= 10000) {
											return (s / 10000).toString() + '万'
										} else {
											return value
										}
									}
								}
							}
						}
						// tooltip
						if (option.tooltip) {
							// 判断是否设置tooltip的位置
							if (option.tooltip.positionStatus) {
								option.tooltip.position = this.tooltipPosition()
							}
							// 判断是否格式化tooltip
							if (option.tooltip.formatterStatus) {
								option.tooltip.formatter = this.tooltipFormatter(option.tooltip.formatterUnit, option.tooltip.formatFloat2,
									option.tooltip.formatThousands, option.tooltip.unitConversion)
							}
						}
						// 颜色渐变
						if (option.series) {
							for (let i in option.series) {
								let linearGradient = option.series[i].linearGradient
								if (linearGradient) {
									option.series[i].color = new echarts.graphic.LinearGradient(linearGradient[0], linearGradient[1],
										linearGradient[2], linearGradient[3], linearGradient[4])
								}
							}
						}
					}
					// 设置新的option
					this.chart.setOption(option, option.notMerge)
				}
			},
			/**
			 * 设置tooltip的位置，防止超出画布
			 */
			tooltipPosition() {
				return (point, params, dom, rect, size) => {
					// 其中point为当前鼠标的位置，size中有两个属性：viewSize和contentSize，分别为外层div和tooltip提示框的大小
					let x = point[0]
					let y = point[1]
					let viewWidth = size.viewSize[0]
					let viewHeight = size.viewSize[1]
					let boxWidth = size.contentSize[0]
					let boxHeight = size.contentSize[1]
					let posX = 0 // x坐标位置
					let posY = 0 // y坐标位置
					if (x >= boxWidth) { // 左边放的下
						posX = x - boxWidth - 1
					}
					if (y >= boxHeight) { // 上边放的下
						posY = y - boxHeight - 1
					}
					return [posX, posY]
				}
			},
			/**
			 * tooltip格式化
			 * @param {Object} unit 数值后的单位
			 * @param {Object} formatFloat2 是否保留两位小数
			 * @param {Object} formatThousands 是否添加千分位
			 * @param {Object} unitConversion 是否换算单位 
			 */
			tooltipFormatter(unit, formatFloat2, formatThousands, unitConversion) {
				return params => {
					let result = ''
					unit = unit ? unit : ''
					for (let i in params) {
						if (i == 0) {
							result += params[i].axisValueLabel
						}
						let value = '--'
						if (params[i].data !== null) {
							value = params[i].data
							// 保留两位小数
							if (formatFloat2) {
								value = this.formatFloat2(value)
							}
							// 添加千分位
							if (formatThousands) {
								value = this.formatThousands(value)
							}
							// 换算单位
							if (unitConversion) {
								value = this.unitConversion(value)
							}
						}
						// #ifdef H5
						result += '\n' + params[i].seriesName + '：' + value + ' ' + unit
						// #endif

						// #ifdef APP-PLUS
						result += '<br/>' + params[i].marker + params[i].seriesName + '：' + value + ' ' + unit
						// #endif
					}
					return result
				}
			},
			/**
			 * 保留两位小数
			 * @param {Object} value
			 */
			formatFloat2(value) {
				let temp = Math.round(parseFloat(value) * 100) / 100
				let xsd = temp.toString().split('.')
				if (xsd.length === 1) {
					temp = (isNaN(temp) ? '0' : temp.toString()) + '.00'
					return temp
				}
				if (xsd.length > 1) {
					if (xsd[1].length < 2) {
						temp = temp.toString() + '0'
					}
					return temp
				}
			},
			/**
			 * 添加千分位
			 * @param {Object} value
			 */
			formatThousands(value) {
				if (value === undefined || value === null) {
					value = ''
				}
				if (!isNaN(value)) {
					value = value + ''
				}
				let re = /\d{1,3}(?=(\d{3})+$)/g
				let n1 = value.replace(/^(\d+)((\.\d+)?)$/, function(s, s1, s2) {
					return s1.replace(re, '$&,') + s2
				})
				return n1
			},
			/**
			 * 单位换算，如将10000000表示成1000万
			 * @param {Object} value 
			 */
			unitConversion(value) {
				let newvalue = ['', '', '']
				let fr = 1000
				const ad = 1
				let num = 3
				const fm = 1
				//求传入值的位数
				while (value / fr >= 1) {
					fr *= 10
					num += 1
				}
				if (num <= 4) {
					newvalue[1] = '千'
					newvalue[0] = parseInt(value / 1000) + ''
				} else if (num <= 8) {
					const u = parseInt(num - 4) / 3 > 1 ? '千万' : '万'
					const fm = '万' === u ? 10000 : 10000000
					newvalue[1] = u
					newvalue[0] = (value / fm) + ''
				} else if (num <= 16) {
					let u = (num - 8) / 3 > 1 ? '千亿' : '亿'
					u = (num - 8) / 4 > 1 ? '万亿' : u
					u = (num - 8) / 7 > 1 ? '千万亿' : u
					let fm = 1
					if ('亿' === u) {
						fm = 100000000
					} else if ('千亿' == u) {
						fm = 100000000000
					} else if ('万亿' === u) {
						fm = 1000000000000
					} else if ('千万亿' === u) {
						fm = 1000000000000000
					}
					newvalue[1] = u
					newvalue[0] = parseInt(value / fm) + ''
				}
				if (value < 1000) {
					newvalue[1] = ''
					newvalue[0] = value + ''
				}
				return newvalue.join('')
			}
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
