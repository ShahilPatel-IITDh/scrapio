/*var globalCallbacks = {
		onCreate: function(){
				$('cargando').show();
		},
		onComplete: function() {
				if(Ajax.activeRequestCount == 0){
						$('cargando').hide();
		}
	}
};
/* Se registran los callbacks en Ajax.Responders */
//Ajax.Responders.register( globalCallbacks );

function VerSoporte(param)
{
	var url 	= 'pagina/plansoporte.php';
	var pars 	= 'id='+param;
	var myAjax 	= new Ajax.Updater(
		'soporte', 
		url, 
		{
			method: 'post',
			onFailure: reportError,
			parameters: pars
		});
}

function poseoDominio(param){//utilizado en contrataweb1.php
	var url 	= 'pagina/ingresodominio.php';
	var pars 	= 'op='+param;
	var myAjax 	= new Ajax.Updater(
		'dominios', 
		url, 
		{
			method: 'post',
			onFailure: reportError,
			parameters: pars
		});
}

function cambioclave()
{
	var url 	= '../valid_image.php';
	var pars 	= 'newcode=true';
	var myAjax 	= new Ajax.Updater(
		'imagex', 
		url, 
		{
			method: 'get',
			onFailure: reportError,
			parameters: pars
		});
}

function cargaPagina(divid, archivo, param)
{
	if(archivo==1)//Carga Forma de Pago
	{
		var url = 'pagina/formapago.php';
	}
	if(archivo==2)//Carga busca dominio
	{
		var url = 'pagina/validadominio.php';
	}
	var pars 	= "plan="+param;
	var div		= divid;
	var myAjax 	= new Ajax.Updater(
		div, 
		url, 
		{
			method: 'post',
			onFailure: reportError,
			parameters: pars
		});
}

function ingresarDominio(id){
	var url = 'pagina/ingresodominio.php';
	var pars 	= "op="+id;
	var div		= 'dominios';
	var myAjax 	= new Ajax.Updater(
	div, 
	url, 
	{
		method: 'post',
		onFailure: reportError,
		parameters: pars
	});
}

function compradominio(){
	var url = 'pagina/compradominio.php';
	var pars 	= "";
	var div		= 'compradominio';
	var myAjax 	= new Ajax.Updater(
	div, 
	url, 
	{
		method: 'post',
		onFailure: reportError,
		parameters: pars
	});
}
	

function reportError() 
{
	alert('Ha ocurrido un error!');
}

/*VALIDACIONES*/

/*function cambioclave(ok){
		loadsection('imagex','valid_image.php?newcode=true');
}*/

function valformulario(){
	if(document.form1.nombre.value == ''){
		alert('Ingrese su nombre');
		document.form1.nombre.focus();
		return false;
	}
	if(document.form1.apellido.value == ''){
		alert('Ingrese su Apellido');
		document.form1.apellido.focus();
		return false;
	}
	if(document.form1.ciudad.value == ''){
		alert('Ingrese su Ciudad');
		document.form1.ciudad.focus();
		return false;
	}
	if(document.form1.email.value == ''){
		alert('Ingrese su E-Mail');
		document.form1.email.focus();
		return false;
	}else{
		var s = document.form1.email.value;
		//	var filter=/^[A-Za-z][A-Za-z0-9_.]*@[A-Za-z0-9_]+\.[A-Za-z0-9_.]+[A-za-z]$/;
	var filter=/^[_a-zA-Z0-9-]+(.[_a-zA-Z0-9-]+)*@([_a-zA-Z0-9-]+.)*[a-zA-Z0-9-]{2,200}.[a-zA-Z]{2,6}$/;
		if (filter.test(s)){
			/*Correo Valido, continuo con la validacion de campos*/
		}else{
			alert("Ingrese una dirección de correo válida");
			document.form1.email.focus();
			return false;
		}		
	}
	if(document.form1.obs.value == ''){
		alert('Ingrese su observación');
		document.form1.obs.focus();
		return false;
	}
	if(document.form1.codigo.value == ''){
		alert('Ingrese código de validación');
		document.form1.codigo.focus();
		return false;
	}
	return true;
}

