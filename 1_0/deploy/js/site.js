//Pull down diagram


$(document).ready(function(){

	//boolean variable for the pull down menu
	var isDown = false;
	
	/* setInterval(function(){
		console.log("status for is down:" + isDown);
		}, 1000);
	*/
	
	//Pull Down Menu Animating Down
	$("#pullDown").click(function(){
		if(!isDown){
			$("#pullDown").animate({top: "+=750"}, 500, function(){});
			$(".listContent").animate({top: "+=750"}, 500, function(){});
			isDown = true;
			$("#pullDown").css( 'cursor', 'default' );
		} else {
			$("#pullDown").animate({top: "-=750px"}, 500, function(){});
			$(".listContent").animate({top: "-=750"}, 500, function(){});	
			isDown = false;
			$("#pullDown").css( 'cursor', 'pointer' );
		}
	});
	
	//Pull Down mouse over animation
		$("#pullDown").mouseenter(function(){
			if(!isDown){
				$("#pullDown").animate({top: "+=5"}, 50, function(){
					$("#pullDown").animate({top: "-=5"}, 50, function(){})
				});
			}
		});
	
	//brain changing on rollover
	$("#brain_rightHalfMap").hover(
		function(){
			$("#brain_rightHalf").css("opacity" , ".8");
		},
		function(){
			$("#brain_rightHalf").css("opacity", "1");
		}
	);
	
	$("#brain_leftHalfMap").hover(
		function(){
			$("#brain_leftHalf").css("opacity" , ".8");
		},
		function(){
			$("#brain_leftHalf").css("opacity", "1");
		}
	);
		
});