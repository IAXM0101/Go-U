<template>
	<div id="GoodsMagnify">
		<button class="lBtn" @click="toggle(-1)">
			<img src="@/assets/imgs/arrow_left.png" />
		</button>
		<button class="rBtn" @click="toggle(1)">
			<img src="@/assets/imgs/arrow_right.png" />
		</button>
		<div class="show-contain" ref="smallBox">
			<img :src="img" />
			<div class="scopeBox" ref="scopeBox"></div>
		</div>
		<div class="bigBox" ref="bigBox">
			<img :src="img" ref="bigBoxImg" />
		</div>
		<div class="pre-contain" ref="imgContain">
			<div
				class="preImage"
				v-for="(item, index) in imgList"
				@click="choice(index)"
			>
				<img :src="item" width="100%" height="100%" />
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				idx: 0,
				img: "",
				multiply: 1,
			};
		},
		props: ["imgList"],
		methods: {
			choice(index) {
				let old = this.idx;
				this.idx = index;
				this.img = this.imgList[this.idx];
				this.style(old);
			},
			toggle(val) {
				let old = this.idx;
				this.idx += val;
				if (this.idx < 0) {
					this.idx = 0;
				} else if (this.idx > this.imgList.length - 1) {
					this.idx = this.imgList.length - 1;
				} else {
					this.img = this.imgList[this.idx];
					this.style(old);
				}
			},
			style(old) {
				this.$refs.imgContain.children[old].className =
					this.$refs.imgContain.children[old].className.replace(
						" check",
						""
					);
			},
			isCheck() {
				let isCheck =
					this.$refs.imgContain.children[this.idx].className.indexOf(
						"check"
					);
				if (isCheck === -1) {
					this.$refs.imgContain.children[this.idx].className += " check";
				}
			},
			mouseenter() {
				this.$refs.scopeBox.style.display = "block";
				this.$refs.bigBox.style.display = "block";

				let x =
					this.$refs.bigBoxImg.offsetWidth -
					this.$refs.bigBox.clientWidth;
				let y =
					this.$refs.smallBox.clientWidth -
					this.$refs.scopeBox.offsetWidth;
				this.multiply = x / y;
			},
			mouseleave() {
				this.$refs.scopeBox.style.display = "none";
				this.$refs.bigBox.style.display = "none";
			},
			mousemove(ev) {
				ev = ev || event;

				// 鼠标离浏览器的距离
				var horizontal = ev.clientX;
				var vertical = ev.clientY;

				// box离浏览器的距离
				let node = this.$refs.smallBox;
				let offsetLeft = node.offsetLeft;
				let clientLeft = node.clientLeft;
				let offsetTop = node.offsetTop;
				let clientTop = node.clientTop;

				while (node.offsetParent != null) {
					node = node.offsetParent;
					offsetLeft += node.offsetLeft;
					clientLeft += node.clientLeft;
					offsetTop += node.offsetTop;
					clientTop += node.clientTop;
				}

				let forBrowserX = offsetLeft + clientLeft;
				let forBrowserY = offsetTop + clientTop;

				// 方块相对于父级的坐标
				let distanceX =
					horizontal - forBrowserX - this.$refs.scopeBox.clientWidth / 2;
				let distanceY =
					vertical - forBrowserY - this.$refs.scopeBox.clientHeight / 2;

				// 限制方块不会超出父级元素
				if (distanceX < 0) {
					distanceX = 0;
				} else if (
					distanceX >
					this.$refs.smallBox.clientHeight -
						this.$refs.scopeBox.clientWidth
				) {
					distanceX =
						this.$refs.smallBox.clientHeight -
						this.$refs.scopeBox.clientWidth;
				}

				if (distanceY < 0) {
					distanceY = 0;
				} else if (
					distanceY >
					this.$refs.smallBox.clientHeight -
						this.$refs.scopeBox.clientHeight
				) {
					distanceY =
						this.$refs.smallBox.clientHeight -
						this.$refs.scopeBox.clientHeight;
				}

				this.$refs.scopeBox.style.left = distanceX + "px";
				this.$refs.scopeBox.style.top = distanceY + "px";

				this.$refs.bigBoxImg.style.left = `-${distanceX * this.multiply}px`;
				this.$refs.bigBoxImg.style.top = `-${distanceY * this.multiply}px`;
			},
		},
		mounted() {
			this.$refs.smallBox.onmouseenter = this.mouseenter;
			this.$refs.smallBox.onmouseleave = this.mouseleave;
			this.$refs.smallBox.onmousemove = this.mousemove;
		},
		updated() {
			this.img = this.imgList[this.idx];
			this.isCheck();
		},
	};
</script>

<style scoped>
	#GoodsMagnify {
		position: relative;
		box-sizing: border-box;
		--width: 80px;
		z-index: 100;
	}

	.lBtn,
	.rBtn {
		--btn-height: 60px;
		position: absolute;
		top: calc(50% - var(--btn-height));
		border: 0;
		width: 50px;
		height: var(--btn-height);
		opacity: 0.4;
		background: none;
	}

	.lBtn:hover,
	.rBtn:hover {
		cursor: pointer;
		opacity: 1;
		background-color: rgba(129, 129, 129, 0.705);
	}

	.lBtn img,
	.rBtn img {
		width: 50px;
		height: 50px;
	}

	.lBtn {
		left: 0;
	}

	.rBtn {
		right: 0;
	}

	.show-contain {
		position: relative;
		margin: 0 auto;
		width: calc(450px - var(--width));
		height: calc(450px - var(--width));
		background: darkcyan;
		z-index: 1;
		overflow: hidden;
	}

	.show-contain img {
		width: calc(450px - var(--width));
		height: calc(450px - var(--width));
	}

	.scopeBox {
		display: none;
		position: absolute;
		top: 0;
		left: 0;
		width: 100px;
		height: 100px;
		background: rgba(189, 189, 189, 0.6);
	}

	.bigBox {
		display: none;
		position: absolute;
		top: 0;
		left: 500px;
		width: 370px;
		height: 370px;
		border: 1px solid #000;
		overflow: hidden;
	}

	.bigBox img {
		position: absolute;
		width: 1369px;
		height: 1369px;
	}

	.pre-contain {
		position: relative;
		width: 480px;
		height: var(--width);
		overflow: hidden;
	}

	.preImage-contain {
		width: calc(var(--width) * 8);
	}

	.preImage {
		float: left;
		width: var(--width);
		height: var(--width);
		background: rgb(75, 122, 122);
		box-sizing: border-box;
		border: 2px solid white;
		cursor: pointer;
	}

	.check {
		border: 4px solid var(--color2);
	}
</style>
