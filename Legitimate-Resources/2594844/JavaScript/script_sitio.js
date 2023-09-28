// JavaScript Document
// VARIABLE GLOBAL PARA GENERAR MÙLTIPLES FRAMES


function Imagen_Registro(lo_Objeto) {
            var lo_TR       = Tomar_Objeto_Nodo (lo_Objeto,'tr');

            if (lo_TR != null) {
                    // EL ID DEL PEDIDO SE ENCUENTRA EN LA PRIMERA COLUMNA 
                    var lc_Id                   = lo_TR.cells[0].firstChild.value;
                    // EL ID DEL SISTEMA DE PAGO EN LA CUARTA COLUMNA
                    var lc_Id_Sistema       = lo_TR.cells[3].firstChild.value;
                    // EL ID DEL ESTADO DE PAGO EN LA QUINTA COLUMNA
                    var lc_Id_Estado_Pago   = lo_TR.cells[4].firstChild.value;

                    if (lc_Id_Sistema == 2 && lc_Id_Estado_Pago != 3) {
                            Tomar_Datos_Pedido (lc_Id);
                    } else {
                            
                    }                   
            }               
          }

function Tomar_Datos_Pedido (lc_Id_Pedido) { 
            var la_Arreglo = new Array();
                var lo_Objeto     = new Object();
                lo_Objeto.nombre  = 'accion';
                lo_Objeto.valor   = 'Tomar_Datos_Pedido';
            la_Arreglo[la_Arreglo.length] = lo_Objeto;              
                var lo_Objeto     = new Object();
                lo_Objeto.nombre  = 'id_pedido';
                lo_Objeto.valor   = lc_Id_Pedido;
            la_Arreglo[la_Arreglo.length] = lo_Objeto;              

            //Enviar_Objeto_Servidor(gc_Ruta_Aplicativo + 'Cgi/Almacenamiento.php',la_Arreglo);
            Enviar_Objeto_Servidor(gc_Root + 'aplicaciones/modulo_pedidos/Cgi/Almacenamiento.php',la_Arreglo);
        }           

function Traer_Datos_Pedido(lo_Objeto) {
            var lo_TR       = Tomar_Objeto_Nodo (lo_Objeto,'tr');
            if (lo_TR != null) {
                    // EL ID DEL PEDIDO SE ENCUENTRA EN LA PRIMERA COLUMNA 
                var lc_Id       = lo_TR.cells[0].firstChild.value;
                    // EL ID DEL USUARIO EN LA SEGUNDA COLUMNA 
                var lc_Usuario  = lo_TR.cells[1].firstChild.value;
                    // EL ID DEL CLIENTE EN LA TERCERA COLUMNA 
                var lc_Cliente  = lo_TR.cells[2].firstChild.value;
                //var lc_Path     = lo_TR.cells[3].firstChild.value;
            
                AbrirVentana('http://' + gc_Weblider + 'correo/pedidos.php?micro2=' + lc_Cliente + '&usuario=' + lc_Usuario + '&pedido=' + lc_Id,'Documento');
                //AbrirVentana(lc_Path + '/correo/pedidos.php?micro2=' + lc_Cliente + '&usuario=' + lc_Usuario + '&pedido=' + lc_Id,'Documento');
            }
        }


function Validar_Objeto_Input (lc_Nombre) {
    var la_Objetos          = lc_Nombre.split(',');
    var lb_Resultado_Global = true;
    
    for (var li_Nombre=0; li_Nombre < la_Objetos.length; li_Nombre++) {
        var lo_Objeto = document.getElementById( la_Objetos[ li_Nombre ] );
        if ( lo_Objeto != null && lo_Objeto.value == "" ) {
            lb_Resultado_Global = false;
            lo_Objeto.style.background = "#FFCC66";
        } else {
            if ( lo_Objeto != null ) { lo_Objeto.style.background = "#ffffff"; } else { alert('no existe ' + la_Objetos[ li_Nombre ] ); }
        }
    }
    return lb_Resultado_Global;
} 

function Cargar_Texto_Select(lc_IdObjeto,lc_Valor) {
  	var lo_Objeto = (lc_IdObjeto.nodeName) ? lc_IdObjeto : document.getElementById(lc_IdObjeto);
  	if (lo_Objeto != null && lo_Objeto.nodeName == 'SELECT') {
        for (var li_Opcion=0; li_Opcion < lo_Objeto.length; li_Opcion++) {
    	      if (lo_Objeto.options[li_Opcion].text == lc_Valor) { lo_Objeto.selectedIndex = li_Opcion; break; }
        }
  	}
}

