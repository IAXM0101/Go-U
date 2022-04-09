<template>
	<div id="Chat">
		<Sidebar :hideChat="true" />

		<div class="chat-panel">
			<Chating />
			<ChatPanel />
			<ChatInfo />
		</div>
	</div>
</template>

<script>
	import Sidebar from "@/components/public/Sidebar";

	import Chating from "@/components/chat/Chating";
	import ChatPanel from "@/components/chat/ChatPanel";
	import ChatInfo from "@/components/chat/ChatInfo";
	export default {
		components: {
			Sidebar,
			Chating,
			ChatPanel,
			ChatInfo,
		},
	};
</script>

<style scoped>
	#Chat {
		float: left;
		position: relative;
		width: 100%;
	}
	.chat-panel {
		float: left;
		position: relative;
		width: 1150px;
		height: 600px;
		margin: 50px 50px 0;
	}
</style>
