// INICIALIZAR EL ARREGLO DE PRODUCTOS
var ga_Arreglo_Productos_Carrito  = new Array();
var lo_Factura = new Object();

var lo_Box_Cesta      = new Object();
lo_Box_Cesta.width    = '360px';
lo_Box_Cesta.height   = '250px';
lo_Box_Cesta.titulo   = '&nbsp;&nbsp;Mensaje del sistema&nbsp;';
lo_Box_Cesta.mensaje  = "";
lo_Box_Cesta.botones  = "<div id='contenedor_botones_mensaje'><div><input id='btn_cerrar' class='button' type='button' value='Continuar'></div></div>";
lo_Box_Cesta.funcion  = "";


function showLoading() { 
    $('body').append("<div id='loading' align='center'>Un momento por favor <br> Estamos procesando</div>");
    $("#loading").show(); 
}

function hideLoading() { $("#loading").remove(); }



function Mensaje_Transaccion_Pedido() {
      // POSICIONAR EN EL TOP DEL SITE
      window.scrollTo(0,0);
      
      // CREAR EL LIENZO
      var lo_Div_Lienzo = document.createElement('div');
      lo_Div_Lienzo.setAttribute('id','lienzo_mensaje');
    
      var lo_Div_Marco  = document.createElement('div');
      lo_Div_Marco.setAttribute('id','marco_mensaje');
    
      $('body')[0].appendChild( lo_Div_Lienzo );
      $('body')[0].appendChild( lo_Div_Marco );
    
      // REDIMENSIONAR EL ALTO DEL BOX
      $('#marco_mensaje').css( { 'width':lo_Box_Cesta.width, 'height':lo_Box_Cesta.height, 'left': ( parseInt( $(window).width() ) / 2 )  - ( parseInt( $('#marco_mensaje').css('width') ) / 2 ) } );  
    
      $('#marco_mensaje').append("<div id='mensaje_pie_respuesta'>" + lo_Box_Cesta.titulo + "</div>");
      
      /***************************************************************************  
      **             TODOS LOS ELEMENTOS DEBEN SER ADICIONADOS                  **
      ***************************************************************************/
      //lo_Div_Marco.appendChild( $('#contenedor_general')[0] );
      
      // ADICIONAR EL LOGO EN CASO DE ESTAR DEFINIDO
      if ( String(lo_Box_Cesta.logo) != 'undefined' )     { $('#marco_mensaje').append( lo_Box_Cesta.logo ); }
      // ADICIONAR EL CUERPO DEL MENSJE
      $('#marco_mensaje').append("<div class='mensaje_agradecimiento' >" + lo_Box_Cesta.mensaje + "</div>");
      // ADICIONAR LOS BOTONES DE REDIRECCIÓN
      if ( String(lo_Box_Cesta.botones) != 'undefined' )  { 
          $('#marco_mensaje').append( lo_Box_Cesta.botones );

          $('#btn_cerrar').click(function(event){ 
              event.preventDefault();
              Cerrar_Formulario_Pregunta();
              eval( lo_Box_Cesta.funcion );
          });
      }
          
      // HACER QUE EL CERRADO DEL MENSAJE VAYA A HOME
      $('#mensaje_pie_respuesta').click(function(event) { 
          event.preventDefault(); 
          Cerrar_Formulario_Pregunta();
          eval( lo_Box_Cesta.funcion );
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

function Formatear_Numero(lc_Numero) {
    if ( gc_Decimales_Moneda > 0 ) {
        // ELIMINAR LOS DECIMALES
        var la_Numero = String(lc_Numero).split('.');
        var lc_Numero = la_Numero[0];  
        //var lc_Numero = new String(lc_Numero).replace(/,/gi,'');
        li_Caracteres = lc_Numero.length - 1;
        lc_Salida     = '';
        li_Separador  = 0;
        for (var li_Caracter=li_Caracteres; li_Caracter >= 0; li_Caracter--) {
            li_Separador += 1;
            lc_Salida = (li_Separador == 3 && li_Caracter > 0) ? ',' + lc_Numero.substr(li_Caracter,1) + lc_Salida : lc_Numero.substr(li_Caracter,1) + lc_Salida;
            li_Separador = (li_Separador == 3) ? 0 : li_Separador;
        }
        return (la_Numero.length == 1) ? lc_Salida : lc_Salida + '.' + la_Numero[1];      
    } else {
        var lc_Numero = new String(lc_Numero).replace(/,/gi,'');
        li_Caracteres = lc_Numero.length - 1;
        lc_Salida     = '';
        li_Separador  = 0;
        for (var li_Caracter=li_Caracteres; li_Caracter >= 0; li_Caracter--) {
            li_Separador += 1;
            lc_Salida = (li_Separador == 3 && li_Caracter > 0) ? ',' + lc_Numero.substr(li_Caracter,1) + lc_Salida : lc_Numero.substr(li_Caracter,1) + lc_Salida;
            li_Separador = (li_Separador == 3) ? 0 : li_Separador;
        }
        return lc_Salida;
    }
    return lc_Numero; 
}


function Tomar_Numero_Decimales (lc_Numero) {
    if ( gc_Decimales_Moneda > 0 ) {
        var lc_Numero = String(lc_Numero).replace(/[^\.-9]/g,'');
        if (isNaN(parseFloat(lc_Numero))) { 
            return 0 
        } else {
            var li_Longitud_Cadena = lc_Numero.length; 
            if ( lc_Numero.indexOf(".") == (li_Longitud_Cadena - 1) ) {
                return lc_Numero;
            } else {
                //return parseFloat(lc_Numero).round(gc_Decimales_Moneda);
                return parseFloat(lc_Numero);
            }
        }           
    } else {
        var lc_Numero = String(lc_Numero).replace(/[^\.-9]/g,'');
        if (isNaN(parseInt(lc_Numero))) { return 0 } else { return parseInt(lc_Numero); }
    }
}

function In_Array(la_Arreglo,lc_Valor) {
    var lb_Resultado = false;
    for (var li_Contador=0; li_Contador < la_Arreglo.length; li_Contador++) {
        //alert( '[' + la_Arreglo[li_Contador] + '][' + lc_Valor + ']' );
        if (la_Arreglo[li_Contador] == lc_Valor) { lb_Resultado = true; break; }
    }
    return lb_Resultado;
}
  
function Efecto_Cesta_Over() {
    // CREAR EFECTO MOUSEOVER
    $(".imagen_cesta").mouseover( function(e) {
        // CREAR EL OBJETO IMAGEN QUE PRESENTARÁ LA IMAGEN
        var lo_Imagen = document.createElement('img');
        lo_Imagen.src = $(this).attr('src');
        lo_Imagen.setAttribute('id','imagen_ejemplo_cesta');
        //lo_Imagen.setAttribute('style','width:80px;position:absolute;top:' + (e.pageY + 5) + 'px;left:' + (e.pageX + 15) + 'px;');
        lo_Imagen.setAttribute('style','top:' + (e.pageY + 5) + 'px;left:' + (e.pageX + 15) + 'px;' );
        document.getElementsByTagName('body')[0].appendChild(lo_Imagen);
    }).mouseout( function() { Eliminar_Nodo('imagen_ejemplo_cesta'); } );
    
    $(".imagen_cesta").click(function(){
        var lo_URL = document.getElementById("a_url").href;
            window.location.href  = lo_URL;
    });
}

function Activar_Login_Comprador() {
    if ( gc_Usuario_Anonimo != '' ) {
        /*$('#link_ventana_user').trigger('click');*/
        Login_Box();

    } else {
        //$('#link_comprar').attr('href',"/index.php?sistema=1&amp;opcion=4&amp;ver=1&amp;micro2=<?php echo $row_micros['custom_cliente'] ?>");
        //$('#link_comprar').trigger('click');
        self.location.href  = gc_Root + "../?sistema=1&opcion=4&ver=1&micro2=" + gc_Custom_Cliente + "#ancla"; 
    }
    return false;    
}

// ESTA FUNCIÓN DEBE ESTAR SINCRONIZADA CON LA DE proceso_pedido.php    
function Eliminar_Cesta( lc_Id, lc_Id_Producto ) {
    var la_Arreglo = new Array();
    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'accion'   ,'Eliminar_Registro');
    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'codigo'   ,lc_Id );
    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'destino'  ,'cesta' );
    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'atributo' ,'id' );
    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'ejecutar' ,'Cesta_Eliminada()' );
    // ENVIAR LA BASE DE DATOS PARA CONTROLAR LA CONSULTA
    if ( String(gc_Datos) != 'undefined' ) { la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'bd',gc_Datos ); }

    Enviar_Objeto_Servidor( gc_Root + 'aplicaciones/modulo_pedidos/Cgi/Almacenamiento.php',la_Arreglo);
    
    if ( typeof ga_Arreglo_Productos_Carrito != 'undefined' ) {
        var li_Total_Productos  = ga_Arreglo_Productos_Carrito.length;
        var la_Nueva_Cesta      = new Array();
         
        for (var li_Producto=0; li_Producto < li_Total_Productos; li_Producto++ ) {
            if ( ga_Arreglo_Productos_Carrito[li_Producto] != lc_Id_Producto ) { la_Nueva_Cesta[la_Nueva_Cesta.length] = ga_Arreglo_Productos_Carrito[li_Producto]; }
        }
        ga_Arreglo_Productos_Carrito = la_Nueva_Cesta;
    }    
}

