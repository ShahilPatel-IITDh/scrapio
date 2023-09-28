/**
 * wcj-opc-script.
 *
 * @version 6.0.2
 * @since  1.0.0
 */

jQuery(document).ready(function ($) {

	var opc_response_messages = '';

	$('.wcj_opc_add_to_cart_btn').on('click', function (e) {
				var thisobj = $(this);
		$(thisobj).addClass('loading');
		var product_id = $(this).val();
		var product_title = $(this).data('product_title');
		var data = {
			'action': 'wcj_ajax_add_opc_add_to_cart',
			'product_id': product_id,
			'wpnonce': ajax_object.wpnonce,
		};
		$.ajax({
			type: "POST",
			url: ajax_object.ajax_url,
			data: data,
			dataType: 'json',
			success: function (response) {
				  $(thisobj).removeClass('loading');
				opc_response_messages = response.messages;
				$('#wcj_opc_notices .woocommerce-error, #wcj_opc_notices .woocommerce-message, #wcj_opc_notices .woocommerce-info').remove();
				$('body').trigger('update_checkout');
			},
			complete: function() {
                $(thisobj).removeClass('loading');
            }
		});
	});

	$('body').on('updated_checkout', function () {
		if (opc_response_messages.length > 0) {
			var $wcj_opc_notices = $('#wcj_opc_notices');

			$wcj_opc_notices.prepend(opc_response_messages);

			$('html, body').animate({
				scrollTop: ($wcj_opc_notices.offset().top - 50)
			}, 500);

			opc_response_messages = '';
		}
	});

});