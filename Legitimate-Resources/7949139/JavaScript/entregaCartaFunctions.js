$(document).ready(function(){
	
	$('#fechas').slideDown();
	$('#horas').hide();
	$('#continue').hide();
	$('#continueOffice').hide();
	$('#continueMondial').hide();
	$('#errorMensajeFecha').hide();
	
	if($("#codigoAccesoCitypaq").length != 0) {
		if($("#codigoAccesoCitypaq").val() == '-1') {
			//Se ha producido un error
			$('#errorCitypaqCodeModal').modal({
			    backdrop: 'static',
			    keyboard: false
			});
		} else {
			$('#getCodigoCitypaq').modal({
			    backdrop: 'static',
			    keyboard: false
			});
		}
	}
	
	if($("#citypaqNoDisponible").length != 0) {
		if($("#citypaqNoDisponible").val() == '001') {
			$('#labelCitypaqNoExiste').css('display', 'none');
			$('#labelCitypaqDimensiones').css('display', 'none');
			$('#labelCitypaqNoDisponible').css('display', 'block');
			
		} else if($("#citypaqNoDisponible").val() == '1002') {
			$('#labelCitypaqNoDisponible').css('display', 'none');
			$('#labelCitypaqDimensiones').css('display', 'none');
			$('#labelCitypaqNoExiste').css('display', 'block');
			
		}
		else if($("#citypaqNoDisponible").val() == '144') {
			$('#labelCitypaqNoDisponible').css('display', 'none');
			$('#labelCitypaqNoExiste').css('display', 'none');
			$('#labelCitypaqDimensiones').css('display', 'block');
			
		}
		
		if($("#citypaqNoDisponible").val() != '') {
			$('#citypaqNoDisponibleModal').modal({
			    backdrop: 'static',
			    keyboard: false
			});
		}
		
	}
	
});

$("#select_extension").change(function(){
    $('#ampliacionInstrucciones').val($('#select_extension').val());
});

$('#fechaCarta5').click(function(){
	$("#select_extension").val('');
	$('#ampliacionInstrucciones').val($('#select_extension').val());
	$('#continue').hide();
	$('#continueOffice').hide();
	$('#continueMondial').hide();
	$('#hoursDiv').html('');
	$('#horas').hide();
	$('#intervaloHorarioSeleccionado').val('');
	$("#fechaCarta1").prop("checked", false);
	$("#fechaCarta2").prop("checked", false);
	$("#fechaCarta3").prop("checked", false);
	$("#fechaCarta4").prop("checked", false);
	$('#pickupDateDayValue').attr('disabled', 'disabled');
    $('#pickupDateDayValue').val('');
	$('#manageECAddress').css('display', 'none');
	$('#unencapsulateDates').css('display', 'inline-block');
	$('#div_extension_general').css('display', 'inline-block');
	$('#notValidPhoneError').css('display', 'none'); 
	$('#errorValidPhone').css('display', 'none'); 
	$('#opcionesCitypaq').css('display', 'none');
	$('#codigoCitypaq').prop('checked', false);
	$('#listadoCitypaq').prop('checked', false);
	$('#campoCodigoCitypaq').css('display', 'none');
	$('#listaCitypaq').css('display', 'none');
	$('#labelCodigoCitypaq').removeClass('addCodigoCitypaq');
	$('#continueCitypaq').hide();
	$('#notValidCodigoCitypaq').css('display', 'none');
});

$('#fechaCarta1, #fechaCarta2, #fechaCarta3, #fechaCarta4').click(function(){
    
	 var fechaSeleccionada = $(this).val();
	    
	 $('#refreshAddressMessage').css('display', 'none');
	 
	 $('#errorMensajeFecha').html('');
	 
	 $('#continue').hide();
	 
	 $('#errorMensajeFecha').hide();
	 	 
	 if (fechaSeleccionada!=0){
	    
	    $('#pickupDateDayValue').attr('disabled', 'disabled');
	    $('#pickupDateDayValue').val('');
	    $('#fechaSeleccionada').val(fechaSeleccionada);
	    
	    obtenerHoras (fechaSeleccionada);              
	 }
	 else{
	    $('#horas').hide();
	    
	    if ($(this).attr('id') == "fechaCarta4") {
	          $('#pickupDateDayValue').removeAttr('disabled');
	          $('#pickupDateDayValue').focus();
	    }
	 }
});


$('#pickupDateDayValue').bind('change', function() {
	$('#errorMensajeFecha').hide();
	    
	$('#fechaSeleccionada').val($('#pickupDateDayValue').val());
	//Validamos la fecha introducida y si es correcta obtenemos las horas
	validarFecha ($('#pickupDateDayValue').val());
	
});

$('#continue').click(function(){
	$('#ampliacionInstrucciones').val($('#select_extension').val());
	$('#obInstAdicionales').val($('#ObsAditionalInstrutions').val());
	$("#guardarECForm").submit();
});

$('#continueOffice').click(function(){
	$('#ampliacionInstrucciones').val($('#select_extension').val());
	$("#guardarECOfficeForm").submit();
});

$('#continueMondial').click(function(){
	$('#ampliacionInstrucciones').val($('#select_extension').val());
	$("#guardarECMondialForm").submit();
	activarPantallaRefresco();
});

$('#continuePrevious').click(function(){
	$("#datosForm").submit();
});

$('#seguimiento').click(function(){
	$("#seguimientoForm").submit();
});

function mostrarBoton(a){
	
	$('#intervaloHorarioSeleccionado').val($(a).val());
	$('#continue').show();
}

var currentLocale = 'es';
if($('#currentLocale').text() != ''){
  currentLocale = $('#currentLocale').text().trim();
}

function validarFecha (fecha){
	$.ajax({
		type: "POST",
		url: "validarFecha",
		cache: false,
		data: 'fechaSeleccionada=' + fecha + '&expedition=' + $('#expedition').val(),
		dataType: 'json',
		success: function (data) {
			if (data==1){
				$('#errorMensajeFecha').html('');
				//$('#div_extension_general').css('display', 'block');
				obtenerHoras(fecha);
			} else {
				$('#manageAddress').css('display', 'block');
				//$('#div_extension_general').css('display', 'none');
				if (data==-340){
					if (currentLocale == 'es') {	
						$('#errorMensajeFecha').html('No puede seleccionar una fecha superior a un mes.');
					}else if (currentLocale == 'pt') {
						$('#errorMensajeFecha').html('Intervalo de datas supera 1 mês.');
					}
				} else if (data==-320){
					if (currentLocale == 'es') {	
						$('#errorMensajeFecha').html('No puede seleccionar una fecha inferior a las propuestas.');
					}else if(currentLocale == 'pt') {
						$('#errorMensajeFecha').html('Você não pode selecionar um cadeado inferior ao proposto.');
					}
				} else if (data==-1){
					if (currentLocale == 'es') {	
						$('#errorMensajeFecha').html('Solo se pueden concertar entregas de lunes a viernes, excepto festivos.');
					}else if(currentLocale == 'pt') {
						$('#errorMensajeFecha').html('As entregas só podem ser agendadas de segunda a sexta-feira, exceto feriados.');
					}
				} else if (data==0){
					if (currentLocale == 'es') {	
						$('#errorMensajeFecha').html('No se ha podido obtener las horas para la fecha seleccionada.');
					}else if(currentLocale == 'pt') {
						$('#errorMensajeFecha').html('Não foi possível obter as horas para a data selecionada.');
					}
				}
				
				$('#errorMensajeFecha').show();
				$('#horas').hide();
				$('#continue').hide();
			}
		}
	});
}

function obtenerHoras(fecha){
	$.ajax({
		type: "POST",
		url: "getHoras",
		cache: false,
		data: 'fechaSeleccionada=' + fecha + '&expedition=' + $('#expedition').val(),
		success: function (data) {
			
			if (data.indexOf("null")==-1){
				$('#manageAddress').css('display', 'block');
				$('#manageOffice').css('display', 'block');
				$('#hoursDiv').html(data);
				$('#horas').show();
				$('#continue').hide();
				$('html, body').animate({
			        scrollTop: $("#horas").offset().top}, 2000);
			}
			else{
				$('#manageAddress').css('display', 'block');
				$('#manageOffice').css('display', 'block');
				$('#hoursDiv').html('');
				$('#horas').hide();
				$('#continue').show();
				$('#intervaloHorarioSeleccionado').val('');
			}
		}
	});
}

