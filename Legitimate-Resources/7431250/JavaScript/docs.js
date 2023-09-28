jQuery(document).ready(function($){
	$('.docs-get-doc-button').on('click', function(){
		var fd = this.parentNode;
		$.post(fd.action, $(fd).serialize(), function(result_JSON){
			var result = JSON.parse(result_JSON);
			if (result.status == 'error') {
				$(fd).children('.docs-get-doc-message').html(result.error);
				if (typeof grecaptcha !== 'undefined') grecaptcha.reset();
			} else {
				window.open(result.link, '_blank');
				$.fancybox.close();
				$(fd).children('.g-recaptcha, input[type="text"], button, .gdpr-message').remove();
				$(fd).siblings('h4').text('Please click the link below to download');
				$(fd).children('.docs-get-doc-message').html(result.anchor);
			}
		});
		return false;
	});
})