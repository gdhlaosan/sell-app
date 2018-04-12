<template>
	<div id="app">
  	<v-header :seller="seller"></v-header>
    <div class="nav">
      <div class="nav-item">
        <router-link :to="{'path': '/goods'}" active-class="active">商品</router-link>
      </div>
      <div class="nav-item">
        <router-link :to="{'path': '/ratings'}" active-class="active">评价</router-link>
      </div>
      <div class="nav-item">
        <router-link :to="{'path': '/seller'}" active-class="active">商家</router-link>
      </div>
    </div>
    <div class="content ofh">
      <keep-alive>
        <router-view :seller="seller"></router-view>
      </keep-alive>
    </div>
	</div>
</template>

<script>
import VHeader from '@/components/header/header'
import {urlParse} from '@/common/js/util'
const ERR_OK = 0;
export default {
  components: {
    VHeader
  },
  name: 'App',
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
          return queryParam.id;
        })()
      }
    }
  },
  created() {
    this.$http.get('api/seller?id=' + this.seller.id).then((res) => {
      var response = res.body;
      if(response.errno === ERR_OK) {
        this.seller = Object.assign({}, this.seller, response.data)
      }
    })
  }
}
</script>

<style>
@import './common/styles/icon.css';
#app .nav {
  height: 0.8rem;
  display: flex;
  border-bottom: 0.02rem solid rgba(7,17,27,0.1);
}
.nav-item {
  flex: 1;
  line-height: 0.8rem;
  font-size: 14px;
  text-align: center;
}
.nav-item a {
  display: block;
  color: rgba(77,85,93);
}
.active {
  color: rgb(240,20,20)!important;
}
</style>
