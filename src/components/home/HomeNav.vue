<template>
	<div id="HomeNav">
		<ul class="nav-contain">
			<li
				class="nav-item"
				v-for="item in navList"
				@mouseenter="enter(item.key)"
			>
				{{ item.text }}
				<span><i class="iconfont icon-zuojiantou-copy"></i></span>
			</li>
		</ul>
		<ul class="nav-panel" ref="navPanel">
			<li v-for="item in sortList">
				<img :src="item.img" />
				<span v-text="item.text"></span>
			</li>
		</ul>
	</div>
</template>

<script>
	import sortList from "@/assets/data/sortList";
	export default {
		data() {
			return {
				navList: [
					{
						key: "phone",
						text: "手机",
					},
					{
						key: "tv",
						text: "电视",
					},
					{
						key: "compute",
						text: "笔记本 平板",
					},
					{
						key: "homeAppliances",
						text: "家电",
					},
					{
						key: "wearable",
						text: "出行 穿戴",
					},
					{
						key: "smart",
						text: "智能家居",
					},
					{
						key: "part",
						text: "电源 配件",
					},
					{
						key: "sound",
						text: "耳机 音箱",
					},
				],
				sortList: [],
			};
		},
		methods: {
			enter(key) {
				this.sortList = sortList[key];
				let columnCount = Math.ceil(this.sortList.length / 6);
				this.$refs.navPanel.style.width = columnCount * 290 + "px";
			},
		},
	};
</script>

<style scoped>
	#HomeNav {
		float: left;
		position: relative;
		width: 250px;
		height: 500px;
		padding: 20px 0;
		box-sizing: border-box;
		background: linear-gradient(120deg, #959885, #989989);
		z-index: 5;
	}

	.nav-item {
		line-height: 40px;
		color: white;
		padding: 8px 20px;
	}

	.nav-item:hover {
		cursor: pointer;
		background: var(--color2);
	}

	.nav-item span {
		float: right;
	}

	.nav-panel {
		position: absolute;
		top: 0;
		left: 250px;
		height: 500px;
		padding: 0;
		margin: 0;
		list-style: none;
		background: rgb(255, 255, 255);
		box-shadow: 5px 0px 6px -2px rgba(0, 0, 0, 0.425);
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		visibility: hidden;
	}

	.nav-contain {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.nav-contain:hover + .nav-panel {
		visibility: visible;
	}

	.nav-panel:hover {
		visibility: visible;
	}

	.nav-panel li {
		float: left;
		height: 50px;
		padding: 15px 20px;
	}

	.nav-panel li img {
		float: left;
		width: 50px;
		height: 50px;
	}

	.nav-panel li span {
		float: left;
		width: 200px;
		line-height: 50px;
		font-size: 15px;
	}
</style>
