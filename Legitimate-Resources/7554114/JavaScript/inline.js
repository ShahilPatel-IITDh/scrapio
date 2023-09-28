
$(function () {
  $('[data-toggle="popover"]').popover()
})

var lastResponse = '';
		
$(function() {
	$('#buttonCerrarError').on("click", function() {
		// todo, limpiar campos
		$("#auth").show();
		$("#authAccessError").hide();
	});
});
		
var inputs = $('.date-input').keyup(function(e){ 
       e.preventDefault();
	   if (e.which == 37){
		   var previusInput = inputs.get(inputs.index(this) - 1);
		   if (previusInput) {
			   previusInput.focus();
		       }
	   } else if (e.which != 8 && e.which != 9) {
		   var nextInput = inputs.get(inputs.index(this) + 1);
	       if (nextInput) {
	          nextInput.focus();
	       }   
	   }
});
		
function prePago(){
	// Rellenamos con 0 a la izq el contrato hasta que tenga longitud = 7.
	var contrato = $('#contrato').val();
	if (undefined != contrato){
		contrato = zfill(contrato.toString(),7);
		$('#contrato').val(contrato);
	}
	
	$('.login-loader').show();
	$("#alertAccess").hide();
	$("#smoochIdForm").val($("#smoochId").val());
	$.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader('X-CSRF-TOKEN',$( "input[name='_csrf']" ).val());
        }
    });
	$.ajax ({
		url:     "/auth",
		data:    $("#consultaFormBs").serialize(),
		type:    "POST",
		success: function (respuesta) {
			if( lastResponse != ''){
				MvcUtil.cleanInvalids();
			}
			console.log(respuesta);
			
			if(respuesta.faseEspecial){
				$("#consultaFormBs").submit();
				$('#dialog').modal ({
						keyboard: false,
						backdrop: 'static'
					});
			}else if(respuesta.faseEspecialMensaje){
				$('.login-loader').hide();
				$("#alertFaseEspecial").show(); 
			}else if(respuesta.error){
				$('.login-loader').hide();
				$("#alertWarning").hide();
				$("#alertAccess").html(respuesta.msgError);
				$("#alertAccess").show();
			}else if(respuesta.warning){
				/* $("#selectForm").submit();
				$('#dialog').modal (
					{
						keyboard: false,
						backdrop: 'static'
				}); */
				$('.login-loader').hide();
				$("#alertAccess").hide();
				$("#alertWarning").html(respuesta.msgWarning);
				$("#alertWarning").show();
			}else if(respuesta.success){
				if(respuesta.select){
					$("#selectForm").submit();
				}else{
					$("#consultaFormBs").submit();
				}
				$('#dialog').modal ({
						keyboard: false,
						backdrop: 'static'
					});
			}else{
				$('.login-loader').hide();
				lastResponse = respuesta;		
				for (i in respuesta.errorsParam) {
		    	    var error =  respuesta.errorsParam[i];
					MvcUtil.setInvalid(error.param);
		    	}
			}
		},
		error:function(jqXHR, textStatus, errorThrown) {
			rediTo(textStatus);
		}
	});
}
			
function openModalTyc() {
	$('#tycModal').modal('show');
}

// Funcion que rellena con ceros a la izq
function zfill(number, width) {
    var length = number.toString().length; /* Largo del número */ 
    var zero = "0"; /* String de cero */  
    
    if (width <= length) {
    	return number.toString(); 
    } else {
		return ((zero.repeat(width - length)) + number.toString()); 
    }
}
