/**
 * Stripe payment form handler.
 */
jQuery(($) => {

	'use strict';

	/**
	 * Payment form handler.
	 *
	 * Interacts with Stripe Elements to process a checkout payment form.
	 */
	window.MWCPaymentsStripePaymentFormHandler = class MWCPaymentsStripePaymentFormHandler {

		/**
		 * Instantiates the payment form handler.
		 *
		 * Loads the payment handler and intercepts form submissions to process the payment using Stripe Elements.
		 *
		 * @param {Object} args form handler arguments
		 */
		constructor(args) {
			this.appInfo = args.appInfo;
			this.appearance = args.appearance;
			this.publishableKey = args.publishableKey;
			this.billingDetails  = args.billingDetails;
			this.isLoggingEnabled = args.isLoggingEnabled;
			this.redirectUrl = args.redirectUrl;
			this.genericError = args.genericError;
			this.isDetailedDecline = args.isDetailedDecline;
			this.reusablePaymentMethodTypes = args.reusablePaymentMethodTypes;

			// bail if no Stripe wrappers exist on the page
			if (! $('#mwc-payments-stripe-form').length) {
				return;
			}

			this.initialize();

			if ( $( 'form.checkout' ).length ) {
				this.form = $( 'form.checkout' );
				this.handleCheckout();
			} else if ( $( 'form#order_review' ).length ) {
				this.form = $( 'form#order_review' );
				this.handlePayPage();
			} else if ( $( 'form#add_payment_method' ).length ) {
				this.form = $( 'form#add_payment_method' );
				this.handleMyAccount();
			} else {
				this.debugLog('No payment form available');
			}
		}

		/**
		 * Initializes the Stripe SDK and Elements
		 */
		initialize() {
			this.stripe = Stripe(this.publishableKey);

			this.stripe.registerAppInfo(this.appInfo);

			this.refreshForm()
		}

		/**
		 * Initializes Stripe Elements
		 */
		initElements() {

			this.clientSecret = $('#mwc-payments-stripe-client-secret').val();

			this.elements = this.stripe.elements({
				clientSecret: this.clientSecret,
				appearance: this.appearance,
			})
		}

		/**
		 * Initializes the payment element
		 */
		initPaymentElement() {

			this.paymentElement = this.elements.create('payment', {
				fields: {
					billingDetails: {
						name: this.getFormFieldState(this.billingDetails.name, '#billing_first_name', '#billing_last_name' ),
						email: this.getFormFieldState(this.billingDetails.email, '#billing_email'),
						phone: this.getFormFieldState(this.billingDetails.phone, '#billing_phone'),
						address: {
							line1: this.getFormFieldState(this.billingDetails.address.line1, '#billing_address_1'),
							line2: this.getFormFieldState(this.billingDetails.address.line1, '#billing_address_2'),
							city: this.getFormFieldState(this.billingDetails.address.city, '#billing_city'),
							state: this.getFormFieldState(this.billingDetails.address.state, '#billing_state'),
							country: this.getFormFieldState(this.billingDetails.address.country, '#billing_country'),
							postalCode: this.getFormFieldState(this.billingDetails.address.postal_code, '#billing_postcode'),
						},
					}
				}
			})
		}

		/**
		 * Handles the saved payment methods
		 */
		handleSavedPaymentMethods() {

			let $newMethodForm = $('.mwc-payments-stripe-new-payment-method-form');

			$('input.mwc-payments-stripe-payment-method').change( () => {

				if ( $( "input.mwc-payments-stripe-payment-method:checked" ).val() ) {
					$newMethodForm.slideUp( 200 );
				} else {
					$newMethodForm.slideDown( 200 );
				}

			} ).change();

			$('input#createaccount').change((event) => {
				this.toggleSaveMethod($(event.target).is(':checked'));
			});

			if (! $('input#createaccount').is(':checked')) {
				$('input#createaccount').change();
			}

			// when the save method checkbox is checked, ensure the payment element displays the terms
			$('input.mwc-payments-tokenize-payment-method').change((event) => {

				let termsValue = $(event.target).is(':checked') ? 'always' : 'auto';

				this.paymentElement.update({
					terms: {
						auBecsDebit: termsValue,
						bancontact: termsValue,
						card: termsValue,
						ideal: termsValue,
						sepaDebit: termsValue,
						sofort: termsValue,
						usBankAccount: termsValue,
					}
				});
			});
		}

		/**
		 * Toggles the "Save method" checkbox availability.
		 *
		 * @param {Boolean} isAvailable
		 */
		toggleSaveMethod(isAvailable) {
			let $checkbox = $('input.mwc-payments-tokenize-payment-method');
			let $parentRow = $checkbox.closest( 'p.form-row' );

			if (isAvailable) {
				$parentRow.slideDown();
				$parentRow.next().show();
			} else {
				$parentRow.hide();
				$parentRow.next().hide();

				$checkbox.prop('checked', false);
			}
		}

		/**
		 * Gets the state of a Stripe Element form field depending on the potential for its value availability.
		 *
		 * - If the value is already available, we know we never need to collect it on the Stripe form.
		 * - If the value is not yet available but at least one of its form fields are present in the DOM, we know it will be collected by the Woo form and will be available when payment is submitted.
		 *
		 * @param {string} availableValue
		 * @param {string} sourceDomElements
		 *
		 * @returns {string}
		 */
		getFormFieldState(availableValue, ...sourceDomElements) {

			return availableValue || sourceDomElements.some(function (sourceDomElement) {
				return $(sourceDomElement).length > 0;
			}) ? 'never' : 'auto'
		}

		/**
		 * Refreshes the payment form.
		 */
		refreshForm() {
			this.initElements()

			if (this.paymentElement) {
				this.paymentElement.destroy()
			}

			this.initPaymentElement()

			// ensure the saved method checkbox is toggled depending on the chosen payment method type
			this.paymentElement.on('change', (event) => {
				this.toggleSaveMethod(this.reusablePaymentMethodTypes.includes(event.value.type));
			});

			this.paymentElement.mount('#mwc-payments-stripe-form')
		}

		/**
		 * Handles the checkout page.
		 */
		handleCheckout() {
			$( document.body ).on( 'updated_checkout', () => {
				this.refreshForm()
				this.handleSavedPaymentMethods()
			} );

			$( this.form ).on( 'checkout_place_order_stripe', () => {

				// submit the form and process server-side if a saved method is selected
				if ( $( "input.mwc-payments-stripe-payment-method:checked" ).val() ) {
					return true
				}

				$( this.form ).on('checkout_place_order_success.mwc-stripe', (event, data) => {

					let returnUrl = data.redirect

					if (data.billingDetails) {
						this.billingDetails = data.billingDetails;
					}

					// prevent WC from redirecting before we can confirm the payment
					data.redirect = '#!'

					if (returnUrl !== '#!') {
						this.handleConfirm(returnUrl);
					}
				})
			});
		}

		/**
		 * Handles the order pay page
		 */
		handlePayPage() {
			this.refreshForm();
			this.handleSavedPaymentMethods()

			this.form.submit( (event) => {
				if ( $( '#order_review input[name=payment_method]:checked' ).val() === 'stripe' ) {

					// submit the form and process server-side if a saved method is selected
					if ( $( "input.mwc-payments-stripe-payment-method:checked" ).val() ) {
						return true
					}

					event.preventDefault()

					if ($('#mwc-payments-stripe-tokenize-payment-method').is(':checked')) {
						let url = new URL(this.redirectUrl);
						url.searchParams.set("shouldTokenize", "true");
						this.redirectUrl = url.href;
					}

					this.handleConfirm(this.redirectUrl);
				}
			} );
		}

		handleMyAccount() {

			this.form.submit( (event) => {

				if ( $( '#add_payment_method input[name=payment_method]:checked' ).val() === 'stripe' ) {
					event.preventDefault();

					this.handleConfirm(this.redirectUrl);
				}
			} );
		}

		/**
		 * Handles confirming a payment or setup intent.
		 *
		 * @param {String} returnUrl
		 */
		handleConfirm(returnUrl = null) {

			// if the client secret is for a setup intent
			if (this.clientSecret.toString().startsWith('seti_')) {

				this.handleConfirmSetup(returnUrl);

				return;
			}

			this.handleConfirmPayment(returnUrl);
		}

		/**
		 * Handles confirming a setup intent.
		 *
		 * @param {String} returnUrl
		 */
		handleConfirmSetup(returnUrl = null) {

			this.stripe.confirmSetup({
				elements: this.elements,
				confirmParams: {
					payment_method_data: {
						billing_details: this.billingDetails,
					},
					return_url: returnUrl,
				},
			}).then(result => {
				if (result.error) {
					this.handleError(result.error)
				}
			});
		}

		/**
		 * Handles confirming a payment intent.
		 *
		 * @param {String} returnUrl
		 */
		handleConfirmPayment(returnUrl = null) {

			this.stripe.confirmPayment({
				elements: this.elements,
				confirmParams: {
					payment_method_data: {
						billing_details: this.billingDetails,
					},
					return_url: returnUrl,
				}
			}).then(result => {

				$(this.form).off('checkout_place_order_success.mwc-stripe');

				if (result.error) {
					this.handleError(result.error)
				}
			});
		}

		/**
		 * Handles the error event data.
		 *
		 * Logs errors to console.
		 *
		 * @param {Object} event after a form error
		 */
		handleError(event) {
			$( '.woocommerce-error, .woocommerce-message' ).remove();

			if ((event.type === 'validation_error') || (event.type === 'card_error' && this.isDetailedDecline)) {
				this.form.prepend( '<ul class="woocommerce-error"><li>' + event.message + '</li></ul>' );
			} else {
				this.form.prepend( '<ul class="woocommerce-error"><li>' + this.genericError + '</li></ul>' );
			}

			this.form.removeClass( 'processing' ).unblock();
			this.form.find( '.input-text, select' ).blur();

			$( 'html, body' ).animate( { scrollTop: this.form.offset().top - 100 }, 1000 );

			this.debugLog(event);
		}

		/**
		 * Logs an item to console if logging is enabled.
		 */
		debugLog() {
			if (this.isLoggingEnabled) {
				console.log.apply(null, arguments);
			}
		}

	}

	// dispatch loaded event
	$(document.body).trigger('mwc_payments_stripe_payment_form_handler_loaded');

});