function Cesta_Eliminada() {
    showLoading()
    
    // TOMAR EL STRING DEL NAVEGADOR
    var lc_Busqueda     = String(window.location.search); 
    // DETERMINAR SI LA RECARGA SE HACE SOBRE EL HOME O SOBRE EL CARRITO DE COMPRAS
    var li_Facturacion  = lc_Busqueda.search(/factura/i);
    
    if ( li_Facturacion != -1 ) {
        top.location.replace("/index.php?micro2=" + gc_Custom_Cliente);
    } else {
        top.location.reload();
    }
    // TRAER LOS LISTADOS, TANTO DE LA ZONA DE CARRITO DE COMPRAS, COMO DEL DETALLE DE LA CESTA
    //if ( document.getElementById('zona_lista_productos_cesta')    != null ) { Tomar_Carrito_Compras(); } 
    //if ( document.getElementById('zona_lista_productos_carrito')  != null ) { Tomar_Datos_Zona_Carrito(); }
}    

/*
function Tomar_Numero (lc_Numero) {
    var lc_Numero = lc_Numero.replace(/[^0-9]/gi,'');
    if (isNaN(parseFloat(lc_Numero))) { return 0 } else { return parseFloat(lc_Numero); }
}
*/

/*
function Tomar_Numero (lc_Numero) {
  if ( String(lc_Numero) != 'undefined' ) {
        var lc_Numero = lc_Numero.replace(/[^0-9]/gi,'').replace(/^0/,'');
        if (isNaN(parseInt(lc_Numero))) { return 0; } else { return parseInt(lc_Numero); }
  } else {
      //alert("caller is " + arguments.callee.caller.toString());
      return 0;
  }
}
*/

function Tomar_Datos_Zona_Carrito() {
    // INICIALIZAR EL ARREGLO ASOCIATIVO DE PRODUCTOS
    //if ( document.getElementById('zona_lista_productos_cesta') == null ) { ga_Arreglo_Cesta = new Array() }
    
    var la_Arreglo = new Array();
    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'accion'           , 'Tomar_Cesta_Carrito_Compras');
    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'usuario_carrito'  , gc_Usuario_Tienda );
    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'cliente_site'     , gc_Custom_Cliente );
    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'bd'               , gc_Datos );    
    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'dominio'          , gc_Weblider );
    //la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'usuario_anonimo'  , gc_Usuario_Anonimo );      
    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'micro2'           , gc_Custom_Cliente );
    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'decimales'        , gc_Decimales_Moneda );

    Enviar_Objeto_Servidor( gc_Root + 'aplicaciones/modulo_pedidos/Cgi/Almacenamiento.php',la_Arreglo);                
}

// FUNCIÓN QUE ES EJECUTADA UNA VEZ QUE SE REALIZA LA CARGA DE LOS DATOS
function Carrito_Compras_Carga( li_Registros ) {
    //Cufon.replace('#cesta_total_cesta, .carro_form, .carro_form .precio, .carro_form .precio span, .carro .pesos, .carrito_compras h3, .carrito_compras .cantidad, .carrito_compras .precio, button.button_agregar, .carro_form .detalles,.carro_form .cantidad, .carro_form .lbl_stock, .derecha .botones a');

    // PROCESO MOVIL
    if ( typeof gb_Movil != "undefined" ) { Carrito_Activado(); }

    $('#boton_ver_pendientes').click(function() {
        if ( typeof gb_Movil == "undefined" ) {
            top.location.href = 'http://' + gc_Dominio_Site + 'index.php?sistema=1&opcion=0&v_pedidos=1&ver=1&micro2=' + gc_Custom_Cliente;
        } else {
            Ver_Pagos_Pendientes();
        }
    });
    
    // ACTUALIZAR LOS PRODUCTOS CARGADOS EN LA CESTA Y ASÍ EVITAR DUPLICAR REGISTROS, SINO ACTUALIZAR AL MOMENTO DE ADICIONAR
    if ( li_Registros > 0 ) {
        // ASIGNAR EL EVENTO MOUSEOVER
        Efecto_Cesta_Over();
            
        ga_Arreglo_Productos_Carrito = new Array();
        // ALMACENAR LOS ID'S DE LOS PRODUCTOS DE LA CESTA
        //$('.imagen_cesta').each(function(index) { ga_Arreglo_Productos_Carrito[ga_Arreglo_Productos_Carrito.length] = $(this).attr('id'); });

        // ALMACENAR LOS ID'S CON SUS ATRIBUTOS DE LOS PRODUCTOS DE LA CESTA
        $('.imagen_cesta').each(function(index) { ga_Arreglo_Productos_Carrito[ga_Arreglo_Productos_Carrito.length] = $(this).attr('rel'); });

        // OCULTAR LA ZONA DE DETALLE PEDIDO        
        //if ( gc_Usuario_Anonimo == '' ) { $('#ver_detalle_pedido').hide(); }
        
        // SI NO EXISTE LA LISTA DE PRODUCTOS, PRESENTAR, DE LO CONTRARIO OCULTAR
        //if ( document.getElementById('zona_lista_productos_cesta') != null ) { $('#lista_carrito').hide(); }
        
        Efecto_Logo_Over();       
    }

    // SI EXISTE LA ZONA DE NOTIFICACIÓN, ACTUALIZARLA
    if ( document.getElementById('notifica_carrito') != null ) {
        if ( li_Registros > 0 ) {
            $('#notifica_carrito').show(); 
            Asignar_Valor( 'notifica_carrito', $('#cesta_numero_articulos').text() );
            document.getElementById('notifica_carrito').scrollIntoView();
        } else {
            $('#notifica_carrito').hide();
        }
    }       
}

function Efecto_Logo_Over() {
/*
    $('#imagen_logo_carrito').mouseover( function(e) {
        //alert( $('#lista_carrito').css('display') );
        if ( $('#lista_carrito').css('display') == 'none' ) { $('#lista_carrito').slideToggle('slow'); }
    });
*/

/*    
    $('#zona_lista_productos_carrito').mouseover( function(e) {
        if ( $('#lista_carrito').css('display') == 'none' ) { $('#lista_carrito').slideToggle('slow'); }
    });
    
    $('#zona_lista_productos_carrito').mouseout( function(e) {
        if ( $('#lista_carrito').css('display') == 'block' ) { $('#lista_carrito').slideToggle('slow'); }
    });
*/

    $('#zona_logo_carrito').click( function(event) {
        if ( typeof gb_Version_Carrito != 'undefined' ) {
            // CESTA REDUCIDA
            showLoading();
            
            /************************************
            //TRAER EL DETALE DEL PEDIDO
            ************************************/
            var lc_Query_String = window.location.search;
            //var li_Recarga      = lc_Query_String.search(/sistema\=1/i);
            var li_Recarga      = lc_Query_String.search(/opcion\=4/i);
            if ( li_Recarga != -1 ) {
                top.location.reload();
            } else {
                top.location.href = "http://" + gc_Weblider + "index.php?sistema=1&opcion=4&ver=1&micro2=" + gc_Custom_Cliente + "#ancla";
            }
            /************************************
            //TRAER EL DETALE DEL PEDIDO
            ************************************/
        } else {
            $('#lista_carrito').slideToggle('slow');
        }
    });

}

/*
function Adicionar_Cesta( lc_Id_Producto ) {
    var la_Arreglo = new Array();
    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'accion' , 'Almacenar_Registro');
    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'bd'     , gc_Datos );    
    
    // VALIDAR EL INGRESO DE LA CESTA
    var lb_Adicionar_Cesta = false;
    
    // VALIDAR SI EXISTE EL CAMPO CANTIDAD Y EL DE STOCK
    //if ( document.getElementById('stock') != null && document.getElementById('cantidad') ) {
    
    if ( document.getElementById('stock') != null && $('#validar_stock').attr('value') == 'si' && document.getElementById('cantidad') != null ) {    
        var li_Stock    = Tomar_Numero( $('#stock').attr('value') );
        var li_Cantidad = Tomar_Numero( $('#cantidad').attr('value') );

        if ( li_Stock >= li_Cantidad ) {
            lb_Adicionar_Cesta = true;
        } else {
            Mostrar_Mensaje('La cantidad no debe superar las existencias. Favor verificar.');
        }
    } else {
        lb_Adicionar_Cesta  = true;
        var li_Cantidad     = ( document.getElementById('cantidad') != null ) ? Tomar_Numero( $('#cantidad').attr('value') ) : 1;
    }

    if ( lb_Adicionar_Cesta == true ) {
        // SI EL PRODUCTO YA EXISTE EN LA CESTA, ENTONCES ACTUALIZAR LA CANTIDAD
        if ( In_Array( ga_Arreglo_Productos_Carrito, lc_Id_Producto ) == true ) {
            la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'codigo', "tabla=cesta::id=" + $('#id_cesta_producto_' + lc_Id_Producto).attr('value') + "::cantidad=" + ( Tomar_Numero( $('#cantidad_cesta_' + lc_Id_Producto ).attr('value') ) + li_Cantidad ) + "::pedido_moneda=" + gc_Id_Moneda + "::" );    
        } else {
            la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'codigo', "tabla=cesta::codigo=editar::cantidad=" + li_Cantidad + "::cliente=" + gc_Custom_Cliente + "::usuario=" + gc_Usuario_Tienda + "::idproducto=" + lc_Id_Producto + "::fecha_ingreso=" + gc_Fecha_Actual + "::pedido_moneda=" + gc_Id_Moneda + "::" );
        }
        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'ejecutar',  'Cesta_Adicionada()' );
    
        //alert( "tabla=cesta::cantidad=1::cliente=" + gc_Custom_Cliente + "::usuario=" + gc_Usuario_Tienda + "::idproducto=::" + lc_Id_Producto + "::fecha_ingreso=" + gc_Fecha_Actual );
        Enviar_Objeto_Servidor( gc_Root + 'aplicaciones/modulo_pedidos/Cgi/Almacenamiento.php',la_Arreglo);
        
        // PONER EN UNO EL CAMPO CANTIDAD
        if ( document.getElementById('stock') != null && document.getElementById('cantidad') ) { $('#cantidad').attr('value',1); }
    }                          
}
*/

