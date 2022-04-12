<template>
	<div id="Chating">
		<div class="myInfo">
			<img :src="userAvatar" />
			<p>{{ userNick }}</p>
		</div>
		<ul class="chatList-contain">
			<li v-for="item in chatList">{{ toTarget(item) }}</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {};
		},
		computed: {
			userNick() {
				return this.$store.state.userModule.nick;
			},
			userAvatar() {
				return this.$store.state.userModule.avatar;
			},
			chatList() {
				return this.$store.state.chatModule.chatList;
			},
		},
		methods: {
			toTarget(params) {
				let myID = this.$store.state.userModule.userID;
				let result;
				if (myID === params.talker1) {
					result = params.talker2;
				} else {
					result = params.talker1;
				}
				return result;
			},
		},
	};
</script>

<style scoped>
	#Chating {
		float: left;
		position: relative;
		width: 23%;
		height: 100%;
		box-sizing: border-box;
		border: 1px solid gray;
	}

	.myInfo {
		height: 80px;
		background: rgb(87, 80, 80);
	}

	.myInfo img {
		float: left;
		width: 60px;
		height: 60px;
		border-radius: 50%;
		margin: 10px;
	}

	.myInfo p {
		float: left;
		color: white;
		font-size: 18px;
	}

	.chatList-contain {
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.chatList-contain li {
		height: 80px;
		background: rgb(240, 239, 239);
	}

	.chatList-contain li:hover {
		background: rgb(100, 95, 95);
		cursor: pointer;
	}
</style>