function validaCompra(){//utilizado en contrataweb1.php
	var plan = document.formingreso.plan;
	var cuentaplan = 0;
	for(p=0;p<plan.length;p++)
	{
		if(plan[p].checked!=false)
		{
			cuentaplan = 1;
		}
	}
	if(cuentaplan == 0)
	{
		alert("Debe seleccionar un plan");
		return false;
	}
	
	var forma = document.formingreso.formapago;
	var cuentaforma = 0;
	for(f=0;f<forma.length;f++)
	{
		if(forma[f].checked!=false)
		{
			cuentaforma = 1;
		}
	}
	if(cuentaforma == 0)
	{
		alert("Debe seleccionar una forma de pago");
		return false;
	}
	
	var anios = document.formingreso.anoshosting;
	var cuentaanios = 0;
	for(a=0;a<anios.length;a++)
	{
		if(anios[a].checked!=false)
		{
			cuentaanios = 1;
		}
	}
	if(cuentaanios == 0)
		{
			alert("Debe seleccionar un año");
			return false;
		}

	var dominio = document.formingreso.dominio;
	var cuentadominio = 0;
	for(d=0;d<dominio.length;d++)
	{
		if(dominio[d].checked!=false)
		{
			cuentadominio = 1;
		}
	}
	if(cuentadominio == 0)
		{
			alert("Debe seleccionar si posee dominio");
			return false;
		}
	
	if(document.formingreso.txtdominio.value == ''){
		alert("Debe ingresar un dominio");
		return false;
	}
	
	if(compruebaDominio(document.formingreso.txtdominio.value)==false)
	{
		return false;
	};
	
}

function validaCompraWeb()
{
	var dominio = document.formingreso.tipdom;
	cuenta = 0;
	for(d=0;d<dominio.length;d++)
	{
		if(dominio[d].checked!=false)
		{
			cuenta = 1;
		}
	}
	if(cuenta==0)
	{
		alert("Debe seleccionar un tipo de Dominio");
		return false;
	}
	
	if(document.formingreso.txtdominio.value == ''){
		alert("Debe ingresar un dominio");
		return false;
	}

	//Valido dominio ingresado
	if(compruebaDominio(document.formingreso.txtdominio.value)==true)
	{
		return true;
	}else{
		return false;
	}
}

function validaFormContrato(){
	if(document.getElementById('nombre').value == ''){
		alert('Ingrese su nombre');
		document.getElementById('nombre').focus();
		return false;
	}
	if(document.getElementById('apellido').value == ''){
		alert('Ingrese su Apellido');
		document.getElementById('apellido').focus();
		return false;
	}
	if(document.getElementById('ciudad').value == ''){
		alert('Ingrese su Ciudad');
		document.getElementById('ciudad').focus();
		return false;
	}

	if(document.getElementById('rut').value == ''){
		alert('Ingrese su RUT');
		document.getElementById('rut').focus();
		return false;
	}else{
		if(validaRut(document.getElementById('rut'))==false)
		{
			return false;	
		}
	}	if(document.getElementById('direccion').value == ''){
		alert('Ingrese su Direccion');
		document.getElementById('direccion').focus();
		return false;
	}
	if(document.getElementById('email').value == ''){
		alert('Ingrese su E-Mail');
		document.getElementById('email').focus();
		return false;
	}else{
		var s = document.getElementById('email').value;
		//	var filter=/^[A-Za-z][A-Za-z0-9_.]*@[A-Za-z0-9_]+\.[A-Za-z0-9_.]+[A-za-z]$/;
	var filter=/^[_a-zA-Z0-9-]+(.[_a-zA-Z0-9-]+)*@([_a-zA-Z0-9-]+.)*[a-zA-Z0-9-]{2,200}.[a-zA-Z]{2,6}$/;
		if (filter.test(s)){
			//Correo Valido, continuo con la validacion de campos
		}else{
			alert("Ingrese una dirección de correo válida");
			document.getElementById('email').focus();
			return false;
		}
	}
	if(document.getElementById('area').value=='')
	{
		alert("Seleccione Area Telefonica");
		document.getElementById('area').focus();
		return false;
	}
	if(document.getElementById('telefono').value == ''){
		alert('Ingrese su Telefono');
		document.getElementById('telefono').focus();
		return false;
	}else{
		if(validaTelefono(document.getElementById('telefono'))==false)
		{
			return false;	
		}
	}
	if(document.getElementById("acepto").checked==false)
	{
		alert('Para contratar el servicio debe aceptar las condiciones de contrato');
		document.getElementById('acepto').focus();
		return false;	
	}
	return true;
}

