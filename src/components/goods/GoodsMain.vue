<template>
	<div id="GoodsMain" class="contain">
		<div class="goods-magnify">
			<GoodsMagnify :imgList="model.imgList" />
		</div>

		<div class="goods-operate">
			<div class="module-contain">
				<span class="module-title">名&nbsp;&nbsp;&nbsp;&nbsp;称</span>
				<span class="name-value">
					{{ goodsInfo.name }}
				</span>
			</div>
			<div class="module-contain">
				<span class="module-title">介&nbsp;&nbsp;&nbsp;&nbsp;绍</span>
				<span class="name-value">
					{{ goodsInfo.introduce }}
				</span>
			</div>
			<div class="module-contain">
				<span class="module-title">型&nbsp;&nbsp;&nbsp;&nbsp;号</span>
				<span class="model-value" ref="radioContain">
					<span
						class="radio"
						v-for="(item, index) in modelList"
						:key="item.modelID"
						@click="choice(index)"
						v-text="item.modelName"
					>
					</span>
				</span>
			</div>
			<div class="module-contain">
				<span class="module-title">价&nbsp;&nbsp;&nbsp;&nbsp;格</span>
				<span class="price-value">
					<small>￥</small>
					<span>{{ model.price }}</span>
				</span>
			</div>
			<div class="module-contain">
				<span class="module-title">数&nbsp;&nbsp;&nbsp;&nbsp;量</span>
				<span class="price-value">
					<el-input-number
						v-model="goodsCount"
						:min="1"
						:max="10"
						label=""
					>
					</el-input-number>
				</span>
				<span>库存：{{ model.inventory - goodsCount }}</span>
			</div>
			<div class="module-contain">
				<span class="module-title hidden">
					操&nbsp;&nbsp;&nbsp;&nbsp;作
				</span>
				<span class="button-value">
					<button class="shoppingcart" @click="joinCart">
						加入购物车
					</button>
					<button class="buynow">立即购买</button>
				</span>
			</div>
			<div class="module-contain">
				<span class="module-title">服&nbsp;&nbsp;&nbsp;&nbsp;务</span>
				<span class="serve-value">
					<span>极速退款</span>
					<span>7天无理由退货</span>
				</span>
			</div>
		</div>

		<div class="goods-option">
			<GoodsOption />
		</div>
	</div>
</template>

<script>
	import Util from "@/assets/js/util";
	import GoodsMagnify from "@/components/goods/GoodsMagnify";
	import GoodsOption from "@/components/goods/GoodsOption";

	import { mapGetters, mapActions } from "vuex";
	export default {
		data() {
			return {
				goodsCount: 1,
				radio: "1",
				idx: 0,
				model: {
					price: 0,
					inventory: 0,
					imgList: [],
				},
			};
		},
		computed: {
			...mapGetters({
				userID: "getUserID",
			}),
		},
		props: ["goodsInfo", "modelList"],
		methods: {
			...mapActions({
				add_cartItem: "add_cartItem",
			}),
			choice(idx) {
				this.idx = idx;

				for (let i = 0; i < this.$refs.radioContain.children.length; i++) {
					this.$refs.radioContain.children[i].className = "radio";
				}
				this.$refs.radioContain.children[this.idx].className =
					"radio checkRadio";

				Util.deepcopy(this.model, this.modelList[this.idx]);
			},
			joinCart() {
				let params = {
					userID: this.userID,
					goodsID: this.goodsInfo.goodsID,
					imgUrl: this.goodsInfo.image,
					name: this.goodsInfo.name,
					introduce: this.goodsInfo.introduce,
					modelID: this.model.modelID,
					modelName: this.model.modelName,
					price: this.model.price,
					count: this.goodsCount,
					totalPrice: this.model.price * this.goodsCount,
				};

				this.add_cartItem({ params }).then(()=>{
					alert("添加成功！")
				});
			},
		},
		components: {
			GoodsMagnify,
			GoodsOption,
		},
		updated() {
			this.$refs.radioContain.children[this.idx].className =
				"radio checkRadio";

			Util.deepcopy(this.model, this.modelList[this.idx]);
		},
	};
</script>

<style scoped>
	.goods-magnify {
		float: left;
		width: 480px;
	}

	.goods-operate {
		float: left;
		width: 610px;
		box-sizing: border-box;
		padding: 0 20px;
	}

	.goods-option {
		float: left;
		width: 160px;
	}

	.module-contain {
		padding: 10px 0;
	}

	.module-title {
		color: var(--color4);
		padding: 0 10px;
	}

	.name-value {
		font-size: 20px;
	}

	.el-checkbox-group {
		display: inline-block;
	}

	.el-checkbox {
		margin-right: 5px;
	}

	.price-value {
		color: var(--color2);
		font-size: 30px;
	}

	.button-value button {
		border: 0;
		margin-right: 10px;
		width: 160px;
		height: 40px;
		background: var(--color2);
		color: white;
		font-size: 18px;
	}

	.button-value button:hover {
		cursor: pointer;
		opacity: 0.8;
	}

	.serve-value span {
		display: inline-block;
		border: 1px solid;
		height: 12px;
		font-size: 12px;
		padding: 2px 5px;
		line-height: 12px;
	}

	.hidden {
		visibility: hidden;
	}

	.radio {
		padding: 8px;
		border: 2px solid gray;
		border-radius: 5px;
		margin: 10px;
		font-size: 10px;
		cursor: pointer;
	}

	.checkRadio {
		border-color: var(--color2);
	}
</style>
