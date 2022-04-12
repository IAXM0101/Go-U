<template>
	<div id="Login">
		<div class="header">登录</div>
		<div class="main">
			<input type="text" v-model="formdata.account" placeholder="账号" />
			<input
				type="password"
				v-model="formdata.password"
				placeholder="密码"
			/>
			<p>
				<router-link to="/register" tag="span">
					没有账号？立即注册 》
				</router-link>
			</p>
			<button @click="loginCilck">登录</button>
		</div>
	</div>
</template>

<script>
	import { mapActions } from "vuex";
	export default {
		data() {
			return {
				formdata: {
					account: "sys",
					password: "123",
				},
			};
		},
		methods: {
			...mapActions({
				sendLogin: "send_login",
				getCart: "get_cartList",
			}),
			loginCilck() {
				let self = this;

				this.sendLogin({
					data: this.formdata,
				})
					.then(() => {
						if (self.$route.query.redirect) {
							self.$router.push({ path: self.$route.query.redirect });
						} else {
							self.$router.push({ path: "/" });
						}

						this.getCart({
							api: this.$store.state.serverAPI.getCart,
							data: this.formdata,
						});
					})
					.catch((err) => {
						console.log(err);
					});
			},
		},
	};
</script>

<style scoped>
	#Login {
		width: 400px;
		padding-bottom: 30px;
	}

	.header {
		height: 40px;
		background: var(--color3);
		line-height: 40px;
		font-size: 24px;
		text-align: center;
		color: white;
	}

	.main input {
		display: block;
		margin: 30px auto 0;
		width: 260px;
		height: 30px;
	}

	.main p {
		display: block;
		margin: 10px auto;
		padding: 0;
		width: 260px;
		height: 25px;
	}

	.main p span {
		float: right;
	}

	.main p span {
		float: right;
		color: white;
		font-size: 14px;
	}

	.main button {
		display: block;
		margin: 0 auto;
		width: 260px;
		height: 30px;
		background: var(--color3);
		color: white;
		border: 0;
	}

	.main p span:hover,
	.main button:hover {
		cursor: pointer;
		opacity: 0.8;
	}
</style>
