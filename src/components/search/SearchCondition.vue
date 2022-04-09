<template>
	<div id="SearchCondition">
		<p>
			<div class="text">优先排序：</div>
		</p>
		<div class="check" ref="$0" @click="checkFn($event, '$0')">
			<div class="text">综合</div>
		</div>
		<div ref="$1" @click="checkFn($event, '$1')">
			<div class="text">评论</div>
		</div>
		<div ref="$2" @click="checkFn($event, '$2')">
			<div class="text">销量</div>
		</div>
		<div ref="$3" @click="checkFn($event, '$3')">
			<div class="text">价格</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				last: "$0",
			};
		},
		methods: {
			checkFn(ev, val) {
				this.$refs[this.last].className = "";
				this.last = val;
				ev.target.className = "check";
			},
		},
	};
</script>

<style scoped>
	#SearchCondition {
		position: relative;
		width: 1250px;
		height: 40px;
		padding: 0 20px;
		margin: 0 auto;
		box-sizing: border-box;
		background: rgb(212, 212, 212);
		overflow: hidden;
	}

	#SearchCondition > div {
		float: left;
		height: 100%;
		padding: 0 20px;
		box-sizing: border-box;
		cursor: pointer;
	}

	#SearchCondition > div:hover,
	.check {
		background: rgb(110, 96, 96);
		color: white;
	}

	.text {
		line-height: 40px;
		text-align: center;
		pointer-events: none;
	}
</style>
