var lo_Box_Contacto_Coti   = new Object();
lo_Box_Contacto_Coti.width              = '360px';
lo_Box_Contacto_Coti.height             = '250px';
lo_Box_Contacto_Coti.titulo             = '&nbsp;&nbsp;Mensaje&nbsp;';
lo_Box_Contacto_Coti.mensaje            = 'Su mensaje ha sido recibido y enviado al área encargada. Le hemos enviado un correo de confirmación a su correo electrónico.';
lo_Box_Contacto_Coti.error              = 'El código de validación no es correcto, intente de nuevo.';
lo_Box_Contacto_Coti.botones            = "<div id='contenedor_botones_mensaje'><div><input id='btn_inicio' type='button' class='button' value='Volver al Inicio'><input id='btn_cerrar' class='button' type='button' value='Cerrar'></div></div>";
 /* VALIDADOR DE LOS CAMPOS REQUERIDOS */
lo_Box_Contacto_Coti.validar            = "nombre_coti,email_coti,telefono_coti,destino_coti,noches_coti,hotel_coti,pais_coti,ciudad_coti,adulto_coti,nino_coti,infante_coti,transporte_coti,fecha_coti";
lo_Box_Contacto_Coti.nombre_formulario  = '#contactFormCotizacion';
lo_Box_Contacto_Coti.color_validacion   = '#000';

function Validar_Formulario_Preguntas() {
      // CREAR EL LIENZO
      var lo_Div_Lienzo = document.createElement('div');
      lo_Div_Lienzo.setAttribute('id','lienzo_mensaje');
    
      var lo_Div_Marco  = document.createElement('div');
      lo_Div_Marco.setAttribute('id','marco_mensaje');
    
      $('body')[0].appendChild( lo_Div_Lienzo );
      $('body')[0].appendChild( lo_Div_Marco );
    
      // REDIMENSIONAR EL ALTO DEL BOX
      $('#marco_mensaje').css( { 'width':lo_Box_Contacto_Coti.width, 'height':lo_Box_Contacto_Coti.height, 'left': ( parseInt( $(window).width() ) / 2 )  - ( parseInt( $('#marco_mensaje').css('width') ) / 2 ) } );  
    
      $('#marco_mensaje').append("<div id='mensaje_pie_respuesta'>" + lo_Box_Contacto_Coti.titulo + "</div>");
      
      /***************************************************************************  
      **             TODOS LOS ELEMENTOS DEBEN SER ADICIONADOS                  **
      ***************************************************************************/
      //lo_Div_Marco.appendChild( $('#contenedor_general')[0] );
      
      // ADICIONAR EL LOGO EN CASO DE ESTAR DEFINIDO
      if ( String(lo_Box_Contacto_Coti.logo) != 'undefined' )     { $('#marco_mensaje').append( lo_Box_Contacto_Coti.logo ); }
      // ADICIONAR EL CUERPO DEL MENSJE
      $('#marco_mensaje').append("<div class='mensaje_agradecimiento' >" + lo_Box_Contacto_Coti.mensaje + "</div>");
      // ADICIONAR LOS BOTONES DE REDIRECCIÓN
      if ( String(lo_Box_Contacto_Coti.botones) != 'undefined' )  { 
          $('#marco_mensaje').append( lo_Box_Contacto_Coti.botones );

          $('#btn_inicio').click(function(event){ 
              event.preventDefault();
              top.location.replace( lo_Box_Contacto_Coti.home );
          });
          
          $('#btn_cerrar').click(function(event){ 
              event.preventDefault();
              Cerrar_Formulario_Pregunta();
          });
      }
          
      // HACER QUE EL CERRADO DEL MENSAJE VAYA A HOME
      $('#mensaje_pie_respuesta').click(function(event) { 
          event.preventDefault(); 
          // DEVOLVER LOS OBJETOS
          //$('#inlineContent')[0].appendChild( $('#contenedor_general')[0] );
          $('#lienzo_mensaje').remove(); 
          $('#marco_mensaje').remove();
      });
    
      // MODIFICAR LAS CARACTERÍSTICAS DEL PIE DE RESPUESTA
      $('#mensaje_pie_respuesta').css( {'margin':'0px','border-radius':'7px'} );
      // MODIFICAR LAS CARACTERÍSTICAS DEL MARCO MENSAJE
      $('#marco_mensaje').css('background','#fff');
      // MODIFICAR LAS CARACTERÍSTICAS DEL LIENZO
      $('#lienzo_mensaje').css( { 'width':$(document).width(), 'height':$(document).height(), 'opacity':0.5 } );   
      // POSICIONAR SOBRE EL MARCO MENSAJE
      $('#marco_mensaje')[0].scrollIntoView();    
}

