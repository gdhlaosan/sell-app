<template>
	<div class="food" ref="food">
		<div class="food-content">
			<div class="food-header">
				<img :src="food.image" alt="">
				<span class="back icon icon-arrow_lift" @click="back"></span>
			</div>
			<div class="food-detail">
				<h1 class="food-name mb16">{{food.name}}</h1>
				<div class="food-desc mb36">
					<span class="mr24">月售{{food.sellCount}}</span><span>好评率{{food.rating}}%</span>
				</div>
				<div class="price">
					<span class="new-price mr16"><i class="price-icon">￥</i>{{food.price}}</span><span v-if="food.oldPrice" class="old-price">￥{{food.oldPrice}}</span>
				</div>
				<div class="cartControl-wrapper" v-if="food.count > 0">
					<cart-control :food="food" @selectTarget="selectTarget"></cart-control>
				</div>
				<div class="addCart" v-else @click="addCartFirst">加入购物车</div>
			</div>
			<split v-if="food.info"></split>
			<div class="food-description" v-if="food.info">
				<div class="food-desc-title">商品介绍</div>
				<p class="food-desc-main">{{food.info}}</p>
			</div>
			<split></split>
			<div class="food-ratings ofh">
				<div class="food-ratings-title mt36 pl36 pr36">商品评价</div>
				<rating-select :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings" @onlyToggle="onlyToggle" @selectedType="selectedType"></rating-select>
				<ul v-show="food.rating && food.ratings.length" class="ratings">
					<li class="rating-item" v-for="rating in food.ratings" v-show="ratingShow(rating.rateType,rating.text)">
						<div class="userMsg ofh mb12">
							<div class="rating-time fl">{{rating.rateTime | formateDate}}</div>
							<div class="rating-user fr">
								<span class="rating-name fl mr12">{{rating.username}}</span>
								<img class="rating-avatar fl" :src="rating.avatar" alt="">
							</div>
						</div>
						<div class="rating-text ofh">
							<span class="rating-hand fl mr8" :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"></span>
							<span class="text fl">{{rating.text}}</span>
						</div>

					</li>
				</ul>
				<div class="no-ratings" v-show="!food.rating || food.ratings.length === 0">暂无评价</div>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import BScroll from 'better-scroll'
import cartControl from '@/components/cartcontrol/cartcontrol'
import split from '@/components/split/split'
import ratingSelect from '@/components/ratingSelect/ratingSelect'
import {initDate} from '@/common/js/initDate'

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
	props: {
		food: {
			type: Object
		}
	},
	components: {
		cartControl, split, ratingSelect
	},
	data() {
		return {
			selectType: ALL,
			onlyContent: true,
			desc: {
				all: '全部',
				positive: '推荐',
				negative: '吐槽'
			}
		}
	},
	methods: {
		back() {
			this.$emit('back',false)
		},
		selectTarget(target) {
			this.$emit('foodDetailSelected',target);
		},
		foodBScrol() {
			if(!this.scroll) {
				this.foodBScrol = new BScroll(this.$refs.food,{
					click: true
				})
			}else {
				this.scroll.refresh();
			}
		},
		addCartFirst(event) {
			Vue.set(this.food,'count',1);
			this.$emit('foodDetailSelected',event.target);
		},
		ratingShow(type,text) {
			if(this.onlyContent && !text) {
				return false;
			}
			if(this.selectType === ALL) {
				return true;
			}else {
				return this.selectType === type;
			}
		},
		onlyToggle(only) {
			this.onlyContent = only;
		},
		selectedType(type) {
			this.selectType = type;
		}
	},
	filters: {
		formateDate(time) {
			var date = new Date(time);
			return initDate(date,'YY-MM-DD hh:mm')
		}	
	}
}
</script>

<style scoped>
.food {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0.92rem;
	z-index: 30;
	background: #f3f5f7;
}
.food-header {
	position: relative;
	width: 100%;
	height: 0;
	padding-top: 100%;
}
.food-header img{
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
}
.back {
	display: block;
	position: absolute;
	left: 0.2rem;
	top: 0.2rem;
	padding: 0.15rem;
	color: #fff;
	border-radius: 50%;
	background-color: rgba(7,17,27,0.4)
}
.food-detail {
	position: relative;
	padding: 0.36rem;
	background-color: #fff;
}
.food-name {
	font-size: 0.28rem;
	font-weight: 700;
	color: rgb(7,17,27);
	line-height: 0.28rem;
}
.food-desc {
	font-size: 0.2rem;
	color: rgb(147,153,159);
	line-height: 0.2rem;
}
.price {
	
}
.new-price {
	font-size: 0.28rem;
	font-weight: 700;
	color: rgb(240,20,20);
	line-height: 0.48rem;
}
.new-price .price-icon {
	font-size: 0.2rem;
	font-style: normal;
}
.old-price {
	font-size: 0.2rem;
	font-weight: 700;
	color: rgb(147,153,159);
	line-height: 0.48rem;
	text-decoration: line-through;
}
.addCart {
	position: absolute;
	right: 0.36rem;
	bottom: 0.36rem;
	padding: 0.12rem 0.24rem;
	font-size: 0.2rem;
	color: #fff;
	line-height: 0.24rem;
	background-color: rgb(0,160,220);
	border-radius: 0.24rem;
}
.cartControl-wrapper {
	position: absolute;
	right: 0.36rem;
	bottom: 0.36rem;
}
.food-description {
	padding: 0.36rem;
	background-color: #fff;
}
.food-desc-title, .food-ratings-title {
	font-size: 0.28rem;
	color: rgb(7,17,27);
	line-height: 0.28rem;
	font-weight: 700;
}
.food-desc-main {
	font-size: 0.24rem;
	font-weight: 200;
	color: rgb(77,85,93);
	line-height: 0.48rem;
	padding: 0.12rem 0.16rem 0 0.16rem;
}
.food-ratings {
	background: #fff;
}

.ratings {
	padding: 0 0.36rem;
}
.ratings .rating-item {
	padding: 0.32rem 0;
	border-bottom: 0.01rem solid rgba(7,17,27,0.1);
}
.ratings .rating-item:last-child {
	border-bottom: 0;
}
.ratings .userMsg {

}
.ratings .userMsg .rating-time, .ratings .userMsg .rating-user .rating-name {
	font-size: 0.2rem;
	color: rgb(147,153,159);
	line-height: 0.24rem;
}
.ratings .userMsg .rating-user .rating-avatar {
	width: 0.24rem;
	height: 0.24rem;
	border-radius: 50%;
}
.ratings .rating-text .rating-hand {
	font-size: 0.24rem;
	color: rgb(147,153,159);
	line-height: 0.48rem;
}
.ratings .rating-text .rating-hand.icon-thumb_up {
	color: rgb(0,160,220);
}
.ratings .rating-text .text {
	font-size: 0.24rem;
	color: rgb(7,17,27);
	line-height: 0.48rem;
}
.no-ratings {
	font-size: 0.24rem;
	padding: 0.36rem;
	color: rgb(147,153,159);
}
</style>