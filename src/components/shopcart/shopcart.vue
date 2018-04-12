<template>
	<div class="shopcart">
  	<div class="content">
      <div class="content-left" @click="listShow">
        <div class="cart-logo" :class="{heighLightBg: totalCount > 0}">
          <span class="icon-shopping_cart" :class="{heighLightFont: totalCount > 0}"></span>
          <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="cart-allPrice" :class="{heighLightFont: totalPrice > 0}">￥{{totalPrice}}</div>
        <div class="cart-desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" v-show="type == 0">￥{{minPrice}}起送</div>
      <div class="content-right" v-show="type == 1">还差￥{{disparity}}起送</div>
      <div class="content-right toPay" v-show="type == 2" @click="pay">去结算</div>
    </div>
    <div class="ball-container"><!--小球-->
      <div v-for="ball in balls">
        <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
    <transition name="slide">
      <div class="shopcart-list" v-show="flag">
        <div class="list-header">
          <h1 class="fl title">购物车</h1>
          <div class="fr clean" @click="clear">清空</div>
        </div>
        <div class="list-content" ref="cartContent">
        	<ul class="lists">
        		<li v-for="(food,index) in selectFoods" :key="index">
        			<h1 class="name">{{food.name}}</h1>
        			<div class="price mr24">
        				<span>￥{{food.price * food.count}}</span>
        			</div>
        			<div class="cartcontrol-wrapper">
        				<cart-control :food="food" @selectTarget="selectTarget"></cart-control>
        			</div>
        		</li>
        	</ul>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="cart-cover" v-show="flag" @click="flag = false"></div>
    </transition>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import cartControl from '@/components/cartcontrol/cartcontrol'
export default {
  name: 'App',
  components: {
  	cartControl
  },
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [
          {
            price: 0,
            count: 0
          }
        ];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      type: 0, //0:购买数量为0; 1:购买价格不够起送费; 2:购买价格达到起送费
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      flag: false
    }
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach((food) => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach((food) => {
        count += food.count;
      })
      if(count == 0) {
        this.flag = false;
      }
      return count;
    },
    disparity() {
      let disparity = 0;
      if(this.totalCount > 0) {
        if(this.minPrice > this.totalPrice) {
          disparity =  this.minPrice - this.totalPrice;
          this.type = 1;
          return disparity;
        }else {
          this.type = 2;
        }
      }else {
        this.type = 0;
      }
    }
  },
  methods: {
    drop(el) {
      for(let i=0;i<this.balls.length;i++){
        let ball= this.balls[i];
        if(!ball.show){
          ball.show = true;
          ball.el=el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    beforeDrop(el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect(); //元素相对于视口的位置
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);  //获取y
          el.style.display = '';
          el.style.webkitTransform = 'translateY('+y+'px)';  //translateY
          el.style.transform = 'translateY('+y+'px)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translateX('+x+'px)';
          inner.style.transform = 'translateX('+x+'px)';
        }
      }
    },
     dropping(el,done) {
      let rf = el.offsetHeight;
      el.style.webkitTransform = 'translate3d(0,0,0)';
      el.style.transform = 'translate3d(0,0,0)';
      let inner = el.getElementsByClassName('inner-hook')[0];
      inner.style.webkitTransform = 'translate3d(0,0,0)';
      inner.style.transform = 'translate3d(0,0,0)';
      el.addEventListener('transitionend', done);
     },
     afterDrop(el) {
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show=false;
        el.style.display = 'none';
      } 
    },
    listShow() {
    	if(this.totalCount > 0) {
    		this.flag = !this.flag;
    	}else {
        this.flag = false;
      }
      this.$nextTick(() => {
        if(!this.cartScroll) {
          this.cartScroll = new BScroll(this.$refs.cartContent, {
            click: true
          })
        }else {
          this.cartScroll.refresh();
        }
      })
    },
    clear() {
      this.selectFoods.forEach((food) => {
        food.count = 0;
      });
    },
    pay() {
      alert(`需要支付${this.totalPrice}元`)
    },
    selectTarget(el) {
      this.drop(el);
    }
  }
}
</script>

