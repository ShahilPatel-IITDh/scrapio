jQuery(document).ready(function($) {

	//================ REQUIRED =====================
	$('input[name="acesso"]').on('change', function(event) {
		if ($(this).val() == "pf") {
			$('input#cpf').attr('required', 'required');
			$('input#data_nascimento').attr('required', 'required');
			$('input#cnpj').removeAttr('required');
		} else {
			$('input#cpf').removeAttr('required');
			$('input#data_nascimento').removeAttr('required');
			$('input#cnpj').attr('required', 'required');
		}
	});

	$("input#cpf, input#cnpj").focusin(function(event) {
		var obj = $(this);
		var value = $(this).val().replace(/[^\d\+]/g, "");

		obj.unmask();
		obj.val(value);
	});

	$("input#cpf, input#cnpj").focusout(function() {
		var value = $(this).val().replace(/[^\d\+]/g, "");
		var obj = $(this);

		obj.unmask();

		var tamanho = value.length;

		if (tamanho == 11) {
			obj.mask("999.999.999-99");
		} else if (tamanho == 14) {
			obj.mask("99.999.999/9999-99");
		}
	});
});