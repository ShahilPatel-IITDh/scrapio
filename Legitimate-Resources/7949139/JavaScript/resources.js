'use strict';
var CHX = CHX || {};

var currentScrollValueDest = 1;
var startScrollDest = 1;
var endScrollDest = 7;
var currentScrollValueAddrDest = 1;
var startScrollAddrDest = 1;
var endScrollAddrDest = 7;

var currentScrollValueOffice = 1;
var startScrollOffice = 1;
var endScrollOffice = 7;

CHX.tracking = (function () {

  var addEventHandlers = function () {
    installResponsiveHandlers();
  };
  
  var installResponsiveHandlers = function () {
    $('.responsive-hamburguer').click(toggleNavigationMenu);
    $('.responsive-overlay').click(toggleNavigationMenu);

    function toggleNavigationMenu() {
      $('.header-nav').toggleClass('open');
    }
  };

  var installTrackingAnimations = function () {
    var percent = $('.tracking-block').data('progress');
    var $progressValue = $('.progress-value');
    var $progressBar = $('.progress--bar');
    var isDesktopWidht = window.innerWidth > 992;
    /*if (percent > 80) {
      $('.progress-value').hide();
    }*/
    $progressBar.removeAttr('style');
    if (isDesktopWidht) {
      var unitPercentWidth = $('.progress--bg').width() / 100;
      if (percent == 0) {
    	  $progressValue.css('margin-left', '0');
      }
      else {
    	  $progressValue.css('margin-left', ((percent * unitPercentWidth) - 50) + 'px');
      }
      $progressValue.css('margin-top', '0');
      $progressBar.animate({
        width: percent + '%'
      }, 1200, function () {});
    } else {
      var unitPercentHeight = $('.progress--bg').height() / 100;
      if (percent == 0) {
    	  $progressValue.css('margin-top', '0');
      }
      else {
    	  $progressValue.css('margin-top', ((percent * unitPercentHeight) - 16) + 'px');
      }
      $progressValue.css('margin-left', '0');
      $progressBar.animate({
        height: percent + '%'
      }, 1200, function () {});
    }
  };
  
  var onloadHome = function() {
	  if ($('.desktopSearch').length > 0 || $('.mobileSearch').length > 0) {
		  if ($('[name=errorCode]').val() == '-1' || $('[name=errorCode]').val() == '1' || $('[name=errorCode]').val() == '2') {
			$('#homeFormSearchDiv').removeClass('error1 error2 error-1');
			
			$('#homeFormSearchDiv').addClass('error error' + $('[name=errorCode]').val());
			$('#homeBannersDiv').addClass('nopadding');
			
			if ($('[name=errorCode]').val() == '1') {
			  $('#homeBannersDiv').addClass('pull-right');
			}
		  }
		  else {
			$('#homeFormSearchDiv').removeClass('error error1 error2 error-1');
			$('#homeBannersDiv').removeClass('nopadding');
		  }
		  
		  if ($('.mobileSearch').css('display') == 'block') {
			if ($('#shippingNumberMbl').val().trim() != "") {
				var inputValue = $("#shippingNumberMbl").val();
				$("#shippingNumberMbl").focus();
				$("#shippingNumberMbl").val('');
				$("#shippingNumberMbl").val(inputValue);
			}
		  }
		  else {
			if ($('#shippingNumberDkt').val().trim() != "") {
				var inputValue = $("#shippingNumberDkt").val();
				$("#shippingNumberDkt").focus();
				$("#shippingNumberDkt").val('');
				$("#shippingNumberDkt").val(inputValue);
			}
		  }
	  }
  };
  
  var onloadManageAddress = function() {
		if ($('#OkSavedAddress').is(':visible')){
			$('#saveNewAddressButton').prop('disabled', true);
		} else {
			$('#saveNewAddressButton').prop('disabled', false);
		}
  };

  $(function () {
    addEventHandlers();
    installTrackingAnimations();
    onloadHome();
	
    onloadManageAddress();
    
    $(window).on('resizeEnd', function(){
      installTrackingAnimations();
    });

    $(window).resize(function () {
      if (this.resizeTO){
        clearTimeout(this.resizeTO);
      }
      showAndHideDescription();
      this.resizeTO = setTimeout(function () {
        $(this).trigger('resizeEnd');
      }, 500);
    });
  });

})();

