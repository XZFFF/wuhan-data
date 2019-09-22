<template>
	<view class="uni-tag" v-if="text" :class="[disabled === true || disabled === 'true' ? 'uni-tag--disabled' : '',inverted === true || inverted === 'true' ? 'uni-tag--inverted' : '',circle === true || circle === 'true' ? 'uni-tag--circle' : '',mark === true || mark === 'true' ? 'uni-tag--mark' : '','uni-tag--'+size,'uni-tag--'+sourceType]"
	 @click="onClick()">{{text}}</view>
</template>

<script>
	export default {
		name: 'wd-tag',
		props: {
			type: {
				// 默认支持 default、primary、success、warning、danger、royal
				// 支持 zonghe/gongye/nongye/fuwuye/xiaofei
				// 支持 touzi/duiwaikaifang/xinjingji/lvsefazhan/minsheng
				// 支持 guotong/hutong/dashuju
				// 支持 time
				type: String,
				default: 'default'
			},
			size: { //标签大小 normal, small
				type: String,
				default: 'normal'
			},
			text: String, //标签内容
			disabled: { //是否为禁用状态
				type: [String, Boolean],
				defalut: false
			},
			inverted: { //是否为空心
				type: [String, Boolean],
				defalut: false
			},
			circle: { //是否为圆角样式
				type: [String, Boolean],
				defalut: false
			},
			mark: { //是否为标记样式
				type: [String, Boolean],
				defalut: false
			},
		},
		computed: {
			sourceType: function() {
				let sourceTypeName = 'default';
				switch (this.text) {
					case '综合':
						sourceTypeName = 'zonghe';
						break;
					case '工业':
						sourceTypeName = 'gongye';
						break;
					case '农业':
						sourceTypeName = 'nongye';
						break;
					case '服务业':
						sourceTypeName = 'fuwuye';
						break;
					case '消费':
						sourceTypeName = 'xiaofei';
						break;
					case '投资':
						sourceTypeName = 'touzi';
						break;
					case '对外开放':
						sourceTypeName = 'duiwaikaifang';
						break;
					case '新经济':
						sourceTypeName = 'xinjingji';
						break;
					case '绿色发展':
						sourceTypeName = 'lvsefazhan';
						break;
					case '民生':
						sourceTypeName = 'minsheng';
						break;
					case '国统':
						sourceTypeName = 'guotong';
						break;
					case '湖统':
						sourceTypeName = 'hutong';
						break;
					case '大数据':
						sourceTypeName = 'dashuju';
						break;
					default:
						sourceTypeName = 'default';
						break;
				}
				return sourceTypeName;
			}
		},
		methods: {
			onClick() {
				if (this.disabled === true || this.disabled === 'true') {
					return;
				}
				this.$emit('click')
			}
		}
	}
</script>

<style>
	@charset "UTF-8";

	.uni-tag {
		box-sizing: border-box;
		padding: 0 32upx;
		height: 60upx;
		line-height: calc(60upx - 2px);
		font-size: 28upx;
		display: inline-block;
		color: #333;
		border-radius: 6upx;
		background-color: #f8f8f8;
		border: 1px solid #f8f8f8
	}

	.uni-tag--circle {
		border-radius: 30upx
	}

	.uni-tag--mark {
		border-radius: 0 30upx 30upx 0
	}

	.uni-tag--disabled {
		opacity: .5
	}

	.uni-tag--small {
		height: 40upx;
		padding: 0 16upx;
		line-height: calc(40upx - 2px);
		font-size: 24upx
	}
	
	.uni-tag--default {
		color: #fff;
		background-color: #9c26b0;
		border: 1px solid #9c26b0
	}

	.uni-tag--primary {
		color: #fff;
		background-color: #007aff;
		border: 1px solid #007aff
	}

	.uni-tag--primary.uni-tag--inverted {
		color: #007aff;
		background-color: #fff;
		border: 1px solid #007aff
	}

	.uni-tag--success {
		color: #fff;
		background-color: #4cd964;
		border: 1px solid #4cd964
	}

	.uni-tag--success.uni-tag--inverted {
		color: #4cd964;
		background-color: #fff;
		border: 1px solid #4cd964
	}

	.uni-tag--warning {
		color: #fff;
		background-color: #f0ad4e;
		border: 1px solid #f0ad4e
	}

	.uni-tag--warning.uni-tag--inverted {
		color: #f0ad4e;
		background-color: #fff;
		border: 1px solid #f0ad4e
	}

	.uni-tag--error {
		color: #fff;
		background-color: #dd524d;
		border: 1px solid #dd524d
	}

	.uni-tag--error.uni-tag--inverted {
		color: #dd524d;
		background-color: #fff;
		border: 1px solid #dd524d
	}

	.uni-tag--inverted {
		color: #333;
		background-color: #fff;
		border: 1px solid #f8f8f8
	}

	.uni-tag--zonghe {
		color: #fff;
		background-color: #72ACF6;
		border: 1px solid #72ACF6
	}

	.uni-tag--gongye {
		color: #fff;
		background-color: #61C4E6;
		border: 1px solid #61C4E6
	}

	.uni-tag--nongye {
		color: #fff;
		background-color: #76C1A1;
		border: 1px solid #76C1A1
	}

	.uni-tag--fuwuye {
		color: #fff;
		background-color: #F3B861;
		border: 1px solid #F3B861
	}

	.uni-tag--xiaofei {
		color: #fff;
		background-color: #EB8873;
		border: 1px solid #EB8873
	}

	.uni-tag--touzi {
		color: #fff;
		background-color: #C869A5;
		border: 1px solid #C869A5
	}

	.uni-tag--duiwaikaifang {
		color: #fff;
		background-color: #8F8BE1;
		border: 1px solid #8F8BE1
	}

	.uni-tag--xinjingji {
		color: #fff;
		background-color: #757EDA;
		border: 1px solid #757EDA
	}

	.uni-tag--lvsefazhan {
		color: #fff;
		background-color: #6C8DCF;
		border: 1px solid #6C8DCF
	}

	.uni-tag--minsheng {
		color: #fff;
		background-color: #8AA4D8;
		border: 1px solid #8AA4D8
	}

	.uni-tag--guotong {
		color: #fff;
		background-color: #007aff;
		border: 1px solid #007aff
	}

	.uni-tag--hutong {
		color: #fff;
		background-color: #F3B861;
		border: 1px solid #F3B861
	}

	.uni-tag--dashuju {
		color: #fff;
		background-color: #757EDA;
		border: 1px solid #757EDA
	}

</style>
