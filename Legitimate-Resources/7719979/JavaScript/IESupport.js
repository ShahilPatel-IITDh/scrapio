(function () {
  function isIE() {
    const userAgent = window.navigator.userAgent;
    const isIeLt11 = userAgent.indexOf("MSIE ") > -1;
    const isIe11 = !!userAgent.match(/Trident.*rv\:11\./);
    if (isIeLt11 || isIe11) return true;
    return false;
  }
  const message ='<p style="margin-bottom:8px"><i class="dot red"></i>We no longer support the use of Internet Explorer for our website. Please switch to <a href="https://www.dbs.com/supported-browsers/default.page" target="_blank">other browsers</a> for a better viewing experience. Thank you.</p>';
  function addIEMessage() {
    const header = $('#flpHeader');
    const headerSec = $("#header-section");
    const alertBox = $(".alert-main"); // alert-main may not appear only in header
    if (alertBox.length) {
      // just add the message to existing messages
      const contentBox = alertBox.find(".pro-content");
      contentBox.prepend(message);
    } else {
      headerSec.prepend(['<div class="alert-main animate">',
          '<div class="container">',
            '<div class="pro-contentbox">',
              '<div class="pro-content">',
                message,
              '</div>',
            '</div>',
          '</div>',
       '</div>'].join(''));
    }
    header[0].style.top = $('.alert-main').height()+'px';
  }
  $(function () {
    if (isIE()) {
      addIEMessage();
    }
  });
})();