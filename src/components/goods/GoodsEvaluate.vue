<template>
	<div id="GoodsEvaluate">
		<div class="top">
			<div class="top-score">
				<div>好评度</div>
				<div><span>99</span><small>%</small></div>
			</div>
			<div class="top-wall">—— 大家的印象 ——</div>
			<div class="top-tag">
				<span>真的好</span>
				<span>性价比很高</span>
				<span>外观漂亮</span>
				<span>价格便宜</span>
			</div>
		</div>
		<div class="nav">
			<div class="check">全部评价</div>
			<div>好评</div>
			<div>中评</div>
			<div>差评</div>
			<div>有图</div>
		</div>
		<div class="content">
			<div>
				<div class="user-info">
					<img
						src="https://storage.360buyimg.com/i.imageUpload/76656e69626531343233393034373533313937_sma.jpg"
					/>
					<p>sssss</p>
				</div>
				<div class="user-comment">
					<div class="comment-star"></div>
					<div class="comment-text">
						sscccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccssssssssss
					</div>
					<div class="comment-other">
						<div class="comment-time">2021-07-02 21:21</div>
						<div class="comment-nice">
							<i
								class="iconfont"
								:class="[
									true ? 'icon-dianzan' : 'icon-dianzan1',
								]"
							></i>
							<span>6</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {};
</script>

<style scoped>
	#GoodsEvaluate {
		position: relative;
	}

	.top {
		position: relative;
		height: 150px;
	}

	.top-score {
		float: left;
		width: 200px;
		height: inherit;
	}

	.top-score div:nth-child(1) {
		margin: 35px 0 5px 50px;
		font-size: 14px;
	}

	.top-score div:nth-child(2) span {
		margin-left: 50px;
		color: var(--color2);
		font-size: 50px;
	}

	.top-score div:nth-child(2) small {
		color: var(--color2);
		font-size: 20px;
	}

	.top-wall {
		float: left;
		width: 20px;
		height: inherit;
		writing-mode: vertical-lr;
		line-height: 20px;
		text-align: center;
		font-size: 13px;
		color: rgb(211, 211, 211);
	}

	.top-tag {
		float: left;
		box-sizing: border-box;
		height: inherit;
		padding: 40px 50px;
	}

	.top-tag > * {
		padding: 5px 10px;
		border: 1px solid rgb(211, 211, 211);
		border-radius: 5px;
		font-size: 12px;
	}

	.nav {
		position: relative;
		height: 40px;
		background: rgb(211, 211, 211);
		overflow: hidden;
	}

	.nav > * {
		float: left;
		box-sizing: border-box;
		padding: 0 20px;
		font-size: 13px;
		line-height: 40px;
		cursor: pointer;
	}

	.nav > *:hover,
	.nav > *.check {
		background: var(--color2);
		color: white;
	}

	.content > * {
		position: relative;
		padding: 15px 20px 10px;
		border-bottom: 2px solid rgb(211, 211, 211);
		overflow: hidden;
	}

	.user-info {
		float: left;
		width: 200px;
		overflow: hidden;
	}

	.user-info img {
		float: left;
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}

	.user-info p {
		float: left;
		padding: 5px 10px;
		font-size: 15px;
	}

	.user-comment {
		float: left;
	}

	.comment-star {
		width: 78px;
		height: 14px;
		background: url(//static.360buyimg.com/item/unite/1.0.147/components/default-soa/comment/i/star.png)
			no-repeat;
	}

	.comment-text {
		width: 755px;
		margin: 10px 0;
		word-break: break-all;
		white-space: normal;
	}

	.comment-time {
		float: left;
		font-size: 14px;
		line-height: 20px;
		color: rgb(145, 145, 145);
	}

	.comment-nice {
		float: right;
		cursor: pointer;
		font-size: 14px;
		line-height: 16px;
	}
</style>
