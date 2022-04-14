<template>
	<div id="Order">
		<Sidebar />

		<div class="contain" style="margin-bottom: 60px">
			<OrderAddr />

			<div class="goods">
				<div
					class="goods-item"
					v-for="(item, index) in orderInfo.orderList"
					:key="'order' + index"
				>
					<div>
						<img :src="item.imgUrl" width="100%" height="100%" />
					</div>
					<div>
						<p v-html="item.name"></p>
					</div>
					<div>
						<p v-html="item.modelName"></p>
					</div>
					<div>
						<p v-html="item.price"></p>
					</div>
					<div>
						<p v-html="item.count"></p>
					</div>
					<div>
						<p v-html="item.totalPrice"></p>
					</div>
				</div>
			</div>

			<div class="contain bottom">
				<button class="bottom-button" @click="commitOrder">
					提交订单
				</button>
				<div class="bottom-price">
					<span>总计：</span>
					<small>￥</small>
					<span>{{ orderInfo.finalPrice }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Sidebar from "@/components/public/Sidebar";
	import OrderAddr from "@/components/order/OrderAddr";

	export default {
		computed: {
			orderInfo() {
				return this.$store.state.cartModule.orderInfo;
			},
		},
		methods: {
			commitOrder() {
				
			},
		},
		components: {
			Sidebar,
			OrderAddr,
		},
	};
</script>

<style scoped>
	.goods {
		float: left;
		position: relative;
		box-sizing: border-box;
		width: 850px;
		padding: 10px 10px 0;
		border: 5px solid gray;
	}

	.goods-item {
		box-sizing: border-box;
		height: 120px;
		border: 2px solid gray;
		margin-bottom: 10px;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
	}

	.goods-item > * {
		width: 120px;
		height: inherit;
		text-align: center;
		line-height: 120px;
	}

	.bottom {
		position: fixed;
		bottom: 0;
		width: inherit;
		height: 50px;
		background: var(--bgcolor);
		overflow: hidden;
	}

	.bottom-price {
		float: right;
		font-size: 22px;
		line-height: 50px;
		padding: 0 20px;
	}

	.bottom-button {
		float: right;
		border: none;
		width: 120px;
		height: 50px;
		background: red;
		color: white;
		cursor: pointer;
	}
</style>