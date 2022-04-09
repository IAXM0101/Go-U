<template>
	<div id="CartGoods">
		<div class="title-contain">
			<div>
				<input
					type="checkbox"
					v-model="allCheck"
					@click="checkItem(!allCheck)"
				/>
				<span class="title-text">全选</span>
			</div>
			<div>
				<span class="title-text">商品</span>
			</div>
			<div>
				<span class="title-text">单价</span>
			</div>
			<div>
				<span class="title-text">数量</span>
			</div>
			<div>
				<span class="title-text">小计</span>
			</div>
			<div>
				<span class="title-text">操作</span>
			</div>
		</div>
		<ul class="content-contain">
			<li class="item-contain" v-for="(item, index) in cartList">
				<div class="item-goods-contain">
					<div>
						<input
							type="checkbox"
							v-model="item.isCheck"
							@click="
								checkItem('solo', item.cartID, !item.isCheck)
							"
						/>
					</div>
					<div>
						<img :src="item.imgUrl" alt="" />
						<p v-text="item.name"></p>
						<i v-text="item.introduce"></i>
						<div v-text="item.modelName"></div>
					</div>
					<div>
						<div>
							<small>￥</small>
							<span>{{ item.price }}</span>
							<small>.00</small>
						</div>
					</div>
					<div>
						<div class="input-contain">
							<button @click="modifiyPrice(index, -1)">-</button>
							<input
								type="text"
								v-model.lazy="item.count"
								:data-index="index"
								@keyup="inputKeyup"
								@blur="inputBlur"
							/>
							<button @click="modifiyPrice(index, 1)">+</button>
						</div>
					</div>
					<div>
						<div>
							<small>￥</small>
							<span>{{ item.totalPrice }}</span>
						</div>
					</div>
					<div>
						<div @click="deleteItem(item.cartID, index)">删除</div>
					</div>
				</div>

				<!-- <ul class="item-gifts-contain">
					<li>赠品</li>
					<li>赠品</li>
				</ul> -->
			</li>
		</ul>
		<div class="final-contain">
			<button class="final-button" @click="createOrder">创建订单</button>
			<div class="finalPrice-contain">
				<span>总计：</span>
				<small>￥</small>
				<span>{{ finalPrice }}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import qs from "Qs";
	export default {
		computed: {
			cartList() {
				return this.$store.state.cartModule.cartList;
			},
			allCheck: {
				get() {
					return this.cartList.every(function (value) {
						return value.isCheck;
					});
				},
				set(param) {
					this.cartList.forEach(function (value) {
						value.isCheck = param;
					}, this);
				},
			},
			finalPrice() {
				return this.cartList.reduce(function (total, curValue) {
					return total + curValue.totalPrice;
				}, 0);
			},
		},
		methods: {
			/* 调整商品数量 */
			modifiyPrice(index, num) {
				this.cartList[index].count += num;
				if (this.cartList[index].count < 1) {
					this.cartList[index].count = 1;
				}
				if (this.cartList[index].count > 200) {
					this.cartList[index].count = 200;
				}

				this.cartList[index].totalPrice =
					this.cartList[index].count * this.cartList[index].price;
			},
			inputKeyup(e) {
				e.target.value = e.target.value.replace(/[^\d]/g, "");
			},
			inputBlur(e) {
				let index = e.target.getAttribute("data-index");

				if (e.target.value < 1) {
					e.target.value = 1;
				}
				if (e.target.value > 200) {
					e.target.value = 200;
				}

				this.cartList[index].count = e.target.value;

				this.cartList[index].totalPrice =
					this.cartList[index].count * this.cartList[index].price;
			},
			/* 选中商品 */
			checkItem(type, cartID, isCheck) {
				let self = this;
				let url = this.$store.state.serverAPI.modifyCart;
				let params = {
					cartID,
					userID: this.$store.state.userModule.userID,
					password: this.$store.state.userModule.password,
				};
				if (type === "solo") {
					params.type = "single";
					params.isCheck = Number(isCheck);
				} else {
					params.type = "all";
					params.isCheck = Number(type);
				}

				this.$axios
					.post(url, qs.stringify(params))
					.then(function (res) {
						if (res.data.state === "succeed") {
							console.log("修改成功");
						}
					})
					.catch(function (err) {
						console.log(err);
					});
			},
			/* 删除商品 */
			deleteItem(cartID, index) {
				let self = this;
				let url = this.$store.state.serverAPI.deleteCart;
				let params = {
					cartID,
					userID: this.$store.state.userModule.userID,
					password: this.$store.state.userModule.password,
					type: "single",
				};

				this.$axios
					.post(url, qs.stringify(params))
					.then(function (res) {
						if (res.data.state === "succeed") {
							self.cartList.splice(index, 1);
						}
					})
					.catch(function (err) {
						console.log(err);
					});
			},
			/* 获取选中的商品，生成订单 */
			createOrder() {
				let params = {
					userID: this.$store.state.userModule.userID,
					password: this.$store.state.userModule.password,
					orderList: [],
					finalPrice: this.finalPrice,
				};

				for (let i = 0; i < this.cartList.length; i++) {
					if (this.cartList[i].isCheck) {
						params.orderList.push({
							goodsID: this.cartList[i].goodsID,
							imgUrl: this.cartList[i].imgUrl,
							name: this.cartList[i].name,
							modelID: this.cartList[i].modelID,
							modelName: this.cartList[i].modelName,
							price: this.cartList[i].price,
							count: this.cartList[i].count,
							totalPrice: this.cartList[i].totalPrice,
						});
					}
				}

				this.$store.commit({
					type: "updateOrderInfo",
					orderInfo: params,
				});

				this.$router.push({name:"order"})
			},
		},
	};
