jQuery(document).ready(function($) {
 
   

	// BUY Request
  	$('#btn-buy-register').click( function(event) {
  		
		// Disable action form
		event.preventDefault();
		// Vars
	    var buy_reg_req 	= 'req_buy';
	    var buy_reg_trsid 	= $('#trs_id').val();
	    var buy_reg_pstid 	= $('#pst_id').val();
    	var buy_reg_fld 	= $('#buy_reg_fld').val();
    	var buy_reg_prdid	= $('#prd_id').val();
    	var buy_reg_prdname	= $('#prd_name').val();
    	var buy_reg_lang	= $('#lang').val();


    	$.ajax({
            type   		: "POST",
            url    		: 'https://mydigitalvoucher.com/wp-content/themes/dvp/ajax_buy_register.php',    
            dataType 	: 'json',
			data 		: {buy_reg_req:buy_reg_req,buy_reg_trsid:buy_reg_trsid,buy_reg_pstid:buy_reg_pstid,buy_reg_fld:buy_reg_fld,buy_reg_prdid:buy_reg_prdid,buy_reg_prdname:buy_reg_prdname,buy_reg_lang:buy_reg_lang},
            beforeSend: function() {
                $('.before-send').show();
            },
            success: function(data) {
				$('.before-send').hide();
				// console.log(data);
				// console.log(data.data.transactionId);
				// console.log( data.error);
				if( data.status === '200' ){
					$("form#buy-register")[0].reset();
					$('#modalBuy').modal('hide'); 
					Swal.fire({ icon: 'success', title: 'Traitement...', showConfirmButton: false, html: 'Vous serez redirigé vers la page d\'achat ... <br><br>' });
					
					document.location.href = 'https://api.mydigitalvoucher.com/orange/proceed-auth?transactionId='+ data.data.transactionId;
					
				}
				else if( data.data.code === 'banana' ){
					$('#response-buyregister').html('<div class="alert alert-danger alert-dismissible fade show text-left alert-small" role="alert">Rupture de stock</div>');
				}
				else if( data.status === '400' ){
					$('#response-buyregister').html('<div class="alert alert-danger alert-dismissible fade show text-left alert-small" role="alert">Mauvais numéro!</div>');
				}
				else{
					$('#response-buyregister').html('<div class="alert alert-danger alert-dismissible fade show text-left alert-small" role="alert">Mauvais numéro!</div>');
				}
				// $('#response-buyregister').html(data);
				// $("form#buy-register")[0].reset();
            }
        });
		
  	});
});