<template>
	<div id="SearchResult">
		<div class="item-contain" v-for="item in goodsList">
			<router-link
				:to="{
					path: '/goods',
					query: { goodsID: item.goodsID },
				}"
				tag="div"
			>
				<img :src="item.image" class="item-img" />

				<div class="item-name">{{ item.name }}</div>
			</router-link>
			<div class="item-introduce">
				{{ item.introduce }}
			</div>
			<div class="item-price">
				<small>￥</small>{{ item.startingPrice }}<small>元起</small>
			</div>

			<!-- <button class="item-collect" :class="{ 'item-isCollect': item.isCollect }">
				<i class="el-icon-star-off"></i>
			</button> -->
		</div>
	</div>
</template>

<script>
	export default {
		props: ["goodsList"],
	};
</script>

<style scoped>
	#SearchResult {
		position: relative;
		width: 1250px;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.item-contain {
		position: relative;
		margin-top: 10px;
		width: 240px;
		height: 350px;
		border: 1px solid var(--color2);
	}

	.item-contain:hover {
		box-shadow: 0 0 2px 2px rgb(184, 184, 184);
	}

	.item-img {
		width: 240px;
		height: 240px;
		cursor: pointer;
	}

	.item-name {
		margin: 10px 0;
		font-size: 20px;
		text-align: center;
		cursor: pointer;
	}

	.item-name :hover {
		text-decoration: underline;
		color: rgb(252, 47, 40);
	}

	.item-introduce {
		margin: 5px 0;
		font-size: 14px;
		text-align: center;
		color: gray;
	}

	.item-price {
		margin: 10px 0;
		font-size: 20px;
		text-align: center;
		color: var(--color2);
	}

	.item-collect {
		position: absolute;
		top: 245px;
		right: 5px;
		width: 30px;
		height: 30px;
		border: 0;
		background: rgb(168, 168, 168);
		cursor: pointer;
	}

	.item-isCollect {
		background: rgb(255, 153, 0);
	}
</style>