(function() {
  'use strict';

  var pickerOptions = {
    allowInputToggle: true,
    icons: {
      time: 'fa fa-clock-o',
      date: 'fa fa-calendar',
      up: 'fa fa-arrow-up',
      down: 'fa fa-arrow-down'
    }
  };

  var initDatePickers = function() {
	  
	var currentLanguague = 'es';
	if($('#currentLocale').text()=='pt'){
	  currentLanguague = 'pt';
	}  
	    
    var datePickerOptions = $.extend({}, pickerOptions, {
      format: 'DD/MM/YYYY',
      locale: currentLanguague,
      defaultDate: moment(),
      calendarWeeks: false
    });
    $('.js-date-selector').datetimepicker(datePickerOptions);
  };

  /*var initTimePickers = function() {
    var timePickerOptionsMorning = $.extend({}, pickerOptions, {
      enabledHours: [8, 9, 10, 11, 12, 13, 14],
      format: 'HH:mm',
      stepping: 60
    });
    var timePickerOptionsAfternoon = $.extend({}, timePickerOptionsMorning, {
      enabledHours: [15, 16, 17, 18, 19, 20]
    });
    $('.js-time-selector-morning').each(function() {
      $(this).datetimepicker(timePickerOptionsMorning);
    });
    $('.js-time-selector-afternoon').each(function() {
      $(this).datetimepicker(timePickerOptionsAfternoon);
    });
  };*/
  
  var initSelectTimes = function() {
	var mornings = ['', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'];
	var selectMornings = '';
	$(mornings).each(function() {
		selectMornings = selectMornings + '<option value="' + this + '">' + this + '</option>';
	});
	$('#datetimeFromMorning').html(selectMornings);
	$('#datetimeToMorning').html(selectMornings);
	$('#datetimeFromMorning option[value="' + $('#datetimeFromMorningHidden').val() + '"]').attr('selected', 'selected');
	$('#datetimeToMorning option[value="' + $('#datetimeToMorningHidden').val() + '"]').attr('selected', 'selected');
	
	var afternoons = ['', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
	var selectAfternoons = '';
	$(afternoons).each(function() {
		selectAfternoons = selectAfternoons + '<option value="' + this + '">' + this + '</option>';
	});
	$('#datetimeFromAfternoon').html(selectAfternoons);
	$('#datetimeToAfternoon').html(selectAfternoons);
	$('#datetimeFromAfternoon option[value="' + $('#datetimeFromAfternoonHidden').val() + '"]').attr('selected', 'selected');
	$('#datetimeToAfternoon option[value="' + $('#datetimeToAfternoonHidden').val() + '"]').attr('selected', 'selected');
  };
  
  
  $(document).ready(function(){
	  $(function() {
	    initDatePickers();
		initSelectTimes();
	  });  
  });
  
  

})();

(function() {
	'use strict';
	
	// Detalle: Mas info
	$('#moreInfoButton').click(function() {
		if ($('.status-desc').css('display') == "none") {
			$('.status-desc').show();
		}
		else {
			$('.status-desc').hide();
		}
	});

	// Detalle: Gestionar envio
	$('#manageShippingButton').click(function() {
		if ($('#zipCode').val().trim() == '' || $('#validacionAdicional').val().trim() == '') {
			$('#enterZipCodeModal').modal();
			$('#gestion').val('0');
		}
		else {
			$('#gestion').val('0');
			console.log($('#tipoValidacionBack').val());
			if ($('#tipoValidacionBack').val() != '') {
				$('#tipoValidacionAdicional').val($('#tipoValidacionBack').val());
			}
			goToManageShipping();
		}
	});
	
	// Detalle: Gestionar direccion
	$('#addressButton').click(function() {
		if ($('#zipCode').val().trim() == '' || $('#validacionAdicional').val().trim() == '') {
			$('#enterZipCodeModal').modal();
			$('#gestion').val('1');
		}
		else {
			$('#gestion').val('1');
			console.log($('#tipoValidacionBack').val());
			if ($('#tipoValidacionBack').val() != '') {
				$('#tipoValidacionAdicional').val($('#tipoValidacionBack').val());
			}
			goToManageShipping();
		}
	});
	
	
	//obtener codigo citypaq
	$('#zipCodeCitypaq').click(function() {
		$('#zipCodeCitypaqModal').modal();
	});
	
	$('#continueZipCodecitypaq').click(function() {
		validateZipCodeCitypaq();
	});
	
	function validateZipCodeCitypaq() {
		$.ajax({
			type: 'POST',
			url: 'checkCorrectZipCode',
			data: 'expedition=' + $('#expeditionCitypaq').val() + '&zipCode=' + $('#zipCodeCitypaqInput').val(),
			success: function (data) {
				var dataObject = null;
				try {
					dataObject = JSON.parse(data)
				} catch(error) {}
				if (dataObject != null && dataObject.key != null) {
					$('#zipCodeCitypaqModal').modal('toggle');
					//Llamada ajax para obtener codigo acceso
					$.ajax({
						type: 'POST',
						url: 'obtenerCodigoAccesoCitypaq',
						data: 'expedition=' + $('#expeditionCitypaq').val(),
						success: function (data) {
							if (data.codigo != null && data.codigo != '' && data.codigo != '-1') {
								$('#codigoAccesoCitypaqLabel').text(data.codigo);
								$('#getCodigoCitypaq').modal({
								    backdrop: 'static',
								    keyboard: false
								});
							}
							else {
								$('#errorCitypaqCodeModal').modal({
								    backdrop: 'static',
								    keyboard: false
								});
							}
						}
					});
				}
				else {
					$('#notValidZipCodeCitypaqError').show();
					$('body').css('cursor', 'default');
					
					if (!$('#zipCodeCitypaqModal').is(':visible')) {
						$('#zipCodeCitypaqModal').modal();
					}
				}
			}
		});
	}
	
	// Detalle: Entrega a la carta
	$('#ecButton').click(function() {
		if ($('#zipCode').val().trim() == '' || $('#validacionAdicional').val().trim() == '') {
			$('#enterZipCodeModal').modal();
			$('#gestion').val('2');
		}
		else {
			$('#gestion').val('2');
			console.log('#ecButton', $('#tipoValidacionBack').val());
			if ($('#tipoValidacionBack').val() != '') {
				$('#tipoValidacionAdicional').val($('#tipoValidacionBack').val());
			}
			goToManageShipping();
		}
	});

	//Detalle Modal Introducir CP: Continuar
	$('#continueZipCodeModalButton').click(function() {
		goToManageShipping();
	});

	// Detalle Modal Introducir CP: Cancelar
	$('#cancelZipCodeModalButton').click(function() {
		$('#zipCode').val('');
		$('#validacionAdicional').val('');
		$('#notValidZipCodeError').hide();
		$('#notValidCifError').hide();
		$('#notValidMailError').hide();
		$('#notValidPhoneError').hide();
	});
	
	// Citipaq modal telefono: Cerrar
	$('.closePhoneModal').click(function() {
		$('#citypaqButton').prop('checked', false);
		$('#opcionesCitypaq').css('display', 'none');
		$('#codigoCitypaq').prop('checked', false);
		$('#listadoCitypaq').prop('checked', false);
	});
	
	// Citipaq modal telefono: Cerrar
	$('.closeListCitypaqModal').click(function() {
		$('#listadoCitypaq').prop('checked', false);
	});
	
	// Detalle: Envio asociado
	$('#associatedShippingButton').click(function() {
		$('#assDetailManageForm').submit();
	});

	//Detalle: Volver
	$('#backFromDetailButton').click(function() {
		var action = 'home';
		if ($('#original').val().trim() == "ASS") {
			action = 'search';
		}
		
		$('#detailBackForm').attr('action', action);
		$('#detailBackForm').submit();
	});
	
	// Solucion nueva entrega: Guardar
	$('#saveNewDeliveryButton').click(function(e) {
		e.preventDefault();
		var validND = true;
		
		if ($('#receivername').val().trim() == "" || $('#receivercontact').val().trim() == ""  ||
				$('#receiverphone').val().trim() == "" || $('#cityReceiverText').val().trim() == "" ||
				$('#addressDest').val().trim() == "" || $('#receiveraddressnumber').val().trim() == "") {
			validND = false;
			$('#textMsgDiv').hide();
			$('#emptyFieldMsg').show();
			window.scrollTo(0, 100);
			$('#dastos-del-destinatario').css('display', 'block');
		}
		else {
			$('#emptyFieldMsg').hide();
		}
		
		if ($('#receiverphone').val().trim() != "" &&
				($('#receiverphone').val().trim().length < 9 || 
				$('#receiverphone').val().trim().length > 15 || 
				!isNumeric($('#receiverphone').val().trim()))) {
			validND = false;
			$('#textMsgDiv').hide();
			$('#invalidPhoneMsg').show();
			window.scrollTo(0, 100);
			$('#dastos-del-destinatario').css('display', 'block');
		}
		else {	
			var cp = new String($('#receiverphone').val().trim());
			var country = $('#countryHiddenDest').val().trim();
			if (!isMovil(cp,country)){
				validND = false;
				$('#textMsgDiv').hide();
				$('#invalidMobilePhoneMsg').show();
				window.scrollTo(0, 100);
				$('#dastos-del-destinatario').css('display', 'block');
			}
			else{
				$('#invalidMobilePhoneMsg').hide();
				$('#invalidPhoneMsg').hide();
			} 
		}
		
		if ($('#receiveremail').val().trim() != "" &&
				!validarEmail($('#receiveremail').val().trim())) {
			validND = false;
			$('#textMsgDiv').hide();
			$('#invalidEmailMsg').show();
			window.scrollTo(0, 100);
			$('#dastos-del-destinatario').css('display', 'block');
		}
		else {
			$('#invalidEmailMsg').hide();
		}
		
		if ($('#date').val() != null &&  ($('#date').val().trim() == "" ||
				$('#datetimeFromMorning').val().trim() == "" ||
				$('#datetimeToMorning').val().trim() == "")) {
			validND = false;
			$('#textMsgDiv').hide();
			$('#emptyDateMsg').show();
			window.scrollTo(0, 100);
		}
		else {
			$('#emptyDateMsg').hide();
		}
		
		if ($('#datetimeFromAfternoon').val() != null && $('#datetimeToAfternoon').val() != null &&
				($('#datetimeFromAfternoon').val().trim() == "" && $('#datetimeToAfternoon').val().trim() != "" ||
				$('#datetimeFromAfternoon').val().trim() != "" && $('#datetimeToAfternoon').val().trim() == "")) {
			validND = false;
			$('#textMsgDiv').hide();
			$('#incompleteAftIntervMsg').show();
			window.scrollTo(0, 100);
		}
		else {
			$('#incompleteAftIntervMsg').hide();
		}
		
		if (validND) {
			$('#errorMessagesDiv').hide();
			$('#manageShippingForm').attr('action', 'saveNewDelivery');
			$('#manageShippingForm').submit();
		}
		else {
			$('#errorMessagesDiv').show();
		}
	});
	
	$('#confirmemailButton').click(function(e) {
		e.preventDefault();
		var validND = true;
		
		if ($('#confirmaremail').val().trim() != "" &&
				!validarEmail($('#confirmaremail').val().trim())) {
			validND = false;
			$('#textMsgDiv').hide();
			$('#invalidEmailMsg').show();
			window.scrollTo(0, 100);
			$('#email-confirmacion').css('display', 'block');
		}
		if($('#confirmaremail').val().trim() == ""){
			validND = false;
			$('#invalidEmailMsg').show();
			window.scrollTo(0, 100);
			$('#email-confirmacion').css('display', 'block');
		}
		if(validND){
			$('#errorMessagesDiv').hide();
			$('#manageShippingForm').attr('action', 'collectInWarehouse');
			$('#manageShippingForm').submit();
		}
	});
	
	//Revisar direccion: Guardar
	$('#saveNewAddressButton').click(function(e) {
		e.preventDefault();
		var validND = true;
		
		$('#errorGrabar').hide();
		
		if ($('#addressDest').val().trim() == "" || $('#receiveraddressnumber').val().trim() == "") {
			validND = false;
			$('#textMsgDiv').hide();
			$('#emptyFieldMsg').show();
			window.scrollTo(0, 100);
		}
		else {
			$('#emptyFieldMsg').hide();
		}
		
		if (validND) {
			
			if ($('#geoAddresPermited').val() == '1'){
				var direccion = $('#addressDest').val() + ' ' + $('#receiveraddressnumber').val() + ' ' + $('#receiveraddressrest').val();
				
				$.ajax({
					type: 'POST',
					url: 'correctGeoDireccion',
					data: 'geoDireccion=' + direccion + '&geoCP=' + $('#cpHiddenDest').val() + '&geoPoblacion=' + $('#cityHiddenDest').val(),
					success: function (data) {

						if (data != '' ){
							$('#geoDireccionModal').modal();
							$('#geoAddress').html( ' ' + data);
							$('#geoAddresProposed').val(data)
						} else {
							$('#errorMessagesDiv').hide();
							$('#manageShippingForm').attr('action', 'saveNewAddress');
							$('#manageShippingForm').submit();
							
						}
					}
				});
			
			} else {
				$('#errorMessagesDiv').hide();
				$('#manageShippingForm').attr('action', 'saveNewAddress');
				$('#manageShippingForm').submit();
			}
		}
		else {
			$('#errorMessagesDiv').show();
		}
	});
	
	// Se guarda la direccion propuesta por el geoposicionamiento
	$('#continueSaveGeoAddresButton').click(function() {
		$('#geoAddresPermited').val('0');
		$('#contentAddressDest').css('display', 'none');
		$('#addressDest').val($('#geoAddresProposed').val());
		$('#geoDireccionModal').modal('toggle');
	});
	
	// Se guarda la direccion introducida por el usuario
	$('#cancelSaveGeoAddresButton').click(function() {
		$('#geoAddresPermited').val('0');
		$('#contentAddressDest').css('display', 'none');
		$('#geoDireccionModal').modal('toggle');
	});

	// Solucion nueva entrega y revisar direccion: Volver
	$('#backFromManageShippingButton').click(function() {
		$('#manageShippingForm').attr('action', 'search');
		$('#manageShippingForm').submit();
	});
	
	$('.home').keypress(function(e) {
		var charCode = window.event ? window.event.keyCode : e.keyCode;
		if (charCode == 13) {
			if ($('.mobileSearch').css('display') == 'block') {
				$('#mblSearchShippingPublicButton').trigger('click');
			}
			else {
				$('#dktSearchShippingPublicButton').trigger('click');
			}
		}
	});
	
	
	
	//Evitamos pegar y cortar
	$('#cityReceiverText').bind("cut paste",function(e) {
	      e.preventDefault();
    });
	
	$("#cityReceiverText").keydown(function(e) {
		if ($('#cityReceiverText').attr('readonly') != "" ||
				$('#cityReceiverText').attr('readonly') != "readonly") {
			
			if (this.className.indexOf('ECField') != '-1'){
				
				document.getElementById('cityReceiverText').setSelectionRange(document.getElementById('cityReceiverText').value.length, document.getElementById('cityReceiverText').value.length); 
			
				if ( (window.getSelection().toString() != '' && document.getElementById('cityReceiverText').value.slice(0, document.getElementById('cityReceiverText').selectionStart).length < 2) ||
						(window.getSelection().toString() == '' && document.getElementById('cityReceiverText').value.slice(0, document.getElementById('cityReceiverText').selectionStart).length <= 2 
								&& (e.keyCode == 8 || e.keyCode == 46))) {
					e.preventDefault();
					$('#cityReceiverText').val($('#cityReceiverText').val().substring(0,2));
				}
				shiftTab(e);
			} else {
				shiftTab(e);
			}
		}
	});
	
	$("#cityReceiverText").keyup(function(e) {
		if ($('#cityReceiverText').attr('readonly') != "" ||
				$('#cityReceiverText').attr('readonly') != "readonly") {
			selectorKeyUpDown(e);
		}
	});
	
	$("#addressDest").keydown(function(e) {
		if ($('#addressDest').attr('readonly') != "" ||
				$('#addressDest').attr('readonly') != "readonly") {
			// Cuando se pulsa Shift+Tab
			if (e.keyCode == 9 && e.shiftKey) {
				e.preventDefault();
				$('#cityReceiverText').focus();
				return;
			}
			
			// Cuando se pulsa Tab
			if (e.keyCode == 9) {
				e.preventDefault();
				if ($(".selected_ADDR_Dest").length) {
					var selected = $('.selected_ADDR_Dest a');
					selectAddress(selected);
				}
				$('#receiveraddressnumber').focus();
				return;
			}
		}
	});
	
	$("#addressDest").keyup(function(e) {
		if ($('#addressDest').attr('readonly') != "" ||
				$('#addressDest').attr('readonly') != "readonly") {
			selectorKeyUpDownAddress(e);
		}
	});
	
	// Impedimos enviar el formulario si se presiona enter
	document.onkeypress = function (e) {
	    return (window.event ? window.event.keyCode : e.keyCode) != 13;
	};
})();

function showAndHideDescription() {
	if (window.innerWidth > 992) {
		$('.status-desc').show();
	}
	else {
		$('.status-desc').hide();
	}
}

function goToManageShipping() {
	$('#notValidZipCodeError').hide();
	$('#notValidCifError').hide();
	$('#notValidMailError').hide();
	$('#notValidPhoneError').hide();
	$('body').css('cursor', 'wait');
	$.ajax({
		type: 'POST',
		url: 'checkCorrectZipCode',
		data: 'expedition=' + $('#expedition').val() + '&zipCode=' + $('#zipCode').val() 
		    + '&tipoValidacion=' + $('#tipoValidacionAdicional').val() 
		    + '&valorValidacion=' + $('#validacionAdicional').val(),
		success: function (data) {
			var dataObject = null;
			try {
				dataObject = JSON.parse(data)
				console.log("dataObject", dataObject);
			} catch(error) {}
			
			
			if (dataObject == null) {
				$('#notValidZipCodeError').show();
				
				$('body').css('cursor', 'default');
				
				if (!$('#enterZipCodeModal').is(':visible')) {
					$('#enterZipCodeModal').modal();
				}
			} else if (dataObject.key == null || dataObject.tipoErrorValidacion != '') {
				if (dataObject.key == null) {
					$('#notValidZipCodeError').show();
				} 
				if (dataObject.tipoErrorValidacion == 'T') {
					$('#notValidPhoneError').show();
				} else if (dataObject.tipoErrorValidacion == 'M') {
					$('#notValidMailError').show();
				} else if (dataObject.tipoErrorValidacion == 'C') {
					$('#notValidCifError').show();
				}
				$('body').css('cursor', 'default');
				
				if (!$('#enterZipCodeModal').is(':visible')) {
					$('#enterZipCodeModal').modal();
				}
			} else if (dataObject.key != null && dataObject.tipoErrorValidacion == '') {
				$('input[name="queryKey"]').val(dataObject.key);
				if ($('#enterZipCodeModal').is(':visible')) {
					$('#enterZipCodeModal').modal('toggle');
				}
				
				$('#tipoValidacionBack').val($('#tipoValidacionAdicional').val());
				$('#valorValidacionBack').val($('#validacionAdicional').val());

				//Si venimos de gestionar envio
				if ($('#gestion').val().trim() == "0"){
					$('#delDetailManageForm').submit();
				}
				//Si venimos de revisar direccion
				if ($('#gestion').val().trim() == "1"){
					$('#delDetailAddressForm').submit();
				}
				//Si venimos de entrega a la carta
				if ($('#gestion').val().trim() == "2"){
					$('#zipCodeBack').val($('#zipCode').val());
					$('#delDetailECForm').submit();
				}
			}
		}
	});
}

//Metodo que valida que solo se introduzcan numeros en determinados inputs
function isNumberKey(evt) {
	var navigator = (evt.which) ? 0 : 1;
	var charCode = (evt.which) ? evt.which : window.event.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57) &&
			(!evt.ctrlKey || charCode != 118 && charCode != 86)) {
		if (navigator) {
			window.event.keyCode=0;
		}
		return false;
	}
	return true;
}