function Tomar_Texto_Select( lc_Id ) {
	  var lo_Select = (lc_Id.nodeName) ? lc_Id : document.getElementById(lc_Id); 
    var lc_Texto  = '';
    if (lo_Select != null) { lc_Texto = lo_Select.options[lo_Select.selectedIndex].text; }
    return lc_Texto;
}

function Enviar_Objeto_Servidor(lc_PhpAction,la_Objeto) {
    // ENVIAR EL USUARIO COMO VARIABLE POST
    var lc_Usuario = (document.getElementById('fc_Usuario') != null) ? document.getElementById('fc_Usuario').value : '';

    var la_Salida_Servidor = new Array();
    
    if (lc_PhpAction != undefined) {
        //la_Salida_Servidor = new Array("<iframe name='Frame_"+ gi_Div_Frame + "' id='Frame_" + gi_Div_Frame + "' style='display:block;' width='300' height='300' frameBorder=1></iframe><form name='Formulario_Datos_" + gi_Div_Frame + "' id='Formulario_Datos' action=\""+ lc_PhpAction +"\" method=post target='Frame_" + gi_Div_Frame + "' style='display:none;'><input type='text' name='Id_Frame' value='Frame_" + gi_Div_Frame + "'>");
        la_Salida_Servidor = new Array("<iframe name='Frame_"+ gi_Div_Frame + "' id='Frame_" + gi_Div_Frame + "' style='display:none;' width='0' height='0' frameBorder=0></iframe><form name='Formulario_Datos_" + gi_Div_Frame + "' id='Formulario_Datos' action=\""+ lc_PhpAction +"\" method=post target='Frame_" + gi_Div_Frame + "' style='display:none;'><input type='text' name='Id_Frame' value='Frame_" + gi_Div_Frame + "'>");
        if (la_Objeto != undefined) {
            // DEFINIR LOS OBJETOS
            for (var li_Objeto = 0; li_Objeto < la_Objeto.length; li_Objeto++) {
                if (typeof(la_Objeto[li_Objeto]) == 'object') {
                    var lo_Objeto = document.getElementById(la_Objeto[li_Objeto].nombre);
                    if (lo_Objeto != null) { Eliminar_Nodo(lo_Objeto) };
                    la_Salida_Servidor[la_Salida_Servidor.length] = "<input type='text' name= '" + la_Objeto[li_Objeto].nombre + "' id = '" + la_Objeto[li_Objeto].nombre + "' value=''>";
                }
            }
        }
        la_Salida_Servidor[la_Salida_Servidor.length] = "<input type='text' name='fc_Usuario' value='" + lc_Usuario + "'></form>";
    }
    var lo_Div = document.createElement('div');
    lo_Div.setAttribute('id','Div_Frame');
    lo_Div.setAttribute('style','display:block');
    
    lo_Div.innerHTML = la_Salida_Servidor.join('<br>');
    
    document.getElementsByTagName('body')[0].appendChild(lo_Div);
    //document.getElementById('Cuerpo_Formulario').appendChild(lo_Div);

    if (la_Objeto != undefined) {
        for (var li_Objeto = 0; li_Objeto < la_Objeto.length; li_Objeto++) {
            if (typeof(la_Objeto[li_Objeto]) == 'object') {
                var lo_Objeto = document.getElementById(la_Objeto[li_Objeto].nombre);
                if (lo_Objeto != null) { lo_Objeto.value = la_Objeto[li_Objeto].valor; }
            }
        }
    }
    document.forms['Formulario_Datos_' + gi_Div_Frame].submit();
    gi_Div_Frame += 1;
}

function Recuperar_Clave() {
    $('.seccion_clave_login').hide();
    // CAMBIAR EL LABEL DEL BOTÓN
    $('.acceso_login').empty().append(' Recuperar ');
}

