<template>
  <div class="address">
    <div class="header">
      <div class="return" @click="goback">
        <img src="../../public/user_img/return.png">
      </div>
      <h1>
        门店列表
      </h1>
    </div>
    <div class="null"></div>
    <div class="address_select">
      <span>附近门店</span>
      <img src="../../public/images/index/arrow_ie.png" alt="">
      <input type="text" placeholder="  请输入外送门店">
    </div>
    <div class="peisong">
      可配送门店：
    </div>
    <!-- 就餐方式选择 -->
    <div class="select">
      <cube-select 
          v-model="value" 
          :title="title" 
          :options="option"    
          :placeholder="placeholder" 
          :auto-pop="autoPop"        
          :disabled="disabled" 
          @cahnge="change">
      </cube-select>
    </div>
    <!--  -->
    <div class="add_list" v-for="(item,i) of list" :key="i" @click="go">
      <img src="../../public/images/index/hdl_logo.jpg"/>
      <div class="right">
        <div class="rightList">
          <span class="title" :data-add="item.sname" @click="Address">{{item.sname}}</span>
          <div class="title_bottom">
            <span class="sale">营业中</span>
            <span class="address" >{{item.slocation}}</span>
          </div>
        </div>
        <span class="distance">≤{{item.sdistance}}km</span>      
      </div>
    </div>
  </div>  
</template>
<script> 
import {mapState,mapMutations} from 'vuex'
export default {
  data(){
    return {
      list:[],
      option:["店内就餐","打包带走"],
      value:"",
      title:"就餐方式",
      placeholder:"请选择就餐方式",
      autoPop:true,
      disabled:false,
    }  
    
  },
  computed: {
      ...mapState(["addr"])
    },
  created(){
    this.axios.get("index/Address").then(res=>{
      this.list = res.data.data;
    })
  },
  methods:{
    ...mapMutations(["setaddr"]),
    Address(event){
       this.setaddr(event.target.dataset.add) ;
      //  console.log(this.addr);
    },
    change(value,index,text){
      console.log('change',value.index.text)
    },
    // 要跳转的页面
    go(){
      this.$router.push('/scroll');
    },
    goback(){
      this.$router.push('/Home')
    }
  }
}
</script>
<style scoped>
  .null{
    height:50px;
  }
  .return{
    width:50px;
    height:50px;
  }
  .return>img{
    width:50px;
    height:50px;
    margin-top:0px;
    margin-left:15px;
  }
/* 地址列表选择 */
  /deep/ .cube-select-text{
    width:90px;
    height:15px;
    font-size:16px;
    padding-left:7px;
    margin-top:2px;
  }
  .header{
    width:100%;
    height:50px;
    color:#fff;
    border-bottom:1px solid #ccc;
    position:fixed;
    display:flex;
    background:#E50112;
  }
  .add_list{
    height:60px;
    align-items:meddle;
    margin-top:15px;
  }
  .sale{
    width:54px;
    height:20px;
    background:#549BF0;
    line-height:20px;
    text-align:center;
    margin-right:20px;
    margin-top:-3px;
    border:1px solid #549BF0;
    border-radius:6px;
    color:#fff;
  }
  .title{
    font-size:16px;
  }
  .title_bottom,.distance{
    font-size:14px;
    color:#7a7575;
    margin-top:12px;
  }
  .add_list{
    width:100%;
    border-bottom:1px solid #ccc;
    display:flex;
    justify-content: space-around;
  }
  .right{
    display:flex;
  }
  .title{
    width:246px;
  }
  .rightList{
    display:flex;
    margin-left:8px;
    flex-direction:column;
  }
  .distance{
    padding-right:8px;
    margin-top:28px;
    height:20px;
  }
  .title_bottom{
    display:flex;
    width:200px;
  }
  .add_list>img{
    width:55px;
    height:55px;
    margin-top:-6px;
  }
/* 门店列表 附近门店 搜索列表 */
  .peisong{
    height:40px;
    line-height:40px;
    background:rgb(235, 234, 234);
    padding-left:15px;
    font-size:16px;
    color:#7a7575;
  }
  .address>div>h1{
    font-size:20px;
    margin-top:15px;
    display:flex;
    margin-left:105px;
    text-align:center;
  }
  .address_select{
    width:100%;
    height:60px;
    border-bottom:1px solid #ccc;
    display:flex; 
    margin-top:-8px; 
  }
  .address_select>span{
    font-size:16px;
    margin-left:15px;
    margin-top:25px;
  }
  .address_select>img{
    margin-left:5px;
    width:14px;
    display:block;
    height:18px;
    margin-top:25px;
  }
  input{
    width:230px;
    margin-left:25px;
    background:rgb(235, 234, 234);
    height:35px;    
    font-size:16px;  
    margin-top:15px; 
    outline:none;
  }
  input:hover{
    outline:none;
  }
</style>

