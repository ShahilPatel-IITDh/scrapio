// JavaScript Document
gc_Ejecutar_Funcion = null;      

// VARIABLE GLOBAL PARA GENERAR MÙLTIPLES FRAMES
var gi_Div_Frame      = 0;

// IDENTIFICAR LA RUTA RELATIVA DE LAS IMÁGENES
gc_Path_Imagenes	  = './coti_planes/Iconos/';

// VARIABLE PARA DETERMINAR LA CARGA DEL UPLOAD 
var gb_Recargar_Upload = false;

function Enviar_Objeto_Servidor(lc_PhpAction,la_Objeto) {
    // ENVIAR EL USUARIO COMO VARIABLE POST
    var lc_Usuario = (document.getElementById('fc_Usuario') != null) ? document.getElementById('fc_Usuario').value : '';

    var lo_Frame  = document.getElementById("Frame_" + gi_Div_Frame);
    var lo_Frame2 = document.getElementById("Formulario_Datos_" + gi_Div_Frame);
        
    if ( lo_Frame != null ) { Eliminar_Nodo(lo_Frame); }
    if ( lo_Frame2 != null ) { Eliminar_Nodo(lo_Frame2); }    
    
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
                    la_Salida_Servidor[la_Salida_Servidor.length] = "<input type='text' name= '" + la_Objeto[li_Objeto].nombre + "' id = '" + la_Objeto[li_Objeto].nombre + "' value='" + la_Objeto[li_Objeto].valor + "'>";
                }
            }
        }
        // ADICIONAR LA VARIABLE BD EN TODAS LAS CONSULTAS AL SERVIDOR
        //if ( gc_Datos != undefined ) { la_Salida_Servidor[la_Salida_Servidor.length] = "<input type='text' name='bd' value='" + gc_Datos + "'>"; }
        try { if ( gc_Datos != undefined ) { la_Salida_Servidor[la_Salida_Servidor.length] = "<input type='text' name='bd' value='" + gc_Datos + "'>"; } }
        catch (exception) { }
                
        la_Salida_Servidor[la_Salida_Servidor.length] = "<input type='text' name='fc_Usuario' value='" + lc_Usuario + "'></form>";
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


function Eliminar_Nodo(lc_IdNodo) {
    var lo_Nodo = (lc_IdNodo.nodeName) ? lc_IdNodo : document.getElementById(lc_IdNodo);
		if (lo_Nodo != null) { var lo_NodoPadre = lo_Nodo.parentNode;	lo_NodoPadre.removeChild(lo_Nodo); }
}


function Tomar_Dimension_X () {
    //return parseInt(self.document.body.offsetWidth / 2);
    if (self.innerWidth) {
        return self.innerWidth;
    } else {
        if (document.documentElement && document.documentElement.clientWidth) { // IE6 Strict
            return document.documentElement.clientWidth;

        } else {

            if (document.body.clientWidth) {

                return document.body.clientWidth;

            }

        }

    }

}



function Tomar_Dimension_Y () {
    //return parseInt(self.document.body.offsetHeight / 2);
    //return parseInt(window.innerHeight / 2);
    
    if (self.innerHeight) {
        return self.innerHeight;
    } else {
        if (document.documentElement && document.documentElement.clientHeight) { // IE6 Strict
            return document.documentElement.clientHeight;
        } else {
            if (document.body.clientHeight) {
                return document.body.clientHeight;
            }
        }
    }
}

