<template>
	<div class="EditAddress">
		<div class="panel">
			<div class="header">
				<p class="title">新增收货地址</p>
				<div class="close-btn" @click="closeClick">X</div>
			</div>
			<div class="info">
				<div class="row">
					<label class="label">
						<span class="star">*</span>收件人
					</label>
					<input type="text" class="input" v-model="name" />
				</div>
				<div class="row">
					<label class="label">
						<span class="star">*</span>所在地区
					</label>
					<input type="text" class="input" v-model="region" />
				</div>
				<div class="row">
					<label class="label">
						<span class="star">*</span>详细地址
					</label>
					<input type="text" class="input" v-model="addr" />
				</div>
				<div class="row">
					<label class="label">
						<span class="star">*</span>手机
					</label>
					<input type="text" class="input" v-model="phone" />
				</div>
				<div class="row">
					<label class="label">电子邮箱</label>
					<input type="text" class="input" v-model="email" />
				</div>
				<div class="row">
					<label class="label">地址别名</label>
					<input type="text" class="input" v-model="nickAddr" />
					<span class="sticky" @click="setNickAddr('家')"> 家 </span>
					<span class="sticky" @click="setNickAddr('公司')">
						公司
					</span>
					<span class="sticky" @click="setNickAddr('学校')">
						学校
					</span>
					<span class="sticky" @click="setNickAddr('父母家')">
						父母家
					</span>
				</div>
				<div class="row" v-if="isCreate">
					<label class="label"></label>
					<button
						:class="this.canSend ? 'submit-btn' : 'ban-submit-btn'"
						@click="submit"
					>
						新增收货信息
					</button>
				</div>
				<div class="row" v-else>
					<label class="label"></label>
					<button
						:class="this.canSend ? 'submit-btn' : 'ban-submit-btn'"
						@click="editClick"
					>
						修改收货信息
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions } from "vuex";
	export default {
		data() {
			return {
				isCreate: true,
				addrID: 0,
				name: "",
				region: "",
				addr: "",
				phone: "",
				email: "",
				nickAddr: "",
			};
		},
		computed: {
			canSend() {
				return (
					this.name !== "" &&
					this.region !== "" &&
					this.addr !== "" &&
					this.phone !== ""
				);
			},
		},
		methods: {
			...mapActions({
				add_addrItem: "add_addrItem",edit_addrItem:"edit_addrItem"
			}),
			closeClick() {
				this.$parent.canEditAddress = false;
				this.clearInput();
			},
			setNickAddr(val) {
				this.nickAddr = val;
			},
			submit() {
				let self = this;
				if (this.canSend) {
					this.add_addrItem({
						name: this.name,
						region: this.region,
						addr: this.addr,
						phone: this.phone,
						email: this.email,
						nickAddr: this.nickAddr,
					})
						.then(() => {
							alert("添加成功！");
							self.$parent.canEditAddress = false;
							self.clearInput();
						})
						.catch(() => {
							console.log(err);
						});
				}
			},
			editClick() {
				let self = this;
				if (this.canSend) {
					this.edit_addrItem({
						addrID: this.addrID,
						name: this.name,
						region: this.region,
						addr: this.addr,
						phone: this.phone,
						email: this.email,
						nickAddr: this.nickAddr,
					})
						.then(() => {
							alert("修改成功！");
							self.$parent.canEditAddress = false;
							self.clearInput();
						})
						.catch(() => {
							console.log(err);
						});
				}
			},
			clearInput() {
				this.addrID = "";
				this.name = "";
				this.region = "";
				this.addr = "";
				this.phone = "";
				this.email = "";
				this.nickAddr = "";
			},
		},
	};
</script>

<style scoped>
	.EditAddress {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.2);
	}

	.panel {
		position: relative;
		margin: 60px auto 0;
		width: 800px;
		background: rgb(255, 255, 255);
	}

	.header {
		position: relative;
		height: 50px;
		background: rgb(76, 76, 76);
	}

	.title {
		padding: 0 10px;
		font-size: 18px;
		line-height: 50px;
		color: white;
	}

	.close-btn {
		position: absolute;
		top: 0;
		right: 0;
		width: 50px;
		height: 50px;
		line-height: 50px;
		text-align: center;
		cursor: pointer;
		color: white;
	}

	.close-btn:hover {
		background: rgb(145, 145, 145);
	}

	.info {
		box-sizing: border-box;
		padding: 20px;
		overflow: hidden;
	}

	.row {
		position: relative;
		margin: 20px;
	}

	.label {
		display: inline-block;
		width: 120px;
		text-align: right;
		padding: 0 10px;
		font-size: 15px;
	}

	.star {
		color: red;
	}

	.star::after {
		content: " ";
	}

	.input {
		width: 250px;
		height: 30px;
	}

	.sticky {
		border: 1px solid;
		padding: 4px;
		border-radius: 5px;
		cursor: pointer;
		display: inline-block;
	}

	.sticky:hover {
		background: rgb(152, 152, 152);
		color: white;
	}

	.submit-btn {
		width: 140px;
		height: 35px;
		color: white;
		background: rgb(214, 41, 41);
		border: none;
		cursor: pointer;
	}

	.submit-btn:hover {
		background: rgb(255, 83, 83);
	}

	.ban-submit-btn {
		width: 140px;
		height: 35px;
		color: white;
		background: rgb(175, 175, 175);
		border: none;
	}
</style>