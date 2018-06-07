/**
 * Created by 金云龙 on 2015/11/25.
 * 作用 - 封装initOrderList()函数
 */
// 为String类型扩展格式化方法
String.prototype.formate = function(){
    var str = this;//指代调用该方法的字符串
    for(var i=0;i<arguments.length;i++){
        // 查找当前字符串中符合"{num}"的值,替换成arguments[i]
        str = str.replace(new RegExp("\\{"+i+"\\}","ig"),arguments[i]);
    }
    return str;
}

function initOrderList(Elem,data){
    /*
      定义HTML页面的模板代码
      * 利用数字 - 数据字段一一对应
      * 定义对应关系
        * 0 - order_num
        * 1 - shop_name
        * 2 - shop_url
        * 3 - price
        * 4 - payment_mode
        * 5 - submit_time
        * 6 - order_state
        * 7 - product_name
        * 8 - product_url
        * 9 - product_img
        * 10 - 日期
        * 11 - 时间
     */
    var template = '<tr class="trOrder">'
                        +'<td colspan="6">'
                            +'<span>订单编号: {0}</span>'
                            +'<span><a href="{2}" target="_blank">{1}</a></span>'
                        +'</td>'
                    +'</tr>'
                    +'<tr class="trProd">'
                        +'<td>'
                            +'<div class="imgList">'
                            +'<a href="{0}" target="_blank">'
                                +'<img src="{9}" width="50" height="50" title="{7}" />'
                            +'</a>'
                            +'</div>'
                        +'</td>'
                        +'<td>aaa</td>'
                        +'<td>￥{3}<br/>{4}</td>'
                        +'<td>{10}<br/>{11}</td>'
                        +'<td>{6}</td>'
                        +'<td>'
                            +'<a href="{0}">查看</a>|<a href="{1}">删除</a><br/>'
                            +'<a href="{2}">评价晒单</a><br/>'
                            +'<a class="btn_buy_again" href="{3}">还要买</a>'
                        +'</td>'
                    +'</tr>';

    // 定义字符串 - 将生成HTML代码进行拼串
    var new_html = "";

    $.each(data,function(index,obj){
        // 处理订单时间
        var datetime = obj.submit_time;
        var d = datetime.split("T")[0];
        var t = datetime.split("T")[1];
        // 处理订单状态
        var state = parseInt(obj.order_state);
        var s = "";
        switch (state){
            case 0:
                s = "未付款";
                break;
            case 1:
                s = "已付款";
                break;
            case 2:
                s = "已发货";
                break;
            case 3:
                s = "已完成";
                break;
        }

        var string = template.formate(
            obj.order_num,
            obj.shop_name,
            obj.shop_url,
            obj.price,
            obj.payment_mode,
            obj.submit_time,
            s,
            obj.product_name,
            obj.product_url,
            obj.product_img,
            d,
            t
        );
        new_html += string;
    });

    // 将生成的HTML代码，添加到<table>表格中即可
    Elem.append(new_html);








}