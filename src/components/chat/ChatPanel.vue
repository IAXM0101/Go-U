<template>
	<div id="ChatPanel">
		<!-- 顶部 -->
		<div class="titie">
			<div class="title-avatar">
				<img :src="getChatAvatar" class="title-avatar-img" />
			</div>
			<div>{{ getTalker }}</div>
		</div>

		<!-- 消息面板 -->
		<div class="showMsg" ref="showMsg">
			<!-- 消息 -->
			<div
				:class="{ [isMyMsg(item.from)]: true }"
				v-for="(item, index) in messageList"
				:key="'msg' + index"
			>
				<!-- 头像 -->
				<div class="avatarContain">
					<img :src="userAvatar(item.from)" />
				</div>
				<!-- 昵称 -->
				<span class="nickContain">{{ item.nick }}</span>
				<!-- 消息 -->
				<p
					class="msgContain"
					v-if="item.msgType == 'text'"
					v-html="item.content"
				></p>
			</div>
		</div>

		<!-- 输入面板 -->
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
	import { mapGetters, mapActions } from "vuex";

	export default {
		data() {
			return {
				ws: null,
				messageList: [],
			};
		},
		computed: {
			...mapGetters({
				getUserID: "getUserID",
				getNick: "getNick",
				getAvatar: "getAvatar",
				getTalker: "getTalker",
				getChatAvatar: "getChatAvatar",
			}),
		},
		methods: {
			...mapActions({
				get_chatList: "get_chatList",
			}),
			isMyMsg(from) {
				return from === this.getUserID ? "myMsg" : "otherMsg";
			},
			userAvatar(from) {
				return from === this.getUserID
					? this.getAvatar
					: this.getChatAvatar;
			},
			sendText() {
				let content = this.$refs.textarea.innerHTML;

				if (content) {
					let data = {
						type: 1002,
						to: this.getTalker,
						from: this.getUserID,
						nick: this.getNick,
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
			initWebSocket(wsurl) {
				this.ws = new WebSocket(`ws://${wsurl}?userID=${this.getUserID}`);
				this.ws.onopen = this.openCallback.bind(this);
				this.ws.onmessage = this.messageCallback.bind(this);
				this.ws.onerror = this.errorCallback.bind(this);
				this.ws.onclose = this.closeCallback.bind(this);
			},
			openCallback(params) {
				console.log("openCallback", params);
				let data = {
					type: 1001,
					from: this.getUserID,
					nick: this.getNick,
				};
				this.ws.send(JSON.stringify(data));
			},
			messageCallback(params) {
				console.log("messageCallback", params);

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
			setEnterFunction() {
				let self = this;

				document.onkeydown = function (ev) {
					// 实现 ctrl + enter 换行，有bug，需要用两次才能换行
					if (ev.ctrlKey && ev.keyCode === 13) {
						ev.preventDefault(); //禁用回车的默认事件
						self.$refs.textarea.innerHTML += "<br/>";
						if (window.getSelection) {
							self.$refs.textarea.focus(); //解决ff不获取焦点无法定位问题
							let range = window.getSelection(); //创建range
							range.selectAllChildren(self.$refs.textarea); //range 选择obj下所有子内容
							range.collapseToEnd(); //光标移至最后
						}
						return;
					}

					if (ev.keyCode === 13) {
						ev.preventDefault(); //禁用回车的默认事件
						self.sendText();
					}
				};
			},
		},
		created() {
			let self = this;

			this.get_chatList()
				.then((data) => {
					self.initWebSocket(data.ip);
				})
				.catch((err) => {
					console.log(err);
				});

			this.setEnterFunction();
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
		width: 580px;
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

	.title-avatar {
		float: left;
		width: 60px;
		height: 60px;
		margin: 6px;
		border: 4px solid rgb(114, 114, 114);
		border-radius: 5px;
	}

	.title-avatar-img {
		width: 100%;
		height: 100%;
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
		padding: 7px;
		background: rgb(96, 234, 244);
		margin: 5px 0;
		font-size: 17px;
	}

	.otherMsg .msgContain::before {
		position: absolute;
		content: "";
		left: -16px;
		top: 7px;
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
		top: 7px;
		border: 8px solid rgb(96, 234, 244);
		border-right: 8px solid #ffffff00;
		border-top: 8px solid #ffffff00;
		border-left: 8px solid rgb(96, 234, 244);
		border-bottom: 8px solid #ffffff00;
	}
</style>
