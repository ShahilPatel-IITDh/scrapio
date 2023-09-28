jQuery(document).ready(function($) {
 
  	/**
   	 * When user clicks on button...
   	 *
   	 */
   	 
   	// (Security 1) Jquery Validate
   	// Add methode no space
   	jQuery.validator.addMethod("noSpace", function(value, element) { 
	  return value.indexOf(" ") < 0 && value != ""; 
	}, "No space please and don't leave it empty");
   	// Add Method Orange Number Only
	jQuery.validator.addMethod("orange", function (value, element) {
        if(value.substring(0, 3) != '+21'){
          	return false;
        }else{
        	return true;
        }
    }, "Please using Orange number.");

	$("#dvp-registration").validate({

	  	rules: {
		    reg_username: {
		    	required: true,
		    	noSpace:true,
		    	minlength: 5
		    },
		    reg_email: {
		      	required: true,
		      	email: true,
		      	noSpace:true
		    },
		    reg_password:{
		    	required: true,
		    	minlength: 8,
		    	noSpace:true
		    },
		    reg_phone:{
		    	required: true,
		    	minlength: 13,
		    	noSpace:true,
		    	orange: true
		    },
		    reg_tnc:{
		    	required: true

		    }
	  	},

	});

  	$('#btn-new-user').click( function(event) {

  		if($("#dvp-registration").valid()){
 
		    /**
		     * Prevent default action, so when user clicks button he doesn't navigate away from page
		     *
		     */
		    if (event.preventDefault) {
		        event.preventDefault();
		    } else {
		        event.returnValue = false;
		    }
		 
		    // Show 'Please wait' loader to user, so she/he knows something is going on
		    $('.indicator').show();
		 
		    // If for some reason result field is visible hide it
		    $('.result-message').hide();
		 
		    // Collect data from inputs
		    var reg_nonce = $('#dvp_new_user_nonce').val();
		    var reg_user  = $('#reg_username').val();
		    var reg_pass  = $('#reg_password').val();
		    var reg_mail  = $('#reg_email').val();
		    var reg_phone = $('#reg_phone').val();
		 
		    /**
		     * AJAX URL where to send data
		     * (from localize_script)
		     */
		    var ajax_url = dvp_reg_vars.dvp_ajax_url;
		 
		    // Data to send
		    data = {
		      	action: 'register_user',
		      	nonce: reg_nonce,
		      	user: reg_user,
		      	pass: reg_pass,
		      	mail: reg_mail,
		      	phone: reg_phone,
		    };
		 
		    // Do AJAX request
		    $.post( ajax_url, data, function(response) {
		      	// If we have response
		      	if( response ) {
			        // Hide 'Please wait' indicator
			        $('.indicator').hide();
			 
			        if( response === '1' ) {
			          	// If user is created
			          	$('.result-message').html('Your submission is complete.'); // Add success message to results div
			          	$('.result-message').addClass('alert-success'); // Add class success to results div
			          	$('.result-message').show(); // Show results div
			          	$("#dvp-registration")[0].reset(); // Reset All field
			          	$('#modalRegister').modal('hide'); // hide register Popup
			          	Swal.fire({ icon: 'success', title: 'Success', showConfirmButton: true, html: 'Your submission is complete, please check your email or you can login directly now. <br><br>' });

			        } else {
			          	$('.result-message').html( response ); // If there was an error, display it in results div
			          	$('.result-message').addClass('alert-danger'); // Add class failed to results div
			          	$('.result-message').show(); // Show results div
			        }
		      	}
		    });

		}
 
  	});
});