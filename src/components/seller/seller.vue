<template>
	<div class="seller-wrapper" ref="seller">
  	<div class="seller-content">
  		<div class="overview">
  			<div class="overview-title">
  				<div class="title mb16">{{seller.name}}</div>
  				<div class="star ofh">
  					<v-star :size="36" :score="seller.score" class="fl"></v-star>
  					<span class="fl ml16">({{seller.ratingCount}})</span>
  					<span class="sellCount fl ml24">月售{{seller.sellCount}}单</span>
  				</div>
  				<div class="collect" @click="collectToggle">
  					<span class="icon icon-favorite" :class="{active: favorite}" ></span>
  					<div class="collect-desc mt8">{{favoriteText}}</div>
  				</div>
  			</div>
  			<div class="overview-desc pt36">
  				<div class="minPrice">
  					<div class="minPrice-desc desc mb8">起送价</div>
  					<div class="price">
  						<span>{{seller.minPrice}}</span>元
  					</div>
  				</div>
  				<div class="deliveryPrice">
  					<div class="deliveryPrice-desc desc mb8">商家配送</div>
  					<div class="price">
  						<span>{{seller.deliveryPrice}}</span>元
  					</div>
  				</div>
  				<div class="deliveryTime">
  					<div class="deliveryTime-desc desc mb8">平均配送时间</div>
  					<div class="price">
  						<span>{{seller.deliveryTime}}</span>分钟
  					</div>
  				</div>	
  			</div>
  		</div>
  		<split></split>
  		<div class="bulletins">
  			<div class="notice">
  				<div class="title">公告与活动</div>
  				<p class="text">{{seller.bulletin}}</p>
  			</div>
  			<ul class="bulletin" v-show="seller.supports">
  				<li v-for="(item,index) in seller.supports" class="ofh pb24 bulletin-item">
						<span :class="classMap[item.type]" class="detail-support_icon fl mr12"></span>
						<span class="text fl">{{item.description}}</span>
					</li>
  			</ul>
  		</div>
  		<split v-show="seller.pics"></split>
  		<div class="pics" v-show="seller.pics">
  			<div class="pics-title mb24">商家实景</div>
  			<div class="pics-wrapper" ref="picsWrapper">
  				<ul class="pics-list ofh" ref="picsList">
  					<li class="pic-item fl mr12" v-for="pic in seller.pics" ref="picItem">
  						<img :src="pic" alt="">
  					</li>
  				</ul>
  			</div>
  		</div>
  		<split v-show="seller.infos"></split>
  		<div class="infos" v-show="seller.infos">
  			<div class="infos-title mb24">商家信息</div>
  			<ul>
  				<li v-for="item in seller.infos" class="info">{{item}}</li>
  			</ul>
  		</div>
  	</div>
	</div>
</template>

<script>
import VStar from '@/components/star/star'
import split from '@/components/split/split'
import BScroll from 'better-scroll'
import {saveToLocal, loadFromLocal} from '@/common/js/store'
export default {
  name: 'Seller',
  props: {
  	seller: Object
  },
  components: {
  	VStar, split
  },
  data() {
  	return {
  		classMap: [],
  		favorite: (() => {
  			return loadFromLocal(this.seller.id, 'favorite', false)
  		})()
  	}
  },
  created() {
  	this.classMap = ['decrease','discount','special','invoice','guarantee'];
  },
  mounted() {
  	this.$nextTick(() => {
  		this._initScroll();
  		setTimeout(() => {
  			this._initPicsWidth();
  		},10)
  	})
  },
  computed: {
  	favoriteText() {
  		return this.favorite ? '已收藏' : '收藏';
  	}
  },
  methods: {
  	_initScroll() {
  		this.sellerScroll = new BScroll(this.$refs.seller,{
  			click: true
  		})
  	},
  	_initPicsWidth() {
  		let picDom = this.$refs.picItem[0];
  		let picWidth = picDom.offsetWidth;
  		let picSplit = parseInt(getComputedStyle(picDom, false)['marginRight']);
  		let width = (picWidth + picSplit) * this.seller.pics.length - picSplit;
  		this.$refs.picsList.style.width = width + 'px';
  		this.picsScroll = new BScroll(this.$refs.picsWrapper,{
  			scrollX: true,
  			eventPassthrough: 'vertical'
  		})
  	},
  	collectToggle() {
  		this.favorite = !this.favorite;
  		saveToLocal(this.seller.id, 'favorite', this.favorite);
  	}
  }
}
</script>

