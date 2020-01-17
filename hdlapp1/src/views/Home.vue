<template>
  <div class="home">
    <!-- 面板 -->
    <mt-tab-container v-model="active" class="page-tabbar-container">
      <!-- 第一个子面板 -->
      <!-- 第一个子面板 -->
      <mt-tab-container-item id="index">
        <index></index>
      </mt-tab-container-item>
      <!-- 第二个子面板 -->
      <mt-tab-container-item id="cart">
        <cart></cart>
      </mt-tab-container-item>
      <!-- 第三个子面板 -->
      <mt-tab-container-item id="appraise">
        <ecaluate></ecaluate>
      </mt-tab-container-item>
      <!-- 第四个子面板 -->
      <mt-tab-container-item id="me">
        <family></family>
      </mt-tab-container-item>
    </mt-tab-container>
    <!-- 底部导航条 -->
    <mt-tabbar fixed v-model="active">
      <!-- 第一个按钮 首页 -->
      <mt-tab-item id="index" @click.native="changeState(0)" :class="{big:currentIdx[0].isSelect}">
        <tabbaricon :focused="currentIdx[0].isSelect" :selectedImage="require('../../public/user_img/first_active.png')" :normalImage="require('../../public/user_img/first.png')"></tabbaricon><span v-show="!currentIdx[0].isSelect">首页</span>
      </mt-tab-item>
      <!-- 第二个按钮 购物车 -->
      <mt-tab-item id="cart" @click.native="changeState(1)">
        <tabbaricon :focused="currentIdx[1].isSelect" :selectedImage="require('../../public/user_img/cart_active.png')" :normalImage="require('../../public/user_img/cart.png')"></tabbaricon>购物车
      </mt-tab-item>
      <!-- 第三个按钮 评价 -->
      <mt-tab-item id="appraise" @click.native="changeState(2)">
        <tabbaricon :focused="currentIdx[2].isSelect" :selectedImage="require('../../public/user_img/pj_active.png')" :normalImage="require('../../public/user_img/pj.png')"></tabbaricon>评价
      </mt-tab-item>
      <!-- 第三个按钮 我 -->
      <mt-tab-item id="me" @click.native="changeState(3)">
        <tabbaricon :focused="currentIdx[3].isSelect" :selectedImage="require('../../public/user_img/me_active.png')" :normalImage="require('../../public/user_img/me.png')"></tabbaricon>我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
import TabBarIcon from "../components/TabBarIcon.vue"   //引入子组件
import Family from "../components/Family.vue"
import Index from "../components/Index.vue"
import cart from "../components/cart.vue"
import ecaluate from "../components/ecaluate.vue"

import {mapState,mapMutations} from 'vuex'

export default {
  data(){
    return {
      active:"", //保存显示那个子面板id
      currentIdx:[  //下面数组保存按钮状态
        {isSelect:true},  //0 第一个按钮状态
        {isSelect:false}, //1 第二个按钮状态
        {isSelect:false}, //2 第三个按钮状态
        {isSelect:false}, //3 第四个按钮状态
      ]
    }
  },
  created(){
    this.active = this.panl;
    // console.log(this.active);
  },
  watch:{
    active(){
      this.changeState();
      if(this.active=="cart"){
        this.currentIdx[1].isSelect=true;
      }else if(this.active=="index"){
        this.currentIdx[0].isSelect=true;
      }else if(this.active=="me"){
        this.currentIdx[3].isSelect=true;
      }
    }
  },
  computed:{
     ...mapState(["panl"])
   },
  components:{
    "tabbaricon":TabBarIcon,  //注册底部导航图片
    "family":Family, //注册我的页面
    "index":Index, //注册首页
    "cart":cart,// 注册下单页面
    "ecaluate":ecaluate
  },
  methods:{
    changeState(idx){
      //1.创建循环遍历状态数组
      for(var i=0;i<this.currentIdx.length;i++){
        //2.如果当前下标下标与idx相同，元素true
        if(i==idx){
          this.currentIdx[i].isSelect=true;
        }else{
          //3.其他元素false
          this.currentIdx[i].isSelect=false;
        }
      }
    },
  },
}
</script>
<style scoped>
  .mint-tabbar.is-fixed{
    border-top:1px solid #888;
  }
  /* 功能：覆盖原生按钮文字颜色:选中 */
  .mint-tabbar>.mint-tab-item.is-selected{
    background-color:transparent;
    color:#E50112;
  }
  /* 默认颜色 */
  .mint-tabbar>.mint-tab-item{
    color:#888;
  }
  /deep/ .big .imgstyle{
    width:42px;
    height:42px;
  }
  .home{
    padding-bottom:49px;
  }
  .mint-tab-item{
    padding:2px;
  }
</style>
