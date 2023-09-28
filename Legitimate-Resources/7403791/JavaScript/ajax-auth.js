
jQuery(document).ready(function ($) {
	$(window).load(function(){
		"use strict";

		/* Show cart on hover/click */
		var login_widget = $('.widget_tz_login_register');
		var login_heading = login_widget.find('.tz-login-heading');
		var login_content = login_widget.find('.tz-login-form-wrapper');
		var settings = {
					interval: 100,
					timeout: 200,
					over: mousein_triger,
					out: mouseout_triger
		};
		function mousein_triger(){
			if ( login_heading.hasClass('clickable') ) {
				$(this).find('.tz-login-form-wrapper').css('visibility', 'visible').addClass('opened');
			}
		}
		function mouseout_triger() {
			if ( login_heading.hasClass('clickable') ) {
				$(this).find('.tz-login-form-wrapper').removeClass('opened');
				$(this).find('.tz-login-form-wrapper').delay(300).queue(function() {
					$(this).css('visibility', 'hidden').dequeue();
				});
			}
		}
		/* Check if not inline mode */
		if ( !login_heading.hasClass('inline') ) {
			if ( window.matchMedia("(min-width: 801px)").matches ) {
				login_widget.hoverIntent(settings);
			} else {
				login_heading.on('click', function(){
					if ( $(this).hasClass('clickable') ) {
						if ( login_content.hasClass('opened') ) {
							login_content.removeClass('opened');
							login_content.delay(300).queue(function() {
								login_content.css('visibility', 'hidden').dequeue();
							});
						} else {
							login_content.css('visibility', 'visible').addClass('opened');
						}
					}
				})
			}
		}

    /* Display form from link inside a popup */
		$('#tz-pop-login, #tz-pop-register').on('click', function (e) {
      var formToFadeOut = $('form#tz-register');
      var formToFadeIn = $('form#tz-login');
      if ($(this).attr('id') == 'tz-pop-register') {
        var formToFadeOut = $('form#tz-login');
        var formToFadeIn = $('form#tz-register');
      }
			if ( $('.tz-login-heading').hasClass('inline') ) {
				formToFadeOut.removeClass('visible').delay(300).queue(function() {
					formToFadeOut.css('visibility', 'hidden').dequeue();
				});
				formToFadeIn.css('visibility', 'visible').addClass('visible');
			} else {
				formToFadeOut.fadeOut(300, function () {
					formToFadeIn.fadeIn(300);
				})
			}
      e.preventDefault();
    });

		/* Show the login/signup popup on click */
		$('#show_login_form, #show_register_form').on('click', function (e) {
			var overlay = '<div class="tz-login-overlay"></div>';
			$('body').prepend($(overlay).hide().fadeIn(500));
			if ($(this).attr('id') == 'show_login_form') {
				$('form#tz-login').css('visibility', 'visible').addClass('visible');
			} else {
				$('form#tz-register').css('visibility', 'visible').addClass('visible');
			}
			e.preventDefault();
		});

		/* Close popup */
		$(document).on('click', '.tz-login-overlay, .tz-form-close', function (e) {
				$('form.ajax-auth').removeClass('visible').delay(300).queue(function() {
					$('form.ajax-auth').css('visibility', 'hidden').dequeue();
				});
				$('.tz-login-overlay').fadeOut(300, function () {
          $('.tz-login-overlay').remove();
        });
				e.preventDefault();
		});

		// Perform AJAX login/register on form submit
		$('form#tz-login, form#tz-register').on('submit', function (e) {
        $('p.status', this).show().text(ajax_auth_object.loadingmessage);
				var action = 'ajaxlogin';
				var username = 	$('form#tz-login .tz-login-username').val();
				var password = $('form#tz-login .tz-login-password').val();
				var email = '';
				var security = $('form#tz-login #security').val();
        var become_vendor = null;
        var accept_terms = null;
				var firstname = '';
				var lastname = '';

				if ($(this).attr('id') == 'tz-register') {

						action = 'ajaxregister';
						username = $('form#tz-register .tz-register-username').val();
						password = $('form#tz-register .tz-register-password').val();
						firstname = $('form#tz-register .tz-register-firstname').val();
						lastname = $('form#tz-register .tz-register-lastname').val();
	        	email = $('form#tz-register .tz-register-email').val();
	        	security = $('#signonsecurity').val();

            if ( $('#apply_for_vendor_widget').is(":checked") ) {
                become_vendor = '1';
            }
            if ( $('#agree_to_terms_widget').is(":checked") ) {
                accept_terms = '1';
            }
				}
				var ctrl = $(this);
				$.ajax({
            type: 'POST',
            dataType: 'json',
            url: ajax_auth_object.ajaxurl,
            data: {
                'action': action,
                'username': username,
								'sender-first-name': firstname,
								'sender-last-name': lastname,
                'password': password,
								'email': email,
                'security': security,
                'become_vendor': become_vendor,
                'accept_terms': accept_terms
            },
            success: function (data) {
								$('p.status', ctrl).text(data.message);
								if (data.loggedin == true) {
				            document.location.href = data.redirect_url;
				        }
				    },

			error: function(error_code) {
            	console.log(error_code);
			}

        });

        e.preventDefault();
	  });

	});
});
