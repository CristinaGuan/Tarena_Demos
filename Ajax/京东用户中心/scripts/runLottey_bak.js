/**
 * Created by 金云龙 on 2015/11/26.
 * 完成幸运抽奖功能
 */
function runLottey(Elem){
    // 1. 获取画布对象
    var context = Elem.getContext('2d');
    // 获取画布的宽度和高度
    const WIDTH = Elem.width;
    const HEIGHT = Elem.height;
    // 2. 将抽奖图片加载
    var as = new Image();
    as.src = "img/as.png";// 相对于index.html页面
    var pin = new Image();
    pin.src = "img/pin.png";
    pin.width = 358;
    pin.height = 301;
    // 平移画布
    context.translate(WIDTH/2,HEIGHT/2);
    // 3. 绘制图片
    as.onload = function(){
        context.drawImage(as,-as.width/2,-as.height/2);
    }
    pin.onload = function(){
        context.drawImage(pin,-pin.width/2+10,-pin.height/2-10);
    }

    var flag = false;

    var startTime;
    var loop;

    // 定义start()方法
    this.start = function(){
        running();
        // 当start()方法被调用时,第一次旋转
        startTime = new Date().getTime();
        loop = setInterval(running,10);
    }

    var pie = Math.PI/15;

    var running = function(){
        pie += Math.PI/15;

        context.rotate(pie);
        context.drawImage(as,-as.width/2,-as.height/2);
        context.rotate(-pie);
        context.drawImage(pin,-pin.width/2+10,-pin.height/2-10);

        var endTime = new Date().getTime();
        // 判断endTime-startTime=指定值(旋转多长时间-毫秒)
        if(endTime-startTime >= 10000){
            clearInterval(loop);
        }
    }

}