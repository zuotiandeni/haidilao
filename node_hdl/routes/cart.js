var express=require("express");
var router=express.Router();
var pool=require("../pool");
router.get("/",(req,res)=>{
    var uid = req.session.uid;
    // console.log(uid)
    if(!uid){
        res.send({code:-2,msg:"请登录"})
        return
    }
    var pid1 = req.query.pid;
    var pid = parseInt(pid1);
    console.log(pid);
    var pname =req.query.pname;
    console.log(pname);
    var pprice = req.query.pprice;
    // console.log(pprice);
    var pimage = req.query.pimage;
    var sql = "SELECT cartid FROM hdl_cart WHERE uid = ? AND pid = ?";
    pool.query(sql,[uid,pid],(err,result)=>{
        if(err)throw err;
        if(result.length==0){
         var sql = `insert into hdl_cart values(null,${pid},'${pname}',${pprice},${uid},'${pimage}',1)`
            console.log(3)
        }else{
            var sql =`UPDATE hdl_cart SET count=count+1 WHERE uid=${uid} and pid=${pid}`
        }
        pool.query(sql,(err,result)=>{
            if(err)throw err;
            console.log(4)
            res.send({code:1,msg:"添加成功"})
          }) 
    })  
})
router.get("/find",(req,res)=>{
  //  1:获取登录凭证uid
    var uid = req.session.uid;
    //2:如果uid不存在，请登录
    if(!uid){
      res.send({code:-2,msg:"请登录"});
      return;
    }
    //3:创建sql语句
    console.log("123")
    var sql = "SELECT * FROM hdl_cart WHERE uid = ?";
    //4:执行sql语句
    pool.query(sql,[uid],(err,result)=>{
      if(err)throw err;
      res.send({code:1,msg:"查询成功",data:result})
    })
    //5:将服务器返回结果发送脚手架
  })
  router.get("/del",(req,res)=>{
    //1:获取用户登录条件
    var uid = req.session.uid;
    //2:如果用户未登录退出
    if(!uid){
      res.send({code:-2,msg:"请登录"});
      return;
    }
    //3:获取参数id
    console.log("del")
    var pid = req.query.pid;
    console.log(pid);
    //4:创建sql
    var sql = "DELETE FROM hdl_cart WHERE pid = ?";
    //5:执行sql
    //delete 条件 affectedRows 影响行数
    pool.query(sql,[pid],(err,result)=>{
      if(err)throw err;
      if(result.affectedRows>0){
        res.send({code:1,msg:"删除成功"});
      }else{
        res.send({code:-1,msg:"删除失败"});
      }
    })
 })
 router.get("/delm",(req,res)=>{
    //1:获取uid判断用户是否赋值登录成功
    var uid = req.session.uid;
    if(!uid){
      res.send({code:1,msg:"请登录"});
      return;
    }
    //2:获取参数ids 删除id列表 3,4,7
    var ids = req.query.ids;
    var sql = `DELETE FROM hdl_cart WHERE pid IN (${ids})`;
    //3:删除
    pool.query(sql,(err,result)=>{
      if(err)throw err;
      if(result.affectedRows>0){
        res.send({code:1,msg:"删除成功"})
      }else{
        res.send({code:-1,msg:"删除失败"})
      }
    })
 });
module.exports=router;