</script>

<style scoped>
	#CartGoods {
		position: relative;
		width: 1100px;
		margin: 0 auto;
	}

	.title-contain {
		position: relative;
		width: 100%;
		height: 50px;
		border: 2px solid var(--bgcolor);
		box-sizing: border-box;
		background: var(--bgcolor);
		overflow: hidden;
	}

	.title-contain > * {
		float: left;
		box-sizing: border-box;
		line-height: 46px;
		font-size: 15px;
	}

	.title-contain div:nth-child(1) {
		margin-left: 10px;
	}

	.title-contain div:nth-child(2) {
		margin-left: 40px;
	}

	.title-contain div:nth-child(3) {
		margin-left: 480px;
	}

	.title-contain div:nth-child(4) {
		margin-left: 70px;
	}

	.title-contain div:nth-child(5) {
		margin-left: 170px;
	}

	.title-contain div:nth-child(6) {
		margin-left: 60px;
	}

	.content-contain {
		position: relative;
		width: 100%;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.item-contain {
		position: relative;
		width: 100%;
		box-sizing: border-box;
		border: 2px solid var(--bgcolor);
		overflow: hidden;
	}

	.item-goods-contain {
		float: left;
		position: relative;
		width: 100%;
	}

	.item-goods-contain > * {
		float: left;
		position: relative;
		margin: 10px;
	}

	.item-goods-contain div:nth-child(2) {
		position: relative;
		width: 440px;
		overflow: hidden;
	}

	.item-goods-contain div:nth-child(2) img {
		float: left;
		width: 80px;
		height: 80px;
	}

	.item-goods-contain div:nth-child(2) p {
		float: left;
		width: 240px;
		padding: 5px 10px;
		box-sizing: border-box;
	}

	.item-goods-contain div:nth-child(2) i {
		float: left;
		width: 240px;
		padding: 5px 10px;
		box-sizing: border-box;
		color: rgb(119, 118, 118);
		font-size: 13px;
	}

	.item-goods-contain div:nth-child(2) div {
		float: left;
		position: absolute;
		top: 0;
		right: 0;
		width: 100px;
		text-align: center;
	}

	.item-goods-contain div:nth-child(3) {
		width: 140px;
	}

	.item-goods-contain div:nth-child(3) > div {
		float: right;
		font-size: 20px;
	}

	.item-goods-contain div:nth-child(4) {
		width: 120px;
	}

	.item-goods-contain div:nth-child(4) .input-contain {
		margin: 0 auto;
		width: 100px;
		height: 30px;
		border: 1px solid var(--bgcolor);
	}

	.item-goods-contain div:nth-child(4) .input-contain button {
		width: 30px;
		height: 100%;
		float: left;
		border: none;
	}

	.item-goods-contain div:nth-child(4) .input-contain input {
		width: 40px;
		height: 100%;
		box-sizing: border-box;
		float: left;
		text-align: center;
		border: none;
		outline: none;
	}

	.item-goods-contain div:nth-child(5) {
		width: 140px;
	}

	.item-goods-contain div:nth-child(5) > div {
		float: right;
		font-size: 20px;
	}

	.item-goods-contain div:nth-child(6) {
		width: 100px;
	}

	.item-goods-contain div:nth-child(6) > * {
		width: 100%;
		margin: 6px 0;
		font-size: 13px;
		text-align: center;
	}

	.item-goods-contain div:nth-child(6) > *:hover {
		cursor: pointer;
		color: red;
	}

	.item-gifts-contain {
		float: left;
		position: relative;
		width: 100%;
		padding: 5px 40px;
		margin: 0;
		box-sizing: border-box;
		list-style: none;
	}

	.final-contain {
		position: relative;
		width: 100%;
	}

	.finalPrice-contain {
		float: right;
		font-size: 22px;
		line-height: 40px;
		padding: 0 20px;
	}

	.final-button {
		float: right;
		border: none;
		width: 100px;
		height: 40px;
		background: red;
		color: white;
		cursor: pointer;
	}
</style>
