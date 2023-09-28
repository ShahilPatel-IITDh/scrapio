"use strict";
var $ = jQuery.noConflict();

jQuery(document).ready(function($){

	//Lightbox 
	$('.mfp-image').magnificPopup({
		type: 'image',
		gallery: {
			enabled:false
        }
	});

	//responsive videos
	$("#main").fitVids();

	//portable devices menu slidebar
	var sbleftStatus = 0;
	jQuery('#pmenu-toggle').click(function(event) {
		event.preventDefault();
		if (sbleftStatus == 0) {
			$('#sb-left').animate({left: 0});
			$('#wrap').animate({left: 260});
			$('html').css({"overflow-y": "hidden"});
			sbleftStatus = 1;
		}else{
			$('#sb-left').animate({left: -260});
			$('#wrap').animate({left: 0});
			$('html').css({"overflow-y": "visible"});
			sbleftStatus = 0;
		}
	});

	jQuery('#close-sb-left').click(function(event) {
		event.preventDefault();
		if (sbleftStatus == 1) {
			$('#sb-left').animate({left: -260});
			$('#wrap').animate({left: 0});
			$('html').css({"overflow-y": "visible"});
			sbleftStatus = 0;
		}
	});
	
	//nav classes
	if ( !$(".gp-main-nav ul").not(".gp-main-nav ul ul").hasClass("menu") ) {
		$(".gp-main-nav ul").not(".gp-main-nav ul ul").addClass("menu");
	}

	if ( !$(".gp-main-nav ul ul").hasClass("sub-menu") ) {
		$(".gp-main-nav ul ul").addClass("sub-menu");
	}

	//prepend arrow to portable menu links
	jQuery("#portable-devices-navigation li a").prepend('<span class="icon-angle-right"></span>');

	//append down arrow to main menu top-level links with sub-level children
	jQuery("#site-navigation ul li.menu-item-has-children > a").not("#site-navigation ul li ul a").append('<span class="icon-down-dir"></span>');
	jQuery("#site-navigation ul li.page_item_has_children > a").not("#site-navigation ul li ul a").append('<span class="icon-down-dir"></span>');

	//append right arrow to main menu links that are below top-level and have sub-level items
	jQuery("#site-navigation ul li ul li.menu-item-has-children> a").append('<span class="icon-right-dir gpfloatr"></span>');
	jQuery("#site-navigation ul li ul li.page_item_has_children> a").append('<span class="icon-right-dir gpfloatr"></span>');

	//add class to tags & form buttons
	jQuery('[class^="tag-link"]').addClass("accent-bg accent-color");
	$('input[type="submit"]').addClass("accent-bg accent-color");

	//portable menu scrollbar
	var wsHeight = jQuery(window).height();
	$('#sb-left-inner').css({height: wsHeight});
	$('.slidebar-inner').jScrollPane();

	//close lightbox
	jQuery('#lboxclose').click(function(event) {
		if ( modalDivContainer == "iframe") {
			jQuery("#lbox iframe").prop("src", "").css({"width": "0", "height":"0", "display":"none"}).prop("src", "");
			jQuery("#lbox").removeClass("lbox-open").addClass("lbox-closed");
			jQuery("#lbox").removeClass("lbox-open-bg"); 
			jQuery("#lboxclose").removeClass("lboxclose-visible").addClass("lboxclose-hidden");
		} else if ( modalDivContainer == "mdiv") {
			jQuery("#gmap-modal").remove();
			jQuery("#lbox").removeClass("lbox-open").addClass("lbox-closed");
			jQuery("#lbox").removeClass("lbox-open-bg"); 
			jQuery("#lboxclose").removeClass("lboxclose-visible").addClass("lboxclose-hidden");
		}
	});
	jQuery('#lbox').click(function(event) {
		if ( modalDivContainer == "iframe") {
			jQuery("#lbox iframe").prop("src", "").css({"width": "0", "height":"0", "display":"none"}).prop("src", "");
			jQuery("#lbox").removeClass("lbox-open").addClass("lbox-closed");
			jQuery("#lbox").removeClass("lbox-open-bg"); 
			jQuery("#lboxclose").removeClass("lboxclose-visible").addClass("lboxclose-hidden");
		}
	});

	//image hover icons
	jQuery(".entry-thumb").hover(
	  function() {
		$( this ).find("span.imgl2p").css({"opacity": 0.7});
	  },
	  function() {
		$( this ).find("span.imgl2p").css({"opacity": 0});
	  });

	jQuery(".entry-thumb").hover(
	  function() {
		$( this ).find("span.imgl2m").css({"opacity": 0.7});
	  },
	  function() {
		$( this ).find("span.imgl2m").css({"opacity": 0});
	  });

	jQuery(".entry-thumb").hover(
	  function() {
		$( this ).find("span.imgl2mp").css({"opacity": 0.75});
	  },
	  function() {
		$( this ).find("span.imgl2mp").css({"opacity": 0.35});
	  });

	jQuery(".fgallery-tlink").hover(
	  function() {
		$( this ).find("span.fg-imgl2m").css({"opacity": 0.7});
	  },
	  function() {
		$( this ).find("span.fg-imgl2m").css({"opacity": 0});
	  });

	jQuery(".fgallery-tlink").hover(
	  function() {
		$( this ).find("span.fg-imgl2p").css({"opacity": 0.7});
	  },
	  function() {
		$( this ).find("span.fg-imgl2p").css({"opacity": 0});
	  });

	jQuery(".fg-imgl2p").each(function() {
		if ( $(this).parent().parent().width() < 150 ) {
			$(this).css({"width": "40px", "height": "40px", "border-radius": "0px", "border-width": "1px", "line-height": "38px", "font-size": "20px", "margin-top": "-20px", "margin-left": "-20px"});
		}
	});

	jQuery(".fg-imgl2m").each(function() {
		if ( $(this).parent().parent().width() < 150 ) {
			$(this).css({"width": "40px", "height": "40px", "border-radius": "0px", "border-width": "1px", "line-height": "38px", "font-size": "20px", "margin-top": "-20px", "margin-left": "-20px"});
		}
	});

	//disable gallery zoom for IE, does not support background-size transition.
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf("MSIE ");
	if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
		$(".zoomeffect1").addClass("zoomeffect1ie");
		$(".zoomeffect2").addClass("zoomeffect2ie");
	}

	//scroll to top
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('#scrollToTop').fadeIn();
		} else {
			$('#scrollToTop').fadeOut();
		}
	});

	$('#scrollToTop').click(function(){
		$('html, body').animate({scrollTop : 0},1000);
		return false;
	});

	//search window
	jQuery('#sbxopen').click(function(event) {
			jQuery("#sbx").removeClass("search-box-closed").addClass("search-box-open");
			setTimeout( function() { jQuery("#sbx-inner").css({"display":"block"}, 300)});
	});
	jQuery('#sbxclose').click(function(event) {
			jQuery("#sbx-inner").css({"display":"none"});
			jQuery("#sbx").removeClass("search-box-open").addClass("search-box-closed");
	});
	


    //resize event functions
	var windowWidth;
	(function($) {
		
		$(window).resize(windowResizeFunction2);

		function windowResizeFunction2 () {

			windowWidth = jQuery(window).width();
			//menu slidebar check

				wsHeight = jQuery(window).height();
				$('#sb-left-inner').css({height: wsHeight});
				$('.slidebar-inner').jScrollPane();
				if ( jQuery("#lbox").hasClass("lbox-open") ) {
					setTimeout( function() { jQuery("#lbox iframe").css({"width": "100%", "height":"100%"}, 1000); });
				}
		};

	})(jQuery);	

});
if(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream){
  document.querySelector('meta[name=viewport]')
    .setAttribute(
      'content', 
      'initial-scale=1.0001, minimum-scale=1.0001, maximum-scale=1.0001, user-scalable=no'
    );
}