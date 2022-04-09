<template>
	<div id="ShoppingCart">
		<Topbar :type="2" :width="1100" />

		<Sidebar :hideCart="true" />

		<div class="contain">
			<CartGoods />
		</div>
	</div>
</template>

<script>
	import Topbar from "@/components/public/Topbar";
	import Sidebar from "@/components/public/Sidebar";
	import CartGoods from "@/components/cart/CartGoods";

	export default {
		components: {
			Topbar,
			Sidebar,
			CartGoods,
		},
	};
</script>

<style scoped>
</style>
