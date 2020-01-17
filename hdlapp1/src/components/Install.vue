<template>
  <div class="set">
    <div class="set_header">
      <img src="../../public/user_img/return.png" alt="" @click="go_family()"> 
      <span>设置</span>
    </div>
    <div class="set_body">
      <p>消息设置</p>
      <img src="../../public/user_img/my_arrow.png" alt="">
      <span>未开启</span>
    </div>
    <p class="set_message"> 请在 “设置-通知” 功能中找到 “海底捞” 更改</p>
    <div class="set_body" v-for="(item,i) of list" :key="i">
      <p>{{item}}</p>
      <img src="../../public/user_img/my_arrow.png" alt="">
    </div>
    <p class="noLogin" @click="exitLogin">退出登录</p>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'

export default {
  data(){
    return {
      list:["黑名单","修改密码","清除缓存","版本信息","隐私政策","用户许可协议"],
    }
  },
  computed:{
    ...mapState(["panl"]),
  },
  mounted(){
    
  },
  methods:{
    ...mapMutations(["changePanl"]),
    exitLogin(){
      this.axios.get("users/exitLogin").then(res=>{
        if(res.data.code==1){
          this.$router.push("/Login");
        }
        if(res.data.code==-1){
          this.$toast("您暂未登录!")
        }
      })
    },
    go_family(){
      this.$router.push("/Home");
      this.changePanl("me");
    },
  }
}
</script>
<style scoped>
.set{
  height:667px;
  background:#f6f6f6;
}
.set_body{
  position: relative;
}
.set_header,.set_body>p{
  padding:15px 0 15px 10px;
  background:#fff;
  border-bottom:1px solid #ccc;
  font-size: 15px;
}
.set_body>img{
  width:20px;
  position:absolute;
  top:12px;
  right:10px;
}
.set_header{
  background:#fff;
  position:relative;
  height:50px;
  line-height: 50px;
  text-align: center;
  position: relative;
  padding:0px 0px 0px 10px;
}
.set_header>img{
  width:50px;
  position:absolute;
  left:10px;
}
.set_header>span{
  font-size:20px;
}
.set_message{
  padding:10px;
  font-size:10px;
  color:#999;
}
.set_body>span{
  position:absolute;
  right:30px;
  top:14px;
  font-size: 15px;
}
.noLogin{
  margin-top:10px;
  background:#fff;
  text-align: center;
  padding:17px 0px;
  font-size:15px;
}
</style>
