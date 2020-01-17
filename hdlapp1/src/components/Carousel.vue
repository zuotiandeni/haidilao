<template>
   <div class="carousel">
    <mt-swipe :auto="4000">
      <mt-swipe-item>
        <img src="http://127.0.0.1:5050/images/index/carousel1.png"/>
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="http://127.0.0.1:5050/images/index/carousel2.png"/>
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="http://127.0.0.1:5050/images/index/carousel3.png"/>
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="http://127.0.0.1:5050/images/index/carousel4.png"/>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
  data(){
    return {}
  },
}
</script>
<style scoped>
  .carousel{
    width:100%;
    height:200px;
    margin-top:20px;
  }
  .carousel img{
    width:350px;
  }
</style>


