var express=require("express");
var router=express.Router();
var query=require("./query");
router.get("/",(req,res)=>{
    // console.log("100000000");
    var uid = req.session.uid;
    var output=[];
    console.log(uid)
    if(!uid){
        res.send({code:-2,msg:"请登录"})
         return
     }      
     var sql=`select * from hdl_order where uid = ${uid}`;
    //  console.log(sql);
     query(sql).then(result=>{
         console.log(result)
        output[0]=result;
        var sql = `select uname from hdl_user where uid=${uid}`
        return query(sql)
     })
     .then(result=>{output[1]=result;
      console.log(output);
      res.send(output)
    }).catch(err=>{console.log(err)})
})
module.exports=router;