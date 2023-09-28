(function(){


var $jq = jQuery.noConflict(); $jq(document).ready(function() { 
    

    $jq('#slider-home').coinslider({ 
    	width: 600,
    	height: 195,
    	spw: 7,
    	sph: 5,
    	delay: 6000,
    	sDelay: 30,
    	opacity: 0.7,
    	titleSpeed: 1500,
    	effect: '',
    	navigation: true,
    	links : true,
    	stickynav: false,
    	hoverPause: true });  

	$jq('#slider-home2').coinslider({ 
    	width: 700,
    	height: 195,
    	spw: 7,
    	sph: 5,
    	delay: 6000,
    	sDelay: 30,
    	opacity: 0.7,
    	titleSpeed: 1500,
    	effect: '',
    	navigation: true,
    	links : true,
    	stickynav: false,
    	hoverPause: true }); 
	});
    

 } )();