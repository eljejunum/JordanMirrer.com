/**
* Jordan's project scripts
*/

//shorthand cheat for window
var w = $(window);

//Project Detail Variables	
var title = "hello today";
var year = "charlie";
var client = "client 2";
var role = "role 3";
var tech = "tech 4";
var platform = "platform 5";
var description = "some text 6";
var imgName = "brain_right_full.png";

//Initialization to parse query string for project details 
var qsParser = new Array();
qsParser["cat"] = null;
qsParser["proj"] = null;
qs();
var category = qsParser["cat"];
var project = qsParser["proj"];

console.log(category + " " + project);


$(document).ready(function(){
	//Check window size before all loaded.  
	neuronReposition();	
	
	//Write in Project info
	writeProjectInfo(category, project);
	
});
	
w.load(function(){
		
	//Apply size check on resizing window
	w.resize(function(){
		neuronReposition();
	});
	
	//Rollover functions for the previous and next buttons
	$(".imgSwap").hover(
          function(){
          	this.src = this.src.replace("_off","_on");
          	},
          function(){
          	this.src = this.src.replace("_on","_off");
     });
	
	
})

/**
* Reads the query string and assigns it to qsParser[] array.  
*/
function qs() {
	var query = window.location.search.substring(1);
	var parms = query.split("&");
	for(var i=0; i<parms.length; i++){
		var pos = parms[i].indexOf("=");
		if(pos > 0){
			var key = parms[i].substring(0, pos);
			var val = parms[i].substring(pos+1);
			qsParser[key] = val;
		}
	}
}

/**
* Writes the project info based on the project selected.
* @params = qsParser["cat"] and qsParser["proj"] = category and project info from the query string.
* @return = n/a
*/
function writeProjectInfo(category, project){	
	$.ajax({
		type: "GET",
		url: "./project.xml",
		dataType: "xml",
		success: function(xml){
			console.log("Success! " + project);
			$(xml).find("projects").each(function(){
				var id = $(this).attr("id");
				if(id == project){
					console.log(id);
					title = $(this).find("title").text();
					year = $(this).find("year").text();
					client = $(this).find("client").text();
					role = $(this).find("role").text();
					tech = $(this).find("tech").text();
					//platform = $(this).find("platform").text();
					description = $(this).find("description").text();
					imgName = $(this).find("image").text();
					nextProj = $(this).find("next").text();
					previousProj = $(this).find("previous").text();

					$("#projectTitle").html(title);
					$("#projectYear").html(year);
					$("#projectClient").html("Client: " + client);	
					$("#projectRole").html("Role: " + role);
					$("#projectTech").html("Tech: " + tech);
					//$("#projectPlatform").html("Platform: " + platform);
					$("#projectDescription").html("<p>" + description + "</p>");
					$("#projectImgColumn").html('<img id="projectImg" src="images/projects/' + imgName +'">');	
					
				}
			});
		}		
	});
}

/**
* Calculates the positioning for the neuron bar and next/previous buttons.
* Position scales based on window size.
* Cut off sizes are: >1200, >1000, >768, and <=768 (mobile).  
*/
function neuronReposition(){
	var percentShift;
	var previousOffsetConstant;
	var nextOffsetConstant;

	if (w.width() > 1200){
		percentShift = .15;
		previousOffsetConstant = 73;
		nextOffsetConstant = 98;
		var previousLeftOffset = w.width() * percentShift + previousOffsetConstant;
		var nextLeftOffset = w.width() * percentShift + nextOffsetConstant;
		$("#neuron").css({"left":"15%", "visibility":"visible"});
		$("#previousBtn").css({"left":previousLeftOffset, "visibility":"visible"});
		$("#nextBtn").css({"left":nextLeftOffset, "visibility":"visible"});
	} else if(w.width() > 1000){
		percentShift = .1;
		previousOffsetConstant = 73;
		nextOffsetConstant = 98;
		var previousLeftOffset = w.width() * percentShift + previousOffsetConstant;
		var nextLeftOffset = w.width() * percentShift + nextOffsetConstant;
		$("#neuron").css({"left":"10%", "visibility":"visible"});
		$("#previousBtn").css({"left":previousLeftOffset, "visibility":"visible"});
		$("#nextBtn").css({"left":nextLeftOffset, "visibility":"visible"});
	}else if(w.width() > 768 ){
		percentShift = 0;
		previousOffsetConstant = 73;
		nextOffsetConstant = 98;	
		var previousLeftOffset = w.width() * percentShift + previousOffsetConstant;
		var nextLeftOffset = w.width() * percentShift + nextOffsetConstant;
		$("#neuron").css({"left":"0px", "visibility":"visible"});
		$("#previousBtn").css({"left":previousLeftOffset, "visibility":"visible"});
		$("#nextBtn").css({"left":nextLeftOffset, "visibility":"visible"});
	}else if(w.width() <= 768 || isMobile.any()){
		$("#neuron").css("visibility" , "hidden");
		$("#previousBtn").css({"visibility":"hidden"});
		$("#nextBtn").css({"visibility":"hidden"});
	}
}
