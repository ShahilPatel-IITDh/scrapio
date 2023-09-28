$(function () {
	RecommendStore = (function () {
		var form = $('#RecommendStoreForm');

		function disabledBtnSubmitInitial() {
			form.find(':input').on('blur change keyup', function () {
				__enableDisableButtonModalSubmit('#RecommendStoreForm', '#form-send-recommend-store');
			});
		}

		function form_data() {

			var postData = {};

			postData = {
				'RecommendStore': {
					nome_cliente: $('#RecommendStoreForm #RecommendStoreNomeCliente').val(),
					email_cliente: $('#RecommendStoreForm #RecommendStoreEmailCliente').val(),
					nome_indicado: $('#RecommendStoreForm #RecommendStoreNomeIndicado').val(),
					email_indicado: $('#RecommendStoreForm #RecommendStoreEmailIndicado').val(),
					comentario: $('#RecommendStoreForm #RecommendStoreComentario').val(),
					version: $('#RecommendStoreVersion').val(),
					recaptcha_response: $('#g-recaptcha-response').val()
				}
			};

			return postData;
		}

		function toggle_loading() {
			$('.recommend-store-loading').toggle('fast');
		}

		function post_data() {
			toggle_loading();

			var check_req = function (data) {

				var actions = {
					//'success': function(){ $.modal.hide("fadeOutUp", "modal-recommend-store", function(){ $.message.show('success', {'vars': {'title' : "Loja indicada com sucesso" }}); }); },
					//'error': function(){ $.message.show('error', {'vars': {'title' : "Houve um erro ao indicar a loja, tente novamente"}}); }
					'success': function () { success(); },
					'error': function () { error(); }
				};

				actions[data['Status']['type']].call(this);
			};

			$.post(base_url + 'clientes/recommendStore', { data: JSON.stringify(form_data()) })
				.done(function (data) { check_req(data); })
				.fail(function () { check_req(JSON.stringify({ 'Status': { 'type': 'error' } })) })
				.always(function () { toggle_loading(); });
		}

		function success() {
			hide();

			$.message.show('success', { 'vars': { 'title': "Loja indicada com sucesso" } });
		}

		function error() {
			/*if($('body').hasClass('layout-mobile')) {
				//Mobile

				$('<div class="msg-inline error">Houve um erro ao indicar a loja, tente novamente</div>').prependTo(form);

			} else {
				//Desktop
				$.message.show('error', {'vars': {'title' : "Houve um erro ao indicar a loja, tente novamente"}});
			}*/

			$.message.show('error', { 'vars': { 'title': "Houve um erro ao indicar a loja, tente novamente" } });
		}

		function hide() {
			if ($('body').hasClass('layout-mobile')) {
				//Mobile

				$('body').css('overflow-y', 'auto');
				$('.wrapper').removeAttr('style');
				$('body').scrollTop(position);
				$('.modal-x.open').removeClass('open');

			} else {
				//Desktop

				$.modal.hide("fadeOutUp", "modal-recommend-store");
			}
		}

		function show() {
			if ($('body').hasClass('layout-mobile')) {
				// Mobile

				position = $('body').scrollTop();

				var wHeight = $(window).height();

				$('body').css('overflow-y', 'hidden');

				setTimeout(function () {
					$('.wrapper').css({
						'overflow-y': 'hidden',
						'height': wHeight
					});
				}, 300);

				var footer_modal = '<button class="btn btn-submit btn-block" type="submit"><span class="btn-text">Enviar</span></button>';

				$('.modal-header-title').html('Recomende essa Loja <a href="javascript:;" class="modal-close">×</a>');
				$('.modal-footer').html('');
				$('.modal-footer').html(footer_modal);

				$('#modal-recommend-store').addClass('open');
				resetCaptcha();
			} else {
				// Desktop

				var footer_modal = '<button class="btn" id="form-send-recommend-store" type="submit"><span class="btn-text">Enviar</span></button>';

				$('.modal-header-title').html('Recomende essa Loja <a href="javascript:;" class="modal-close">×</a>');
				$('.modal-footer').html('');
				$('.modal-footer').html(footer_modal);

				__enableDisableButtonModalSubmit('#RecommendStoreForm', '#form-send-recommend-store');
				resetCaptcha();
				$.modal.show("fadeInDown", "modal-recommend-store");
			}


		}

		function resetCaptcha() {

			$('#g-recaptcha-response-error').remove();
			var reCaptcha = $('#g-recaptcha-response').val();
			if (reCaptcha.length > 0) {
				grecaptcha.reset();
			}
		}

		function listen() {

			if ($('body').hasClass('layout-mobile')) {
				$(document).on('click', '.btn-submit', function () {
					form.submit();
				});
			}

			form.submit(function (e) {
				e.preventDefault();
				if (form.valid()) {

					// Pagina do produto
					if ($('body').hasClass('pagina-produto')) {

						grecaptcha.execute().then(function (token) {

							// Aguarda ate o response estar completo	
							progress = setInterval(function () {

								if ($('#g-recaptcha-response').val().length > 0) {

									$('#RecommendStoreVersion').val('3');
									clearInterval(progress);
									post_data();
								}

							}, 1000);
						});

					} else {

						// demais paginas
						var reCaptcha = $('#g-recaptcha-response').val();
						if (reCaptcha.length > 0) {

							post_data();

						} else {

							var error = '<label id="g-recaptcha-response-error" class="error" for="g-recaptcha-response">Você precisa completar o Captcha de segurança.</label>';
							$('#g-recaptcha-response-error').remove();
							$('#div-captcha-recommend-store').append(error);
						}
					}
				}
			});

			$('.recommend-store-btn').on('click', function (e) { e.preventDefault(); show.call(this); });

			$('#modal-recommend-store .btn-cancelar').on('click', function () {
				hide();
			});

		}

		return { 'listen': listen, disabledBtnSend: disabledBtnSubmitInitial }

	})();

	RecommendStore.disabledBtnSend();
	RecommendStore.listen();
});