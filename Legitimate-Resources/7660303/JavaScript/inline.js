
  window.addEventListener('load', function(event) {
    function applyStyle(id, styleDef) {
      if (styleDef) {
        var el = document.getElementById(id);
        if (!el) {
          return;
        }
        el.classList.add(styleDef);
      }
    }
    applyStyle('login-bg-image', 'bgStyle');
    applyStyle('login-bg-image-ie8', 'bgStyleIE8');
  });
