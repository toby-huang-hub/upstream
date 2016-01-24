var WINDOW_WIDTH=1024;
var WINDOW_HEIGHT=568;

var RADIUS=8;

var MARGIN_TOP=60;
var MARGIN_LEFT=30;

var ball={x:512 , y:100 , r:10 , g:1.98, vx:-4 ,vy:0 , color:"#005588"};

const endTime=new Date(2016,0,25,9,23,57);
var curShowTimeSeconds=0;

var balls=[];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

window.onload=function(){
	debugger;

	//设置自适应屏幕
	// WINDOW_WIDTH=document.documentElement.clientWidth;
	// WINDOW_HEIGHT=document.documentElement.clientHeight;

	// MARGIN_LEFT=Math.round(WINDOW_WIDTH/10);
	// RADIUS=Math.round(WINDOW_WIDTH*4/5/108)-1;

	// MARGIN_TOP=Math.round(WINDOW_HEIGHT/5);

	var canvas=document.getElementById("canvas");
	var context=canvas.getContext("2d");

	canvas.width=WINDOW_WIDTH;
	canvas.height=WINDOW_HEIGHT;

	curShowTimeSeconds=getCurShowTimeSeconds();

	// render( context );
	setInterval(function(){
		render(context);
		update();
	},50);



}


function getCurShowTimeSeconds(){
	var curTime=new Date();
	var result=endTime.getTime()-curTime.getTime();
	result=Math.round(result/1000);

	return result>0?result:0;
}

function update(){
	// debugger;
	var nextShowTimeSeconds=getCurShowTimeSeconds();

	var nextHours=parseInt(nextShowTimeSeconds/3600);
	var nextMinutes=parseInt((nextShowTimeSeconds-nextHours*3600)/60);
	var nextSeconds=nextShowTimeSeconds%60;

	var curHours=parseInt(curShowTimeSeconds/3600);
	var curMinutes=parseInt((curShowTimeSeconds-curHours*3600)/60);
	var curSeconds=curShowTimeSeconds%60;

	if(nextSeconds!=curSeconds){
		// debugger;
		if(parseInt(curHours/10)!=parseInt(nextHours/10)){
			addBalls(MARGIN_LEFT+0,MARGIN_TOP,parseInt(curHours/10));
		}
		if(parseInt(curHours%10)!=parseInt(nextHours%10)){
			addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curHours%10));
		}
		if(parseInt(curMinutes/10)!=parseInt(nextMinutes/10)){
			addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes/10));
		}
		if(parseInt(curMinutes%10)!=parseInt(nextMinutes%10)){
			addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes%10));
		}
		if(parseInt(curSeconds/10)!=parseInt(nextSeconds/10)){
			addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds/10));
		}
		if(parseInt(curSeconds%10)!=parseInt(nextSeconds%10)){
			addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(nextSeconds/10));
		}
		curShowTimeSeconds=nextShowTimeSeconds;
	}

	updateBalls();

	console.log(balls.length);

}

function updateBalls(){
	for(var i=0;i<balls.length;i++){
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;

		//碰撞检测
		if(balls[i].y>WINDOW_HEIGHT-RADIUS){
			balls[i].y=WINDOW_HEIGHT-RADIUS;
			balls[i].vy=-balls[i].vy*0.75;
		}
	}

	var count=0;
	//遍历所有ball,超出左右边界的小球，从balls数组删除
	for (var i = 0; i < balls.length; i++) {
		if(balls[i].x+RADIUS>0&&balls[i].x-RADIUS<WINDOW_WIDTH){
			balls[count++]=balls[i];
		}
	};

	while(balls.length>Math.min(300,count)){
			balls.pop();
		}
}

function addBalls(x,y,num){
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				var aBall={
					x:x+j*2*(RADIUS+1)+(RADIUS+1),
					y:y+i*2*(RADIUS+1)+(RADIUS+1),
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aBall);
			}
		}
	}
}

function render(context){
	// debugger;
	//刷新
	context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

	var hours=parseInt(curShowTimeSeconds/3600);
	var minutes=parseInt((curShowTimeSeconds-hours*3600)/60);
	var seconds=curShowTimeSeconds%60;


	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),context);
	renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),context);
	renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,context);
	renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),context);
	renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),context);
	renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,context);
	renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),context);
	renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),context);

	for (var i = 0; i <balls.length; i++) {
		context.fillStyle=balls[i].color;

		context.beginPath();
		context.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
		context.closePath();

		context.fill();
	};


}

function renderDigit(x,y,num,context){
	// debugger;
	context.fillStyle="rgb(0,102,153)";

	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				// debugger;
				context.beginPath();
				context.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
				context.closePath();

				context.fill();
			}
		}
	}
}