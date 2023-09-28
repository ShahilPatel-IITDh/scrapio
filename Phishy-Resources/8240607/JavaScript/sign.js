var sign = function(){

    $('.auth').on('submit', function(e) {
      let $info  = $(this).find('.info');
      // if(grecaptcha.getResponse()){
			// 	$(".recaptcha-error").addClass('d-none');
			// } else {
			// 	$(".recaptcha-error").removeClass('d-none');
      //   return;
			// }

     	$.ajax({
     		type: "POST",
     		dataType: "json",
     		url: '/auth/',
     		data: $(this).serialize(),
     		success: function(data) {
     			// grecaptcha.reset();
     			if (data.error == 'no') {
              location.reload();
     			} else {
              $info.text(data.message);
     			}
     		},
     		error: function(data) {
     			grecaptcha.reset();
     		},
     	});

        return false;
    });
    function init(){
    }

    return {
        init: init
    }
}();

$(document).ready(function() {
    sign.init();
});
