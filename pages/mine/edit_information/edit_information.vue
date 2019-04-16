<template>
	<view>
		<view class="uni-list">
			<view class="uni-list-cell" v-for="(value,key) in list" style="height: 80upx;">
				<view class="uni-media-list" style="display: inline-block;">
					<view class="title" style="font-size: 30upx;float: left;">{{value.title}}</view>
					<input class="input" style="float: right;text-align: right;" 
					:placeholder="value.input" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				list: [
					{
						title: "真实姓名",
						input: "李晓华"
					},
					{
						title: "性别",
						input: "男"
					},
					{
						title: "出生日期",
						input: "1980-01-01"
					},
					{
						title: "所在地区",
						input: "中国大陆 湖北省 武汉市"
					},
					{
						title: "个人描述",
						input: "时代赋予我们使命"
					},
				]
				}
		}
	}
</script>

<style>
</style>
