jQuery( document ).ready( function ( $ ) {
	var variable_id = jQuery( '[name="product_id"]' ).val();
	var available_ids = [];
	var variable_bulk_table = "";

	function get_table( product_id ) {
		if (typeof jQuery('.wdp_bulk_table_content').attr('data-available-ids') !== 'undefined') {
			available_ids = JSON.parse(jQuery('.wdp_bulk_table_content').attr('data-available-ids'));
		}

		if ( available_ids.indexOf( parseInt( product_id ) ) === -1 ) {
			return;
		}

		if ( product_id === variable_id && variable_bulk_table ) {
			jQuery( '.wdp_bulk_table_content' ).html( variable_bulk_table )
			return true;
		}

    let attributes = {};

    jQuery('form.variations_form[data-product_id=' + variable_id + '] select').each(function (index, item) {
      if ( jQuery(item).attr("data-attribute_name") ) {
        attributes[jQuery(item).attr("data-attribute_name")] = jQuery(this).val();
      }
    });

		var data = {
			action: 'get_table_with_product_bulk_table',
			product_id: parseInt( product_id ),
      attributes: attributes,
		};

		return jQuery.ajax( {
			url: script_data.ajaxurl,
			data: data,
			dataType: 'json',
			type: 'POST',
			success: function ( response ) {
				if ( response.success ) {
					jQuery( '.wdp_bulk_table_content' ).replaceWith( response.data )
          init_custom_event();
					if ( product_id === variable_id ) {
						variable_bulk_table = response.data;
					}
				} else {
					get_table( variable_id );
				}
			},
			error: function ( response ) {
				get_table( variable_id );
			}
		} );
	}

	function init_custom_event() {
    jQuery('.wdp_bulk_table_content').on('get_table', function (e, $obj_id) {
      if (typeof $obj_id === 'undefined' || !$obj_id) {
        get_table(variable_id);
      } else {
        get_table($obj_id);
      }
    });
  }

	function init_events() {
		if ( jQuery( '.wdp_bulk_table_content' ).length > 0 ) {
			jQuery('.variations_form').on('found_variation', {variationForm: this},
				function (event, variation) {
					if (typeof variation === 'undefined') {
						get_table(variable_id);
						return true;
					}
					get_table(variation.variation_id);
					return true;
				})
				.on('click', '.reset_variations',
					{variationForm: this},
					function (event, variation) {
						get_table(variable_id);
						return true;
					})
				.on('reset_data',
					function (event) {
						get_table(variable_id);
						return true;
					});

			init_custom_event();
		}

	}

	if ( script_data.js_init_trigger ) {
		$( document ).on( script_data.js_init_trigger, function () {
			init_events();
		} );
	}

	setTimeout(function () {
		init_events();
	}, 0);
} );
