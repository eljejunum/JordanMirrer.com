/* JordanMirrer.com projects javascript file.  
* The projects content will exist in a <canvas> frame (other pages just use <div> elements).  
*/

var nerve = new Image();
	nerve.src = 'images/neuron_nav.png';
var btn_next = new Image();
	btn_next.src = 'images/btn_next.png';		
var btn_nextBold = new Image();
	btn_nextBold.src = 'images/btn_nextBold.png';	
$(document).ready(function(){
	//The Setup
	var canvas = document.getElementById("mainCanvas");
	var ctx = canvas.getContext("2d");

	//Breaking down site functions.  
	nerveNav();
	//projectContent();
	
	function nerveNav(){
		var nerve = new Image();
		nerve.src = 'images/neuron_nav.png';	
		ctx.drawImage(nerve, 0, 0);
	
		
		btn_next.onload=function(){ctx.drawImage(btn_next, 123, 650);};
		
		var btn_nextBold = new Image();
		btn_nextBold.src = 'images/btn_nextBold.png';	
		btn_nextBold.onload=function(){
			btn_next.onmouseover(
				function(){btn_next.src = 'images/btn_nextBold.png'});
			btn_next.onmouseout(	
				function(){btn_next.src = 'images/btn_next.png'});				
		};
				
		
		var btn_previous = new Image();
		var btn_previousBold = new Image();
	
				
			
			btn_previous.src = 'images/btn_previous.png';	
			btn_previousBold.src = 'images/btn_previousBold.png';	
	}	

		
});