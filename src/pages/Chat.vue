<template>
	<div>
		<Sidebar :hideChat="true" />

		<div class="chat-panel">
			<ChatList />
			<ChatPanel />
			<ChatInfo />
		</div>
	</div>
</template>

<script>
	import Sidebar from "@/components/public/Sidebar";

	import ChatList from "@/components/chat/ChatList";
	import ChatPanel from "@/components/chat/ChatPanel";
	import ChatInfo from "@/components/chat/ChatInfo";
	export default {
		components: {
			Sidebar,
			ChatList,
			ChatPanel,
			ChatInfo,
		},
	};
</script>

<style scoped>
	.chat-panel {
		position: relative;
		width: 1150px;
		height: 600px;
		margin: 50px auto 0;
	}
</style>
