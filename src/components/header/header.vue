<template>
	<div class="Header">
		<div class="content-wrapper ofh pr">
			<div class="avatar fl" v-if="seller.avatar">
				<img :src="seller.avatar" alt="粥品香坊">
			</div>
			<div class="content fl">
				<div class="title mb16 ofh">
					<span class="title_icon fl"></span>
					<span class="title_name fl fwb fs32 ml12">{{seller.name}}</span>
				</div>
				<div class="description mb20 fs24">
					{{seller.description}} / {{seller.deliveryTime}}分钟送达
				</div>
				<div v-if="seller.supports" class="header_support ofh">
					<span class="support_icon fl" :class="classMap[seller.supports[0].type]"></span>
					<span class="support_description fs20 fl ml8">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div class="supports-count pa ofh" v-if="seller.supports" @click="showDetail">
				<span class="count fl">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right fl"></i>
			</div>
		</div>
		<div class="bulletin-wrapper" @click="showDetail">
			<span class="bulletin-icon fl mt18"></span>
			<span class="bulletin-content ml8 fl">{{seller.bulletin}}</span> 
			<i class="icon-keyboard_arrow_right bulletin-font fl mt14"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" alt="">
		</div>
		<transition name="fade">
			<div class="detail" v-show="detailShow">
			<div class="detail-wrapper clearfix">
				<div class="detail-main">
					<h1 class="detail-name">{{seller.name}}</h1>
					<v-star :size="48" :score="seller.score" class="v-star mt32 mb56"></v-star>
					<div class="sub-title">
						<div class="line"></div>
						<div class="text">优惠信息</div>
						<div class="line"></div>
					</div>
					<ul class="detail-supports pl24 mt48 pr24">
						<li v-for="(item,index) in seller.supports" class="ofh pb24">
							<span :class="classMap[item.type]" class="detail-support_icon fl mr12"></span>
							<span class="text fl">{{item.description}}</span>
						</li>
					</ul>
					<div class="sub-title mt56 ">
						<div class="line"></div>
						<div class="text">商家公告</div>
						<div class="line"></div>
					</div>
					<p class="detail_bulletin mt48 pl24 pr24">{{seller.bulletin}}</p>
				</div>
			</div>
			<div class="detail-close"> 
				<i class="icon-close" @click="closeDetail"></i>
			</div>
			</div>
		</transition>
	</div>
</template>

<script>
import VStar from '@/components/star/star'
export default {
	components: {
		VStar
	},
	props: {
		seller: {
			type: Object
		}
	},
	name: 'Header',
	data () {
		return {
			classMap: [],
			detailShow: false
		}
	},
  created() {
  	this.classMap = ['decrease','discount','special','invoice','guarantee']
  },
  methods: {
  	showDetail() {
  		this.detailShow = true
  	},
  	closeDetail() {
			this.detailShow = false
  	}
  }
}
</script>

<style scoped>
.Header {
	background-color: rgba(7,17,27,0.5);
	color: #fff;
	overflow: hidden;
}
.content-wrapper {
	padding: 0.48rem 0.24rem 0.36rem 0.48rem;
}
.avatar {
	height: 1.28rem;
	width: 1.28rem;
	border-radius: 0.04rem;
	overflow: hidden;
}
.avatar img {
	width: 100%;
	height: 100%;
}
.content-wrapper .content {
	margin-left: 0.32rem;
	padding: 0.04rem 0;
}
.title_icon {
	display: inline-block;
	width: 0.6rem;
	height: 0.36rem;
	background: url(./resource/brand@3x.png) no-repeat;
	background-size: 100% 100%;
}
.support_icon {
	display: inline-block;
	width: 0.24rem;
	height: 0.24rem;
}
.header_support .decrease {
	background: url(resource/decrease_1@2x.png) no-repeat;
	background-size: 100% 100%;
}
.header_support .discount {
	background: url(resource/discount_1@2x.png) no-repeat;
	background-size: 100% 100%;
}
.header_support .guarantee {
	background: url(resource/guarantee_1@2x.png) no-repeat;
	background-size: 100% 100%;
}
.header_support .invoice {
	background: url(resource/invoice_1@2x.png) no-repeat;
	background-size: 100% 100%;
}
.header_support .special {
	background: url(resource/special_1@2x.png) no-repeat;
	background-size: 100% 100%;
}
.supports-count {
	right: 0.24rem;
	bottom: 0.36rem;
	padding: 0.14rem 0.16rem;
	background-color: rgba(0,0,0,0.2);
	border-radius: 0.3rem;
	line-height: 100%;
}
.supports-count .count {
	font-size: 0.2rem;
}

