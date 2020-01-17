<template>
    <div>
        <div class="header">
            <img src="../assets/back.png" alt="" @click="gome">
            历史订单
        </div>
        <div v-for="(item,i) of list[0]" :key="i" class="item">
            <div>
            <span class="">{{list[1][0].uname}}</span>
            <img :src="'http://127.0.0.1:5050/'+item.order_pimage" alt="">
            </div>
            <div class="item-right">
                <span>订单号{{item.orderid}}</span>
                <span>{{item.order_addr}}</span>
                <span>总价{{item.order_priceall}}</span>
                <span>商品数目{{item.order_pcount}}</span>  
            </div>
        </div>
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
    data(){
        return{
            list:[],
            url:"hiscart"
        }
    },
    computed:{
      ...mapState(["panl"]),
    },
    created(){
         this.axios.get("hiscart").then(res=>{
            this.list=res.data;
            // console.log(this.list)
        })
    },
    methods:{
      ...mapMutations(["changePanl"]),
      gome(){
        this.$router.push("/Home");
        this.changePanl("me");
      }
    },
}
</script>
<style scoped>
    .header{
        text-align: center;
        padding: 10px 0px;
        background: #e50112;
        color: #ffffff;
        height: 30px;
        line-height: 30px;
        position: relative;
    }
    .header img{
        width: 20px;
        vertical-align: bottom;
        position: absolute;
        left:15px;
        top:15px;
    }
    .item img{
        width: 50px;
        height: 50px;
    }
    .item{
        display: flex;
        align-items: top;
        padding: 10px;

    }
    .item-right{
        width: 90%;
        padding-left:10px;
        display: flex;
        flex-direction: column;
    }
</style>