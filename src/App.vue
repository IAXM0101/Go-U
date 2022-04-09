<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
	export default {
		name: "App",
		created() {
			let cartList = JSON.parse(sessionStorage.getItem("cartList"));
			if (cartList && cartList.length > 0) {
				this.$store.commit({
					type: "UPDATE_CART_LIST",
					cartList: JSON.parse(sessionStorage.getItem("cartList")),
				});
			}

			let token = sessionStorage.getItem("token");
			let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
			if (token) {
				this.$store.commit("addAllInfo", {
					token,
					userInfo,
				});
			}
		},
	};
</script>

<style>
	@import url("./assets/css/reset.css");
	@import url(//at.alicdn.com/t/font_3168159_cyouc5kbwur.css);

	body {
		/* 常用颜色 */
		--color2: rgb(255, 120, 0);
		--color3: rgb(0, 130, 252);
		--color4: rgb(180, 180, 180);
		--bgcolor: #f0f3ef;
	}

	/* 页面级别组件通用 */
	#app,
	#app > * {
		position: relative;
		margin: 0 auto;
		overflow: hidden;
	}

	/* 大容器通用 */
	.contain {
		position: relative;
		width: 1250px;
		margin: 0 auto;
		box-sizing: border-box;
		overflow: hidden;
	}

	/* 清除浮动 */
	.clearfix::after {
		content: "";
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}
	.clearfix {
		zoom: 1;
	}
</style>