.bulletin-wrapper {
	height: 0.56rem;
	background-color: rgba(7,17,27,0.2);
	font-size: 0.2rem;
	padding: 0 0.24rem;
}
.bulletin-icon {
	display: inline-block;
	width: 0.44rem;
	height: 0.24rem;
	background: url(resource/bulletin@2x.png) no-repeat;
	background-size: 100% 100%; 
}
.bulletin-content {
	display: inline-block;
	width: 6rem;
	line-height: 0.56rem;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.bulletin-font {
	font-size: 0.32rem;
}
.background {
	position: absolute;
	width: 100%;
	height: 2.68rem;
	left: 0;
	top: 0;
	z-index: -1;
	filter: blur(5px);
}
.background img {
	width: 100%;
	height: 100%;
}
.detail {
	position: fixed;
	width: 100%;
	height: 100%;
	z-index: 100;
	left: 0;
	top: 0;
	background: rgba(7,17,27,0.8);
	overflow: auto;
}
.detail-wrapper {
	width: 100%;
	min-height: 100%;
}
.detail-main {
	margin-top: 1.28rem;
	padding-bottom: 1.28rem;
	padding-left: 0.72rem;
	padding-right: 0.72rem;
}
.detail .detail-close {
	margin: -1.28rem auto;
}
.detail .detail-close .icon-close {
	display: block;
	margin: 0 auto;
	width: 0.64rem;
	height: 0.64rem;
	font-size: 0.64rem;
	clear: both;
}
.detail-name {
	line-height: 0.32rem;
	font-size: 0.32rem;
	font-weight: 700;
	text-align: center;
}
.v-star {
	text-align: center;
}
.sub-title {
	display: flex;
}
.sub-title .line {
	width: 80%;
	flex: 1;
	position: relative;
	border-bottom: 0.01rem solid rgba(255,255,255,0.2);
	top: -0.12rem;
}
.sub-title .text {
	padding: 0 0.24rem;
	font-size: 0.28rem;
	font-weight: 700;
}
.detail-support_icon {
	display: inline-block;
	width: 0.32rem;
	height: 0.32rem;
}
.detail-supports .decrease {
	background: url(resource/decrease_2@2x.png) no-repeat;
	background-size: 100% 100%;
}
.detail-supports .discount {
	background: url(resource/discount_2@2x.png) no-repeat;
	background-size: 100% 100%;
}
.detail-supports .guarantee {
	background: url(resource/guarantee_2@2x.png) no-repeat;
	background-size: 100% 100%;
}
.detail-supports .invoice {
	background: url(resource/invoice_2@2x.png) no-repeat;
	background-size: 100% 100%;
}
.detail-supports .special {
	background: url(resource/special_2@2x.png) no-repeat;
	background-size: 100% 100%;
}
.detail-supports .text {
	font-size: 0.24rem;
	font-weight: 200;
	line-height: 0.32rem;
}
.detail-supports>li:last-child {
	padding-bottom: 0;
}
.detail_bulletin {
	font-size: 0.24rem;
	font-weight: 200;
	line-height: 0.48rem;
}
/*过渡效果*/
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
