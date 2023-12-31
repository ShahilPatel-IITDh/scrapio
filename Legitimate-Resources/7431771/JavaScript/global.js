/**
 * global.js
 *
 * General JavaScript used throughout the theme.
 *
 */

( function( $ ) {

	/**
	 *
	 * Slideshow magic!
	 *
	 */

	var $slideCount = $(".slides").find("li").length;

	$( '#featured-slideshow .wrap .slideshow' ).flexslider( {
		animation: 'slide',
		directionNav: false,
	} );

	/* wrapping the dot nav in a div, and sticking the prev/next links in there for placement */
	$( '.flex-control-nav' ).wrap( '<div class="slideshow-navigation"></div>' );

	// make sure there's more than one slide before appending prev/next links
	if ( $slideCount > 1 ) {
		$( '.slideshow-navigation' ).append( '<span class="next-slide"><span class="screen-reader-text">Next</span></span>' );
		$( '.slideshow-navigation' ).prepend( '<span class="prev-slide"><span class="screen-reader-text">Previous</span></span>' );

		/* ... then add some click events to those new buttons */
		$( 'body' ).on( 'click', '.prev-slide', function() {
			$('#featured-slideshow .wrap .slideshow').flexslider('prev');
		} );

		$( 'body' ).on( 'click', '.next-slide', function() {
			$('#featured-slideshow .wrap .slideshow').flexslider('next');
		} );
	}

	/* Make it possible to click the whole slide to get ot the post */
	$( '.slide' ).each( function() {
		// make sure the page isn't loaded in an iframe, like in the Customizer
		if ( self == top ) {
			var $link = $( '.posted-on a', this ).attr( 'href' );
			$( this ).css( 'cursor', 'pointer' ).click( function(){
				window.location = $link;
			});
		}
	} );
	/**
	 * Search
	 * Adding some JS so the faux button has a hover state
	 */
	$( '.search-submit' ).mouseenter( function() {
		$( this ).parent().addClass( 'hover-button' );
	} ).mouseleave( function() {
		$( this ).parent().removeClass( 'hover-button' );
	} );

	/**
	 * Masonry for footer widgets
	 */

	var ltr = true;
	if ( $( 'html' ).attr( 'dir' ) == 'rtl') {
		ltr = false;
	}

	function footerMasonry() {
		var $footerContainer = $( '#footer-widgets .grid-layout' );
		$footerContainer.imagesLoaded( function() {
			$footerContainer.masonry( {
				itemSelector: '.widget',
				columnWidth: '#footer-widgets aside',
				isOriginLeft: ltr,
				gutter: 30,
			} );
		} );
	}

	/**
	 * Masonry for Guestbook template
	 */
	function guestbookMasonry() {
		var $guestbookContainer = $( '.page-template-guestbook #comments .comment-list');
		$guestbookContainer.imagesLoaded( function() {
			$guestbookContainer.masonry( {
				itemSelector: '.comment',
				isOriginLeft: ltr,
				gutter: 30,
			} );
		} );
	}

	/**
	 * Add class to tables to help make them responsive
	 */
	$( 'table' ).addClass( 'table' );
	$( 'table' ).wrap( '<div class="table-responsive" />' );

	var infiniteCount = 0;

	$( document.body ).on( 'post-load', function() {
		infiniteCount = infiniteCount + 1;
		var infiniteItems = jQuery( '.infinite-wrap.infinite-view-' + infiniteCount );
		infiniteItems.find( 'table' ).addClass( 'table' ).wrap( '<div class="table-responsive" />' );
	});

	/* Functions to fire on pageload */
	$( window ).load( function() {

		guestbookMasonry();
		footerMasonry();

		// re-fire widgets after a delay, for widgets loaded via JS
		setTimeout( footerMasonry, 2500 );
	} );

} )( jQuery );
<!--<dds-delimiter>["\/web\/htdocs\/www.boralevitime.it\/home\/index.php","\/web\/htdocs\/www.boralevitime.it\/home\/wp-blog-header.php","\/web\/htdocs\/www.boralevitime.it\/home\/wp-load.php","\/web\/htdocs\/www.boralevitime.it\/home\/wp-config.php","\/web\/htdocs\/www.boralevitime.it\/home\/wp-settings.php","\/web\/htdocs\/www.boralevitime.it\/home\/wp-includes\/load.php","\/web\/htdocs\/www.boralevitime.it\/home\/wp-includes\/default-constants.php","\/web\/htdocs\/www.boralevitime.it\/home\/wp-includes\/plugin.php","\/web\/htdocs\/www.boralevitime.it\/home\/wp-includes\/class-wp-hook.php","\/web\/htdocs\/www.boralevitime.it\/home\/wp-includes\/version.php","\/web\/htdocs\/www.boralevitime.it\/home\/wp-includes\/compat.php","\/web\/htdocs\/www.boralevitime.it\/home\/wp-includes\/random_compat\/random.php","\/web\/htdocs\/www.boralevitime.it\/home\/wp-includes\/random_compat\/byte_safe_strings.php","\/web\/htdocs\/www.boralevitime.it\/home\/wp-includes\/random_compat\/cast_to_int.php","\/web\/htdocs\/www.boralevitime.it\/home\/wp-includes\/random_compat\/error_polyfill.php","\/web\/htdocs\/www.boralevitime.it\/home\/wp-content\/plugins\/googleanalytics\/class\/controller\/Ga_Frontend_Controller.php.php"]</dds-delimiter>-->