//Volver desde el detalle de Entrega a la carta al detalle del envio
$('#backFromECButton').click(function() {
	$('#manageShippingFormEC').attr('action', 'search');
	$('#manageShippingFormEC').submit();
});

//Volver desde la pantalla de grabado correcto de Entrega a la carta al detalle del envio
$('#backFromECSuccessButton').click(function() {
	$('#manageShippingForm').attr('action', 'search');
	$('#manageShippingForm').submit();
});

//Gestionar direccion en entrega a la carta
$('#manageAddressECButton').click(function() {
	$("#select_extension").val('');
	$('#ampliacionInstrucciones').val($('#select_extension').val());
	$('#continue').hide();
	$('#continueOffice').hide();
	$('#continueMondial').hide();
	$('#horas').hide();
	$('#unencapsulateDates').css('display', 'none');
	$('#errorMensajeFecha').html('');
	$('#deliveryOffice').val("2");
	$('#manageECAddress').css('display', 'block');
	$('#addressDest').attr('readonly', false);
	$('#receiveraddressnumber').attr('readonly', false);
	$('#receiveraddressrest').attr('readonly', false);
	$('#addressDest').val("");
	$('#receiveraddressnumber').val("");
	$('#receiveraddressrest').val("");
	$('cityReceiverText').val("");
	$('#divPickupDateDay').css('display', 'none');
	$('#div_extension_general').css('display', 'none');
	$('#notValidPhoneError').css('display', 'none'); 
	$('#errorValidPhone').css('display', 'none'); 
	$('#opcionesCitypaq').css('display', 'none');
	$('#codigoCitypaq').prop('checked', false);
	$('#listadoCitypaq').prop('checked', false);
	$('#campoCodigoCitypaq').css('display', 'none');
	$('#listaCitypaq').css('display', 'none');
	$('#labelCodigoCitypaq').removeClass('addCodigoCitypaq');
	$('#continueCitypaq').hide();
	$('#notValidCodigoCitypaq').css('display', 'none');
});

//Citypaq
$('#citypaqButton').click(function() {
	$("#select_extension").val('');
	$('#ampliacionInstrucciones').val($('#select_extension').val());
	$('#continue').hide();
	$('#continueOffice').hide();
	$('#continueMondial').hide();
	$('#horas').hide();
	$('#unencapsulateDates').css('display', 'none');
	$('#errorMensajeFecha').html('');
	$('#deliveryOffice').val("2");
	$('#manageECAddress').css('display', 'none');
	$('#addressDest').attr('readonly', false);
	$('#receiveraddressnumber').attr('readonly', false);
	$('#receiveraddressrest').attr('readonly', false);
	$('#addressDest').val("");
	$('#receiveraddressnumber').val("");
	$('#receiveraddressrest').val("");
	$('cityReceiverText').val("");
	$('#divPickupDateDay').css('display', 'none');
	$('#div_extension_general').css('display', 'none');
	$('#notValidPhoneError').css('display', 'none'); 
	$('#errorValidPhone').css('display', 'none'); 
	$('#continueCitypaq').hide();
	$('#notValidCodigoCitypaq').css('display', 'none');
	
	if(telefonoValido == true){
		$('#opcionesCitypaq').css('display', 'block');
	} else {
		$('#enterPhoneModal').modal({
		    backdrop: 'static',
		    keyboard: false
		});
	}
	
});

//Mondial
$('#manageMondialButton').click(function() {
	$("#select_extension").val('');
	$('#ampliacionInstrucciones').val($('#select_extension').val());
	$('#continue').hide();
	$('#continueOffice').hide();
	$('#horas').hide();
	$('#unencapsulateDates').css('display', 'none');
	$('#errorMensajeFecha').html('');
	$('#deliveryOffice').val("2");
	$('#manageECAddress').css('display', 'none');
	$('#addressDest').attr('readonly', false);
	$('#receiveraddressnumber').attr('readonly', false);
	$('#receiveraddressrest').attr('readonly', false);
	$('#addressDest').val("");
	$('#receiveraddressnumber').val("");
	$('#receiveraddressrest').val("");
	$('cityReceiverText').val("");
	$('#divPickupDateDay').css('display', 'none');
	$('#div_extension_general').css('display', 'none');
	$('#notValidPhoneError').css('display', 'none'); 
	$('#errorValidPhone').css('display', 'none'); 
	$('#opcionesCitypaq').css('display', 'none');
	$('#codigoCitypaq').prop('checked', false);
	$('#listadoCitypaq').prop('checked', false);
	$('#campoCodigoCitypaq').css('display', 'none');
	$('#listaCitypaq').css('display', 'none');
	$('#labelCodigoCitypaq').removeClass('addCodigoCitypaq');
	$('#continueCitypaq').hide();
	$('#notValidCodigoCitypaq').css('display', 'none');
	getMondialsData("1");
	activarPantallaRefresco();
});


$('#cancelMondialModalButton, #closeMondialButton').click(function() {
	$('#manageMondialButton').removeAttr('checked');
	$('#enterMondialModal').modal('toggle');
});

$('#closeHorarioButton').click(function() {
	$('#horarioPunto').modal('toggle');
	$("#enterMondialModal").css("z-index", '');
	$('#horarioSemanal').text('');
});

$('#continueMondialModalButton').click(function() {
	$('#enterMondialModal').modal('toggle');
});


$('.input-number').on('input', function () { 
    this.value = this.value.replace(/[^0-9]/g,'');
});

function solonumeros(){
	
	$('#campoCodigoCitypaq').val($('#campoCodigoCitypaq').val().replace(/[^a-zA-Z0-9]/g,''));
}

var reintentosTelefono = 0;
var telefonoValido = false;
$('#continuePhoneModalButton').click(function() {
	$('#notValidPhoneError').css('display', 'none'); 
	$('#errorValidPhone').css('display', 'none'); 
	$.ajax({
		type: "POST",
		url: "validaTelefono",
		cache: false,
		data: 'telefonoCitypaq=' + $('#telefonoModal').val() + '&expedition=' + $('#expedition').val(),
		success: function (data) {
			if(data.estado == '0'){
				//telefono no valido
				$('#notValidPhoneError').css('display', 'block'); 
				reintentosTelefono ++;
				
				if(reintentosTelefono == '3'){
					$('#enterPhoneModal').modal('toggle');
					$('#reintentosPhoneModal').modal({
					    backdrop: 'static',
					    keyboard: false
					});
				}
				
			} else if(data.estado == '-1'){
				//Error al llamar a BBDD
				$('#errorValidPhone').css('display', 'block'); 
				
			} else if(data.estado == '1'){
				//telefono valido
				telefonoValido = true;
				$('#enterPhoneModal').modal('toggle');
				$('#opcionesCitypaq').html(data.opciones);
				$('#opcionesCitypaq').css('display', 'block');
			}
		}
	});
});

function mostrarInputCitypaq(){
	$('#labelCodigoCitypaq').addClass('addCodigoCitypaq');
	$('#campoCodigoCitypaq').css('display', 'block');
	$('#listaCitypaq').css('display', 'none');
	$('#continueCitypaq').show();
}

function mostrarListadoCitypaq(){
	$('#labelCodigoCitypaq').removeClass('addCodigoCitypaq');
	$('#campoCodigoCitypaq').css('display', 'none');
	$('#notValidCodigoCitypaq').css('display', 'none');
	$('#continueCitypaq').hide();
	paintcitypaqMap();
}

function finalizarCitypaq(){
	if($('#campoCodigoCitypaq').val() == '' || $('#campoCodigoCitypaq').val().length != 9) {
		$('#notValidCodigoCitypaq').css('display', 'block');
	} else {
		$('#notValidCodigoCitypaq').css('display', 'none');
		seleccionarCitypaq($('#campoCodigoCitypaq').val());
	}
}

function seleccionarCitypaq(codigoCitypaq){
	$('#codigoCitypaqForm').val(codigoCitypaq);
	activarPantallaRefresco();
	$("#reservaCitypaq").submit();
}

