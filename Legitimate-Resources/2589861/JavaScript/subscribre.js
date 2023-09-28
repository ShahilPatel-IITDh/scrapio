    jQuery(document).ready(function($) {
			// jQuery Validation				
			jQuery("input:text").change(function() {			    			    
			    var email = $("#ts_subscribe").val();			   
			
			jQuery("#signup").validate({
				// if valid, post data via AJAX
				submitHandler: function(form) {
					jQuery.ajax(
				        {

				            type: "POST",

				            url: ArrivaUrl.ajaxurl,

				            data: {

				                action: 'func_themestudio_subscribe_form',
				                email:email,
				            },
				            success: function(data) {				                   
				                     jQuery('.formmessage ').html(data);	
				                     // alert(email);			                   

				             },
				             error: function(errorThrown) {				             	
				            }
				             
				        });
				},
				// all fields are required	
				rules: {					
					email_subscribe: {
						required: true,
						email: true,
					}
				}			
			});
			});
	});
