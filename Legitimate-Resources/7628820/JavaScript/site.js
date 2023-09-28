// JavaScript Document

jQuery(document).ready(function() { 

	jQuery(window).scroll(function(){
	yos = (window.pageYOffset > 20);
		jQuery('#tool-bar-top').toggleClass('active', yos);
	});
	
});
	