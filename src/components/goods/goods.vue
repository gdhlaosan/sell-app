<template>
	<div class="goods">
  	<div class="menu-wrapper" ref="menuDom">
  		<ul class="menus">
  			<li v-for="(item,index) in goods" class="menu-single" :key="index" :class="{cur: index == currentIndex}" @click="selectMenu(index)">
  				<span class="menu-textWrapper">
						<span v-if="item.type > 0" class="menu-icon" :class="classMap[item.type]"></span>{{item.name}}
  				</span>
  			</li>
  		</ul>
  	</div>
  	<div class="goods-wrapper" ref="goodsDom">
  		<ul>
  			<li v-for="(item, index) in goods" :key="index" class="good-list good-list-hook">
  				<h1 class="title pl28">{{item.name}}</h1>
  				<ul class="ofh">
  					<li v-for="(food, count) in item.foods" :key="count" @click="selectFood(food)" class="food-list ofh">
  						<div class="food-img">
  							<img :src="food.icon" alt="">
  						</div>
  						<div class="food-content pt4 ml20">
  							<h1 class="food-title pb16">{{food.name}}</h1>
  							<p v-if="food.description" class="food-desc pb16">{{food.description}}</p>
  							<div class="extra pb16">
  								<span class="mr24">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
  							</div>
  							<div class="price">
  								<span class="new-price mr16"><i class="new-price-icon">￥</i>{{food.price}}</span><span v-if="food.oldPrice" class="old-price">￥{{food.oldPrice}}</span>
  							</div>
  						</div>
              <div class="cartControl">
                <cart-control :food="food" @selectTarget="selectTarget"></cart-control>
              </div>
  					</li>
  				</ul>
  			</li>
  		</ul>
  	</div>
  	<shop-cart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shop-cart>
    <transition name="foodSlide">
      <food :food="selectedFood" v-if="selectFoodShow" @back="back" ref="food" @foodDetailSelected="selectTarget"></food>
    </transition>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import shopCart from '@/components/shopcart/shopcart'
import cartControl from '@/components/cartcontrol/cartcontrol'
import food from '@/components/food/food'

const ERR_OK = 0;

export default {
  name: 'Goods',
  props: {
    seller: {
      type: Object
    }
  },
  components: {
  	shopCart, cartControl, food
  },
  data() {
  	return {
  		goods: [],
  		listHeight: [],
  		scrollY: 0,
      selTarget: {},
      selectedFood: null,
      selectFoodShow: false
  	}
  },
  computed: {
  	currentIndex() {
  		for(let i = 0; i < this.listHeight.length; i++) {
  			let listHeight1 = Math.round(Math.abs(this.listHeight[i]));
  			let listHeight2 = Math.round(Math.abs(this.listHeight[i+1]));
  			if(!listHeight2 || this.scrollY >= listHeight1 && this.scrollY < listHeight2) {
  				return i;
  			}
  		}
  		return 0;
  	},
    selectFoods() {
      let result = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if(food.count) {
            result.push(food);
          }
        })
      });
      return result;
    }
  },
  created() {
  	this.$http.get('api/goods').then((res) => {
      var response = res.body;
      if(response.errno === ERR_OK) {
        this.goods = response.data;
      }
      this.$nextTick(() => {
      	this._initScroll();
      	this._calculateHeight();
      })
    })
    this.classMap = ['decrease','discount','special','invoice','guarantee']
  },
  methods: {
  	selectMenu(index) {
  		let foodList = this.$refs.goodsDom.getElementsByClassName('good-list-hook');
  		let el = foodList[index];
  		this.goodsScroll.scrollToElement(el,500);
  	},
  	_initScroll() {
  		this.menuScroll = new BScroll(this.$refs.menuDom,{
  			click: true
  		});
  		this.goodsScroll = new BScroll(this.$refs.goodsDom,{
        click: true,
  			probeType: 3
  		});
  		this.goodsScroll.on('scroll',(pos) => {
  			this.scrollY = Math.abs(pos.y);
  		});
  	},
  	_calculateHeight() {
  		let foodList = this.$refs.goodsDom.getElementsByClassName('good-list-hook');
  		let height = 0;
  		for(let i = 0; i < foodList.length; i++) {
  			let curentHeight = foodList[i].clientHeight;
  			this.listHeight.push(height);
  			height += curentHeight;
  		}
  	},
    selectTarget(target) {
      this.$refs.shopcart.drop(target);
    },
    selectFood(food) {
      this.selectedFood = food;
      this.selectFoodShow = true;
      this.$nextTick(() => {
        this.$refs.food.foodBScrol();
      })
    },
    back(data) {
      this.selectFoodShow = data;
    }
  }
}
</script>