function isNumeric(input) {	
    return (input - 0) == input && (input+'').replace(/^\s+|\s+$/g, "").length > 0;
}

function validarEmail(email) {
	var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (!expr.test(email)) {
		return false;
	}
	return true;
}

function isMovil(phone,country){
	var expr = /^(\+34|34|0034|\+0034)?[6|7][0-9]{8}$/;
	if(country=="PT"){
		expr = /^(\+351|351|00351|\+00351)?[9][0-9]{8}$/;
	}
	
	if (!expr.test(phone)) {
		return false;
	}
	return true;
} 

/** CP/Localidad **/
function onBlurCPDest() {
	var city = $('#cityReceiverText').val().trim();
	var cpHidden = $('#cpHiddenDest').val();
	var cityHidden = $('#cityHiddenDest').val();
	var comprobar = cpHidden+" "+cityHidden;

	if(city != comprobar || city == "") {
		if ($('#contentCityReceiver ul li').length) {
			$('#cityHiddenDest').val('');
			$('#cpHiddenDest').val('');
		}
		else {
			if($('#deliveryOffice').val()== "1"){	
				$('#cityOfficeText').val(city);
				$('#cpHiddenOffice').val(cpHidden);
			    $('#cityHiddenOffice').val(cityHidden);
				validateCPOffice("1");
			}else{			
				$('#contentCityReceiver').hide();
				var res = city.split(" ");
				$('#cpHiddenDest').val(res[0]);
				
				var longitud = res.length;
				
				if (longitud>1){
					var n = $('#cityReceiverText').val().indexOf(" ");
					$('#cityHiddenDest').val($('#cityReceiverText').val().substring(n));
				}
				else{
					$('#cityHiddenDest').val("");
				}
				
			}
		}
	}
	else {
		$('#contentCityReceiver').hide();
		
	}
}

