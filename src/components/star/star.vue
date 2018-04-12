<template>
	<div class="star">
  	<div :class="starType" class="star-main">
  		<span v-for="(itemClass,index) in itemClasses" :class="itemClass" :key="index" class="item-star"></span>
  	</div>
	</div>
</template>

<script>
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';

export default {
  name: 'Star',
  props: {
  	size: {
  		type: Number
  	},
  	score: {
  		type: Number
  	}
  },
  computed: {
  	starType() {
  		return 'star-'+this.size;
  	},
  	itemClasses() {
  		let result = [];
  		let score = Math.floor(this.score*2) / 2;
  		let hasDecimal = score % 1 !== 0;
  		let integar = Math.floor(score);
  		for(let i = 0; i < integar; i++) {
  			result.push(CLS_ON);
  		}
  		if(hasDecimal) {
  			result.push(CLS_HALF)
  		}
  		while(result.length < LENGTH) {
  			result.push(CLS_OFF)
  		}
  		return result;
  	}
  }
}
</script>

<style scoped>
.star .star-main {
	display: inline-block;
}
.star .item-star:last-child {
	margin-right: 0!important;
}
.star .star-48 .item-star{
	display: inline-block;
	width: 0.4rem;
	height: 0.38rem;
	margin-right: 0.44rem;
}
.star .star-48 .on {
	background: url(resource/star48_on@2x.png) no-repeat;
	background-size: 100% 100%;
}
.star .star-48 .half {
	background: url(resource/star48_half@2x.png) no-repeat;
	background-size: 100% 100%;
}
.star .star-48 .off {
	background: url(resource/star48_off@2x.png) no-repeat;
	background-size: 100% 100%;
}

.star .star-36 .item-star{
	display: inline-block;
	width: 0.3rem;
	height: 0.29rem;
	margin-right: 0.12rem;
}
.star .star-36 .on {
	background: url(resource/star36_on@2x.png) no-repeat;
	background-size: 100% 100%;
}
.star .star-36 .half {
	background: url(resource/star36_half@2x.png) no-repeat;
	background-size: 100% 100%;
}
.star .star-36 .off {
	background: url(resource/star36_off@2x.png) no-repeat;
	background-size: 100% 100%;
}

.star .star-24 .item-star{
	display: inline-block;
	width: 0.2rem;
	height: 0.19rem;
	margin-right: 0.06rem;
}
.star .star-24 .on {
	background: url(resource/star24_on@2x.png) no-repeat;
	background-size: 100% 100%;
}
.star .star-24 .half {
	background: url(resource/star24_half@2x.png) no-repeat;
	background-size: 100% 100%;
}
.star .star-24 .off {
	background: url(resource/star24_off@2x.png) no-repeat;
	background-size: 100% 100%;
}
</style>
