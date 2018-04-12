<template>
	<div class="ratings">
		<div class="ratings-wrapper" ref="ratingsDom">
	  	<div class="ratings-content">
	  		<div class="ratings-count ofh">
	  			<div class="count">
	  				<div class="score mb12">{{seller.score}}</div>
	  				<div class="score-desc mb16">综合评分</div>
	  				<div class="rank mb12">高于周边商家{{seller.rankRate}}%</div>
	  			</div>
	  			<div class="count-star">
	  				<div class="service-star ofh mb16">
	  					<label class="star-label fl mr24">服务态度</label>
							<v-star :size="36" :score="seller.serviceScore" class="v-star fl"></v-star>
							<span class="star-score fl ml24">{{seller.serviceScore}}</span>
	  				</div>
	  				<div class="service-star ofh mb16">
	  					<label class="star-label fl mr24">食品评价</label>
							<v-star :size="36" :score="seller.foodScore" class="v-star fl"></v-star>
							<span class="star-score fl ml24">{{seller.foodScore}}</span>
	  				</div>
	  				<div class="deliveryTime ofh">
	  					<label class="star-label fl mr24">送达时间</label>
	  					<span class="time fl">{{seller.deliveryTime}}分钟</span>
	  				</div>
	  			</div>
	  		</div>
				<split></split>
				<div class="seller-ratings">
					<rating-select :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="ratings" @onlyToggle="onlyToggle" @selectedType="selectedType"></rating-select>
					<ul v-show="ratings && ratings.length" class="ratingItems">
						<li class="rating-item" v-for="rating in ratings" v-show="ratingShow(rating.rateType,rating.text)">
							<div class="avatar">
								<img :src="rating.avatar" alt="" class="avatar-img">
							</div>
							<div class="rating-item-content pl80">
								<div class="user">
									<div class="user-name">{{rating.username}}</div>
									<div class="v-star ofh">
										<v-star :size="24" :score="rating.score" class="user-score fl"></v-star>
										<span class="deliveryTime fl ml12">{{rating.deliveryTime}}分钟送达</span>
									</div>
									<div class="time">{{rating.rateTime | formateDate}}</div>
								</div>
								<p class="text mt8">{{rating.text}}</p>
								<div class="recommend ofh" v-show="rating.recommend">
									<i :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}" class="icon fl mt20"></i>
									<span v-for="item in rating.recommend" class="recommend-item mt16 ml16 fl">{{item}}</span>
								</div>
							</div>
						</li>
					</ul>
				</div>
	  	</div>
		</div>
	</div>
	
</template>

<script>
import BScroll from 'better-scroll'
import ratingSelect from '@/components/ratingSelect/ratingSelect'
import VStar from '@/components/star/star'
import split from '@/components/split/split'
import {initDate} from '@/common/js/initDate'
import shopCart from '@/components/shopcart/shopcart'

const ERR_OK = 0;
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
  name: 'Ratings',
  components: {
  	VStar, split, ratingSelect, shopCart
  },
  props: {
  	seller: Object
  },
  data() {
  	return {
  		ratings: [],
  		selectType: ALL,
  		onlyContent: false,
  		desc: {
  			all: '全部',
				positive: '满意',
				negative: '不满意'
  		}
  	}
  },
  created() {
  	this.$http.get('api/ratings').then((res) => {
  		var response = res.body;
  		if(response.errno === ERR_OK) {
  			this.ratings = response.data;
  		}
  		this.$nextTick(() => {
  			this._initScroll();
  		})
  	})
  },
  methods: {
  	onlyToggle(only) {
			this.onlyContent = only;
		},
		selectedType(type) {
			this.selectType = type;
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
		_initScroll() {
  		this.ratingsScroll = new BScroll(this.$refs.ratingsDom,{
  			click: true
  		});
  	},
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
.ratings-wrapper {
	position: absolute;
	width: 100%;
	top: 3.48rem;
	bottom: 0;
	overflow: hidden;
}
.ratings-count {
	display: flex;
	padding: 0.36rem 0;
}
.ratings-count .count {
	width: 2.75rem;
	text-align: center;
	border-right: 0.01rem solid rgba(7,17,27,0.1);
}
.ratings-count .count .score {
	font-size: 0.48rem;
	color: rgb(255,153,0);
	line-height: 0.56rem;
}
.ratings-count .count .score-desc {
	font-size: 0.24rem;
	color: rgb(7,17,27);
	line-height: 0.36rem;
}
.ratings-count .count .rank {
	font-size: 0.2rem;
	color: rgb(147,153,159);
	line-height: 0.2rem;
}
.ratings-count .count-star {
	flex: 1;
	padding: 0 0.48rem;
}
.star-label {
	font-size: 0.24rem;
	color: rgb(7,17,27);
	line-height: 0.36rem;
}
.star-score {
	font-size: 0.24rem;
	color: rgb(255,153,0);
	line-height: 0.3rem;
}
.time {
	font-size: 0.24rem;
	color: rgb(147,153,159);
	line-height: 0.36rem;
}
.rating-item {
	position: relative;
	padding: 0.36rem;
	border-bottom: 0.01rem solid rgba(7,17,27,0.1);
}
.rating-item .avatar {
	position: absolute;
	left: 0.36rem;
	right: 0.36rem;
	width: 0.56rem;
	height: 0.56rem;
	border-radius: 50%;
	overflow: hidden;
}
.rating-item .avatar .avatar-img {
	width: 100%;
	height: 100%;
}
.rating-item .rating-item-content .user {
	position: relative;
}
.rating-item .rating-item-content .user .user-name {
	font-size: 0.2rem;
	color: rgb(7,17,27);
	line-height: 0.24rem;
}
.rating-item .rating-item-content .user .deliveryTime {
	font-size: 0.2rem;
	font-weight: 200;
	color: rgb(147,153,159);
	line-height: 0.40rem;
}
.rating-item .rating-item-content .user .time {
	position: absolute;
	right: 0.36rem;
	top: 0;
}
.rating-item .rating-item-content .text {
	font-size: 0.24rem;
	color: rgb(7,17,27);
	line-height: 0.36rem;
}
.rating-item .rating-item-content .recommend .icon {
	font-size: 0.24rem;
	line-height: 0.32rem;
}
.rating-item .rating-item-content .recommend .icon.icon-thumb_up {
	color: rgb(0,160,220);
}
.rating-item .rating-item-content .recommend .icon.icon-thumb_down {
	color: rgb(183,187,191);
}
.rating-item .rating-item-content .recommend .recommend-item {
	display: inline-block;
	width: 1.0rem;
	height: 0.3rem;
	padding: 0.04rem 0.12rem;
	text-align: center;
	font-size: 0.18rem;
	color: rgb(147,153,159);
	line-height: 0.32rem;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	border: 0.01rem solid rgba(7,17,27,0.1);
	border-radius: 0.02rem;
}
</style>
