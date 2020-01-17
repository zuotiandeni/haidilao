SET NAMES UTF8;
DROP DATABASE IF EXISTS haidilao;
CREATE DATABASE haidilao CHARSET=UTF8;
USE haidilao;


-- 用户表
CREATE TABLE hdl_user(
	uid INT PRIMARY KEY AUTO_INCREMENT,
	uname VARCHAR(32) NOT NULL,
	upwd VARCHAR(32) NOT NULL,
	upic VARCHAR(128) NOT NULL,
	phone CHAR(11) NULL UNIQUE,
	gender BOOL,
	money DECIMAL(9,2) DEFAULT '0'
);
-- 插入用户数据
INSERT INTO  hdl_user VALUES(null,'梁晨阳',md5('a123456'),'http://127.0.0.1:5050/images/user/man.jpg','17719514031',1,DEFAULT);
INSERT INTO  hdl_user VALUES(null,'张延',md5('a123456'),'http://127.0.0.1:5050/images/user/woman.jpg','15029913399',0,'1000');


-- 我的订单项
CREATE TABLE user_indent(
	indid INT PRIMARY KEY AUTO_INCREMENT,
	inpic VARCHAR(128),
	inname VARCHAR(32)
);
-- 插入订单项数据
INSERT INTO user_indent VALUES(null,'images/user/my_row_num_order.png',"排号");
INSERT INTO user_indent VALUES(null,'images/user/my_reserve_order.png',"预定");
INSERT INTO user_indent VALUES(null,'images/user/my_order_list.png',"订单");
INSERT INTO user_indent VALUES(null,'images/user/my_deliver_order.png',"外卖");
INSERT INTO user_indent VALUES(null,'images/user/my_exchange_order.png',"购物");


-- 我的主要内容
CREATE TABLE user_important(
	imid int PRIMARY KEY AUTO_INCREMENT,
	impic VARCHAR(128),
	imname VARCHAR(32)
);
-- 插入我的主要内容数据
INSERT INTO user_important VALUES(null,"images/user/my_collect.png","收藏夹");
INSERT INTO user_important VALUES(null,"images/user/my_community.png","社区");
INSERT INTO user_important VALUES(null,"images/user/my_message.png","消息");
INSERT INTO user_important VALUES(null,"images/user/my_help.png","寻求帮助");
INSERT INTO user_important VALUES(null,"images/user/my_complained.png","投诉表扬");
INSERT INTO user_important VALUES(null,"images/user/my_service.png","捞小秘");
INSERT INTO user_important VALUES(null,"images/user/my_zhengji.png","海选征集");
INSERT INTO user_important VALUES(null,"images/user/my_about.png","关于企业");
INSERT INTO user_important VALUES(null,"images/user/my_news.png","公告");

