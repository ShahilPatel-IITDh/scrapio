(function () {
  // device information
  var getDevice = (function () {
    var ua = navigator.userAgent;
    if (
      ua.indexOf("iPhone") > 0 ||
      ua.indexOf("iPod") > 0 ||
      (ua.indexOf("Android") > 0 && ua.indexOf("Mobile") > 0)
    ) {
      return "sp";
    } else {
      return "other";
    }
  })();

  // exception_domain list

  var exception_domain = [];

  var ref_domain = location.hostname;

  // create js
  var appendScriptTag = (function () {
    if (exception_domain.indexOf(ref_domain) < 0) {
      var banner = document.createElement("script");
      banner.defer = true;
      if (getDevice == "sp") {
        // sp condition js
        banner.src =
          "//www.rakuten.co.jp/com/advance/chain_offer/CMO_PoC_Test/sp/condition.js";
        // pc condition js
      } else {
        banner.src =
          "//www.rakuten.co.jp/com/advance/chain_offer/CMO_PoC_Test/pc/condition.js";
      }
      // append condition.js to <body>
      var pitari_js = document.body;
      pitari_js.appendChild(banner);
      // append phoenix.js in <body> after condition is loaded
      banner.onload = function () {
        var phoenix = document.createElement("script");
        phoenix.defer = true;
        phoenix.src = "//r.r10s.jp/com/ap/target/phoenix-3.1.2.min.js";
        pitari_js.appendChild(phoenix);
      };
    }
  })();
})();