//Obtenemos los citypaq a pintar en el mapa
function paintcitypaqMap(){
	
	activarPantallaRefresco();
	
	var cp = $('#zipCode').val();
	$.ajax({
		type: "POST",
		url: "obtenerListadoCitypaq",
		cache: false,
		data: 'zipCode=' + cp,
		dataType: 'json',
		success: function (data) {
			if (data && data != "") {
				if(data.estado == '-12'){
					desactivarPantallaRefresco();
					$('#errorCitypaqModalCP').modal({
					    backdrop: 'static',
					    keyboard: false
					});
				} else {
					$('.popup-overlay').show();
					//Abrir modal
					$('#mapCitypaq').width(screen.width);
					$('#modalContainerCitypaq').width(screen.width);
					$('#listCitypaqModal').modal({
					    backdrop: 'static',
					    keyboard: false
					});
					
					desactivarPantallaRefresco();
					//Inicicalizar mapa
					initCitypaqMap(data);
					//Solucionar el problema del refresco del mapa en un modal
					$("#listCitypaqModal").on("shown.bs.modal", function () {
					    google.maps.event.trigger(map, "resize");
					});
				}
			}
			//Se produjo un error en la obtencion de las citypaq
			else {
				desactivarPantallaRefresco();
				$('#errorCitypaqModal').modal({
				    backdrop: 'static',
				    keyboard: false
				});
			}
			
		}
	});
	
}