function Adicionar_Cesta( lc_Id_Producto ) {
    // ANULAR EL CLICK DEL Bootstrap
    $('li.quick-cart>a').unbind();
    
    //if ( gc_Ip_Cliente == "190.0.44.238" ) { alert(lc_Id_Producto); }
    
    // VALIDAR QUE NO POSEA ATRIBUTOS POR SELECCIONAR
    var la_Atributos    = new Array();
    var la_Stock_Talla  = new Array();
    var la_Stock_Id     = new Array();

    var lb_Posee_Atributos  = ( $('.campo_atributo').length > 0  ) ? true : false;


    if ( lb_Posee_Atributos == true ) {
        // HACER UNA BÚSQUEDA Y VALIDAR LA SELECCIÓN
        var lb_Atributo = false;
        $('.campo_atributo').each(function(index) 
            {
                //INICIA ASOCIACION DE ELEMENTOS AL ARREGLO la_Atributos
                if ( $(this).prop('checked') == true )  
                { 
                    //SE DIVIDE EL VALOR DEL CAMPO ENVIADO en la plantilla el valor
                    //es enviado 70,88,Talla: XL (stock, idpregunta,atributo)
                    var valor_atributos = $(this).attr('value').split(",");

                    //alert(valor_atributos);

                        for (var i=0; i < valor_atributos.length; i++) {
                            var stock_talla = valor_atributos[0];
                            var stock_id = valor_atributos[1];
                            var val_atributo = valor_atributos[2];
                        }

                    //ASOCIA EL VALOR DE CADA ATRIBUTO nuevo array
                    la_Atributos[la_Atributos.length] = val_atributo;
                    la_Stock_Talla[la_Stock_Talla.length] = stock_talla;
                    la_Stock_Id[la_Stock_Id.length] = stock_id;


                    //ALERTA STOCK DE CADA ATRIBUTO
                    /*alert("Stock: " + stock_talla);
                    alert("Atributo: " + val_atributo);*/
                    //alert("Stockid: " + stock_id);
                }
            }
        );       
    }

//Se elije el numero de lista de atributos que se va usar para validar stock. 
// Por el momento se valida solo una forma de atributo, a este valor se puede enviar
// variable de php donde indique cual es el atributo usado para validar


var la_validacion_stock = 0; 


if (document.getElementById("validar_stock_atributos").value == 1) {

        var stock = document.getElementById("stock");
        //VALOR PARA VALIDAR STOCK POR VALOR EN EL CAMPO DE STOCK DEL ATRIBUTO
        stock.value = document.getElementById(la_Stock_Id[la_validacion_stock]).value;


}


    var la_Arreglo = new Array();
    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'accion' , 'Almacenar_Registro');
    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'bd'     , gc_Datos );    
    
    // VALIDAR EL INGRESO DE LA CESTA
    var lb_Adicionar_Cesta = false;
    
    // VALIDAR SI EXISTE EL CAMPO CANTIDAD Y EL DE STOCK
    //if ( document.getElementById('stock') != null && document.getElementById('cantidad') ) {
    
    if ( document.getElementById('stock') != null ) {    
        
        var li_Stock    = Tomar_Numero( $('input#stock').val() );
        var li_Cantidad = Tomar_Numero( $('input#cantidad').val() );
        var li_id_input = Tomar_Numero( $('input#'+la_Stock_Id[la_validacion_stock]).val() );

        //alert('input#'+la_Stock_Id[la_validacion_stock]);

        if ( li_Stock >= li_Cantidad ) {
            lb_Adicionar_Cesta = true;
            
        if (document.getElementById("validar_stock_atributos").value == 0) {
        // REDUCIR LAS UNIDADES DEL STOCK
        document.getElementById('stock').value = (li_Stock - li_Cantidad);  
        }

        if (document.getElementById("validar_stock_atributos").value == 1) {
document.getElementById(la_Stock_Id[la_validacion_stock]).value = li_id_input - li_Cantidad;  
document.getElementById('stock').value = document.getElementById(la_Stock_Id[la_validacion_stock]).value;

        }

        } else {
            //Mostrar_Mensaje('La cantidad no debe superar las existencias. Favor verificar.');
_toastr("La cantidad no debe superar las existencias. Favor verificar.","top-center","error",false);														  			
        }
    } else {
        lb_Adicionar_Cesta  = true;
        var li_Cantidad     = ( document.getElementById('cantidad') != null ) ? Tomar_Numero( $('#cantidad').attr('value') ) : 1;
        //alert(li_Cantidad);
    }

    if ( lb_Adicionar_Cesta == true ) {
    
        //alert( Tomar_Numero( $('#cantidad_cesta_' + lc_Id_Producto ).attr('value') ) );

        // SI EL PRODUCTO YA EXISTE EN LA CESTA, ENTONCES ACTUALIZAR LA CANTIDAD
        //if ( In_Array( ga_Arreglo_Productos_Carrito, lc_Id_Producto ) == true ) {
        if ( In_Array( ga_Arreglo_Productos_Carrito, lc_Id_Producto+'-'+la_Atributos.join(", ") ) == true ) {
            //alert( 'actualizar ' + lc_Id_Producto+'-'+la_Atributos.join(", ") );
            
            la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'codigo',    "tabla=cesta::id=" + $('#id_cesta_producto_' + lc_Id_Producto).attr('value') + "::cantidad=" + ( Tomar_Numero( $('#cantidad_cesta_' + lc_Id_Producto ).attr('value') ) + li_Cantidad ) + "::" );    

            //SE RESTA EL ACTUAL STOCK LAS CANTIDADES AGREGADAS A LA CESTA}
            document.getElementById('stock').value = (li_Stock - li_Cantidad);  

        } else {
            //alert('nuevo ' + lc_Id_Producto+'-'+la_Atributos.join(", ") );
            //alert('nuevo ' + lc_Id_Producto + '-' + ga_Arreglo_Productos_Carrito.join(", ") );
            
            // ADICIONAR LOS ATRIBUTOS
            if ( lb_Posee_Atributos == true ) {
                //alert('input#'+la_Stock_Id[la_validacion_stock]);
                la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'codigo',    "tabla=cesta::codigo=editar::cantidad=" + li_Cantidad + "::cliente=" + gc_Custom_Cliente + "::usuario=" + gc_Usuario_Tienda + "::idproducto=" + lc_Id_Producto + "::fecha_ingreso=" + gc_Fecha_Actual + "::id_atributo=" + la_Stock_Id[la_validacion_stock] + "::atributos=" + la_Atributos.join(", ") );
            } else {
                la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'codigo',    "tabla=cesta::codigo=editar::cantidad=" + li_Cantidad + "::cliente=" + gc_Custom_Cliente + "::usuario=" + gc_Usuario_Tienda + "::idproducto=" + lc_Id_Producto + "::fecha_ingreso=" + gc_Fecha_Actual );            
            }
        }
        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'ejecutar',  'Cesta_Adicionada()' );
    
        /********************************************
        // ENVIAR AL SERVIDOR EL USO DE ATRIBUTOS
        ********************************************/
        if ( lb_Posee_Atributos == true ) { la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'atributos',  'true' ); }
        
        //alert( "tabla=cesta::cantidad=1::cliente=" + gc_Custom_Cliente + "::usuario=" + gc_Usuario_Tienda + "::idproducto=::" + lc_Id_Producto + "::fecha_ingreso=" + gc_Fecha_Actual );
        Enviar_Objeto_Servidor( gc_Root + 'aplicaciones/modulo_pedidos/Cgi/Almacenamiento.php',la_Arreglo);
        
        // PONER EN UNO EL CAMPO CANTIDAD
        if ( document.getElementById('stock') != null && document.getElementById('cantidad') ) { $('#cantidad').attr('value',1); }
    }
}

// UNA VEZ QUE SE HA ADICIONADO UN PRODUCTO, ACTUALIZAR LA CESTA

function Cesta_Adicionada() {
    document.getElementById('zona_lista_productos_carrito').scrollIntoView();
    Tomar_Datos_Zona_Carrito();
}


function Login_Box() {
  // ACTIVAR ZONA DE REGISTRO
  $('#zona_comprador').show();
  
  // CREAR EL LIENZO
  var lo_Div_Lienzo = document.createElement('div');
  lo_Div_Lienzo.setAttribute('id','lienzo_mensaje');

  var lo_Div_Marco  = document.createElement('div');
  lo_Div_Marco.setAttribute('id','marco_mensaje');

  $('body')[0].appendChild( lo_Div_Lienzo );
  $('body')[0].appendChild( lo_Div_Marco );

  // REDIMENSIONAR EL ALTO DEL BOX
  $('#lienzo_mensaje').css('height','260px');
  $('#marco_mensaje').css({ height:'260px',position:'absolute' });
  
  $('#marco_mensaje').css('left', ( parseInt( $(window).width() ) / 2 )  - ( parseInt( $('#marco_mensaje').css('width') ) / 2 ) );
  $('#marco_mensaje').append("<div id='mensaje_pie_respuesta'>&nbsp;&nbsp;Zona de Registro&nbsp;</div>");
  
  /***************************************************************************  
  **             TODOS LOS ELEMENTOS DEBEN SER ADICIONADOS                  **
  ***************************************************************************/
  lo_Div_Marco.appendChild( $('#zona_comprador')[0] );

  // HACER QUE EL CERRADO DEVUELVA LA VENTANA
  $('#mensaje_pie_respuesta').click(function(event) { 
      event.preventDefault(); 
      // DEVOLVER LOS OBJETOS
      $('body')[0].appendChild( $('#zona_comprador')[0] );
      // OCULTAR EL CONTENEDOR
      $('#zona_comprador').hide();

      $('#lienzo_mensaje').remove(); 
      $('#marco_mensaje').remove();
  });

  $('#lienzo_mensaje').css('width',$(document).width());
  $('#lienzo_mensaje').css('height',$(document).height());
  $('#lienzo_mensaje').css({ opacity: 0.5 });
  
  $('#marco_mensaje')[0].scrollIntoView();    
}


