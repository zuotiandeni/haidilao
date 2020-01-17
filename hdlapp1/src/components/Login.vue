<template>
  <div class="bg">
    <div class="app_login">
      <!-- 返回上一级 -->
      <i @click="goTop()"></i>
      <!-- 登录界面 -->
      <div v-show="lookLogin">
        <!-- 头部——欢迎 -->
        <div class="wel">
          <img src="../../public/user_img/login_logo_img.png" alt="">
          <h4>欢迎登录海底捞</h4>
          <p>成为会员尊享更多权益</p>
        </div>
        <!-- 头部——欢迎end -->
        <!-- 登录框 -->
        <div class="login">
          <mt-field placeholder="请输入用户名" v-model="uname" class="mint-field-core"></mt-field>
          <mt-field placeholder="请输入密码" v-model="upwd" type="password" class="mint-field-core"></mt-field>
          <mt-field placeholder="请输入验证码" class="mint-field-core" v-model="dl_yzm" ></mt-field>
          <input type="button" id="code" @click="createCode()" />
          <mt-button size="large" :class="{red:dl_uname&&dl_upwd}" :disabled="dl_uname==false||dl_upwd==false" @click="login()">登录</mt-button>
        </div>
        <!-- 账号及密码-->
        <div class="handle">
          <a href="javascript:;">忘记密码?</a>
          <a href="javascript:;" @click="goRegister">立即注册</a>
        </div>
        <!-- 第三方登录方式 -->
        <div class="thirdparty">
          <a href="javascript:;"><img src="../../public/user_img/weixin_icon.png" alt=""></a>
          <a href="javascript:;"><img src="../../public/user_img/weibo_icon.png" alt=""></a>
          <a href="javascript:;"><img src="../../public/user_img/qq_icon.png" alt=""></a>
        </div>
      </div>
      <!-- 注册页面 -->
      <div v-show="lookRegister">
        <!-- 欢迎注册 -->
        <div class="wel">
          <img src="../../public/user_img/login_logo_img.png" alt="">
          <h4>注册会员</h4>
        </div>
        <!-- 用户注册信息 -->
        <div class="login">
          <mt-field placeholder="请输入用户名" v-model="uname" class="mint-field-core"></mt-field>
          <span class="hint s1">3~8位汉字/字母</span>
          <mt-field placeholder="请输入密码" v-model="upwd" type="password" class="mint-field-core"></mt-field>
          <span class="hint s2">字母开头6~18位</span>
          <mt-field placeholder="请再次输入密码" v-model="upwd_two" type="password" class="mint-field-core"></mt-field>
          <mt-field placeholder="请输入手机号码" type="tel" class="mint-field-core" v-model="phone" ></mt-field>
          <div class="gender_cheak">
            <label>
              <input type="radio" id="man" value="1" v-model="gender">男
            </label>
            <label>
              <input type="radio" id="woman" value="0" v-model="gender">女
            </label>
          </div>
          <mt-field placeholder="请输入验证码" class="mint-field-core" v-model="dl_yzm" ></mt-field>
          <input type="button" id="code_two" @click="createCode()" />
          <mt-button size="large" :class="{red:dl_uname&&dl_upwd&&zc_phone}" :disabled="dl_uname==false||(dl_upwd==false||zc_phone==false)" @click="register()">注册</mt-button>
        </div>
        <!-- 用户注册信息end -->
      </div>
      <div class="user">
        <span>登录注册表示同意<a href="javascript:;">用户许可使用协议、隐私政策</a></span>
      </div>
    </div>
  </div>
