(function ($) {
	'use strict';

	/**
	 * All of the code for your public-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */

	jQuery(document).ready(function ($) {

		var variation_obj = new variation()
		variation_obj.init();
		function variation() {
			this.is_variable = false;

			this.init = function () {
				this.is_variable = this.checkIfVariable();
				this.checkAddToCart();
				this.variationChange();
				this.buttonChange();
				this.addHidden();
				this.buttonChange();
			}

			this.checkIfVariable = function () {
				var $ = jQuery;
				if ($("input[name='variation_id']").length) {
					return true;
				}
				return false;
			}

			this.variationChange = function () {
				var parent = this;
				jQuery("body").on('change', "input[name='variation_id']", function () {
					parent.checkAddToCart();
				});
			}

			this.checkAddToCart = function () {
				if (this.is_variable) {
					var id = parseInt($("input[name='variation_id']").val());
					if (id > 0 && id != "") {
						this.statusBuyNow(true);
					} else {
						this.statusBuyNow(false);
					}
				}
			}

			this.buttonChange = function () {
				var parent = this;

				$(".single_variation_wrap").on("show_variation", function (event, variation) {
					if (variation['is_in_stock']) {
						parent.statusBuyNow(true);
					} else {
						parent.statusBuyNow(false);
					}
				});
			}

			this.statusBuyNow = function (status) {
				var $ = jQuery;
				if (status) {
					$(".pisol_single_buy_now").attr("disabled", false);
					$(".pisol_single_buy_now").removeClass('disabled');
				} else {
					$(".pisol_single_buy_now").attr("disabled", true);
					$(".pisol_single_buy_now").addClass('disabled');
				}
			}

			this.addHidden = function () {
				var $ = jQuery;
				$(document).on("click", ".pisol_single_buy_now", function (e) {
					/*
					$(this).after('<input type="hidden" name="pi_quick_checkout" value="true"/>');
					*/
					$(this).off('click', function () {
						$(this).trigger('click');
					});

					/** this prevents ajax add to cart added by other plugins */
					$(document).trigger('pisol_dtt_buy_now_clicked', [this]);
					jQuery(document.body).off('submit', 'form.cart');
				});
			}
		}
	});

})(jQuery);