<style scoped>
.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.92rem;
  z-index: 50;
}
.content {
  display: flex;
  width: 100%;
  height: 100%;
}
.content-left {
  flex: 1;
  background: rgb(20,29,39);
  display: flex;
}
.cart-logo {
  position: relative;
  top: -0.24rem;
  width: 0.88rem;
  height: 0.88rem;
  background: #2b343c;
  text-align: center;
  line-height: 1.02rem;
  border-radius: 50%;
  border: 0.12rem solid #141d27;
  margin: 0 0.24rem;
}
.icon-shopping_cart {
  font-size: 0.48rem;
  color: #80858a;
}
.cart-allPrice, .cart-desc {
  color: rgba(255,255,255,0.4);
  height: 0.48rem;
  margin-top: 0.2rem;
}
.cart-allPrice {
  font-size: 0.32rem;
  font-weight: 700;
  line-height: 0.48rem;
  padding-right: 0.24rem;
  border-right: 0.01rem solid rgba(255,255,255,0.4);
}
.cart-desc {
  flex: 1;
  font-size: 0.24rem;
  line-height: 0.48rem;
  margin-left: 0.24rem;
  padding-right: 0.24rem;
  white-space: nowrap;
}
.content-right {
  width: 1.78rem;
  height: 100%;
  background: #2b333b;
  line-height: 0.92rem;
  font-size: 0.24rem;
  font-weight: 700;
  color: rgba(255,255,255,0.4);
  text-align: center;
  padding: 0 0.16rem;  
}
.num {
  position: absolute;
  width: 0.48rem;
  height: 0.32rem;
  background-color: #f01414;
  line-height: 0.32rem;
  text-align: center;
  top: -0.12rem;
  right: -0.12rem;
  border-radius: 0.16rem;
  font-size: 0.24rem;
  color: #fff;
  font-weight: 700;
  box-shadow: 0 0.04rem 0.08rem 0 rgba(0,0,0,0.4);
}
.heighLightBg {
  background-color:rgb(0,160,220);
}
.heighLightFont {
  color: #fff;
}
.toPay {
  background-color: #00b43c;
  color: #fff; 
}
/*.ball {
  position: fixed;
  left: 0.64rem;
  bottom: 0.46rem;
  z-index: 200;
  transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
}
.inner {
  width: 0.32rem;
  height: 0.32rem;
  background: rgb(0,160,220);
  border-radius: 50%;
  transition: all 0.4s linear;
}*/
.ball{
  position: fixed;
  left: 0.64rem;
  bottom: 0.44rem;
  z-index: 200;
  transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41); /*贝塞尔曲线*/
}
.inner{
  width: 0.32rem;
  height: 0.32rem;
  border-radius: 50%;
  background-color: rgb(0,160,220);
  transition: all 0.4s linear;
}
.shopcart-list {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0.92rem;
  background-color: #fff;
  z-index: -1;
}
.shopcart-list .list-header {
  height: 0.8rem;
  line-height: 0.8rem;
  background-color: #f3f5f7;
  padding: 0 0.36rem;
  border-bottom: 0.02rem solid rgba(7,17,27,0.1);
}
.shopcart-list .list-header .title {
  font-size: 0.28rem;
  font-weight: 200;
  color: rgb(7,17,27);
}
.shopcart-list .list-header .clean {
  font-size: 0.24rem;
  color: rgb(0,160,220);
}
.shopcart-list .list-content {
  max-height: 4.35rem;
  overflow: hidden;
}
.shopcart-list .list-content .lists {
  padding: 0 0.36rem 0.44rem 0.36rem;
}
.shopcart-list .list-content li {
  display: flex;
  padding: 0.24rem 0;
  line-height: 0.48rem;
  border-bottom: 0.01rem solid rgba(7,17,27,0.1);
}
.shopcart-list .list-content .name {
  font-size: 0.28rem;
  color: rgb(7,17,27);
  flex: 1;
}
.shopcart-list .list-content .price {
  font-size: 0.28rem;
  font-weight: 700;
  color: rgb(240,20,20);
}
.cart-cover {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(7,17,27,0.7);
  z-index: -10;
}
/*购物车弹出效果*/
.slide-enter-active, .slide-leave-active {
  transition: all 0.4s linear;
} 
.slide-enter, .slide-leave-to {
  transform: translateY(100%);
}
.slide-enter-to, .slide-leave {
  transform: translateY(0rem);
}
/*购物车遮罩*/
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: all 0.4s;
}
</style>
