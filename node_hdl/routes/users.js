var express=require("express");
var router=express.Router();
var pool=require("../pool");

// 完成用户登录验证
router.post("/login",(req,res)=>{
  var {uname,upwd}=req.body;
  if(!uname){
    res.send({code:-2,msg:"用户名为空"});
    return;
  }
  if(!upwd){
    res.send({code:-3,msg:"密码为空"});
    return;
  }
  var sql = "select uid from hdl_user where uname=? and upwd=md5(?)"
  pool.query(sql,[uname,upwd],(err,result)=>{
    if(err)throw err;
    // console.log(result.length)
    if(result.length==0){
      res.send({code:-1,msg:"用户名或密码错误"})
    }else{
      req.session.uid = result[0].uid;
      res.send({code:1,msg:"登录成功"});
    }
  })
})
// 完成用户注册
router.post("/register",(req,res)=>{
  var {uname,upwd,phone,gender}=req.body;
  console.log(gender);
  if(!uname){
    res.send({code:-4,msg:"用户名为空"});
    return;
  }
  if(!upwd){
    res.send({code:-5,msg:"密码为空"});
    return;
  }
  if(!phone){
    res.send({code:-6,msg:"电话号码为空"});
    return;
  }
  // 查询用户名是否存在
  var sql = "SELECT uid FROM hdl_user WHERE uname=?";
  pool.query(sql,[uname],(err,result)=>{
    if(err)throw err;
    if(result.length==0){
      // 查询手机号是否存在
      var sql = "SELECT uid FROM hdl_user WHERE phone=?";
      pool.query(sql,[phone],(err,result)=>{
        if(err)throw err;
        if(result.length==0){
          // 如果性别为1
          if(gender==1){
            var sql = "INSERT INTO hdl_user(uname,upwd,upic,phone,gender) VALUES(?,md5(?),'http://127.0.0.1:5050/public/images/user/man.png',?,?)";
            pool.query(sql,[uname,upwd,phone,gender],(err,result)=>{
              if(err)throw err;
              if(result.affectedRows>0){
                res.send({code:1,msh:"注册成功"});
              }else{
                res.send({code:-1,msg:"出错了请重试..."})
              }
            })
          }else{//否则如果性别是0
            var sql = "INSERT INTO hdl_user(uname,upwd,upic,phone,gender) VALUES(?,?,'http://127.0.0.1:5050/public/images/user/woman.png',?,?)";
            pool.query(sql,[uname,upwd,phone,gender],(err,result)=>{
              if(err)throw err;
              if(result.affectedRows>0){
                res.send({code:1,msh:"注册成功"});
              }else{
                res.send({code:-1,msg:"出错了请重试..."})
              }
            })
          }
        }else{
          res.send({code:-2,msg:"该手机号已注册"});
        }
      })
    }else{
      res.send({code:-3,msg:"用户名已存在"})
    }
  })
})
// 获取我的页面订单项内容
router.get("/indent",(req,res)=>{
  var sql = "select * from user_indent";
  pool.query(sql,(err,result)=>{
    if(err)throw err;
    res.send(result);
  })
})
// 验证用户是否登录,并传递用户数据
router.get("/isLogin",(req,res)=>{
  var uid = req.session.uid;
  if(!uid){
    res.send({code:-1,msg:"请登录"});
    return;
  }
  // 查询用户信息
  var sql = "SELECT uname,upic,phone,gender,money from hdl_user WHERE uid = ?";
  pool.query(sql,[uid],(err,result)=>{
    if(err)throw err;
    res.send({code:1,msg:"查询成功",data:result});
  })
});
// 获取主要内容
router.get("/important",(req,res)=>{
  var sql = "select * from user_important";
  pool.query(sql,(err,result)=>{
    if(err)throw err;
    res.send(result);
  })
})
// 退出登录
router.get("/exitLogin",(req,res)=>{
  var uid = req.session.uid;
  if(!uid){
    res.send({code:-1,msg:"用户暂未登录"})
    return;
  }
  req.session.destroy();
  res.send({code:1,msg:"退出成功"});
})

module.exports=router;