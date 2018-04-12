<template>
	<div class="cartcontrol">
		<transition name="roll">
			<div class="cart-sub icon icon-remove_circle_outline fl" v-show="food.count > 0" @click.stop="subCart"></div>
		</transition>
		<transition name="fade">
			<div class="cart-count fl" v-show="food.count > 0">{{food.count}}</div>
		</transition>
		<div class="cart-add icon icon-add_circle fl" @click.stop="addCart"></div>
	</div>
</template>

<script>
import Vue from 'vue'
export default {
	props: {
		food: {
			type: Object
		}
	},
	methods: {
		addCart(event) {
			if(!this.food.count) {
				Vue.set(this.food,'count',1) 
			}else {
				this.food.count ++;
			}
			this.$emit('selectTarget',event.target);
		},
		subCart() {
			this.food.count --;
		}	
	}
}
</script>

<style scoped>
.cartcontrol {
	position: relative;
}
.icon {
	font-size: 0.48rem;
	color: rgb(0,160,220);
}
.cart-count {
	width: 0.48rem;
	text-align: center;
	line-height: 0.48rem;
	color: rgb(147,153,159);
	font-size: 0.2rem;
}
.cart-sub {
	display: inline-block;
}
/*按钮滚动*/
.roll-enter, .roll-leave-to {
	transform: translateX(0.96rem) rotate(180deg);
}
.roll-enter, .roll-leave-to {
	opacity: 0;
}
.roll-enter-to, .roll-leave {
	transform: translateX(0rem) rotate(0deg);
}
.roll-enter-active, .roll-leave-active{
	transition: all 0.4s linear;
}
/*数字渐变*/
.fade-enter, .fade-leave-to {
	opacity: 0;
}
.fade-enter-active, .fade-leave-active {
	transition: all 0.4s linear;
}
</style>