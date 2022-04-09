<template>
	<div id="Home">
		<Topbar :type=1 />
		<Sidebar :hideHome="true" />

		<div class="contain">
			<HomeNav />
			<HomeSwiper />
			<HomeAdvert />
		</div>

		<div class="product-contain">
			<div class="contain">
				<HomeProduct />
			</div>
		</div>
	</div>
</template>

<script>
	import Topbar from "@/components/public/Topbar";
	import Sidebar from "@/components/public/Sidebar";

	import HomeNav from "@/components/home/HomeNav";
	import HomeSwiper from "@/components/home/HomeSwiper";
	import HomeAdvert from "@/components/home/HomeAdvert";
	import HomeProduct from "@/components/home/HomeProduct";

	export default {
		components: {
			Topbar,
			Sidebar,
			HomeNav,
			HomeSwiper,
			HomeAdvert,
			HomeProduct,
		}
	};
</script>

<style scoped>
	.product-contain {
		margin-top: 10px;
		background: var(--bgcolor);
	}
</style>