function Loguear() {
    // SI LA ZONA DE CLAVE ESTÁ OCULTA, ENTONCES REQUIERE RECUPERACIÓN DE CONTRASEÑA
    if ( $('.seccion_clave_login').css('display') == 'none' ) {
        $.post( 'https://' + gc_Weblider + 'usuarios/nueva_clave.php', { 'codigo_robot':'true','cliente':gc_Custom_Cliente, 'email':document.getElementById('email_login').value },
            function(data) {
                //alert( data);
                //Mostrar_Mensaje( data );
                jAlert( data ,'Mensaje', function() { top.location.reload(); });
            }
        );    
        
    } else {

if ( document.getElementById('email_login').value != "" ) {

        //if ( document.getElementById('email_login').value != "" && document.getElementById('clave_login').value != "" ) {
	       
        
            var la_Arreglo = new Array();
            la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('accion' , 'Loguear' );
            la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('email'  , document.getElementById('email_login').value );
           la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('clave'  , document.getElementById('clave_login').value );
    
         Enviar_Objeto_Servidor( gc_Root + 'php/Funciones_Generales.php',la_Arreglo);
         
            $.post( './siev/php/Funciones_Generales.php', { 'accion':'Loguear','email':document.getElementById('email_login').value, 'clave':document.getElementById('clave_login').value, 'clave':'1' },
                function(data) {
                   // alert( data);
                    
                    var li_Errado = data.search(/error/i);
                    if ( li_Errado != -1 ) {
                     //   alert('error login' );
					  _toastr("Confirme sus datos, no hemos podido validar su acceso o Recupere su contraseña.","top-center","error",false);					 
                        //top.location.reload();
                    } else {
                     //   alert('ok login');
					  _toastr("Estamos verificando su inicio de sesión","top-center","default",false);
                        top.location.reload();
                    }
                }
            );
            
        } else {
           // alert('debe diligencia el email y la clave.');
		   _toastr("Debe Ingresar su email para loguearse","top-right","error",false);
        }
    } 
}

function Logout() {
    var la_Arreglo = new Array();
    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('accion' , 'Logout' );
    Enviar_Objeto_Servidor( gc_Root + 'php/Funciones_Generales.php',la_Arreglo);
}

function Plantilla( Id_Plantilla, lc_Contenedor ) {

    $.post( gc_Root + 'php/Funciones_Generales.php', { 'accion':'Plantilla','id':Id_Plantilla },
        function(data) {
            //alert("Data Loaded: " + data.replace(/^[\x20-\x3B\x3D]{1,}/gi,"").replace(/^[\x3F-\x7A\x3D]{1,}/gi,"").replace(/<script[\x20]{1,}language\=[\x27|\x22]{1,}text\/javascript[\x27|\x22]{1,}>/gi,"").replace(/<script[\x20]{1,}type\=[\x27|\x22]{1,}text\/javascript[\x27|\x22]{1,}>/gi,"").replace(/<\/script>/gi,"").replace(/<script>/gi,"") );
            var li_Errado = data.search(/error/i);
            if ( li_Errado != -1 ) {
                //alert('error plantilla ' + data );
				alert("Se deben ingresar términos y condiciones de uso en el SIEV®. Contactar al Administrador");
            } else {
                $('#' + lc_Contenedor ).empty().append( data );
                
                switch ( Id_Plantilla ) {
                    case 'registro'         : $('#zona_login').css( { 'padding':'20px 0px' } ); break;
                    case 'actualizar_datos' : $('#zona_login').css( { 'padding':'20px 0px' } ); 
                                              // CASO ESPECIAL, DONDE SE CARGA EL PAÍS Y LA CIUDAD
                                              Cargar_Texto_Select('ciudad_registro', document.getElementById('ciudad_formulario').value );
                                              break;  
                }
                
            }
        }
    );    
}
    

    
function Proceso_Pedido() {
    // PRESENTAR EL PROCESO DE PEDIDO 
    top.location.replace( gc_Root + '../?cart=true' );
}    
    
function Validar_Eliminar_Cesta( id_cesta, id_producto ) {
    Eliminar_Nodo('cesta_pedido_' + id_cesta);
    Eliminar_Cesta(id_cesta,id_producto);
    
    var li_Total_Items = $('#contenedor_proceso_pedido .cesta').length; 
    
    if ( li_Total_Items == 0 ) { 
        top.location.href = gc_Root + '../'; 
    } else {
        // CARGAR NUEVAMENTE LA CESTA
        Tomar_Datos_Zona_Carrito();
    }
} 

function Tomar_Datos(lc_Id_Objeto,lc_Parametro) {

    var la_Arreglo = new Array();
    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('accion'   , 'Tomar_Datos' );
    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('id'       , lc_Id_Objeto );
    if (String(lc_Parametro) != 'undefined') { la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('parametro', lc_Parametro ); }

    Enviar_Objeto_Servidor(gc_Root + 'aplicaciones/modulo_pedidos/Cgi/Almacenamiento.php',la_Arreglo);
}

function Cancelar_Popup() {
    if ( document.getElementById('loadModalHide').checked == true ) {
        var la_Arreglo = new Array();
        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('accion' , 'Cancelar_Popup' );
        Enviar_Objeto_Servidor( gc_Root + 'php/Funciones_Generales.php',la_Arreglo);
    } else {
        var la_Arreglo = new Array();
        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('accion' , 'Permitir_Popup' );
        Enviar_Objeto_Servidor( gc_Root + 'php/Funciones_Generales.php',la_Arreglo);
    }
} 