function shiftTab(event) {
	if (event.keyCode == 9 && event.shiftKey){
		event.preventDefault();
		if ($('#receiveremail').length){
			$('#receiveremail').focus();
		}
		else{
			$('#addressRest').focus();
		}
	    return;
	}
	
	//Cuando se pulsa Tab
	if (event.keyCode == 9) {
		event.preventDefault();
		if ($('.selected_POB_Dest').length) {
			var selected = $('.selected_POB_Dest a');
			selectCp(selected);
		}
		if($('#deliveryOffice').val()== "1"){
			
			$('#continueOffice').focus();
			$('#observations').focus();			
		}
		else{
			$('#addressDest').focus();
		}		
		return;
	}
}

function selectorKeyUpDown(e) {
	if (e.keyCode == 38) { //up
		e.preventDefault();
		var selected = $(".selected_POB_Dest");
		
		// if there is no element before the selected one, we select the last one
		if (selected.prev().length != 0) {
			// otherwise we just select the next one
			$("li").removeClass("selected_POB_Dest");
			selected.prev().addClass("selected_POB_Dest");
			manageUp();
		}
	} else if (e.keyCode == 40) { //down
		e.preventDefault();
		var selected = $('.selected_POB_Dest');
		if (selected.next().length != 0) {
			$("li").removeClass('selected_POB_Dest');
			selected.next().addClass('selected_POB_Dest');
			manageDown();
		}
	} else if (e.keyCode == 13) { //enter
		e.stopPropagation();
		
		if ($(".selected_POB_Dest").length) {
			var selected = $('.selected_POB_Dest a');
			selectCp(selected);
		}
	} else {
		$("#ulPob_Dest").scrollTop(0);
		edValueKeyUpCP('getPobCp');
	}
}

