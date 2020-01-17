<template>
  <div class="header">
    <div class="index_header" v-show="isLogin">
      <div class="laobi">
        <h2>{{user_message.money}}</h2>
        <h5>捞币</h5>
      </div>
      <div class="quan">
        <h2>0</h2>
        <h5>券</h5>
      </div>
      <div class="exchange" @click="go">
        <h5>去兑换</h5>
        <img src="../../public/images/index/right.png"/>
      </div>
    </div>
    <div class="btn" v-show="!isLogin" @click="userisLogin">
      <span>成为会员尊享更多权益</span>
      <button>登录/注册</button>
    </div>
    <!-- <div class="address" @click="goto">
      <span>地址</span>
      <img src="../../public/images/index/address.png"/>
    </div> -->
  </div>
</template>
<script>
import {mapState} from "vuex"
export default {
  data(){
    return{
      isLogin:false,
      user_message:{},
    }            
  },
  mounted(){
    this.userLogin();
  },
  updated(){
    this.userLogin();
  },
  methods:{
    go(){
      this.$router.push('/ExchangeList')
    },
    userLogin(){
      // console.log(1)
      this.axios.get("users/isLogin").then(res=>{
        if(res.data.code==-1){
          this.isLogin=false;
        }else{
          // console.log(res.data.data);
          this.isLogin=true;
          this.user_message=res.data.data[0];
          // console.log(this.user_message)
        }
      })
    },
    userisLogin(){
      this.$router.push('/Login')
    }
  }
}
</script>
<style scoped>
  .btn{
    width:180px;
    height:60px;
    margin-left:100px;
    padding-top:35px;
  }
  .btn>span{
    font-size:18px;
  }
  button{
    width:100px;
    height:35px;
    font-size:18px;
    line-height:35px;
    color:red;
    background:#fff;
    outline:none;
    padding:0;
    border:0;
    margin-top:10px;
    border-radius:16px;
  }
  .header{
    height:120px;
    background:#E50112;
    border-bottom-left-radius:25%;
    border-bottom-right-radius:25%;
    color:#fff;
    position:relative;
  }
  .index_header{
    display:flex;
    justify-content:space-around; 
  }
  .index_header>div{
    margin-top:48px;
  }
  .laobi,.quan,.exchange{
    display:flex;
  }
  h2{
    padding-right:5px;
    font-size:30px;
  }
  h2,h5{
    margin:0px;
  }
  h5{
    line-height:32px;
  }
  .exchange>img{
    height:15px;
    margin-top:7px;
    margin-left:5px;
  }
  /* .address{
    position:absolute;
    top:10px;
    left:15px;
    display:flex;
  }
  .address>span{
    margin-top:3px;
  }
  .address>img{
    margin-left:5px;
    width:18px;
    height:18px;
  } */
</style>

