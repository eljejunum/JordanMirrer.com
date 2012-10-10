// JordanMirrer.com JavaScript Document
var canvas = document.getElementById('disection');
//Test for compatibility
if (canvas.getContext){
  var ctx = canvas.getContext('2d');
	run();
} else {
	fallback();
}

//Run this if the browser does not support the canvas
function fallback(){
	document.write("Your computer is old and crappy.<br/><a href='http://www.beautyoftheweb.com/'>Get the latest version of IE.</a>");
}

var canvasX = $(window).width();

//run rhis for everything else
function run(){

window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
            canvas.width = window.innerWidth;
            //canvas.height = window.innerHeight;
            /**
             * Your drawings need to be inside this function otherwise they will be reset when 
             * you resize the browser window and the canvas goes will be cleared.
             */
            disection(); 
    }
    resizeCanvas();
	
	function disection(){
	var img = new Image();
	img.onload = function(){
		//center image
		var x = canvasX*.5 - 286;
		ctx.drawImage(img,212,0);
	};
  img.src = 'images/body.png';
}
