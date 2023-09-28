(function( $ ) {
	'use strict';

	/**
	 * All of the code for your public-facing JavaScript source
	 * should reside in this file.
	 */

	$(function(){

		$( window ).resize(function() {
			resize();
		});
		image_adjust();

		$( window ).scroll(function() {
			image_adjust();
		});
	});
	function image_adjust(){
				$('.catch-instagram-feed-gallery-widget-wrapper .item a').each(
			    function(){
			    	var img = $(this).find('img.cifgw');
			    	var src = $(img).attr('src');
			    	$(img).css('display', 'none');
			    	$(this).css('background-image', 'url('+src+')');
			    	$(this).css('background-size', 'cover');
			    	$(this).css('background-position', 'center');
			    });
				resize();
	}

	function resize(){
		$('.catch-instagram-feed-gallery-widget-wrapper .item a').each(
    function(){
	    	var width = $(this).parent('li').width();
	    	var rect = $(this).parent('li')[0].getBoundingClientRect();
	    	if(rect.width){
	    		width = rect.width;
	    	}
			$(this).css('height',width);
			$(this).css('width',width);
	    });
	}
})( jQuery );
