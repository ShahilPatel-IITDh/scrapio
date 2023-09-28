$(document).ready(function(){
	
	//inicia chat
	$('#body-chat form [name="ebt-enviar-mensagem"]').click(function(){
		
		//controle de validacao
		var valido = true;
		
		//validacao inicial
		if($('#body-chat form [name="enome"]').val().trim().length == 0){
		    valido = false;
		    $('#body-chat form [name="enome"]').parents('.col-xs-12').addClass('has-error');
		}else{
		     valido = true;
		    $('#body-chat form [name="enome"]').parents('.col-xs-12').removeClass('has-error');
		}
		
		if($('#body-chat form textarea[name="emensagem"]').val().trim().length && valido){
			
			$('#body-chat').find('form').hide(0);
			$('#body-chat').addClass('carregando');
			$('#body-chat div.conversa').show(0);
			
			$.ajax({
				url: 'sites/_chat/_ajax/visitante_cadastrar.php',
				type: 'POST',
				data: $('#body-chat form').serialize(),
				dataType: 'json',
				success: function(retorno){

					visitante = retorno;
					Chat.visitanteJoinRoom(visitante.visitante_id);

					//envia mensagem para o sistema atrazes do socket
					visitante.mensagem = $('#body-chat form textarea[name="emensagem"]').val().trim();
					visitante.room = Chat.imobiliariaGetRoom(imob_id);
					visitante.hora = hora_atual();
					Chat.emit(Chat.EVENT_EMIT_SEND_DATA, visitante);

					mensagem_adiciona({nome: visitante.nome, mensagem: $('#body-chat form textarea[name="emensagem"]').val().trim(), hora: hora_atual()});
				}
			});
			
		}
		return false;
	});
	
	//click do botao que envia mensagem
	$('#body-chat div.conversa button.btn-chat').click(function(){
		
		if($('#body-chat div.conversa input#texto_chat').val().trim().length >= 1){

			var mensagem = $('#body-chat div.conversa input#texto_chat').val().trim();
			mensagem_adiciona({nome: visitante.nome, mensagem: mensagem, hora: hora_atual()}, 'cliente');
			$.ajax({
				url: 'sites/_chat/_ajax/mensagem_cadastrar.php',
				type: 'POST',
				data: {emensagem: $('#body-chat div.conversa input#texto_chat').val()},
				success: function(){

					//envia mensagem para o sistema atrazes do socket
					visitante.mensagem = mensagem;
					visitante.room = Chat.imobiliariaGetRoom(imob_id);
					visitante.hora = hora_atual();
					Chat.emit(Chat.EVENT_EMIT_SEND_DATA, visitante);

				}
			});
		}
		
		$('#body-chat div.conversa input#texto_chat').val('').focus();
		return false;
		
	});
	
	//quando da enter manda mensagem, input
	$('#body-chat div.conversa input#texto_chat').on('keyup', function(e){
		if(((e.keyCode || e.which) == 13))
			$('#body-chat div.conversa button.btn-chat').click();
	});
	
	//quando da enter manda mensagem, textarea
    $('#body-chat form textarea[name="emensagem"]').on('keyup', function(e){
        if(((e.keyCode || e.which) == 13) && ($(this).val().trim().length >= 1))
            $('#body-chat form button[type="submit"]').click();
    });
	
});

//funcao que adiciona mensagem
function mensagem_adiciona(data, tipo){
	
	var html_div =
                    '<div class="mensagem-chat mensagem-chat-' + tipo + '">'
                        + '<div class="header-mensagem-chat">'
                            + '<span class="hora-mensagem">' + data.hora + '</span>'
                            + '<p>' + (data.nome.split(' ')[0]) + '</p>'
                        + '</div>'
                        + '<p class="texto-conversa">' + data.mensagem + '</p>'
                    + '</div>';
    
	$('#body-chat div.mensagens-chat').append(html_div);
	$('#body-chat div.mensagens-chat').animate({ scrollTop: 1000*1000*1000}, 0);
	
}

//pega a hora atual
function hora_atual(){
    var data = new Date(), h = String(data.getHours()), i = String(data.getMinutes());
    return (h.length < 2 ? '0' + h : h) + ':' + (i.length < 2 ? '0' + i : i);
}

//funcao que mostra e esconde aba do chat
$(function(){
	$('#chat_online #header-chat.chat-online').click(function(){
		if ( !$(this).parents('#chat_online').find('#body-chat').is(':visible') )
			$(this).parents('#chat_online').find('#body-chat').slideDown(350);
		else
			$(this).parents('#chat_online').find('#body-chat').slideUp(350);
		return false;
	});
});
