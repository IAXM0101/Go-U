<template>
	<div id="HomeAdvert">
		<div class="item1">
			<img
				src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/16b16947a55037cf1a26eab14a6875b7.jpg?thumb=1&w=1533&h=150&f=webp&q=90"
				width="100%"
			/>
		</div>

		<div class="item3-contain">
			<div class="item3">
				<img
					src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/d8a6d6d37904e22c72130e3e4ec79b41.jpg?w=632&h=340"
					width="100%"
				/>
			</div>
			<div class="item3">
				<img
					src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0bdb0b3ff4e73fe2a6bf2f8fd399015e.png?w=632&h=340"
					width="100%"
				/>
			</div>
			<div class="item3">
				<img
					src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/35b3f906861db9d6472206e6d68318d9.jpeg?w=632&h=340"
					width="100%"
				/>
			</div>
		</div>
	</div>
</template>

<script>
	export default {};
</script>

<style scoped>
	#HomeAdvert {
		float: left;
		position: relative;
		width: 100%;
	}

	.item1,
	.item3-contain {
		float: left;
		position: relative;
		width: 100%;
		margin-top: 20px;
	}

	.item3-contain {
		display: flex;
		justify-content: space-between;
	}

	.item3 {
		width: 400px;
	}
</style>