<style scoped>
.seller-wrapper {
	width: 100%;
	position: absolute;
	top: 3.48rem;
	bottom: 0;
	overflow: hidden;
}
.overview {
	padding: 0.36rem;
}
.overview-title {
	position: relative;
	padding-bottom: 0.36rem;
	border-bottom: 0.01rem solid rgba(7,17,27,0.1);
}
.overview-title .title, .bulletins .notice .title, .pics .pics-title, .infos .infos-title {
	font-size: 0.28rem;
	color: rgb(7,17,27);
	line-height: 0.28rem;
}
.overview-title .star span {
	font-size: 0.2rem;
	color: rgb(77,85,93);
	line-height: 0.3rem;
}
.overview-title .collect {
	position: absolute;
	width: 0.72rem;
	right: 0;
	top: 0;
	text-align: center;
}
.overview-title .collect .icon {
	font-size: 0.48rem;
	color: #d4d6d9;
	line-height: 0.48rem;
}
.overview-title .collect .collect-desc {
	font-size: 0.2rem;
	color: rgb(77,85,93);
	line-height: 0.2rem;
}
.overview-desc {
	display: flex;
	justify-content: space-around;
}
.overview-desc>div {
	width: 2.0rem;
	text-align: center;
	border-right: 0.01rem solid rgba(7,17,27,0.1);
}
.overview-desc>div:last-child {
	border: 0;
}
.overview-desc .desc {
	font-size: 0.2rem;
	color: rgb(147,153,159);
	line-height: 0.2rem;
}
.overview-desc .price {
	font-size: 0.2rem;
	font-weight: 200;
	color: rgb(7,17,27);
}
.overview-desc .price span {
	font-size: 0.48rem;
}
.bulletins {
	padding: 0.36rem 0.36rem 0;
}
.bulletins .notice .text {
	font-size: 0.24rem;
	font-weight: 200;
	color: rgb(240,20,20);
	line-height: 0.48rem;
	padding: 0.16rem 0.24rem 0.32rem;
	
}
.bulletin-item {
	padding: 0.32rem 0.24rem;
	border-top: 0.01rem solid rgba(7,17,27,0.1);
}
.detail-support_icon {
	display: inline-block;
	width: 0.32rem;
	height: 0.32rem;
}
.bulletin-item .decrease {
	background: url(resource/decrease_2@2x.png) no-repeat;
	background-size: 100% 100%;
}
.bulletin-item .discount {
	background: url(resource/discount_2@2x.png) no-repeat;
	background-size: 100% 100%;
}
.bulletin-item .guarantee {
	background: url(resource/guarantee_2@2x.png) no-repeat;
	background-size: 100% 100%;
}
.bulletin-item .invoice {
	background: url(resource/invoice_2@2x.png) no-repeat;
	background-size: 100% 100%;
}
.bulletin-item .special {
	background: url(resource/special_2@2x.png) no-repeat;
	background-size: 100% 100%;
}
.bulletin-item .text {
	font-size: 0.24rem;
	font-weight: 200;
	line-height: 0.32rem;
	color: rgb(7,17,27);
}
.pics {
	padding: 0.36rem;
}
.pics .pics-wrapper {
	width: 100%;
}
.pics .pics-wrapper .pics-list .pic-item {
	width: 2.4rem;
	height: 1.8rem;
}
.pics .pics-wrapper .pics-list .pic-item:last-child {
	margin-right: 0;
}
.pics .pics-wrapper .pics-list .pic-item img {
	width: 100%;
	height: 100%;
}
.infos {
	padding: 0.36rem 0.36rem 0;
}
.infos .info {
	padding: 0.32rem 0.24rem;
	font-size: 0.24rem;
	font-weight: 200;
	color: rgb(7,17,27);
	line-height: 0.32rem;
	border-top: 0.01rem solid rgba(7,17,27,0.1);
}
</style>
