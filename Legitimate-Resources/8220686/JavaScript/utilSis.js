/****************************************************************************************************
* VARIABLES contenidas en RSisSelPagosNew.js :					COMUN 
*****************************************************************************************************/

// Para la traduccion de los errores. 
// Ver: anadirLiteral_v2(etiqueta, valor)
//      getError_v2(etiqueta)
var errores_v2 = new Array();

/****************************************************************************************************
* FUNCIONES contenidas en utilSis.js :								COMUN		
* 											 										
* [Ref0001]:	MM_findObj(n, d)  				Referencia en RSisSelPagosNew		
* [Ref0002]:	MM_showHideLayers()  				Referencia en RSisSelPagosNew									
* [Ref0003]:	esNetscape()												
* [Ref0004]:	fLoad()
* [Ref0005]:	decideFoco()
* [Ref0006]:	ocultaBoton()
* [Ref0007]:	ventanaInfoVisa()		
* [Ref0008]:	ventanaInfoMaster()		
* [Ref0009]:	fijarInicioURLReferencia()			Referencia en RSisSelPagosNew
* [Ref0010]:	fijarInicioURLReferencia2(url)			Referencia en RSisSelPagosNew
* [Ref0011]:	fijarFinURLReferencia()				Referencia en RSisSelPagosNew
* [Ref0012]:	fProcesandoPeticion(ver)			Referencia en RSisSelPagosNew
* [Ref0013]:	hov(loc,cls)	
* [Ref0014]:	MM_swapImage(imgX,urlX)	
* [Ref0015]:	cancelar_v2()							Evolucion de la funcion de RSisSelPagosNew
* [Ref0016]:	anadirLiteral_v2(etiqueta, valor)		Evolucion de la funcion de RSisSelPagosNew
* [Ref0017]:	getError_v2(etiqueta)				Evolucion de la funcion de RSisSelPagosNew
* [Ref0018]:	cambioimagen(nombreImagen,cambiopor)		Evolucion de la funcion de RSisSelPagosNew
* [Ref0019]:	dameValorElemento(e,nombre)		Permite llamadas AJAX. Usada en RSisSelFormaPago, RSisSelPagosNew
* [Ref0020]:	valorElemento(e)						Permite llamadas AJAX. Usada en RSisSelFormaPago, RSisSelPagosNew
* [Ref0021]:	muestraBoton()
* [Ref0022]:	ventanaInfoSafetyPay()		
* [Ref0023]:	ventanaInfoIupay()
* [Ref0026]:	abrirModal() - cerrarModal()
*****************************************************************************************************/


/************************************************************
* 												[Ref0001]								
* Funcion: MM_finfObj										
* Parametros:												
*		n: identificador del objeto							
*		d: documento										
* Devuelve el objeto buscado dentro del documento			
************************************************************/
function MM_findObj(n, d)
{ 
	var p,i,x;
	
	if(!d)
		d=document;

	if((p=n.indexOf("?")) > 0 && parent.frames.length)
	{
 		d=parent.frames[n.substring(p+1)].document;
 	 	n=n.substring(0,p);
  	}
 	
	if(!(x=d[n]) && d.all)
		x=d.all[n];

	for (i=0;!x && i<d.forms.length;i++)
		x=d.forms[i][n];

	for(i=0;!x && d.layers && i<d.layers.length;i++)
		x=MM_findObj(n,d.layers[i].document);

	if(!x && d.getElementById)
		x=d.getElementById(n);
				
	return x;
}

/************************************************************
* 												[Ref0002]	
* Funcion: MM_showHideLayers								
* Devuelve:													
************************************************************/
function MM_showHideLayers() 
{
	var i,p,v,obj,args=MM_showHideLayers.arguments;
	
	for (i=0; i<(args.length-2); i+=3)
	{
		if ((obj=MM_findObj(args[i]))!=null)
		{
			v=args[i+2];
			if (obj.style) {
				obj=obj.style;
			 	v=(v=='show')?'visible':(v=='hide')?'hidden':v;
			}
			obj.visibility=v; 
		}	
	}
	return true;			
}

/************************************************************
* 												[Ref0003]	
* Funcion: esNetscape							
* Devuelve:	true si es netscape												
************************************************************/
function esNetscape()
{
	return (navigator.appName == "Netscape");
}

/************************************************************
* 												[Ref0004]	
* Funcion: fLoad							
* Devuelve:		
* Funcion que se ejecuta cuando se termina de cargar la p�gina											
************************************************************/
function fLoad()
{
	MM_showHideLayers('realizandoPeticion','','hide');
	if(!esNetscape())
	{
		if(document.formTarjeta)
			document.formTarjeta.Sis_Numero_Tarjeta.size = 19;
	}		
	decideFoco();
}

