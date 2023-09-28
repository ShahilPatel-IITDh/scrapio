jQuery(function( $ ){

	$(".nav-primary .genesis-nav-menu, .nav-secondary .genesis-nav-menu").addClass("responsive-menu").before('<div class="responsive-menu-icon"></div>');

	$(".responsive-menu-icon").click(function(){
		$(this).next(".nav-primary .genesis-nav-menu, .nav-secondary .genesis-nav-menu").slideToggle();
	});

	$(window).resize(function(){
		if(window.innerWidth > 800) {
			$(".nav-primary .genesis-nav-menu, .nav-secondary .genesis-nav-menu, nav .sub-menu").removeAttr("style");
			$(".responsive-menu > .menu-item").removeClass("menu-open");
		}
	});

	$(".responsive-menu > .menu-item").click(function(event){
		if (event.target !== this)
		return;
			$(this).find(".sub-menu:first").slideToggle(function() {
			$(this).parent().toggleClass("menu-open");
		});
	});
	
	// Local Scroll Speed
	$.localScroll({
		duration: 750
	});

	// Sticky Navigation
	var headerHeight = $('.site-header').innerHeight();
	var beforeheaderHeight = $('.before-header').outerHeight();
	var abovenavHeight = headerHeight + beforeheaderHeight - 1;

	$(window).scroll(function(){

		if ($(document).scrollTop() > abovenavHeight){

			$('.nav-primary').addClass('fixed');

		} else {

			$('.nav-primary').removeClass('fixed');
			
		}
		
	});

});