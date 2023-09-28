function gtag_report_conversion(url) {
  var callback = function () {
    if (typeof(url) != 'undefined') {
      window.location = url;
    }
  };
  gtag('event', 'conversion', {
      'send_to': 'AW-987286634/T1J_CPKbuKYBEOqY49YD',
      'event_callback': callback
  });
  return false;
}