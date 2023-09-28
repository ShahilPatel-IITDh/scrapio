var cookie = 'ignore_unsupported_browser_banner';

if (Cookies && !Cookies.get(cookie)) {
  var browser = bowser.getParser(window.navigator.userAgent);

  // prettier-ignore
  var isSupported = browser.satisfies({
    'android browser': '>=4.4',
    chrome: '>=55',
    chromium: '>=55',

    /*
     * Keep up-to-date with Chrome version.
     * See https://github.com/electron/releases.
     */
    electron: '>=1.6.0',
    firefox: '>=50',
    'internet explorer': '>=9',
    'Microsoft Edge': '>=13',
    opera: '>=42',
    safari: '>=10',
    'Samsung Internet for Android': '>=6',
    vivaldi: '>=1.14'
  });

  if (!isSupported) {
    var banner = document.getElementById('unsupported-browser-banner');
    banner.style.display = 'inline-block';

    /*
     * Unfortunately the styles of these elements won't be available yet, so
     * we can't use them to compute the changes (so have to just hardcode the
     * pixel amounts
     */
    waitForElement('navbar', function(el) {
      el.style.top = '60px';
    });

    waitForElement('app', function(el) {
      el.style.marginTop = '130px';
    });
  }
}

function checkForElement(className, work) {
  var el = document.getElementsByClassName(className)[0];
  if (el) {
    work(el);
    return true;
  }
}

function dismissBanner() {
  Cookies.set(cookie, 1, { expires: 365 });

  var banner = document.getElementById('unsupported-browser-banner');
  banner.style.display = 'none';

  checkForElement('navbar', function(el) {
    el.style.top = 0;
  });

  checkForElement('app', function(el) {
    el.style.marginTop = '70px';
  });
}

function waitForElement(className, work) {
  var interval = 500;
  var maxAttempts = 20;

  var attempts = 0;
  var id = window.setInterval(function() {
    /*
     * If the navbar hasn't loaded after 10 seconds (20 * 500ms) it's
     * probably never going to
     */
    if (attempts > maxAttempts) {
      window.clearInterval(id);
      return;
    }
    attempts++;

    if (checkForElement(className, work)) {
      window.clearInterval(id);
    }
  }, interval);
}
