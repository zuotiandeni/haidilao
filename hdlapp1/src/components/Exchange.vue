<template>
  <div class="intr">
    <div class="intr_top">
      <span>热兑好货</span>
      <span @click="goto">更多商品
        <img src="../../public/images/index/right_h.png" alt="">
      </span>
    </div>
    <div class="intr_center">
      <div class="intrItem" @click=details v-for="(item,i) of list" :key="i" :data-id="item.eid">
        <img :src="'http://127.0.0.1:5050/'+item.epic">
        <div class="letter">
          <h5 class="name">{{item.ename}}</h5>
          <span class="price">{{item.eprice}}</span>
          <span class="count">{{item.ecount}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      list:[],
    }
  },
  methods:{
    goto(){
      this.axios.get("users/isLogin").then(res=>{
        if(res.data.code==-1){
          this.$toast("请登录")
          this.$router.push("/Login");
        }else{
          this.$router.push('/ExchangeList');
        }
      })
    },
    details(e){
      var id = e.currentTarget.dataset.id;
      // console.log(id);
      this.$router.push('/details')
    },
  },
  created() {
    this.axios.get("index/Exchange").then(res=>{
      this.list=res.data.data;
      // console.log(this.list)
    })
  },
}
</script>
<style scoped>
  .intr{
    margin-top:15px;
  }
   /* 热兑好货 */
  .intr>.intr_top{
    display:flex;
    justify-content:space-between;
    padding:0 14px;
  }
  .intr_top>span:last-child{
    display:flex;
    font-size:12px;
    line-height:14px;
  }
  .intr_top>span>img{
    width:10px;
    height:10px;
    margin-top:3px;
    margin-left:8px;
  }
  /* 商品 */
  .intr_center>div>img{
    width:165px;
    height:160px;
  }
  .intr_center{
    display:flex;
    justify-content:space-around;
    flex-wrap:wrap;
    margin-top:15px;
  }
  .intr_center>.intrItem{
    width:175px;
    height:240px;
  }
  .intrItem>.letter>h5{
    padding-bottom:10px;
    font-size:14px;
    line-height:20px;
  }
  .intrItem>.letter>.price{
    padding-right:15px;
    color:#FA6F12;
    font-size:14px;
  }
  .intrItem>.letter>.count{
    font-size:12px;
    font-weight:lighter;
  }
</style>