function initCitypaqMap(data) {
	
	var numCitypaq = 0;

	var center = new google.maps.LatLng(data.listaCitypaq[numCitypaq].latitud, data.listaCitypaq[numCitypaq].longitud);
	
	var zoom = 12;
	//si solo hay un cityaq se aumenta el zoom
	if(data.listaCitypaq.length == 1){
		zoom = 16;
	}
	//opciones del mapa	
	var myOptions= {
            zoom: zoom,
            center: center,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: true,
            zoomControlOptions: {
              style: google.maps.ZoomControlStyle.SMALL,
              position: google.maps.ControlPosition.TOP_RIGHT
            },
            panControl: true,
            mapTypeControl: true,
            mapTypeControlOptions:
            {
              position: google.maps.ControlPosition.TOP_LEFT
            },
            scrollwheel: true,//scroll
            streetViewControl: false
          };
	
	var myOptions2= {
            zoom: zoom,
            center: center,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: false,
            panControl: true,
            mapTypeControl: true,
            mapTypeControlOptions:
            {
              position: google.maps.ControlPosition.TOP_RIGHT
            },
            scrollwheel: true,//scroll
            streetViewControl: false
          }
	//Se define mapa con sus opciones
	var map;
	if(screen.width > 650){
		map = new google.maps.Map(document.getElementById("mapCitypaq"), myOptions);
	  }else{
		map = new google.maps.Map(document.getElementById("mapCitypaq"), myOptions2);
	  }
	var infowindow;
	//Se recorre el JSon
	var markers = [];
	//var cp = new String(data.listaCitypaq[0].cod_postal); 
	
  for (var i = 0; i < data.listaCitypaq.length; i++) {
	  infowindow =  new google.maps.InfoWindow({});
      var dataCitypaq = data.listaCitypaq[i];
      var latLng = new google.maps.LatLng(dataCitypaq.latitud,dataCitypaq.longitud);
      var calle = dataCitypaq.des_via +" "+ dataCitypaq.direccion +" "+ dataCitypaq.numero;
      
      var pointerCEX = '/SeguimientoSinCP/images/poi-cornamusa.png';
      var image = new google.maps.MarkerImage(pointerCEX, null, null, null, new google.maps.Size(36,36));

      var marker = new google.maps.Marker({
          position: latLng,
          icon:image,
          title: dataCitypaq.observaciones,
          cod_homepaq: dataCitypaq.cod_homepaq,
          direccionCompleta: calle,
          poblacionycp: dataCitypaq.cod_postal +" - "+ dataCitypaq.desc_localidad,
          map: map
        });
      
      //Se añade al marker el evento click y se añade infowindow
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
    	  return function() {
    		  infowindow.setContent('<div id="tabla" class="tabla"><table>'+
                                  '<tr><th colspan="2"><h5 class="rojoCorreos">'+marker.title+'</h5></th></tr>'+
                                   '<tr><td class="datosOficina">'+ marker.direccionCompleta +'</td></tr>'+
                                   '<tr><td class="datosOficina pobCP">'+ marker.poblacionycp  + '<a class="gestionar" id="poiSelected" onclick="seleccionarCitypaq(\''+marker.cod_homepaq+'\')">Seleccionar</a> </td></tr>'+  
                              "</table></div>");
    		  infowindow.open(map, marker);
    	  }
      })(marker, i, infowindow));

      //Se añade al marker el evento mouseout y se añade infowindow
      google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
      	return function() {
        	infowindow.setContent('<div id="tabla" class="tabla"><table>'+
                  '<tr><th colspan="2"><h5 class="rojoCorreos">'+marker.title+'</h5></th></tr>'+
                   '<tr><td class="datosOficina">'+ marker.direccionCompleta +'</td></tr>'+
                   '<tr><td class="datosOficina pobCP">'+ marker.poblacionycp  + '<a class="gestionar" id="poiSelected" onclick="seleccionarCitypaq(\''+marker.cod_homepaq+'\')">Seleccionar</a> </td></tr>'+  
          		"</table></div>");
        	infowindow.open(map, marker);
      	}
      })(marker, i, infowindow));
	markers.push(marker);
    }
  
  //Se añade la agrupacion de la loibreria Markercluster.js
  var markerCluster = new MarkerClusterer(map, markers,{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}



//Volver desde reintentos de citypaq al detalle del envio
$('.reintentosVolver').click(function() {
	$('#manageShippingFormEC').attr('action', 'search');
	$('#manageShippingFormEC').submit();
});

//Cerrar modal CP erronero
$('#okErrorCPButton').click(function() {
	$('#cityReceiverText').val($('#cityReceiverText').val().substring(0,2));
	$('#errorCPModal').modal('toggle');
});
//Cerrar modal CP erronero Reexpedir
$('#okErrorCPReexpedirButton').click(function() {
	$('#errorCPModalReexpedir').modal('toggle');
});

//Cerrar modal No existen oficinas
$('#okErrorCPButtonnoOfficeModal').click(function() {
	$('#noOfficeModal').modal('toggle');
	if($('#checkOfficeDelivery').is(":visible")){
		$('#deliveryOffice').val("0");
		$('#saveDeliveryOfficeAddressButton').css('display', 'none');
		$('#saveNewAddressButton').css('display', 'initial');
	}
	$('#checkOfficeDelivery').attr('checked', false);
	$('#checkOfficeDelivery').prop("disabled", true);
	if (!$('#dastos-del-destinatario').is(":visible")){
		$('#manageOfficeMap').attr('checked', false);
	}
	if ($('#existOffice').val()=="0"){
		$('#manageOffice').css('display', 'none'); 
	}
});

//Cerrar modal No existen oficinas
$('#okErrorCPButtonnoMondialModal').click(function() {
	$('#noMondialsModal').modal('toggle');
	$('#manageMondialButton').prop('checked', false);
	$('#continueMondial').css('display', 'none');
	
});

//Cerrar modal No existen oficinas
$('#closeModal-nocp').click(function() {
	$('#noOfficeModal').modal('toggle');
	if($('#checkOfficeDelivery').is(":visible")){
		$('#deliveryOffice').val("0");
		$('#saveDeliveryOfficeAddressButton').css('display', 'none');
		$('#saveNewAddressButton').css('display', 'initial');
	}
	$('#checkOfficeDelivery').attr('checked', false);
	$('#checkOfficeDelivery').prop("disabled", true);
	if (!$('#dastos-del-destinatario').is(":visible")){
		$('#manageOfficeMap').attr('checked', false);
	}
	if ($('#existOffice').val()=="0"){
		$('#manageOffice').css('display', 'none'); 
	}
});

//Cerrar modal No existen oficinas
$('#okErrorOfficeButtonerrorOfficeModal').click(function() {
	if($('#checkOfficeDelivery').is(":visible")){
		$('#deliveryOffice').val("0");
		$('#saveDeliveryOfficeAddressButton').css('display', 'none');
		$('#saveNewAddressButton').css('display', 'initial');
	}
	$('#errorOfficeModal').modal('toggle');
});

function refreshAddress(){
	
	$.ajax({
		type: "POST",
		url: "validateCP",
		cache: false,
		data: 'cp=' + $('#cityReceiverText').val().substring(0, 5) + '&expedition=' + $('#expedition').val(),
		dataType: 'json',
		success: function (data) {
			//Si es un CP valido
			if (data == "0"){
				
				$('#refreshAddressMessage').css('display', 'block');
				$('#manageECAddress').css('display', 'none');

				$('#newAddressName').val($('#addressDest').val());
				$('#newAddressNumber').val($('#receiveraddressnumber').val());
				$('#newAddressRest').val($('#receiveraddressrest').val());
				$('#div_extension_general').css('display', 'inline-block');
				
				var res = $('#cityReceiverText').val().split(" ");
				$('#cpHiddenDest').val(res[0]);
				
				var longitud = res.length;
				
				if (longitud>1){
					var n = $('#cityReceiverText').val().indexOf(" ");
					$('#cityHiddenDest').val($('#cityReceiverText').val().substring(n));
				}
				else{
					$('#cityHiddenDest').val("");
				}
				
				$('#newAddressCP').val($('#cpHiddenDest').val());
				$('#newAddressCity').val($('#cityHiddenDest').val());
				
				$('html, body').animate({
			        scrollTop: $("#refreshAddressMessage").offset().top}, 2000);
				
				$.ajax({
					type: "POST",
					url: "getDates",
					cache: false,
					data: 'expedition=' + $('#expedition').val()+'&cp=' + $('#cityReceiverText').val().substring(0, 5),
					dataType: 'json',
					success: function (data) {
						if (data[0].ERROR=="--"){
							$("#fechaCarta5").prop("checked", true);
							$("#fechaCarta1").prop("checked", false);
							$("#fechaCarta2").prop("checked", false);
							$("#fechaCarta3").prop("checked", false);
							$("#fechaCarta4").prop("checked", false);
							$('#pickupDateDayValue').attr('disabled', 'disabled');
						    $('#pickupDateDayValue').val('');
							$('#unencapsulateDates').css('display', 'inline-block');
							$('#fechaCarta1').val(data[0].FECHA1.split('|')[0]);
							$('#fechaCarta1Desc').html(data[0].FECHA1.split('|')[1]);
							$('#fechaCarta2').val(data[0].FECHA2.split('|')[0]);
							$('#fechaCarta2Desc').html(data[0].FECHA2.split('|')[1]);
							$('#fechaCarta3').val(data[0].FECHA3.split('|')[0]);
							$('#fechaCarta3Desc').html(data[0].FECHA3.split('|')[1]);
						}
					}
				});
			}
			if (data == "1"){
				if($('#countryHiddenDest').val() == 'PT'){
					$('#errorCPModalReexpedir').modal();
				} else {
					$('#errorCPModal').modal();
				}
				
			}
		}
	});
}

/** Recogida en oficina **/
//Hacemos click en el boton de Recogida en oficina
$('#manageOfficeButton').click(function() {
	$("#select_extension").val('');
	$('#ampliacionInstrucciones').val($('#select_extension').val());
	$('#refreshAddressMessage').css('display', 'none');
	$("#fechaCarta1").prop("checked", false);
	$("#fechaCarta2").prop("checked", false);
	$("#fechaCarta3").prop("checked", false);
	$("#fechaCarta4").prop("checked", false);
	$('#pickupDateDayValue').attr('disabled', 'disabled');
    $('#pickupDateDayValue').val('');
    $('#horas').hide();
    $('#errorMensajeFecha').hide();
    $('#div_extension_general').css('display', 'none');
	$('#unencapsulateDates').css('display', 'none');
	$('#divPickupDateDay').css('display', 'none');
	abrirPopUp('dateOfficeModal');
	$('.searchOfficeDiv').css('display', 'block'); 	
	$('#continue').css('display', 'none');
	$('#notValidPhoneError').css('display', 'none'); 
	$('#errorValidPhone').css('display', 'none'); 
	$('#opcionesCitypaq').css('display', 'none');
	$('#codigoCitypaq').prop('checked', false);
	$('#listadoCitypaq').prop('checked', false);
	$('#campoCodigoCitypaq').css('display', 'none');
	$('#listaCitypaq').css('display', 'none');
	$('#labelCodigoCitypaq').removeClass('addCodigoCitypaq');
	
});

//Obtenemos los datos de las oficinas en el CP por primera vez
function getOfficesData(origin){
	
	var cp = $('#zipCode').val();
	var city = $('#city').val();
	var origenLlamada = $('#origenLlamada').val();
	
	if($('#deliveryOffice').val()== "1"){				
		cp= $('#cpHiddenDest').val();
		city= $('#cityHiddenDest').val();
	}
	
	if(origin == "1"){				
		cp= $('#cpHiddenDest').val();
		city= $('#cityHiddenDest').val();
		origenLlamada = 1;
	}
	
	if (origin=="2"){
        cp = document.getElementById("inputBuscar").value;
		city="";
		origenLlamada = 1;
	}
	
	$.ajax({
		type: "POST",
		url: "getListOffice",
		cache: false,
		data: 'cp=' + cp + '&city=' + city + '&origenLlamada=' + origenLlamada,
		dataType: 'json',
		success: function (data) {
			if (data && data != "") {
				//No existen oficinas
				if (data.numberOfOffices == 0) {
					$('#cpHiddenDest').val($('#cpHiddenDestOld').val());
					$('#cityHiddenDest').val($('#cityHiddenDestOld').val());
					abrirPopUp('noOfficeModal');
					$('#image_buscar_lupa').css('display', 'block');
					$('#deliveryOffice').val("0");
					$("#manageOfficeButton").removeAttr('checked');
					//$('#manageOffice').css('display', 'none'); 
				}
				else{						
					//Se produjo un error en la obtencion de las oficinas o no las hay
					if(data.numberOfOffices == -1){
						$('#cpHiddenDest').val($('#cpHiddenDestOld').val());
						$('#cityHiddenDest').val($('#cityHiddenDestOld').val());
						abrirPopUp('noOfficeModal');
						$('#image_buscar_lupa').css('display', 'block');
						$('#deliveryOffice').val("0");
						$("#manageOfficeButton").removeAttr('checked');
						//$('#manageOffice').css('display', 'none'); 
					}
					//Existen varias oficinas en el CP
					else{
						$('#existOffice').val("1");
						$('#cpHiddenOffice').val(cp);
						$('#cityHiddenOffice').val(city);
						$('#cityOfficeText').val(cp+' '+city);
						//loadOfficesList(data);
						$('.popup-overlay').show();
						$('.popup-select_oficina').fadeIn();
						//Abrir modal
						$('#mapOffice').width(screen.width);
						$('#modalContainer').width(screen.width);
						$('#manageECAddress').css('display', 'none');
						$('#listOfficeModal').modal();
						//Inicicalizar mapa
						initMap(data);
						//Solucionar el problema del refresco del mapa en un modal
						$("#listOfficeModal").on("shown.bs.modal", function () {
						    google.maps.event.trigger(mapOffice, "resize");
						});
					}
				}
			}
			//Se produjo un error en la obtencion de las oficinas
			else {
				abrirPopUp('errorOfficeModal');
				$('#image_buscar_lupa').css('display', 'block');
			}
		
		}
	});
	
}

//Obtenemos los datos de las oficinas en el CP por primera vez
function getMondialsData(origin){
	
	var cp = $('#zipCode').val();
	var city = $('#city').val();
	var origenLlamada = $('#origenLlamada').val();
	
	if($('#deliveryOffice').val()== "1"){				
		cp= $('#cpHiddenDest').val();
		city= $('#cityHiddenDest').val();
	}
	
	if(origin == "1"){				
		cp= $('#cpHiddenDest').val();
		city= $('#cityHiddenDest').val();
		origenLlamada = 1;
	}
	
	if (origin=="2"){
        cp = document.getElementById("inputBuscar").value;
		city="";
		origenLlamada = 1;
	}
	
	$.ajax({
		type: "POST",
		url: "getListMondial",
		cache: false,
		data: 'zipCode=' + cp+'&countryDest='+$('#countryHiddenDest').val(),
		dataType: 'json',
		success: function (data) {
			if (data && data != "") {
				//No existen oficinas
				if (data.numberOfMondials == 0) {
					$('#cpHiddenDest').val($('#cpHiddenDestOld').val());
					$('#cityHiddenDest').val($('#cityHiddenDestOld').val());
					abrirPopUp('noMondialsModal');
					$('#image_buscar_lupa').css('display', 'block');
					$('#deliveryOffice').val("0");
					$("#manageOfficeButton").removeAttr('checked');
					//$('#manageOffice').css('display', 'none'); 
				}
				else{						
					//Se produjo un error en la obtencion de las oficinas o no las hay
					if(data.numberOfMondials == -1){
						$('#cpHiddenDest').val($('#cpHiddenDestOld').val());
						$('#cityHiddenDest').val($('#cityHiddenDestOld').val());
						abrirPopUp('noMondialsModal');
						$('#image_buscar_lupa').css('display', 'block');
						$('#deliveryOffice').val("0");
						$("#manageOfficeButton").removeAttr('checked');
						//$('#manageOffice').css('display', 'none'); 
					}
					//Existen varias oficinas en el CP
					else{
						$('#existOffice').val("1");
						$('#cpHiddenOffice').val(cp);
						$('#cityHiddenOffice').val(city);
						$('#cityOfficeText').val(cp+' '+city);
						//loadOfficesList(data);
						$('#manageECAddress').css('display', 'none');
						loadMondialsList(data);
						$('#enterMondialModal').modal({
						    backdrop: 'static',
						    keyboard: false
						});
						$('#searchMondialResultsTable').show();
					}
				}					
			}
			//Se produjo un error en la obtencion de las oficinas
			else {
				abrirPopUp('errorOfficeModal');
				$('#image_buscar_lupa').css('display', 'block');
			}
			desactivarPantallaRefresco();
		}
	});
	
}


//Cerrar modal oficinas erronero
$('#okErrorOfficeButton').click(function() {
	$('#deliveryOffice').val('0');
	cerrarPopUp('errorOfficeModal');
	if ($('#existOffice').val()=="0"){
		$('#manageOffice').css('display', 'none'); 
	}
});

//Cerrar modal no existen oficinas
$('#okNoOfficeButton').click(function() {
	cerrarPopUp('noOfficeModal');
	$('.popup-overlay').show();
	if($('#checkOfficeDelivery').is(":visible")){
		$('#deliveryOffice').val("0");
		$('#saveDeliveryOfficeAddressButton').css('display', 'none');
		$('#saveNewAddressButton').css('display', 'initial');
	}
});

//Click en el boton de cancelar de la seleccion de oficinas
$('#cancelListOfficeButton').click(function() {
	cerrarPopUp('listOfficeModal');
	$('#manageOfficeButton').prop('checked', false);
	$("#checkOfficeDelivery").removeAttr('checked');
	$('#deliveryOffice').val('0');
	$('#manageECAddress').css('display', 'none');
	$('#saveDeliveryOfficeAddressButton').css('display', 'none');
	$('#saveNewAddressButton').css('display', 'initial'); 
});

//Click en el boton de cerrar de la seleccion de oficinas
$('#closeListOfficeButton').click(function() {
	cerrarPopUp('listOfficeModal');
	$('#manageOfficeButton').prop('checked', false);
	$("#checkOfficeDelivery").removeAttr('checked');
	$('#deliveryOffice').val('0');
	$('#manageECAddress').css('display', 'none');
	$('#dastos-del-destinatario').css('display', 'none');	
	$('#saveDeliveryOfficeAddressButton').css('display', 'none');
	$('#saveNewAddressButton').css('display', 'initial');
	$('#manageOfficeMap').removeAttr('checked');
	$("#fechaCarta1").prop("checked", false);
	$("#fechaCarta2").prop("checked", false);
	$("#fechaCarta3").prop("checked", false);
	$("#fechaCarta4").prop("checked", false);
	$('#pickupDateDayValue').attr('disabled', 'disabled');
    $('#pickupDateDayValue').val('');
    $('#horas').hide();
});

//Cargamos los datos de las oficinas en la talba
function loadMondialsList(data) {
	var options = {
		source: data.mondials,
		rowClass: "filaOficina"
	};

 	$('#searchMondialResultsTable').jsonTable({
 		json : ['nombreMondial', 'direccionCompleta','calendario']
	});

 	$('#searchMondialResultsTable').jsonTableUpdate(options);

 	var paginationOptions = {
     	 currPage : 1,
         rowsPerPage : 10,
         pageMsg: pageMsgText,
 		 ofMsg: ofMsgText,
     };
 	$('#searchMondialResultsTable').tablePagination(paginationOptions);
}

(function ( $ ) {
	$.fn.jsonTable = function( options ) {
        var settings = $.extend({
            head: [],
            json:[]
        }, options, { table: this } );

        table = this;

        table.data("settings",settings);

        if (table.find("thead").length == 0) {
            table.append($("<thead></thead>").append("<tr></tr>"));
        }

        if (table.find("thead").find("tr").length == 0) {
            table.find("thead").append("<tr></tr>");
        }

        if (table.find("tbody").length == 0) {
            table.append($("<tbody></tbody>"));
        }

        $.each(settings.head, function(i, header) {
            table.find("thead").find("tr").append("<th>"+header+"</th>");
        });

        return table;
    };

    $.fn.jsonTableUpdate = function( options ){
        var opt = $.extend({
            source: undefined,
            rowClass: undefined,
            callback: undefined
        }, options );
        var settings = this.data("settings");

        if(typeof opt.source == "string")
        {
        	$.get(opt.source, function(data) {
        		$.fn.updateFromObj(data,settings,opt.rowClass, opt.callback);
            });
        }
        else if(typeof opt.source == "object")
        {
        	$.fn.updateFromObj(opt.source,settings, opt.rowClass, opt.callback);
        }
    }

    $.fn.updateFromObj = function(obj,settings,rowClass, callback){
        settings.table.find("tbody").empty();
        $.each(obj, function(i,line) {
            var tableRow = $("<tr></tr>").addClass(rowClass);

            $.each(settings.json, function(j, identity) {
            	if(identity=='calendario'){
            		tableRow.append($("<td name='calendario'><img style='width: 100%;' src='/SeguimientoSinCP/images/calendario.png'></td>"));
            	}else{
            		tableRow.append($("<td>" + line[this] + "</td>"));
            	}
            });
			tableRow.click(
				function(event) {
					if( $(event.target).context.localName !="img"){
						officeListRowSelected(JSON.stringify(line));
					}else{
						abrirHorario(line.horario);
					}
				}
			);
			tableRow.hover(
				function() {
					$(this).addClass('filaOficinaSeleccionada');
				}, function() {
					$(this).removeClass('filaOficinaSeleccionada');
				}
			);
			
            settings.table.append(tableRow);
        });


        if (typeof callback === "function") {
            callback();
        }
    }

}( $ ));

function abrirHorario(horario){
	$('#horarioSemanal').append(horario);
	$("#enterMondialModal").css("z-index", '0');
	$('#horarioPunto').modal({
	    backdrop: 'static',
	    keyboard: false
	});
}

//Cuando se selecciona una oficina de la tabla
function officeListRowSelected(data)
{
	var json = JSON.parse(data);
	fillMondialInfoFromCp(json);
}


function fillOfficeInfoFromCp(cp,poblacion,direccionCalle,direccionNumero,direccionResto,codigo,delegacion,nombreDelegacion)
{
	
	$('#cpHiddenDest').val(cp);
	$('#cityHiddenDest').val(poblacion);
	$('#cityReceiverText').val(cp+' '+poblacion);
	$('#addressDest').val(direccionCalle);
	$('#receiveraddressnumber').val(direccionNumero);
	$('#receiveraddressrest').val(direccionResto);
	$('#codOficina').val(codigo);
	$('#delegacion').val(delegacion);
	$('#newAddressCPOffice').val(cp);
	$('#newAddressCityOffice').val(poblacion);
	$('#newAddressNameOffice').val(direccionCalle);
	$('#newAddressNumberOffice').val(direccionNumero);
	$('#newAddressRestOffice').val(direccionResto);
	$('#observations').val(nombreDelegacion);
	$('#observations').attr('readonly', true);
	setOfficeData();
	$("#backFromECButton").show();
	cerrarPopUp('listOfficeModal');	
	//$("#checkOfficeDelivery").removeAttr('checked');
	$('#dastos-del-destinatario').css('display', 'block');
	$('#saveNewDeliveryButton').css('display', 'inline-block');
	
}


function fillMondialInfoFromCp(data,nombreDelegacion)
{
	$('#continueMondial').show();
	$('#manageShippingFormEC').show();
	$('#cpHiddenDest').val(data.cp);
	$('#cityHiddenDest').val(data.poblacion);
	$('#cityReceiverText').val(data.cp+' '+data.poblacion);
	$('#addressDest').val(data.direccionCalle);
	$('#receiveraddressnumber').val(data.direccionNumero);
	$('#receiveraddressrest').val(data.direccionResto);
	$('#codMondial').val(data.codigo);
//	$('#delegacion').val(delegacion);
	$('#newAddressCPMondial').val(data.cp);
	$('#newAddressCityMondial').val(data.poblacion);
	$('#newAddressNameMondial').val(data.direccionCalle);
	$('#newAddressNumberMondial').val(data.direccionNumero);
	$('#newAddressRestMondial').val(data.direccionResto);
	$('#newAddressMondial').val(data.direccionResto);
	$('#newAddressCountryMondial').val($('#countryHiddenDest').val());
	$('#mondialNameRow').val(data.nombreMondial);
	$('#mondialName').val(data.nombreMondial);
	$('#nombreMondialRow').css('display', 'block');
	$('#observations').val(nombreDelegacion);
	$('#observations').attr('readonly', true);
	setMondialData();
	cerrarPopUp('enterMondialModal');	
	$('#dastos-del-destinatario').css('display', 'block');
	$('#saveNewDeliveryButton').css('display', 'inline-block');
	
}
//Seteamos los datos de la oficina en la pantalla
function setOfficeData(){
	
	$('#manageECAddress').css('display', 'block');
	$('#deliveryOffice').val('1');
	$('#entregaECDiv').css('display', 'none');
	$('#imagenFlechas').css('display', 'none');		
	$('#textoFlechas').css('display', 'none');		
	$('#openDiv').css('display', 'none');
	$('#updateAddressDiv').css('display', 'none');
	$('#continueOffice').show();
	$('#addressDest').attr('disabled','disabled');
	$('#receiveraddressnumber').attr('disabled','disabled');
	$('#receiveraddressrest').attr('disabled','disabled');
		
}

//Seteamos los datos del punto mondial en la pantalla
function setMondialData(){
	
	$('#manageECAddress').css('display', 'block');
	$('#deliveryMondial').val('1');
	$('#entregaECDiv').css('display', 'none');
	$('#imagenFlechas').css('display', 'none');		
	$('#textoFlechas').css('display', 'none');		
	$('#openDiv').css('display', 'none');
	$('#updateAddressDiv').css('display', 'none');
	$('#cityReceiverText').attr('disabled','disabled');
	$('#addressDest').attr('disabled','disabled');
	$('#paisDestino').attr('disabled','disabled');
	$('#receiveraddressnumber').attr('disabled','disabled');
	$('#receiveraddressrest').attr('disabled','disabled');
	$('#mondialNameRow').attr('disabled','disabled');
	
}

//Si el origen es 1 viene de la pantalla - Si el origen es 2 viene del pop-up
function validateCPOffice(origin){
	
	var cp= $('#cityReceiverText').val().split(" ")[0];
	
	if (origin =="2"){
        cp = document.getElementById("inputBuscar").value;
	}
		
	$.ajax({
		type: "POST",
		url: "validateCP",
		cache: false,
		data: 'cp=' + cp+ '&expedition=' + $('#expedition').val(),
		dataType: 'json',
		success: function (data) {
			//Si es un CP valido
			if (data == "0"){
				$('#image_buscar_lupa').css('display', 'none');
				getOfficesData(origin);
			}
			if (data == "1"){
				abrirPopUp('errorCPModal');
				$('#continueOffice').hide();
			}
		} 
	});
}

/** FIN Recogida en oficina **/

//Evitamos pegar y cortar
$('#cityOfficeText').bind("cut paste",function(e) {
      e.preventDefault();
});

$("#cityOfficeText").keydown(function(e) {
	document.getElementById('cityOfficeText').setSelectionRange(document.getElementById('cityOfficeText').value.length, document.getElementById('cityOfficeText').value.length); 
	
	if ( (window.getSelection().toString() != '' && document.getElementById('cityOfficeText').value.slice(0, document.getElementById('cityOfficeText').selectionStart).length < 2) ||
			(window.getSelection().toString() == '' && document.getElementById('cityOfficeText').value.slice(0, document.getElementById('cityOfficeText').selectionStart).length <= 2 
					&& (e.keyCode == 8 || e.keyCode == 46))) {
		e.preventDefault();
		$('#cityOfficeText').val($('#cityOfficeText').val().substring(0,2));
	}
	shiftTab(e);	
});

$("#cityOfficeText").keyup(function(e) {
	if ($('#cityOfficeText').attr('readonly') != "" ||
			$('#cityOfficeText').attr('readonly') != "readonly") {
		selectorKeyUpDownOffice(e);
	}
});

$('#searchOfficeCpButton').click(function() {	
	cerrarPopUp('listOfficeModal');
	validateCPOffice("2");
});


function onBlurCPOffice() {
	var city = $('#cityOfficeText').val().trim();
	var cpHidden = $('#cpHiddenOffice').val();
	var cityHidden = $('#cityHiddenOffice').val();
	var comprobar = cpHidden+" "+cityHidden;

	if(city != comprobar || city == "") {
		if ($('#contentCityOffice ul li').length) {
			$('#cityHiddenOffice').val('');
			$('#cpHiddenOffice').val('');
		}
		
	}
	else {
		$('#contentCityOffice').hide();
		
	}
}


function selectorKeyUpDownOffice(e) {
	if (e.keyCode == 38) { //up
		e.preventDefault();
		var selected = $(".selected_POB_Dest");
		
		// if there is no element before the selected one, we select the last one
		if (selected.prev().length != 0) {
			// otherwise we just select the next one
			$("li").removeClass("selected_POB_Dest");
			selected.prev().addClass("selected_POB_Dest");
			manageUpOffice();
		}
	} else if (e.keyCode == 40) { //down
		e.preventDefault();
		var selected = $('.selected_POB_Dest');
		if (selected.next().length != 0) {
			$("li").removeClass('selected_POB_Dest');
			selected.next().addClass('selected_POB_Dest');
			manageDownOffice();
		}
	} else if (e.keyCode == 13) { //enter
		e.stopPropagation();
		
		if ($(".selected_POB_Dest").length) {
			var selected = $('.selected_POB_Dest a');
			selectCp(selected);
		}
	} else {
		$("#ulPob_Dest").scrollTop(0);
		edValueKeyUpCPOffice('getPobCp');
	}
}


function manageUpOffice() {
	if (currentScrollValueOffice==startScrollOffice){
    	$(".listOfficeModal #ulPob_Dest").animate({ scrollTop: "-=25" }, 100);
    	startScrollOffice=startScrollOffice-1;
    	endScrollOffice=endScrollOffice-1;
     }
	currentScrollValueOffice=currentScrollValueOffice-1;
}

function manageDownOffice() {
	if (currentScrollValueOffice==endScrollOffice){
    	$(".listOfficeModal #ulPob_Dest").animate({ scrollTop: "+=25" }, 100);
    	startScrollOffice=startScrollOffice+1;
    	endScrollOffice=endScrollOffice+1;
     }
	currentScrollValueOffice=currentScrollValueOffice+1;
}

function edValueKeyUpCPOffice(action) {
	var city = $('#cityOfficeText').val().trim();
	var cpHidden = $('#cpHiddenOffice').val();
	var cityHidden = $('#cityHiddenOffice').val();
	var country = "ES";
	var comprobar = cpHidden+" "+cityHidden;
	
	if(city.length > 1) {
		if(city != comprobar) {
			$('#floatingBarsG_POB_Office').css('display', 'block');
			$('#contentCityOffice').hide();
			
			$.ajax({
				type: "POST",
				url: action,
				data: "country="+country+"&text="+city,
				success: function (data) {
					responseValidationCPOffice(data);
				}
			});
		}
	}
	else {
		$('#contentCityOffice').hide();
		$('li').removeClass('selected_POB_Dest');
		$('#cpHiddenOffice').val('');
		$('#cityHiddenOffice').val('');
	}
}

function responseValidationCPOffice(data) {
	$('#contentCityOffice').html(data);
	$('#floatingBarsG_POB_Office').css('display', 'none');
	$('#contentCityOffice').show();
	if ($('#contentCityOffice ul li').length == 1) {
		$('#cityOfficeText').val($('#contentCityOffice ul li a').text());			
	    $('#cpHiddenOffice').val($('#contentCityOffice ul li a').attr('textCP'));
	    $('#cityHiddenOffice').val($('#contentCityOffice ul li a').attr('textPob'));
		$('#contentCityOffice').hide();		
		$('li').removeClass('selected_POB_Dest');
				
	}
}

function limpiarFieldOffice() {
	$('#cityOfficeText').val($('#cityOfficeText').val().substring(0,2));
}
function cerrarPopUp(popUpId){
	$('.modal-backdrop').remove();
	$('#'+popUpId).modal('toggle');
}

function abrirPopUp(popUpId){	
	$('.popup-overlay').show();
	$('#'+popUpId).css('z-index', 3000);
	setTimeout(function(){$('#'+popUpId).modal()}, 300);
}

/** FIN Recogida en oficina **/

//MAPA
function initMap(data) {
	
    var flag = false;
	var numOficina = 0;

	var center = new google.maps.LatLng(data.offices[numOficina].latitud, data.offices[numOficina].longitud);
	
	var zoom = 12;
	//si solo hay una oficina se aumenta el zoom
		if(data.offices.length == 1){
			zoom = 16;
		}
	//opciones del mapa	
	var myOptions= {
            zoom: zoom,
            center: center,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: true,
            zoomControlOptions: {
              style: google.maps.ZoomControlStyle.SMALL,
              position: google.maps.ControlPosition.TOP_RIGHT
            },
            panControl: true,
            mapTypeControl: true,
            mapTypeControlOptions:
            {
              position: google.maps.ControlPosition.TOP_LEFT
            },
            scrollwheel: true,//scroll
            streetViewControl: false
          };
	
	var myOptions2= {
            zoom: zoom,
            center: center,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: false,
            panControl: true,
            mapTypeControl: true,
            mapTypeControlOptions:
            {
              position: google.maps.ControlPosition.TOP_RIGHT
            },
            scrollwheel: true,//scroll
            streetViewControl: false
          }
	//Se define mapa con sus opciones
	var map;
	if(screen.width > 650){
		map = new google.maps.Map(document.getElementById("mapOffice"), myOptions);
	  }else{
		map = new google.maps.Map(document.getElementById("mapOffice"), myOptions2);
	  }
	var infowindow;
	//Se recorre el JSon
	var markers = [];
	var cp = new String(data.offices[0].cp); 
	
  for (var i = 0; i < data.offices.length; i++) {
	  infowindow =  new google.maps.InfoWindow({});
      var dataOffices = data.offices[i];
      var latLng = new google.maps.LatLng(dataOffices.latitud,dataOffices.longitud);
      var calle = dataOffices.direccionCalle +" "+ dataOffices.direccionNumero;
      if(dataOffices.direccionResto != null && dataOffices.direccionResto != ''){
    	  calle = calle + ", "+ dataOffices.direccionResto;
      }
      
      var pointerCEX = '/SeguimientoSinCP/images/poi-cornamusa.png';
      var image = new google.maps.MarkerImage(pointerCEX, null, null, null, new google.maps.Size(36,36));

      var marker = new google.maps.Marker({
          position: latLng,
          icon:image,
          title: dataOffices.nombreOficina,
          poblacion: dataOffices.poblacion,
          cp: dataOffices.cp,
          direccion: dataOffices.direccionCalle,
          numero: dataOffices.direccionNumero,
          resto: dataOffices.direccionResto,
          codigo: dataOffices.codigo,
          delegacion: dataOffices.delegacion,
          direccionCompleta: calle,
          poblacionycp: dataOffices.poblacion +" - "+ dataOffices.cp,
          map: map
        });
//Se añade al marker el evento click y se añade infowindow
google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        infowindow.setContent('<div id="tabla" class="tabla"><table>'+
                                                  '<tr><th colspan="2"><h5 class="rojoCorreos">'+marker.title+'</h5></th></tr>'+
                                                   '<tr><td class="datosOficina">'+ marker.direccionCompleta +'</td></tr>'+
                                                   '<tr><td class="datosOficina pobCP">'+ marker.poblacionycp  + '<a class="gestionar" id="poiSelected" onclick="infowindow(\''+marker.cp+'\','+'\''+marker.poblacion+'\','+'\''+marker.direccion+'\','+'\''+marker.numero+'\','+'\''+marker.resto+'\','+'\''+marker.codigo+'\','+'\''+marker.delegacion+'\','+'\''+marker.title+'\')">Seleccionar</a> </td></tr>'+  
                                              "</table></div>");
                        infowindow.open(map, marker);
                    }
                })(marker, i, infowindow));

