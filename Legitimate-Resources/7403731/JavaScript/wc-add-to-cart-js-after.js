
jQuery( function( $ ) {
	$( document.body ).on( 'added_to_cart', function( e, fragments, cart_hash, thisbutton ) {
		var quantity = thisbutton.data( 'quantity' );
		pintrk( 'track', 'AddToCart', {
			'product_id': thisbutton.data( 'product_id' ),
			'product_name': thisbutton.data( 'product_name' ),
			'value': thisbutton.data( 'price' ) * quantity,
			'order_quantity': quantity,
			'currency': 'USD'
		} );
	} );
} );
