<template>
	<div id="GoodsOption">
		<button @click.self="toggle" data-btn="GoodsDetail">
			<i class="iconfont icon-jieshao"></i>
			<span>商品详情</span>
		</button>
		<button @click.self="toggle" data-btn="GoodsEvaluate">
			<i class="iconfont icon-pingjia"></i>
			<span>评价</span>
		</button>
	</div>
</template>

<script>
	export default {
		methods: {
			toggle(ev) {
				let oEvent = ev || event;

				this.bus.$emit(
					"goodsContentMutation",
					oEvent.target.getAttribute("data-btn")
				);
			},
		},
	};
</script>

<style scoped>
	#GoodsOption {
		position: relative;
		box-sizing: border-box;
		padding: 10px;
		border-left: 2px solid rgba(206, 206, 206, 0.5);
	}

	#GoodsOption button {
		position: relative;
		box-sizing: border-box;
		border: none;
		padding: 10px;
		width: 100%;
		background: none;
		text-align: left;
		font-size: 16px;
	}

	#GoodsOption button:hover {
		background: rgba(255, 158, 13, 0.877);
		color: white;
		cursor: pointer;
	}

	#GoodsOption span {
		padding: 0 5px;
	}
	#GoodsOption i,
	#GoodsOption span {
		pointer-events: none;
	}
</style>
