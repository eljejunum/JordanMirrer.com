//Pull down diagram
$(document).ready(function(){
	$("#pullBar").click(function(){
		$("#pullDown").slideDown(500);
	});

	$("#pullDown").click(function(){
		$("#pullDown").slideUp(500);
		$("pullDown").css("visibility" , "visible");
	});
});