function selectCp(b) {
	if($('#listOfficeModal').is(":visible")){
		$('#cityOfficeText').val($(b).text());	
	    $('#cpHiddenOffice').val($(b).attr('textCP'));   
	    $('#cityHiddenOffice').val($(b).attr('textPob'));
	    $('#contentCityOffice').html('');
		$('#contentCityOffice').hide();
	}
	else{
		$('#cityReceiverText').val($(b).text());	
	    $('#cpHiddenDest').val($(b).attr('textCP'));   
	    $('#cityHiddenDest').val($(b).attr('textPob'));
		$('#contentCityReceiver').hide();
		$('#addressDest').val('');
		$('#receiveraddressnumber').val('');
		$('#receiveraddressrest').val('');
		$('#addressDest').focus();
		if($('#deliveryOffice').val()== "1"){	
			$('#cityOfficeText').val($(b).text());
			$('#cpHiddenOffice').val($(b).attr('textCP'));
		    $('#cityHiddenOffice').val($(b).attr('textPob'));
		    $('#continueOffice').hide();
			validateCPOffice("1");
		}
		$('#contentCityReceiver').html('');
	}
	
	updateDatesConcertada();
}

function manageUp() {
	if (currentScrollValueDest==startScrollDest){
    	$("#ulPob_Dest").animate({ scrollTop: "-=25" }, 100);
    	startScrollDest=startScrollDest-1;
    	endScrollDest=endScrollDest-1;
     }
	currentScrollValueDest=currentScrollValueDest-1;
}

