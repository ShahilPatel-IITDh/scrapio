(function( $ ) {
	'use strict';

	/**
	 * All of the code for your public-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */
	
	
	$(window).on('load resize', function(){

		var selector_mob    = sticky_object.sticky_mobile_menu_selector;
		var $selector_mob   = $(sticky_object.sticky_mobile_menu_selector);
		var mob_menu_offset = $selector_mob.offset();
		
		var $selector_desk = $(sticky_object.sticky_desktop_menu_selector);

		if( $selector_desk[0] ) {
			var width_desk       = $selector_desk[0].getBoundingClientRect().width;
			var height_desk      = $selector_desk[0].getBoundingClientRect().height;
			var desk_menu_offset = $selector_desk.offset();
			
		}

		if($(window).width() < 768){ // Mobile
			
			if( ! $(sticky_object.sticky_mobile_menu_selector).length ) {
				console.log('Catch Sticky menu: Entered Sticky Element for mobile does not exist, change it in Dashboard / Settings / Catch Sticky Menu / Mobile Menu Selector.');
				return;
			}

			$(window).on('scroll', function() {

				$selector_mob.removeClass('catchSticky');
				$selector_desk.removeClass('catchSticky');
				
				if( $(window).scrollTop() > mob_menu_offset.top ) {
					
	                var z_index = parseInt(sticky_object.sticky_z_index);
					var opacity = parseFloat(sticky_object.sticky_opacity);

					
					if(sticky_object.enable_only_on_home == 0){
						$selector_mob.addClass('mob-catchSticky');
						$selector_desk.addClass('mob-catchSticky');
						$selector_mob.css('top', '0');
						$selector_mob.css('background-color', sticky_object.sticky_background_color);
						$selector_mob.css('z-index', z_index);
						$selector_mob.css('opacity', opacity);
						$selector_mob.css('border-radius', '0');
						$selector_mob.css('width', '100%');
						$('.mob-catchSticky .site-navigation').css('top', '0');
						$('.mob-catchSticky').css('left', '0');
						$('.mob-catchSticky').css('width', '100%');
						$('.mob-catchSticky .site-navigation li').css('background-color', sticky_object.sticky_background_color);
						$('.mob-catchSticky .site-navigation li a').css('color', sticky_object.sticky_text_color);
						$('.mob-catchSticky .site-navigation li a').css('font-size', sticky_object.sticky_mobile_font_size + 'em');
						
						
					}
					else{
						$('.home ' + selector_mob ).addClass('mob-catchSticky');
						$('.home ' + selector_mob ).css('top', '0');
					 	$('.home ' + selector_mob ).css('background-color', sticky_object.sticky_background_color);
					    $('.home ' + selector_mob ).css('z-index', z_index);
					    $('.home ' + selector_mob ).css('opacity', opacity);
					    $('.mob-catchSticky').css('border-radius', '0');
					    $('.home ' + selector_mob ).css('width', '100%');
					    $('.home .mob-catchSticky .site-navigation').css('top', '0');
					    $('.home .mob-catchSticky .site-navigation li').css('background-color', sticky_object.sticky_background_color);
					    $('.home .mob-catchSticky .site-navigation li a').css('color', sticky_object.sticky_text_color);
					   $('.home .mob-catchSticky .site-navigation li a').css('font-size', sticky_object.sticky_mobile_font_size + 'em');
						
					   // $(' .home .mob-catchSticky .site-navigation li a').css('font-size', sticky_object.sticky_text_font_size);
					}
				}
				else {
					$('.mob-catchSticky .site-navigation li').removeAttr('style');
					$('.mob-catchSticky .site-navigation li a').removeAttr('style');
					$('.home .mob-catchSticky .site-navigation li').removeAttr('style');
					$('.home .mob-catchSticky .site-navigation li a').removeAttr('style');

					$selector_mob.removeAttr('style');
					$selector_desk.removeAttr('style');
					$selector_mob.removeClass('mob-catchSticky');
					$selector_desk.removeClass('mob-catchSticky');
				}
			});
		} 
		else { // Desktop
			
			if( ! $(sticky_object.sticky_desktop_menu_selector).length ) {
				console.log('Catch Sticky menu: Entered Sticky Element for desktop does not exist, change it in Dashboard / Settings / Catch Sticky Menu / Desktop Menu Selector.');
				return;
			}

			$(window).on('scroll', function() {
				
				$selector_mob.removeClass('mob-catchSticky');
				$selector_desk.removeClass('mob-catchSticky');
				
				if( $(window).scrollTop() > desk_menu_offset.top ) {
					
					var adminBarHeight = 0;

					if ($("#wpadminbar")[0]){ // Check if admin bar is enabled.
				  		adminBarHeight = $('#wpadminbar').height();
					}

	                var z_index = parseInt(sticky_object.sticky_z_index);
					var opacity = parseFloat(sticky_object.sticky_opacity);

					if(sticky_object.enable_only_on_home == 0){
						
						$(sticky_object.sticky_desktop_menu_selector).addClass('catchSticky');
						$('.catchSticky').css('top', adminBarHeight + 'px');
						$('.catchSticky').css('background-color', sticky_object.sticky_background_color);
						$('.catchSticky').css('z-index', z_index);
						$('.catchSticky').css('opacity', opacity);
						$('.catchSticky').css('width', width_desk);
						$('.catchSticky').css('height', height_desk);
						$('.catchSticky a').css('color', sticky_object.sticky_text_color);
						$('.catchSticky a').css('font-size', sticky_object.sticky_desktop_font_size + 'px');

					}
					else{
						//console.log(sticky_object);
						$('.home ' + sticky_object.sticky_desktop_menu_selector).addClass('catchSticky');
					 	$('.home .catchSticky').css('top',adminBarHeight + 'px');
					 	$('.home .catchSticky').css('background-color', sticky_object.sticky_background_color);
					    $('.home .catchSticky').css('z-index', z_index);
					    $('.home .catchSticky').css('opacity', opacity);
					    $('.home .catchSticky').css('width', width_desk);
					    $('.home .catchSticky').css('height', height_desk);
					    $('.home .catchSticky a').css('font-size', sticky_object.sticky_desktop_font_size + 'px');
					    $('.home .catchSticky a').css('color', sticky_object.sticky_text_color );


					}
				} else {
					$('.catchSticky a').removeAttr('style');
					$('.home .catchSticky a').removeAttr('style');
					$(sticky_object.sticky_desktop_menu_selector).removeClass('catchSticky');
					$(sticky_object.sticky_desktop_menu_selector).removeAttr('style');
					$(sticky_object.sticky__desktop_menu_selector + ' li').removeAttr('style');
					
				}
			});
		}	
	});	
})(jQuery);

