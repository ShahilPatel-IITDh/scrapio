jQuery(function($){
		$('#cpf_cnpj').unmask();//Remove a mascara
		$("#tipo").change(function(){
			$('#cpf_cnpj').unmask();//Remove a mascara
			if($(this).val()=="pf"){//Caso seja CPF
				$("#cpf_cnpj").mask("999.999.999-99");	 
			}else if($(this).val()=="pj"){//Caso seja Cnpj		
				$("#cpf_cnpj").mask("99.999.999/9999-99");	 
			}
		});
	
		$("#telefone").mask("(99) 9999-9999?9").ready(function(event) {
			var target, phone, element;
			target = (event.currentTarget) ? event.currentTarget : event.srcElement;
			phone = target.value.replace(/\D/g, '');
			element = $(target);
			element.unmask();
			if(phone.length > 10) {
				element.mask("(99) 99999-999?9");
			} else {
				element.mask("(99) 9999-9999?9");  
			}
		});
	
		$("#celular").mask("(99) 99999-9999").ready(function(event) {
			var target, phone, element;
			target = (event.currentTarget) ? event.currentTarget : event.srcElement;
			phone = target.value.replace(/\D/g, '');
			element = $(target);
			element.unmask();
			element.mask("(99) 99999-9999");
		});
		
		$("#end_cep").mask("99.999-999").ready(function(event) {
			var target, cep, element;
			target = (event.currentTarget) ? event.currentTarget : event.srcElement;
			cep = target.value.replace(/\D/g, '');
			element = $(target);
			element.unmask();
			if(cep.length > 8) {
				element.mask("99.999-999");
			} else {
				element.mask("99.999-999");  
			}
		});
	
});
		