<template>
	<div id="UserForm">
		<ul class="nav">
			<router-link :to="{ name: 'userInfo' }" tag="li">
				个人信息
			</router-link>
			<router-link :to="{ name: 'userBind' }" tag="li">
				账号绑定
			</router-link>
			<router-link :to="{ name: 'userPassword' }" tag="li">
				修改密码
			</router-link>
			<router-link :to="{ name: 'userAddress' }" tag="li">
				收货地址
			</router-link>
			<hr />
			<router-link :to="{ name: 'cart' }" tag="li">
				购物车
			</router-link>
			<router-link to="" tag="li">
				订单中心
			</router-link>
		</ul>

		<div class="form">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	export default {};
</script>

<style scoped>
	#UserForm {
		position: relative;
	}

	.nav {
		float: left;
		position: relative;
		width: 200px;
		height: 100%;
		padding: 20px 0;
		box-sizing: border-box;
		background: rgb(255, 255, 255);
	}

	.nav li {
		text-align: center;
		line-height: 60px;
		cursor: pointer;
	}

	.nav li:hover {
		background: rgb(182, 170, 170);
		color: white;
	}

	.form {
		float: left;
		position: relative;
		width: 1000px;
		height: 100%;
		padding: 20px 0;
		margin: 0 25px;
		box-sizing: border-box;
		background: rgb(255, 255, 255);
	}

	hr{
		border: 2px solid var(--bgcolor);
	}
</style>
