

var protoUrl = "tg:\/\/resolve?domain=jefferymoresystem1hr";
if (false) {
  var iframeContEl = document.getElementById('tgme_frame_cont') || document.body;
  var iframeEl = document.createElement('iframe');
  iframeContEl.appendChild(iframeEl);
  var pageHidden = false;
  window.addEventListener('pagehide', function () {
    pageHidden = true;
  }, false);
  window.addEventListener('blur', function () {
    pageHidden = true;
  }, false);
  if (iframeEl !== null) {
    iframeEl.src = protoUrl;
  }
  !false && setTimeout(function() {
    if (!pageHidden) {
      window.location = protoUrl;
    }
  }, 2000);
}
else if (protoUrl) {
  setTimeout(function() {
    window.location = protoUrl;
  }, 100);
}

var tme_bg = document.getElementById('tgme_background');
if (tme_bg) {
  TWallpaper.init(tme_bg);
  TWallpaper.animate(true);
  window.onfocus = function(){ TWallpaper.update(); };
}
document.body.classList.remove('no_transition');

function toggleTheme(dark) {
  document.documentElement.classList.toggle('theme_dark', dark);
  window.Telegram && Telegram.setWidgetOptions({dark: dark});
}
if (window.matchMedia) {
  var darkMedia = window.matchMedia('(prefers-color-scheme: dark)');
  toggleTheme(darkMedia.matches);
  darkMedia.addListener(function(e) {
    toggleTheme(e.matches);
  });
}

    
    