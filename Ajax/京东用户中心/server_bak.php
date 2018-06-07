<?php
    /*
       1. 连接MySQL数据库，查询当前用户的所有订单信息
         * 与MySQL数据库建立连接
           mysqli_connect(url,username,pwd,dbname,port);
           返回MySQL数据库的连接对象
         * 定义SQL语句 - 字符串类型
         * 将SQL语句发送到MySQL数据库，进行执行
           * 查询数据库表数据，包含中文（解决中文乱码）
             * 在执行SQL语句前，先指定编码
               mysqli_query("SET NAMES utf8");
           mysqli_query(link,sql)
           * 如果是查询的话，成功返回结果集对象，失败返回false
         * 如果得到结果集对象，进行解析
         * 关闭与MySQL数据库的连接
           mysqli_close(link)
     */
    $conn = mysqli_connect('127.0.0.1','root','','jd','3306');
    // 根据当前用户查询对应的订单表
    $sql = "SELECT * FROM jd_orders WHERE user_name='aaa'";
    mysqli_query($conn,'SET NAMES utf8');
    // jd_orders表的结果集
    $result = mysqli_query($conn,$sql);
    /*
      解析结果集(mysqli_result)对象：
      1. 从结果集对象中获取order_id字段值
         * mysqli_fetch_assoc()方法 - 返回关联数组
           * 将一条记录作为一个数组返回
         * 循环返回的结果，从而得到所有记录的同一字段值
     */
    // 定义数组 - 用于存储所有记录的order_id值
    $orders = array();
    while($row = mysqli_fetch_assoc($result)){
        $orderid = $row['order_id'];
        // 将每条记录的order_id值,压入到$orders数组中
        array_push($orders,$orderid);
        // 根据order_id值获取对应的商品信息
        /*
           关联查询语句
           // *号表示所有字段
           select *
           // 多张表之间用","隔开
           // 数据表 [as] 别名
           from jd_order_product_detail d,jd_products p
           // 关联关系 - d.product_id=p.product_id
           where d.product_id=p.product_id
           and d.order_id=4
         */
        $sql = 'select p.product_name,p.product_url,p.product_img '
                .'from jd_order_product_detail d,jd_products p '
                .'where d.product_id=p.product_id and d.order_id='.$orderid;

        mysqli_query($conn,'SET NAMES utf8');
        // jd_products表的结果集
        $result = mysqli_query($conn,$sql);


    }



    mysqli_close($conn);

    /*
      2. 向客户端进行响应
        * 一次性将jd_orders表和jd_products表所有数据进行响应
        * 响应的数据格式必须是JSON格式
     */
    echo '{"msg":"get success."}';











?>