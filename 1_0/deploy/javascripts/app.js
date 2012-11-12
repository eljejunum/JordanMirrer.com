//boolean variable for the pull down menu
	var isDown = false;


;(function ($, window, undefined) {
  'use strict';

  var $doc = $(document),
      Modernizr = window.Modernizr;

  $(document).ready(function() {
    $.fn.foundationAlerts           ? $doc.foundationAlerts() : null;
    $.fn.foundationButtons          ? $doc.foundationButtons() : null;
    $.fn.foundationAccordion        ? $doc.foundationAccordion() : null;
    $.fn.foundationNavigation       ? $doc.foundationNavigation() : null;
    $.fn.foundationTopBar           ? $doc.foundationTopBar() : null;
    $.fn.foundationCustomForms      ? $doc.foundationCustomForms() : null;
    $.fn.foundationMediaQueryViewer ? $doc.foundationMediaQueryViewer() : null;
    $.fn.foundationTabs             ? $doc.foundationTabs({callback : $.foundation.customForms.appendCustomMarkup}) : null;
    $.fn.foundationTooltips         ? $doc.foundationTooltips() : null;
    $.fn.foundationMagellan         ? $doc.foundationMagellan() : null;
    $.fn.foundationClearing         ? $doc.foundationClearing() : null;

    $('input, textarea').placeholder();
	
	//PULL DOWN MENU
	
	//Pull Down Menu Animating Down
	$("#pullDownButton").click(function(){
		if(!isDown){
			isDown = true;
			$("#pullDownButton").animate({opacity: "0"},'fast', function(){});			
		}
	});
	
	$(".close-reveal-modal").click(function(){
		if(isDown){
			isDown = false;
			$("#pullDownButton").animate({opacity: "1"}, 'fast', function(){});	
		}
	});
	
	$(".reveal-modal-bg").click(function(){
		if(isDown){
			isDown = false;
			$("#pullDownButton").animate({opacity: "1"}, 'fast', function(){});	
		}
	});
	
	//Pull Down mouse over animation
		$("#pullDownButton").mouseenter(function(){
			if(!isDown){
				$("#pullDownButton").animate({top: "+=5"}, 50, function(){
					$("#pullDownButton").animate({top: "-=5"}, 50, function(){})
				});
			}
		});
	
	
  });

  // UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE8 SUPPORT AND ARE USING .block-grids
  // $('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'both'});
  // $('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'both'});
  // $('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'both'});
  // $('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'both'});

  // Hide address bar on mobile devices (except if #hash present, so we don't mess up deep linking).
  if (Modernizr.touch && !window.location.hash) {
    $(window).load(function () {
      setTimeout(function () {
        window.scrollTo(0, 1);
      }, 0);
    });
  }

})(jQuery, this);