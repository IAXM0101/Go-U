# 数据库

**创建数据库**
- create database goudb;

**删除数据库**
- drop database goudb;

**使用数据库**
- use goudb;

# 表

**创建表**
- create table tb_user (
    userID int AUTO_INCREMENT PRIMARY KEY,
    account varchar(50) NOT NULL,
    password varchar(50) NOT NULL,
    nick varchar(50),
    avatar varchar(50),
    phone varchar(50),
    email varchar(50),
    address varchar(50)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

**设置初始ID**
- alter table tb_user AUTO_INCREMENT=10000;

**修改列参数**
- alter table tb_user modify column avatar text;

**删除表**
- drop table tb_user;

# 数据

**插入数据**
- insert into tb_user(account,password,nick)VALUES("sys","123","世一上");

**查询数据**
- select * from tb_user;

**修改数据**
- update tb_user set nick='世一上11' where userID=1;

**删除数据**
- delete from tb_user where userID=1;

---------------



# 表

- tb_user  10001
- tb_chat  20001
- tb_goods 30001
- tb_cart  40001
- tb_order 50001
- tb_addr  60001

## 用户表 tb_user

**创建表**
- create table tb_user (
    userID int AUTO_INCREMENT PRIMARY KEY,
    account varchar(50) NOT NULL,
    password varchar(50) NOT NULL,
    nick varchar(50),
    avatar varchar(50),
    sex int,
    birthday varchar(50),
    phone varchar(50),
    email varchar(50),
    address varchar(50)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

**插入数据**
- insert into tb_user(account,password,nick,sex)VALUES("sys","123","世一上",2);

## 商品表 tb_goods

- create table tb_goods (
    goodsID int AUTO_INCREMENT PRIMARY KEY,
    name varchar(50),
    introduce varchar(50),
    image text,
    startingPrice int,
    modelList text
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


**设置初始ID**
- alter table tb_goods AUTO_INCREMENT=30001;

**新增一列**
- alter table tb_goods add column goodsDetail text;

**插入数据**
INSERT INTO `tb_goods` VALUES (30001, '商品1');

INSERT INTO tb_goods ( name, introduce, startingPrice ) VALUES ( '商品1', '1一亿像素', 4899);

## 聊天表 tb_chat

- create table tb_chat (
    chatID int AUTO_INCREMENT PRIMARY KEY,
    talker1 int,
    avatar1 varchar(50),
    talker2 int,
    avatar2 varchar(50),
    records LONGTEXT
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

**设置初始ID**
- alter table tb_chat AUTO_INCREMENT=20001;

**添加数据**

- insert into tb_chat(chatID,talker1,talker2)VALUES(20001, 10001, 10002);

**删除表**
- drop table tb_chat;

## 购物车表 tb_cart

**创建表**
- create table tb_cart (
    cartID int AUTO_INCREMENT PRIMARY KEY,
    userID int,
    isCheck int,
    goodsID int,
    imgUrl text,
    name varchar(50),
    introduce varchar(50),
    modelID int,
    modelName varchar(50),
    price int,
    count int,
    totalPrice int
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

**设置初始ID**
- alter table tb_cart AUTO_INCREMENT=40001;

**删除表**
- drop table tb_cart;

**插入数据**

INSERT INTO `tb_cart` VALUES (40001, 10001, 0, 30001, 'https://img14.360buyimg.com/n0/s80x80_jfs/t1/214827/40/13678/274430/62205f59Eb2bfe9be/a94051c37809d6a7.jpg.dpg', '商品1', '一亿像素', 30001001, '黑色 8+128', 4299, 1, 4299);

INSERT INTO `tb_cart` VALUES (40002, 10001, 0, 30002, 'https://img14.360buyimg.com/n0/s80x80_jfs/t1/214827/40/13678/274430/62205f59Eb2bfe9be/a94051c37809d6a7.jpg.dpg', '商品1', '一亿像素', 30002001, '黑色 8+128', 4299, 1, 4299);

INSERT INTO `tb_cart` VALUES (40003, 10001, 0, 30002, 'https://img14.360buyimg.com/n0/s80x80_jfs/t1/214827/40/13678/274430/62205f59Eb2bfe9be/a94051c37809d6a7.jpg.dpg', '商品1', '一亿像素', 30002002, '紫色 8+256', 8999, 1, 8999);

INSERT INTO `tb_cart` VALUES (40004, 10001, 0, 30002, 'https://img14.360buyimg.com/n0/s80x80_jfs/t1/214827/40/13678/274430/62205f59Eb2bfe9be/a94051c37809d6a7.jpg.dpg', '商品1', '一亿像素', 30002002, '紫色 8+256', 8999, 1, 8999);

**添加数据**

- insert into tb_cart(userID,isCheck,goodsID,imgUrl,name,introduce,modelID,modelName,price,count,totalPrice)VALUES(10001, 0, 30002, 'https://img14.360buyimg.com/n0/s80x80_jfs/t1/214827/40/13678/274430/62205f59Eb2bfe9be/a94051c37809d6a7.jpg.dpg', '商品1', '一亿像素', 30002002, '紫色 8+256', 8999, 1, 8999);

**修改数据**

- update tb_cart set isCheck=1 where cartID=40001;
- update tb_cart set isCheck=1 where userID=10001;

**删除数据**

- delete from tb_cart where cartID=40004 and userID=10001;

## 地址表 tb_addr

**创建表**
- create table tb_addr (
    addrID int AUTO_INCREMENT PRIMARY KEY,
    userID int NOT NULL,
    isDefault varchar(50) NOT NULL,
    name varchar(50) NOT NULL,
    region varchar(50) NOT NULL,
    addr varchar(50) NOT NULL,
    phone varchar(50) NOT NULL,
    email varchar(50),
    nickAddr varchar(50)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

**设置初始ID**
- alter table tb_addr AUTO_INCREMENT=60001;

**插入数据**
- insert into tb_addr(userID,isDefault,name,region,addr,phone)VALUES(10001,"true","世一上","广东省广州市","广东省广州市海珠区xxx街道xxx","18011112222");

**查询数据**

- SELECT * FROM tb_addr where userID=10001;

**修改数据**

- update tb_addr set userID=1, where addrID=60001;

**删除数据**

- delete from tb_addr where addrID=60003;

# 分页查询

- SELECT * FROM tb_goods limit 1,3;

# 连表查询

select tb_user.userID,tb_cart.introduce from tb_user inner join tb_cart on tb_user.userID=tb_cart.userID;






















/*********************************/
1.用户信息表：tb_user
2.管理员信息表：tb_admin
3.文章信息表：tb_article
4.评论表：tb_review
5.评论点赞表：tb_like
6.文章收藏表：tb_collect
7.作者关注表：tb_follow
/*********************************/






/************ 文章信息表 ************/
create table tb_article (id int AUTO_INCREMENT PRIMARY KEY,
title varchar(50),
authorid int,
authorname varchar(50),
time varchar(50),
views int,
likes int,
collects int,
sort varchar(50),
content mediumtext)ENGINE=InnoDB DEFAULT CHARSET=utf8;

- 插入数据
insert into tb_article(title,authorid,authorname,time,views,likes,collects,sort,content)VALUES("字节视界博客标题一一一",111,"老詹","2020年7月27日 16:07:20",11116,156,1475,"科技","字节视界博客一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一");
insert into tb_article(title,authorid,authorname,time,views,likes,collects,sort,content)VALUES("字节视界博客标题二二二",112,"老李","2020年7月26日 17:15:14",15226,156,1475,"前端","字节视界博客二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二二");
insert into tb_article(title,authorid,authorname,time,views,likes,collects,sort,content)VALUES("字节视界博客标题三三三",113,"老陈","2020年7月27日 18:24:38",15226,156,1475,"后端","字节视界博客三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三三");
- 查询数据
select *from tb_article;
select* from tb_article order by id desc;

