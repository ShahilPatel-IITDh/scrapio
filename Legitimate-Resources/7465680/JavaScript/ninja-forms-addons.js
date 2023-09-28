jQuery(document).ready(function($) {
	/*hide calc field on sigle page */ 
	function initial(){
		
		setTimeout(function(){		
			if($("span[data-key^='calc']").length > 0 ){
				$("span[data-key^='calc']").parent().parent().parent().parent().hide();
				console.log('test');
			}
		},1000);
	}
	initial();
	function init_nf_addon_totals() {

		// monitor any changes that go on in a Ninja Forms form on the product page right before the add to cart button
		$('.product .cart').on( 'change', 'input', function() {
			//console.log(wc_nf_update_totals());
			wc_nf_update_totals();
		});

		// Hide default product price
		$('.product .price, .single_variation_wrap .single_variation').hide();

		// display the NF totals right away
		wc_nf_update_totals();

		// watch the variation form and any time there's a change save the new variation price
		$('.variations_form').on('found_variation', function( event, variation ) {			
			wc_nf_save_variation_price( $(this), variation );
		});	
			
	}
	init_nf_addon_totals();


	// take the passed in calculated value and display it on the front end
	function wc_nf_update_totals() {

		// get the ninja forms calcuated value
		if($("div.html-container .nf-field-element span").data("key")){
			
			calc_value = $("div.html-container .nf-field-element span").text();	
			
		}else{
			
			calc_value = $('.product .cart .calc-wrap input[type="text"]').val();
		}
		
		// cache the jquery selector
		var $cart = $(".product form.cart");
		var $nf_totals = $cart.find("#ninja-forms-addons-total");

		// get the base product price
		var base_value = wc_nf_get_base_price( $cart, $nf_totals );

		// some people may want to apply addons irrespective of quantity
		// in that case use the filter '' to change this value to false
		if ( wc_nf_addons_params.apply_per_qty ) {
			// determine the quantity
			var qty = parseFloat( $cart.find('input.qty').val() );
			if ( qty <= 0 || isNaN( qty ) ) {
				qty = 1;
			}

			// multiple the quantity of products ordered by the add on cost
			calc_value *= qty;
		}

		// get the new html
		var html = wc_nf_create_html( calc_value, base_value );

		// make sure we have some html
		if ( html ) {
			// display the totals area
			$nf_totals.html( html );
		}

	}

	// when a variation selected get the price and store it
	function wc_nf_save_variation_price( $variation_form, variation ) {

		var $totals = $('#ninja-forms-addons-total');
		if ( $( variation.price_html ).find('.amount:last').size() ) {
			product_price = $( variation.price_html ).find('.amount:last').text();
			product_price = product_price.replace( wc_nf_addons_params.currency_format_thousand_sep, '' );
			product_price = product_price.replace( wc_nf_addons_params.currency_format_decimal_sep, '.' );
			product_price = product_price.replace(/[^0-9\.]/g, '');
			product_price = parseFloat( product_price );

			$totals.data( 'price', product_price );
		}
		$variation_form.trigger('woocommerce-ninja-forms-product-addons-update');

		// update the totals
		wc_nf_update_totals();

	}

	// get the products base price
	function wc_nf_get_base_price( $cart, $nf_totals ) {

		// get the base price (already saved in the html)
		var result = $nf_totals.data( 'price' );

		// get the quantity from the quantity field
		var qty = parseFloat( $cart.find('input.qty').val() );

		// make sure we have both a quantity and base price
		if ( result > 0 && qty > 0 ) {
			result = parseFloat( result * qty );
		}
	
		return result;
	}

	// create the HTML for totals area
	function wc_nf_create_html( calc_value, base_value ) {
		
		/*set calc if calc_value not number*/
		if(isNaN(calc_value) == true){
			calc_value = 0;
		}
		var total = parseFloat( base_value ) + parseFloat( calc_value );
		var formatted_addon_total = accounting.formatMoney( total, {
			symbol 		: wc_nf_addons_params.currency_format_symbol,
			decimal 	: wc_nf_addons_params.currency_format_decimal_sep,
			thousand	: wc_nf_addons_params.currency_format_thousand_sep,
			precision 	: wc_nf_addons_params.currency_format_num_decimals,
			format		: wc_nf_addons_params.currency_format
		} );

		result = "<p class='price nf-product-addon-totals'><span class='nf-product-addon-label' data-price='"+total+"'>" + wc_nf_addons_params.i18n_total + "</span> <span class='amount nf-product-addon-amount'>" + formatted_addon_total + "</span></p>";

		return result;
	}
	
	/* nf-form data submit into posts and creates session for fields and product total */
	wc_add_to_cart_function();
	function wc_add_to_cart_function(){
		$("div.html-container .nf-field-element span").parent().parent().parent().hide();
		$(document).on( 'click', 'button[name=add-to-cart], button.single_add_to_cart_button', function(e) {
			
			/* get product id set in enqueue script */
			var product_id = ajax_object.postID;
			//console.log(product_id);
			
			var selector = $("div.html-container .nf-field-element span");
			
			/* get product total */
			var $total = $("p.price.nf-product-addon-totals span.nf-product-addon-label").data('price');
			
			/* get nf-form calculation total*/
			var $key = selector.parent().parent().parent().data('field-id');
			
			/* get nf-all-fields*/
			var $data = $('.product .cart .nf-form-cont form').serializeArray();
			
			if($data !=''){
				
				$data.push({'name':"nf-field-"+$key, "value":$total});
				
				/* now time to submit data with ajax*/
				$.ajax({
					url:ajax_object.ajax_url,
					async: false,
					method:'post',
					data:{'action':'wc_nf_submit', formData:$data, product_id:product_id, total:$total, totalfield:$key},
					success:function(data){	}				
				})
			}
				
		});
		
	}

});