function Cerrar_Formulario_Pregunta() {
    $('#lienzo_mensaje').remove(); 
    $('#marco_mensaje').remove();
}

function showLoading() { 
    $('body').append("<div id='loading' align='center'><p>Un momento por favor ...</p></div>");
    $("#loading").show(); 
}

function hideLoading() { $("#loading").remove(); }

function Datos_Carga_pais() {
    // UNA VEZ CARGADOS LOS PAISES, PRECARGAR COLOMBIA
    Asignar_Valor('pais','COL');
    Cargar_Lista_Desplegable('ciudad_coti','ciudades_siev',document.getElementById('pais').value);
}
 
function Enviar_Cotizacion() {

    var lc_Color_Validacion = (String(lo_Box_Contacto_Coti.color_validacion) != 'undefined') ? lo_Box_Contacto_Coti.color_validacion : '#000';

        
        if ( Validar_Objeto_Input( lo_Box_Contacto_Coti.validar, lc_Color_Validacion ) == false ) {
            //Mostrar_Mensaje('Los campos resaltados son obligatorios. Favor verificar.');
			   _toastr("Los campos resaltados son obligatorios. Favor verificar.","top-center","error",false);
        } else {
            // VALIDAR EL CAMPO DE EMAIL
            var expr = /\w+@\w+\.+[a-z]/;
            if (!expr.test(email_coti.value)) {
                 _toastr("Debe ingresar un correo válido. Favor verificar.","top-center","error",false);
                 document.getElementById('email_coti').style.backgroundColor="#FFCC65";
            } else {
            // ADICIONAR UN CÓDIGO DE VALIDACIÓN 
            $( lo_Box_Contacto_Coti.nombre_formulario ).append("<input type='hidden' name='codigo_robot' value='true'>");
    
            // SI NO EXISTE EL CAMPO MICRO2, ADICIONARLO AL FORMULARIO
            if ( $( lo_Box_Contacto_Coti.nombre_formulario + ' input#micro2').length == 0 ) {
                $( lo_Box_Contacto_Coti.nombre_formulario ).append("<input type='hidden' name='micro2' value='" + gc_Custom_Cliente + "'>");
            }

            // ESCAPAR TODOS LOS CAMPOS QUE PUEDAN CONTENER TILDES
            //document.getElementById('nombre_cita').value    = escape( document.getElementById('nombre_cita').value );
            //document.getElementById('especialidad').value    = escape( document.getElementById('especialidad').value );
            //document.getElementById('mensaje_contacto').value   = escape( document.getElementById('mensaje_contacto').value );

            // ADICIONAR EL NOMBRE DE LA CIUDAD
            $( lo_Box_Contacto_Coti.nombre_formulario ).append("<input type='hidden' name='nombre_ciudad' value='" + escape(  Tomar_Texto_Select('ciudad_coti') ) + "'>");
            
            //$( lo_Box_Contacto_Coti.nombre_formulario ).submit();

            // CREAR EFECTO CORTINA
            showLoading();
            
            $.post( lo_Box_Contacto_Coti.envio_formulario, $( lo_Box_Contacto_Coti.nombre_formulario ).serialize(),
                function(data) {
                    // OCULTAR CORTINA
                    hideLoading();
    
                    //alert( data );
                    
                    //alert("Data Loaded: " + data.replace(/^[\x20-\x3B\x3D]{1,}/gi,"").replace(/^[\x3F-\x7A\x3D]{1,}/gi,"").replace(/<script[\x20]{1,}language\=[\x27|\x22]{1,}text\/javascript[\x27|\x22]{1,}>/gi,"").replace(/<script[\x20]{1,}type\=[\x27|\x22]{1,}text\/javascript[\x27|\x22]{1,}>/gi,"").replace(/<\/script>/gi,"").replace(/<script>/gi,"") );
                    var li_Errado = data.search(/no\x20es\x20correcto/i);
                    if ( li_Errado != -1 ) {
                        //lo_Box_Contacto_Coti.mensaje  = lo_Box_Contacto_Cotierror;
                        //Mostrar_Mensaje(lo_Box_Contacto_Coti.error);
						            _toastr(lo_Box_Contacto_Coti.error,"top-center","error",false);
						
                    } else {
                        //alert( "Data Loaded: " + data );
                        
                        // MODULO DE REDIRECCIÓN PARA CONVERSIONES
                        if ( typeof gb_Conversiones == "undefined" ) {
                            $(lo_Box_Contacto_Coti.nombre_formulario).each (function() { this.reset(); });
                            Validar_Formulario_Preguntas();
                        } else {
                            top.location.href = "https://" + gc_Weblider  + "?mensaje=contacto#contenedor_banner_superior";
						//	top.location.href = "https://www.clioropamaterna.com/template/?mensaje=contacto#contenedor_banner_superior";						 
                        }
                    }
                });
        }
    }
}

 
$(document).ready(function() {

    /** DEFINICIÓN DE LOS OBJETOS DESPUÉS DE CARGAR JQUERY ****/
	
	    /** DEFINICIÓN DE LOS OBJETOS DESPUÉS DE CARGAR JQUERY ****/
    lo_Box_Contacto_Coti.logo               = "<img id='logo_marco_mensaje' style='height:50px;' src='" + $('#logo_cliente').attr('value') + "'>";
    lo_Box_Contacto_Coti.home               = $('#root_cliente').attr('value');
    lo_Box_Contacto_Coti.envio_formulario   = "https://" + gc_Weblider + 'comunicaciones/accion_contacto_cotizacion.php';
    
	
	/*
    lo_Box_Contacto_Coti.logo               = "<img id='logo_marco_mensaje' style='height:50px;' src='" + $('#logo_cliente').attr('value') + "'>";
    lo_Box_Contacto_Coti.home               = 'https://www.clioropamaterna.com/template/';
    lo_Box_Contacto_Coti.envio_formulario   = 'https://www.clioropamaterna.com/template/comunicaciones/accion_contacto.php';
    */  
    $.ajaxSetup({
        'beforeSend' : function(xhr) {
        try{ xhr.overrideMimeType('text/html; charset=iso-8859-1'); }
        catch(e){ }
    }});

    // ASIGNAR EL ATRIBUTO TITLE A LOS OBJETOS QUE ASÍ LO REQUIERAN
    $('#nombre_cita').attr('title','Favor digitar su nombre (Obligatorio)');
    $('#email_cita').attr('title','Favor digitar el email donde pueda ser contactado (Obligatorio)');
    $('#telefono_cita').attr('title','Favor digitar el teléfono donde pueda ser contactado (Obligatorio)');
    $('#especialidad').attr('title','Favor seleccione una especialidad (Obligatorio)');
    $('#fecha_cita').attr('title','Favor seleccione una fecha para ser contactado (Obligatorio)');
    $('#boton_enviar_cita').attr('title','Hacer click para enviar.');

});
