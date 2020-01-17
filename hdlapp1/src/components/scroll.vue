<template>
    <div>
  <cube-scroll-nav
  :side="true"
  :data="data"
  :current="current"
  @change="changeHandler"
  @sticky-change="stickyChangeHandler" class="content">
  <cube-scroll-nav-panel
    v-for="item in data"
    :key="item.name"
    :label="item.name"
    :title="item.name"
    >
    <ul>
      <li v-for="(item,i) in item.foods" :key="i">
        <div class="img">
          <img  class="navimg" :src="'http://127.0.0.1:5050/'+item.image">
        </div>
        <div class="text">
          <p>{{item.name}}
          </p>
          <div class="text-bottom">
            <span><span>￥</span>{{item.price}}</span>
            <!-- <div class="text-bottom-right"> -->
            <!-- <span 
            :data-pid="item.info"
            :data-pprice="item.price"
            :data-pname="item.name"
            :data-count="item.count"
            :data-id="item.id"
            >-</span>
            <span>{{item.count}}</span> -->
            <span><img src="../assets/添加.png" alt=""
            @click="addlist" 
            :data-pid="item.info"
            :data-pprice="item.price"
            :data-pname="item.name"
            :data-count="item.count"
            :data-id="item.id"
            :data-image="item.image"
            ></span>
            <!-- </div> -->
          </div>
        </div>
      </li>
    </ul>
  </cube-scroll-nav-panel>
</cube-scroll-nav>
<ul class="prepend-header" slot="prepend">
    <div class="headercontent">
      <div class="headerimg">
        <img src="../assets/logo.jpg" alt="">
      </div>
      <div class="headertext">
        <div class="headertextleft">
          <span>{{addr}} <img src="../assets/切换.png" alt=""> </span>
          <span>营业中 | 商家配送 | 配送费 ￥15 | 送达60分钟</span>
        </div>
        <div class="headertextright">

        </div>
      </div>
    </div>
