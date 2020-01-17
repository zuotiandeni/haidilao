var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");
const cors=require("cors");
const history = require('connect-history-api-fallback');

/*引入路由模块*/
var index=require("./routes/index");
var pay=require("./routes/pay");
var speak=require("./routes/speak");
var products=require("./routes/products");
var users=require("./routes/users");
var cart=require("./routes/cart");
var order=require("./routes/order");
var hiscart=require("./routes/hiscart");

var app = express();
app.listen(5050)
//app.use(history());
app.use(cors({
  origin:['http://127.0.0.1:9090'],
  credentials:true
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret:'随机字符串',
  //cookie:{maxAge:60*1000*30},//过期时间ms
  resave:true,
  saveUninitialized:true
}));//将服务器的session，放在req.session中
app.use(express.static(path.join(__dirname,"public")));
/*使用路由器来管理路由*/

app.use("/index",index);
app.use("/pay",pay);
app.use("/products",products);
app.use("/users",users);
app.use("/cart",cart);
app.use("/speak",speak);
app.use("/order",order);
app.use("/hiscart",hiscart);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