function manageDown() {
	if (currentScrollValueDest==endScrollDest){
    	$("#ulPob_Dest").animate({ scrollTop: "+=25" }, 100);
    	startScrollDest=startScrollDest+1;
    	endScrollDest=endScrollDest+1;
     }
	currentScrollValueDest=currentScrollValueDest+1;
}


function edValueKeyUpCP(action) {
	var city = $('#cityReceiverText').val().trim();
	var cpHidden = $('#cpHiddenDest').val();
	var cityHidden = $('#cityHiddenDest').val();
    var country = '';

    if($('#countryHiddenDest').val() == 'PT'){
    	country = $('#paisDestino').val();
    } else {
    	country = $('#countryHiddenDest').val();
    }
    
	var comprobar = cpHidden+" "+cityHidden;
	
	if(city.length > 1) {
		if(city != comprobar) {
			$('#floatingBarsG_POB_Dest').css('display', 'block');
			$('#contentCityReceiver').hide();
			
			$.ajax({
				type: "POST",
				url: action,
				data: "country="+country+"&text="+city,
				success: function (data) {
					responseValidationCP(data);
					//updateDatesConcertada();
				}
			});
		}
	}
	else {
		$('#contentCityReceiver').hide();
		$('li').removeClass('selected_POB_Dest');
		$('#cpHiddenDest').val('');
		$('#cityHiddenDest').val('');
	}
}

