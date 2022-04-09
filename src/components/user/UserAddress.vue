<template>
	<div id="UserAddress">
		<div class="header">
			<button>新增收货地址</button>
			<span>您已创建<i>1</i>个收货地址，最多可创建<i>25</i>个</span>
		</div>
		<ul class="list">
			<li>
				<div class="operate-contain">
					<input type="radio" value="0" v-model="defaultAddr" />
					<label>默认地址</label>
					<span>家</span>
					<span>学校</span>
					<span>公司</span>
				</div>
				<div class="form">
					<div>
						<div class="title">收货人</div>
						<div class="content">世一上</div>
					</div>
					<div>
						<div class="title">所在地区</div>
						<div class="content">广东广州市海珠区官洲街道</div>
					</div>
					<div>
						<div class="title">地址</div>
						<div class="content">
							广东广州市海珠区官洲街道赤沙南约西巷7号每天惠超市
						</div>
					</div>
					<div>
						<div class="title">手机</div>
						<div class="content">18066669999</div>
					</div>
					<div>
						<div class="title">电子邮箱</div>
						<div class="content">sys@gmail.com</div>
					</div>
				</div>
				<div class="btn-contain">
					<button>编辑</button>
					<button>删除</button>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				defaultAddr: "0",
			};
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