// UNA VEZ QUE SE HA ADICIONADO UN PRODUCTO, ACTUALIZAR LA CESTA
function Cesta_Adicionada() {
    //document.getElementById('zona_lista_productos_carrito').scrollIntoView();
    //Tomar_Datos_Zona_Carrito();  
    if ( typeof gb_Cesta != "undefined" ) {
        Tomar_Datos_Zona_Carrito();
    } else {
        // CARGAR EL CARRITO EN COMPRA AUTOMATICAMENTE
        top.location.href = 'https://' + gc_Weblider + '?cart=true';   
    }
}

// Recorer las tab
function activaTab(tab){
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
}

function Finalizar_Proceso_Compra() {
    // VALIDAR QUE SELECCIONE TÉRMINOS Y CONDICIONES
    if ( document.getElementById('terminos').checked == true ) {
        if ( document.getElementById('medio_de_pago').value  ) {
            // VALIDAR LA EXISTENCIA DE LA CÉDULA
            if ( document.getElementById('cedula_proceso_pedido').value ) {
                // VALIDACION DE COMPRA POR CANTIDAD DE UNIDADES EN CESTA PARA LA COMPRA, SE DEBE CAMBIAR EL 1 POR LA CANTIDAD QUE SE DESEE
                if ( document.getElementById('fc_Cantidad_Productos').value.replace(/\s/) > 0 ) {  
                    Almacenar_Pedido();
                    // VALIDAR MENSAJE DE COMPRA
                 
    }   else {
            _toastr("Para realizar sus pedidos, la cantidad debe ser superior a 2 unidades.","top-center","error",false);
            document.getElementById('qty').style.background = "#FFCC66";
            activaTab('step1');
        }
    }
        else {
            _toastr("Favor ingresar su número de documento de identificaci&oacute;n.","top-center","error",false);
            document.getElementById('cedula_proceso_pedido').style.background = "#FFCC66";
            //$('#seccion_direccion_pedido').show();
            activaTab('step2');
        }
    }
        else {
            //Mostrar_Mensaje('no existe una plataforma de pago seleccionada. Favor verificar.');
			_toastr("No existe un medio de pago seleccionado. Favor verificar.","top-center","error",false);
            document.getElementById('medio_de_pago').style.background = "#FFCC66";
            $('#seccion_medio_pago').show();
        }
    } else {
//        Mostrar_Mensaje('Debe aceptar los Términos y Condiciones  del Servicio. Favor verificar.');
			_toastr("Debe aceptar los Términos y Condiciones  del Servicio. Favor verificar.","top-center","error",false);
    }
} // Finlizar Proceso


function Almacenar_Pedido() {

    var li_SubTotal             = Tomar_Numero_Decimales( $('#contenedor_totales_pedido .subtotal_factura').html() );
    var li_Total_General_Pedido = Tomar_Numero_Decimales( $('#contenedor_totales_pedido .total_factura').html() );
    //var li_Valor_IVA            = 0;
    var li_Valor_IVA            = Tomar_Numero_Decimales( $('#contenedor_totales_pedido .fi_Valor_IVA').html() );	
    //alert(li_Valor_IVA);
    var li_Total_Flete          = Tomar_Numero_Decimales( $('#contenedor_totales_pedido .flete_factura').html() );
    var li_Valor_Real_Flete     = (li_Total_Flete * 0.19);
    var li_Valor_IVA_Flete      = li_Total_Flete - li_Valor_Real_Flete; 
    var li_Base_Gravable        = li_SubTotal;
    var li_Cantidad_Productos   = $('#contenedor_proceso_pedido .cesta').length;
    var li_Descuento_Forma_Pago = Tomar_Numero_Decimales( $('#contenedor_totales_pedido .descuento').html() );
    var li_Descuento_Factura    = Tomar_Numero_Decimales( $('#contenedor_totales_pedido .descuento_factura').html() );
    
    // VARIABLE PARA DETERMINAR EL ENVÍO
    var lb_Enviar   = true;
    
    var la_Comentario = new Array();
    if ( document.getElementById('fc_Descuento_Cupon').value != "" ) { la_Comentario[la_Comentario.length] = "Cupón de descuento [" + document.getElementById('fc_Numero_Cupon').value + " - " +  document.getElementById('fc_Descuento_Cupon').value + "%]"; }
    la_Comentario[la_Comentario.length] = "Medio de Pago [" + Tomar_Texto_Select('medio_de_pago') + " - Descuento " + document.getElementById('fc_Porcentaje_Descuento_Medio_Pago').value + "% ]";
    la_Comentario[la_Comentario.length] = "Dirección de entrega [" + document.getElementById('direccion_proceso_pedido').value + " - " + Tomar_Texto_Select('ciudad_proceso_pedido') + " - " + document.getElementById('pais_proceso_pedido').value + "]";
    
    var la_Arreglo  = new Array();
        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('usuario_pedido'         , gc_Usuario_Tienda );              
        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('codigo_pedido'          , '' );
        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('cliente_pedido'         , gc_Custom_Cliente );
        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('forma_pago'             , Tomar_Texto_Select('medio_de_pago') );
        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('forma_de_pago'          , document.getElementById('fc_Medio_Pago').value );
        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('cantidad_productos'     , li_Cantidad_Productos );
        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('comentario'             , la_Comentario.join(' - ') + '<br>' + '<h2>Mensaje de Compra </h2>' +  document.getElementById('mensaje_pedido').value );
        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('valor_total'            , li_Total_General_Pedido );              
        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('valor_flete'            , li_Valor_Real_Flete );
        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('valor_iva_flete'        , li_Valor_IVA_Flete );
        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('iva_producto'           , li_Valor_IVA );              
        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('descuento'              , li_Descuento_Factura );              
        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('subtotal'               , li_SubTotal );
        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('direccion_entrega'      , document.getElementById('direccion_proceso_pedido').value );
        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('nomenclatura_direccion' , document.getElementById('direccion_proceso_pedido').value );
        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('ciudad_entrega'         , Tomar_Texto_Select('ciudad_proceso_pedido') );
        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('id_ciudad_entrega'      , document.getElementById('ciudad_proceso_pedido').value );       
        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('pais_entrega'           , document.getElementById('pais_proceso_pedido').value );
        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('telefono_entrega'       , document.getElementById('telefono_proceso_pedido').value );
            
    // D E S C U E N T O 
        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('pedido_descuento'       , 1 );
        // A D I C I O N A R   L A   B A S E   D E   D A T O S
    if ( String(gc_Datos) != 'undefined' && gc_Datos != '' ) { la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('bd', gc_Datos ); }
    // ADICIONAR LA PLATAFORMA DE PAGO
    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('plataforma_pago'    , gc_Plataforma_Pago );
    // ADICIONAR EL CLIENTE
    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('micro2'             , gc_Custom_Cliente );
    // ADICIONAR LA ABREVIATURA DE MONEDA
    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('moneda'             , gc_Moneda );
    // ADICIONAR EL ID DE LA MONEDA CON LA QUE SE REALIZA LA TRANSACCIÓN
    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('id_moneda'          , gc_Id_Moneda );

    /************************************
    *  CASO ESPECIAL PARA CREDIBANCO
    ***********************************/
    if ( gc_Plataforma_Pago == 5 ) {
        if ( document.getElementById('fc_Clave_Plataforma_1').value != "" && document.getElementById('fc_Clave_Plataforma_2').value != "" ) {
            la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'commerceId' , document.getElementById('fc_Clave_Plataforma_1').value );
            la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'terminal'   , document.getElementById('fc_Clave_Plataforma_2').value );
        } else {
            lb_Enviar = false;
        }
    }
    /***********************************
    *  CASO ESPECIAL PARA CREDIBANCO
    ***********************************/

    //alert( li_Total_General_Pedido + ' DESC ' + lo_Objeto.valor );
    
    //alert('En mantenimiento ' + $('#comentario_pedido')[0].value + "<br><br>" + lc_Descuento_Productos + '<br>' + $('#fi_Descripcion_Descuento_Forma_Pago')[0].value );
    //Enviar_Objeto_Servidor(gc_Root + '../pedidos/ver_post.php',la_Arreglo,'_blank');
    
    if ( lb_Enviar == false ) {
        //Mostrar_Mensaje('La configuración de la plataforma de pago es incorrecta. Favor comunicar al comercio.');
		_toastr("La configuración de la plataforma de pago es incorrecta. Favor comunicar al comercio.","top-center","error",false);		
    } else {
        //alert( 'enviar' );
        Enviar_Objeto_Servidor( gc_Root + '../pedidos/pedido.php',la_Arreglo);
    }
}

