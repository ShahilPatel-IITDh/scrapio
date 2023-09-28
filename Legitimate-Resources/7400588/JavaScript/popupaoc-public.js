var paoc_ideal_timer = 0;

(function($) {

	"use strict";

	/* Add Wrap of iframe */
	$('.paoc-popup iframe[src*="vimeo.com"]').wrap('<div class="paoc-iframe-wrap" />');
	$('.paoc-popup iframe[src*="dailymotion.com"]').wrap('<div class="paoc-iframe-wrap" />');
	$('.paoc-popup iframe[src*="youtube.com"]').wrap('<div class="paoc-iframe-wrap" />');
	$('.paoc-popup iframe[src*="m.youtube.com"]').wrap('<div class="paoc-iframe-wrap" />');
	$('.paoc-popup iframe[src*="youtu.be"]').wrap('<div class="paoc-iframe-wrap" />');
	$('.paoc-popup iframe[src*="screencast-o-matic.com"]').wrap('<div class="paoc-iframe-wrap" />');
	$('.paoc-popup iframe[src*="videopress.com"]').wrap('<div class="paoc-iframe-wrap" />');
	$('.paoc-popup iframe[src*="video.wordpress.com"]').wrap('<div class="paoc-iframe-wrap" />');
	$('.paoc-popup iframe[src*="fast.wistia.net"]').wrap('<div class="paoc-iframe-wrap" />');

	/* Zero the idle timer on mouse movement */
	$(document).on('mousemove keypress scroll click touchstart touchmove', function() {
		paoc_ideal_timer = 0;
	});

	/* Welcome Popup for Bar & Modal (Page Load Popup) */
	$('.paoc-popup-page-load.paoc-popup-js').each(function(index) {

		var target = $(this).attr('id');

		if( typeof( target ) !== 'undefined' ) {

			var options				= $('#'+target).data('popup-conf');
			var data_opts			= $('#'+target).data('conf');
			var paoc_active_flag	= popupaoc_popup_active_flag( index, target, data_opts, options );

			if( paoc_active_flag == 1 ) {

				setTimeout(function() {

					/* Open popup & fire events */
					popupaoc_open_popup( target, options, data_opts );

				}, data_opts.open_delay);
			}

			return false;
		}
	});

	/* On Click Popup Link, Button, Image */
	$(document).on('click', '[class*="paoc-popup-cust-"]', function() {

		var html_classes = $(this).attr("class").split(' ');

		$.each(html_classes, function( class_key, class_val ) {

			var normal_cls_pos = class_val.indexOf('paoc-popup-cust-');

			/* Popup custom classes is not there */
			if( normal_cls_pos < 0 ) {
				return;
			}

			var target		= class_val.replace("paoc-popup-cust-", "paoc-popup-");
				target		= target.trim();
			var popup_ele	= $('.'+target).attr('id');
			var options		= $('#'+ popup_ele).data('popup-conf');
			var data_opts	= $('#'+ popup_ele).data('conf');

			if( typeof( popup_ele ) !== 'undefined' && ( data_opts.popup_type == 'simple_link' || data_opts.popup_type == 'button' || data_opts.popup_type == 'image' ) ) {

				var paoc_active_flag = popupaoc_popup_active_flag( class_key, popup_ele, data_opts, options );

				if( paoc_active_flag == 1 ) {

					/* Open popup & fire events */
					setTimeout(function() {
						popupaoc_open_popup( popup_ele, options, data_opts );
					}, data_opts.open_delay);
				}
			}
		});

		return false;
	});

	/* Popup close event */
	$(document).on('click', '.paoc-popup-close', function() {

		/* Remove Class from Popup */
		$('.custombox-content').removeClass( 'paoc-cb-popup-complete' );
		$('html').removeClass( 'custombox-lock' );

		Custombox.modal.close();
	});
})(jQuery);

/* Function to get popup & fire the events */
function popupaoc_open_popup( target, options, data_opts ) {

	var paoc_popup_open	= 1;

	if (typeof popupaoc_popup_befoer_open === "function") {
		paoc_popup_open = popupaoc_popup_befoer_open( paoc_popup_open, target, options, data_opts );
	}

	if( paoc_popup_open != 1 ) {
		return;
	}

	/* Popup Events */
	popupaoc_set_popup_events( target, options, data_opts );

	/* Popup Open */
	new Custombox.modal(options).open();
}

