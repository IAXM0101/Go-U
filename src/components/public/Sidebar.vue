<template>
	<div id="Sidebar">
		<!-- 头像 -->
		<div v-if="isLogin" @click="logout">
			<div class="avatar">
				<img :src="getAvatar" width="100%" height="100%" />
			</div>
		</div>
		<!-- 登录 -->
		<router-link to="/login" tag="div" v-else id="toLogin">
			<div>登</div>
			<div>录</div>
		</router-link>
		<!-- 个人 -->
		<router-link to="/userInfo" tag="div" v-if="!hideUser">
			<i class="iconfont icon-yonghu"></i>
		</router-link>
		<!-- 购物车 -->
		<router-link to="/cart" tag="div" v-if="!hideCart">
			<i class="iconfont icon-gouwuche"></i>
			<div class="msg" :class="{ hide: cartCount }">{{ cartCount }}</div>
		</router-link>
		<!-- 收藏 -->
		<!-- <router-link to="/cart" tag="div" v-if="!hideCollect">
			<i class="iconfont icon-shoucang"></i>
		</router-link> -->
		<!-- 聊天 -->
		<router-link to="/chat" tag="div" v-if="!hideChat">
			<i class="iconfont icon-duihua"></i>
			<div class="msg" :class="{ hide: chatCount }">{{ chatCount }}</div>
		</router-link>
		<!-- 主页 -->
		<router-link to="/" tag="div" v-if="!hideHome">
			<i class="iconfont icon-zhuye"></i>
		</router-link>
		<!-- 置顶 -->
		<div v-if="!hideToTop" @click="toTopFn">
			<i class="iconfont icon-zhiding"></i>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	export default {
		props: [
			"hideUser",
			"hideCart",
			"hideChat",
			"hideCollect",
			"hideHome",
			"hideToTop",
		],
		computed: {
			...mapGetters(["isLogin", "getAvatar", "cartCount", "chatCount"]),
		},
		methods: {
			logout() {
				this.$store.commit("mutation_remove_userInfo");
				this.$store.commit("mutation_clear_cartList");
				this.$router.push({ name: "login" });
			},
			toTopFn() {
				window.scrollTo(0, 0);
			},
		},
	};
</script>

<style scoped>
	#Sidebar {
		position: fixed;
		right: 0;
		bottom: 50px;
		width: 50px;
		z-index: 100;
	}

	#Sidebar > * {
		float: right;
		position: relative;
		box-sizing: border-box;
		width: 50px;
		height: 50px;
		margin-top: 2px;
		background: rgb(231, 231, 231);
		text-align: center;
	}

	#Sidebar > *:hover {
		cursor: pointer;
		background: rgb(182, 182, 182);
	}

	#Sidebar i {
		font-size: 25px;
		line-height: 50px;
	}

	.avatar {
		float: left;
		margin: 5px;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		overflow: hidden;
		background: white;
	}

	#toLogin {
		height: 80px;
		background: var(--color2);
		padding: 10px 0;
		color: white;
		font-size: 15px;
		line-height: 30px;
	}

	#toLogin:hover {
		background: rgb(255, 155, 68);
	}

	.msg {
		position: absolute;
		display: inline-block;
		height: calc(var(width));
		right: 0;
		background: var(--color2);
		border-radius: 35%;
		font-size: 9px;
		color: white;
		padding: 1px 4px;
		visibility: hidden;
	}

	.hide {
		visibility: visible;
	}
</style>