function Mostrar_Mensaje_Pedido_Procesado(lc_Mensaje,lb_Error) {
    
    // ALMACENAR EL MENSAJE DE LA TRANSACCIÓN
    lo_Box_Cesta.mensaje = lc_Mensaje; 

        if ( String(lb_Error) != 'undefined') { 
           // Mostrar_Mensaje(lc_Mensaje);
		   _toastr(lc_Mensaje,"top-center","error",false);
    } else {
        // SI EXISTE UN CUPÓN Y SE UTILIZÓ, ACTUALIZAR EL ESTADO
        if ( document.getElementById('fc_Cupon_Disponible') != null && $( '#fc_Cupon_Disponible')[0].value != '' ) {
            switch ( document.getElementById('fc_Accion_Cupon').value ) {
                case 'crear'      : // CREAR EL REGISTRO DE ACTUALIZACIÓN
                                    var lc_Registro = "tabla=pedido_cupon_usuario::codigo=editar::pedido_cupon=" + document.getElementById('fc_Cupon_Disponible').value + "::usuarios=" + gc_Usuario_Tienda + "::estado_cupon=2::fecha_uso=" + $('#fc_Fecha_Cupon')[0].value + "::";
                                    Almacenar_Registro_Cupon(lc_Registro);
                                    break;
                case 'actualizar' : // CREAR EL REGISTRO DE ACTUALIZACIÓN
                                    var lc_Registro = "tabla=pedido_cupon_usuario::codigo=" + $( '#fc_Cupon_Disponible')[0].value + "::estado_cupon=2::fecha_uso=" + $('#fc_Fecha_Cupon')[0].value + "::";
                                    Almacenar_Registro_Cupon(lc_Registro);
                                    break;
                default           : Terminar_Transaccion_Plataforma(); break;            
            }
        } else {
            Terminar_Transaccion_Plataforma();
        }
        }
}

  function Almacenar_Registro_Cupon(lc_Objeto) {
        var la_Arreglo = new Array();
        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('accion'   , 'Almacenar_Registro');
        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('codigo'   , lc_Objeto);
        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('ejecutar' , 'Terminar_Transaccion_Plataforma()');
      if ( String(gc_Datos) != 'undefined' && gc_Datos != '' ) { la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('bd',  gc_Datos); }
      // ADICIONAR EL CLIENTE
      la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('micro2'   , gc_Custom_Cliente );
      
        Enviar_Objeto_Servidor( gc_Root + 'aplicaciones/modulo_pedidos/Cgi/Almacenamiento.php',la_Arreglo);
  }

  function Terminar_Transaccion_Plataforma() {
        // SI SELECCIONÓ PAGO EN LÍNEA      
        if ( Tomar_Numero ( document.getElementById('fc_Medio_Pago').value )  > 1 ) {

          if ( typeof gb_Version_Carrito != 'undefined' ) {
              // LANZAR DIRECTAMENTE A LA ZONA DE PAGO
              Enviar_Datos_Pedido();
          } else {
              lo_Box_Cesta.funcion = "Enviar_Datos_Pedido();";
              Mensaje_Transaccion_Pedido();          
          }
          
        } else {
          if ( typeof gb_Conversiones == "undefined" ) {
              lo_Box_Cesta.funcion = "Recarga();";
              //Recarga();
              Mensaje_Transaccion_Pedido();
          } else {
              top.location.replace( 'https://' + gc_Weblider + '?pedidos=true&mensaje=compra#cartContent' );
          }
        }
        //Mensaje_Transaccion_Pedido();
  }

    function Recarga() {
      top.location.replace( 'https://' + gc_Weblider + '?pedidos=true#contenedor_slider' );
    }  

    function Enviar_Datos_Pedido() {

      if ( document.getElementById('id_pedido') == null || document.getElementById('id_pedido').value == "" ) {
          //Mostrar_Mensaje('Ha ocurrido un error al momento de generar el pedido. Favor notificar.');
		  _toastr("Ha ocurrido un error al momento de generar el pedido. Favor notificar.","top-center","error",false);
      } else {
          var li_SubTotal             = Tomar_Numero_Decimales( $('#contenedor_totales_pedido .subtotal_factura').html() );
          var li_Total_General_Pedido = Tomar_Numero_Decimales( $('#contenedor_totales_pedido .total_factura').html() );
          var li_Valor_IVA            = 0;
          //var li_Valor_IVA            = Tomar_Numero_Decimales( $('#contenedor_totales_pedido .fi_Valor_IVA').html() );
          //var li_Valor_IVA            = li_Total_General_Pedido - li_Base_Gravable;
          var li_Total_Flete          = Tomar_Numero_Decimales( $('#contenedor_totales_pedido .flete_factura').html() );
          var li_Valor_Real_Flete     = (li_Total_Flete * 0.19);
          var li_Valor_IVA_Flete      = li_Total_Flete - li_Valor_Real_Flete; 
          var li_Base_Gravable        = li_SubTotal;
          var li_Cantidad_Productos   = $('#contenedor_proceso_pedido .cesta').length;
          var li_Descuento_Forma_Pago = Tomar_Numero_Decimales( $('#contenedor_totales_pedido .descuento').html() );
          var li_Descuento_Factura    = Tomar_Numero_Decimales( $('#contenedor_totales_pedido .descuento_factura').html() );
          
          // VARIABLE PARA DETERMINAR EL ENVÍO
          var lb_Enviar   = true;
          
          var la_Comentario = new Array();
          if ( document.getElementById('fc_Descuento_Cupon').value != "" ) { la_Comentario[la_Comentario.length] = "Cupón de descuento [" + document.getElementById('fc_Numero_Cupon').value + " - " +  document.getElementById('fc_Descuento_Cupon').value + "%]"; }
          la_Comentario[la_Comentario.length] = "Medio de Pago [" + Tomar_Texto_Select('medio_de_pago') + " - Descuento " + document.getElementById('fc_Porcentaje_Descuento_Medio_Pago').value + "% ]";
          la_Comentario[la_Comentario.length] = "Dirección de entrega [" + document.getElementById('direccion_proceso_pedido').value + " - " + Tomar_Texto_Select('ciudad_proceso_pedido') + " - " + document.getElementById('pais_proceso_pedido').value + "]";
    
          var la_Arreglo          = new Array();
          var lb_LLaves_Comercio  = ( In_Array( new Array('1','2','3','4','5'), gc_Plataforma_Pago ) == true && document.getElementById('fc_Clave_Plataforma_1').value == "" ) ? false : true; 
    
          //alert( document.getElementById('fc_Clave_Plataforma_1').value + ' ' + document.getElementById('fc_Clave_Plataforma_2').value );
    
          switch ( gc_Plataforma_Pago ) {
              // PLACETOPAY
              case '1'            : la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'Reference'            , document.getElementById('id_pedido').value );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'TotalAmount'          , li_Total_General_Pedido );      
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'TaxAmount'            , li_Valor_IVA );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'DevolutionBaseAmount' , li_Base_Gravable );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'ShopperID'            , document.getElementById('cedula_proceso_pedido').value );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'ShopperIDType'        , 'CC' );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'ShopperName'          , document.getElementById('nombre_comprador_formulario').value );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'ShopperEmail'         , document.getElementById('email_comprador_formulario').value );
                                    // ADICIONAR EL CLIENTE
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('micro2'             , gc_Custom_Cliente );
                                    // ENVIAR LA BASE DE DATOS PARA CONTROLAR LA CONSULTA
                                    if ( String(gc_Datos) != 'undefined' ) { la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'bd',gc_Datos ); }

                                    // Llaves
                                    var logueo = document.getElementById('fc_Clave_Plataforma_1').value;
                                    var trunk  = document.getElementById('fc_Clave_Plataforma_2').value;

                                    // Datos Compra
                                    var references   = document.getElementById('id_pedido').value;
                                    var descriptions = "Compra realizada desde Turismo Medellín";
                                    var amounts      = li_Total_General_Pedido ;
                                    var currencys    = gc_Moneda;
                                    var totals       = li_Total_General_Pedido;

                                    // Dato Usuario
                                    var names       = document.getElementById('nombre_comprador_formulario').value;
                                    var surnames    = document.getElementById('nombre_comprador_formulario').value;;
                                    var emails      = document.getElementById('email_comprador_formulario').value;
                                    var mydocuments   = document.getElementById('cedula_proceso_pedido').value;
                                    var documentTypes = 'CC';
                                    var mobiles       = document.getElementById('telefono_proceso_pedido').value;
                                    var $parametros = {
                                            "login"     : logueo,
                                            "secretkey" : trunk,
                                            "reference" : references,
                                            "description" : descriptions,
                                            "amount"    : amounts,
                                            "currency"  : currencys,
                                            "total"     : totals,
                                            "name"      : names,
                                            "surname"   : surnames,
                                            "email"     : emails,
                                            "mydocument" : mydocuments,
                                            "documentType" : documentTypes,
                                            "mobile"    : mobiles
                                    };
                                    var url =  "/demo_18" + "/pedidos/placetopay.php";
                                    $.ajax({                        
                                           type: "POST",                 
                                           url: url,                     
                                           data: $parametros, 
                                           success: function(data)             
                                           {
                                             $('#resp').html(data);               
                                           }                                          
                                       });
                                    //Enviar_Objeto_Servidor_PayPal(gc_Root + '../pagos/ptop/recibe.php',la_Arreglo,'_top');
                                    break;
           
              // PAYU                                
              case '2'            : //la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'merchantId'           , '500402' );
                                    //la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'Api_Key'              , '8s51k7ta739v3kj4l91sifgr5' );
                                    
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'merchantId'           , document.getElementById('fc_Clave_Plataforma_1').value );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'Api_Key'              , document.getElementById('fc_Clave_Plataforma_2').value );
                                    
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'referenceCode'        , $('#id_pedido').attr('value') );      
                                 //   la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'accountId'            , '512638' );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'description'          , 'Pedido' );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'amount'               , li_Total_General_Pedido );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'tax'                  , li_Valor_IVA );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'taxReturnBase'        , ( li_Valor_IVA == 0 ) ? 0 : li_Base_Gravable );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'currency'             , gc_Moneda );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'payerFullName'        , document.getElementById('nombre_comprador_formulario').value );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'buyerFullName'        , document.getElementById('nombre_comprador_formulario').value );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'payerDocument'        , document.getElementById('cedula_proceso_pedido').value );
                                    //la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'shippingAddress'      , $('#fc_Direccion_Facturacion').attr('value') );
                                    //la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'billingAddress'       , $('#fc_Direccion_Facturacion').attr('value') );
                                    
                                    //la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'billingCity'          , $('#fc_Ciudad_Facturacion').attr('value') );
                                    //la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'shippingCity'         , $('#fc_Ciudad_Facturacion').attr('value') );
                                    
                                    //la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'billingCountry'       , Tomar_Texto_Select('fc_Pais') );
                                    //la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'shippingCountry'      , Tomar_Texto_Select('fc_Pais') );
    
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'telephone'            , document.getElementById('telefono_proceso_pedido').value );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'officeTelephone'      , document.getElementById('telefono_proceso_pedido').value );                                
    
                                    //var lc_Llave  = '8s51k7ta739v3kj4l91sifgr5~500402~' + $('#id_pedido').attr('value') + '~' + li_Total_General_Pedido + '~COP';
                                    var lc_Llave  = document.getElementById('fc_Clave_Plataforma_2').value + '~' + document.getElementById('fc_Clave_Plataforma_1').value + '~' + $('#id_pedido').attr('value') + '~' + li_Total_General_Pedido + '~'+gc_Moneda;
                                                                    
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'signature'            , md5( lc_Llave ) );
                                    //la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'test'                 , 1 );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'buyerEmail'           , document.getElementById('email_comprador_formulario').value );
    
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'confirmationUrl'      , 'http://' + gc_Weblider + 'pedidos/payu_confirma.php' );                                
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'responseUrl'          , 'http://' + gc_Weblider + 'pedidos/payu_responde.php' );
    
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'extra1'               , gc_Custom_Cliente );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'extra2'               , document.getElementById('nombre_comprador_formulario').value );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'extra3'               , document.getElementById('email_comprador_formulario').value );
                                    
                                    // ENVIAR LA BASE DE DATOS PARA CONTROLAR LA CONSULTA
                                    if ( String(gc_Datos) != 'undefined' ) { la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'bd',gc_Datos ); }
    
                                    if ( lb_LLaves_Comercio == true ) {
                                        gc_Ruta_Aplicativo = 'https://checkout.payulatam.com/ppp-web-gateway-payu';
                                        //gc_Ruta_Aplicativo = 'https://stg.gatewaylap.pagosonline.net/ppp-web-gateway';

                                        Enviar_Objeto_Servidor_PayPal( gc_Ruta_Aplicativo,la_Arreglo,'_top');
                                        //Enviar_Objeto_Servidor( gc_Ruta_Aplicativo,la_Arreglo,'_blank');
                                        //Enviar_Objeto_Servidor( gc_Root + '../pedidos/ver_post.php',la_Arreglo,'_blank');
                                        //Enviar_Objeto_Servidor(gc_Root + '../pagos/ptop/recibe.php',la_Arreglo,'_top');
                                    } else {
                                        //Mostrar_Mensaje('La opción de pagos electrónicos se encuentra en mantenimiento. Favor notificar.');
		_toastr("La opción de pagos electrónicos se encuentra en mantenimiento. Favor notificar.","top-center","error",false);												
                                    }
                                    break;
                                    
              // PAYPAL                                
              case '3'            : la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'cmd'                , '_xclick' );
                                    //la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'business'           , 'contabilidad@todoventa.com' );
                                    
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'business'           , document.getElementById('fc_Clave_Plataforma_1').value );
                                    //la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'business'           , 'toalcaraz-facilitator@hotmail.com' );
                                    
                                    if ( $('#fi_Descripcion_Descuento_Forma_Pago').attr('value').indexOf('Ninguno') == -1 ) {
                                        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'item_name'      , gc_Nombre_Empresa + ' [ Pedido Nro. ' + $('#id_pedido').attr('value') + ' ].' + $('#fi_Descripcion_Descuento_Forma_Pago').attr('value') );
                                    } else {
                                        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'item_name'      , gc_Nombre_Empresa + ' [ Pedido Nro. ' + $('#id_pedido').attr('value') + '].' );
                                    }
                                    
    
                                    // ADICIONAR EL IVA
                                    if ( li_Valor_IVA == 0 ) {
                                        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'amount' , li_Total_General_Pedido );
                                    } else {
                                        li_Total_General_Pedido = Tomar_Numero_Decimales(li_Total_General_Pedido - li_Valor_IVA);
                                        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'amount' , li_Total_General_Pedido ); 
                                        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'tax' , li_Valor_IVA ); 
                                    }
    
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'quantity'           , 1 );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'currency_code'      , gc_Moneda );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'item_number'        , $('#id_pedido').attr('value') );
    
                                    
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'notify_url'       , 'https://' + gc_Weblider + 'pedidos/paypal_confirma.php' );                                
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'return'           , 'https://' + gc_Weblider + 'pedidos/paypal_responde.php' );
    
                                    // ENVIAR LA BASE DE DATOS PARA CONTROLAR LA CONSULTA
                                    if ( String(gc_Datos) != 'undefined' ) { la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'bd',gc_Datos ); }
    
                                    gc_Ruta_Aplicativo = 'https://www.paypal.com/co/cgi-bin/webscr';
                                    //gc_Ruta_Aplicativo = 'https://www.sandbox.paypal.com/cgi-bin/webscr';
                                    //gc_Ruta_Aplicativo = 'http://' + gc_Dominio + 'pedidos/ver_post.php';
                                   
                                    if ( lb_LLaves_Comercio == true ) {
                                        Enviar_Objeto_Servidor_PayPal( gc_Ruta_Aplicativo,la_Arreglo,'_top');
                                    } else {
                                        //Mostrar_Mensaje('La opción de pagos electrónicos se encuentra en mantenimiento. Favor notificar.');
		_toastr("La opción de pagos electrónicos se encuentra en mantenimiento. Favor notificar.","top-center","error",false);																						
										
                                    }
    
                                    //Enviar_Objeto_Servidor( gc_Ruta_Aplicativo,la_Arreglo,'_blank');
    
                                    //Enviar_Objeto_Servidor( 'http://' + gc_Dominio + 'pedidos/ver_post.php',la_Arreglo,'_blank');
                                    //Enviar_Objeto_Servidor( gc_Ruta_Aplicativo,la_Arreglo,'_blank');
                                    //Enviar_Objeto_Servidor(gc_Ruta_Aplicativo + '../pagos/ptop/recibe.php',la_Arreglo,'_top');
                                    break;
    
              // PAGOSONLINE                                
              case '4'            : //la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'usuarioId'                , '27524' );
                                    //la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'Api_Key'                  , '11d2a81a079' );
    
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'usuarioId'  , document.getElementById('fc_Clave_Plataforma_1').value );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'Api_Key'    , document.getElementById('fc_Clave_Plataforma_2').value );
    
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'refVenta'                 , $('#id_pedido').attr('value') );      
                                    //la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'descripcion'              , $('#comentario_pedido').attr('value') + "<br><br>" + $('#fi_Descripcion_Descuento_Forma_Pago').attr('value') );
                                    if ( $('#fi_Descripcion_Descuento_Forma_Pago').attr('value').indexOf('Ninguno') == -1 ) {
                                        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'descripcion'          , gc_Nombre_Empresa + ' [ Pedido Nro. ' + $('#id_pedido').attr('value') + ' ].' + $('#fi_Descripcion_Descuento_Forma_Pago').attr('value') );
                                    } else {
                                        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'descripcion'          , gc_Nombre_Empresa + ' [ Pedido Nro. ' + $('#id_pedido').attr('value') + '].' );
                                    }
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'valor'                    , li_Total_General_Pedido );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'tax'                      , li_Valor_IVA );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'taxReturnBase'            , ( li_Valor_IVA > 0 ) ? li_Base_Gravable : 0 );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'moneda'                   , gc_Moneda );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'lng'                      , 'es' );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'nombreComprador'          , $('#fc_Nombre_Cliente').attr('value') );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'documentoIdentificacion'  , $('#fc_Cedula_Cliente').attr('value') );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'telefonoMovil'            , $('#telefono').attr('value') );
    
                                    //var lc_Llave  = '11d2a81a079~27524~' + $('#id_pedido').attr('value') + '~' + li_Total_General_Pedido + '~COP';
                                    var lc_Llave  = document.getElementById('fc_Clave_Plataforma_2').value + '~' + document.getElementById('fc_Clave_Plataforma_1').value + '~' + $('#id_pedido').attr('value') + '~' + li_Total_General_Pedido + '~' + gc_Moneda;
                                    
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'firma'            , md5( lc_Llave ) );
                                    //la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'prueba'           , 1 );  
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'emailComprador'   , $('#fc_Email_Cliente').attr('value') );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'direccionEnvio'   , $('#fc_Direccion_Facturacion').attr('value') );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'direccionCobro'   , $('#fc_Direccion_Facturacion').attr('value') );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'ciudadEnvio'      , $('#fc_Ciudad_Facturacion').attr('value') );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'paisEnvio'        , 'CO' );
    
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'numeroCliente'    , gc_Id_Comprador );
                                    
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'url_confirmacion' , 'http://' + gc_Weblider + 'pedidos/pagosonline_confirma.php' );                                
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'url_respuesta'    , 'http://' + gc_Weblider + 'pedidos/pagosonline_responde.php' );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'extra1'           , gc_Custom_Cliente );
    
                                    // ENVIAR LA BASE DE DATOS PARA CONTROLAR LA CONSULTA
                                    if ( String(gc_Datos) != 'undefined' ) { la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'bd',gc_Datos ); }
    
                                    gc_Ruta_Aplicativo = 'https://gateway.pagosonline.net/apps/gateway/index.html';
    
                                    if ( lb_LLaves_Comercio == true ) {
                                        Enviar_Objeto_Servidor_PayPal( gc_Ruta_Aplicativo,la_Arreglo,'_top');
                                    } else {
                       //Mostrar_Mensaje('La opción de pagos electrónicos se encuentra en mantenimiento. Favor notificar.');
		_toastr("La opción de pagos electrónicos se encuentra en mantenimiento. Favor notificar.","top-center","error",false);																						
                                    }
    
                                    //Enviar_Objeto_Servidor( gc_Ruta_Aplicativo,la_Arreglo,'_blank');
                                    //Enviar_Objeto_Servidor( gc_Ruta_Aplicativo + '../pedidos/ver_post.php',la_Arreglo,'_blank');
                                    //Enviar_Objeto_Servidor(gc_Ruta_Aplicativo + '../pagos/ptop/recibe.php',la_Arreglo,'_top');
                                    
                                        console.log(` ${a[i][j]}`);
                                    break;  
                                    
              // CREDIBANCO                                
              case '5'            : if ( document.getElementById('fc_XMLREQ').value != 'false' && document.getElementById('fc_XMLREQ').value != '' ) { 
                                        //la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'acquirerId'         , document.getElementById('fc_Clave_Plataforma_1').value );
                                        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'IDACQUIRER'         , 1 );
                                        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'IDCOMMERCE'         , document.getElementById('fc_Clave_Plataforma_1').value );
                                        /*
                                        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'purchaseTerminalCode'     , document.getElementById('fc_Clave_Plataforma_2').value );
                                        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'purchaseOperationNumber'  , document.getElementById('id_pedido').value );
                                        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'fingerprint'              , document.getElementById('id_pedido').value );
                                        
                                        if ( $('#fi_Descripcion_Descuento_Forma_Pago').attr('value').indexOf('Ninguno') == -1 ) {
                                            la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'additionalObservations'   , gc_Nombre_Empresa + ' [ Pedido Nro. ' + $('#id_pedido').attr('value') + ' ].' + $('#fi_Descripcion_Descuento_Forma_Pago').attr('value') );
                                        } else {
                                            la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'additionalObservations'   , gc_Nombre_Empresa + ' [ Pedido Nro. ' + $('#id_pedido').attr('value') + '].' );
                                        }
        
                                        // ADICIONAR EL IVA
                                        if ( li_Valor_IVA == 0 ) {
                                            la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'purchaseAmount'     , (li_Total_General_Pedido * 100) );
                                        } else {
                                            li_Total_General_Pedido = Tomar_Numero_Decimales(li_Total_General_Pedido - li_Valor_IVA);
                                            la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'purchaseAmount'     , (li_Total_General_Pedido * 100) ); 
                                            la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'purchaseIva'        , (li_Valor_IVA * 100) ); 
                                        }
                                        
                                        // http://es.wikipedia.org/wiki/ISO_3166-1
                                        switch (gc_Moneda) {
                                            case 'COP'  : la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'purchaseCurrencyCode', 170 ); break;
                                            case 'USD'  : la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'purchaseCurrencyCode', 840 ); break;
                                            case 'PER'  : la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'purchaseCurrencyCode', 604 ); break;
                                            case 'ARG'  : la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'purchaseCurrencyCode', 032 ); break;
                                            default     : la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'purchaseCurrencyCode', 170 ); break;
                                        }
                                        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'purchasePlanId'           , '01' );
                                        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'purchaseQuotaId'          , '001' );
        
                                        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'purchaseLanguage'         , 'SP' );
                                        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'billingFirstName'         , document.getElementById('nombre').value );
                                        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'billingLastName'          , document.getElementById('apellido1').value );
                                        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'billingCountry'           , 'CO' );
                                        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'billingCity'              , $('#fc_Ciudad_Facturacion').attr('value') );
                                        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'billingAddress'           , $('#fc_Direccion_Facturacion').attr('value') );
                                        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'billingPhoneNumber'       , $('#telefono').attr('value') );
                                        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'billingCelPhoneNumber'    , $('#telefono').attr('value') );
                                        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'billingGender'          , 'M' );
                                        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'billingEmail'             , $('#fc_Email_Cliente').attr('value') );
                                        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'transactionTrace'         , 'BC' );
                                        */
                                        
                                        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'XMLREQ'                   , document.getElementById('fc_XMLREQ').value );
                                        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'DIGITALSIGN'              , document.getElementById('fc_DIGITALSIGN').value );
                                        la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'SESSIONKEY'               , document.getElementById('fc_SESSIONKEY').value );
        
                                        // ENVIAR LA BASE DE DATOS PARA CONTROLAR LA CONSULTA
                                        if ( String(gc_Datos) != 'undefined' ) { la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'bd',gc_Datos ); }
        
                                        gc_Ruta_Aplicativo = 'http://172.19.200.82:9080/vpos2/MM/transactionStart20.do';
                                        //gc_Ruta_Aplicativo = 'http://' + gc_Dominio + 'pedidos/ver_post.php';
                                       
                                        if ( lb_LLaves_Comercio == true ) {
                                            Enviar_Objeto_Servidor_PayPal( gc_Ruta_Aplicativo,la_Arreglo,'_top');
                                        } else {
                                           // Mostrar_Mensaje('La opción de pagos electrónicos se encuentra en mantenimiento. Favor notificar.');
		_toastr("La opción de pagos electrónicos se encuentra en mantenimiento. Favor notificar.","top-center","error",false);																						   
                                        }
                                    } else {
             // Mostrar_Mensaje('La opción de pagos electrónicos (CREDIBANCO) se encuentra en mantenimiento. Favor notificar.');
				_toastr("La opción de pagos electrónicos (CREDIBANCO) se encuentra en mantenimiento. Favor notificar.","top-center","error",false);												
                                    }
                                    break;
    
              default             : la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'Reference'            , $('#id_pedido').attr('value') );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'TotalAmount'          , li_Total_General_Pedido );      
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'TaxAmount'            , li_Valor_IVA );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'DevolutionBaseAmount' , li_Base_Gravable );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'ShopperID'            , $('#fc_Cedula_Cliente').attr('value') );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'ShopperIDType'        , 'CC' );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'ShopperName'          , $('#fc_Nombre_Cliente').attr('value') );
                                    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'ShopperEmail'         , $('#fc_Email_Cliente').attr('value') );
                                    
                                    Enviar_Objeto_Servidor( gc_Root + '../pedidos/ver_post.php',la_Arreglo,'_blank');
                                    //Enviar_Objeto_Servidor(gc_Root + '../pagos/ptop/recibe.php',la_Arreglo,'_top');
                                    break;
          }
                
          //var lo_Nueva_Ventana = window.open("","PtoP","scrollbars=yes,resizable=no,width=600,height=650");
          //lo_Nueva_Ventana.focus();
          
          //Enviar_Objeto_Servidor(gc_Root + '../pagos/ptop/recibe.php',la_Arreglo,'_top');
          //Enviar_Objeto_Servidor('http://www.todoventas.com.co/pagos/ptop/recibe.php',la_Arreglo,'PtoP');
          //Enviar_Objeto_Servidor('http://www.todoventas.com.co/pagos/ptop/recibe.php',la_Arreglo,'_blank');
          //Enviar_Objeto_Servidor('http://www.todoventas.com.co/pagos/ptop/recibe.php',la_Arreglo,'Frame_PlacetoPay'); 
          //Enviar_Objeto_Servidor('http://www.todoventas.com.co/pagos/ptop/ver_post.php',la_Arreglo);
      }
    }
    
    function Recalcular_Cesta( lo_Objeto, lc_Id_Contenedor, lc_Id_Cesta ) {
      
      var li_Precio_Producto  = Tomar_Numero_Decimales(lo_Objeto.getAttribute('data-precio'));
      var li_Cantidad         = Tomar_Numero( lo_Objeto.value );
      var li_Stock            = Tomar_Numero( lo_Objeto.getAttribute('stock') );
      var lc_Validar_Stock    = lo_Objeto.getAttribute('data-validar-stock');

      var lb_Ejecutar = false;
      
      if ( lc_Validar_Stock == "si" ) {
          if ( li_Cantidad <= li_Stock ) { lb_Ejecutar = true; }
      } else {
          lb_Ejecutar = true;
      }
      
      if ( lb_Ejecutar == "false" ) {
//          Mostrar_Mensaje("El número de unidades supera el stock. Favor verificar.");
_toastr("El número de unidades supera el stock. Favor verificar.","top-center","error",false);														  
          lo_Objeto.value = li_Stock;
      } else {
          //var lo_Total            = li_Precio_Producto * Tomar_Numero( lo_Objeto.value );
          // ACTUALIZAR EL VALOR
          //$('#' + lc_Id_Contenedor + ' .total_price span').html( Formatear_Numero(lo_Total) );
      
          showLoading();
          
            var la_Arreglo = new Array();
            la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('accion'   , 'Almacenar_Registro');
            la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('codigo'   , "tabla=cesta::id=" + lc_Id_Cesta + "::cantidad=" + li_Cantidad + "::" );
            la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('ejecutar' , 'Reload()');
          //if ( String(gc_Datos) != 'undefined' && gc_Datos != '' ) { la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('bd',  gc_Datos); }
          // ADICIONAR EL CLIENTE
          la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('micro2'   , gc_Custom_Cliente );
          
            Enviar_Objeto_Servidor( gc_Root + 'aplicaciones/modulo_pedidos/Cgi/Almacenamiento.php',la_Arreglo);
      }      
     // alert(gc_Custom_Cliente);
  }

  function Reload() {
      top.location.reload();
  }

  function Validar_Cupon() {
      var la_Arreglo = new Array();
      la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('formulario',  'validar_cupon');
      la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('codigo',      gc_Usuario_Tienda + '|' + document.getElementById('fc_Numero_Cupon').value );
      la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('no_existe',   'Cupon_No_Valido()');
      la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('ejecutar',    'Cupon_Valido()');
      // ENVIAR LA BASE DE DATOS PARA CONTROLAR LA CONSULTA
      if ( String(gc_Datos) != 'undefined' ) { la_Arreglo[la_Arreglo.length] = new Objeto_Servidor( 'bd',gc_Datos ); }
  
      //Enviar_Objeto_Servidor(gc_Root + 'php/Traer_Detalle.php',la_Arreglo);
      Enviar_Objeto_Servidor(gc_Root + 'aplicaciones/cupon/Validar_Cupon.php',la_Arreglo);
  }
  
  function Cupon_No_Valido() {
//      Mostrar_Mensaje( 'El cupón ingresado no es correcto o ya ha caducado. Favor verificar.' );
_toastr("El cupón ingresado no es correcto o ya ha caducado. Favor verificar.","top-center","error",false);														  
      //Asignar_Valor('Mensaje_Validacion_Cupon','El cupón ingresado no es correcto o ya ha caducado. Favor verificar.');
      Asignar_Valor('fc_Cupon_Disponible|fc_Descuento_Cupon','');    
  }
        
  function Cupon_Valido() {
//      Mostrar_Mensaje( '¡ Felicitaciones !, con este cupón, obtienes un descuento de ' + document.getElementById('fc_Descuento_Cupon').value + '%.' );
_toastr('¡ Felicitaciones !, con este cupón, obtienes un descuento de ' + document.getElementById('fc_Descuento_Cupon').value + '%.',"top-center","success",false);														  
      // CALCULAR TOTALES
      Calcular_Total_Factura();
  }

  function Calcular_Descuento_Pago() {
      // TOMAR EL SUBTOTAL SIN DESCUENTO
      var li_SubTotal   = Tomar_Numero_Decimales( $('#contenedor_totales_pedido .subtotal_factura').html() ) ;
        
      var la_Medio_Descuento = document.getElementById('medio_de_pago').value.split('|');
      // ASIGNAR EL MEDIO DE PAGO
      document.getElementById('fc_Medio_Pago').value = la_Medio_Descuento[0]; 
      // ASIGNAR EL PORCENTAJE DESCUENTO
      document.getElementById('fc_Porcentaje_Descuento_Medio_Pago').value = Tomar_Numero(la_Medio_Descuento[1]);
      // ASIGNAR EL VALOR DEL DESCUENTO
      document.getElementById('fc_Descuento_Medio_Pago').value = li_SubTotal * ( Tomar_Numero(la_Medio_Descuento[1]) / 100 );

      Calcular_Total_Factura();
  }
    
  function Calcular_Flete() {
      $.post( gc_Root + 'php/validar_flete.php' ,  { ciudad:document.getElementById('ciudad_proceso_pedido').value },
          function(data) {
              // OCULTAR CORTINA
              eval(data);
              // CALCULAR TOTALES
              Calcular_Total_Factura();
          }
      );
  } 
    
  function Calcular_Total_Factura () {
      // RECALCULAR TOTALES
      var li_Cantidad_Productos     = Tomar_Numero(document.getElementById('fc_Cantidad_Productos').value);
        
      var li_Valor_Flete            = Tomar_Numero_Decimales( document.getElementById('fc_Flete_Ciudad').value );
      var li_Valor_Adicional_Flete  = Tomar_Numero_Decimales( document.getElementById('fc_Flete_Adicional_Ciudad').value );


      var li_Total_Flete            = ( li_Valor_Flete + ( li_Valor_Adicional_Flete * ( li_Cantidad_Productos - 1 ) ) );
      
      var li_Descuento_Medio_Pago   = Tomar_Numero( document.getElementById('fc_Porcentaje_Descuento_Medio_Pago').value );
      var li_Descuento_Cupon        = Tomar_Numero( document.getElementById('fc_Descuento_Cupon').value );
      
      // TOMAR EL SUBTOTAL SIN DESCUENTO
      var li_SubTotal   = Tomar_Numero_Decimales( $('#contenedor_totales_pedido .subtotal_factura').html() ) ;

      // CALCULAR EL DESCUENTO DEL CUPÓN, SOBRE EL SUBTOTAL
      if (gc_Moneda == 'USD') {
      var li_Descuento  = (li_SubTotal * ( ( li_Descuento_Medio_Pago + li_Descuento_Cupon ) / 100 )).toFixed(2);
        } else {  
            var li_Descuento  = Math.round(li_SubTotal * ( ( li_Descuento_Medio_Pago + li_Descuento_Cupon ) / 100 ));
            //alert(li_Descuento);
        }
      
      // ASIGNAR DESCUENTOS
      if ( ( li_Descuento_Medio_Pago + li_Descuento_Cupon ) > 0 ) {
          $('#contenedor_totales_pedido .porcentaje_descuento_factura').html( '(-' + ( li_Descuento_Medio_Pago + li_Descuento_Cupon ) + '%)' );
          $('#contenedor_totales_pedido .descuento_factura').html( Formatear_Numero( li_Descuento ) );
      } else {
          $('#contenedor_totales_pedido .porcentaje_descuento_factura').html( '(0%)' );
          $('#contenedor_totales_pedido .descuento_factura').html( 0 );
      }

//alert(gc_No_Cobro);
//fc_Flete_Ciudad
      // ASIGNAR EL FLETE
if (li_SubTotal  >= gc_No_Cobro && gc_Moneda == 'COP') {
    $('#contenedor_totales_pedido .total_factura').html(Formatear_Numero( li_SubTotal - li_Descuento ) );
    } else{
    /*alert("No " + li_SubTotal );*/
    $('#contenedor_totales_pedido .flete_factura').html(li_Total_Flete);
    /*li_Total_Flete = 6000;*/
    $('#contenedor_totales_pedido .total_factura').html(Formatear_Numero( li_SubTotal + li_Total_Flete - li_Descuento ) );
}

//se captura el valor de los ivas
var li_ivatienda    = ( $('input#iva_tienda').val() );
$('#contenedor_totales_pedido .fi_Valor_IVA').html(Math.round( ((li_SubTotal + li_Total_Flete - li_Descuento) - (li_SubTotal + li_Total_Flete - li_Descuento) / li_ivatienda )) );


    //ASIGNAR FLETE EN USD
if (gc_Moneda == 'USD') {
$('#contenedor_totales_pedido .flete_factura').html(10);
$('#contenedor_totales_pedido .fi_Valor_IVA').html(0);
$('#contenedor_totales_pedido .total_factura').html(Formatear_Numero((li_SubTotal + li_Total_Flete - li_Descuento).toFixed(2)) );
//alert(li_Total_Flete);
}    

      // ACTUALIZAR EL OBJETO DE FACTURA
      lo_Factura.cantidad_productos = li_Cantidad_Productos;
      lo_Factura.subtotal           = li_SubTotal;
      lo_Factura.descuento          = li_Descuento;
      lo_Factura.flete              = li_Total_Flete;
      lo_Factura.total              = li_SubTotal + li_Total_Flete - li_Descuento;

  }     

