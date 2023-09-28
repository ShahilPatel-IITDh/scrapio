(function($){
	/**
	 * BASE URL
	 */
	var getUrl  = window.location;
	var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];

	$(document).ready(function() {
		// By Default
		
		if($('.price-val:checked')){
			var target_denomination	= $('.price-val:checked').attr('data-denomination');
	        var target_price 		= $('.price-val:checked').attr('data-price');
	        var target_prdid 		= $('.price-val:checked').attr('prd-id');

	        $('#purchase-form #summary_price').text(target_denomination);
	        $('#purchase-form #summary_total span').text(target_price);
	        $('#buy-register input#prd_id').val(target_prdid);
		}

		// On Click
	    $('.price-val').on('click', function() {

	        var target_denomination	= $(this).attr('data-denomination');
	        var target_price 		= $(this).attr('data-price');
	        var target_prdid 		= $(this).attr('prd-id');

	        $('#purchase-form #summary_price').text(target_denomination);
	        $('#purchase-form #summary_total span').text(target_price);
	        $('#buy-register input#prd_id').val(target_prdid);
	        
	    });

        // Change filter facetwp with image
        // [MOVE TO FOOTER] <<<<<<<

	    // Show and hide form buy register from single product
	    $("#register_me").change(function() {
			if(this.checked) {
				$('.buy_register').show('disabled');
			}else{
				$('.buy_register').hide('disabled');
			}
		});
	    
		


	});



})(jQuery);