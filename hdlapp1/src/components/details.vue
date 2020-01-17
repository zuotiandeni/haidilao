<template>
  <div class="all">
    <div class="header">
      <div @click="goback">
        <img src="../../public/images/index/return.png"> 
      </div>
      <h1>商品详情</h1>
    </div>
    <div class="space"></div>
    <div class="xh" v-for="(item,i) of list" :key="i">
      <div class="pic">
        <!-- <img :src="'http://127.0.0.1:5050/'+item.dpic"> -->
      </div>
      <div class="name">
        <div class="h1">{{item.dname}}</div>
        <div class="intr">{{item.dintr}}</div>
        <div class="price">
          <span>{{item.dprice}}</span>
          捞币
        </div>
      </div>
      <!-- 产品规格 -->
      <div class="spe">
        <div>选择商品规格</div>
        <div>{{item.dspe}}
          <img src="../../public/images/index/right_arr.png"/>
        </div>
      </div>
      <!-- 会员等级 -->
      <div class="rank">
        <div>会员等级</div>
        <div>
          <span>红海</span>
          <img src="../../public/images/index/ok.png"/>
          <span>银海</span>
          <img src="../../public/images/index/ok.png"/>
          <span>今海</span>
          <img src="../../public/images/index/ok.png"/>
          <span>黑海</span>
          <img src="../../public/images/index/ok.png"/>
        </div>
      </div>
      <!-- 快递到家 库存 -->
      <div class="stock">
        <div>快递到家</div>
        <div>库存:{{item.dstock}}件
          <img src="../../public/images/index/right_arr.png"/>
        </div>
      </div>
      <!-- 推荐商品 -->
      <div class="products">
        <span>推荐商品</span>
        <div class="pro">
          <div>
            <img :src="'http://127.0.0.1:5050/'+item.dpic"/>
            <span>海底捞口袋坚果1盒375克</span>
          </div>
          <div>
            <img :src="'http://127.0.0.1:5050/'+item.dpic"/>
            <span>海底捞口袋坚果1盒375克</span>
          </div>
          <div>
            <img :src="'http://127.0.0.1:5050/'+item.dpic"/>
            <span>海底捞口袋坚果1盒375克</span>
          </div>
          <div>
            <img :src="'http://127.0.0.1:5050/'+item.dpic"/>
            <span>海底捞口袋坚果1盒375克</span>
          </div>
        </div>
      </div>
      <!-- 商品评价 -->
      <div class="appraise">
        <div class="app_header">
          <div>商品评价(19)</div>
          <div>
            <span>好评率：<span>100%</span></span>
            <img src="../../public/images/index/right_arr.png"/>
          </div>
        </div>
        <div class="app_body">
          <div class="bh">
            <div>
              <span>
                <img src="../../public/images/index/man.png">
              </span>
              <div class="uname">{{uname}}</div>
            </div>
            <!-- 几星评价 -->
            <div></div>
          </div>
          <div class="speak">{{speak}}</div>
          <div class="time">{{time}}</div>
        </div>
        <div class="app_body">
          <div class="bh">
            <div>
              <span>
                <img src="../../public/images/index/man.png">
              </span>
              <div class="uname">{{uname}}</div>
            </div>
            <div></div>
          </div>
          <div class="speak">{{speak}}</div>
          <div class="time">{{time}}</div>
        </div>
      </div>
    </div>
    <!-- 固定底部 -->
    <div class="space2"></div>
    <div class="bottom">
      <div>
        <img src="../../public/images/index/kefu.png">
        <span>客服</span> 
      </div>
      <div>
        <img src="../../public/images/index/like.png">
        <span>收藏</span>
      </div>
      <div class="cart"><span>加入购物车</span></div>
      <div class="change"><span>立即兑换</span></div>
    </div>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
  data(){
    return {
      list:[],
      uname:"TOM",
      speak:"非常新鲜的坚果",
      time:"2019-12-21 00:00:36",
      id:0,
    }
  },
  computed:{
    ...mapState(["panl"]),
  },
  created() {
    // var id = this.$route.params.id;
    // console.log(id)
    this.axios.get("index/details").then(res=>{
      this.list=res.data.data;
      // console.log(this.list)
    })
  },
  methods:{
    ...mapMutations(["changePanl"]),
    goback(){
      this.$router.push('/Home');
      this.changePanl("index");
    }
  }
}
</script>
<style scoped>
  /* 商品评价 */
  .appraise{
    border-radius:8px;
    background:#fff;
    margin:20px 15px 0 15px;  
    height:auto; 
    border-radius:8px; 
  }
  /* 评价 */
  .app_body{
    display:flex;
    flex-direction: column;
    padding-bottom:20px;
    border-bottom:1px solid #ccc;
  }
  .app_body>div{
    padding:10px;
  }
  .bh img{
    width:30px;
    height:30px;
    margin-top:10px;
  }
  .bh{
    display:flex;
    justify-content: space-between;
    padding:0 15px;
    height:50px;
  }
  .bh>div:first-child{
    line-height:50px;
    display:flex;
  }
  .uname{
    margin-left:10px;
  }
  .bh>div:last-child{
    height:16px;
    margin-top:17px;
  }
  /* 评价内容 */
  .app_body .speak,.time{
    display:flex;
    padding-left:15px;
  }
  .app_body .time{
    padding-left:15px;
    font-size:13px;
    color:rgb(158, 154, 154);
  }
  /* 评价头部 */
  .app_header{
    display:flex;
    justify-content:space-between;
    height:50px;
    border-bottom:2px solid #ccc;
  }  
  .app_header{
    line-height:50px;
    padding:0 15px;
  }
  .app_header>div{
    display:flex;
  }
  .app_header>div>img{
    width:20px;
    height:20px;
    margin-top:14px;
  }
  .app_header>div>span>span{
    color: #E50112;
  }
  /* 评价 */
  /* 推荐商品 */
  .products{
    height:240px;
    margin:20px 15px 0 15px;
    background:#fff;
    border-radius:8px;
  }
  .products>span{
    height:50px;
    line-height:50px;
    display:flex;
    margin-left:15px;
  }
  .pro{
    display:flex;
    width:auto;
    height:190px;
    overflow-x:scroll;
    -webkit-overflow-scrolling:touch;
    padding: 0 15px;
  }
  /* 隐藏滚动条 */
  .pro::-webkit-scrollbar{
    display:none
  }
  .pro>div{
    height:170px;
    padding-right:15px;
  }
  .pro>div>img{
    width:120px;
    margin-bottom:10px;
    height:120px;
  }
  .pro>div>span{
    line-height:1.5;
    display:flex;
    height:40px;
    width:120px;
    font-size:14px;
  }
  /* 头部 */
  .header{
    display:flex;
    height:60px;
    position:fixed;
    width:375px;
    z-index:11;
    background:#fff;
  }
  .header>div>img{
    width:50px;
    height:50px;
    margin-top:5px;
    margin-left:15px;
  }
  .header>h1{
    font-size:20px;      
    line-height:60px;
    margin-left:85px;
  }
  .space{
    height:60px;
  }
  /* 循环 */
  .xh{
    width:375px;
    text-align:center; 
    background:rgb(245, 242, 242);
  }
  /* 图片 */
  .pic{
    width:100%;
    height:280px;
    background-image:url(../../public/images/index/exchange1.png);
    background-size:100% 100%;
  }
  /* name */
  .name{
    width:340px;
    height:200px;
    background:#fff;
    margin:0 auto;
    line-height:1.8;
    color:rgb(41, 39, 39);
    margin-top:-65px;
    z-index:11;
    border-radius:8px;
    font-size:14px;
  }
  .name>.h1{
    font-size:24px;
    font-weight:bold;
    color:#E50112;
    padding-top:10px;
  }
  .name>.price{
    margin-top:15px;
    display:flex;
    flex-direction: column;
  }
  .name>.price>span{
    color:#E50112;
    font-size:30px;
    font-weight:500;
  }
  /* 商品规格 */
  .spe,.rank,.stock{
    display:flex;
    justify-content:space-between;
    margin-left:10px;
    width:310px;
    height:50px;
    margin-top:20px;
    margin:0 auto;
    background:#fff;
    margin-top:20px;
    border-radius:8px;
    line-height:50px;
    padding:0 15px;
    font-size:15px;
    color:rgb(41, 39, 39);
  }
  .spe>div>img,.stock>div>img{
    width:20px;
    height:20px;
    margin-top:14px;
  }
  .rank img{
    width:20px;
    height:20px; 
    margin-top:15px;
    margin-left:2px;
    margin-right:2px;  
  }
  .rank>div,.spe>div,.stock>div{
    display:flex;
  }
  .rank>div>span{
    color:#E50112;
    font-weight:bold;
  }
  /* 底部 */
  .bottom{
    width:375px;
    height:59px;
    display:flex;
    justify-content:space-between;
    font-size:15px;
    color:rgb(41, 39, 39);
    border:1px solid #ccc;
    position:fixed;
    bottom:0px;
  }
  
  .bottom img{
    width:25px;
    height:25px;
    margin:0 auto;
    margin-top:10px;     
  }
  .bottom span{
    margin:0 auto;
    margin-top:5px;
  }
  .bottom>div{
    display:flex;
    width:93.5px;
    flex-direction:column;
  }
  .bottom>div:first-child{
    border-right:1px solid #ccc;
    background:#fff;    
  }
  .bottom>div:nth-child(2){
    background:#fff;        
  }
  .cart,.change{
    line-height:60px;
    color:#fff;
  }
  .cart>span,.change>span{
    margin-top:0;
  }
  .cart{
    background-image:linear-gradient(to right,rgb(240, 79, 82),#EA111D);
  }
  .change{
    background-image:linear-gradient(to right,#424242,#212121);
  }
  .space2{
    height:80px;
    background:rgb(245, 242, 242);
  }
</style>


