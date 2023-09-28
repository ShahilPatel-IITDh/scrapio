jQuery(document).ready(function($) { 
	
    /**
    * Document ready (jQuery)
    */
    $(function () {

        /**
         * Activate superfish menu.
         */
        $('.sf-menu').superfish({
            'speed': 'fast',
            'delay' : 0,
            'animation': {
                'height': 'show'
            }
        });

    });

        /**
         * SlickNav
         */

	$('#menu-main-slick').slicknav({
		prependTo:'.site-navbar-header',
		label: newstodayStrings.slicknav_menu_home,
		allowParentLinks: true
	});

    function mobileadjust() {
        
        var windowWidth = $(window).width();

        if( typeof window.orientation === 'undefined' ) {
            $('#menu-main').removeAttr('style');
         }

        if( windowWidth < 769 ) {
            $('#menu-main').addClass('mobile-menu');
         }
 
    }
    
    mobileadjust();

    $(window).resize(function() {
        mobileadjust();
    });

});