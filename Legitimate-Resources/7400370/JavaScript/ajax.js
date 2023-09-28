$(document).ready(function(){
	// $('#alerta-envio').hide();
	// $('form#'+formId).submit(function(event){event.preventDefault();});
	
	var redirect = null;
	var boleto = null;

	$(document).on('click', '.btn-enviar', function() {
		var cont = 0;
		var form = $(this).closest('form');
		var formId = form.attr('id');
		var acao = $('form#' + formId).attr('action');

		form.find("[required]").each(function(){
			if($.trim($(this).val()) == "")
			{
				$(this).addClass('required');
				cont++;
			}
			else {
				$(this).removeClass('required');
			}
		});

		if (form.find("[data-phone]").length) {
			
			var contphone = 0;
			$.each($('[data-phone]'), function(i,j){
				if ($(this).val() == "") {
					contphone++;
				}
			});
			if (contphone == $('[data-phone]').length) {
				form.find("[data-phone]").attr('title','Informe pelo menos um dos campos com número para contato');
				cont++;
			}
			else {
				form.find("[data-phone]").removeClass('required').removeAttr('title');
			}
		}

		if (form.find("[data-confirm]").length) {
			if ($('#password').val() == $('#confirm').val()) {
				this.setCustomValidity('');
				this.checkValidity();
				form.find("[data-confirm]").removeClass('required').removeAttr('title');
			}
			else {
				this.setCustomValidity('As senhas precisam ser iguais');
				this.checkValidity();
				form.find("[data-confirm]").addClass('required').attr('title','As senhas precisam ser iguais');
			}
		}

		if ($("#termos").length && !$("#termos").is(":checked")) {
			$("[for='termos']").children('span').addClass('required');
			cont++;
			alert("Você deve concordar com nossos termos!");
		} else {
			$("[for='termos']").children('span').removeClass('required');
		}

		if(cont == 0)
		{
			if ((formId == '') || (formId == null)) {
				console.log('Você não está enviando um formulário.')
				return false;
			}
			var dados_form = $('form#' + formId).serialize();
			$('.area-obox').removeClass('form');
			$('.area-obox .obox-header h3').remove();
			$('.area-obox .obox-body .content').remove();
			$('.area-obox .obox-body .close').show();
			$('.loader').show();
			$.ajax({
				async: true,
				url: acao,
				data: dados_form,
				type: 'POST',
				error: function(data) {
					$('.loader').hide();
					console.log(data)

					$('.area-obox .obox-header').prepend(
						$('<h3></h3>').text("Algo deu errado!")
						);
					$('.area-obox .obox-body').prepend(
						$('<div></div>').addClass('content').html('<span>Tente novamente mais tarde.</span>'+ data.responseText)
						);
					$('.area-obox').fadeIn(300);
				},
				success: function(data) {
					$('.loader').hide();
					console.log(data)
					/*TELA DE CONSULA ONLINE - USAR_DADOS*/
					if(data.usadados) {
						console.log(data.usadados);
						$('input#nome').val(data.usadados.nome);
						$('input#cpf').val(data.usadados.cpf);
						$('input#email').val(data.usadados.email);
						$('input#telefone').val(data.usadados.telefone);
						$('input#data_nascimento').val(data.usadados.data);
						if (data.usadados.sexo != "") {
							$('input#sexo_' + data.usadados.sexo).prop('checked','checked');
						} else {
							$('input[name="sexo"]').prop('checked', false);
						}
						$('.btn-use.btn-enviar').removeClass('btn-enviar');
					} else {
						$('.area-obox .obox-header').prepend(
							$('<h3></h3>').text("Sucesso!")
							);
						$('.area-obox .obox-body').prepend(
							$('<div></div>').addClass('content').html('<p>'+data.resposta+'</p>')
							);
						$('.area-obox').fadeIn(300);

						if(!data.status) {
							$('#' + formId)[0].reset();
						}
						if(data.redirect) {
							redirect = data.redirect;
						}
						if(data.file) {
							window.open(data.file);
						}
						if(data.redirectnow) {
							window.location.href = data.redirectnow;
						}
						if(data.removido) {
							$('.area-obox').find('.close').click(function(event) {
								location.reload();
							});
						}
					}
				}
			})
		}
	});

	$('.obox .close').click(function() {
		if(redirect != null) {
			window.location.href = redirect;
		}
		/*$('.area-obox').fadeOut(300);
		setTimeout(function(){
			$('.area-obox').addClass('form');
			$('.area-obox .obox-header h3').remove();
			$('.area-obox .obox-body .content').remove();
		}, 300);*/
	});

	/*$('.retorno').on('click',function(){
		$(this).removeClass('ok').fadeOut();

		if(redirect != null) {
			window.location.href = redirect;
		}

		if(boleto != null) {
			$("#confirmar-reserva").hide();
			$("#gerar-boleto").attr("href", boleto).show();
		} else {
			$("#confirmar-reserva").hide();
		}
	});*/
});

