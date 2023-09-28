
	var footer_slide_time = 10000;
	var footer_slide_width = 243;
	var fTimer;
	function footer_slide(direction){
		var current_slide = new Number(jQuery('#footer-slider-current').text());
		var total_slides = jQuery('#footer-slider-content li').length;
		var slides = jQuery('#footer-slider-content');
		var action = 'slide';
		var position = 0;
		
		if(total_slides > 1){
			clearTimeout(fTimer);
			var alpha = (direction == 'next' ? current_slide + 1 : current_slide - 1);
			if(alpha < 0){ 
				alpha = total_slides -1;
				action = 'fade';
			}
			if(alpha == total_slides){ 
				alpha = 0;
				action = 'fade';
			}
			position = -1 * alpha * footer_slide_width;
			
			if(action == 'fade'){
				footer_slide_fade(alpha, position);
			} else {
				slides.animate(
					{'left' : position},
					300,
					function(){
						jQuery('#footer-slider-current').text(alpha);
					});	
			}
			
			fTimer = setTimeout('footer_slide("next")', footer_slide_time);
		}
	}
	function footer_slide_fade(alpha, position){
		var slides = jQuery('#footer-slider-content');
		slides.children('li:first-child').fadeOut(300);
		slides.children('li:last-child').fadeOut(300,
			function(){
				slides.css('left', position);
				slides.children('li:first-child').fadeIn(300);
				slides.children('li:last-child').fadeIn(300);
				jQuery('#footer-slider-current').text(alpha);
			}
		);
	}
	jQuery(document).ready(function($){
		$('#footer-slider-prev').click( function(){
			footer_slide('prev');
			return false;
		});
		$('#footer-slider-next').click( function(){
			footer_slide('next');
			return false;
		});
		var fTimer = setTimeout('footer_slide("next")', footer_slide_time);
	});
