 var express=require("express");
 var router=express.Router();
 var pool=require("../pool");
// router.get("/",(req,res)=>{
//     console.log("连接到了")
//     // var sql ="select *from `hdl_product`"
//     // pool.query(sql,(err,result)=>{
//     //     res.write(JSON.stringify(result));
//     //     res.end()
//     // })
//     var output={}
//     var food=[]
//     var all={}
//     var sql="select * from `hdl_product` where pcid=1";
//     query(sql).then(result=>{
//         food[0]=result;
//         var sql ="select * from `hdl_product` where pcid=2";
//         return query(sql)
//     })
//     .then(result=>{
//         food[1]=result;
//         var sql ="select * from `hdl_product` where pcid=3";
//         return query(sql)
//         // output.name=result;
//         // all={output,food}
//         // res.send(all)
//     })
//     .then(result=>{
//         food[2]=result;
//         // output.name=result;
//         // all={output,food}
//         // res.send(all)
//         var sql ="select * from `hdl_class`"
//         return query(sql)
//     }).
//     then(result=>{
//         output.name=result
//         all={output,food}
//         res.send(all)
//     }).
//      catch(error=>console.log(error))
// })

 module.exports=router;