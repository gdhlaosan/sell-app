<template>
	<div class="ratingSelect">
  	<div class="ratingType ofh">
  		<span class="block positive fl mr16" :class="{cur: type === 2}" @click="select(2)">{{desc.all}}<i class="count pl8">{{ratings.length}}</i></span>
  		<span class="block positive fl mr16" :class="{cur: type === 0}" @click="select(0)">{{desc.positive}}<i class="count pl8">{{positiveCount.length}}</i></span>
  		<span class="block negative fl" :class="{cur: type === 1}" @click="select(1)">{{desc.negative}}<i class="count pl8">{{negativeCount.length}}</i></span>
  	</div>
  	<div class="switch ofh" @click="onlySelect">
  		<span class="icon icon-check_circle fl" :class="{cur: only}" ></span>
  		<span class="switch-onlySelect fl ml8">只看有内容的评价</span>
  	</div>
	</div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
  name: 'ratingSelect',
  props: {
  	ratings: {
  		type: Array,
  		default() {
  			return [];
  		}
  	},
  	selectType: {
  		type: Number,
  		default: ALL
  	},
  	onlyContent: {
  		type: Boolean,
  		default: false
  	},
  	desc: {
  		type: Object,
  		default() {
  			return {
  				all: '全部',
  				positive: '满意',
  				negative: '不满意'
  			}
  		}
  	}
  },
  data() {
  	return {
  		type: this.selectType,
  		only: this.onlyContent
  	}
  },
  methods: {
  	select(type) {
  		this.type = type;
  		this.$emit('selectedType',type);
  	},
  	onlySelect() {
  		this.only = !this.only;
  		this.$emit('onlyToggle',this.only);
  	}
  },
  computed: {
  	positiveCount() {
  		return this.ratings.filter((rating) => {
  			return rating.rateType === POSITIVE;
  		})
  	},
  	negativeCount() {
  		return this.ratings.filter((rating) => {
  			return rating.rateType === NEGATIVE;
  		})
  	}
  }
}
</script>

<style scoped>
.ratingType {
	padding: 0.36rem 0;
	margin: 0 0.36rem;
	border-bottom: 0.01rem solid rgba(7,17,27,0.1);
}
.switch {
	padding: 0.24rem 0.36rem;
	border-bottom: 0.02rem solid rgba(7,17,27,0.1);
}
.block {
	display: inline-block;
	padding: 0.16rem 0.24rem;
	font-size: 0.24rem;
	color: rgb(77,85,93);
	line-height: 0.32rem;
	border-radius: 0.02rem;
}
.block.positive {
	background-color:  rgba(0,160,220,0.2);
}
.block.negative {
	background-color: rgba(77,85,93,0.2);
}
.block .count {
	font-style: normal;
	font-size: 0.16rem;
}
.block.positive.cur {
	background-color: rgb(0,160,220);
	color: #fff;
}
.block.negative.cur {
	background-color: rgb(77,85,93);
	color: #fff;
}
.icon-check_circle, .switch-onlySelect {
	color: rgb(147,153,159);
	line-height: 0.48rem;
}
.icon-check_circle {
	font-size: 0.48rem;
}
.icon-check_circle.cur {
	color: #00c850;
}
.switch-onlySelect {
	font-size: 0.24rem;
}
</style>
