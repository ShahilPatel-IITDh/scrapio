jQuery( document ).ready(function($) {


				//Send form on change
				$('.select-translation').on('change', function(){
					$('form#translation-form').submit();
					return false;
				});
				//Send form on keypress key: Return
				$('.select-translation').keypress(function (e) {
					if (e.which == 13) {
						$('form#translation-form').submit();
						return false;
					}
				});

	$('body').removeClass('no-js');
	$('.translation-submit').removeClass('no-js');
	
	if ($('.bxslider').length ) {
		$('.bxslider').show().bxSlider({
			auto: true,
			//pagerCustom: '.bx-pager',
			pager: true,
			controls: false,
			mode: 'horizontal',
			pause: 8000
		});
	}
	function absorbEvent_(event) {
		var eEvent = event || window.event;
		eEvent.preventDefault && eEvent.preventDefault();
		eEvent.stopPropagation && eEvent.stopPropagation();
		eEvent.cancelBubble = true;
		eEvent.returnValue = false;
		return false;
	}
	function preventLongPressMenu(oNode) {
		oNode.ontouchstart = absorbEvent_;
		oNode.ontouchmove = absorbEvent_;
		oNode.ontouchend = absorbEvent_;
		oNode.ontouchcancel = absorbEvent_;
	}
	preventLongPressMenu($('.slide-img'));
	
	$( '.auswahl .wpcf7-list-item-label' ).each(function() {
		var sText = $( this ).text();
		if (sText.indexOf('jung') >= 0){
			var aText = sText.split(' '); 			
			sNewText = '';
			$.each(aText, function( index, value ) {
				if (value.indexOf('jung') >= 0){
					if(sNewText === ''){
						sNewText = "7x<sup>jung</sup>";
					}else{
						sNewText += " 7x<sup>jung</sup>";
					}
				}else{
					if(sNewText === ''){
						sNewText = value;
					}else{
						sNewText += ' ' + value;
					}
				}
			});
			$( this ).text('').append(sNewText);
		}
	});
});
