$(document).ready(function () {

	var bidButton = $('#auction-form').find('.button-green-large');
	var priceInput = $('#auction-form').find('input[type=text]');
	var defaultPrice = priceInput.val();

	priceInput.change(f = function () {

		if (priceInput.val() != defaultPrice) {
			bidButton.removeClass('button-cancel');
		} else {
			bidButton.addClass('button-cancel');
		}

	}).keyup(f).focus(function () {

		setTimeout(function () {
			priceInput.select();
		}, 200);

	});

});