function Asignar_Valor(lc_Id,lc_Valor) {
    // CREAR UN ARREGLO CON LOS ID
    var la_Id       = lc_Id.split('|');
    var li_Total_Id = la_Id.length;
    
    for (var li_Id=0; li_Id < li_Total_Id; li_Id++) {
        var lc_Id              = la_Id[li_Id];
        try { lc_Nombre_Objeto = document.getElementById(lc_Id).nodeName.toLowerCase(); }
        catch (exception) { lc_Nombre_Objeto = ''; }
       
        switch (lc_Nombre_Objeto) {
            case 'input'      : var lo_Objeto = document.getElementById(lc_Id);
                                switch (lo_Objeto.type) {
                                    case 'text' : case 'hidden' : case 'password' : if (lc_Valor == '0000-00-00') { lc_Valor = ''; }
                                                                  //if (Es_Numero(lc_Valor)) { lc_Valor = Formatear_Numero(lc_Valor); }
                                                                  lo_Objeto.value = lc_Valor; break;
                                    case 'checkbox' : Seleccionar_CheckBox (lc_Id+'[]',lc_Valor); break;
                                    default         : alert(lo_Objeto.type); break;
                                }
            case 'select'     : Cargar_Valor_Select(lc_Id,lc_Valor);break;
            case 'textarea'   : var lo_Objeto = document.getElementById(lc_Id);
                                lo_Objeto.value = lc_Valor; break;
            case 'img'        : var lo_Objeto = document.getElementById(lc_Id);
                                lo_Objeto.src = lc_Valor; break;
            case 'div' : case 'span' : case 'li' : case 'ul' : case 'h1' : case 'h2' : case 'h3' : 
                                //var lo_Objeto = document.getElementById(lc_Id);
                                //lo_Objeto.innerHTML = lc_Valor; 
                                $('#' + lc_Id).html( lc_Valor );
                                break;
            default           : //alert('Id ' + lc_Id+' Nodo '+lc_Nombre_Objeto);
        }
    }
}

function Cargar_Valor_Select(lc_IdObjeto,lc_Valor) {
	var lo_Objeto = (lc_IdObjeto.nodeName) ? lc_IdObjeto : document.getElementById(lc_IdObjeto);
	if (lo_Objeto != null && lo_Objeto.nodeName == 'SELECT') {
        for (var li_Opcion=0; li_Opcion < lo_Objeto.length; li_Opcion++) {
    	      if (lo_Objeto[li_Opcion].value == lc_Valor) { lo_Objeto.selectedIndex = li_Opcion; break; }
        }

	}
}

function Ocultar_Objeto(lo_Objeto) {
    if (lo_Objeto != null) {
        if (!lo_Objeto.nodeName) { 
            var la_Objetos = lo_Objeto.split('|');
            for (var li_Objeto=0; li_Objeto < la_Objetos.length; li_Objeto++) {
                var lo_Objeto = document.getElementById(la_Objetos[li_Objeto]);
                if (lo_Objeto != null) { lo_Objeto.style.display = (arguments.length > 1) ? '' : 'none'; }
            }
        } else {
            if (lo_Objeto != null) { lo_Objeto.style.display = (arguments.length > 1) ? '' : 'none'; }
        }
    }
}

function In_Array(la_Arreglo,lc_Valor) {
    var lb_Resultado = false;
    for (var li_Contador=0; li_Contador < la_Arreglo.length; li_Contador++) {
        if (la_Arreglo[li_Contador] == lc_Valor) { lb_Resultado = true; break; }
    }
    return lb_Resultado;
}

function Activar_Valor_CheckBox (lc_Id, la_Valores) {
    if (typeof(la_Valores) != 'object') { var la_Valores = la_Valores.split(','); }
		var la_NombreObjeto = document.getElementsByName(lc_Id);
		if (la_NombreObjeto.length > 0) {
        for (var li_Ciclos=0; li_Ciclos < la_NombreObjeto.length; li_Ciclos++) { 
            if (In_Array(la_Valores,la_NombreObjeto[li_Ciclos].value) == true) { la_NombreObjeto[li_Ciclos].checked = true; }
        }
    } else {
        //alert('no existen objetos');
    }
}

function Recargar_Sitio() {
    top.location.replace(top.location.href);
}

function Ampliar_Iframe (lc_Id, li_Height) {
	var lo_Iframe = document.getElementById(lc_Id);
	if (lo_Iframe != null) { lo_Iframe.style.height = (li_Height + 40) + 'px'; } else { alert(1); }
}

function Icono_Desplegar_Ocultar(lo_Objeto,lc_Id_Contenedor) {
	lo_Objeto.src = (lo_Objeto.src.indexOf('btn_presentar') != -1) ? gc_Path_Imagenes + 'btn_ocultar.gif' : gc_Path_Imagenes + 'btn_presentar.gif';
	if (lo_Objeto.src.indexOf('btn_presentar') != -1) { Ocultar_Objeto(lc_Id_Contenedor); } else { Ocultar_Objeto(lc_Id_Contenedor,false); }
	// ABRIR EL IFRAME AL TAMANO DEL CONTENIDO
	setTimeout("Ampliar_Iframe()",500);
}


