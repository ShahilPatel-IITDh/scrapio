
var cf = "_kxf";
var ca = "_kxa";
var ct = "_kxt";

function acceptCookiesBanner() {
	$('#condiciones').hide();
};

function acceptCookiesBannerAudited(auditCode) {
	auditEvent(auditCode);
	acceptCookiesBanner();
};

function auditEvent(auditCode, debtId){
	var data = {
			operationCode : auditCode,
			debtId  : debtId
		};

		$.ajaxSetup({
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-TOKEN', $("input[name='_csrf']").val());
			}
		});

		var url = $("#contextPath").val() + "/auditar";
		$.ajax({
			url: url,
			data: data,
			type: "POST",
			success: function (response) {
					
			},
			error: function (response) {
				console.log("Error generacion auditoria. Response:"+response.status);		
			}
		});
}


function setCookieServer(ck){
	console.log("setCookieServer "+ck);
	var data = {
			cookie : ck
		};

		$.ajaxSetup({
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-TOKEN', $("input[name='_csrf']").val());
			}
		});

		var url = $("#contextPath").val() + "/setCookie";
		$.ajax({
			url: url,
			data: data,
			type: "POST",
			success: function (response) {
				
			},
			error: function (response) {		
			}
		});
}

function isNewCookieServer(){
	console.log("isNew");
	var data = {
			cookie : ct
		};
		$.ajaxSetup({
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-TOKEN', $("input[name='_csrf']").val());
			}
		});

		var url = $("#contextPath").val() + "/getCookie";
		$.ajax({
			url: url,
			data: data,
			type: "POST",
			success: function (respuesta) {
				
				if( respuesta == 'null'){
					$('#cookiesModal').modal('show');
				}
			},
			error: function (response) {
				console.log("Error getCookie. Response:"+response.status);		
			}
		});
		
}

function getCookieServer(ck){
	var vl;
	console.log("getCookieServer "+ck);
	var data = {
			cookie : ck
		};

		$.ajaxSetup({
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-TOKEN', $("input[name='_csrf']").val());
			}
		});

		var url = $("#contextPath").val() + "/getCookie";
		$.ajax({
			url: url,
			data: data,
			async:false,
			type: "POST",
			success: function (respuesta) {
				
				vl = respuesta;
				return respuesta;
			},
			error: function (response) {
				console.log("Error getCookie. Response:"+response.status);		
			}
		});
		return vl;
		
}


function isActiveCookieCFServer(){
console.log("isCF");
	var data = {
			cookie : cf
		};

		$.ajaxSetup({
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-TOKEN', $("input[name='_csrf']").val());
			}
		});
		var url = $("#contextPath").val() + "/getCookie";
		$.ajax({
			url: url,
			data: data,
			async:false,
			type: "POST",
			success: function (respuesta) {
				if( respuesta != ''){
					document.getElementById("chkPersonalizadas").checked = true;
				}else{
					document.getElementById("chkPersonalizadas").checked = false;
				}

			},
			error: function (response) {
				console.log("Error getCookie. Response:"+response.status);		
			}
		});
		
}

function isActiveCookieCAServer(){
	console.log("isCA");
	var data = {
			cookie : ca
		};

		$.ajaxSetup({
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-TOKEN', $("input[name='_csrf']").val());
			}
		});
		var url = $("#contextPath").val() + "/getCookie";
		$.ajax({
			url: url,
			data: data,
			async:false,
			type: "POST",
			success: function (respuesta) {
				if( respuesta != ''){
					document.getElementById("chkAnaliticas").checked = true;
				}else{
					document.getElementById("chkAnaliticas").checked = false;
				}

			},
			error: function (response) {
				console.log("Error getCookie. Response:"+response.status);		
			}
		});
		
}

