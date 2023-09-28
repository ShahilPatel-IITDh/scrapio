jQuery(document).ready(function($){
    // Perform AJAX login on form submit
    $('form#login_form').on('submit', function(e){
        $('form#login_form p.status').show().text(ajax_login_object.loadingmessage);
        $.ajax({
            type 	: 'POST',
            dataType: 'json',
            url 	: ajax_login_object.ajaxurl,
            data 	: { 
                		'action'	: 'ajaxlogin', //calls wp_ajax_nopriv_ajaxlogin
                		'username'	: $('form#login_form #username').val(), 
                		'password'	: $('form#login_form #password').val(), 
                		'security'	: $('form#login_form #security').val() },
                		
            success: function(data){
                $('form#login_form p.status').text(data);
                if (data.loggedin == true){
                	Swal.fire({ icon: 'success', title: 'Success', showConfirmButton: false, html: 'Login Was Successfuly... <br><br>' });
                	setInterval(function(){
                		document.location.href = ajax_login_object.redirecturl;
                	},1000);
                }else{
                	Swal.fire({ icon: 'error', title: 'Oops...', text: data.message });
                }
            }
        });
        e.preventDefault();
    });
});