/* Function to set Popup Events */
function popupaoc_set_popup_events( target, options, data_opts ) {

	/* Tweak for Content onOpen Event */
	options.content.onOpen = function() {

								/* Add Class for hide body scroll */
								jQuery('html').addClass('custombox-lock');

								jQuery('.custombox-overlay, .custombox-content').removeClass('paoc-popup-active');

								/* Add Classes for overlay */
								jQuery('.custombox-overlay').not('.paoc-popup-overlay').addClass('paoc-popup-active paoc-popup-overlay paoc-popup-overlay-'+ data_opts.id);

								/* Add Classes from Popup Content */
								jQuery('.custombox-content').not('.paoc-cb-popup').addClass( 'paoc-popup-active paoc-cb-popup paoc-cb-popup-'+data_opts.id+' paoc-popup-'+options.content.positionX+'-'+options.content.positionY );

								if( options.overlay.active == false && options.content.fullscreen == false ) {
									jQuery('.custombox-content.paoc-popup-active').addClass( 'paoc-hide-overlay' );
								}

								/* Ovarlay Background Hide */
								if( options.overlay.active == false ) {
									jQuery('html').css({'overflow':'auto', 'margin-right':'0'});
								}

								/* Slick Slider Tweak */
								var slick_slider_id = jQuery('.slick-slider').attr('id');
								if( typeof(slick_slider_id) !== 'undefined' && slick_slider_id != '' ) {
									jQuery('#'+slick_slider_id).slick( 'setPosition' );
								}

								/* Trigger fires right before begins to open */
								jQuery(document.body).trigger('paoc_popup_open', [target, options]);
							};

	/* Tweak for Content onComplete Event */
	options.content.onComplete = function() {

								/* Add Classes for Popup Content */
								jQuery('.custombox-content').addClass( 'paoc-cb-popup-complete' );

								/* Popup Disapper */
								if( data_opts.disappear != 0 ) {

									if( data_opts.disappear_mode == 'normal' ) {

										var IdleInterval = setInterval(function() {

											paoc_ideal_timer = paoc_ideal_timer + 1;

											if( paoc_ideal_timer >= data_opts.disappear ) {

												Custombox.modal.close();

												clearInterval( IdleInterval );
											}
										}, 1000);

									} else if( data_opts.disappear_mode == 'force' ) {

										setTimeout(function() {

											Custombox.modal.close();

										}, ( data_opts.disappear * 1000 ) );
									}
								}

								/* Tweak for Window Resize */
								jQuery(window).trigger('resize');

								/* Trigger fires right after loaded content is displayed */
								jQuery(document.body).trigger('paoc_popup_complete', [target, options]);
							};

	/* Tweak for Content onClose Event */
	options.content.onClose = function() {

		/* Add Overflow Class in HTML Tag */
		jQuery('html').removeClass('custombox-lock');

		var cookie_name = data_opts.cookie_prefix +'_'+ data_opts.id;

		/* Set Cookie */
		if( data_opts.cookie_expire !== '' ) {
			popupaoc_create_cookie( cookie_name, 1, data_opts.cookie_expire, data_opts.cookie_unit, 'Lax' );
		}

		/* Trigger fires once is closed */
		jQuery(document.body).trigger('paoc_popup_close', [target, options]);
	};
}

/* Function to check Popup active flag */
function popupaoc_popup_active_flag( index, $this, data_opts, options ) {

	var paoc_check_active = false;

	/* Return 0 if cookie expire is there & cookie value is also there */
	if( typeof( data_opts.cookie_expire ) !== 'undefined' && data_opts.cookie_expire !== '' && popupaoc_get_cookie_value( data_opts.cookie_prefix +'_'+ data_opts.id ) != null ) {
		return 0;
	}

	paoc_check_active = 1;

	return paoc_check_active;
}

/* Function to Create Cookie */
function popupaoc_create_cookie(name, value, time_val, type, samesite) {

	var date, expires, expire_time, samesite;

	time_val	= time_val	? time_val	: false;
	type		= type		? type		: 'day';
	samesite	= samesite	? ";SameSite="+samesite : '';

	if( type == 'hour' ) {
		expire_time = (time_val * 60 * 60 * 1000);

	} else if( type == 'minutes' ) {
		expire_time = (time_val * 60 * 1000);

	} else {
		expire_time = (time_val * 24 * 60 * 60 * 1000);
	}

	if ( time_val ) {
		date = new Date();
		date.setTime( date.getTime() + expire_time );
		expires = "; expires="+date.toGMTString();
	} else {
		expires = "";
	}
	document.cookie = encodeURIComponent(name) + "=" + value + expires + "; path=/"+samesite;
}

/* Function to get cookie value */
function popupaoc_get_cookie_value( cookie_name ) {

	var result		= null;
	var nameEQ		= cookie_name + "=";
	var get_cookie	= document.cookie.split(';');

	for (var i = 0; i < get_cookie.length; i++) {

		var c = get_cookie[i];

		while (c.charAt(0)==' ') {
			c = c.substring( 1, c.length );
		}

		if (c.indexOf(nameEQ) == 0) {
			result = c.substring(nameEQ.length,c.length);
		}
	}

	return result;
}