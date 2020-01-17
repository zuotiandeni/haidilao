var express=require("express");
var router=express.Router();
var pool=require("../pool");
router.get("/",(req,res)=>{
    var uid = req.session.uid;
    console.log(uid)
    if(!uid){
        res.send({code:-2,msg:"请登录"})
         return
     }
     console.log("order")
    var orderid = req.query.orderid;
    var uid = req.query.uid;
    var order_pcount = req.query.order_pcount
    var order_priceall = req.query.order_priceall;
    var order_details =req.query.order_details;
    var order_addr = req.query.order_addr;
    var order_pimage = req.query.order_pimage;
    var sql = `insert into hdl_order values('${orderid}',${uid},${order_pcount},${order_priceall},'${order_details}','${order_addr}','${order_pimage}')`
    pool.query(sql,(err,result)=>{
            console.log(3)
            if (err) throw err
            if(result.affectedRows>0){
                res.send({code:1,msg:"下单成功"})
            }
            else{
                res.send({code:-1,msg:"下单失败"})
            }
    })

})
router.get("/hdlmoney",(req,res)=>{
    var uid = req.session.uid;
    var money = req.query.totalall
    var sql = `update hdl_user set money=money+${money} where uid=${uid}`
    console.log(sql)
    pool.query(sql,(err,result)=>{
        console.log(result)
        if(result.affectedRows>0){
            res.send({code:1,msg:"成功"})
            console.log(1)
        }else{
            res.send({code:-1});
            console.log(-1)
        }
    })
})

module.exports=router