	function consiste(form){
		ClearListErrors();
		var str = "";
		
		str = form.usuario.value;
		str1 = str.trim();
		if( str1.length <= 0 ){
			AddError( "Você não digitou o usuário.", form.usuario );
		}
		
		str = form.senha.value;
		str1 = str.trim();
		if( str1.length <= 0 ){
			AddError("Você não digitou a senha.", form.senha );
		}
		return ShowListErrors();		
	}

	function CarregaBody(){
		LoadErrorsServidor();
		document.formlogin.usuario.focus();
	}
	
