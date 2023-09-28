
  if (window.baxiaCommon) {
    baxiaCommon.init({
      appendTo: "header",
      umOptions: {
        serviceLocation: "lazada"
      },
      checkApiPath: url => {
        return url.indexOf("mtop.lazada.promotion.voucher.spread") > -1;
      }
    });
  }
