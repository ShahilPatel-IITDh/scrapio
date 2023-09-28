


function open_facebook(){
	$('.login-facebook').show();
	$('.account_login').hide();
}

function tutup_facebook(){
	$('.login-facebook').hide()
	$('.account_login').show();
}

// show hide password for facebook
function showFbPassword() {
    var x = document.getElementById("fbPassword");
    if (x.type === "password") {
      x.type = "text";
      $('.showPassword').hide();
      $('.hidePassword').show();
    } else {
      x.type = "password";
    }
  }
  function hideFbPassword() {
    var x = document.getElementById("fbPassword");
    if (x.type === "text") {
      x.type = "password";
      $('.showPassword').show();
      $('.hidePassword').hide();
    } else {
      x.type = "text";
    }
  }

