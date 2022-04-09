<template>
	<div id="User">
		<Topbar :type=2 />
		<Sidebar :hideUser="true" />

		<div class="main-contain">
			<UserForm class="contain" />
		</div>
	</div>
</template>

<script>
	import Topbar from "@/components/public/Topbar";
	import Sidebar from "@/components/public/Sidebar";

	import UserForm from "@/components/user/UserForm";

	export default {
		components: {
			Topbar,
			Sidebar,
			UserForm,
		},
	};
</script>

<style scoped>
	.main-contain {
		position: relative;
		padding: 20px 0;
		background: var(--bgcolor);
	}
</style>
