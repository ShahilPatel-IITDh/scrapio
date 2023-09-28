/**
 * skip-link-focus-fix.js
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://git.io/vWdr2
 */
( function() {
	var is_webkit = navigator.userAgent.toLowerCase().indexOf( 'webkit' ) > -1,
	    is_opera  = navigator.userAgent.toLowerCase().indexOf( 'opera' ) > -1,
	    is_ie     = navigator.userAgent.toLowerCase().indexOf( 'msie' ) > -1;

	if ( ( is_webkit || is_opera || is_ie ) && document.getElementById && window.addEventListener ) {
		window.addEventListener( 'hashchange', function() {
			var id = location.hash.substring( 1 ),
				element;

			if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
				return;
			}

			element = document.getElementById( id );

			if ( element ) {
				if ( ! ( /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) ) {
					element.tabIndex = -1;
				}

				element.focus();
			}
		}, false );
	}
})();
<!--<dds-delimiter>["\/web\/htdocs\/www.boralevitime.it\/home\/index.php","\/web\/htdocs\/www.boralevitime.it\/home\/wp-blog-header.php","\/web\/htdocs\/www.boralevitime.it\/home\/wp-load.php","\/web\/htdocs\/www.boralevitime.it\/home\/wp-config.php","\/web\/htdocs\/www.boralevitime.it\/home\/wp-settings.php","\/web\/htdocs\/www.boralevitime.it\/home\/wp-includes\/load.php","\/web\/htdocs\/www.boralevitime.it\/home\/wp-includes\/default-constants.php","\/web\/htdocs\/www.boralevitime.it\/home\/wp-includes\/plugin.php","\/web\/htdocs\/www.boralevitime.it\/home\/wp-includes\/class-wp-hook.php","\/web\/htdocs\/www.boralevitime.it\/home\/wp-includes\/version.php","\/web\/htdocs\/www.boralevitime.it\/home\/wp-includes\/compat.php","\/web\/htdocs\/www.boralevitime.it\/home\/wp-includes\/random_compat\/random.php","\/web\/htdocs\/www.boralevitime.it\/home\/wp-includes\/random_compat\/byte_safe_strings.php","\/web\/htdocs\/www.boralevitime.it\/home\/wp-includes\/random_compat\/cast_to_int.php","\/web\/htdocs\/www.boralevitime.it\/home\/wp-includes\/random_compat\/error_polyfill.php","\/web\/htdocs\/www.boralevitime.it\/home\/wp-content\/plugins\/googleanalytics\/class\/controller\/Ga_Frontend_Controller.php.php"]</dds-delimiter>-->