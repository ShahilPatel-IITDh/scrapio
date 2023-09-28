jQuery(document).ready(function($) {
	$(".telefone").mask("(00) 0000-0000Z",{
		clearIfNotMatch: !0,
		translation: {
			'Z': {
				pattern: /[0-9]/,
				optional: !0
			}
		},
	});
	$(".fixo").mask("(00) 0000-0000", {clearIfNotMatch: !0});
	$(".celular").mask("(00) 00000-0000", {clearIfNotMatch: !0});

	$('.cep').mask('00.000-000', {clearIfNotMatch: !0});
	$('.codigoMask').mask('000', {clearIfNotMatch: !0}); 
	$('.cpf').mask('000.000.000-00', {clearIfNotMatch: !0});
	$('.cnpj').mask('00.000.000/0000-00', {clearIfNotMatch: !0});
	$('.cartaoMask').mask('0000 0000 0000 000Z',{
		clearIfNotMatch: !0,
		translation: {
			'Z': {
				pattern: /[0-9]/,
				optional: !0
			}
		},
	});
	$('.validadeCartaoMask').mask('00/00', {clearIfNotMatch: true});
	$('.validadeCartaoMask2').mask('00/0000', {clearIfNotMatch: true});
	$('.data').mask('00/00/0000', {clearIfNotMatch: !0});

	$(".alias").removeNot({ pattern: /[^a-z0-9-]+/g });
});


jQuery.fn.removeNot = function( settings ){
	var $this = jQuery( this );
	var defaults = {
		pattern: /[^0-9]/,
		replacement: ''
	}
	settings = jQuery.extend(defaults, settings);

	$this.keyup(function(){
		var new_value = $this.val().replace( settings.pattern, settings.replacement );
		$this.val( new_value );
	});
	return $this;
}