</template>
<script>
import Qs from "qs"
export default {
  data(){
    return {
      uname:"",  //用户名
      upwd:"",   //密码
      dl_upwd:false,  //密码状态
      dl_uname:false,  //用户名状态
      code:"",  //登录页验证码
      code_two:"",  //注册页验证码
      dl_yzm:"",  //用户登录填写验证码
      yzm:false,   //登录验证码状态
      upwd_two:"",  //注册第二次密码
      phone:"",  //注册手机号
      zc_phone:false,  //手机号状态
      gender:1,   //性别
      lookLogin:true, //登录页面状态
      lookRegister:false, //注册页面状态
    }
  },
  mounted(){//在挂载之后触发,相当于onload
    this.createCode();
  },
  methods:{
    // 验证码
    createCode(){
      this.code="";
      this.code_two="";
      var checkCode = document.getElementById("code");
      var checkCode_two = document.getElementById("code_two")
      var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');//随机数
      for(var i = 0; i<4; i++) {  
        var index = Math.floor(Math.random()*36);  
        this.code += random[index];//取得随机数加到code上
        this.code_two += random[index];  
      }
      checkCode.value = this.code;
      checkCode_two.value = this.code_two;
    },
    // 登录验证
    login(){
      var inputCude = this.dl_yzm.toUpperCase();
      if(inputCude.length <= 0){
        this.$toast("请输入验证码！");
        return;
      }else if(inputCude != this.code){
        this.$toast("验证码输入错误！@_@");
        this.createCode();
        this.dl_yzm="";
        this.yzm=false;
        return;
      }else{
        this.axios.post("users/login",Qs.stringify({uname:this.uname,upwd:this.upwd})).then(res=>{
          if(res.data.code==-1){
            this.$toast("用户名或密码错误");
          }else if(res.data.code==1){
            this.$toast("登录成功");
            this.$router.push("/Home")
          }
        });
      };
    },
    // 注册验证
    register(){
      var inputCude_zc = this.dl_yzm.toUpperCase();
      if(this.upwd_two!=this.upwd){
        this.$toast("两次密码不同");
        this.upwd_two="";
        return;
      }if(inputCude_zc.length <= 0){
        this.$toast("请输入验证码！");
        return;
      }else if(inputCude_zc != this.code_two){
        this.$toast("验证码输入错误！@_@");
        this.createCode();
        this.dl_yzm="";
        this.yzm=false;
        return;
      }else{//发送ajax请求
        this.axios.post("users/register",Qs.stringify({uname:this.uname,upwd:this.upwd,phone:this.phone,gender:this.gender})).then(res=>{
          if(res.data.code==-2){
            this.$toast("该手机号码已注册");
          }else if(res.data.code==1){
            this.$toast("注册成功");
            this.lookLogin=true;
            this.lookRegister=false;
            this.uname="";
            this.upwd="";
            this.createCode();
          }else if(res.data.code==-3){
            this.$toast("用户名已存在")
          }
        })
      }
    },
    // 切换到注册页面
    goRegister(){
      this.lookLogin=false;
      this.lookRegister=true;
      this.uname="";
      this.upwd="";
      this.createCode();
      this.dl_yzm="";
    },
    goTop(){
      if(!this.lookLogin){
        this.lookLogin=true;
        this.lookRegister=false;
      }else{
        this.$router.push('/Home');
      }
    },
  },
  watch:{
    // 验证用户名格式是否正确
    uname(){
      var nreg = /^[a-zA-Z_\u4e00-\u9fa5]{2,8}$/;  //含有数字、字母、下划线、汉字的3到8位用户名
      this.dl_uname = nreg.test(this.uname);
    },
    // 验证密码格式是否正确
    upwd(){
      var preg=/^[a-zA-Z]\w{5,17}$/; //以字母开头，长度在6~18之间，只能包含字母、数字和下划线
      this.dl_upwd=preg.test(this.upwd);
    },
    // 监听验证码是否正确
    dl_yzm(){
      this.dl_yzm==this.code?this.yzm=true:this.yzm=false;
    },
    // 监听手机号是否正确
    phone(){
      var phone_reg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      this.zc_phone=phone_reg.test(Number(this.phone));
    },
  },
}
</script>
<style scoped>
/* 头部 */
.bg{
  height:667px;
  background: url("../../public/user_img/login_bg_img.png") no-repeat top center;
  background-size:100%;
}
.app_login{
  padding:60px 60px 0px 60px;
  position:relative;
}
.app_login .wel img{
  width:75px;
}
.app_login h4{
  margin:12px 0px;
  font-size:18px;
}
.app_login .wel p{
  padding-left:20px;
  background: url("../../public/user_img/red_box.png") no-repeat left center;
  background-size:15px 25px;
  font-size:15px;
}
.app_login>i{
  position:absolute;
  top:25px;
  left:30px;
  height:30px;
  width:30px;
  background:url(../../public/user_img/return.png) no-repeat center center;
  background-size:50px;
}
/* 登录部分 */
.login{
  position:relative;
}
.login button{
  border-radius:10px;
}
.mint-button.red{
  background:#E50112;
}
.mint-button::after{
  background-color:#E50112;
}
.mint-button{
  background: #666;
  font-size:15px !important;
  color:#fff;
  border-radius: 30px !important;
  height:50px;
  margin-top:30px;
}
.is-nolabel{
  border-bottom:1px solid #ccc !important;
  background: transparent;
}
.login a{
  padding-right:70px;
}
/deep/ input.mint-field-core{  /*input背景透明*/
  background:transparent;
}
/deep/ i.mintui.mintui-field-error:before{  /*去除输入框叉号*/
  content:"";
}
#code,#code_two{
  width:60px;
  height:30px;
  position:absolute;
  bottom:90px;
  right:10px;
  font-family:Arial,宋体; 
  font-style:italic; 
  color:rgb(235, 79, 89); 
  border:0; 
  padding:2px 3px; 
  letter-spacing:3px; 
  font-weight:bolder;
}
.is-nolabel:first-child{
  margin-top:15px;
}
/* 账号及密码 */
.handle{
  display:flex;
  justify-content: space-around;
  margin-top:15px;
}
.handle a{
  font-size:10px;
}
/* 第三方登录方式 */
.thirdparty{
  display:flex;
  justify-content: space-around;
  margin-top:25px;
}
.thirdparty a img{
  width:50px;
}
/* 注册页面 */
.gender_cheak{
  display:flex;
  justify-content: space-around;
  border-bottom:1px solid #ccc;
  height:49px;
  padding-right: 15px;
}
.gender_cheak label{
  line-height:49px;
  font-size:20px;
  color:#757575;
}
.gender_cheak label input{
  height:18px;width:18px;
  margin:0 10px;
}
.hint{
  font-size:10px;
  color:#757575;
  position:absolute;
  right:0px;
}
.s1{top:34px;}
.s2{top:83px;}
/* 用户协议 */
.user{
  margin-top:15px;
}
.user span{
  color:#757575;
  font-size:10px;
}
.user a{
  color:#E50112;
}
</style>
