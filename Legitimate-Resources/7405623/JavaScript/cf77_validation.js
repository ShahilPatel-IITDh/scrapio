jQuery(document).ready(function( $ ){

	$('input[type="email"]').blur(function(){
		var regex  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var  txt = 'שדה אימייל לא תקין';
		var  element =  $(this);
		addErrorToinput(element, txt, regex);
	});
	

	$('input[type="tel"]').blur(function(){
		var regex  = /(^\(?(0[0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$)|(^\(?(0[0-9]{1})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$)/;
		var  txt = 'שדה טלפון לא תקין';
		var  element =  $(this);
		addErrorToinput(element, txt, regex);
	});

	$('input[type="text"]').blur(function(){
		var regex  = /^(?!\s*$).+/;
		var  txt = 'שדה טקסט לא תקין';
		var  element =  $(this);
		addErrorToinput(element, txt, regex);
	});


	function addErrorToinput(element, txt, regex) {

		if ( element.val() === '' || element.val().match(regex) === null   ){
			
			exists = element.closest('span').find('.validationErrorSpan');
			if ( exists.length == 0 ) {
				element.closest('span').append('<div class="animate fadeIn" data-anim-type="fadeIn"><p class="validationErrorSpan">'+ txt +'</p></div>');
				element.attr('aria-invalid', false)
			}
			
		} else {
			
			element.closest('span').find('.validationErrorSpan').remove();
			element.attr('aria-invalid', true )

		}

	}

});