<template>
  <div class="ecaluate">
    <div class="ecaluate_title">历史评价</div>
    <div class="product">
      <div class="user_info">
        <div class="img">
          <img class="user_img" src="http://127.0.0.1:5050/images/user/user.jpg" alt="">
        </div>
        <span>喵喵</span>
        <img class="pfimg" src="http://127.0.0.1:5050/images/user/pf.png" alt="">
      </div>
      <div class="speak">
        <span>海底捞的服务就是好，太满意了，下次还会再继续光临的</span>
      </div>
    </div>
    <div class="product">
      <div class="user_info">
        <div class="img">
          <img class="user_img" src="http://127.0.0.1:5050/images/user/wh.jpg" alt="">
        </div>
        <span>来自星星的网红</span>
        <img class="pfimg" src="http://127.0.0.1:5050/images/user/pf.png" alt="">
      </div>
      <div class="speak">
        <span>自备牛肉、蔬菜，服务员看我的眼神有点奇怪</span>
      </div>
    </div>
    <div class="product">
      <div class="user_info">
        <div class="img">
          <img class="user_img" src="http://127.0.0.1:5050/images/user/jxnh.jpg" alt="">
        </div>
        <span>哎呦~帅哥</span>
        <img class="pfimg" src="http://127.0.0.1:5050/images/user/pf.png" alt="">
      </div>
      <div class="speak">
        <span>2探海底捞，都是点的番茄三鲜锅，味道不错。因为都是中午时间过去，没有排队，所以也没能体会到高峰时期排队时的“特别服务”</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
  .speak>span{
    line-height: 1.5;
    font-size: 15px;
    display: inline-block;
    padding-left:10px;
    margin-bottom: 5px;
  }
  .ecaluate_title{
    height:50px;
    background:#E50112;
    line-height: 50px;
    text-align: center;
    font-size: 17px;
    color:#fff;
  }
  .img{
    width:50px;
    height:50px;
    border-radius: 50%;
    overflow: hidden;
  }
  .img>.user_img{
    width:100%;
    height:100%;
  }
  .user_info{
    display: flex;
    padding-bottom:5px;
    margin-bottom:10px;
  }
  .user_info>span{
    color:#E50112;
    display: inline-block;
    margin-left:10px;
    margin-top:10px;
  }
  .pfimg{
    width:120px;
    height:35px;
    position: absolute;
    right:10px;
  }
  .product{
    border-bottom:1px solid #ccc;
    margin:15px 10px 0 10px;
    position: relative;
  }
</style>