function validaNotificacion()
{
	if(document.getElementById('nombre').value=='')
	{
		alert("Ingrese su Nombre o R. Social");
		document.getElementById('nombre').focus();
		return false;
	}
	if(document.getElementById('apellido').value=='')
	{
		alert("Ingrese su Apellido o Giro");
		document.getElementById('apellido').focus();
		return false;
	}
	if(document.getElementById('rut').value == ''){
		alert('Ingrese su RUT');
		document.getElementById('rut').focus();
		return false;
	}else{
		if(validaRut(document.getElementById('rut'))==false)
		{
			return false;	
		}
	}	
	if(document.getElementById('area').value=='')
	{
		alert("Ingrese su Area Telefonica");
		document.getElementById('area').focus();
		return false;
	}
	if(document.getElementById('telefono').value=='')
	{
		alert("Ingrese su Telefono");
		document.getElementById('telefono').focus();
		return false;
	}
	if(document.getElementById('direccion').value == ''){
		alert('Ingrese su Direccion');
		document.getElementById('direccion').focus();
		return false;
	}
	if(document.getElementById('ciudad').value=='')
	{
		alert("Ingrese su Ciudad");
		document.getElementById('ciudad').focus();
		return false;
	}
	if(document.getElementById('email').value=='')
	{
		alert("Ingrese su E-Mail");
		document.getElementById('email').focus();
		return false;
	}
	if(document.getElementById('monto').value=='')
	{
		alert("Ingrese Monto");
		document.getElementById('monto').focus();
		return false;
	}
	if(document.getElementById('fechapago').value=='')
	{
		alert("Ingrese Fecha de Pago");
		document.getElementById('fechapago').focus();
		return false;
	}
	if(document.getElementById('formapago').value=='')
	{
		alert("Seleccione Forma de Pago");
		document.getElementById('formapago').focus();
		return false;
	}
	if(document.getElementById('concepto').value=='')
	{
		alert("Seleccione Concepto");
		document.getElementById('concepto').focus();
		return false;
	}
	if(document.getElementById('nro').value=='')
	{
		alert("Ingrese Numero de pago");
		document.getElementById('nro').focus();
		return false;
	}
	if(document.getElementById('obs').value=='')
	{
		alert("Ingrese una Observacion");
		document.getElementById('obs').focus();
		return false;
	}
	return true;
}

function verificaCasillas(inputname, cantidad)
{
	var nombre = (inputname.name);
	var valor = (inputname.value);
	for(c=0;c<cantidad;c++)
	{
		if(valor != '')
		{
			var inputnombre = "casilla"+c;
			if(nombre != inputnombre)
			{
				if(valor == document.getElementById(inputnombre).value)
				{
					alert("No puede tener casillas duplicadas.");
					document.getElementById(inputnombre).focus();
					return false;
				}
			}
		}
	}
	return true;
}

function buscaDominio(){
	if(document.dominio.domain.value==''){
		alert('Ingrese nombre de dominio');
		document.dominio.domain.focus();
		return false;
	}
	if(document.dominio.ext.value==''){
		alert('Seleccione una extension para su dominio');
		document.dominio.ext.focus();
		return false;
	}
	return true;
}

function verDominio()
{
	window.open('pagina/popvalordominio.php', 'DOMINIOS', 'width=490, height=220, scrollbars=no');
}

function validardominio(){
	window.open('whois/index.php', 'Validar', 'width=500, height=300, scrollbars=yes');
}

