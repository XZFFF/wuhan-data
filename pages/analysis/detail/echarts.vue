<template>
	<scroll-view scroll-y="true" class="container">

		<wd-choose-item v-for="(indexDetailItem, index) in indexDetail" :key="index" :requestItem="indexDetailItem"></wd-choose-item>
	</scroll-view>
</template>

<script>
	import wdChooseItem from "@/components/wd-choose-item/wd-choose-item.vue";
	import echartsData from "../../../common/echarts.json";
	export default {
		components: {
			wdChooseItem
		},
		data() {
			return {
				indexDetail: {},
			};
		},
		onLoad: function(e) {},
		onShow: function() {
			this.initIndexDetail();
		},
		methods: {
			initIndexDetail() {
				let serverData = echartsData;
				this.indexDetail = serverData.data.classInfo;
			},
		}
	}
</script>

<style>
	page,
	view {
		display: flex;
	}

	page {
		min-height: 100%;
	}

	.container {
		flex: 1;
		flex-direction: column;
		/* padding-bottom: 30upx; */
		box-sizing: border-box;
	}
</style>
