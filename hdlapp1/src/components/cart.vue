
<template>
<div>
  <div v-show="!IsLogin" class="notLog">
    <img src="../../public/user_img/timg.jpg" alt="">
    <span>您还未登录,请先登录</span>
    <button @click="goLog">去登陆</button>
  </div>
  <!-- 登录状态 -->
  <div class="body" v-show="IsLogin">
    <div class="header"> <div class="close"><img src="../assets/back.png" alt="" @click="goScroll"> 
    </div> 确认订单</div>
     <div class="bg1"></div>
    <div class="header-act">
      <div class="header-bao">
      <div class="header-act-left"> 外卖
      </div>
      <div class="header-act-right"> 自提
      </div>
      </div>
      <div class="address"><img src="../assets/地址.png" alt="" class="add-img">
      <div class="address-right">
        <div class="add-right-left">
        <span>选择收货地址</span>
        <span>您还没有添加地址呦~</span>
        </div>
        <img src="../assets/下一步.png" alt="" class="next">
        </div>
      </div>
      <div class="time"><img src="../assets/时间.png" alt=""><div class="time-right">
        <div class="time-right-left"><span>送达时间</span></div>
        <div class="time-right-right">
            尽快送到
          <img src="../assets/下一步.png" alt="" class="next">
        </div>
      </div>
    </div>
    <div class="pay"><img src="../assets/支付.png" alt="">
      <div class="pay-right">
        <div class="pay-right-left">
        支付方式
        </div>
        <div class="pay-right-right">
            在线支付
        </div>
      </div>
    </div>
    </div>
    <!--顶部位置:全选复选框-->
    <div class="contentbottom">
      <div class="address">{{address}}</div>
    <div class="selectAll">
      全选
      <input type="checkbox" v-model="allcb" @click="selectAll"/>
    </div>
    <!--中间位置:购物车商品-->
    <!--任务:全选按钮-->
    <div class="scroll-list-wrap">
      <cube-scroll
    ref="scroll"
    :data="items">
     <div v-for="(item,i) of list" :key="i"  class="cart-item">
        <div class="lefttxt">
          <img :src="'http://127.0.0.1:5050/'+item.pimage">
          <input type="checkbox" v-model="item.cb" @click="changeItem"/>
          <div class="lname">
            {{item.pname}}
          </div>
          <div class="count-price">
             ×{{item.count}} <span  class="item-price">￥{{item.count*item.pprice}}</span>
          </div>
         </div>
         <mt-button @click="del" :data-id="item.pid">删除</mt-button>
     </div>
      </cube-scroll>
     </div>
    <!--底部位置:数量-->
    <div class="count-del">
      <span>数量<span class="count">{{list.length}}</span></span>
      <mt-button @click="delItem" class="delete">删除选中的商品</mt-button>
    </div>
    <div class="addpay">配送费 <span>￥{{addpay}}</span></div>
    </div>
    <div class="paycart">
        <div class="paycartdeader"
        >使用优惠券<img src="../assets/下一步.png" alt="" class="next"></div>
        <ul>
          <li>原价<span>￥{{priceall}}</span></li>
          <li>附加费<span>￥{{addpay}}</span></li>
          <li>活动优惠<span>-￥35</span></li>
          <li><span> </span><div class="total">总计<span><span>￥</span>{{total}}</span></div></li>
        </ul>
    </div>
    <div class="choosewrite">选填</div>
    <div class="note">
        <ul>
          <li>备注<input type="text" v-model="note1"></li>
          <li>餐具数量<input type="text" v-model="note2"></li>
          <li>发票抬头<input type="text"></li>
          <li>纳税人识别号<input type="text"></li> 
        </ul>
    </div>
    <div class="foot-dir"></div>
    <div v-show="!list.length" class="foot">
      <a @click="gobuy">去购物</a>
    </div>
    <div v-show="list.length" class="foot">
        <div class="foot-left">已优惠-￥35
        </div>
        <div class="foot-right">
          <div>还需付<span>￥{{total}}</span></div>
          <div @click="confirm">确认下单</div>
        </div>
    </div>
  </div>