/************************************************************
* 												[Ref0005]	
* Funcion: decideFoco							
* Devuelve:													
************************************************************/
function decideFoco()
{	
	var capaRealizandoPeticion = document.getElementById("realizandoPeticion");
	if (esNetscape()) {
		if (capaRealizandoPeticion) {
			capaRealizandoPeticion.style.visibility="hidden";
		}
	} else {
		if (capaRealizandoPeticion) {
			capaRealizandoPeticion.style.visibility="hidden";
		}
		if(document.formTarjeta) {
			try {
				if (document.formTarjeta.Sis_Numero_Tarjeta) {
					document.formTarjeta.Sis_Numero_Tarjeta.focus();
				}
			}
			catch(err){}
				
		}	
	}
}
		


/************************************************************
* 												[Ref0006]	
* Funcion: ocultaBoton							
* Devuelve:
* Nota: Debido a su uso generalizado, se utiliza para detectar el uso de Iframes												
************************************************************/
function ocultaBoton()
{
	MM_showHideLayers('divImgAceptar','','hide');
	MM_showHideLayers('divImgCancelar','','hide');
	MM_showHideLayers('divImgAceptarUPI','','hide');
	MM_showHideLayers('divImgCancelarUPI','','hide');
	
	//Javascript temporal para detecci�n de comercios con SIS en iframe.
	try {
		if (window!=window.top) {
			// creamos un input, y lo a�adimos al formulario de envio:
			var input = document.createElement('input');
			input.type = 'hidden';
			input.name = 'isIframe';
			input.value = true;
			document.formTarjeta.appendChild(input);
		}
	} catch (err) {}
}

/************************************************************
* 												[Ref0007]	
* Funcion: ventanaInfoVisa							
* Devuelve:													
************************************************************/
function ventanaInfoVisa()
{
	window.open("/sis/html/verifiedByVisa.html","Info","width=500,height=500");	
}

/************************************************************
* 												[Ref0008]	
* Funcion: ventanaInfoMaster							
* Devuelve:													
************************************************************/
function ventanaInfoMaster()
{
	window.open("https://www.mastercard.us/en-us/frequently-asked-questions.html#securecode", "Info","scrollbars=1,width=550,height=500");	
}

/************************************************************
* 												[Ref0009]	
* Funcion: fijarInicioURLReferencia							
* Devuelve:													
************************************************************/
function fijarInicioURLReferencia()
{
	document.write("<a href='/sis/pantallaReferencia;jsessionid=3JTCFN5D02N4RKFELBIYIHA?param="+ new Date().getTime()+"'>");
}

/************************************************************
* 												[Ref0010]	
* Funcion: fijarInicioURLReferencia2	
* Parametros:	
*		url							
* Devuelve:													
************************************************************/
function fijarInicioURLReferencia2(url)
{
	document.write("<a href='"+url+"?param="+ new Date().getTime()+"'>");
}

/************************************************************
* 												[Ref0011]	
* Funcion: fijarFinURLReferencia							
* Devuelve:													
************************************************************/
function fijarFinURLReferencia()
{
	document.write("</a>");
}

/************************************************************
* 												[Ref0012]	
* Funcion: fProcesandoPeticion		
* Parametros:												
*		ver						
* Devuelve:													
************************************************************/
function fProcesandoPeticion(ver)
{
   if (ver == 'N')
   {
  		MM_showHideLayers('realizandoPeticion','','hide');
  		setTimeout("fProcesandoPeticion('S')",350);
  	}	
   else
   {
     	MM_showHideLayers('realizandoPeticion','','show');
     	setTimeout("fProcesandoPeticion('N')",350);
   }
}

/************************************************************
* 												[Ref0013]	
* Funcion: hov		
* Parametros:												
*		loc
*		cls							
* Devuelve:													
************************************************************/
function hov(loc,cls){
	if(loc.className) loc.className=cls;
}					
	
/************************************************************
* 												[Ref0014]	
* Funcion: MM_swapImage
* Parametros:												
*		imgX
*		urlX								
* Devuelve:													
************************************************************/	
function MM_swapImage(imgX,urlX) { 
  imgX.src=urlX;
}

/************************************************************
* 												[Ref0015]	
* Funcion: cancelar_v2							
* Devuelve:	
* Funcion para el bot�n de Cancelar para que llame y genere una 
* excepci�n con c�digo SIS9915 -- 0915												
************************************************************/
function cancelar_v2(){
		ocultaBoton();
		fProcesandoPeticion('S');
		document.formCancel.bcancel.value=1;
		document.formCancel.submit();
		
}

