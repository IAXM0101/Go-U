<template>
	<div id="GoodsDetail">
		<div class="imgs-contain">
			<img :src="item" v-for="item in goodsDetail.imgList" />
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			goodsDetail: {
				type: Object,
				default: () => {
					imgList: [];
				},
			},
		},
	};
</script>

<style scoped>
	#GoodsDetail {
		overflow: hidden;
	}
	.imgs-contain img {
		width: 100%;
		float: left;
	}
</style>
