<template>
	<div id="UserAddress">
		<div class="header">
			<button @click="popup">新增收货地址</button>
			<span>
				您已创建
				<i>{{ addrCount }}</i>
				个收货地址，最多创建25个
			</span>
		</div>
		<ul class="list">
			<li v-for="(item, index) in addrList" :key="item.addrID">
				<div class="operate-contain">
					<input type="radio" :value="index" v-model="defaultAddr" />
					<label>默认地址</label>

					<span v-show="item.nickAddr" v-text="item.nickAddr"></span>
				</div>
				<div class="form">
					<div>
						<div class="title">收货人</div>
						<div class="content" v-text="item.name"></div>
					</div>
					<div>
						<div class="title">所在地区</div>
						<div class="content" v-text="item.region"></div>
					</div>
					<div>
						<div class="title">地址</div>
						<div class="content" v-text="item.addr"></div>
					</div>
					<div>
						<div class="title">手机</div>
						<div class="content" v-text="item.phone"></div>
					</div>
					<div>
						<div class="title">电子邮箱</div>
						<div class="content" v-text="item.email"></div>
					</div>
				</div>
				<div class="btn-contain">
					<button @click="editAddrClick(index)">编辑</button>
					<button @click="delAddrClick(item.addrID)">删除</button>
				</div>
			</li>
		</ul>
		<EditAddress v-show="canEditAddress" ref="editAddress"></EditAddress>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from "vuex";
	import EditAddress from "@/components/user/EditAddress";
	export default {
		data() {
			return {
				canEditAddress: false,
			};
		},
		computed: {
			...mapGetters({
				addrList: "getAddrList",
				getDefaultAddr: "getDefaultAddr",
				addrCount: "getAddrCount",
			}),
			defaultAddr: {
				get() {
					return this.getDefaultAddr;
				},
				set(val) {
					this.edit_default_addr(this.addrList[val].addrID);
				},
			},
		},
		components: {
			EditAddress,
		},
		methods: {
			...mapActions({
				get_addrList: "get_addrList",
				del_addrItem: "del_addrItem",
				edit_default_addr: "edit_default_addr",
			}),
			popup() {
				this.$refs.editAddress.isCreate = true;
				this.canEditAddress = true;
			},
			editAddrClick(idx) {
				for (const key in this.addrList[idx]) {
					if (Object.hasOwnProperty.call(this.addrList[idx], key)) {
						this.$refs.editAddress[key] = this.addrList[idx][key];
					}
				}
				this.$refs.editAddress.isCreate = false;
				this.canEditAddress = true;
			},
			delAddrClick(addrID) {
				this.del_addrItem(addrID)
					.then(() => {
						alert("删除成功");
					})
					.catch((err) => {
						console.log(err);
					});
			},
		},
		created() {
			this.get_addrList();
		},
	};
</script>

<style scoped>
	#UserAddress {
		position: relative;
		width: 800px;
		margin: 0 auto;
		overflow: hidden;
	}

	.header span {
		font-size: 14px;
		margin: 0 10px;
		color: gray;
	}

	.header i {
		font-size: 14px;
		margin: 0 5px;
		color: rgb(0, 0, 0);
	}

	.list {
		position: relative;
	}

	.list li {
		position: relative;
		border: 2px solid var(--bgcolor);
		margin: 10px 0;
	}

	.operate-contain {
		position: relative;
		overflow: hidden;
	}

	.operate-contain input {
		float: left;
		width: 18px;
		height: 20px;
		margin: 10px;
	}

	.operate-contain label {
		float: left;
		line-height: 38px;
	}

	.operate-contain span {
		float: left;
		padding: 4px;
		border-radius: 5px;
		margin: 8px;
		background: rgb(255, 172, 17);
		color: white;
		font-size: 14px;
	}

	.form {
		position: relative;
		border-top: 1px solid var(--bgcolor);
	}

	.form > * {
		position: relative;
		overflow: hidden;
	}

	.title {
		float: left;
		width: 80px;
		padding-right: 10px;
		font-size: 13px;
		font-weight: 400;
		line-height: 30px;
		text-align: right;
	}

	.content {
		float: left;
		width: 500px;
		font-size: 13px;
		line-height: 30px;
		text-align: left;
	}

	.btn-contain {
		position: absolute;
		top: 0;
		right: 0;
	}

	.btn-contain button {
		color: 28px;
		background: none;
		border: 0;
		color: green;
		cursor: pointer;
		margin: 10px 15px;
	}
</style>
