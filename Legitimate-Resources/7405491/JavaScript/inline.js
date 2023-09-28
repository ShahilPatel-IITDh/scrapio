
jQuery(function($) { 
jQuery( 'div.woocommerce' ).on( 'click', 'a.remove', function() {
				var productID = jQuery( this ).data( 'product_id' );
				var quantity = jQuery( this ).parent().parent().find( '.qty' ).val()
				var productDetails = {
					'id': productID,
					'quantity': quantity ? quantity : '1',
				};
				_wca.push( {
					'_en': 'woocommerceanalytics_remove_from_cart',
					'pi': productDetails.id,
					'pq': productDetails.quantity, 'blog_id': '198092603', 'ui': 'null', 'url': 'https://sexdollplay.com', 'woo_version': '7.9.0', 'cart_page_contains_cart_block': '0', 'cart_page_contains_cart_shortcode': '1', 'checkout_page_contains_checkout_block': '0', 'checkout_page_contains_checkout_shortcode': '1', 
				} );
			} );

jQuery( 'div.woocommerce' ).on( 'click', 'a.remove', function() {
				var productID = jQuery( this ).data( 'product_id' );
				var quantity = jQuery( this ).parent().parent().find( '.qty' ).val()
				var productDetails = {
					'id': productID,
					'quantity': quantity ? quantity : '1',
				};
				_wca.push( {
					'_en': 'woocommerceanalytics_remove_from_cart',
					'pi': productDetails.id,
					'pq': productDetails.quantity, 'blog_id': '198092603', 'ui': 'null', 'url': 'https://sexdollplay.com', 'woo_version': '7.9.0', 'cart_page_contains_cart_block': '0', 'cart_page_contains_cart_shortcode': '1', 'checkout_page_contains_checkout_block': '0', 'checkout_page_contains_checkout_shortcode': '1', 
				} );
			} );
 });
