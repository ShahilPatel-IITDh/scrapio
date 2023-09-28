
            jQuery(function () {
                window.Forminator_Cform_Paginations = window.Forminator_Cform_Paginations || [];
				                window.Forminator_Cform_Paginations[8352] =
						{"has-pagination":false,"pagination-header-design":"show","pagination-header":"nav","last-steps":"Finish","last-previous":"Previous","pagination-labels":"default","has-paypal":false};

                var runForminatorFront = function () {
                    jQuery('#forminator-module-8352[data-forminator-render="0"]')
                        .forminatorFront({"form_type":"custom-form","inline_validation":true,"print_value":false,"rules":"\"name-1\": \"required\",\"name-1\": \"trim\",\"email-1\": {\n\"required\": true,\"emailWP\": true,},\n","messages":"\"name-1\": \"This field is required. Please input your name.\",\n\"email-1\": {\n\"required\": \"This field is required. Please input a valid email.\",\n\"emailWP\": \"This is not a valid email.\",\n\"email\": \"This is not a valid email.\",\n},\n","conditions":{"fields":[],"relations":{"name-1":[],"email-1":[],"submit":[]}},"calendar":"{\"days\":[\"Su\",\"Mo\",\"Tu\",\"We\",\"Th\",\"Fr\",\"Sa\"],\"months\":[\"Jan\",\"Feb\",\"Mar\",\"Apr\",\"May\",\"Jun\",\"Jul\",\"Aug\",\"Sep\",\"Oct\",\"Nov\",\"Dec\"]}","paypal_config":{"live_id":"","sandbox_id":"","redirect_url":"https:\/\/ctrustglobal.com","form_id":8352},"forminator_fields":["address","calculation","captcha","consent","currency","custom","date","email","gdprcheckbox","group","hidden","html","checkbox","name","number","page-break","password","paypal","phone","postdata","radio","section","select","stripe","text","textarea","time","upload","url"],"general_messages":{"calculation_error":"Failed to calculate field.","payment_require_ssl_error":"SSL required to submit this form, please check your URL.","payment_require_amount_error":"PayPal amount must be greater than 0.","form_has_error":"Please correct the errors before submission."},"payment_require_ssl":false,"has_loader":true,"loader_label":"Submitting...","calcs_memoize_time":300,"is_reset_enabled":true,"has_stripe":false,"has_paypal":false,"submit_button_class":""});
                }

				if (window.elementorFrontend) {
					if (typeof elementorFrontend.hooks !== "undefined") {
						elementorFrontend.hooks.addAction('frontend/element_ready/global', function () {
							runForminatorFront();
						});
					}
				} else {
					runForminatorFront();
				}

										if (typeof ForminatorValidationErrors !== 'undefined') {
					var forminatorFrontSubmit = jQuery(ForminatorValidationErrors.selector).data('forminatorFrontSubmit');
					if (typeof forminatorFrontSubmit !== 'undefined') {
						forminatorFrontSubmit.show_messages(ForminatorValidationErrors.errors);
					}
				}
				if (typeof ForminatorFormHider !== 'undefined') {
					var forminatorFront = jQuery(ForminatorFormHider.selector).data('forminatorFront');
					if (typeof forminatorFront !== 'undefined') {
						jQuery(forminatorFront.forminator_selector).find('.forminator-row').hide();
						jQuery(forminatorFront.forminator_selector).find('.forminator-pagination-steps').hide();
						jQuery(forminatorFront.forminator_selector).find('.forminator-pagination-footer').hide();
					}
				}
				if (typeof ForminatorFormNewTabRedirect !== 'undefined') {
					var forminatorFront = ForminatorFormNewTabRedirect.url;
					if (typeof forminatorFront !== 'undefined') {
						window.open(ForminatorFormNewTabRedirect.url, '_blank');
					}
				}
			});
		