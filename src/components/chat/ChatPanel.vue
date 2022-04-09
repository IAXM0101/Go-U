<template>
	<div id="ChatPanel">
		<div class="titie">
			<div>{{ to }}</div>
		</div>
		<div class="showMsg" ref="showMsg">
			<div
				:class="{ [isMyMsg(item.from)]: true }"
				v-for="item in messageList"
			>
				<div class="avatarContain">
					<img :src="userAvatar" />
				</div>
				<span class="nickContain">{{ item.nick }}</span>
				<p
					class="msgContain"
					v-if="item.msgType == 'text'"
					v-html="item.content"
				></p>
			</div>
		</div>
		<div class="writeMsg">
			<span class="iconBtn">
				<i class="iconfont icon-biaoqing"></i>
			</span>
			<span class="iconBtn">
				<i class="iconfont icon-tupian" @click="sendImg"></i>
			</span>
			<input
				type="file"
				id="file"
				accept="image/png,image/jpeg"
				class="fileBtn"
			/>
			<pre
				class="send-textarea"
				contenteditable="true"
				ref="textarea"
			></pre>
			<span class="sendBtn" @click="sendText">发送</span>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import qs from "Qs";

	export default {
		data() {
			return {
				ws: null,
				messageList: [],
			};
		},
		computed: {
			to() {
				return this.$store.getters.getTalker;
			},
			userNick() {
				return this.$store.state.userModule.nick;
			},
			userAvatar() {
				return this.$store.state.userModule.avatar;
			},
		},
		methods: {
			isMyMsg(from) {
				return from === this.$store.state.userModule.userID
					? "myMsg"
					: "otherMsg";
			},
			sendText() {
				let content = this.$refs.textarea.innerHTML;

				if (content) {
					let data = {
						type: 1002,
						to: this.to,
						from: this.$store.state.userModule.userID,
						nick: this.$store.state.userModule.nick,
						msgType: "text",
						content,
						timestamp: new Date().getTime(),
					};
					this.ws.send(JSON.stringify(data));
					this.messageList.push(data);
					this.$refs.textarea.innerHTML = "";
				}
			},
			sendImg() {
				document.getElementById("file").click();
			},
			initWebSocket(wsurl, userID, password) {
				this.ws = new WebSocket(
					`ws://${wsurl}?userID=${userID}&password=${password}`
				);
				this.ws.onopen = this.openCallback.bind(this);
				this.ws.onmessage = this.messageCallback.bind(this);
				this.ws.onerror = this.errorCallback.bind(this);
				this.ws.onclose = this.closeCallback.bind(this);
			},
			openCallback(params) {
				let data = {
					type: 1001,
					from: this.$store.state.userModule.userID,
					nick: this.$store.state.userModule.nick,
				};
				this.ws.send(JSON.stringify(data));
			},
			messageCallback(params) {
				let data = JSON.parse(params.data);

				if (data.msgType === "text") {
					this.messageList.push(data);
				}
			},
			errorCallback(params) {
				console.log("errorCallback", params);
			},
			closeCallback(params) {
				console.log("closeCallback", params);
			},
		},
		created() {
			let self = this;
			let url = this.$store.state.serverAPI.chat;
			let userID = this.$store.state.userModule.userID;
			let password = this.$store.state.userModule.password;
			let params = {
				userID,
				password,
			};
			axios
				.post(url, qs.stringify(params))
				.then(function (res) {
					self.initWebSocket(res.data.result.ip, userID, password);
					self.$store.commit({
						type: "updateChatList",
						chatList: res.data.result.chatList,
					});
				})
				.catch(function (err) {
					console.log(err);
				});

			// document.onkeydown = function (ev) {

			// 		ev.preventDefault(); //禁用回车的默认事件
			// };

			let onCtrl = false;
			let onEnter = false;
			document.onkeydown = function (ev) {
				if (ev.keyCode == 13) {
					onCtrl = true;
				}
				if (ev.keyCode == 17) {
					onEnter = true;
				}

				if (onCtrl && onEnter) {
					console.log("555");
				}
			};
			document.onkeyup = function (ev) {
				if (ev.keyCode == 13) {
					onCtrl = false;
				}
				if (ev.keyCode == 17) {
					onEnter = false;
				}
			};
		},
		updated() {
			if (
				this.$refs.showMsg.children &&
				this.$refs.showMsg.children.length > 0
			) {
				this.$refs.showMsg.children[
					this.$refs.showMsg.children.length - 1
				].scrollIntoView();
			}
		},
	};
</script>

<style scoped>
	#ChatPanel {
		float: left;
		position: relative;
		width: 575px;
		height: 100%;
		box-sizing: border-box;
		border: 1px solid gray;
	}

	.titie {
		position: absolute;
		top: 0;
		width: 100%;
		height: 80px;
		box-sizing: border-box;
		border-bottom: 1px solid gray;
	}

	.showMsg {
		position: absolute;
		top: 80px;
		width: 100%;
		height: 360px;
		overflow-y: auto;
	}

	.writeMsg {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 160px;
		box-sizing: border-box;
		border-top: 1px solid gray;
	}

	.send-textarea {
		position: absolute;
		top: 30px;
		box-sizing: border-box;
		width: 575px;
		height: 100px;
		padding: 0 10px;
		margin: 0;
		outline: none;
		font-size: 15px;
		line-height: 20px;
		word-break: break-all;
		white-space: normal;
		overflow-y: auto;
	}

	.sendBtn {
		position: absolute;
		right: 20px;
		bottom: 2px;
		padding: 1px 10px;
		border: 1px solid gray;
		cursor: pointer;
	}

	.iconBtn {
		float: left;
		box-sizing: border-box;
		padding: 5px 10px;
	}

	.iconBtn i {
		font-size: 20px;
	}

	.fileBtn {
		visibility: hidden;
	}

	.otherMsg,
	.myMsg {
		float: left;
		position: relative;
		width: 100%;
		margin: 5px 0;
	}

	.otherMsg > * {
		float: left;
	}

	.myMsg > * {
		float: right;
	}

	.avatarContain {
		position: relative;
		width: 10%;
		height: 100%;
		padding: 0 10px;
		box-sizing: border-box;
	}

	.avatarContain img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.nickContain {
		position: relative;
		width: 90%;
		font-size: 14px;
	}

	.myMsg .nickContain {
		text-align: right;
	}

	.msgContain {
		position: relative;
		max-width: 80%;
		word-break: break-all;
		border-radius: 8px;
		box-sizing: border-box;
		padding: 5px;
		background: rgb(96, 234, 244);
		margin: 5px 0;
	}

	.otherMsg .msgContain::before {
		position: absolute;
		content: "";
		left: -16px;
		top: 8px;
		border: 8px solid rgb(96, 234, 244);
		border-right: 8px solid rgb(96, 234, 244);
		border-top: 8px solid #ffffff00;
		border-left: 8px solid #ffffff00;
		border-bottom: 8px solid #ffffff00;
	}

	.myMsg .msgContain::before {
		position: absolute;
		content: "";
		right: -16px;
		top: 8px;
		border: 8px solid rgb(96, 234, 244);
		border-right: 8px solid #ffffff00;
		border-top: 8px solid #ffffff00;
		border-left: 8px solid rgb(96, 234, 244);
		border-bottom: 8px solid #ffffff00;
	}
</style>