function removeCookieServer(ck){
	var data = {
			cookie : ck
		};

		$.ajaxSetup({
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-CSRF-TOKEN', $("input[name='_csrf']").val());
			}
		});

		var url = $("#contextPath").val() + "/removeCookie";
		$.ajax({
			url: url,
			data: data,
			type: "POST",
			success: function (response) {
			},
			error: function (response) {	
			}
		});
}

function showMenu(auditCode){
	//Realizamos la auditoria de la operacion	
	auditEvent(auditCode);
	$('#modalMenu').modal('toggle');
}

function openModalCookie() {
	isActiveCookieCFServer();
	isActiveCookieCAServer();
	
	$('#cookiesModal2').modal('show');
}

function openModalCookieAudited(auditCode) {
	auditEvent(auditCode);
	openModalCookie();
}


function acceptCookies(all) {
	$('#cookiesModal').modal('hide');
	if (all) {
		setCookieServer(ct);
		setCookieServer(cf);
		setCookieServer(ca);
	} else {
		if (document.getElementById("chkPersonalizadas").checked) {
			setCookieServer(cf);
		} else {
			removeCookieServer(cf);
		}
		
		if (!document.getElementById("chkAnaliticas").checked) {
			removeCookieServer(ca);
		} else {
			setCookieServer(ca);
		}
	}
};

function acceptCookiesAudited(all, auditCode) {
	auditEvent(auditCode);
	acceptCookies(all);
};





function deleteCookiesAnalitycs() {
    var cookies = document.cookie.split(";");
    var namePagoFacil = '_kx';
    
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i]; 
        if( cookie.indexOf(namePagoFacil) == -1 ){
        	var eqPos = cookie.indexOf("=");
        	var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        	deleteCookie(name);
        }
    }
}

function formatNumber(number){
	
	var str = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	str = str.replace(',','#');
	str = str.replace('.',',');
	str = str.replace('#','.');
	return str;
};


MvcUtil = {};
MvcUtil.showSuccessResponse = function (text, element) {
	MvcUtil.showResponse("success", text, element);
};

MvcUtil.setInvalid = function (elementName){
	if (elementName == 'd1' || elementName == 'm1' || elementName == 'y1'){
		var element = $("#fecha");
		element.each(function() {
			$(this).find(".date-input").addClass('is-invalid');
			$(this).find("i").addClass('is-invalid');
		});
	} else {
		var element = $("#" + elementName);
		element.addClass('is-invalid');
	}
};

MvcUtil.cleanInvalids = function cleanInvalids(){
	$('.is-invalid').removeClass('is-invalid')
	$('.error').remove()
};

MvcUtil.showInvalidResponse = function showErrorResponse(text, element) {
	MvcUtil.setInvalid(element);
	MvcUtil.showInvalid(text, element);
};

MvcUtil.showInvalid = function(text, elementName) {
	var element = $("#" + elementName+"-invalid");
	element.html(text);
};

