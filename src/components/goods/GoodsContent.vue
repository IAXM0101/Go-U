<template>
	<div id="GoodsContent" ref="GoodsContent">
		<nav class="nav" ref="nav">
			<button @click="toggle" data-btn="GoodsDetail" class="check">
				商品详情
			</button>
			<button @click="toggle" data-btn="GoodsEvaluate">评价</button>
		</nav>
		<div v-if="toggleKey === 'GoodsDetail'">
			<GoodsDetail :goodsDetail="goodsDetail" />
		</div>
		<div v-if="toggleKey === 'GoodsEvaluate'">
			<GoodsEvaluate />
		</div>
	</div>
</template>

<script>
	import GoodsDetail from "@/components/goods/GoodsDetail";
	import GoodsEvaluate from "@/components/goods/GoodsEvaluate";

	export default {
		data() {
			return {
				toggleKey: "GoodsDetail",
			};
		},
		props: ["goodsDetail"],
		components: {
			GoodsDetail,
			GoodsEvaluate,
		},
		methods: {
			toggle(ev) {
				let oEvent = ev || event;

				this.goodsContentMutation(oEvent.target.getAttribute("data-btn"));
			},
			goodsContentMutation(params) {
				this.toggleKey = params;

				for (let i = 0; i < this.$refs.nav.children.length; i++) {
					const element = this.$refs.nav.children[i];
					if (this.toggleKey === element.getAttribute("data-btn")) {
						element.className = "check";
					} else if (element.className === "check") {
						element.className = "";
					}
				}

				this.toTop();
			},
			/* 让内容置顶 */
			toTop(){
				this.$refs.GoodsContent.style.minHeight = window.innerHeight + "px";

				// box离浏览器的距离
				let node = this.$el;
				let offsetTop = node.offsetTop;
				let clientTop = node.clientTop;

				while (node.offsetParent != null) {
					node = node.offsetParent;
					offsetTop += node.offsetTop;
					clientTop += node.clientTop;
				}
				window.scrollTo(0, offsetTop + clientTop);
			}
		},
		created() {
			this.bus.$on("goodsContentMutation", this.goodsContentMutation);
		},
		destroyed() {
			this.bus.$off("goodsContentMutation");
		},
	};
</script>

<style scoped>
	#GoodsContent {
		position: relative;
		box-sizing: border-box;
		border-left: 2px solid rgb(211, 211, 211);
		border-bottom: 2px solid rgb(211, 211, 211);
		border-right: 2px solid rgb(211, 211, 211);
	}

	.nav {
		position: relative;
		height: 50px;
		background: rgb(211, 211, 211);
	}

	.nav button {
		float: left;
		box-sizing: border-box;
		border: 0;
		padding: 0 20px;
		height: 50px;
		background: none;
		font-size: 14px;
		cursor: pointer;
	}

	.nav .check,
	.nav button:hover {
		background: var(--color2);
		color: white;
	}
</style>
