<template>
	<web-view :src="url"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				url: ""
			}
		},
		onLoad: function(option) {
			console.log(this.apiUrl+option.url)
			this.url = this.apiUrl+option.url;
		},
		methods: {

		}
	}
</script>

<style>

</style>
