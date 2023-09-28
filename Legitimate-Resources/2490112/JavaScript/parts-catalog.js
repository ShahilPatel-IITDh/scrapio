;(function (window, jQuery, undefined) {
			var CTP = CTP || {},
				domain = window.document.body.dataset.domain,
				lang = window.document.body.dataset.lang;

				Module = function () {};

			CTP.w = window;

			Module = function (ns_string) {
				var parent = CTP,
					parts = ns_string.split('.'),
					i = 0;

				parts = parts[0] === "CTP" ? parts.slice(1) : parts;

				for (; i < parts.length; i += 1) {
					parent[parts[i]] = parent[parts[i]] === "undefined" ? {} : parent[parts[i]];
					parent = parent[parts[i]];
				}

				return parent;
			}

			Module('CTP.forms');

			CTP.forms = {
				validate: function (arr) {

					arr.forEach(function (item) {	
						if(!CTP.forms.parameters.checkFields(item)) {
							$(item.name).parent('span').addClass('register-fail');
						} else {
							$(item.name).parent('span').removeClass('register-fail');
						}
					});

					return $('.register-fail').length === 0;
				},
				parameters: {
					checkFields: function (obj) {
						switch(obj.title) {
						case 'name' :
						case 'password' :
							return obj.val.length >= 3;
							break;
						case 'email' :
							return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(obj.val);
							break;
						default :
							return obj.val.length > 0;
							break;
						}
					}
				}
			};

			Module('CTP.asyncs');

			CTP.asyncs = {
				successMessage: function () {
					var container	= document.createElement('div'),
						text		= document.createElement('h2'),
						button 		= document.createElement('a'),
						message 	= document.querySelectorAll('.formulario-registro')[0].dataset.successMessage,
						enterText   = document.querySelectorAll('.formulario-registro')[0].dataset.entertext;

						container.className = 'register-success';
						button.className = 'register-success--button';
						text.className = 'register-success--title';

						text.innerHTML = message;
						button.innerHTML = enterText;
						button.href = domain + lang + '/catalogo/';

						container.appendChild(text);
						container.appendChild(button);

						return container;

				},
				register: function (data) {
					$.ajax({
						type: 'POST',
						url: domain + lang + '/catalogo/novo',
						data: data,
						success: function (response) {
							console.log(response);
							if (response === '1') {
								$('.catalogo-wrapper .formulario-registro').css('visibility', 'hidden');
								$('.catalogo-wrapper').append(CTP.asyncs.successMessage());
							} else if (response === '3') {
								$('.warn-user').text('E-mail já cadastrado').css('visibility', 'visible');
							}
						}
					});
				}
			}

			$('form.formulario-registro--form').on('submit', function (e) {
				e.preventDefault();
				var inputs = document.querySelectorAll('input.required'),
					serial = $(this).serialize(),
					i = 0,
					max = inputs.length,
					vals = [];

				for (; i < max; i += 1) {
					vals.push({ name: 'input[name="' + inputs[i].name + '"]', val: inputs[i].value, title: inputs[i].name });
				}

				if(CTP.forms.validate(vals)) {
					document.querySelectorAll('.warn-user')[0].style.visibility = 'hidden';
					CTP.asyncs.register(serial);
				} else {
					document.querySelectorAll('.warn-user')[0].style.visibility = 'visible';
				}
			});

			$('form.formulario-registro--form input.required').on('keyup focus blur', function () {
				var vals = [{ name: 'input[name="' + $(this).attr('name') + '"]',  val: $(this).val(), title: $(this).attr('name') }],
					serial = $(this).parent().serialize();

				if(CTP.forms.validate(vals)) {
					document.querySelectorAll('.warn-user')[0].style.visibility = 'hidden';
				} else {
					document.querySelectorAll('.warn-user')[0].style.visibility = 'visible';
				}
			});

			$('.advanced-search').on('click', function (e) {
				e.preventDefault();
				$('.advanced-field').toggle();

				if($(this).data('enabled') == 'false') {
					$(this).html('Busca avançada');
					$(this).data('enabled', 'true')
				} else {
					$(this).html('Fechar busca avançada');
					$(this).data('enabled', 'false')
				}

				$('input').val('');
			});
		}(window, jQuery))