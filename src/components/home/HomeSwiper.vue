<template>
	<div id="HomeSwiper">
		<el-carousel height="500px">
			<el-carousel-item v-for="item in imgList" :key="'HomeSwiper' + item">
				<img :src="item" width="100%" height="100%" />
			</el-carousel-item>
		</el-carousel>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				imgList: [
					"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/dd741adcce9417d72ea4c1a6dfcc96e2.jpg?thumb=1&w=1533&h=575&f=webp&q=90",
					"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a03b1ee5d7bd6f09c29d25286662249c.jpg?w=2452&h=920",
					"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b3a1561bd0986cd71ca726d3add6a13d.jpg?thumb=1&w=1533&h=575&f=webp&q=90",
				],
			};
		},
	};
</script>

<style scoped>
	#HomeSwiper {
		float: left;
		position: relative;
		width: 1000px;
		height: 500px;
	}
</style>
