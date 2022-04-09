<template>
	<div id="Register">
		<div class="header">注册</div>
		<div class="main">
			<input type="text" v-model="nick" placeholder="输入昵称" />
			<input type="text" v-model="account" placeholder="输入账号" />
			<input type="password" v-model="password" placeholder="输入密码" />
			<input
				type="password"
				v-model="againPassword"
				placeholder="确认密码"
			/>
			<p>
				<router-link to="/login" tag="span"> 《 返回登录 </router-link>
			</p>
			<button @click="register">注册</button>
		</div>
	</div>
</template>

<script>
	import qs from "Qs";
	export default {
		data() {
			return {
				nick: "",
				account: "",
				password: "",
				againPassword: "",
			};
		},
		methods: {
			register() {
				if (
					this.nick !== "" &&
					this.account !== "" &&
					this.password !== "" &&
					this.password === this.againPassword
				) {
					let self = this;
					this.$axios
						.post(
							this.$store.state.serverAPI.register,
							qs.stringify({
								nick: this.nick,
								account: this.account,
								password: this.password,
							})
						)
						.then(function (res) {})
						.catch(function (err) {
							console.log(err);
						});
				}
			},
		},
	};
</script>

<style scoped>
	#Register {
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
		color: rgb(70, 97, 252);
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