function Objeto_Fecha (li_Dia,li_Mes,li_Year) {
    this.Texto = li_Year + '-' + li_Mes + '-' + li_Dia; 

    // LOS MESES VAN DEL 0 AL 11
    li_Mes = parseInt(li_Mes.replace(/^0/,'')) - 1;

    this.Fecha = new Date(li_Year,li_Mes,li_Dia);
    this.Dia   = li_Dia;
    this.Mes   = li_Mes;
    this.Year  = li_Year;
}

function Crear_Objeto_Fecha(ld_Fecha) {
    var lc_RegExp_DMY    = /([0-9]{1,2})[\/|\-]([0-9]{1,2})[\/|\-]([0-9]{4})/;
    var lc_RegExp_YMD    = /([0-9]{4})[\/|\-]([0-9]{1,2})[\/|\-]([0-9]{1,2})/;

    var la_Resultado  = lc_RegExp_DMY.exec(ld_Fecha);
    if (la_Resultado != null) {
        var lo_Objeto = new Objeto_Fecha(la_Resultado[1],la_Resultado[2],la_Resultado[3]);
    } else {
        var la_Resultado  = lc_RegExp_YMD.exec(ld_Fecha);
        if (la_Resultado != null) {
            var lo_Objeto = new Objeto_Fecha(la_Resultado[3],la_Resultado[2],la_Resultado[1]);
        } else {
            lo_Objeto = false;
        }
    }
    return lo_Objeto;
}

function Es_Fecha_Menor(ld_Fecha_Inf,ld_Fecha_Sup) {
    var lb_Resultado = false;
   
    if (ld_Fecha_Sup == 'fecha_actual') {
        var lo_Fecha  = new Date();
        var li_Dia    = (parseInt(lo_Fecha.getDate()) < 10) ? '0' + lo_Fecha.getDate() : lo_Fecha.getDate();
        var li_Mes    = (parseInt(lo_Fecha.getMonth() + 1) < 10) ? '0' + (lo_Fecha.getMonth() + 1) : (lo_Fecha.getMonth() + 1); 
        var li_Year   = lo_Fecha.getFullYear();
        ld_Fecha_Sup  = li_Year + '-' + li_Mes + '-' + li_Dia;
    }
    var lo_Fecha_Inferior = Crear_Objeto_Fecha(ld_Fecha_Inf);
    var lo_Fecha_Superior = Crear_Objeto_Fecha(ld_Fecha_Sup);
    
    if (lo_Fecha_Inferior != false && lo_Fecha_Superior != false) {
        //alert(ld_Fecha_Inf + ' ' + ld_Fecha_Sup);
        if (lo_Fecha_Inferior.Fecha < lo_Fecha_Superior.Fecha) { lb_Resultado = true; }
    }
    return lb_Resultado;
}

