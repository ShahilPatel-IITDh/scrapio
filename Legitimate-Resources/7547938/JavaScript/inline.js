(function loadGeoIp(e, o) {
  var t;
  window && !window.process && (window.process = function (e) {
    if (document.getElementsByTagName("BODY")[0].className += " user-iso-country-" + e.c.toLowerCase(), e) try {
      window.ls.userInfo.countryCode = e.c, document.dispatchEvent(new CustomEvent(o, {
        detail: e.c
      }));
    } catch (e) {
      console.log("unable to dispatch " + o + ": ", e);
    }
  }, (t = document.createElement("SCRIPT")).src = e, document.getElementsByTagName("HEAD")[0].appendChild(t));
})('https://geo.livescore.com/me/', 'userCountryIpReceived');