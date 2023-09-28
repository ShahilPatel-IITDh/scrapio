$(document).ready (function(){
	console.log("ready common");
	Cookies.remove('newLocale');
});
function callMeShow(locale, fuente){
	activateRadioButtonsCM(locale, fuente);
	console.log($("#callMeScheduled").prop("checked"));
	if($("#callMeScheduled").prop("checked") == false){
		$("#callMeModal").modal('show');
	}else{
		$("#callMeModalResponse").modal('show');	
	}
}
function callMeRequest(fuente){
	var formData;
	if(validateCMData(fuente)){
	//if(true){
		$.ajaxSetup({
	        beforeSend: function(xhr) {
	            xhr.setRequestHeader('X-CSRF-TOKEN',$( "input[name='_csrf']" ).val());
	        }
	    });
		formData = $("#llamameBsForm").serialize();
		console.log(formData);
		$("#callMeRequestBtn").prop("disabled",true);
		$.ajax ({
			url:    $('#contextPath').val()+"/callme",
			data:    formData,
			//contentType:"application/json; charset=utf-8",
			type:    "POST",
			//dataType: 'json',
			success: function (response) {
				$("#callMeRequestBtn").prop("disabled",false);
				//showCMMessageOk();					
				console.log(response);
				if(response.errors == true){
			    	for (i in response.errorsParam) {
			    		var element =  response.errorsParam[i];
			    		console.log(element.param);
						if(element.param == "opcion"){
							$("#callMeModal").modal('hide');
							$("#callMeMessageMessage").html(element.msg);
							$("#callMeModalResponse").modal('show');		
						}else if(element.param == "horaLlamada"){
							$("#cmErrors").fadeIn();
					    	$("#cmCallTimeError").fadeIn();
					    	$("#cmCallTimeLbl").addClass("red");
						}else if(element.param == "diaLlamada"){
							$("#cmErrors").fadeIn();
					    	$("#cmCallDateError").fadeIn();
					    	$("#cmCallDateLbl").addClass("red");
						}else if(element.param == "telefono"){
							$("#cmErrors").fadeIn();
					    	$("#cmPhoneError").fadeIn();
					    	$("#cmPhoneLbl").addClass("red");
						}else if(element.param == "condiciones"){
							$("#cmErrors").fadeIn();
					    	$("#cmLegalError").fadeIn();
					    	$("#cmLegalLbl").addClass("red");
						}
					}
				}else if(!!response.msgSuccess){
					$("#callMeModal").modal('hide');
					$("#callMeModalResponse").modal('show');	
					console.log("!success " + response.msgSuccess);
					$("#callMeMessage").html(response.msgSuccess);
					$("#callMeScheduled").prop("checked", true);
				}else{
					$("#callMeModal").modal('hide');
					$("#callMeModalResponse").modal('show');
					console.log("error " + response.msgError);
					$("#callMeMessage").html(response.msgError);
				}
			},
			error:function(jqXHR, textStatus, errorThrown) {
				$("#callMeRequestBtn").prop("disabled",false);
				console.log(jqXHR.status);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});		
	}
}
function showCMMessageOk(){
	$("#cmMessageOk").fadeIn();
}
function validateCMData(fuente){
	var result = true;
	var horaLlamada = document.getElementById("cmCallTime").value;
	var telefono = document.getElementById("cmPhone").value;
	
	$(".cmElementError").fadeOut();
	$("#cmCallTimeLbl").removeClass("red");
	$("#cmPhoneError").removeClass("red");
	$("#cmLegalLbl").removeClass("red");
	if(fuente == "G"){
		if($("#cmOption1").prop("checked") == true && horaLlamada != "now"){
		    const reHoraLlamada = /^([0-9]{2})\:([0-9]{2})$/;
		    if(!reHoraLlamada.test(horaLlamada)){
		    	result = false;
		    	$("#cmErrors").fadeIn();
		    	$("#cmCallTimeError").fadeIn();
		    	$("#cmCallTimeLbl").addClass("red");
		    }
		}
	}else if(fuente == "C"){
		if($("#cmCallDate").val() == "" || $("#cmCallTime").val() == "" || $("#cmCallTime").val() == "now"){
			$("#cmCallTimeError").fadeIn();
			$("#cmCallTimeLbl").addClass("red");
		}
	}
	
	const reTelefono = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{3,4}$/;
    if(!reTelefono.test(telefono)){
    	result = false;
    	$("#cmErrors").fadeIn();
    	$("#cmPhoneError").fadeIn();
    	$("#cmPhoneLbl").addClass("red");
    }
    
    result = result || reTelefono.test(telefono);
    if($("#cmLegal").prop("checked") == false){
    	result = false;
    	$("#cmErrors").fadeIn();
    	$("#cmLegalError").fadeIn();
    	$("#cmLegalLbl").addClass("red");
    }
	
	return result;
}
function showTime(locale, fuente){
	var now = new Date();
	var endManagerTime = new Date();
	endManagerTime.setHours(20,0,0);
	var hourInit = now.getHours();
	var minuteInit = now.getMinutes();	
	var start = "";
	if(fuente == 'C'){
		hourInit = 8;
		minuteInit = 0;
	}
	if(hourInit < 9){
		init = 9;
		start = "00";
	} else {
		if(minuteInit < 30){
			init = hourInit;
			start = "30";
		}else{
			init = hourInit + 1;
			start= "00";
		}
	}
	var end = 20;
	if(now.getDay() == 6 || (now.getDay() == 5 && now > endManagerTime)){
		end = 15;
	}
	generateComboHours(init,end, start);	
	generateComboDays(now, locale)
	$("#cmCallTimeContainer").show();
}
function hideTime(){
	$("#cmCallTimeContainer").hide();
	$( "#cmCallTime" ).html("");
}
function generateComboHours(init, end, start){
	$( "#cmCallTime" ).html("");
	$( "#cmCallTime" ).append("<option value='now'></option>" );
	var minute1 = ":00";
	var minute2 = ":30";
	
	if(start != "00"){
		var hora = init;
		if(hora < 10){
			hora = "0" + hora;
		}
		var hora1 = hora + minute2;
		$( "#cmCallTime" ).append( "<option value='" + hora1 + "'>" + hora1 + "</option>" );
		init++;
	}
	for(var i = init; i < end; i++){
		var hora = i;
		if(hora < 10){
			hora = "0" + hora;
		}
		var hora1 = hora + minute1;
		var hora2 = hora + minute2;
		$( "#cmCallTime" ).append( "<option value='" + hora1 + "'>" + hora1 + "</option>" );
		$( "#cmCallTime" ).append( "<option value='" + hora2 + "'>" + hora2 + "</option>" );
	}
}
function generateComboDays(now, locale){
	const options = { weekday: 'long'}
	$( "#cmCallDate" ).html("");
	var day = now;
	do{
		day.setDate(day.getDate() + 1);
	}while(now.getDay() == 6 || now.getDay() == 0);
	while(day.getDay() < 6){
		$( "#cmCallDate" ).append("<option value='" + day.getDay() + "'>" + day.toLocaleDateString(locale, options) + " " + day.getDate() + "</option>" );
		day.setDate(day.getDate() + 1);
	}
}
function activateRadioButtonsCM(locale, fuente){	
	var now = new Date();
	if(now.getDay() == 0 && fuente == "G"){//domingo
		//document.getElementById("cmOption2").checked = true;
	}else {
		if(fuente == "G"){
			var startManagerTime = new Date();
			startManagerTime.setHours(9,0,0);
			var endManagerTime = new Date();
			if(now.getDay() != 6){
				endManagerTime.setHours(20,0,0);
			} else {
				endManagerTime.setHours(15,0,0);
			}
			if(now < endManagerTime ){
				showTime(locale, fuente);
				if(now < startManagerTime){
					$("#cmCallTime").val($("#cmCallTime option:eq(1)").val());
				}
				document.getElementById("cmOption1").checked = true;
				
			}else{
				//document.getElementById("cmOption2").checked = true;
			}	
		}else if(fuente == "C"){
			showTime(locale, fuente);
		}
		console.log(fuente);
	}
}
$("#callMeModal").modal({
	escapeClose: true,
	clickClose: true,
	showClose: true
});
$("#exitModal").modal({
	escapeClose: true,
	clickClose: true,
	showClose: true
});function rediTo(respuesta) {
	if( respuesta == 'error'){
		document.location.href = $("#contextPath").val() + '/error';
	}
	
	if( respuesta.status == undefined){
		document.location.href = $("#contextPath").val() + '/error';
	}
}
function back(){
	showLoading();
	$("#backBtn").prop("disabled", false);
	$("#backBtn").click();
}
function misituacion(){
	$("#mySituationButton").click();
}
function openModalAjax(url,m, tl, t, cl){
	 $.ajaxSetup({
	        beforeSend: function(xhr) {
	            xhr.setRequestHeader('X-CSRF-TOKEN',$( "input[name='_csrf']" ).val());
	        }
	    });
	$.ajax ({
		url : url+'/getModalContent/'+tl+'/'+t,
		type:    "POST",
		data: {textoLargo: tl, url: cl},
		success: function (respuesta) {
				var capHeader = '#'+m+'header';
				var capBody = '#'+m+'body';
				$(capHeader).html(respuesta.title);
				$(capBody).html(respuesta.body);
				$('#'+m).modal('handleUpdate');
				$('#'+m).modal('show');
		},
		error:function(jqXHR, textStatus, errorThrown) {
			rediTo(textStatus);
		}
	});
}
function changeLocale(locale){
	Cookies.set('newLocale', locale);
	window.location.reload(true);
}
function rediTo(respuesta) {
	if( respuesta == 'error'){
		document.location.href = $("#contextPath").val() + '/error';
	}
	
	if( respuesta.status == undefined){
		document.location.href = $("#contextPath").val() + '/error';
	}
}
