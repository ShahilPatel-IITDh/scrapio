( function ( $ ) {

$( document ).ready( function() {

	$( document ).on( 'click', '.full-post a:not(.lightbox-prevent)', function( e ) {
		var image_href = $( this ).attr( "href" );
		var is_wide = $( this ).is( '.lightbox-wide' );
		if ( !image_href.match( /(png|jpe?g|gif)$/i ) ) return;
		e.preventDefault();
		var caption = $( this ).siblings( '.wp-caption-text' ).first().html();
		var lightbox =
			'<div id="image-lightbox">' +
			'<div id="lbcontent">' +
			'<p class="close"></p>' +
			'<div class="lbim-wrapper"><img id="lbim" src="' + image_href + '" /></div>';
		if ( caption ) lightbox += '<p class="lbcaption">' + caption + '</p>';
		lightbox += '</div></div>';
		$('body').append( lightbox );
		var original_height;
		var caption_height = caption ? $( '#image-lightbox .lbcaption' ).height() + 20 : 5;
		var lb_set_size = function() {
			if ( is_wide ) {
				$( '#image-lightbox #lbcontent' ).css( {
					width: $( window ).width() - 100,
					height: $( window ).height() - 100
				} );

				$('#image-lightbox img' ).css( { width: '100%' } );
			} else {
				if ( original_height > $( window ).height() - 150 || $( '#image-lightbox img' ).height() > $( window ).height() - 150 ) {
					$('#image-lightbox img' ).height( $( window ).height() - 150 );
				}
				$( '#image-lightbox #lbcontent' ).css( {
					width: $( '#image-lightbox img').width(),
					height: $( '#image-lightbox img').height() + caption_height
				} );
			}
		}
		$( '#lbim' ).load( function() {
			 original_height = $('#image-lightbox img' ).height();
			 lb_set_size();
		} );
		$( window ).on( 'resize', lb_set_size );
		lb_set_size();
	} );

	$( document ).on( 'click', '#image-lightbox', function() {
		$( '#image-lightbox' ).remove();
	} );

} );

} )( jQuery );