-- 门店选择
CREATE TABLE hdl_store(
	sid INT,
	sname VARCHAR(255),
	shortname VARCHAR(255),
	slocation VARCHAR(255),
	slogo VARCHAR(255),
	sdistance DECIMAL(10,1)
);
INSERT INTO hdl_store VALUES(1,'海底捞小火锅外送(雁塔南路店)','雁塔南路店','曲江 新区','public/images/index/hdl_logo.jpg','2.9');
INSERT INTO hdl_store VALUES(2,'海底捞火锅外送(雁塔南路店)','雁塔南路店','曲江 新区','public/images/index/hdl_logo.jpg',2.9);
INSERT INTO hdl_store VALUES(3,'海底捞小火锅外送(西关店)',' 西关店','安定门','public/images/index/hdl_logo.jpg',3.4);
INSERT INTO hdl_store VALUES(4,'海底捞火锅外送(西关店)','西关店','安定门','public/images/index/hdl_logo.jpg',3.4);
INSERT INTO hdl_store VALUES(5,'海底捞小火锅外送(高新店)','高新店','高新区','public/images/index/hdl_logo.jpg',4.1);
INSERT INTO hdl_store VALUES(6,'海底捞火锅外送(高新店)','高新店','高新区','public/images/index/hdl_logo.jpg',4.1);
INSERT INTO hdl_store VALUES(7,'海底捞小火锅外送(开元商城店)','开元商城店','安定门','public/images/index/hdl_logo.jpg',4.2);
INSERT INTO hdl_store VALUES(8,'海底捞火锅外送(开元商城)','开元商城店','安定门','public/images/index/hdl_logo.jpg',4.2);
INSERT INTO hdl_store VALUES(9,'海底捞小火锅外送(高新万达店)','高新万达店','电子城','public/images/index/hdl_logo.jpg',5.5);
INSERT INTO hdl_store VALUES(10,'海底捞火锅外送(高新万达店)','高新万达店','电子城','public/images/index/hdl_logo.jpg',5.5);
INSERT INTO hdl_store VALUES(11,'海底捞小火锅外送(万众国际店)','万众国际店','曲江 新区','public/images/index/hdl_logo.jpg',5.6);
INSERT INTO hdl_store VALUES(12,'海底捞火锅外送(万众国际店)','万众国际店','曲江 新区','public/images/index/hdl_logo.jpg',5.6);
INSERT INTO hdl_store VALUES(13,'海底捞火锅外送(老城根店)','老城根店','其它','public/images/index/hdl_logo.jpg',6.8);
INSERT INTO hdl_store VALUES(14,'海底捞火锅外送(万和城店)','万和城店','金华路沿线','public/images/index/hdl_logo.jpg',6.7);
-- 不在配送范围内
INSERT INTO hdl_store VALUES(15,'海底捞小火锅外送(万和城店)','万和城店','金华路沿线','public/images/index/hdl_logo.jpg',6.7);
INSERT INTO hdl_store VALUES(16,'海底捞小火锅外送(高新万达店)','高新万达店','电子城','public/images/index/hdl_logo.jpg',5.5);
INSERT INTO hdl_store VALUES(17,'海底捞小火锅外送(老城根店)','老城根店','其它','public/images/index/hdl_logo.jpg',6.8);
INSERT INTO hdl_store VALUES(18,'海底捞小火锅外送(经开店)','经开店','未央路沿线','public/images/index/hdl_logo.jpg',11);
INSERT INTO hdl_store VALUES(19,'海底捞火锅外送(经开店)','经开店','未央路沿线','public/images/index/hdl_logo.jpg',11);
INSERT INTO hdl_store VALUES(20,'海底捞火锅外送(万象城店)','万象城店','其它','public/images/index/hdl_logo.jpg',12.8);
INSERT INTO hdl_store VALUES(21,'海底捞小火锅外送(万象城店)','万象城店','其它','public/images/index/hdl_logo.jpg',12.8);

-- 轮播图
CREATE TABLE hdl_carousel(
	cid INT(11) NOT NULL,
	cpic VARCHAR(255) DEFAULT NULL
);
INSERT INTO  hdl_carousel VALUES(1,'images/index/carousel1.png');
INSERT INTO  hdl_carousel VALUES(2,'images/index/carousel2.png');
INSERT INTO  hdl_carousel VALUES(3,'images/index/carousel3.png');
INSERT INTO  hdl_carousel VALUES(4,'images/index/carousel4.png');

-- -- 热兑好货
CREATE TABLE hdl_exchange(
	eid INT PRIMARY KEY,
	epic VARCHAR(225) DEFAULT NULL,
	ename VARCHAR(225) DEFAULT NULL,
	eprice VARCHAR(225) DEFAULT NULL,
	ecount VARCHAR(225) DEFAULT NULL
);
INSERT INTO hdl_exchange VALUES(1,'images/index/exchange1.png','【预售】海底捞口袋坚果1盒375克','1380捞币','兑换4605');
INSERT INTO hdl_exchange VALUES(2,'images/index/exchange8.png','小龙虾2盒装6~8钱/只 任选两盒','1998捞币','兑换221');
INSERT INTO hdl_exchange VALUES(3,'images/index/el_s1.png','海底捞 捞派滑牛肉1盒','900捞币','兑换228');
INSERT INTO hdl_exchange VALUES(4,'images/index/el_s2.png','海底捞 捞派虾滑1盒','1099捞币','兑换189');