</ul>
<div class="bottom">
  <div class="bottom-tip">满40减￥15</div>
  <div class="bottomcontent">
  <div class="bottom-left">
    <div class="shop">
    <span v-show="count==0?false:true">{{count}}</span>
    <img src="../assets/购物车.png" alt="" @click="goCart">
    </div>
  </div>
  <div class="bottom-right">
    <div class="bottom-right-left">
      <span v-show="count==0?false:true">￥{{priceall}}</span><br>
      <span>另需配送费￥15</span>
    </div>
    <span v-if="count==0" >￥158起送</span>
    <div v-else class="ok" @click="goCart">选好了</div>
  </div>
  </div>
  </div>
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
// import conter from '../components/count'
import goodsData from "./json/good1-list.json"
import { setTimeout } from 'timers';
const  goods = goodsData.goods
export default {
  // components: {
  //   conter,conter
  // },
  data() {
    return {
      data:goods,
      current:goods[0].name, 
      count:0,
      priceall:0,
      price:[],
      name:[],
      id:[],
      baseURL:"http://127.0.0.1:5050/",
    }
  },
  computed:{
    ...mapState(["addr","panl"])
  },
  methods: {
    ...mapMutations(["changePanl"]),
    goCart(){
      this.$router.push("/Home");
      this.changePanl("cart");
    },
    changeHandler(label) {
      // console.log('changed to:', label)
    },
    stickyChangeHandler(current) {
      // console.log('sticky-change', current)
    },
   addlist(e){
      this.priceall+=parseFloat(event.target.dataset.pprice) 
      this.count++;
      this.price.push(event.target.dataset.pprice);
      this.name.push(event.target.dataset.pname);
      this.id.push(event.target.dataset.id)
      var id1 = e.target.dataset.id;
      var name =e.target.dataset.pname
      var price =e.target.dataset.pprice;
      var pimage = e.target.dataset.image;
      var url = "cart";
      var obj ={pid:id1,pname:name,pprice:price,pimage}
      // console.log(obj)
      this.axios.get(url,{params:obj}).then(res=>{
      this.$toast("添加成功")
      });
   },
  //   reducelist(e){
  //     this.priceall-=parseFloat(event.target.dataset.pprice) 
  //     this.count--;
  //     this.price.pop(event.target.dataset.pprice);
  //     this.name.pop(event.target.dataset.pname);
  //     var id1 = e.target.dataset.id;
  //     var name =e.target.dataset.pname
  //     var price =e.target.dataset.pprice;
  //     var url = "addcart/delete";
  //     var obj ={pid:id1,pname:name,pprice:price}
  //     console.log(obj)
  //     this.axios.get(url,{params:obj}).then(res=>{
  //     this.$toast("删除成功")
  //  })
  // },
  mounted(){
      console.log(this,addr)
  },
  created(){

  }
}
}
</script>
<style scoped>
.headertext{
  width:80%;
  height: 60px;
  margin-left:5px;
  color:white
}
.headertextleft{
  display: flex;
  flex-flow: column;
  padding-top:3px;
}
.headertextleft span{
  margin: 2px 0px;
}
.headertextleft img{
  width:18px;
  height:18px;
  vertical-align: bottom
}
.headertextleft span:last-child{
    font-size: 13px;
}
.headercontent{
  width:87%;
  padding: 3% 7%;
  margin: 0px auto;
  height: 50px;
  display: flex;
  flex-wrap: nowrap;
  border-bottom: 1px dotted white;
  position: fixed;
  top: 0px;
}
.prepend-header{
  height:100px;
  width: 100%;
  background: #60A2F1;
  margin-bottom: 15px;
}
.headerimg{
  display: inline-block;
  border-radius: 50%;
  height:43px;
  width:43px;
  padding: 4px;
  background: white
}
.headerimg img{
  width:100%;
}
.bottom-right{
  display: flex;
  justify-content: space-between;
  width: 80%;
  align-items: center;
}
.bottom-right div{
  display: inline-block;
}
.bottom-left div{
  display: inline-block;
  position: relative;
}
.shop{
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #60A2F1;
  padding: 8px;
  left:10%;
  bottom: 10%;
  border: 2px solid  #4A4A4A
}
.shop img{
  width: 100%;
  height: 100%;
}
.shop span{
  position:absolute;
  right: 5px;
  top :-2px;
  z-index: 20px;
  color:white;
  background: #ff6d7e;
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  text-align: center;
  border: 1px solid #ffffff;
  font-size: 12px;
  line-height: 16px;
}
.bottomcontent{
 position: fixed; 
  bottom: 0px;
  z-index: 10;
  background-color: #5B5B5B;
  width: 100%;
  display: flex;
  justify-content:space-between;
  height:65px;
}
.bottom-tip{
  width: 100%;
  height: 20px;
  background-color: blanchedalmond;
  text-align: center;
  position: fixed;
  z-index: 9; 
  bottom:65px;
  font-size: 14px;
  line-height: 20px;
}
.bottom{
  position: relative;
}
.bottom-right div{
   display: inline-block !important;
}
.bottom-right-left span{
  color: white
}
.bottom-right-left span:last-child{
  font-size: 10px;
  font-weight: 100px;
}
.ok{
  width:80px;
  height: 65px;
  text-align: center;
  line-height: 65px;
  display: inline-block;
  background: #60A2F1;
  color: white;
}
  .content {
    position: fixed;
    left: 0;
    width: 100%;
    bottom:70px;
    height: 70%;
    top:115px;
}
.cube-scroll-nav-panel {
    width: 95%;
    margin: auto;
}
.cube-scroll-nav-panel ul {
    overflow: hidden;
    font-size: 14px;
    line-height: 1.4;
    display: flex;
    flex-direction: column
}
.cube-scroll-nav-panel li {  
    width: 95%;
    color: #666;
   border: 1px solid #666;
   height: 100px;
   display: flex;
}
.cube-scroll-nav-panel li .text {
    width: 69%;
    display: flex;
    height: 100%; 
    flex-direction: column;
    justify-content: space-between;
    padding: 8px 10px 0px 8px;
}
.cube-scroll-nav-panel li .img{
    width: 29%;
    margin-right: 5px;
    display: inline-block;
    height: 100%;
    padding-top:8px; 
   
}
.cube-scroll-nav-panel li img{
  width: 80px;
  height:80px
}
.cube-scroll-nav-panel .text-bottom{
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0px 8px 18px;
  align-items: center
}
.cube-scroll-nav-panel .text-bottom span{
  display: inline-block ;
  color:#e50112;
  font-weight:600;
}
.cube-scroll-nav-panel .text-bottom span span{
 font-size: 12px;

}
.cube-scroll-nav-panel .text-bottom span img{
  width:20px;
  height: 20px;
}
</style>