<template>
  <div class="list">
    <div class="header">
      <h1>
        <div @click="reback">
        <img src="../../public/user_img/return.png" ></div>
        <span>捞币商城</span>
      </h1>
    </div>
    <div class="null"></div>
    <div v-for="(item,i) of list" :key="i">
      <div class="list_h">
        <span class="letter">本周上新</span>
        <span class="more">更多
          <img src="../../public/images/index/right_arr.png">
        </span>
      </div>
      <div class="list_header">
        <div class="f1_big">
          <img :src="'http://127.0.0.1:5050/'+item.lpic">
        </div>
        <div class="f1_small">
          <div class="small1">
            <img :src="'http://127.0.0.1:5050/'+item.lpic1">
            <div class="bottom1">
              <p>{{item.lname1}}</p>
              <p>
                <span>{{item.lcount1}}</span>捞币
                <img src="../../public/images/index/add.png">  
              </p>
            </div>
          </div>
          <div class="small2">
            <img :src="'http://127.0.0.1:5050/'+item.lpic2">
            <div class="bottom2">
              <p>{{item.lname2}}</p>
              <p>
                <span>{{item.lcount2}}</span>捞币
                <img src="../../public/images/index/add.png" alt="">
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <img v-if="btnFlag" class="go-top" @click="backTop" src="../../public/images/index/top.png">
  </div>  
</template>
<script>
export default {
 name: "ListBackToTop",
  data(){
    return {
      list:[],
      btnFlag:false,
      scrollTop:2,
      moveOffset:0
    }
  }, 
  mounted(){
    window.addEventListener('scroll', this.scrollToTop)
  },
  destroyed(){
    window.removeEventListener('scroll', this.scrollToTop)
  },
  created() {
    this.axios.get("index/ExchangeList").then(res=>{
      this.list=res.data.data;
      // console.log(this.list)
    })
  },
  methods: {
    reback(){
      this.$router.push('/Home')
    },
    backTop () {
      const that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
        if (that.scrollTop === 0) {
          clearInterval(timer)
        }
      },16)
    },
    scrollToTop () {
      const that = this;
      // 页面滚动距顶部距离
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      var scroll = scrollTop - that.moveOffset;
      that.moveOffset = scrollTop;
      that.scrollTop = scrollTop
      if (scroll > 0) {
        // 向上滑动
        that.btnFlag = true
      } else {
        // 向下滑动
        that.btnFlag = false
      }
    }
  },
}
</script>
<style scoped>
  .go-top{
    width:40px ;
    height:40px;
    position:fixed;
    bottom:10px;
    right:15px;
  }
  .null{
    height:60px;
  }
  .header>h1>div>img{
    width:50px;
    height:50px;
    display:flex;
    margin-top:7px;
    margin-left:20px;
  }
  h1{
    display:flex;
  }
  h1>span{
    margin-left:70px;
    font-size:20px;
    margin-top:20px;
  }
  .bottom1>p,bottom2>p{
    line-height:20px;
  }
  .bottom1>p:first-child,.bottom2>p:first-child{
    margin-top:10px;
    height:44px;
    line-height:25px;
    width:170px;
  }
  .f1_small{
    width:351px;
    height:260px;
    display:flex;
    margin:20px 12px 20px 12px;
  }
  .small1,.small2{
    width:170px;
    height:260px;
    margin-right:9px;
  }
  .bottom1,.bottom2{
    width:170px;
  }
  .bottom1>p:last-child,.bottom2>p:last-child{
    display:flex;
    margin-top:10px;
  }
  .bottom1>p>img,.bottom2>p>img{
    width:170px;
    height:170px;
    width:25px;
    height:25px;
    margin-left:70px;
    margin-top:-5px;
  }
  .bottom1>p>span,.bottom2>p>span{
    color:#E50112;
    font-weight:700;
  }
  .f1_big>img{
    width:351px;
    height:195px;
  }
  .f1_big{
    text-align:center;
  }
  .f1_small img{
    width:170px;
    height:170px;
  }
  /* 本周上新 更多 */
  .list_h{
    width:355px;
    height:50px;
    line-height:50px;
    display:flex;
    margin-left:14px;
    justify-content:space-between;
  }
  .more{
    color:rgb(158, 155, 155);
    font-size:14px;
    display:flex;
  }
  .more>img{
    width:24px;
    height:20px;
    margin-top:14px;
  }
  /* 顶部 */
  .header{
    width:100%;
    height:60px;
    background:#E50112;
    color:#fff;
    border-bottom-left-radius:25%;
    border-bottom-right-radius:25%;
    position:fixed;
  }
</style>