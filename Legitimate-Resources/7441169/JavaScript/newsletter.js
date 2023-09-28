$(function(){

	$('input[type="email"]').on('focus', function(){
		$(this).attr('type', 'email');
	});

	var Newsletter = (function(){
		function getParams(form){
			return {
				'ws': JSON.stringify({
						'Newsletter': {
							'nome' : form.find('.newsletter-nome').val(),
							'email': form.find('.newsletter-email').val()
						}
					})
			}
		};
		
		function displayMessage(data){
			var msg = '';

			if(!data.Error && !data.Exists){
				$('#newsletterNome').val('');
				$('#newsletterEmail').val('');
				$('.newsletter-submit').find('.btn-text').removeClass('loading-button');
				msg = $.message.show('success', {vars:{title:'Você foi cadastrado com sucesso em nossa newsletter', idleTime: 3500}});
			} else if (data.Exists) {
				msg = $.message.show('error', {vars: {title: data.Exists}, idleTime: 3500});
			} else{
				if(data.Error.nome){
					msg = data.Error.nome.shift();
				}else if(data.Error.email){
					msg = data.Error.email.shift();
				} else if(data.Error.Logged){
					var uri = base_url + 'clientes/logout';
					msg = 'Você está logado no painel, para sair <a style="color:blue;text-decoration:underline;" href="'+uri+'">clique aqui</a>';
				} else {
					msg = data.Exists;
				}

				msg = $.message.show('error', {vars: {title: msg}, idleTime: 3500});
			}
		};

		function create(form){
			var params = getParams(form);
			//$.post(base_url+'clientes/createNewsletter', params, displayMessage, "JSON");
			
			var route = WsRouter.generateRoute(null, 'clientes', 'createNewsletter', null);
			WsDispatcher.postRequest(route, params, null, displayMessage);
		};

		return {
			create: create
		};

	})();

	$('.newsletter-submit').click(function(e){
		var btn = $(this),
			form = $(this).closest('.newsletterViewForm');
	
		form.validate({
			submitHandler: function(){
				btn.find('.btn-text').addClass('loading-button');
				Newsletter.create(form);
			}
		});
	});
});
