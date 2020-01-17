<template>
<div class="index">
  <div id="totop" v-show="btnFlag" class="hid">
    <img src="../../public/user_img/login_logo_img.png" alt="">
    <span>海底捞</span>
  </div>
  <!-- 首页头部 -->
  <iheader></iheader>
  <carousel></carousel>
  <!-- 轮播图 -->
  <button @click="go">
    <img src="../../public/images/index/huoguo.png" alt="">
    <div class="alert">
      <p class="cn">开始点餐 </p>
      <p class="en">Order Now</p>
    </div>
  </button> 
  <!-- 热兑商品 -->
  <exchange></exchange>
</div>
</template>
<script>
import Carousel from "./Carousel.vue"
import Exchange from "./Exchange.vue"
import Iheader from "./Iheader.vue"
export default {
  data(){
    return {
      btnFlag:false,
    }
  },
  components:{
    "carousel":Carousel,
    "exchange":Exchange,
    "iheader":Iheader
  },
  mounted(){
    window.addEventListener('scroll', this.scrollToTop);
  },
  destroyed(){
    window.removeEventListener('scroll', this.scrollToTop)
  },
  methods:{
    go(){
      this.axios.get("users/isLogin").then(res=>{
        if(res.data.code==-1){
          this.$toast("请登录")
          this.$router.push("/Login");
        }else{
          this.$router.push('/Address')
        }
      })
    },
    scrollToTop () {
      const that = this;
      // 页面滚动距顶部距离
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 0) {
        // 向上滑动
        that.btnFlag = true
      } else {
        // 向下滑动
        that.btnFlag = false
      }
    },
  },
}
</script>
<style scoped>
  .index{
    text-align:center;
  }
  button{
    width:350px;
    height:50px;
    margin-top:10px;
    border:0;
    color:#fff;
    background:#E50112;
    display:flex;  
    padding:0;
    margin-left:13px;  
    border-radius:8px;
  }
  button>img{
    margin-left:120px;
    margin-right:10px;
  }
  .hid{
    position:fixed;
    background:#fff;
    padding:17px 0px;
    width:375px;
    text-align: center;
    z-index:100;
  }
  .hid>span{
    padding-left: 30px;
  }
  .hid>img{
    position:absolute;
    width:30px;
    top:10px;
    left:145px;
  }
</style>
