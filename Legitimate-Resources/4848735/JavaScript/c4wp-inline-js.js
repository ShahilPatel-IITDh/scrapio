
				
				( function( grecaptcha ) {

					let c4wp_onloadCallback = function() {
						for ( var i = 0; i < document.forms.length; i++ ) {

							let form = document.forms[i];
							let captcha_div = form.querySelector( '.c4wp_captcha_field_div:not(.rendered)' );
							let jetpack_sso = form.querySelector( '#jetpack-sso-wrap' );

							if ( null === captcha_div ) {
								continue;
							}
							if ( !( captcha_div.offsetWidth || captcha_div.offsetHeight || captcha_div.getClientRects().length ) ) {						    	
								if ( jetpack_sso == null && jetpack_sso.length == 0 && ! form.classList.contains( 'woocommerce-form-login' ) ) {
									continue;
								}
							}

							var woo_register = form.getElementsByClassName( 'woocommerce-form-register__submit' );
							var woo_ppc      = form.querySelector('#ppc-button-ppcp-gateway');
							
							if ( woo_ppc != null &&  woo_ppc.length ) {
								woo_ppc.addEventListener( 'click', function ( event ) {
									if ( form.classList.contains( 'c4wp_verify_underway' ) ) {
										return true;
									} else {
										logSubmit( event, 'wc_login', form );
									}
								});
							} else if ( woo_register != null && woo_register.length ) {
								// Execute early to ensure response is populated.
								grecaptcha.execute(
									'6Ldq_4MUAAAAAA7E6seMM1JlVu36jxefjeoD1tuC',
								).then( function( data ) {
									var responseElem = form.querySelector( '.c4wp_response' );
									responseElem.setAttribute( 'value', data );
									form.classList.add( 'c4wp_v3_init' );
								});

								if ( captcha_div.parentElement.getAttribute('data-c4wp-use-ajax') == 'true' ) {
									form.addEventListener( 'submit', function( event ) {
										if ( form.classList.contains( 'c4wp_v2_fallback_active' ) ) {
											return true;
										} else {
											logSubmit( event, 'wc_reg', form );
										}
									});
								}
							}
							// is WC Checkout?
							else if ( form.classList.contains( 'checkout' ) ) {
								// Execute early to ensure response is populated.
								grecaptcha.execute(
									'6Ldq_4MUAAAAAA7E6seMM1JlVu36jxefjeoD1tuC',
								).then( function( data ) {
									var responseElem = form.querySelector( '.c4wp_response' );
									responseElem.setAttribute( 'value', data );	
									form.classList.add( 'c4wp_v3_init' );
								});
								
								if ( typeof jQuery !== 'undefined' && jQuery( captcha_div ).parent().attr( 'data-c4wp-use-ajax' ) == 'true' ) {
									jQuery( 'form.checkout' ).on( 'checkout_place_order', function( event ) {
										if ( jQuery( form ).hasClass( 'c4wp_v2_fallback_active' ) ) {
											return true;
										} else {
											logSubmit( event, 'wc_checkout', form );
											return false;
										}
									});
								}
							// is WC Login?
							} else if ( form.classList.contains( 'woocommerce-form-login' )  ) {
								// Execute early to ensure response is populated.
								grecaptcha.execute(
									'6Ldq_4MUAAAAAA7E6seMM1JlVu36jxefjeoD1tuC',
								).then( function( data ) {
									var responseElem = form.querySelector( '.c4wp_response' );
									responseElem.setAttribute( 'value', data );	
								});

								if ( captcha_div.parentElement.getAttribute('data-c4wp-use-ajax') == 'true' ) {
									const searchElement = form.querySelector( '.woocommerce-form-login__submit' );
									searchElement.addEventListener( 'click', function ( event ) {
										if ( form.classList.contains( 'c4wp_verify_underway' ) ) {
											return true;
										} else {
											logSubmit( event, 'wc_login', form );
										}
									});
								}

							} else if ( form.classList.contains( 'lost_reset_password' ) ) {
								const searchElement = form.querySelector( '.lost_reset_password button[type="submit"]' );
								searchElement.addEventListener( 'click', function ( event ) {
									if ( form.classList.contains( 'c4wp_verify_underway' ) ) {
										return true;
									} else {
										logSubmit( event, 'wc_reset_pass', form );
									}
								});

							// is CF7?
							} else if ( form.classList.contains( 'wpcf7-form' ) ) {
								// Execute early to ensure response is populated.
								grecaptcha.execute(
									'6Ldq_4MUAAAAAA7E6seMM1JlVu36jxefjeoD1tuC',
								).then( function( data ) {
									var responseElem = form.querySelector( '.c4wp_response' );
									responseElem.setAttribute( 'value', data );	
								});
								if ( captcha_div.parentElement.getAttribute('data-c4wp-use-ajax') == 'true' ) {
									const searchElement = form.querySelector( '.wpcf7-submit' );
									searchElement.addEventListener( 'click', function ( event ) {
										logSubmit( event, 'cf7', form );
									});
								}
							} else if ( form.getAttribute('id') == 'resetpassform' ) {
								const searchElement = document.querySelector( '#wp-submit' );
								searchElement.addEventListener( 'click', function ( event ) {
									// We take over the submit event, so fill this hiddne field.
									const pass1 = document.querySelector( '#pass1' );
									const pass2 = document.querySelector( '#pass2' );
									pass2.setAttribute( 'value', pass1.value );	
									logSubmit( event, 'reset_pw_form', form );
								});
							} else if ( form.getAttribute('id') == 'signup-form' && form.parentElement.parentElement.getAttribute('id') == 'buddypress' || form.getAttribute('id') == 'create-group-form' ) {
								// Execute early to ensure response is populated.
								grecaptcha.execute(
									'6Ldq_4MUAAAAAA7E6seMM1JlVu36jxefjeoD1tuC',
								).then( function( data ) {
									var responseElem = form.querySelector( '.c4wp_response' );
									responseElem.setAttribute( 'value', data );	
								});

							} else if ( form.parentElement.classList.contains( 'gform_wrapper' ) ) {
								// Execute early to ensure response is populated.
								grecaptcha.execute(
									'6Ldq_4MUAAAAAA7E6seMM1JlVu36jxefjeoD1tuC',
								).then( function( data ) {
									var responseElem = form.querySelector( '.c4wp_response' );
									responseElem.setAttribute( 'value', data );	
								});

								var GFsearchElement = form.querySelector( 'input[type=submit]' );

								GFsearchElement.addEventListener( 'click', function ( event ) {	
									logSubmit( event, 'gf', form );
								});

							} else {
								if ( captcha_div.parentElement.getAttribute('data-c4wp-use-ajax') != 'true' ) {
									// Execute early to ensure response is populated.
									grecaptcha.execute(
										'6Ldq_4MUAAAAAA7E6seMM1JlVu36jxefjeoD1tuC',
									).then( function( data ) {
										var responseElem = form.querySelector( '.c4wp_response' );
										responseElem.setAttribute( 'value', data );	
									});
								} else {

									// Anything else.
									form.addEventListener( 'submit', function ( event ) {
										logSubmit( event, 'other', form );
									});	
								}						
							}

							function logSubmit( event, form_type = '', form ) {
								if ( ! form.classList.contains( 'c4wp_v2_fallback_active' ) && ! form.classList.contains( 'c4wp_verified' ) ) {
									event.preventDefault();
									
									try {
										grecaptcha.execute(
											'6Ldq_4MUAAAAAA7E6seMM1JlVu36jxefjeoD1tuC',
										).then( function( data ) {	
											var responseElem = form.querySelector( '.c4wp_response' );
											responseElem.setAttribute( 'value', data );	

											
											if ( typeof form.submit === 'function' ) {
												form.submit();
											} else {
												HTMLFormElement.prototype.submit.call(form);
											}

											return true;
										});
									} catch (e) {

									}
								} else {
									if ( typeof form.submit === 'function' ) {
										form.submit();
									} else {
										HTMLFormElement.prototype.submit.call(form);
									}
									return true;
								}
							};
						}
					};

					grecaptcha.ready( c4wp_onloadCallback );

					//token is valid for 2 minutes, So get new token every after 1 minutes 50 seconds
					setInterval(c4wp_onloadCallback, 110000);

				} )( grecaptcha );
			