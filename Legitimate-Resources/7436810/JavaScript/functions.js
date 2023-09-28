/*
* Função para as abas secundárias
*/
function abas_secundarias(wrapper){
	$("#" + wrapper + " .wrapper_abas_secundarias .abas li a").each(function(){

		
		//mostrando a primeira aba
		var _self = $(this);
		var _aba = _self.attr("href");

		if( _self.hasClass("ativo") ) $(_aba).fadeIn(300);

		//Ação Menu
		_self.click(function(){
			var _self_aba = $(this);
			var _class = _self.parent().attr('class');

			//Tratando o menu
			$("#" + wrapper + " .wrapper_abas_secundarias .abas li a").removeClass("ativo");
			_self.addClass("ativo");

			if( wrapper == "historico" ){
				console.log(_class);
				$("." + _class + " a").addClass("ativo");
			}

			//Mostrando a aba
			$("#" + wrapper + " .wrapper_abas_secundarias .aba").fadeOut(30, function(){
				$(_self_aba.attr("href")).stop().fadeIn(400);
			}).hide();

			//Prevenindo ancora
			return false;
		});
	});
}





$(function(){

	//Instanciando abas
abas_secundarias("abas_tabelas_turnos");
abas_secundarias("historico");
abas_secundarias("jogos_classificacao");
abas_secundarias("elenco_atual");
abas_secundarias("wrapper_quem_entrou");
abas_secundarias("wrapper_quem_saiu");
	/* 
	* Select
	*/
	$(".select").click(function(){
		var _self = $(this);

		//Abre dropbox
		_self.find("ul").toggle();

		//Mecânica do click
		_self.find("li").click(function(){
			_self.find("#filtro").val( $(this).attr("data-value") );
			//OLD _self.find("input").val( $(this).attr("data-value") );
			_self.find(".display").text( $(this).text() );
		});
	});
	
	/*
	* Abas
	*/
	if ($('#abas').length)
		$('#abas').easyTabs({defaultContent:1});
	
	/*
	* Galeria
	*/
	var galleries = $('.ad-gallery').adGallery({

		hooks: {
			displayDescription: function(image) {
				var arr_desc = image.desc.split(";");
				$('.nome').html("<strong>" + arr_desc[0] + "</strong> - " + arr_desc[1] + " - " + arr_desc[2]);
				$('.descricao').html(arr_desc[3]);
			}
		}
	});
	
	/*
	* Anuncie
	*/
	$(".item_banner").each(function(){
		var _self = $(this);
		$(".barra_info",_self).click(function(){
			$(".item_banner .demo").stop().slideUp();
			$(".demo", _self).stop().slideDown();
		})
	});

	/*
	* Formulário
	*/
	if ($("#formulario_cadastro").length) {
		$("#formulario_cadastro").validate({
			onKeyup : true,
			eachValidField : function() {
				$(this).removeClass('invalid');
				$(this).closest('div').find(".msg_error").remove();
				$('#lbl_termos').removeAttr('style');

				var _self = $(this);
				var campo = _self.attr("id");

				if( campo == "senha" ){
					var raw_pass =  document.getElementById('senha').value;
					var crypt_pass = hex_sha512(raw_pass);
					if  (raw_pass != "")
						document.getElementById('p').value = crypt_pass;
					else
						document.getElementById('p').value = '';
				}
			},
			eachInvalidField : function() {
				var _self = $(this);
				var campo = _self.attr("id");

				if( campo == "cep" ){
					if( !_self.closest('div').find(".msg_error").text() ) _self.after('<span class="msg_error">Informe seu CEP</span>');
				}
				else
					if( campo == "termos" ){
						$('#lbl_termos').css('color', 'red');
					}

				$(this).addClass('invalid');
			}
		});

		$.validateExtend({
		    email : {
		        required : true,
		        pattern : /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
		    }
		});

		$.validateExtend({
		    verifica_senha : {
		        required : true,
		        conditional : function(value) {
		            if( $("#formulario_cadastro #senha").val() != value ){
		            	if ($('#pwd_not_matching').length <= 0)
		            	{ 
		            		$(this).after('<span class="msg_error" id="pwd_not_matching">Senha não confere. Digite novamente </span>');
		            	} 
		            	return false;
		            }else{
		            	$(this).closest('div').find(".msg_error").remove();
		            	return true;
		            }
		        }
		    }
		});

		$.validateExtend({
		    verifica_senha_opt : {
		        required : false,
		        conditional : function(value) {
		            if( $("#formulario_cadastro #senha").val() != value ){
		            	if ($('#pwd_not_matching').length <= 0)
		            	{ 
		            		$(this).after('<span class="msg_error" id="pwd_not_matching">Senha não confere. Digite novamente </span>');
		            	} 
		            	return false;
		            }else{
		            	$(this).closest('div').find(".msg_error").remove();
		            	return true;
		            }
		        }
		    }
		});
	}
	$(".interna-cadastro-editar .form .linha .campo .inpt_b").bind('blur',function(){$(this).css("color","#535353") });

	/*
	* Tabela Raking Jogo
	*/
	$(".tabela_ranking tr.linha_jogo").click(function(){
		var _self = $(this);
		var _id = _self.attr("id");

		$(".tabela_ranking tr.linha_jogo").removeClass("linha_jogo_ativo");
		_self.addClass("linha_jogo_ativo");

		$(".tabela_ranking tr.linha_jogador td").stop().slideUp(0,function(){
			$(".tabela_ranking tr."+_id+" td").stop().slideDown(0);
		});
	});

	/*
	* Bolão
	*/
	$(".interna-bolao .bt_a").click(function(){
		var _self = $(this);
		var _aba = _self.attr("data-aba");

		$("#" + _aba + " .gol").each(function(){
			var _self_inpt = $(this);
			var erro;

			if(!_self_inpt.val()){
				_self_inpt.addClass("erro");
				erro++;
			}else{
				_self_inpt.removeClass("erro");
				erro--;
			}

		});

		if(erro) return false;
		else return true;

	});

	/*
	* Fórum
	*/

	//Mostra box comentários
	$(".add_comentario_forum").click(function(){
		var _form = $("#formulario_comentario_forum");
		_form.slideDown(300);
		$(".add_comentario_forum").fadeOut(300);
		$('html, body').animate({scrollTop: _form.offset().top}, 600);
		return false;
	});

	//Esconde box comentários
	$("#formulario_comentario_forum .cancelar").click(function(){
		$("#formulario_comentario_forum").slideUp(300);
		$(".add_comentario_forum").fadeIn(300);
		return false;
	});
	
	$('#mercado .wrapper_filtro div').click(function(){

		if($(this).hasClass('active')){
			$('#mercado .wrapper_jogadores ul li').show()
			$(this).removeClass('active');
		}else{
			$('#mercado .wrapper_filtro div').removeClass('active');
			$(this).addClass('active');

			if($(this).hasClass('saiu')){
				$('#mercado .wrapper_jogadores ul li.chegou').hide()
				$('#mercado .wrapper_jogadores ul li.saiu').show()
			}else{
				$('#mercado .wrapper_jogadores ul li.saiu').hide()
				$('#mercado .wrapper_jogadores ul li.chegou').show()
			}
		}

	});
	
});

function convertToURL(input_text)
{
	input_text = input_text.toLowerCase().replace('?','');
	com_acento = 'áàãâäéèêëíìîïóòõôöúùûüç'; 
	sem_acento = 'aaaaaeeeeiiiiooooouuuuc'; 
	nova=''; 
	for(i=0;i<input_text.length;i++) { 
		if (com_acento.search(input_text.substr(i,1))>=0) { 
		    nova+=sem_acento.substr(com_acento.search(input_text.substr(i,1)),1); 
		} 
		else { 
		    nova+=input_text.substr(i,1); 
		} 
	} 

	nova = nova.replace(/ /g,'-');

    return nova.replace(/[^a-zA-Z- 0-9]+/g, '');
}


function autoResize(id){
    var newheight;
    var newwidth;

    if(document.getElementById){
        newheight = document.getElementById(id).contentWindow.document .body.scrollHeight;
        //newwidth = document.getElementById(id).contentWindow.document .body.scrollWidth;
    }

    document.getElementById(id).height = (newheight) + "px";
    //document.getElementById(id).width = (newwidth) + "px";
}



