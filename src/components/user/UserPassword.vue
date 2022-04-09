<template>
	<div id="UserPassword">
		<div>
			<div class="title">新的密码</div>
			<div class="content">
				<input class="text-input" type="password" v-model="password" />
			</div>
		</div>
		<div>
			<div class="title">确认密码</div>
			<div class="content">
				<input class="text-input" type="password" v-model="rewrite" />
			</div>
		</div>
		<div>
			<div class="empty"></div>
			<div class="tip" v-show="canTip">两次输入不相同</div>
		</div>
		<div>
			<button class="commit-btn" @click="commit">提交</button>
		</div>
	</div>
</template>

<script>
	import { mapActions } from "vuex";
	export default {
		data() {
			return {
				password: "",
				rewrite: "",
			};
		},
		computed: {
			canTip() {
				return this.password &&
					this.rewrite &&
					this.password !== this.rewrite
					? true
					: false;
			},
		},
		methods: {
			...mapActions({
				modify_password: "modify_password",
			}),
			commit() {
				if (this.password === this.rewrite) {
					this.modify_password(this.password)
						.then(() => {
							alert("修改成功！");
							this.password = "";
							this.rewrite = "";
						})
						.catch(() => {
							console.log(err);
						});
				}
			},
		},
	};
</script>

<style scoped>
	#UserPassword {
		position: relative;
		width: 480px;
		margin: 0 auto;
		overflow: hidden;
	}

	.title {
		float: left;
		width: 160px;
		padding-right: 20px;
		line-height: 60px;
		text-align: right;
		font-weight: 600;
	}

	.empty {
		float: left;
		width: 160px;
		height: 30px;
		padding-right: 20px;
	}

	.tip {
		color: red;
	}

	.content {
		float: left;
		width: 300px;
		height: 60px;
		line-height: 60px;
		text-align: left;
	}

	.content .text-input {
		width: 200px;
		height: 28px;
		box-sizing: border-box;
	}

	.commit-btn {
		position: relative;
		width: 150px;
		height: 40px;
		border: none;
		margin: 10px 0 0 160px;
		cursor: pointer;
		background: var(--bgcolor);
	}

	.commit-btn:hover {
		background-color: aquamarine;
		color: rgb(70, 70, 70);
	}
</style>
