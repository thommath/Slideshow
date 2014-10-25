var antpic = 6;
var url = ["om.html", "om.html", "om.html", "om.html", "om.html"];
var pausetime = 4; //sekunder
var speed = 2; 

var px = 0;
var pic = new Array(antpic);
var picnr = -1;
var x;

var interval;
var stoped = true;

var d = new Date();
var time = d.getTime();
var running = false;

window.addEventListener("load", doFirst, false);

function doFirst(){
	x = document.getElementById('canvas');
	canvas = x.getContext('2d');
	
	var b = document.getElementById("body");
	
	pic[0] = new Image();
	pic[0].addEventListener("load", function(){canvas.drawImage(pic[0], px, 0, x.width, x.height);pause();});
	pic[0].src = "Images/Slideshow/pic0.png";
	
	for(var n = 1; n < antpic; n++){
		pic[n] = new Image()
		pic[n].src = "Images/Slideshow/pic" + n + ".png";
	}
	
		
	x.addEventListener("click", onClick, false);
	
	window.onresize = function(e){resize();};
	
	resize();
}

		
function resize(){
	var b = document.getElementById("body");
	if(b.offsetWidth < 1000){
		x.width = b.offsetWidth - 40;
		x.height = x.width*0.500;
	}else{
		x.width = 1000;
		x.height = 500;
		
	}
	
	if(picnr == -1){
		canvas.drawImage(pic[antpic-1], px, 0, x.width, x.height);
		canvas.drawImage(pic[picnr+1], px+x.width, 0, x.width, x.height);
	}else{
		canvas.drawImage(pic[picnr], px, 0, x.width, x.height);
		canvas.drawImage(pic[picnr+1], px+x.width, 0, x.width, x.height);
	}
}




function pause(){
	running = false;
	clearInterval(interval);
	px = 0;
	if(picnr == antpic-2){
		picnr = -1;
	}else{
		picnr++;
	}
	
	if(stoped){
		interval = setInterval(function(){start();}, pausetime * 1000);
	}
}

function update(){
	running = true;
	d = new Date();
	px = -speed*(d.getTime()-time)*(x.width/1000);
	canvas.clearRect(0,0,x.width,x.height);
	
	if(picnr == -1){
		canvas.drawImage(pic[antpic-1], px, 0, x.width, x.height);
		canvas.drawImage(pic[picnr+1], px+x.width, 0, x.width, x.height);
	}else{
		canvas.drawImage(pic[picnr], px, 0, x.width, x.height);
		canvas.drawImage(pic[picnr+1], px+x.width, 0, x.width, x.height);
	}
	if(px <= -x.width){
		px = -x.width;
		if(picnr == -1){
			canvas.drawImage(pic[antpic-1], px, 0, x.width, x.height);
			canvas.drawImage(pic[picnr+1], px+x.width, 0, x.width, x.height);
		}else{
			canvas.drawImage(pic[picnr], px, 0, x.width, x.height);
			canvas.drawImage(pic[picnr+1], px+x.width, 0, x.width, x.height);
		}
		pause();
	}
}

function onClick(e){
	var parentPos = getPosition(e.currentTarget);
	var mx = e.clientX - parentPos.x;
	
	if(mx < 700+px){
		if(picnr == -1){
			window.open(url[antpic-1], "_self");
		}else{
			window.open(url[picnr], "_self");	
		}
	}else{
		if(picnr == -1){
			window.open(url[picnr], "_self");
		}else{
			window.open(url[picnr+1], "_self");	
		}
	}
}

function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
      
    while (element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}

function over(){
	stoped = false;
}

function unpause(){
	stoped = true;
	if(!running){
		clearInterval(interval);
		interval = setInterval(function(){start()},500);
	}
}

function start(){
	if(stoped){
		time = new Date().getTime();
		clearInterval(interval);
		interval = setInterval(function(){update()},1);
	}
}
