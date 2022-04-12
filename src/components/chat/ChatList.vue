<template>
	<div class="ChatList">
		<!-- 聊天列表 -->
		<div class="add-chat-contain">
			<input type="text" class="input" />
			<div class="button">+</div>
		</div>

		<!-- 聊天列表 -->
		<ul class="chatList-contain">
			<li
				v-for="(item, index) in chatList"
				:class="[{ check: isCurChat(item) }]"
				@click="checkChatTarget(item)"
			>
				<div class="avatar">
					<img :src="getAvatar(item)" width="100%" height="100%" />
				</div>
				<div class="userid">
					{{ getID(item) }}
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import { mapGetters,mapMutations } from "vuex";
	export default {
		data() {
			return {};
		},
		computed: {
			...mapGetters({
				userID: "getUserID",
				getTalker: "getTalker",
			}),
			chatList() {
				return this.$store.state.chatModule.chatList;
			},
		},
		methods: {
			...mapMutations({
				mutation_check_chatTarget:"mutation_check_chatTarget"
			}),
			getID(params) {
				let result;
				if (this.userID === params.talker1) {
					result = params.talker2;
				} else {
					result = params.talker1;
				}
				return result;
			},
			getAvatar(params) {
				let result;
				if (this.userID === params.talker1) {
					result = params.avatar2;
				} else {
					result = params.avatar1;
				}
				return result;
			},
			isCurChat(params) {
				let result = false;
				if (this.userID === params.talker1) {
					if (this.getTalker === params.talker2) {
						result = true;
					}
				} else {
					if (this.getTalker === params.talker1) {
						result = true;
					}
				}
				return result;
			},
			checkChatTarget(item) {
				this.mutation_check_chatTarget(item)
			},
		},
	};
</script>

<style scoped>
	.ChatList {
		float: left;
		position: relative;
		width: 250px;
		height: 100%;
		box-sizing: border-box;
		border: 1px solid gray;
		border-right: none;
	}

	.add-chat-contain {
		position: relative;
		height: 40px;
		background: rgb(67, 67, 67);
	}

	.add-chat-contain .input {
		position: relative;
		width: 200px;
		height: 30px;
		box-sizing: border-box;
		margin: 5px 6px;
		float: left;
	}

	.add-chat-contain .button {
		position: relative;
		width: 30px;
		height: 30px;
		font-size: 18px;
		background: rgb(234, 234, 234);
		float: left;
		line-height: 30px;
		text-align: center;
		margin: 5px 0;
		cursor: pointer;
	}

	.add-chat-contain .button:hover {
		background: rgb(182, 182, 182);
	}

	.chatList-contain {
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.chatList-contain li {
		height: 70px;
		border-bottom: 1px solid;
		overflow: hidden;
	}

	.chatList-contain li.check,
	.chatList-contain li:hover {
		background: #c0c0c0;
		cursor: pointer;
		color: white;
	}

	.chatList-contain .avatar {
		float: left;
		width: 50px;
		height: 50px;
		margin: 6px;
		border: 4px solid rgb(114, 114, 114);
		border-radius: 5px;
	}

	.chatList-contain .userid {
		float: left;
		margin: 6px;
	}
</style>