</div>
</template>
<script>
import {mapState} from 'vuex'
import { setTimeout, setInterval, clearTimeout } from 'timers';
export default {
    data(){
        return{
            list:[],
            allcb:false,
            items:[],
            priceall:0,
            address:"",
            addpay:29,
            total:0,
            note1:"",
            note2:"",
            details:[]
        }
    },
    computed:{
      ...mapState(["addr","IsLogin"])
    },
    methods:{
      goScroll(){
        this.$router.push("/scroll")
      },
      gobuy(){
        this.$router.push("/Address");
      },
      goLog(){
        this.$router.push("/Login");
      },
      confirm(){
        var orderid=new Date().getTime()+"hdl"
        var order_pcount=this.list.length
        var order_priceall=this.total
        var uid=this.list[0].uid
        var order_details=""
        var order_addr=this.address
        var order_pimage = this.list[0].pimage
        for(var i=0;i<this.list.length;i++){
            this.details[i]= `商品编号:${this.list[i].pid},价格:${this.list[i].pprice},名称:${this.list[i].pname}`
        }
        for(var item of this.details){
          order_details+=item
        }
        // console.log(this.details)
        var orderobj={orderid,order_pcount,order_priceall,order_details,uid,order_addr,order_pimage}
        // console.log(orderobj)
         this.axios.get("order",{params:orderobj}).then(res=>{
          if(res.data.code==1){
            this.$toast("支付成功");
            var totalall = Math.floor(this.total);
            var obj = {totalall:totalall}
            this.axios.get("order/hdlmoney",{params:obj}).then(res=>{
              console.log(res)
              if(res.data.code==1){
                // console.log("成");
                 this.clear(); 
                 this.loadMore()
              }else{console.log("错误")}
            })
            // console.log(totalall);
            
           /* var time=setTimeout(
              this.loadMore()
            ,500)*/
          }else if( res.data.code==-1){
            this.$toast("下单人数过多，请稍后再试")
          }
        })
      },
        clear(){
            var str = "";
            for(var item of this.list){
                    str +=item.pid+",";
                   }
                   if(str.length==0){
                       this.$messagebox("购物车已为空","没有商品可以删除");
                       return
                   }
                   str = str.substring(0,str.length-1);
                   this.axios.get("cart/delm",{params:{ids:str}});
          },
        selectAll(e){
            var cb=e.target.checked;
            for(var item of this.list){
                item.cb= cb;
            }
        },
        delItem(){
     this.$messagebox.confirm("是否删除指定商品")
      .then(res=>{
        var str = "";
        for(var item of this.list){
          if(item.cb){
            str +=item.pid+",";
          }
        }
        if(str.length==0){
          this.$messagebox("消息","请选择需要删除的商品");
          return;
        }
        str = str.substring(0,str.length-1);
        console.log(str);
        this.axios.get("cart/delm",{params:{ids:str}}).then(res=>{
          console.log(res);
          this.$toast("删除成功")
          this.loadMore();
        })
      })
      .catch(err=>{
        console.log(err)
      })
        },
         changeItem(){
      var sum =0 ;
      for (var item of this.list){
        if(item.cd){
          sum++
        }
      }
      if(sum==this.list.length){
        this.allcd=true;
      }else{
        this.allcb=false
      }
    },
        loadMore(){
            var url ="cart/find"
            this.axios.get(url).then(res=>{
                if(res.data.code==-2){
                  this.IsLogin==false;
                  return;
                }
                var rows = res.data.data;
                for(var item of rows){
                    item.cb=false;
                    this.priceall+=parseInt(item.pprice*item.count) 
                }
                this.priceall>40?this.priceall-15:this.priceall
                this.total=this.priceall+this.addpay-35;
                this.list =rows;
                this.details.length=this.list.length;
                this.priceall=0;
                // console.log(this.list)
            })
        },
    del(e){
  this.$messagebox.confirm("是否删除指定商品")
  .then(res=>{
     var pid = e.target.dataset.id;
     console.log(pid);
      this.axios.get("cart/del",{params:{pid}}).then(res=>{
          if(res.data.code==-2){
            this.$toast("请登录");
          }else if(res.data.code==-1){
            this.$toast("删除失败")
          }else{
            this.$toast("删除成功");
             this.loadMore();
          }
      })
  })
  .catch(err=>{
    console.log(err)
  })
    },
    },
       
    created(){
        this.loadMore();
        var start = this.addr.indexOf("(");
        this.address = "海底捞外送"+this.addr.slice(start)
    },
}
</script>
<style scoped>
.notLog{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}
.notLog button{
  width:140px;
  height:40px;
}
.foot-dir{
  height:60px;
  background: whitesmoke;
}
.choosewrite{
  padding: 0px 10px;
}
.foot-left{
  width: 30%;
  padding-left:8px;
}
.foot-right{
  width: 65%;
  display: flex;
  justify-content: space-between;
}
.foot-right div:first-child span{
    font-weight: 500;
    color: #60A2F1;
    font-size: 20px;
}
.foot-right div:first-child{
  display: flex;
  align-items: center;
}
.foot-right div:last-child{
  width: 100px;
  text-align: center;
  background: #60A2F1;
  color: white;

}
.foot{
  border-top:1px solid rgb(236, 232, 232);
  margin-top:20px;
  position: fixed;
  bottom:50px;
  height: 50px;
  line-height: 50px;
  background: #fefefe;
  width: 100%;
  display:flex;
  justify-content: space-between;
}
.note{
  width: 89%;
  margin:10px auto;
  padding: 8px 10px;
  background: #fefefe;
  border-radius: 5px;
}
.note li{
display: flex;
justify-content: space-between;
height: 40px;
line-height: 40px;
}
.note li:first-child{
  border-bottom: 1px solid silver;
}
.note input{
  width: 68%;
  outline: 0px;
}
.body{
  background:whitesmoke !important;
}
.close>span{
  font-size: 16px;
  padding-top:3px;
  padding-right:10px;
}
.add-img{
  padding-right:6px;
}
.paycartdeader{
  font-size:18px;
  font-weight:600;
  padding-left: 8px;
  height:50px;
  line-height: 50px;
  border-bottom:1px solid silver;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.paycart{
  width:94%;
  background: white;
  margin: 10px auto;
  border-radius: 5px;
}
.paycart ul{
    margin: 0px;
    padding: 0px;
}
.paycart li{
  padding: 8px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  height: 25px;
}
.paycart li span{
  color: #e50112
}
.paycart li:last-child span{
  color: #e50112;
  font-size: 20px;
  font-weight: 600;
}
.paycart li:last-child span span{
    font-size: 14px;
}
.paycart li:last-child div{
  font-size: 20px;
  font-weight: 600;
}
.addpay{
  display:flex;
  justify-content: space-between;
  padding: 5px ;
  background: #fefefe;
  margin: 10px 0px;
}
.addpay span{
  font-weight: 600px;
  font-size: 18px;
}
.address{
  text-align: center;
  font-size: 20px;
  font-weight:600;
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding-top:10px;
}
.count-price{
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  width: 80px;
  padding-left:10px;
  align-items:flex-end;
  position: absolute;
  right: 65px;
  top: 0px;
  line-height:40px; 
}
.item-price{
  color: #e50112;
}
.count-del{
  display: flex;
  justify-content: space-between;
  padding: 10px 0px;
  align-items: center;
  background: #fefefe;
  padding: 0px 0px 0px 5px ;
  margin: 10px 0px 0px;
}
.priceall{
  text-align: right;
}
.count{
  padding-left:10px;
  font-size: 14px;
  color: #e50112
}
.wrapper{
  height: 300px;
  width: 90%;
  margin:220px auto 0px;
  background: #ccc;
}
.header-act{
  width: 94%;
  background:white;
  position: absolute;
  z-index: 11;
  height: 200px;
  top:65px;
  left:3%;
  border-radius: 8px;
}
.header{
  position: relative;
  padding: 15px 0px;
  text-align: center;
  font-size: 20px;
}
.header-bao{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
}
.body{
  background:#fefefe
}
.close{
  width:100px;
  display: flex;
  justify-content: space-between;
  padding: 15px 15px;
  height: 50px;
  position: absolute;
  top:0px;
  left: 0px;
  font-size: 20px;
}
.close img{
  width: 20px;
  height: 20px;
}
.bg1{
  background: rgb(31, 29, 29);
  position: absolute;
  top:50px;
  height: 150px;
  z-index: 10;
  width: 100%;
}
/*1:购物车商品*/
.cart-item{
 display: flex;/*子元素水平*/
 /*水平两端对齐*/
 justify-content: space-between;
 /*垂直居中 32*/
 align-items: center;
 border-bottom:1px solid #ccc;
 background: #fefefe;
 position: relative;
}
/*2:左侧商品与价格*/
.lefttxt{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height:40px;
}
.lefttxt img{
  width:40px;
  height:40px;
}
.header-act-left{
  width:50%;
  height: 50px;
  text-align: center;
  display:inline-block;
  border-radius: 5px 0 0 0;
  line-height: 50px;
  font-size: 20px;
  font-weight: 600;
}
.header-act-right{
  width: 50%;
  height: 50px;
  text-align: center;
  background: rgb(31, 29, 29);
  opacity: 0.75;
  display:inline-block;
  border-radius: 0px 5px 0 5px;
  line-height: 50px;
  font-size: 20px;
  color: black;
  font-weight: 600;
}
.address img{
  width: 25px;
  height: 25px;
  margin-left:18px;

}
.address-right{
  display: flex;
  justify-content: space-between;
  width: 85%;
}
.address-right span:first-child{
  font-weight: 600;
  font-size: 17px;
}
.address-right span:last-child{
  font-size: 14px;
  padding: 5px 0px
}
.add-right-left{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.time img{
  width: 25px;
  height: 25px;
  margin-left:18px;

}
.time-right{
  display: flex;
  justify-content: space-between;
  width: 85%;
  align-items: top;
}
.time-right span:first-child{
  font-weight: 600;
  font-size: 17px;
  padding-top:9px;
}
.time{
  display: flex;
  justify-content: space-between;
  margin: 10px 0px;
}
.time-right-left{
  display: flex;
  align-items: top;
}
.next{
  width: 20px !important;
  height: 20px !important;
  padding: 10px;
  vertical-align: text-top;
}
.time-right-right{
  display: flex;
  align-items: center
}
.pay img{
  width: 25px;
  height: 25px;
  margin-left:18px;

}
.pay-right{
  display: flex;
  justify-content: space-between;
  width: 85%;
}
.pay-right span:first-child{
  font-weight: 600;
  font-size: 17px;
  padding-top:9px;
}
.pay{
  display: flex;
  justify-content: space-between;
  margin: 10px 0px;
}
.pay-right-left{
  display: flex;
  align-items: center;
  font-size: 17px;
  font-weight: 600;
}
.next{
  width: 20px !important;
  height: 20px !important;
  padding: 10px;
  vertical-align: text-top;
}
.pay-right-right{
  display: flex;
  align-items: center;
  padding-right: 20px;
  
}
.contentbottom{
  margin: 250px auto 0px;
  width: 90%;
  border-radius: 8px;
  background: white;
  padding: 5px 5px 5px 10px;
}
.scroll-list-wrap{
  height: 150px !important;
  margin: 10px 0px 0px;
  
  }
</style>