jQuery(document).ready (function () {

	// Display panels after delay
	if ( TRX_DEMO_STORAGE['tabs_delay'] > 0 && TRX_DEMO_STORAGE['tabs_layout'] != '' ) {
		setTimeout( function() {
			jQuery('body').append(TRX_DEMO_STORAGE['tabs_layout']);
			trx_demo_init();
		}, TRX_DEMO_STORAGE['tabs_delay'] );
	} else {
		trx_demo_init();
	}
} );

function trx_demo_init() {
	// Switch panels on tab click
	jQuery('.trx_demo_panels .trx_demo_tabs a:not([data-type="link"])')
		.on('click', function(e) {
			var tab = jQuery(this),
				panels = tab.parents('.trx_demo_panels');
			if (panels.hasClass('open')) {
				if ( ! tab.hasClass('trx_demo_tab_active') ) {
					panels.find('.trx_demo_panel_active').fadeOut(function() {
						jQuery(this).removeClass('trx_demo_panel_active');
						panels.find(tab.attr('href')).fadeIn().addClass('trx_demo_panel_active');
					});
				}
			} else {
				if ( ! tab.hasClass('trx_demo_tab_active') ) {
					panels.find('.trx_demo_panel_active').hide().end()
						.find(tab.attr('href')).show().addClass('trx_demo_panel_active');
				}
				panels.addClass('open');
				jQuery('html').addClass('trx_demo_panels_open');
			}
			if ( ! tab.hasClass('trx_demo_tab_active') ) {
				tab.siblings().removeClass('trx_demo_tab_active');
				tab.addClass('trx_demo_tab_active');
			}
			e.preventDefault();
			return false;
		});

	// Close panels
	jQuery('.trx_demo_panels .trx_demo_button_close,.trx_demo_panels_mask')
		.on('click', function(e) {
			jQuery('.trx_demo_panels')
				.removeClass('open')
				.find('.trx_demo_panel_active').removeClass('trx_demo_panel_active').end()
				.find('.trx_demo_tab_active').removeClass('trx_demo_tab_active');
			jQuery('html').removeClass('trx_demo_panels_open');
			e.preventDefault();
			return false;		
		});

	// Add classes to body
	jQuery('.trx_demo_panels .trx_demo_panel_list_item[data-body-class] a')
		.on('click', function(e) {
			jQuery('body').toggleClass( jQuery(this).parents('.trx_demo_panel_list_item').data('body-class') );
			e.preventDefault();
			return false;		
		});

	// Subscribe email
	jQuery('.trx_demo_panels .trx_demo_subscribe_email')
		.on('keypress', function(e) {
			jQuery(this).removeClass('trx_demo_field_error');
		} );
	jQuery('.trx_demo_panels .trx_demo_subscribe_button')
		.on('click', function(e) {
			jQuery(this).parents('form').submit();
			e.preventDefault();
			return false;		
		});
	jQuery('.trx_demo_panels .trx_demo_subscribe form')
		.on('submit', function(e) {
			var form = jQuery(this),
				fld = form.find('.trx_demo_subscribe_email'),
				email = fld.val(),
				url = form.attr('action'),
				nonce = form.find('[name="trx_demo_subscribe_nonce"]').val();
			var regexp = new RegExp( '^([a-z0-9_\\-]+\\.)*[a-z0-9_\\-]+@[a-z0-9_\\-]+(\\.[a-z0-9_\\-]+)*\\.[a-z]{2,6}$' );
			if ( url === '' || email === '' || email.length < 7 || ! regexp.test( email ) ) {
				fld.addClass( 'trx_demo_field_error' );
			} else {
				form.addClass('trx_demo_loading');
				jQuery.post(url, {
					action: "trx_demo_subscribe",
					nonce: nonce,
					email: email
				}).done(function(response) {
					var rez = {};
					try {
						rez = JSON.parse(response);
					} catch(e) {
						rez = { error: TRX_DEMO_STORAGE['msg_ajax_error'] };
						console.log(response);
					}
					form.removeClass('trx_demo_loading');
					var result = form.siblings(".trx_demo_message_box").removeClass("trx_demo_message_box_error").removeClass("trx_demo_message_box_success");
					if (rez.error === '') {
						form.get(0).reset();
						result.addClass("trx_demo_message_box_success").html( rez.success );
					} else {
						result.addClass("trx_demo_message_box_error").html( rez.error );
					}
					result.fadeIn().delay(5000).fadeOut();
				});
			}
			e.preventDefault();
			return false;		
		});
}