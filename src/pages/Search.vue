<template>
	<div id="Search">
		<Topbar :type=1 />
		<Sidebar />

		<SearchCondition />

		<SearchResult :goodsList="goodsList" />
	</div>
</template>

<script>
	import axios from "axios";
	import store from "@/vuex/store";

	import Sidebar from "@/components/public/Sidebar";
	import Topbar from "@/components/public/Topbar";
	import SearchCondition from "@/components/search/SearchCondition";
	import SearchResult from "@/components/search/SearchResult";

	export default {
		data() {
			return {
				goodsList: [],
			};
		},
		components: {
			Sidebar,
			Topbar,
			SearchResult,SearchCondition
		},
		methods: {
			getGoodsList(params) {
				this.goodsList = params;
			},
		},
		beforeRouteEnter(to, from, next) {
			console.log("Search.vue beforeRouteEnter");
			axios
				.get(
					`${store.state.serverAPI.searchGoods}?name=${to.query.searchText}`
				)
				.then(function (res) {
					// 组件未渲染，this 不存在，获取到的参数需要放在next()中
					if (res.data.state === "succeed") {
						next((vm) => vm.getGoodsList(res.data.result));
					}
				})
				.catch(function (err) {
					console.log(err);
				});
		},
		beforeRouteUpdate(to, from, next) {
			console.log("Search.vue beforeRouteUpdate");
			let self = this;
			axios
				.get(
					`${store.state.serverAPI.searchGoods}?introduce=${to.query.searchText}`
				)
				.then(function (res) {
					// 组件已经渲染过了，可以直接使用 this
					self.getGoodsList(res.data.result);
				})
				.catch(function (err) {
					console.log(err);
				});
		},
	};
</script>

<style scoped>
</style>