function Enviar_Objeto_Servidor_PayPal(lc_PhpAction,la_Objeto,lc_Id_Frame) {
        // ENVIAR EL USUARIO COMO VARIABLE POST
        var lc_Usuario = (document.getElementById('fc_Usuario') != null) ? document.getElementById('fc_Usuario').value : '';

    var la_Salida_Servidor = new Array();
        if (lc_PhpAction != undefined) {
        la_Salida_Servidor = new Array("<form name='Formulario_Datos_" + gi_Div_Frame + "' id='Formulario_Datos' action=\""+ lc_PhpAction +"\" method=post target='_top' style='display:none;'><input type='text' name='Id_Frame' value='" + lc_Id_Frame + "'>");                   
            if (la_Objeto != undefined) {
                    // DEFINIR LOS OBJETOS
            for (var li_Objeto = 0; li_Objeto < la_Objeto.length; li_Objeto++) {
                if (typeof(la_Objeto[li_Objeto]) == 'object') {
                    var lo_Objeto = document.getElementById(la_Objeto[li_Objeto].nombre);
                    if (lo_Objeto != null) { Eliminar_Nodo(lo_Objeto) };
                    la_Salida_Servidor[la_Salida_Servidor.length] = "<input type='text' name= '" + la_Objeto[li_Objeto].nombre + "' id = '" + la_Objeto[li_Objeto].nombre + "' value='" + la_Objeto[li_Objeto].valor + "'>";
                }
                }
            }
        try { if ( gc_Datos != undefined ) { la_Salida_Servidor[la_Salida_Servidor.length] = "<input type='text' name='bd' value='" + gc_Datos + "'>"; } }
        catch (exception) { }

            //la_Salida_Servidor[la_Salida_Servidor.length] = "<input type='text' name='fc_Usuario' value='" + lc_Usuario + "'></form>";
        }

        var lo_Div = document.createElement('div');
        lo_Div.setAttribute('id','Div_Frame');
        lo_Div.setAttribute('style','display:block');
        lo_Div.innerHTML = la_Salida_Servidor.join('<br>');
        //document.getElementById('Cuerpo_Formulario').appendChild(lo_Div);
        document.getElementsByTagName('body')[0].appendChild(lo_Div);

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
    
$(document).ready(function() {
    $.ajaxSetup({
        'beforeSend' : function(xhr) {
        try{ xhr.overrideMimeType('text/html; charset=iso-8859-1'); }
        catch(e){ }
    }});    

    Tomar_Datos_Zona_Carrito();
});

