
var date = new Date();
date.setDate(date.getDate() + 1)
document.cookie = "ot_test_consent=test; expires=" + date.toUTCString() + "; domain=.magazines.com;";
