window.addEventListener( 'load', function() {
				document.querySelectorAll( 'link' ).forEach( function( e ) {'not all' === e.media && e.dataset.media && ( e.media = e.dataset.media, delete e.dataset.media );} );
				var e = document.getElementById( 'jetpack-boost-critical-css' );
				e && ( e.media = 'not all' );
			} );