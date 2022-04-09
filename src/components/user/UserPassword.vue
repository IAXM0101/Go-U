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
				<input class="text-input" type="password" v-model="password" />
			</div>
		</div>
		<div>
			<button class="commit-btn" @click="commit">提交</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				password: "",
			};
		},
		methods: {},
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
