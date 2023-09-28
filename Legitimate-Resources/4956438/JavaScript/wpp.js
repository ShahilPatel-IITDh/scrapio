$(function () {	    
	$('.js-send-wpp').click(function () {		
		var wppNameUser = $('#whats-name').val();
		var wppText = $('#whats-in').val();
		var wppNumber = $('#whats-number').val();
		if (wppNameUser !== '') {							
			var wppLink = `https://api.whatsapp.com/send?phone=+55${wppNumber}&text=Nome: ${wppNameUser} Mensagem: ${wppText}`;
			window.open(wppLink, '_blank');
			$('.msg_wpp').html('');
		} else {
			$('.msg_wpp').html('Por favor, nos diga seu nome!');
		};
	});	
  
  if (navigator.userAgent.indexOf("Firefox") > 0) {
    $('.js-show-firefox').show();
    $('.js-hide-firefox').hide();
  }
});