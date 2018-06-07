/*
 * worker文件 - 实现抢票逻辑
 * * 创建 0-100 之间随机整数
 * * 10%的几率抢到票
 */
var rand = Math.floor(Math.random()*100);
if(rand <= 90){
	// 抢到票
	postMessage(1);
}else{
	// 没抢到票
	postMessage(0);
}