MvcUtil.showErrorResponse = function showErrorResponse(text, element) {
	MvcUtil.showResponse("error", text, element);
};
MvcUtil.cleanErrorResponse = function cleanErrorResponse() {
	$('.has-error').removeClass('has-error')
	$('.error').remove()
};
MvcUtil.showResponse = function(type, text, elementName) {
	var element = $("#" + elementName);
	var parent = $("#" + elementName).parent();
	parent.addClass('has-error');
	element.addClass('has-error');
	var responseElementId = element.attr("id") + "Response";
	var responseElement = $("#" + responseElementId);
	if (responseElement.length == 0) {
		responseElement = $('<span id="' + responseElementId + '" class="' + type + '" style="display:none">' + text + '</span>').insertAfter(element);
	} else {
		responseElement.replaceWith('<span id="' + responseElementId + '" class="' + type + '" style="display:none">' + text + '</span>');
		responseElement = $("#" + responseElementId);
	}
	responseElement.fadeIn("slow");
};
MvcUtil.xmlencode = function(xml) {
	//for IE 
	var text;
	if (window.ActiveXObject) {
	    text = xml.xml;
	 }
	// for Mozilla, Firefox, Opera, etc.
	else {
	   text = (new XMLSerializer()).serializeToString(xml);
	}			
	    return text.replace(/\&/g,'&'+'amp;').replace(/</g,'&'+'lt;')
        .replace(/>/g,'&'+'gt;').replace(/\'/g,'&'+'apos;').replace(/\"/g,'&'+'quot;');
};

function closeMenu(){
	$("#dismiss").click();
}

function showLoading(){
	$('.login-loader').show();
}

function hideLoading(){
	$('.login-loader').hide();
}

$(document).ready(function () {


	    /** BOOTSTRAP INI **/
//	    $('*[data-toggle="tooltip"]').tooltip({});
//	    $('.modal').modal();
//	    // modal switch
//	    $('.modal:not(#tycModal)').on('show.bs.modal',function(){
//	        $('.modal').modal('hide');
//	    });
	    /** END BOOTSTRAP INI **/


	    $('#dismiss, .overlay').on('click', function () {
	        // hide sidebar
	        $('#mobileSidebar').removeClass('active');
	        // hide overlay
	        $('.overlay').removeClass('active');
	    });

	    $('#sidebarCollapse').on('click', function () {
	        // open sidebar
	        $('#mobileSidebar').addClass('active');
	        // fade in the overlay
	        $('.overlay').addClass('active');
	        $('.collapse.in').toggleClass('in');
	        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
	    });
	    /** END MOBILE NAVBAR FUNCTIONS **/

	    /** PAYMENT CARDS CHECKBOX AND AMOUNT FUNCTIONS **/
	    $('.amount-control').on('change paste keyup',function(e){
	        let card = $(e.target).closest('div.card');
	        let amount = card.find('input.amount-control');
	        let total = card.find('input.total-control');

	        let value = $(e.target).val();
	        if(parseInt(value) > 0){
	            total.removeClass('d-none');
	        }else{
	            total.addClass('d-none');
	        }
	    });

	    $('.card-checkbox input[type="checkbox"]').on('change',function(e){
	    	//console.log("changeCheck card-checkbox");
	        let card = $(e.target).closest('div.card');
	        let amount = card.find('input.amount-control');
	        let total = card.find('input.total-control');
	      
	        card.toggleClass('disabled');
	        if($(e.target).is(':checked')){
	            amount.prop('readonly',false);
	        }else{
	            total.addClass('d-none');
	            amount.val('').prop('readonly',true);
	        }
	        if( amount.attr('data-aux') == 'readonly'){
	        	amount.prop('readonly',true);
	        }
	    });
	    /** END PAYMENT CARDS CHECKBOX AND AMOUNT FUNCTIONS **/


	    /** MINIMUN QUOTA AMOUNT VALIDATE **/
	    $('.quota-amount').on('focusout',function(e){
	        let value = $(e.target).val();
	        console.log(value);
	        if(value < 200){
	            $('#quotaErrorModal').modal('show');
	            $(e.target).addClass('is-invalid');
	            $(e.target).closest('div.card').addClass('border-danger');
	        }else{
	            $(e.target).removeClass('is-invalid');
	            $(e.target).closest('div.card').removeClass('border-danger');
	        }
	    });
	    /** MINIMUN QUOTA AMOUNT VALIDATE **/

	    /** PAYMENT CARDS TRAFFIC LIGT (BOOTSTRAP SLIDER) **/
	    if($('#traffic-light').length >0){

	        let slider = new Slider('#traffic-light',{
	            id:'traffic-light',
	            min:0,
	            max:100,
	            step:1,
	            tooltip:"always",
	            tooltip_position:"bottom",
	            enabled:false,
	            formatter: function(value) {
	                let position = value;
	                if(value === 0){
	                    position = position +2;
	                    $('#traffic-light .tooltip.tooltip-main').css('transform','translate(-10%)');
	                }else if(value === 100){
	                    position = position -2;
	                    $('#traffic-light .tooltip.tooltip-main').css('transform','translate(-90%)');
	                }else if (position <= 90 && position >= 10){
	                    $('#traffic-light .tooltip.tooltip-main').css('transform','translate(-50%)');
	                }
	                $('#traffic-light .tooltip.tooltip-main').css('backgroundPositionX',position+'%');
	                return  value+'% Abonado';
	            },
	        });
	    }
	    /** END PAYMENT CARDS TRAFFIC LIGT **/


	     /** DATE PICKERS (BOOTSTRAP DATEPICKER)**/
	     // calendar initialization
	    $('.datepicker.datepicker-inline').datepicker({
	    	dateFormat:'dd/mm/yyyy',
	        weekStart:1,
	        multidate:false,
	        todayHighlight:true,
	        templates:{
	            leftArrow: '<i class="icon-arrow-left text-primary lead"></i>',
	            rightArrow: '<i class="icon-arrow-right text-primary lead"></i>'
	        }
	    });

	    // POSTPOSE PAYMENT CALENDAR FUNCTIONS
	    let postposeDateInput = null;
	    $('.postpose-datepicker-input').on('focus',function(e){
	        postposeDateInput = e.target;
	    	 
	        $('#datepickerSingleModal').modal('show');
	        console.log(e.target.max);
	        $('.datepicker-single').datepicker('setEndDate',e.target.max);
	        $('.datepicker-single').datepicker('update',e.target.value);
	        	        
	    });

	    $('#singleDateSelector').on('click',function(e){
	        let current = moment($('.datepicker-single').datepicker('getDate')).format('DD/MM/Y');
	        $(postposeDateInput).val(current);
	    });

	    $('#multiDateSelector').on('click',function(e){
	        let locale = $('.desktop-preview').data('date-language');
	        moment.locale(locale);
	        let current = moment($('.datepicker-multiple').datepicker('getDate'));
	        $('#select-all-date-mobile').html(current.format('DD/MM/Y'));
	        $('.postpose-datepicker-input').val(current.format('DD/MM/Y'));

	        $('.selected-date').empty().append('<li class="big-date">'+current.format('LL')+'</li>');
	        $('.desktop-preview').datepicker('update',$('.datepicker-multiple').datepicker('getDate'));
	    });

	    $('#multiDateSelectorDesktop').on('changeDate',function(e){
	        let current = moment(e.date);
	        $('.postpose-datepicker-input').val(current.format('DD/MM/Y'));
	        $('.selected-date').empty().append('<li class="big-date">'+current.format('LL')+'</li>');
	    });

	    // SPLIT PAYMENT - QUOTAS CALENDAR FUNCTIONS
	    let quotaDateInput = null;
	    $('.quota-datepicker-input').on('focus',function(e){
	        quotaDateInput = e.target;
	        $('#datepickerQuotaModal').modal('show');
	        $('.datepicker-quota').datepicker('update',e.target.value);
	    });

	    $('#quotaDateSelector').on('click',function(e){
	        let current = moment($('.datepicker-quota').datepicker('getDate')).format('DD/MM/Y');
	        $(quotaDateInput).val(current);
	    });
	    /** DATE PICKERS **/
	   

	});

//Funciones para auditoria
function auditEvent(auditCode){
	var data = {
		operationCode : auditCode
	};


	$.ajaxSetup({
		beforeSend: function(xhr) {
			xhr.setRequestHeader('X-CSRF-TOKEN', $( "input[name='_csrf']" ).val());
		}
	});

	var url = $('#contextPath').val()+"/auditar";
	$.ajax({
		url: url,
		data: data,
		type: "POST",
		success: function (response) {
			console.log("Auditoria generado correctamente. Response:"+response.status);	
		},
		error: function (response) {
			console.log("Error generacion auditoria. Response:"+response.status);		
		}
	});
}
	