<style scoped>
.goods {
	position: absolute;
	display: flex;
	width: 100%;
	top: 3.48rem;
	bottom: 0.92rem;
	overflow: hidden;
} 
.goods .menu-wrapper {
	width: 1.6rem;
	background-color: #f3f5f7; 
}
.goods .goods-wrapper {
	flex: 1;
}
.menus {
	width: 100%;
}
.menus .menu-single {
	display: table;
	width: 1.12rem;
	height: 1.08rem;
	line-height: 0.28rem;
	padding: 0 0.24rem;
}
.menus .menu-single .menu-textWrapper {
	display: table-cell;
	width: 1.12rem;
	vertical-align: middle;
	font-size: 0.24rem;
	color: rgb(7,17,27);
	border-bottom: 0.01rem solid rgba(7,17,27,0.1);
}
.menus .menu-single:last-child .menu-textWrapper {
	border-bottom: 0;
}
.menus .menu-icon {
	display: inline-block;
	width: 0.24rem;
	height: 0.24rem;
	margin-right: 0.04rem;
}
.menus .decrease {
	background: url(resource/decrease_3@2x.png) no-repeat;
	background-size: 100% 100%;
}
.menus .discount {
	background: url(resource/discount_3@2x.png) no-repeat;
	background-size: 100% 100%;
}
.menus .guarantee {
	background: url(resource/guarantee_3@2x.png) no-repeat;
	background-size: 100% 100%;
}
.menus .invoice {
	background: url(resource/invoice_3@2x.png) no-repeat;
	background-size: 100% 100%;
}
.menus .special {
	background: url(resource/special_3@2x.png) no-repeat;
	background-size: 100% 100%;
}
.good-list .title {
	height: 0.52rem;
	line-height: 0.52rem;
	color: rgb(147,153,159);
	font-size: 0.24rem;
	background-color: #f3f5f7;
	border-left: 0.04rem solid #d9dde1;
}
.food-list {
	display: flex;
  position: relative;
	margin: 0.36rem;
	padding-bottom: 0.36rem;
	border-bottom: 0.01rem solid rgba(7,17,27,0.1);
}
.food-list:last-child {
	border-bottom: none;
	margin-bottom: 0;
}
.food-list .food-img img{
	width: 1.14rem;
	height: 1.14rem;
}
.food-content .food-title {
	font-size: 0.28rem;
	font-weight: 700;
	line-height: 0.28rem;
	color: rgb(7,17,27);
}
.food-content .food-desc, .food-content .extra {
	font-size: 0.2rem;
	color: rgb(147,153,159);
}
.food-content .food-desc {
	line-height: 0.3rem;
}
.food-content .price {
	display: table-cell;
	height: 0.4rem;
	vertical-align: top;
}
.food-content .new-price {
	font-size: 0.32rem;
	color: rgb(240,20,20);
	font-weight: 700;
}
.food-content .new-price .new-price-icon {
	font-style: normal;
	font-size: 0.2rem;
}
.food-content .old-price {
	font-size: 0.2rem;
	color: rgb(147,153,159);
	text-decoration: line-through;
}
.cur {
	background-color: #fff;
	font-weight: 700;
	margin-top: -0.01rem;
	z-index: 1;
}
.cur .menu-textWrapper {
	border-bottom: 0!important;
}
.cartControl {
  position: absolute;
  right: 0;
  bottom: 0.36rem;
}
/*详情页滑出效果*/
.foodSlide-enter, .foodSlide-leave-to {
  transform: translateX(100%);
}
.foodSlide-enter-active, .foodSlide-leave-active {
  transition: all 0.2s linear;
}
.foodSlide-enter-to, .foodSlide-leave {
  transform: translateX(0);
}
</style>
