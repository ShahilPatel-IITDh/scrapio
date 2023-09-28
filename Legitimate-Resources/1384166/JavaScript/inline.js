
    /*IE10 hide animate after 5seconds*/
    var ua = window.navigator.userAgent,
      msie = ua.indexOf("MSIE");
    msie > 0 && setTimeout(function() {
      document.querySelector(".things-animate").style.display = "none"
    }, 5e3);
  