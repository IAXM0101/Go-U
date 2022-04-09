<template>
	<div id="Goods" class="contain">
		<Topbar :type=2 />
		<Sidebar />

		<GoodsMain :goodsInfo="goodsInfo" :modelList="modelList" />

		<div class="contain L1-contain">
			<div class="contain-recommend">
				<GoodsRecommend />
			</div>
			<div class="contain-content">
				<GoodsContent :goodsDetail="goodsDetail" />
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import store from "@/vuex/store";

	import Topbar from "@/components/public/Topbar";
	import Sidebar from "@/components/public/Sidebar";

	import GoodsMain from "@/components/goods/GoodsMain";
	import GoodsRecommend from "@/components/goods/GoodsRecommend";
	import GoodsContent from "@/components/goods/GoodsContent";

	export default {
		data() {
			return {
				goodsInfo: {},
				modelList: [],
				goodsDetail: {},
			};
		},
		components: {
			Topbar,
			Sidebar,
			GoodsMain,
			GoodsRecommend,
			GoodsContent,
		},
		beforeRouteEnter(to, from, next) {
			axios
				.get(
					`${store.state.serverAPI.getGoods}?goodsID=${to.query.goodsID}`
				)
				.then(function (res) {
					if (res.data.state === "succeed") {
						next((vm) => {
							vm.goodsInfo = res.data.result;
							vm.modelList = JSON.parse(res.data.result.modelList);
							vm.goodsDetail = JSON.parse(res.data.result.goodsDetail);
						});
					}
				})
				.catch(function (err) {
					console.log(err);
				});
		},
	};
</script>

<style scoped>
	.L1-contain {
		padding: 20px 0;
	}

	.goods-magnify {
		float: left;
		width: 480px;
	}

	.goods-operate {
		float: left;
		width: 610px;
	}

	.goods-option {
		float: left;
		width: 160px;
	}

	.contain-recommend {
		float: left;
		width: 250px;
	}

	.contain-content {
		float: left;
		width: 1000px;
	}
</style>
