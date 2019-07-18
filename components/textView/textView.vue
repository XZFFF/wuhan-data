<template>
	<view>
		<view style="padding: 40upx 40upx;">
			<text style="font-size: 12px;color: #303942;">
				{{content}}
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			content: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style>

</style>
