
		jQuery( 'body' ).bind( 'wc_fragments_refreshed', function() {
			var jetpackLazyImagesLoadEvent;
			try {
				jetpackLazyImagesLoadEvent = new Event( 'jetpack-lazy-images-load', {
					bubbles: true,
					cancelable: true
				} );
			} catch ( e ) {
				jetpackLazyImagesLoadEvent = document.createEvent( 'Event' )
				jetpackLazyImagesLoadEvent.initEvent( 'jetpack-lazy-images-load', true, true );
			}
			jQuery( 'body' ).get( 0 ).dispatchEvent( jetpackLazyImagesLoadEvent );
		} );
		
