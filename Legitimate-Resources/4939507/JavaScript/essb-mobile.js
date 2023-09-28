var is_displayed_sharebar = false;

var essb_mobile_sharebar_open = function() {
	var element = jQuery('.essb-mobile-sharebar-window');
	if (!element.length) {
		return;
	}

	var sharebar_element = jQuery('.essb-mobile-sharebar');
	if (!sharebar_element.length) {
		sharebar_element = jQuery('.essb-mobile-sharepoint');
	}
	if (!sharebar_element.length) {
		return;
	}

	if (is_displayed_sharebar) {
		essb_mobile_sharebar_close();
		return;
	}

	var win_top = 0;

	var current_height_of_bar = jQuery(sharebar_element).outerHeight();
	var win_height = jQuery(window).height();
	var win_width = jQuery(window).width();
	win_height -= current_height_of_bar;

	if (jQuery('#wpadminbar').length) {
		jQuery("#wpadminbar").hide();
	}

	var element_inner = jQuery('.essb-mobile-sharebar-window-content');
	if (element_inner.length) {
		element_inner.css({
			height : (win_height - 60) + 'px'
		});
	}

	jQuery(element).css({
		width : win_width + 'px',
		height : win_height + 'px'
	});
	jQuery(element).fadeIn(400);
	is_displayed_sharebar = true;
}

var essb_mobile_sharebar_close = function() {
	var element = jQuery('.essb-mobile-sharebar-window');
	if (!element.length) {
		return;
	}

	jQuery(element).fadeOut(400);
	is_displayed_sharebar = false;
}

var hideTriggered = false;
var hideTriggerPercent = 90;

var essb_mobile_sharebuttons_onscroll = function() {

	var current_pos = jQuery(window).scrollTop();
	var height = jQuery(document).height() - jQuery(window).height();
	var percentage = current_pos / height * 100;

	if (percentage > hideTriggerPercent && hideTriggerPercent > 0) {
		if (!jQuery('.essb-mobile-sharebottom').hasClass("essb-mobile-break")) {
			jQuery('.essb-mobile-sharebottom').addClass("essb-mobile-break");
			jQuery('.essb-mobile-sharebottom').fadeOut(400);
		}
	} else {
		if (jQuery('.essb-mobile-sharebottom').hasClass("essb-mobile-break")) {
			jQuery('.essb-mobile-sharebottom').removeClass("essb-mobile-break");
			jQuery('.essb-mobile-sharebottom').fadeIn(400);
		}

	}
}

jQuery(document).ready(function($){
	
	if ($('.essb-mobile-sharebottom').length) {
		
		var hide_on_end = $('.essb-mobile-sharebottom').attr('data-hideend');
		var hide_on_end_user = $('.essb-mobile-sharebottom').attr('data-hideend-percent');
		
		if (hide_on_end == "true") {
			
			if (parseInt(hide_on_end_user) > 0) {
				hideTriggerPercent = parseInt(hide_on_end_user);
			}
			
			$(window).scroll(function (event) {
				essb_mobile_sharebuttons_onscroll();
			});
		}
	}

});