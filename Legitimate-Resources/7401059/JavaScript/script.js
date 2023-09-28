(function( $ ) {
 
    "use strict";
     
    $('body').delegate(".dscf7_refresh_captcha","click", function(){
		var thisElement = $(this).parent('.dscf7captcha');		
		var tagName = $(this).attr('id');
		
		$.ajax({
					type: "POST",
					url: ajax_object.ajax_url,
					data: { 'action':'dscf7_refreshcaptcha','tagname':tagName},
					beforeSend: function(data) {
						thisElement.find(".dscf7_captcha_reload_icon").show();
						thisElement.find(".dscf7_captcha_icon").hide();
					},
					success: function (data) {
						thisElement.find(".dscf7_captcha_reload_icon").hide();
						thisElement.find(".dscf7_captcha_icon").show();
						thisElement.html(data);
					}
				});
					
	});
 
})(jQuery);
