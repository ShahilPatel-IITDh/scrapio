
  function setCookie(key, value, days) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
  }
  
  function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
  }
  
  $( document ).ready(function() {
    already_shown = !!getCookie('_loc_notice');
    if(!already_shown) {
      $.getJSON( "/v2/client-location", function( data ) {
        country_code = data['country_code'];
        if(country_code != 'US') {
          $('#selectLanguage').modal('show')
        }
      });
      setCookie('_loc_notice', '1', 365)
    }
  });
