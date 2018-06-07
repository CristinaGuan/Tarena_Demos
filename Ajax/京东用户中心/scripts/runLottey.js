/**
 * Created by 金云龙 on 2015/11/26.
 * 完成幸运抽奖功能
 */
function runLottey(Elem){
    // 1. 获取画布对象
    var context = Elem.getContext('2d');
    // 2. 获取画布的宽度和高度
    const WIDTH = Elem.width;
    const HEIGHT = Elem.height;
    // 3. 将抽奖图片加载
    var as = new Image();
    as.src = "img/as.png";// 相对于index.html页面
    var pin = new Image();
    pin.src = "img/pin.png";
    // 4. 平移整个画布
    context.translate(WIDTH/2,HEIGHT/2);
    // 5. 动态绘制
    var loop = setInterval(draw,50);
    // 6. 初始化旋转的角度值 - 生成随机数（0 - 360）
    var pie = Math.random()*(Math.PI*2);
    // 7. 定义每次旋转增加的角度值
    var addPie = 0;
    // 8. 定义每次旋转差值
    var add = Math.PI/180;
    // 8. 定义开始旋转的时间
    var startTime;
    // 8. 定义专门用于绘制图片的函数
    function draw(){
        // 旋转后，每次增加的角度值+addPie
        if(addPie == 0){
            addPie += addPie;
        }else{
            addPie += add;
        }
        // 旋转并绘制转盘图片
        context.rotate(pie + addPie);
        myDraw(as,-as.width/2,-as.height/2);
        // 旋转并绘制指针图片
        context.rotate(-(pie + addPie));
        myDraw(pin,-pin.width/2+10,-pin.height/2-10);
        // 获取当前的时间
        var endTime = new Date().getTime();
        // 判断如果执行了10秒，执行旋转
        if((endTime-startTime) <= 5000){
            // 加速旋转
            add += Math.PI/360;
        }else if((endTime-startTime) > 5000 && (endTime-startTime) < 10000){
            // 减速旋转
            add -= Math.PI/360;
        }else if((endTime-startTime) >= 10000){
            clearInterval(loop);
            $("#btnLottery").removeAttr("disabled");
        }
    }

    function start(){
        addPie = Math.PI/180;
        startTime = new Date().getTime();
        // 将按钮变为不可操作
        $("#btnLottery").attr("disabled","disabled");
    }

    // 通用的绘制图片的方法
    function myDraw(img,x,y){
        context.drawImage(img,x,y);
    }

    return start;






}