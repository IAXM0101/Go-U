<template>
	<ul id="UserBind">
		<li>
			<div class="text-contain">
				<i class="iconfont icon-QQ"></i>
			</div>
			<div class="text-contain">
				<span>绑定QQ</span>
			</div>
			<div class="text-contain">
				<b v-if="userInfo.qq">已绑定</b>
			</div>
			<div class="btn-contain">
				<b v-if="userInfo.qq">解绑</b>
				<b v-else>绑定</b>
			</div>
			<div class="btn-contain">
				<span>{{ userInfo.qq }}</span>
			</div>
		</li>
		<li>
			<div class="text-contain">
				<i class="iconfont icon-weixin"></i>
			</div>
			<div class="text-contain">
				<span>绑定微信</span>
			</div>
			<div class="text-contain">
				<b v-if="userInfo.wechat">已绑定</b>
			</div>
			<div class="btn-contain">
				<b v-if="userInfo.wechat">解绑</b>
				<b v-else>绑定</b>
			</div>
			<div class="btn-contain">
				<span>{{ userInfo.wechat }}</span>
			</div>
		</li>
		<li>
			<div class="text-contain">
				<i class="iconfont icon-youxiang"></i>
			</div>
			<div class="text-contain">
				<span>绑定邮箱</span>
			</div>
			<div class="text-contain">
				<b v-if="userInfo.email">已绑定</b>
			</div>
			<div class="btn-contain">
				<b v-if="userInfo.email">解绑</b>
				<b v-else>绑定</b>
			</div>
			<div class="btn-contain">
				<span>{{ userInfo.email }}</span>
			</div>
		</li>
		<li>
			<div class="text-contain">
				<i class="iconfont icon-shouji4"></i>
			</div>
			<div class="text-contain">
				<span>绑定手机</span>
			</div>
			<div class="text-contain">
				<b v-if="userInfo.phone">已绑定</b>
			</div>
			<div class="btn-contain">
				<b v-if="userInfo.phone">解绑</b>
				<b v-else>绑定</b>
			</div>
			<div class="btn-contain">
				<span>{{ userInfo.phone }}</span>
			</div>
		</li>
	</ul>
</template>

<script>
	import { mapGetters } from "vuex";
	export default {
		data() {
			return {};
		},
		computed: {
			...mapGetters({
				userInfo: "getUserInfo",
			}),
		},
		methods: {},
	};
</script>

<style scoped>
	#UserBind {
		position: relative;
		width: 680px;
		margin: 0 auto;
		overflow: hidden;
	}

	#UserBind li {
		height: 50px;
		margin: 15px 10px;
		background: var(--bgcolor);
	}

	.text-contain {
		float: left;
		margin-left: 10px;
	}

	.text-contain i {
		font-size: 20px;
		line-height: 50px;
	}

	.text-contain span {
		font-size: 15px;
		line-height: 50px;
	}

	.text-contain b {
		font-size: 15px;
		line-height: 50px;
		color: #71b247;
	}

	.btn-contain {
		float: right;
		margin-right: 10px;
	}

	.btn-contain span {
		font-size: 15px;
		line-height: 50px;
		padding-right: 10px;
		border-right: 2px solid rgb(255, 255, 255);
	}

	.btn-contain b {
		font-size: 15px;
		line-height: 50px;
		color: #71b247;
		cursor: pointer;
	}
</style>
