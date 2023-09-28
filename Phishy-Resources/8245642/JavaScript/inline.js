
  window.addEventListener('load', function(event) {
    function applyStyle(id, style) {
      if (style) {
        var el = document.getElementById(id);
        if (el) {
          el.setAttribute('style', style);
        }
      }
    }
    applyStyle('login-bg-image', "background-image: url('https://ok6static.oktacdn.com/fs/bco/7/fs08te75o64x5ueBz2p7')");
    applyStyle('login-bg-image-ie8', "filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='https://ok2static.oktacdn.com/fs/bco/7/fs0bbsuq9jZfkErIz0x7', sizingMethod='scale')");
  });
