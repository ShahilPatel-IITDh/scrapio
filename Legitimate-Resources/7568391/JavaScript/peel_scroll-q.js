// Settings
var trackerUrl = 'http://www.bdc-canada.com/peel-q/_peel_tracker.php';


// Scrolling
$(document).ready(function() {
						   
	// Position on ready
	$('#jcornerSmall').css('position', 'absolute');
	$('#jcornerBig').css('position', 'absolute');
	$('#jcornerSmall').css('top', $(window).scrollTop());
						   
	$(window).bind('scroll resize mousemove change',function(e) {
		$('#jcornerSmall').css('top', $(window).scrollTop());
	});
	
	$('#jcornerSmall').bind('mouseover',function(e) {
		$('#jcornerBig').css('top', $(window).scrollTop());
	});
	
	$('#jcornerSmall').bind('mouseover',function(e) {
		$.get(trackerUrl+'?ptrak_peel');
	});
	
});