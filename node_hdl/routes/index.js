var express=require("express");
var router=express.Router();
var pool=require("../pool");

router.get("/Address",(req,res)=>{
  var sql = "select * from hdl_store";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send({code:1,msg:"查询成功",data:result})
  })
})

router.get("/ExchangeList",(req,res)=>{
  var sql = "SELECT * FROM hdl_exchangelist";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send({code:1,msg:"查询成功",data:result})
    console.log(result);
  })
})
router.get("/Exchange",(req,res)=>{
  var sql = "select * from hdl_exchange";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send({code:1,msg:"查询成功",data:result})
    // console.log(result)
  })
})
router.get("/details",(req,res)=>{
  var sql = "select * from hdl_details";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send({code:1,msg:"查询成功",data:result})
    // console.log(result)
  })
})
module.exports=router;