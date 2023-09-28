( function( $ ) {
	"use strict";
	$( window ).on( 'load', function() {
		var windowWidth = $( window ).width();
		if ( windowWidth < 483 ) {
			$( "._51m-._2pir._51mw" ).before( $( "._51m-.vTop.hCent" ) );
		} else {
			$( "._51m-.vTop.hCent" ).insertBefore( $( "._51m-._2pir._51mw" ) );
		}
	} );
} )( jQuery );
