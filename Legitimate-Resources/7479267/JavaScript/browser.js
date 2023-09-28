/*
 * ブラウザのユーザエージェントを元にブラウザ種別とバージョンを取得する。
 */
function assertBrowser() {
  var parser = new UAParser();
  var browser = parser.getBrowser().name;
  var version = parser.getBrowser().version;
  var engineVersion = parser.getEngine().version;
  var versionFloat = parseFloat(version);
  var engineVersionFloat = parseFloat(engineVersion);
  var parserType = typeof (parser);
  var javascriptErrPage = document.getElementById('browserUA').dataset.errpage;
  var parserua = parser.getUA() || '';

  if (parserType == 'undefined'
      || (parserType != 'function' && parserType != 'object')) {
    location.href = javascriptErrPage;
    return;
  }
  if (typeof (browser) == 'undefined'
      || (browser.indexOf('Safari') == -1 && typeof (version) == 'undefined')
      || (browser.indexOf('Safari') != -1 && typeof (engineVersion) == 'undefined')) {
    location.href = javascriptErrPage;
    return;
  }
  if ((browser.indexOf('Safari') == -1 && isNaN(versionFloat))
      || (browser.indexOf('Safari') != -1 && isNaN(engineVersionFloat))) {
    location.href = javascriptErrPage;
    return;
  } else if (browser.indexOf('IE') != -1 && versionFloat < 6.0) {
    location.href = javascriptErrPage;
    return;
  } else if (browser.indexOf('Safari') != -1 && engineVersionFloat < 500.0) {
    location.href = javascriptErrPage;
    return;
  } else if (browser.indexOf('Opera') != -1 && versionFloat < 9.0) {
    location.href = javascriptErrPage;
    return;
  } else if (browser.indexOf('IE') == -1 && browser.indexOf('Safari') == -1
      && browser.indexOf('Opera') == -1 && parserua.toLowerCase().indexOf('webkit') == -1) {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('trident') < 0 && ua.indexOf('firefox') < 0
        && ua.indexOf('chrome') < 0) {
      location.href = javascriptErrPage;
      return;
    }
  }
}