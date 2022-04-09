<template>
	<div id="UserInfo">
		<div class="info-contain">
			<div>
				<div class="title">ID</div>
				<div class="content">{{ formdata.userID }}</div>
			</div>
			<div>
				<div class="title">账号</div>
				<div class="content">
					<input
						class="text-input"
						type="text"
						v-model="formdata.account"
					/>
				</div>
			</div>
			<div>
				<div class="title">昵称</div>
				<div class="content">
					<input
						class="text-input"
						type="text"
						v-model="formdata.nick"
					/>
				</div>
			</div>
			<div>
				<div class="title">性别</div>
				<div class="content">
					<input
						class="radio-input"
						type="radio"
						value="1"
						v-model="formdata.sex"
					/>
					<label class="radio-label">男</label>
					<input
						class="radio-input"
						type="radio"
						value="0"
						v-model="formdata.sex"
					/>
					<label class="radio-label">女</label>
					<input
						class="radio-input"
						type="radio"
						value="2"
						v-model="formdata.sex"
					/>
					<label class="radio-label">保密</label>
				</div>
			</div>
			<div>
				<div class="title">生日</div>
				<div class="content">
					<input
						class="text-input"
						type="date"
						v-model="formdata.birthday"
					/>
				</div>
			</div>
			<div>
				<button class="commit-btn" @click="commit">提交</button>
				<button class="restore-btn" @click="reset">还原</button>
			</div>
		</div>
		<div class="avatar-contain">
			<div class="img-contain">
				<img
					src="https://tse1-mm.cn.bing.net/th/id/R-C.7b9f3020f3c91e5f76b4df2e7ea25de1?rik=deUQMVk41dSjNQ&riu=http%3a%2f%2fscimg.jianbihuadq.com%2f202007%2f2020071213324342.jpg&ehk=2kp7%2fRJpUGhKSaZH2j2g8lKPBohMH9veb%2f4AuNFaemc%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1"
					width="100%"
					height="100%"
				/>
			</div>
			<button @click="uploadImg">上传图片</button>
			<input type="file" ref="fileInput" />
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from "vuex";
	export default {
		data() {
			return {
				formdata: {
					userID: "",
					account: "",
					nick: "",
					sex: "",
					birthday: "",
				},
			};
		},
		computed: {
			...mapGetters(["getUserInfo"]),
		},
		methods: {
			...mapActions({
				modify_userInfo: "modify_userInfo",
			}),
			commit() {
				let data = this.isModify();

				if (data) {
					console.log(data);
					this.modify_userInfo(data);
				}
			},
			reset() {
				for (const key in this.formdata) {
					if (Object.hasOwnProperty.call(this.formdata, key)) {
						this.formdata[key] = this.getUserInfo[key];
					}
				}
			},
			uploadImg() {
				this.$refs.fileInput.click();

				let file = this.$refs.fileInput.files[0];

				var reader = new FileReader();
				reader.readAsText(file, "utf-8");
				reader.onload = function () {
					console.log(reader.result);
				};
			},
			isModify() {
				let flag = false;
				let data = {};
				for (const key in this.formdata) {
					if (Object.hasOwnProperty.call(this.formdata, key)) {
						if (this.formdata[key] !== this.getUserInfo[key]) {
							flag = true;
							data[key] = this.formdata[key];
						}
					}
				}
				return flag ? data : false;
			},
		},
		created() {
			this.reset();
		},
		beforeRouteLeave(to, from, next) {
			if (this.isModify()) {
				let flag = confirm("您有数据未保存，是否离开");
				if (flag) {
					next();
				}
			} else {
				next();
			}
		},
	};
</script>

<style scoped>
	#UserInfo {
		position: relative;
		width: 800px;
		margin: 0 auto;
		overflow: hidden;
	}

	.info-contain {
		float: left;
		position: relative;
		width: 480px;
	}

	.info-contain > * {
		position: relative;
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
		height: 35px;
		box-sizing: border-box;
	}

	.content .radio-input {
		float: left;
		width: 30px;
		height: 20px;
		margin: 20px 0 0;
	}

	.content .radio-label {
		float: left;
		font-size: 16px;
		margin: 0 10px 0 0;
	}

	.commit-btn,
	.restore-btn {
		position: relative;
		width: 150px;
		height: 40px;
		border: none;
		cursor: pointer;
		background: var(--bgcolor);
	}

	.commit-btn {
		margin: 10px 0 0 90px;
	}

	.commit-btn:hover {
		background-color: aquamarine;
		color: rgb(70, 70, 70);
	}

	.avatar-contain {
		float: left;
		position: relative;
		width: 320px;
		height: 320px;
	}

	.img-contain {
		position: relative;
		width: 150px;
		height: 150px;
		margin: 0 auto;
	}

	.img-contain img {
		border-radius: 50%;
	}

	.avatar-contain button {
		display: block;
		margin: 20px auto;
	}

	.avatar-contain input {
		visibility: hidden;
	}
</style>