function responseValidationCP(data) {
	$('#contentCityReceiver').html(data);
	$('#floatingBarsG_POB_Dest').css('display', 'none');
	$('#contentCityReceiver').show();
	if ($('#contentCityReceiver ul li').length == 1) {
		updateDatesConcertada();
		$('#cityReceiverText').val($('#contentCityReceiver ul li a').text());			
	    $('#cpHiddenDest').val($('#contentCityReceiver ul li a').attr('textCP'));
	    $('#cityHiddenDest').val($('#contentCityReceiver ul li a').attr('textPob'));
		$('#contentCityReceiver').hide();
		$('#addressDest').val('');
		$('#receiveraddressnumber').val('');
		$('#receiveraddressrest').val('');
		$('li').removeClass('selected_POB_Dest');
		$('#addressDest').focus();
		if($('#deliveryOffice').val()== "1"){	
			$('#cityOfficeText').val($('#contentCityReceiver ul li a').text());
			$('#cpHiddenOffice').val($('#contentCityReceiver ul li a').attr('textCP'));
		    $('#cityHiddenOffice').val($('#contentCityReceiver ul li a').attr('textPob'));
		    $('#continueOffice').hide();
			validateCPOffice("1");
		}
	}
}
/** FIN CP/Localidad **/



function updateDatesConcertada(){
	//cogemos el codigo postal, no la poblaciÃ³n. No cogemos cpHiddenDest porque cuando li=1, no esta actualizado
	var cpHiddenDest = $('#cityReceiverText').val().substring(0,5).trim();
    var gestionNumber = $('#gestionnumber').val();
    
  
	$.ajax({
		type: "POST",
		url: 'getPropuestaFechaConcertada',
		data: "gestionNumber="+gestionNumber+"&cpHiddenDest="+cpHiddenDest,
		success: function (data) {
			
			$('#datetimeFromMorningHidden').html(data.morningTimeFrom);
			$('#datetimeToMorningHidden').html(data.morningTimeTo);
			$('#datetimeFromAfternoonHidden').html(data.afternoonTimeFrom);
			$('#datetimeToAfternoonHidden').html(data.afternoonTimeTo);
			
			$('#date').val(data.date).change();
			$('#datetimeFromMorning').val(data.morningTimeFrom).change();
			$('#datetimeToMorning').val(data.morningTimeTo).change();
			$('#datetimeFromAfternoon').val(data.afternoonTimeFrom).change();
			$('#datetimeToAfternoon').val(data.afternoonTimeTo).change();
			
			if ( !$('#datetimeFromAfternoon').val() && !$('#datetimeToAfternoon').val() ){
					$('#horario-tarde').css('display', 'none');
			}else{
					$('#horario-tarde').css('display', 'block');
			}
			
		}
	});
	
}


/** Direcciones **/
function selectAddress(a) {
    var campo = $(a).attr("textCampo");
    $("#"+campo).val($(a).attr("address"));
    $("#contentAddressDest").hide();
}

function selectorKeyUpDownAddress(e) {
	if (e.keyCode == 38) { //up
		e.preventDefault();
		var selected = $(".selected_ADDR_Dest");
		
		// if there is no element before the selected one, we select the last one
		if (selected.prev().length != 0) {
			// otherwise we just select the next one
			$("li").removeClass("selected_ADDR_Dest");
			selected.prev().addClass("selected_ADDR_Dest");
			manageUpAddress();
		}
	}
	else if (e.keyCode == 40) { //down
		e.preventDefault();
		var selected = $('.selected_ADDR_Dest');
		if (selected.next().length != 0) {
			$("li").removeClass('selected_ADDR_Dest');
			selected.next().addClass('selected_ADDR_Dest');
			manageDownAddress();
		}
	}
	else if (e.keyCode == 13 ) {
		e.preventDefault();
		if ($(".selected_ADDR_Dest").length) {
			var selected = $(".selected_ADDR_Dest a");
			selectAddress(selected);
		}
		return false;
	}
	else {
		$("#ulAddr_Dest").scrollTop(0);
		edValueKeyUpAddress('getAddresses');
	}
}

