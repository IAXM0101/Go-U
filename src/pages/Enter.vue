<template>
	<div id="Enter">
		<div class="header">
			<router-link to="/" tag="div" class="logo-contain">
				<img src="@/assets/imgs/logo.png" alt="" class="logo-img" />
				<span class="logo-text">GO-U</span>
			</router-link>
		</div>

		<div class="main">
			<div class="main-contain">
				<div class="input-contain">
					<router-view />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Login from "@/components/enter/Login";
	import Register from "@/components/enter/Register";
	export default {
		components: {
			Login,
			Register,
		},
	};
</script>

<style scoped>
	.header {
		position: relative;
		width: 1250px;
		height: 100px;
		margin: 0 auto;
	}

	.logo-contain {
		position: absolute;
		top: 20px;
		left: 0;
		cursor: pointer;
	}

	.logo-img {
		float: left;
		height: 60px;
	}
	.logo-text {
		float: left;
		padding: 0 5px;
		font-size: 40px;
		line-height: 60px;
	}

	.main {
		position: relative;
		background: #8abfe9;
	}

	.main-contain {
		position: relative;
		width: 1250px;
		padding: 150px 0;
		margin: 0 auto;
	}

	.input-contain {
		position: relative;
		width: 400px;
		border: solid var(--color3);
		margin: 0 auto;
	}
</style>
