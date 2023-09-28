jQuery(document).ready(function($) {
	function conditional_payments_trigger() {
		if ( typeof conditional_payments_settings != 'undefined' ) {
			$.each( conditional_payments_settings.name_address_fields, function( index, value ) {
				$( document.body ).on( 'change', 'input[name="' + value + '"]', function() {
					$( document.body ).trigger( 'update_checkout' );
				} );

				if ( value.indexOf('shipping_') !== -1 ) {
					var billingValue = value.replace( 'shipping', 'billing' );
					if ( $.inArray( billingValue, conditional_payments_settings.name_address_fields ) === -1 ) {
						$( document.body ).on( 'change', 'input[name="' + billingValue + '"]', function() {
							$( document.body ).trigger( 'update_checkout' );
						} );
					}
				}
			} );
		}
	}
	conditional_payments_trigger();

	/**
	 * Trigger checkout update when changing payment method
	 */
	$( document.body ).on( 'change', 'input[name="payment_method"]', function() {
		$( document.body ).trigger( 'update_checkout' );
	} );
});
