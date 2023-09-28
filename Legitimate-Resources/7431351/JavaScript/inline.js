
    var getParameterByName = function (name) {
      var match = RegExp('[?&]' + name + '=([^&]*)').exec(
        window.location.search
      );
      return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    };
    var checkUrlParameters = function () {
      var email = getParameterByName('email');
      if (email && email.length > 1) {
        document.getElementById('email').value = email;
        document.getElementById('password').focus();
      } else {
        document.getElementById('email').focus();
      }
    };
  