function manageUpAddress() {
	if (currentScrollValueAddrDest==startScrollAddrDest){
    	$("#ulAddr_Dest").animate({ scrollTop: "-=25" }, 100);
    	startScrollAddrDest=startScrollAddrDest-1;
    	endScrollAddrDest=endScrollAddrDest-1;
     }
	currentScrollValueAddrDest=currentScrollValueAddrDest-1;
}

function manageDownAddress(){
	if (currentScrollValueAddrDest==endScrollAddrDest){
    	$("#ulAddr_Dest").animate({ scrollTop: "+=25" }, 100);
    	startScrollAddrDest=startScrollAddrDest+1;
    	endScrollAddrDest=endScrollAddrDest+1;
     }
	currentScrollValueAddrDest=currentScrollValueAddrDest+1;
}

function edValueKeyUpAddress(action) {
	var address = $("#addressDest").val();
	var cp = $("#cpHiddenDest").val();
	var city = $("#cityHiddenDest").val();
	var country = "ES";	

	if (address.length > 1)	{
		$('#floatingBarsG_ADDRESS_Dest').css('display', 'block');
		
		$.ajax({
			type: "POST",
            url: action,
            data: "country="+country+"&postalCode="+cp+"&city="+city+"&text="+address,
            success: function (data) {
            	responseValidationAddress(data);               
            }
        });
	}
	else {
		$("#contentAddressDest").hide();
		$("li").removeClass("selected_POB_Dest");
	}   
}

function responseValidationAddress(data) {
	$("#contentAddressDest").html(data);
	$('#floatingBarsG_ADDRESS_Dest').css('display', 'none');
	$("#contentAddressDest").show();
}

function limpiarField() {
	
	
	if($('#countryHiddenDest').val() == 'PT'){
		$('#cityReceiverText').val('');
	} else {
		$('#cityReceiverText').val($('#cityReceiverText').val().substring(0,2));
	}
	
}
/** FIN Direcciones **/

/** Recogida en oficina **/

$("#checkOfficeDelivery").on("click", function() {
	if($('#checkOfficeDelivery').is(':checked')){
		abrirPopUp('dateOfficeModal');		
	}
	else{
		$('#deliveryOffice').val('0');
		$('#cityReceiverText').val($('#addressCpCity').val());
		$('#addressDest').val($('#addressName').val());
		$('#receiveraddressnumber').val($('#addressNumber').val());
		$('#receiveraddressrest').val($('#addressRest').val());
		$('#addressDest').removeAttr('disabled');
		$('#receiveraddressnumber').removeAttr('disabled');
		$('#receiveraddressrest').removeAttr('disabled');
		$('#saveDeliveryOfficeAddressButton').css('display', 'none');
		$('#saveNewAddressButton').css('display', 'initial');
		$('#cpHiddenDest').val($('#cpHiddenDestOld').val());
		$('#cityHiddenDest').val($('#cityHiddenDestOld').val());
	}

	
});

$('#closeDeliveryOfficeButton').click(function() {
	$("#checkOfficeDelivery").removeAttr('checked');
	$('#manageECAddress').css('display', 'none');
	$('#manageOfficeButton').removeAttr('checked');
	$('#deliveryOffice').val('0');
	cerrarPopUp('dateOfficeModal');
	$('#manageOfficeMap').removeAttr('checked');
	$("#fechaCarta1").prop("checked", false);
	$("#fechaCarta2").prop("checked", false);
	$("#fechaCarta3").prop("checked", false);
	$("#fechaCarta4").prop("checked", false);
	$('#pickupDateDayValue').attr('disabled', 'disabled');
    $('#pickupDateDayValue').val('');
    $('#horas').hide();
});
$('#cancelDeliveryOfficeButton').click(function() {
	$("#checkOfficeDelivery").removeAttr('checked');
	$('#manageECAddress').css('display', 'none');
	$('#manageOfficeButton').removeAttr('checked');
	$('#deliveryOffice').val('0');
	cerrarPopUp('dateOfficeModal');
	$('#manageOfficeMap').removeAttr('checked');
});
$('#continueDeliveryOfficeButton').click(function() {
	$('#deliveryOffice').val('1');
	$('#saveDeliveryOfficeAddressButton').css('display', 'initial');
	$('#saveNewAddressButton').css('display', 'none');
	cerrarPopUp('dateOfficeModal');
	getOfficesData("1");
	
});


$('#saveDeliveryOfficeAddressButton').click(function(){
	$('#manageShippingForm').attr('action', 'guardarECOffice');
	$('#manageShippingForm').submit();
});

/** FIN Recogida en oficina **/

/** EQUIPAQ **/
$('#closeEquipaqModal').click(function() {
	cerrarPopUp('equipaqModal');	
});
$('#closeModal-equipaq').click(function() {
	cerrarPopUp('equipaqModal');	
});
/** FIN EQUIPAQ **/


function limpiarCamposDireccion(){
	$('#cityReceiverText').val('');
}