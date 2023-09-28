$(document).ready(function () {
	$('select[name=individual]').change(function () {
		if ($(this).val() === '0') {
			$('.required-company').show();
			$('.required-individual').hide();
		} else {
			$('.required-company').hide();
			$('.required-individual').show();
		}
	});

	var nipChangeInt = null;
	$('input[name=nip]').change(f = function () {

		if (!nipChangeInt) {
			nipChangeInt = true;
			setTimeout(function () {

				$.getJSON(window.location.protocol + "//" + window.location.hostname + "/account/setnip.html", {"nip": $('input[name=nip]').val()}, function () {});
				nipChangeInt = false;

			}, 1000);
		}

	}).keyup(f);
});