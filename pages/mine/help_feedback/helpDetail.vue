<template>
	<textView :content="content" />
</template>

<script>
	import textView from '@/components/textView/textView.vue';
	export default {
		components: {
			textView
		},
		data() {
			return {
				content: "jjajajjaj",
			}
		},
		onLoad: function(e) {
			if (JSON.stringify(e) != '{}') {
				console.log(e);
				uni.setNavigationBarTitle({
					title: e.title
				});
			}
			this.initHelpContent();
		},
		methods: {
			initHelpContent() {
				try {
					let helpContent = uni.getStorageSync('help_content');
					if (helpContent) {
						this.content = helpContent;
					}
				} catch (e) {
					console.log(e.message);
				}
			}
		}
	}
</script>

<style>
</style>
