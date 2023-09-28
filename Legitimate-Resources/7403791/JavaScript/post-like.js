jQuery(document).ready(function($) {
	"use strict";
	/* Show buttons on hover/click */
	var like_element = $('.tz-like-wrapper');
	var settings = {
				interval: 100,
				timeout: 200,
				over: mousein_triger,
				out: mouseout_triger
	};
	function mousein_triger(){
		$(this).find('.wrapper').css('visibility', 'visible');
		$(this).addClass('hovered');
	}
	function mouseout_triger() {
		$(this).removeClass('hovered');
		$(this).find('.wrapper').delay(300).queue(function() {
			$(this).css('visibility', 'hidden').dequeue();
		});
	}
	if ( window.matchMedia("(min-width: 801px)").matches ) {
		like_element.hoverIntent(settings);
	} else {
		like_element.find('.heading').on('click', function(){
			if (like_element.hasClass('hovered')) {
				like_element.removeClass('hovered');
				like_element.find('.wrapper').delay(300).queue(function() {
					$(this).css('visibility', 'hidden').dequeue();
				});
			} else {
				like_element.addClass('hovered').find('.wrapper').css('visibility','visible');
			}
		})
	}
	/* like/dislake on click */
	$('body').on('click','.post-like-button',function(e){
		e.preventDefault();
		var button = $(this);
		var post_id = button.data("post_id");
		button.find('.like-button').hide();
		button.append('<i class="loading fa fa-cog fa-spin"></i>');
		$.ajax({
			type: "post",
			url: ajax_var.url,
			data: "action=tz-post-like&nonce="+ajax_var.nonce+"&post_id="+post_id,
			success: function(count){
				button.find('.loading').remove();
				if( count.indexOf( "already" ) !== -1 ) {
					var new_count = count.replace("already","");
					button.removeClass("liked");
					button.parent().find('.tooltip').hide();
					button.find('#icon-like').show();
					button.parent().parent().find('.likes-counter').html(new_count);
				} else {
					button.addClass("liked");
					button.find('#icon-unlike').show();
					button.parent().find('.tooltip').show();
					button.parent().parent().find('.likes-counter').html(count);
				}
			}
		});
	});
});
