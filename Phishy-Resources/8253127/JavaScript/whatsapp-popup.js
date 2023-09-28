(function() {
  njtWhatsApp.ready(function() {
    njtWhatsApp.createWidget(document.querySelector("#wa"),{
      accounts: njt_wa.accounts,
      timezone: njt_wa_global.timezone,
      gdprStatus: njt_wa.gdprStatus,
      defaultAvatar: njt_wa_global.defaultAvatarSVG,
      options: njt_wa.options,
      urlSettings: njt_wa_global.urlSettings
    });
    // Fix WooMart Theme
    const wa_root_wrap = document.querySelector('#wa').closest('a')
    if (wa_root_wrap && !wa_root_wrap.getAttribute('href')) wa_root_wrap.href="#"
  });
})();