function compruebaDominio(nombre_dominio)
{
	var arr = new Array(
	'.com','.net','.org','.biz','.coop','.info','.museum','.name',
	'.pro','.edu','.gov','.int','.mil','.ac','.ad','.ae','.af','.ag',
	'.ai','.al','.am','.an','.ao','.aq','.ar','.as','.at','.au','.aw',
	'.az','.ba','.bb','.bd','.be','.bf','.bg','.bh','.bi','.bj','.bm',
	'.bn','.bo','.br','.bs','.bt','.bv','.bw','.by','.bz','.ca','.cc',
	'.cd','.cf','.cg','.ch','.ci','.ck','.cl','.cm','.cn','.co','.cr',
	'.cu','.cv','.cx','.cy','.cz','.de','.dj','.dk','.dm','.do','.dz',
	'.ec','.ee','.eg','.eh','.er','.es','.et','.fi','.fj','.fk','.fm',
	'.fo','.fr','.ga','.gd','.ge','.gf','.gg','.gh','.gi','.gl','.gm',
	'.gn','.gp','.gq','.gr','.gs','.gt','.gu','.gv','.gy','.hk','.hm',
	'.hn','.hr','.ht','.hu','.id','.ie','.il','.im','.in','.io','.iq',
	'.ir','.is','.it','.je','.jm','.jo','.jp','.ke','.kg','.kh','.ki',
	'.km','.kn','.kp','.kr','.kw','.ky','.kz','.la','.lb','.lc','.li',
	'.lk','.lr','.ls','.lt','.lu','.lv','.ly','.ma','.mc','.md','.mg',
	'.mh','.mk','.ml','.mm','.mn','.mo','.mp','.mq','.mr','.ms','.mt',
	'.mu','.mv','.mw','.mx','.my','.mz','.na','.nc','.ne','.nf','.ng',
	'.ni','.nl','.no','.np','.nr','.nu','.nz','.om','.pa','.pe','.pf',
	'.pg','.ph','.pk','.pl','.pm','.pn','.pr','.ps','.pt','.pw','.py',
	'.qa','.re','.ro','.rw','.ru','.sa','.sb','.sc','.sd','.se','.sg',
	'.sh','.si','.sj','.sk','.sl','.sm','.sn','.so','.sr','.st','.sv',
	'.sy','.sz','.tc','.td','.tf','.tg','.th','.tj','.tk','.tm','.tn',
	'.to','.tp','.tr','.tt','.tv','.tw','.tz','.ua','.ug','.uk','.um',
	'.us','.uy','.uz','.va','.vc','.ve','.vg','.vi','.vn','.vu','.ws',
	'.wf','.ye','.yt','.yu','.za','.zm','.zw');
	var comprobacion = nombre_dominio;
	var val = true;
	var punto = comprobacion.lastIndexOf(".");
	var nombre_dominio = comprobacion.substring(0,punto);
	var extension = comprobacion.substring(punto,comprobacion.length);
	if(punto >= 1 && punto < 57)
	{
		for(var i=0; i<arr.length; i++)
		{
			if(extension == arr[i])
			{
				val = true;
				break;
			}
			else
			{
				val = false;
			}
		}
		if(val == false)
		{
			alert("la extensionension de su dominio "+extension+" no es correcta");
			return false;
		}
		else
		{
			for(var j=0; j<nombre_dominio.length; j++)
			{
				var dh = nombre_dominio.charAt(j);
				var hh = dh.charCodeAt(0);
				if((hh > 47 && hh<59) || (hh > 64 && hh<91) || (hh > 96 && hh<123) || hh==45 || hh==46)
				{
					if((j==0 || j==nombre_dominio.length-1) && hh == 45)
					{
						alert("Su nombre de dominio no puede contener el símbolo guión '-' al principio ni al final");
						return false;
					}
				}
				else 
				{
					alert("El dominio no puede contener caracteres especiales");
					return false;
				}
			}
		}
	}
	else
	{
		alert("El número de caracteres insertado no es correcto para el nombre de dominio o falta la extensión");
		return false;
	}
	
	return true;
}

function validaCupon()
{
	if(document.getElementById("nombre").value=='')
	{
		alert("Ingrese Nombre");
		document.getElementById("nombre").focus();
		return false;
	}
	if(document.getElementById("apellido").value=='')
	{
		alert("Ingrese Apellido");
		document.getElementById("apellido").focus();
		return false;
	}
	if(document.getElementById("rut").value=='')
	{
		alert("Ingrese RUT");
		document.getElementById("rut").focus();
		return false;
	}else{
		validaRut(document.getElementById("rut"));
	}
	if(document.getElementById("area").value=='-')
	{
		alert("Seleccione Código de Area");
		document.getElementById("area").focus();
		return false;
	}
	if(document.getElementById("telefono").value=='')
	{
		alert("Ingrese Telefono");
		document.getElementById("telefono").focus();
		return false;
	}
	if(document.getElementById("email").value=='')
	{
		alert("Ingrese E-Mail");
		document.getElementById("email").focus();
		return false;
	}else{
		validarEmail(document.getElementById("email"));
	}
	if(document.getElementById("ciudad").value=='')
	{
		alert("Ingrese Ciudad");
		document.getElementById("ciudad").focus();
		return false;
	}
	if(document.getElementById("monto").value=='')
	{
		alert("Ingrese el monto de la operación");
		document.getElementById("monto").focus();
		return false;
	}else{
		if(validarEntero(document.getElementById("monto"))==false)
		{
			return false;
		}
	}
	if(document.getElementById("dcmls").value=='')
	{
		alert("Ingrese decimales de la operación");
		document.getElementById("dcmls").focus();
		return false;	
	}else{
		if(validarDecimal(document.getElementById("dcmls"))==false)
		{
			return false;
	}
	}
	if(document.getElementById("concepto").value=='')
	{
		alert("Seleccione Concepto");
		document.getElementById("concepto").focus();
		return false;
	}
	if(document.getElementById("detalle").value=='')
	{
		alert("Ingrese Detalle");
		document.getElementById("detalle").focus();
		return false;
	}
	if(document.getElementById("codigo").value=='')
	{
		alert("Ingrese Código Verificador");
		document.getElementById("codigo").focus();
		return false;
	}
	return true;
}