//Se añade al marker el evento mouseout y se añade infowindow
google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
                    return function() {
                        infowindow.setContent('<div id="tabla" class="tabla"><table>'+
                                                  '<tr><th colspan="2"><h5 class="rojoCorreos">'+marker.title+'</h5></th></tr>'+
                                                   '<tr><td class="datosOficina">'+ marker.direccionCompleta +'</td></tr>'+
                                                   '<tr><td class="datosOficina pobCP">'+ marker.poblacionycp  + '<a class="gestionar" id="poiSelected" onclick="infowindow(\''+marker.cp+'\','+'\''+marker.poblacion+'\','+'\''+marker.direccion+'\','+'\''+marker.numero+'\','+'\''+marker.resto+'\','+'\''+marker.codigo+'\','+'\''+marker.delegacion+'\','+'\''+marker.title+'\')">Seleccionar</a> </td></tr>'+  
                                              "</table></div>");
                        infowindow.open(map, marker);
                    }
                })(marker, i, infowindow));
	markers.push(marker);
    }
  //Se añade la agrupacion de la loibreria Markercluster.js
  var markerCluster = new MarkerClusterer(map, markers,{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
  //se añade al mapa nuestro input de buscar
  if(!$('#checkOfficeDelivery').is(":visible")){
	  var postalCodeDiv = document.createElement('div');
	  new PostalCodeControl(postalCodeDiv, map, cp);
	  postalCodeDiv.index = 1;
	  map.controls[google.maps.ControlPosition.TOP_LEFT].push(postalCodeDiv);
  }
}

function PostalCodeControl(postalCodeDiv, map, cp) {

	  var controlUI = document.createElement('div');
	  controlUI.style.cursor = 'pointer';
	  controlUI.setAttribute("id", "containerSearchPostCodeMap");
	  controlUI.setAttribute("class", "buscador");
	  postalCodeDiv.appendChild(controlUI);

	  var inputBuscar = document.createElement('input');
	  inputBuscar.setAttribute("id", "inputBuscar");
	  inputBuscar.setAttribute("class", "buscar");
	  inputBuscar.setAttribute("type", "text");
	  inputBuscar.setAttribute("placeholder", "Codigo postal");
	  inputBuscar.setAttribute("onkeydown", "restriccionesInputBuscar()");
	  inputBuscar.setAttribute("onfocus", "comportamientoFocus('"+ cp +"')");
	  inputBuscar.setAttribute("maxlength", "5");

	  var inputImagen = document.createElement('input');
	  inputImagen.setAttribute("id", "image_buscar_lupa");
	  inputImagen.setAttribute("class", "image_buscar");
	  inputImagen.setAttribute("type", "image");
	  inputImagen.setAttribute("src", "../SeguimientoSinCP/images/responsive-buscador.png");
	  inputImagen.setAttribute("onclick", "busqueda()");

	  var controlText = document.createElement('div');
	  controlUI.appendChild(inputBuscar);
	  controlUI.appendChild(inputImagen);
	  controlUI.appendChild(controlText);

	}
function infowindow(cp,poblacion,direccionCalle,direccionNumero,direccionResto,codigo,delegacion,nombreDelegacion) {
	$('#horas').hide();
	//Resetean los campos
	$('#receiveraddressnumber').val("");
	$('#receiveraddressrest').val("");
	$('#cityReceiverText').val("");
	$('#addressDest').val("");
	//Se pone valor
	$('#cityReceiverText').val(cp + " " + poblacion);
	$('#addressDest').val(direccionCalle);
	$('#receiveraddressnumber').val(direccionNumero);
	$('#receiveraddressrest').val(direccionResto);
	$('#observations').val(nombreDelegacion);
	$('#observations').attr('readonly', true);
	
	$('#listOfficeModal').modal('toggle');
	$('#continueOffice').show();
	setOfficeData();
	fillOfficeInfoFromCp(cp,poblacion,direccionCalle,direccionNumero,direccionResto,codigo,delegacion,nombreDelegacion);
	cerrarPopUp('listOfficeModal');
	$("#checkOfficeDelivery").removeAttr('checked');
	$('#dastos-del-destinatario').css('display', 'block');
	$('#saveNewDeliveryButton').css('display', 'inline-block');
	
}
function busqueda() {
	validateCPOffice("2");
	$('#deliveryOffice').val("1");
} 

function restriccionesInputBuscar() {
	document.getElementById('inputBuscar').setSelectionRange(document.getElementById('inputBuscar').value.length, document.getElementById('inputBuscar').value.length);
}

function comportamientoFocus(cp) {	
	    document.getElementById("inputBuscar").value = cp.toString().substr(0,2);
	    document.getElementById("inputBuscar").style.width="40%";
	    document.getElementById("inputBuscar").placeholder="";
	    document.getElementById("inputBuscar").style.margin="0px 0px 0px 28px";
	    document.getElementById("containerSearchPostCodeMap").style.width="140px";
	    document.getElementById("containerSearchPostCodeMap").style.marginTop = "8%";
	    
	    document.getElementById('inputBuscar').addEventListener('keydown',function(e) {
	  	  var code = e.which || e.keyCode,allowedKeys = [9,13,27,35,36,37,38,39,40];
	  	  if(document.getElementById('inputBuscar').value.length>2 && code == 8){
	  	    allowedKeys.push(8);
	  	  }
	  	  
	  	  if(allowedKeys.indexOf(code) > -1) {
	  	    return;
	  	  }
	  	  
	  	  if((e.shiftKey || (code < 48 || code > 57)) && (code < 96 || code > 105)) {
	  	    e.preventDefault();
	  	  }
	  	});
} 

var pulseBoton = 0;
/** Gestion de envios **/
$(document).ready(function() {
	if($('#dataModify').val() !=2 && $('#deliveryAttempts').val() === '0'){
		$('#fecha-concertada').css('display', 'block');
		$('#horario-manana').css('display', 'block');
		if ( !$('#datetimeFromAfternoon').val() && !$('#datetimeToAfternoon').val() ){
			$('#horario-tarde').css('display', 'none');
		}else{
			$('#horario-tarde').css('display', 'block');
		}
		//$('#horario-tarde').css('display', 'block');
		$('#saveNewDeliveryButton').css('display', 'inline-block');
	}
	pulseBoton = 0;
});


//Hacemos click en el boton de Recogida en oficina
$('#manageOfficeMap').click(function() {
	$('#cpHiddenDest').val($('#cpHiddenDestOld').val());
	$('#cityHiddenDest').val($('#cityHiddenDestOld').val());
	hiddenAllGestionEnvio();
	abrirPopUp('dateOfficeModal');
	$('.searchOfficeDiv').css('display', 'block'); 
	$('#deliveryOffice').val("1");
	pulseBoton = 1;
});

//Hacemos click en el boton de cambiar direccion
$('#manageAddressECButtonMap').click(function() {
	hiddenAllGestionEnvio();
	displayAllGestionEnvio();
	$( "#addressDest" ).prop( "disabled", false );
	$( "#receiveraddressnumber" ).prop( "disabled", false );
	$( "#receiveraddressrest" ).prop( "disabled", false );
	$('#deliveryOffice').val("0");
	$('#codOficina').val("");
	$('#delegacion').val("");	
	
	if(pulseBoton == 0) {
		$('#cityReceiverText').val($('#cpHiddenDestOld').val()+' '+$('#cityHiddenDestOld').val());
		$('#receiveraddressnumber').val($('#numberHiddenDestOld').val());
		$('#receiveraddressrest').val($('#restHiddenDestOld').val());
		$('#addressDest').val($('#addressHiddenDestOld').val());	
		$('#observations').val($('#observationsOld').val());
	}
	$('#observations').attr('readonly', false);
	pulseBoton = 0;
});

//Hacemos click en el botón de recogida en nave
$('#manageWarehouseInput').click(function() {
	hiddenAllGestionEnvio();
	$('#email-confirmacion').css('display', 'block');
	$('#manageWarehouseInput').attr('checked', true);

});

//Hacemos click en el boton de cambiar fecha de entrega
$('#manageChangeDate').click(function() {
	$('#dastos-del-destinatario').css('display', 'none');
	$('#fecha-concertada').css('display', 'block');
	//$('#horario-tarde').css('display', 'block');
	if ( !$('#datetimeFromAfternoon').val() && !$('#datetimeToAfternoon').val() ){
		$('#horario-tarde').css('display', 'none');
	}else{
		$('#horario-tarde').css('display', 'block');
	}
	$('#horario-manana').css('display', 'block');
	$('#saveNewDeliveryButton').css('display', 'inline-block');
	$('#deliveryOffice').val("0");
	$('#codOficina').val("");
	$('#delegacion').val("");
	$('#observations').val($('#observationsOld').val());
	$('#observations').attr('readonly', false);
	
	pulseBoton = 1;
	
});

function displayAllGestionEnvio() {
	$('#dastos-del-destinatario').css('display', 'block');
	$('#fecha-concertada').css('display', 'block');
	//$('#horario-tarde').css('display', 'block');
	if ( !$('#datetimeFromAfternoon').val() && !$('#datetimeToAfternoon').val() ){
		$('#horario-tarde').css('display', 'none');
	}else{
		$('#horario-tarde').css('display', 'block');
	}
	$('#horario-manana').css('display', 'block');
	$('#saveNewDeliveryButton').css('display', 'inline-block');
}

function hiddenAllGestionEnvio() {
	$('#dastos-del-destinatario').css('display', 'none');
	$('#email-confirmacion').css('display', 'none');
	
	$('#fecha-concertada').css('display', 'none');
	$('#horario-manana').css('display', 'none');
	$('#horario-tarde').css('display', 'none');
	$('#saveNewDeliveryButton').css('display', 'none');
}
$( "#select_extension" ).change(function() {
	$('#ObsAditionalInstrutions').val('');
	if($("#select_extension" ).val()=='Entrega en Establecimiento Cercano' || $("#select_extension" ).val()=='Entrega a Vecino'){
		$('#divObsAditionalInstrutions').css('display', 'inline-block');
		
	}
	else{
		$("#divObsAditionalInstrutions" ).css('display', 'none');
	}
});

//PODS
$('#podImagen').click(function() {	
	loadPopUpPOD();
	abrirPopUp('podListDialog');	
});

function loadPopUpPOD(){
	var nombre= $('#podNombre').val();
	var firma= $('#podFirma').val().split("-");
	var fecha= $('#podFecha').val();
	
	if (firma!=null && firma!=''){
		$('#podDetailBody').html("");
		for(var i=0; i<firma.length; i++){
			$('#podDetailBody').append("<tr id=\"fila"+i+"\" style=\"cursor:pointer;\" onclick=\"window.open('getPodImage?pod="+firma[i]+"','POD Image', 'width=300,height=30, scrollbar=auto, menubar=no')  \" ><td>"+firma[i]+"</td><td>"+fecha+"</td></tr>");
	  	
		}
	}
		
}



function activarPantallaRefresco(){
	$( "body" ).prepend("<div class='loading' id='cexmodal' style='display: none;'></div>")
	$("#cexmodal").css("display","block");
}

function desactivarPantallaRefresco(){
	$("#cexmodal").css("display","none");
	$("#cexmodal").remove();
}

$('#closeMondialButton').click(function() {	
	$("#backFromECButton").hide();
});
