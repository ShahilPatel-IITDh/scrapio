(function () {
  njtWhatsApp.ready(function () {
    const init = function () {
      document.querySelectorAll(".nta_wa_button").forEach(function (element) {
        if (element._isWaButton) return
        const info = JSON.parse(element.getAttribute('data-info'))
        njtWhatsApp.createButton(element, {
          ...info,
          timezone: njt_wa_global.timezone,
          i18n: njt_wa_global.i18n,
          urlSettings: njt_wa_global.urlSettings,
        });
      });
    };
    init();

    // Support Riode Theme
    if (typeof(Riode) !== 'undefined' && typeof(jQuery) !== 'undefined') {
      Riode.$window.on('riode_load', function(){ init() })
      jQuery(document).ajaxComplete((e, xhs, req) => {
        try {
          if (req.data.indexOf('riode_quickview') > -1) { init() }
        } catch (e) {
          console.log("error")
        }
      })
    }

    // Support Porto Theme 	
    jQuery(document).ajaxComplete((e, xhs, req) => {
      try {
        if (req.data.indexOf('action=porto_lazyload_menu') > -1) { init() }
      } catch (e) {}
    })
  });
})();