function Formatear_Numero(lc_Numero) {
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

function Tomar_Variable_Url ( lc_Parametro ) {
     //var regexS = lc_Parametro+"=([\-\:\x20a-zA-Z0-9]{1,})";
     var regexS = lc_Parametro+"=([^\x26]{1,})";
     var regex = new RegExp ( regexS );
     var results = regex.exec(String(window.location.href));

     if( results == null ) { return ""; } else { return results[1]; }
}



function Tomar_Objeto_Nodo (lo_Objeto,lc_Id) {
    var lo_Objeto_Tabla = lo_Objeto;
    do {
        lo_Objeto_Tabla = lo_Objeto_Tabla.parentNode;
    } while (lo_Objeto_Tabla.nodeName.toLowerCase() != lc_Id.toLowerCase() && lo_Objeto_Tabla.nodeName.toLowerCase() != 'body');
    if (lo_Objeto_Tabla.nodeName.toLowerCase() == 'body') {
        return null;
    } else {
        return lo_Objeto_Tabla;
    }
}

function Tomar_Valor_Nodo (lo_Objeto) {
    var lc_Valor_Celda  = '';
    if (lo_Objeto != null) { 
        var lc_Nodo = (lo_Objeto.nodeName) ? lo_Objeto.nodeName.toLowerCase() : '';
        switch (lc_Nodo) {
            case 'input'    : case 'textarea' : lc_Valor_Celda = lo_Objeto.value; break;
            case '#text'    : lc_Valor_Celda = lo_Objeto.nodeValue; break;
        }
    }
    return lc_Valor_Celda;
}

function Buscar_Celda_Titulo(lo_Tabla,lc_Titulo) {
    if (!lo_Tabla.nodeName) { lo_Tabla = document.getElementById(lo_Tabla); }
    var li_Celda_Objetivo = -1;

    if (lo_Tabla.rows.length > 0) {
        var li_Total_Celdas = lo_Tabla.rows[0].cells.length;
        for (li_Celda = 0; li_Celda < li_Total_Celdas; li_Celda++) {
            // VALIDAR QUE LA CELDA EXISTA
            var lb_Celda = true;
            // ELIMINAR LOS ESPACIOS EN BLANCO &nbsp;
            try { var lc_Titulo_Tabla = lo_Tabla.rows[0].cells[li_Celda].firstChild.nodeValue.replace(/\xA0/gi,'').toLowerCase(); }
            catch (exception) { lb_Celda = false; }
            
            if (lb_Celda == true) {
                // REEMPLAZAR EL _ POR ESPACIO EN BLANCO SI ES DIFERENTE DE HIDDEN
                if (lc_Titulo.indexOf('hidden') == -1 && lc_Titulo.indexOf('Hidden') == -1) { lc_Titulo = lc_Titulo.replace(/\_/gi,'\x20'); }
                // HACER QUE LA BÚSQUEDA SEA EXACTA
                lc_RegExp         = eval("/^" + lc_Titulo + "$/gi");
                var la_Resultado  = lc_RegExp.exec(lc_Titulo_Tabla.toLowerCase());
                if (la_Resultado != null) { li_Celda_Objetivo = li_Celda; break; }
            } else {
                //alert(li_Celda + ' ' + lc_Titulo + ' ' + lo_Tabla.id);
            }
            //if (lc_Titulo_Tabla.toLowerCase().indexOf(lc_Titulo.toLowerCase()) != -1) { li_Celda_Objetivo = li_Celda; break; }
        }
    }
    return li_Celda_Objetivo;
}

function Propiedades_Objeto(lo_Objeto) {
    var salida="<pre>";
    for (ciclos in lo_Objeto) {
        try { salida+=ciclos+' = '+lo_Objeto[ciclos]+'<br>'; }
        catch (exception) {}
    }
    var lo=open("","Salida","scrollbars=yes,resizable=yes,width=300,height=300");
    lo.document.write(salida+"</pre>");
    lo.document.close();
}

function AbrirVentana(URL,Nombre) {
    Opciones = 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=680,height=600'; 
    lo_Ventana = window.open(URL,Nombre);
    if (lo_Ventana == null) {
        alert('El Sistema requiere activar las ventanas emergentes. Favor verificar.');
    } else {
        lo_Ventana.moveTo(0,0);
        lo_Ventana.focus();
    }
    /*alert(20);
    Propiedades_Objeto_Html (lo_Ventana.window);*/
}

function Posicionar_Objeto_Target(lc_Id_Objeto) {
    var lo_Target = document.getElementById(lc_Id_Objeto);
    if (lo_Target != null) {
        lo_Target.style.top   = (tempY - 60) + 'px';
        lo_Target.style.left  = (tempX - 60) + 'px';
    }
}

/*
var IE = document.all?true:false;

if (!IE) document.captureEvents(Event.MOUSEMOVE)

document.onmousemove = getMouseXY;



var tempX = 0;

var tempY = 0;



function getMouseXY(e) {

    if (IE) { //para IE

        tempX = e.clientX + document.body.scrollLeft;

        tempY = e.clientY + document.body.scrollTop;

    }

    else { //para netscape

        tempX = e.pageX;

        tempY = e.pageY;

    }

    if (tempX < 0){tempX = 0;}

    if (tempY < 0){tempY = 0;}

    return true;

}
*/


function Iluminar_Fila (lo_Objeto) {
	// CAPTURAR LA FILA
	var lo_TR = Tomar_Objeto_Nodo (lo_Objeto,'tr');
	lo_TR.setAttribute((document.all ? 'className' : 'class'), 'iluminar_fila');
}

function Buscar_Nodo (lo_Nodo,lc_Nodo) {
  try { var la_Nodos  = lo_Nodo.childNodes; }
  catch (exception) { var la_Nodos= new Array(); }

  var lo_Objeto = null;  
  if (la_Nodos.length > 0) {
      var li_Total_Nodos  = la_Nodos.length;
      for (var li_Nodo=0; li_Nodo < li_Total_Nodos; li_Nodo++) {
          try { var lc_Nombre_Nodo = la_Nodos[li_Nodo].nodeName; }
          catch (exception) { var lc_Nombre_Nodo = ''; }
          if (lc_Nombre_Nodo.toLowerCase() == lc_Nodo.toLowerCase()) { lo_Objeto = la_Nodos[li_Nodo]; break; }
      }
  }
  return lo_Objeto;
}

function Formato_Fecha_Y_M_D (ld_Fecha) {
    var lc_Reg_Exp_DMY  = /([0-9]{1,2})[\/|\-]([0-9]{1,2})[\/|\-]([0-9]{4})/;
    var la_Resultado    = lc_Reg_Exp_DMY.exec(ld_Fecha);
    var lc_Fecha        = false;
    if (la_Resultado == null) {
        var lc_Reg_Exp_YMD = /([0-9]{4})[\/|\-]([0-9]{2})[\/|\-]([0-9]{2})/;
        var la_Resultado = lc_Reg_Exp_YMD.exec(ld_Fecha);
        if (la_Resultado != null) { lc_Fecha = la_Resultado[1] + '-' + la_Resultado[2] + '-' + la_Resultado[3]; }
    } else {
        lc_Fecha = la_Resultado[3] + '-' + la_Resultado[2] + '-' + la_Resultado[1];
    }

    if (lc_Fecha == '') { alert('Fecha inválida '+ld_Fecha); }
    return lc_Fecha;
}

function Mostrar_Mensaje(lc_Mensaje) { jAlert(lc_Mensaje, 'Mensaje'); }

function Ampliar_Iframe (lc_Id, li_Height) {
	var lo_Iframe = document.getElementById(lc_Id);
	if (lo_Iframe != null) { lo_Iframe.style.height = (li_Height + 40) + 'px'; } else { alert(1); }
}

function Objeto_Servidor (lc_Nombre,lc_Valor) {
    this.nombre = lc_Nombre;
    this.valor  = lc_Valor;
    return this;
}

function Tomar_Numero (lc_Numero) {
    if ( String(lc_Numero) != 'undefined' ) {
      	var lc_Numero = String(lc_Numero).replace(/[^0-9]/g,'').replace(/^0/,'');
      	if (isNaN(parseInt(lc_Numero))) { return 0; } else { return parseInt(lc_Numero); }
    } else {
        return 0;
    }
}

/*
function Cargar_Lista_Desplegable(lc_Objeto_Destino,lc_Detalle_Lista,lc_Parametro){
    var la_Arreglo = new Array();
    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('id',  lc_Detalle_Lista);
    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('objeto',  lc_Objeto_Destino);              
    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('codigo',  ( String(lc_Parametro) != 'undefined' ) ? lc_Parametro : '' );
    
    Enviar_Objeto_Servidor( gc_Root + 'php/Cargar_Select.php',la_Arreglo ); 			 
}
*/
function Cargar_Lista_Desplegable(lc_Objeto_Destino,lc_Detalle_Lista,lc_Parametro,lc_Funcion){
    var la_Arreglo = new Array();
    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('id'       , lc_Detalle_Lista);
    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('objeto'   , lc_Objeto_Destino);              
    la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('codigo'   , ( String(lc_Parametro) != 'undefined' ) ? lc_Parametro : '' );
    if ( String(lc_Funcion) != 'undefined' ) { la_Arreglo[la_Arreglo.length] = new Objeto_Servidor ('ejecutar' , lc_Funcion ); }
        
    Enviar_Objeto_Servidor( gc_Root + 'php/Cargar_Select.php',la_Arreglo ); 			 
}

function Tomar_Texto_Select (lc_Id) {
    var lo_Select = document.getElementById(lc_Id);
    var lc_Texto  = '';
    if (lo_Select != null) { lc_Texto = lo_Select.options[lo_Select.selectedIndex].text; }
    return lc_Texto;
}

