<template>
	<div class="EditAddress">
		<div class="panel">
			<div class="close-btn" @click="closeClick">X</div>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			closeClick() {
				this.$parent.canEditAddress = false;
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
		height: 600px;
		background: rgb(255, 255, 255);
	}

	.close-btn {
		width: 30px;
		height: 30px;
        background: rgb(144, 135, 135);
        line-height: 30px;
        text-align: center;
        cursor: pointer;
	}

	.close-btn:hover {
        background: rgb(92, 85, 85);
        color: white;
	}
</style>