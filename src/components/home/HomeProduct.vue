<template>
	<div id="HomeProduct">
		<div class="contain" v-for="item in productList" @click="enter(item.goodsID)">
			<img :src="item.image" />
			<p>{{ item.name }}</p>
			<p>{{ item.introduce }}</p>
			<p>
				<small>￥</small>
				<span>{{ item.startingPrice }}</span>
				<small>元起</small>
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				productList: [],
				page: 0,
				flag: true,
			};
		},
		methods: {
			lazyLoad() {
				let self = this;
				window.onscroll = function () {
					let scrollTop = document.documentElement.scrollTop;

					let page = Math.ceil(scrollTop / 420);

					if (self.flag && page - self.page >= 1) {
						self.flag = false;

						let diff = page - self.page;

						self.$axios
							.get(
								`${self.$store.state.serverAPI.getAllGoods}?total=${self.productList.length
								}&count=${diff * 4}`
							)
							.then(function (res) {
								if (res.data.state === "succeed") {
									for (
										let i = 0;
										i < res.data.result.length;
										i++
									) {
										self.productList.push(res.data.result[i]);
									}
									self.page = page;
									self.flag = true;
								}
							})
							.catch(function (err) {
								console.log(err);
							});
					}
				};
			},
			enter(id) {
				this.$router.push({ name: "goods", query: { goodsID: id } });
				console.log(id);
			},
		},
		created() {
			this.lazyLoad();
		},
	};
</script>

<style scoped>
	#HomeProduct {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.contain {
		width: 300px;
		height: 400px;
		margin: 10px 0;
		background: #ffffff;
		transition: transform 0.2s;
		cursor: pointer;
	}

	.contain:hover {
		transform: scale(1.03);
		box-shadow: 0 0 10px;
	}

	.contain img {
		width: 240px;
		height: 240px;
		margin: 10px 30px 0;
	}

	.contain p {
		text-align: center;
		margin: 10px 0;
	}

	.contain p:nth-of-type(1) {
		font-size: 25px;
	}

	.contain p:nth-of-type(2) {
		font-size: 15px;
		color: gray;
	}

	.contain p:nth-of-type(3) {
		font-size: 24px;
		color: var(--color2);
	}
</style>
