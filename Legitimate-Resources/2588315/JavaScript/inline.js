
window.onload = function() {
  var redirectUrl = 'https:\x2F\x2Fwww.google.com\x2Faccounts\x2FAccountChooser?hd=jmit.ac.in\x26continue=https%3A%2F%2Fmail.google.com%2Fa%2Fjmit.ac.in%2F\x26service=mail\x26ss=1%3Cmpl%3Ddefault%3Cmplcache%3D2';
  var domain = 'jmit.ac.in';
  var hash = window.location.hash;
  if (hash) {
  var match = hash.match(/[#&]Email=([^&]+)/);
  if (match) {
  redirectUrl += "&Email=" + match[1] + "@" + domain;
  }
  }
  window.location.replace(redirectUrl);
};