function validarEntero(objeto)
{
	valor = parseInt(objeto.value);
	if (isNaN(valor))
	{
		alert("Debe ingresar un valor numérico");
		document.getElementById(objeto.id).focus();
		return false;
	}
	return true;
}
function validarDecimal1(objeto)
{
	valor = parseInt(objeto.value);
	if (isNaN(valor))
	{
		alert("Debe ingresar un decimal numérico");
		document.getElementById(objeto.id).focus();
		return false;
	}
	return true;
}
function validarDecimal2(objeto)
{
	valor = parseInt(objeto.value);
	if (isNaN(valor))
	{
		alert("Debe ingresar un decimal numérico");
		document.getElementById(objeto.id).focus();
		return false;
	}
	return true;
}
function validarDecimal3(objeto)
{
	valor = parseInt(objeto.value);
	if (isNaN(valor))
	{
		alert("Debe ingresar un decimal numérico");
		document.getElementById(objeto.id).focus();
		return false;
	}
	return true;
}
// INICIO VALIDA RUT
function checkCDV( dvr )
{
  dv = dvr + "";
  if ( dv != '0' && dv != '1' && dv != '2' && dv != '3' && dv != '4' && dv != '5' && dv != '6' && dv != '7' && dv != '8' && dv != '9' && dv != 'k'  && dv != 'K')
  {
    alert("Debe ingresar un digito verificador valido.");
    return false;
  }
  return true;
}

//////////////////////////////////////////////////

function checkDV( crut )
{
  var error = false; 
  largo = crut.length;
  if ( largo < 2 )
  {
	error = true;
  }
  if ( largo > 2 )
    rut = crut.substring(0, largo-1);

  dv = crut.charAt(largo-1);
  checkCDV( dv );

  if ( rut == null || dv == null )
      return 0;

  var dvr = '0';

  suma = 0;
  mul  = 2;

  for (i= rut.length-1  ; i >= 0; i--)
  {
    suma = suma + rut.charAt(i) * mul;
    if (mul == 7)
      mul = 2;
    else    
      mul++;
  }
  res = suma % 11;
  if (res==1)
    dvr = 'k';
  else if (res==0)
    dvr = '0';
  else
  {
    dvi = 11-res;
    dvr = dvi + "";
  }
  if ( dvr != dv.toLowerCase() )
  {
	error = true;
  }
  if(error) {
	return false;
  }
  else {
	return true;
  } 
}