function Cargar_Url(lc_URL) {	self.location.replace(lc_URL); }	
	
function Cargar_Lista_Desplegable(lc_Objeto_Destino,lc_Detalle_Lista,lc_Parametro,lc_Funcion){
    var la_Arreglo = new Array();
    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('id',  lc_Detalle_Lista);
    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('objeto',  lc_Objeto_Destino);              
    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('codigo',  ( String(lc_Parametro) != 'undefined' ) ? lc_Parametro : '' );
    if ( String(lc_Funcion) != 'undefined' ) { la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('ejecutar' , lc_Funcion ); }
        
    Enviar_Objeto_Servidor( gc_Root + 'php/Cargar_Select.php',la_Arreglo ); 			 
}
    
function Cargar_Indicativo_Defecto() {
    Asignar_Valor('pais_barra_comunicaciones','COL|57');
}
    
$(document).ready(function() {
    $.ajaxSetup({
        'beforeSend' : function(xhr) {
        try{ xhr.overrideMimeType('text/html; charset=iso-8859-1'); }
        catch(e){ }
    }});    

    // CARGAR LOS PAÍSES CALLBACK
    Cargar_Lista_Desplegable('pais_barra_comunicaciones','paises_indicativo','','Cargar_Indicativo_Defecto()');
   
});


//ZONA DE ACTIVACIÓN DE CONVERSIONES 
$(document).ready(function(){
    $("a[id=whatsapp]").click(function(){
    $.ajax({
        type: "POST",
        url: "guardar_conversion.php",
        data:{conversion: "1", activar:"1"}
    })
    }); 
});
$(document).ready(function(){
    $("a[id=movil]").click(function(){
    $.ajax({
        type: "POST",
        url: "guardar_conversion.php",
        data:{conversion: "2", activar:"1"}
    })
    }); 
});
$(document).ready(function(){
        $("a[id=telefono]").click(function(){
    $.ajax({
        type: "POST",
        url: "guardar_conversion.php",
        data:{conversion: "3", activar:"1"}
    })
    });     
});
$(document).ready(function(){
        $("a[id=Waze]").click(function(){
    $.ajax({
        type: "POST",
        url: "guardar_conversion.php",
        data:{conversion: "4", activar:"1"}
    })
    });     
});
// FIN ZONA DE ACTIVACIÓN DE CONVERSIONES 

//ZONA DE ACTIVACIÓN DE COOKIE 
$(document).ready(function(){
    $("a[id=cookie]").click(function(){
    $.ajax({
        type: "POST",
        url: "guardar_cookie.php",
        data:{conversion: "1", activar:"1"}
    })
    }); 
});

// FIN ZONA DE ACTIVACIÓN DE COOKIE 


$(document).ready(function() {
   $('#someLinkId').trigger("click");
});

// SideBar
/*
function estilo_sidebar(){
                var uls = document.querySelectorAll('#li5 ul');
            for(var i = 0; i > uls.length; i++){
                uls[i].setAttribute('class', 'noDrop');
            }
            }
*/            
// MEGAMENU  

function myMegamenu(x) {
    if (x.matches) { // If media query matches
        var ulno = document.querySelectorAll('.col-md-5th a#a-b + #ul-1')
        for(var i = 0; i < ulno.length; i++) {
            ulno[i].setAttribute('class', 'noList')
        }
  var ulnos = document.querySelectorAll('.col-md-5th a#a-b + #ul-4')
        for(var i = 0; i < ulnos.length; i++) {
            ulnos[i].setAttribute('class', 'noList')
        }
  var ulnos0 = document.querySelectorAll('.col-md-5th a#a-b + #ul-4')
        for(var i = 0; i < ulnos0.length; i++) {
            ulnos0[i].setAttribute('class', 'noList')
        }   
  var ulno1 = document.querySelectorAll('.col-md-5th li#li-7 a#a-b + #ul-1')
        for(var i = 0; i < ulno1.length; i++) {
            ulno1[i].setAttribute('class', 'noList')
        }
  var ulno2 = document.querySelectorAll('.col-md-5th ul#ul-4 li#li-7 a#a-b + #ul-4')
        for(var i = 0; i < ulno2.length; i++) {
            ulno2[i].setAttribute('class', 'dropdown-menu')
        }
    } 
}

var x = window.matchMedia("(min-width: 992px)")
myMegamenu(x) // Call listener function at run time
x.addListener(myMegamenu) // Attach listener function on state changes          