/************************************************************
* 												[Ref0016]	
* Funcion: anadirLiteral_v2								
* Parametros:												
*		etiqueta
*		valor													
* Funcion que guarda en una matriz los valores de los errores, el texto y los 
*	literales asociados a los mismos. Se hace una sola vez en la carga												
************************************************************/
function anadirLiteral_v2(etiqueta, valor) {
	var error  = new Array();
	error[0]= etiqueta;
	error[1]= valor;
	errores_v2[errores_v2.length] = error;
}

/************************************************************
* 												[Ref0017]	
* Funcion: getError_v2								
* Parametros:												
*		etiqueta													
* Devuelve:	el literal asociado la operacion seleccionada												
************************************************************/
function getError_v2(etiqueta) {
	var noencontrado=true;
	var i =0;
	while(noencontrado &&  i < errores_v2.length ) {
		if (errores_v2[i][0] == etiqueta)
			return errores_v2[i][1];
		i++;
	}
	return "";
}


/************************************************************
* 												[Ref0018]	
* Funcion: cambioimagen								
* Parametros:												
*		nombreImagen
*		cambiopor													
* Devuelve:	el literal asociado la operacion seleccionada
************************************************************/
function cambioimagen(nombreImagen,cambiopor) 
{
	document.images[nombreImagen].src = eval(cambiopor + ".src");
}


/************************************************************
* 												[Ref0019]	
* Funcion: dameValorElemento								
* Parametros:												
*		e : elemento
*		nombre :nombre del elemento
* Funcion que obtiene el valor de un elemento.
* usada en las callbacks de ajax
************************************************************/
function dameValorElemento(e,nombre)
{
	var valor = null;
	if (e == null)
		return null;
	var aux = e.getElementsByTagName(nombre);
	if (aux != null)
		aux = aux[0];
	return valorElemento(aux);
	return valor;
}

/************************************************************
* 												[Ref0020]	
* Funcion: valorElemento								
* Parametros:												
*		e : elemento
* Funcion que devuelve el valor de un elemento hoja de un arbol XML
* usada en las callbacks de ajax
************************************************************/
function valorElemento(e) {
	var valor = null;
	if (e != null)
		e = e.childNodes[0];
	if (e != null)
		valor = e.nodeValue;	
	return valor;
}

/************************************************************
* 												[Ref0021]	
* Funcion: muestraBoton
* Devuelve:													
************************************************************/
function muestraBoton()
{
	MM_showHideLayers('divImgAceptar','','show');
	MM_showHideLayers('divImgCancelar','','show');
}

/************************************************************
* 												[Ref0022]	
* Funcion: ventanaInfoSafetyPay							
* Devuelve:													
************************************************************/
function ventanaInfoSafetyPay()
{
	window.open("http://www.safetypay.com");	
}

/************************************************************
* 												[Ref0023]	
* Funcion: ventanaInfoIupay							
* Devuelve:													
************************************************************/
function ventanaInfoIupay()
{
	window.open("http://www.iupay.es");	
}


/************************************************************
* 											    [Ref00024]	
* Funcion: ventanaAyudaCVV2							
* Devuelve:													
************************************************************/
function ventanaAyudaCVV2()
{
	abrirModal('ventanaAyudaCVV2');
}

function cerrarAyudaCVV2()
{
	cerrarModal('ventanaAyudaCVV2');
}

/************************************************************
* 											    [Ref00025]	
* Funcion: abrirVentanaPAE							
* Devuelve:													
************************************************************/
function abrirVentanaPAE()
{
	abrirModal('ventanaPAE');
}

function cerrarVentanaPAE()
{
	cerrarModal('ventanaPAE');
}

/************************************************************
* 											    [Ref00026]
* Funcion: abrirModal() - cerrarModal()
* Devuelve:
************************************************************/
function abrirModal(clase) {
	document.querySelector('div#modal.modal.' + clase).style.display = 'flex';
	document.querySelector('body').style.overflowY = 'hidden';
	document.querySelector('div#container').style.cssText = "position: static; height: 100%; overflow: hidden";
}

function cerrarModal(clase) {
	document.querySelector('div#modal.modal.' + clase).style.display = 'none';
	document.querySelector('body').style.overflowY = 'auto';
	document.querySelector('div#container').style.cssText = "position: inherit; height: 'auto; overflow: visible";
}
/************************************************************
* 												[Ref00027]
* Funcion: estiloBotonPagarDCC								
* Devuelve:													
************************************************************/
function deshabilitarBotonPagarDCC()
{
	document.getElementById('no').disabled = true;
	document.getElementById('yes').disabled = true;
}
