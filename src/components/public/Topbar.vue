<template>
	<div class="contain">
		<div class="Topbar-contain" :style="{ width: width + 'px' }">
			<router-link to="/" tag="div" class="logo-contain">
				<img src="@/assets/imgs/logo.png" alt="" class="logo-img" />
				<span class="logo-text">GO-U</span>
			</router-link>

			<div class="input-contain" v-if="type === 1">
				<input type="text" v-model="searchText" />
				<button @click="searchClick">
					<i class="el-icon-search"></i>&nbsp;搜索
				</button>
			</div>
			<div class="search-contain" v-else-if="type === 2">
				<input type="text" v-model="searchText" />
				<button @click="searchClick">搜索</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				searchText: "商品",
			};
		},
		props: {
			type: {
				type: Number,
				default: 1,
			},
			width: {
				type: String,
				default: "1250",
			},
		},
		methods: {
			searchClick() {
				this.$router
					.push({
						path: "/search",
						query: { searchText: this.searchText },
					})
					.catch((err) => {
						console.log(err);
					});
			},
		},
	};
</script>

<style scoped>
	.Topbar-contain{
		position: relative;
		width: 1100px;
		height: 100px;
		margin: 0 auto;
		overflow: hidden;
	}

	.logo-contain {
		position: absolute;
		top: 20px;
		cursor: pointer;
	}

	.logo-img {
		float: left;
		height: 60px;
	}
	.logo-text {
		float: left;
		padding: 0 5px;
		font-size: 40px;
		line-height: 60px;
	}

	.input-contain {
		margin: 30px auto;
		width: 480px;
		height: 40px;
	}

	.input-contain input,
	.input-contain button {
		height: 100%;
		box-sizing: border-box;
		float: left;
		border: 0;
	}

	.input-contain input {
		width: 400px;
		border-radius: 20px 0 0 20px;
		padding: 0 20px;
		outline: 0;
		border: 2px solid var(--color2);
	}

	.input-contain button {
		border-radius: 0 20px 20px 0;
		padding: 0 5px;
		width: 80px;
		background: var(--color2);
		color: white;
		font-size: 18px;
		font-weight: 600;
		text-align: left;
	}

	.input-contain button:hover {
		opacity: 0.8;
		cursor: pointer;
	}

	.search-contain {
		position: absolute;
		top: 35px;
		right: 0;
		width: 280px;
		height: 30px;
	}

	.search-contain input {
		float: left;
		box-sizing: border-box;
		border: 1px solid var(--color2);
		padding: 0 5px;
		width: 80%;
		height: 100%;
		outline: none;
	}

	.search-contain button {
		float: left;
		box-sizing: border-box;
		border: none;
		width: 20%;
		height: 100%;
		background: var(--color2);
		color: white;
	}

	.search-contain button:hover {
		cursor: pointer;
		opacity: 0.8;
	}
</style>
