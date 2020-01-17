<template>
  <div class="my_family">
    <!-- 二维码 -->
    <div class="erweima" v-show="user_erweima" @click="close_erweima">
      <div id="qrCode" ref="qrCodeDiv"></div>
    </div>
    <!-- 我的 -->
    <div id="totop" v-show="btnFlag" class="hid">
      <span>我的</span>
    </div>
    <!-- 头部 -->
    <div class="my_header_card_bg">
      <div class="my_header_card">
        <!-- 个人二维码 -->
        <div @click="bindQRCode" v-show="user_isLogin">
          <img class="ewm" src="../../public/user_img/my_member_code.png" @click="look_erweima">
        </div>
        <!-- 未登录显示状态 -->
        <div class="nologin" v-show="!user_isLogin">
          <div class="noLogin_pic">
            <img src="http://127.0.0.1:5050/images/user/noLogin.jpeg" alt="">
          </div>
          <a href="http://127.0.0.1:9090/Login">登录注册</a>
        </div>
        <!-- 未登录显示状态 -->
        <!-- 登录显示状态 -->
        <div class="yeslogin" v-show="user_isLogin">
          <div class="nologin">
          <div class="noLogin_pic">
            <img :src="user_message.upic" alt="">
          </div>
          <span class="user_name">{{user_message.uname}}</span>
          <img class="divider" src="../../public/user_img/my_divider.png" alt="">
          <div class="hdl_welfare">
            <div class="hdl_money">
              <span>{{user_message.money}}</span>
              <span>捞币</span>
            </div>
            <div class="hdl_coupon">
              <span>0</span>
              <span>劵</span>
            </div>
          </div>
        </div>
        <!-- 登录显示状态end -->
        </div>
      </div>
    </div>
    <!-- 头部end -->
    <!-- 主要部分 -->
    <div class="my_body">
      <!-- 我的订单 -->
      <div class="my_indent">
        <span class="my_family_s">我的订单</span>
        <div class="indent_list">
          <div class="indent_list_car" v-for="(item,i) of list" :key="i">
            <a @click="goitem" :href="ago[i]">
              <img :src="'http://127.0.0.1:5050/'+item.inpic">
              <span>{{item.inname}}</span>
            </a>
          </div>
        </div>
      </div>
      <!-- 我的动态 -->
      <div class="dinamic">
        <span class="my_family_s">我的动态</span>
        <div v-for="(item,i) of my_dynamic" :key="i" @click="skip">
          <img :src="'http://127.0.0.1:5050/'+item.impic" alt=""/>
          <span>{{item.imname}}</span>
          <img src="../../public/user_img/my_arrow.png"/>
        </div>
      </div>
      <!-- 我的服务 -->
      <div class="dinamic">
        <span class="my_family_s">我的服务</span>
        <div v-for="(item,i) of my_serve" :key="i" @click="skip">
          <img :src="'http://127.0.0.1:5050/'+item.impic" alt=""/>
          <span>{{item.imname}}</span>
          <img src="../../public/user_img/my_arrow.png"/>
        </div>
      </div>
      <!-- 关于海底捞 -->
      <div class="dinamic">
        <span class="my_family_s">关于海底捞</span>
        <div v-for="(item,i) of my_respect" :key="i" @click="skip">
          <img :src="'http://127.0.0.1:5050/'+item.impic" alt=""/>
          <span>{{item.imname}}</span>
          <img src="../../public/user_img/my_arrow.png"/>
        </div>
      </div>
      <!-- 个人设置 -->
      <div class="set_top">
        <div class="set" @click="set_message">
          <img src="../../public/user_img/my_setting.png" alt="">
          <span>设置</span>
          <img src="../../public/user_img/my_arrow.png"/>
        </div>
      </div>
      <!-- 个人设置end -->
    </div>
    <!-- 主要部分end -->
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import QRCode from 'qrcodejs2';
export default {
  data(){
    return {
      list:[], //我的订单数据
      user_erweima:false,  //二维码显示状态
      my_dynamic:[],  //我的动态数据
      my_serve:[],   //我的服务数据
      my_respect:[], //关于海底捞
      user_message:{}, //用户基本信息
      user_isLogin:true, //用户登录状态
      btnFlag:false,
      ago:[] //a标签跳转
    }
  },
  // 计算属性
  computed:{
    ...mapState(["IsLogin"])  //全局变量
  },
  created(){
    this.isLogin();
    this.goitem();
  },
  updated(){
    this.isLogin();
  },
  mounted(){
    this.lookList();
    this.look_important();
    window.addEventListener('scroll', this.scrollToTop);
  },
  destroyed(){
    window.removeEventListener('scroll', this.scrollToTop)
  },
  methods:{
    // 共享登录状态
    ...mapMutations(["setLogin"]),  //全局函数
    // 顶部隐藏"我的"
    scrollToTop () {
      const that = this;
      // 页面滚动距顶部距离
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 100) {
        // 向上滑动
        that.btnFlag = true
      } else {
        // 向下滑动
        that.btnFlag = false
      }
    },
    // 获取我的订单部分数据
    lookList(){
      this.axios.get("users/indent").then(res=>{
        this.list = res.data;
      });
    },
    goitem(){
      this.axios.get("users/isLogin").then(res=>{
        if(res.data.code==-1){
          this.ago=["http://127.0.0.1:9090/Login","http://127.0.0.1:9090/Login","http://127.0.0.1:9090/Login","http://127.0.0.1:9090/Login","http://127.0.0.1:9090/Login"];
        }else{
          this.ago=["javascript:;","javascript:;","http://127.0.0.1:9090/hiscart","http://127.0.0.1:9090/Address","http://127.0.0.1:9090/ExchangeList"]
        }
      })
    },
    // 发送请求查看用户是否登录,并获取用户信息
    isLogin(){
      // console.log(1)
      this.axios.get("users/isLogin").then(res=>{
        if(res.data.code==-1){
          this.user_isLogin=false;
        }else{
          // console.log(res.data.data);
          this.user_message=res.data.data[0];
          // console.log(this.user_message)
          this.setLogin(this.user_isLogin);
        }
      })
    },
    // 二维码生成
    bindQRCode(){
      var qrcode = document.getElementById("qrCode");
      if(qrcode.innerHTML != ""){
        qrcode.innerHTML = "";
      }
      new QRCode(this.$refs.qrCodeDiv, {
        text: `  会员信息
      用户名:${this.user_message.uname}
      用户电话:${this.user_message.phone}
      捞币余额:${this.user_message.money}
        `,
        width: 200,
        height: 200,
        colorDark: "#333333", //二维码颜色
        colorLight: "#ffffff", //二维码背景色
        correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
      })
    },
    // 显示二维码
    look_erweima(){
      this.user_erweima=true;
    },
    // 关闭二维码
    close_erweima(){
      this.user_erweima=false;
    },
    // 获取主要内容区域信息
    look_important(){
      this.axios.get("users/important").then(res=>{
        var rows = res.data;
        this.my_dynamic = rows.slice(0,3);
        this.my_serve = rows.slice(3,6);
        this.my_respect = rows.slice(6,9);
      })
    },
    // 我的页面跳转
    skip(){
      if(this.user_isLogin==false){
        this.$router.push("/Login");
      }else{
        this.$toast("该功能暂未开放!");
      }
    },
    // 跳转到设置页
    set_message(){
      this.$router.push("/Install");
    },
  },
}
</script>
<style scoped>
/* 我的 */
.hid{
  position:fixed;
  background:#fff;
  padding:17px 0px;
  width:375px;
  text-align: center;
  z-index:100;
}
.hid>span{
  font-size:18px;
}
/* 头部 */
.my_family{
  text-align: center;
  position:relative;
}
.my_header_card_bg{
  height:252px;
  background:url(../../public/user_img/my_red_he_bg.png) no-repeat center top;
  background-size:100%;
}
.my_header_card{
  width:375px;
  height:192px;
  background:url(../../public/user_img/my_header_card.png) no-repeat center top;
  background-size:100%;
  position: absolute;
  top:60px;
  left:0px;
}
.nologin a{
  width:150px;
  height:50px;
  background: url(../../public/user_img/my_login_btn.png) no-repeat center center;
  background-size:100%;
  position:absolute;
  top:80px;
  left:114.5px;
  line-height:50px;
  color:#E50112;
}
.noLogin_pic{
  width:70px;
  height:70px;
  border:3px solid #fff;
  border-radius:50%;
  overflow:hidden;
  text-align:center;
  vertical-align: middle;
  position: absolute;
  left:150.5px;
  top:-20px;
}
.noLogin_pic img{
  width:100%;
  height:100%;
}
/* 主要部分 */
.my_family_s{
  display:block;
  height:35px;
  line-height:35px;
  font-size:10px;
  background:#f6f6f6;
  text-align: left;
  padding-left:15px;
}
/* 我的订单 */
.indent_list{
  display:flex;
  justify-content: space-around;
  margin:25px 0px;
}
.indent_list_car a{
  display:flex;
  flex-direction: column;
  text-align: center;
}
.indent_list_car span{
  display:inline;
  font-size:10px;
  margin-top:10px;
}
.indent_list_car img{
  width:26px;
}
/* 登录显示状态 */
.user_name{
  font-size:20px;
  position: absolute;
  top:65px;
  left:153px;
  padding-right:60px;
  background:url("../../public/user_img/my_vip_red.png") no-repeat center right;
  background-size:58px;
}
.divider{
  position: absolute;
  top:100px;
  width:310px;
  left:30px;
}
.hdl_money,.hdl_coupon{
  position:absolute;
  top:135px;
}
.hdl_money{left:75px;}
.hdl_coupon{right:75px;}
.hdl_money>span:first-child,.hdl_coupon>span:first-child{
  color:#E50112;
  padding-right:5px;
  font-size:20px;
}
.hdl_money>span:nth-child(2),.hdl_coupon>span:nth-child(2){
  font-size:15px;
}
/* 个人二维码 */
img.ewm{
  position:absolute;
  top:-25px;
  right:20px;
  width:25px;
}
.erweima{
  position: absolute;
  width:100%;
  height:100%;
  background:#cccccca3;
  z-index: 1000;
}
#qrCode{
  position:fixed;
  left:87.5px;
  top:233.5px;
}
/* 主要部分 */
.dinamic{
  text-align: left;
}
.dinamic>div{
  border-bottom:1px solid #ccc;
  margin-left:10px;
  padding:15px 0px;
  position: relative;
}
.dinamic>div:nth-child(4){
  border:none;
}
.dinamic>div>img,.set>img{
  width:20px;
  position: absolute;
  top:13px;
}
.dinamic>div>img:first-child{
  left:5px;
}
.dinamic>div>img:last-child,.set>img:last-child{
  right:10px;
}
.dinamic>div>span,.set>span{
  padding-left:35px;
  font-size:15px;
}
/* 个人设置 */
.set_top{
  background:#f6f6f6;
  padding:10px 0 25px 0;
}
.set{
  position: relative;
  text-align: left;
  background:#fff;
  padding:15px 0px 15px 10px;
}
.set>img:first-child{
  left:15px;
}
</style>