function validaRut(camtexto)
{
  var error = false;
  texto = camtexto.value;
  if(texto == "") {
	return true;
  }
  var tmpstr = "";
  for ( i=0; i < texto.length ; i++ )
    if ( texto.charAt(i) != ' ' && texto.charAt(i) != '.' && texto.charAt(i) != '-' )
      tmpstr = tmpstr + texto.charAt(i);
  texto = tmpstr;
  largo = texto.length;

  if ( largo > 0 && largo < 2 )
  {
    error = true;
  }
 for (i=0; i < largo ; i++ )
  { 
    if ( texto.charAt(i) !="0" && texto.charAt(i) != "1" && texto.charAt(i) !="2" && texto.charAt(i) != "3" && texto.charAt(i) != "4" && texto.charAt(i) !="5" && texto.charAt(i) != "6" && texto.charAt(i) != "7" && texto.charAt(i) !="8" && texto.charAt(i) != "9" && texto.charAt(i) !="k" && texto.charAt(i) != "K" ) 
    {
      error = true;
    }
  }
  var invertido = "";
  for ( i=(largo-1),j=0; i>=0; i--,j++ )
    invertido = invertido + texto.charAt(i);

  var dtexto = "";
  dtexto = dtexto + invertido.charAt(0);
  if(dtexto != "") {
  	dtexto = dtexto + '-';
  }
  cnt = 0;

  for ( i=1,j=2; i<largo; i++,j++ )
  {
    if ( cnt == 3 )
    {
      dtexto = dtexto + '.';
      j++;
      dtexto = dtexto + invertido.charAt(i);
      cnt = 1;
    }
    else
    { 
      dtexto = dtexto + invertido.charAt(i);
      cnt++;
    }
  }
  invertido = "";
  for ( i=(dtexto.length-1),j=0; i>=0; i--,j++ )
    invertido = invertido + dtexto.charAt(i);


  camtexto.value = invertido;  
  if(texto.length > 7 ) {
  	if ( !checkDV(texto) ) {
		error = true;
  	}
  }
  else {
	error = true;
  }

  if(error) {
	alert("El dato ingresado no es un R.U.T valido.");
	camtexto.focus();
	camtexto.select();
	return false;
  }
  else {
	return true;
  }
}

//FIN VALIDA RUT

//VALIDA E-MAIL
function validarEmail(objeto)
{
	var s = objeto.value;
//	var filter=/^[A-Za-z][A-Za-z0-9_.]*@[A-Za-z0-9_]+\.[A-Za-z0-9_.]+[A-za-z]$/;
	var filter=/^[_a-zA-Z0-9-]+(.[_a-zA-Z0-9-]+)*@([_a-zA-Z0-9-]+.)*[a-zA-Z0-9-]{2,200}.[a-zA-Z]{2,6}$/;
	if (s.length == 0 ) return true;
	if (filter.test(s))
		return true;
	else
		alert("Ingrese una dirección de correo válida");
		objeto.focus();
	return false;
}
//FIN VALIDA E-MAIL

//VALIDA TELEFONO
function validaTelefono(campo) {
	//var RegExPattern = /^[0-9]{6,8}$/;
	var RegExPattern = /^[0-9]{6,10}$/;
    var errorMessage = 'Telefono Incorrecto.';
	if ((campo.value.match(RegExPattern)) && (campo.value!='')) {
		return true;
	} else {
		alert(errorMessage);
		campo.focus();
		return false;
	}

}
//-->
//FIN VALIDA TELEFONO

//VALIDAR DECIMAL
function validarDecimal1(campo) {
	var RegExPattern = /^[0-9]{1,1}$/;
    var errorMessage = 'Debe poner 1 decimal';
	if ((campo.value.match(RegExPattern)) && (campo.value!='')) {
		return true;
	} else {
		alert(errorMessage);
		campo.focus();
		return false;
	}

}
function validarDecimal2(campo) {
	var RegExPattern = /^[0-9]{2,2}$/;
    var errorMessage = 'Debe poner 2 decimales';
	if ((campo.value.match(RegExPattern)) && (campo.value!='')) {
		return true;
	} else {
		alert(errorMessage);
		campo.focus();
		return false;
	}

}
function validarDecimal3(campo) {
	var RegExPattern = /^[0-9]{3,3}$/;
    var errorMessage = 'Debe poner 3 decimales';
	if ((campo.value.match(RegExPattern)) && (campo.value!='')) {
		return true;
	} else {
		alert(errorMessage);
		campo.focus();
		return false;
	}

}
//-->
//FIN VALIDAR DECIMAL

function dineromail()
{
	document.form.submit();
}

function enviabanco()
{
	location.href='index.php?ok';
}

function imprSelec(nombre)
{
  var ficha = document.getElementById(nombre);
  var ventimp = window.open(' ', 'popimpr');
  ventimp.document.write( ficha.innerHTML );
  ventimp.document.close();
  ventimp.print( );
  ventimp.close();
} 

function MM_findObj(n, d) { //v4.01
  	var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  	if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  	for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  	if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  	var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   	if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_swapImgRestore() { //v3.0
  	var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
	var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
   	var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
	if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}