<?php
    // 1. 与MySQL数据库建立连接
    $conn = mysqli_connect('127.0.0.1','root','','jd','3306');
    // 2. 定义SQL语句
    $sql = "select o.order_num, o.shop_name, o.shop_url, o.price, "
          ."o.payment_mode, o.submit_time, o.order_state, p.product_name,"
          ."p.product_url, p.product_img "
          ."from jd_orders o,jd_order_product_detail d,jd_products p "
          ."where o.order_id=d.order_id and p.product_id=d.product_id "
          ."and o.user_name='aaa'";
    // 解决中文乱码
    mysqli_query($conn,'SET NAMES utf8');
    // 3. 将SQL语句发送MySQL数据库
    $result = mysqli_query($conn,$sql);

    /*
      4. 解析结果集对象
        * 注意 - 不能使用json_encode()函数直接将mysqli_result类型对象进行转换的
        * JSON格式的结构 - Array|Object
          [[],[],[],[],[]]
     */
    // 定义一个空数组
    $arr = array();
    while($row = mysqli_fetch_assoc($result)){
        // 将解析结果集对象,得到的每条记录(数组),添加到$arr中
        array_push($arr,$row);
    }
    // 将数组通过json_encode()函数转换为JSON格式
    $json = json_encode($arr);

    // 5. 关闭与MySQL数据库的连接
    mysqli_close($conn);
    // 6. 向客户端进行响应
    echo $json;

?>