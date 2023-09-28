window.MP = window.MP || {};

window.MP.scrollTo = function (params) {
	if($(params.item).length){
		params.speed = params.speed || 500;
		if (navigator.userAgent.match(/IEMobile/i)) {
			params.speed = 0;
		}
		params.delay = params.delay || 0;
		setTimeout(function () {
			if ($('html, body').scrollTop() != $(params.item).offset().top && !$('html, body').is(':animated')) {
				$(params.item).focus();
				$('html, body').animate({
					scrollTop: $(params.item).offset().top - 70
				}, params.speed);
			}
		}, params.delay);
	}
	else console.log ("scrollTo() cannot find \""+params.item+"\" to scroll to");
}