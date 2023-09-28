function carregaValor() {
  // xajax_carregaValor($('#tipo_produto').val(), $('#anos_registro').val());
  xajax_carregaValor($('#cod_servico').val());
}

/*recuperaSenha: function(){
    if($('#login_email').val() != '') {
      // recuperando a senha do cidadï¿½o
      xajax_recuperaSenha(login_email);
    } else {
      alert('Preencha o campo "E-mail" e clique em "Esqueceu sua senha"\npara recuperar sua senha!');
      $('#login_email').focus();
    }

}; */
jQuery.recuperaSenha = function(a,b){
  $("#frm" + b).slideDown(500);
  $("#frm" + a).slideUp(0);
};


$(function() {

  $('#frm_login').validate({

    submitHandler: function(form) {
      // alert($('#flag_submit').val());
      if($('#flag_submit').val() == '0') {
        xajax_loginCliente(xajax.getFormValues('frm_login'));
        return false;
      } else {
        return true;
      }
    },

    // define regras para os campos
    rules: {
	  login_email: {
        required: true,
        email: true
      },
      login_senha: {
        required: " <font style='color:#f00;'>***</font>"
      }
    },

    errorPlacement: function(error, element) {
    	// Append error within linked label
    	$( element )
    		.closest( "form" )
    			.find( "label[for='" + element.attr( "id" ) + "']" )
    				.append( error );
    },

    // define messages para cada campo
    errorElement: "span",
    messages: {
      login_email: ' <font style="color:#f00;">***</font>',
      login_senha: ' <font style="color:#f00;">***</font>'
    }
  });

  $('#frm_esqueci').validate({

    submitHandler: function(form) {
      xajax_recuperaSenha(xajax.getFormValues('frm_esqueci'));
      return false;
    },

    // define regras para os campos
    rules: {
	  login_email1: {
        required: true,
        email: true
      }
    },

    errorPlacement: function(error, element) {
    	// Append error within linked label
    	$( element )
    		.closest( "form" )
    			.find( "label[for='" + element.attr( "id" ) + "']" )
    				.append( error );
    },

    // define messages para cada campo
    errorElement: "span",
    messages: {
      login_email1: ' <font style="color:#f00;">***</font>'
    }
  });
});