CREATE TABLE hdl_exchangelist(
	lid INT,
	lpic VARCHAR(225),
	lpic1 VARCHAR(225),
	lname1 VARCHAR(32),
	lcount1 INT,
	lpic2 VARCHAR(225),
	lname2 VARCHAR(32),
	lcount2 INT
);
INSERT INTO hdl_exchangelist VALUE(1,'images/index/el_b1.png','images/index/el_s1.png',"海底捞 捞派滑牛肉1盒 火锅菜",900,'images/index/el_s2.png',"海底捞 捞派虾滑1盒 火锅菜",1099);
INSERT INTO hdl_exchangelist VALUE(2,'images/index/el_b3.png','images/index/el_s3.png',"小龙虾2盒装 6~8钱/只 麻辣/蒜蓉/话梅三选一",1998,'images/index/el_s4.png',"海底捞麻辣小龙虾750/盒6~8钱",2999);
INSERT INTO hdl_exchangelist VALUE(3,'images/index/el_b5.png','images/index/el_s9.png',"三得利沁柠水整箱 500ml*18瓶",1199,'images/index/el_s10.png',"三得利八度奢拿铁整箱 280ml*15瓶",2599);
INSERT INTO hdl_exchangelist VALUE(4,'images/index/el_b6.png','images/index/el_s11.png',"海底捞烤鱼套餐(口味可选)",1600,'images/index/el_s12.png',"海底捞创意耳饰(1副)",700);
INSERT INTO hdl_exchangelist VALUE(5,'images/index/el_b8.png','images/index/el_s13.png',"海底捞印象手账本",780,'images/index/el_s14.png',"[新品]海底捞创意环保帆布购物袋(三款颜色)",580);
INSERT INTO hdl_exchangelist VALUE(6,'images/index/el_b4.png','images/index/el_s5.png',"[新品玩具] 积木玩具套装MAX基础组件拼装",1299,'images/index/el_s6.png',"[新品玩具] 飞车绝胜霸王龙赛道玩具套装",1799);
INSERT INTO hdl_exchangelist VALUE(7,'images/index/el_b10.png','images/index/el_s17.png',"[新] 洽洽葵珍瓜子原味98g*3包",588,'images/index/el_s18.png',"[新] 黄金玉米花蛋花奶油味120g*3包",499);
INSERT INTO hdl_exchangelist VALUE(8,'images/index/el_b13.png','images/index/el_s24.png',"会员专享燕麦青椒佐餐酱两瓶",699,'images/index/el_s25.png',"会员专享精品牛肉佐餐酱两瓶",988);
INSERT INTO hdl_exchangelist VALUE(9,'images/index/el_b14.png','images/index/el_s26.png',"[新] 海底捞经典大麦啤酒一箱6瓶",1649,'images/index/el_s27.png',"[新] 海底捞德式小麦啤酒一箱6瓶",1649);
INSERT INTO hdl_exchangelist VALUE(10,'images/index/el_b15.png','images/index/el_s28.png',"超值套餐推荐(沁柠水+麻辣嫩牛+黄金玉米花)",1199,'images/index/el_s29.png',"超值套餐推荐(乌龙茶+麻辣嫩牛+黄金玉米花)",1199);
INSERT INTO hdl_exchangelist VALUE(11,'images/index/el_b17.png','images/index/el_s32.png',"网易精品课--英语四级真题",66,'images/index/el_s33.png',"网易精品课--英语六级真题",66);

CREATE TABLE hdl_cart(
	cartid int  PRIMARY KEY AUTO_INCREMENT,
	pid    int ,
	pname  VARCHAR(128),
	pprice decimal(10,2),
	uid    int ,
	pimage VARCHAR(128),
	count  int
);

create table hdl_product(pid INT PRIMARY KEY AUTO_INCREMENT,pname VARCHAR(128),ppic  VARCHAR(128),pprice decimal(10,2),pintroduce VARCHAR(200),pclassify  VARCHAR(128),pcid  INT );

-- create	table	hdl_order(
-- 	orderid varchar(128),
-- 	order_uid int,order_pcount	int,
-- 	order_priceall DECIMAL(10,2),
-- 	order_details VARCHAR(1024),
-- 	order_addr  VARCHAR(128)
-- );
create table hdl_order(
	orderid varchar(128),
	uid int,
	order_pcount int,
	order_priceall DECIMAL(10,2),
	order_details  VARCHAR(1024),
	order_addr    VARCHAR(128),
	order_pimage VARCHAR(128)
);

-- 详情页
CREATE TABLE hdl_details(
	did INT PRIMARY KEY,
	dpic VARCHAR(225) DEFAULT NULL,
	-- 商品名称
	dname VARCHAR(225) DEFAULT NULL,
	-- 商品介绍
	dintr VARCHAR(225) DEFAULT NULL,
	-- 需要捞币数量
	dprice INT,
	-- 商品规格
	dspe  VARCHAR(225) DEFAULT NULL,
	-- 库存
	dstock INT
);
INSERT INTO hdl_details VALUES(1,"images/index/exchange1.png","海底捞口袋坚果1盒375克","【热兑】干湿分离不串味，口感更纯粹",1380,"盒-捞币兑换",173);
	
	
