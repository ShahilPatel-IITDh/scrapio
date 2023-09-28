
function register_script() {
				
	$('#register-form').submit(function(e) {
		var username = $("input#register_habboname").val();
		if (username == "") {
    		$('.register-warning').hide().html("Please enter a Habbo name").fadeIn('fast').delay(3000).fadeOut('slow');
    		return false;
    	} else {	
    	
	   		$.ajax({ 
    	
	    		url: 'https://habbox.com/wp-content/themes/habboxv7/register.php?stage=one',
	    		type: "POST",
	    		data: { habboname: $("input#register_habboname").val() },
	    		success: function (data) {
	    	
		    		if(data === 'TRUE') { 
		    	
			    		$('.register-warning').hide().html("This Habbo is already registered").fadeIn('slow').delay(3000).fadeOut('slow');
			    		return false;
			    	} else {
								$('#register-wrapper').fadeOut('slow').load("https://habbox.com/wp-content/themes/habboxv7/register-steptwo.php", {username:username}, function() { $('#register-wrapper').fadeIn('slow') });
					
					
			    	}
			    }

			});
		}
        return false;
    });
    
    $('#register-form-step2').submit(function(e) {
	     	
			$('#register-wrapper').fadeOut('slow', function() {
				$('#register-wrapper').load("https://habbox.com/wp-content/themes/habboxv7/register-stepthree.php").fadeIn('slow');
				});

	    return false;
	});
	
	$('#register-form-step3').submit(function(e) {
	
		$.ajax({ 
    	
	    		url: 'https://habbox.com/wp-content/themes/habboxv7/register.php?stage=three',
	    		type: "POST",
	    		data: { 
	    			habboname: $("input#register-habboname").val(),
	    			email: $("input#register-email").val(), 
	    			emailconfirm: $("input#register-email-confirm").val(),
	    			pass: $("input#register-password").val(),
	    			passconfirm: $("input#register-password-confirm").val() },
	    		success: function (data) {
		    		if(data === "INVALIDEMAIL") {
		    		$('.register-warning').hide().html("Please enter a valid email address").fadeIn('slow').delay(3000).fadeOut('slow');}
		    		
		    		else if(data === "NOMATCHEMAIL") {
		    		$('.register-warning').hide().html("Your email addresses don't match").fadeIn('slow').delay(3000).fadeOut('slow');}
		    		
		    		else if(data === "NOMATCHPASSWORD") {
		    		$('.register-warning').hide().html("Your passwords don't match").fadeIn('slow').delay(3000).fadeOut('slow');}
					else {
						alert('test success?');
					}
	    		}

			});
			
			    return false;
	});
 	
}
