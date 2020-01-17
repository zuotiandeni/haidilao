# hdl-1908
# app.js 服务器文件,文件目录下npm run start,端口5050,
## package.json 存放所需模块信息
## haidilao.sql数据库脚本
## puclic/托管静态资源;
### public 存放Icon,公共CSS,HTML页面；
### public index.html网站页面,static打包后的Vue-cil
### public/images 存放图片
## pool.js 连接池文件;

### 配置连接数据库
## routers/users.js页面模块接口；挂载在/users下
### users.js/login接口,post请求,请求参数uname,upwd;用户登录所需接口
### users.js/register接口,post请求,请求参数uname,upwd,phone,gender;用户注册所需接口,验证用户名是否存在,验证手机号是否被使用
### users.js/indent接口,get请求,请求参数无;返回我的页面所需图片及名称
### users.js/isLogin接口,get请求,请求参数uid;验证用户是否登录,返回用户个人信息
### users.js/important接口,get请求,请求参数无;获取我的页面主要内容(图片及名称)
### users.js/exitLogin接口,get请求,用户退出登录接口

## routers/index.js页面模块接口；挂载在/index下
### index.js/Address接口,get请求,请求参数无;返回门店地址信息
### index.js/ExchangeList接口,get请求,请求参数无;返回兑换商品信息