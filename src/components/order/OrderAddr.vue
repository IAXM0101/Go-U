<template>
	<div id="OrderAddr">
		<div class="nav">
			<p>收货人信息</p>
			<button>新建地址</button>
			<button>选择其他地址</button>
		</div>
		<div class="currentAddr">
			<div class="header">
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
		</div>
	</div>
</template>

<script>
	export default {};
</script>

<style scoped>
	#OrderAddr {
		float: left;
		position: relative;
		box-sizing: border-box;
		width: 380px;
		padding: 10px;
		border: 5px solid gray;
		margin-right: 20px;
		overflow: hidden;
	}

	.nav {
		height: 40px;
		background: gray;
		margin-bottom: 10px;
	}

	.nav p {
		float: left;
		line-height: 40px;
		color: white;
		padding: 0 10px;
	}

	.nav button {
		float: right;
		box-sizing: border-box;
		height: 30px;
		margin: 5px;
		cursor: pointer;
	}

	.currentAddr {
		position: relative;
		box-sizing: border-box;
		border-left: 2px solid gray;
		border-right: 2px solid gray;
		border-bottom: 2px solid gray;
	}

	.header {
		height: 30px;
		background: gray;
	}

	.header label {
		float: left;
		line-height: 30px;
		padding: 0 10px;
        color: white;
	}

	.header span {
		float: left;
		padding: 4px 6px;
		border-radius: 5px;
		background: rgb(255, 172, 17);
		color: white;
		font-size: 10px;
        margin: 5px 5px 0;
	}

	.form > * {
		overflow: hidden;
	}

	.title {
		float: left;
		width: 70px;
		padding-right: 10px;
		font-size: 13px;
		font-weight: 400;
		line-height: 25px;
		text-align: right;
	}

	.content {
		float: left;
		width: 250px;
		font-size: 13px;
		line-height: 25px;
		text-align: left;
	}
</style>