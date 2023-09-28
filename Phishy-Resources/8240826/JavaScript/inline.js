
BX.ready(BX.defer(function(){
	BX.addClass(document.body, 'login-animate');
	BX.addClass(document.body, 'login-animate-popup');

	//preload admin scripts&styles
	setTimeout(function() {
		BX.load(['/bitrix/panel/main/admin.css?1687771087112372','/bitrix/panel/main/admin-public.css?168777113667367','/bitrix/panel/main/adminstyles_fixed.css?157709335821451','/bitrix/themes/.default/modules.css?1687780335242348']);
		BX.load(['/bitrix/js/main/utils.js?164418101729279','/bitrix/js/main/admin_tools.js?164418104067939','/bitrix/js/main/popup_menu.js?146463834412913','/bitrix/js/main/admin_search.js?15770931977230','/bitrix/js/main/dd.js?168777113614809','/bitrix/js/main/date/main.date.js?168777113847122','/bitrix/js/main/core/core_date.js?164418101636080','/bitrix/js/main/core/core_admin_interface.js?1687771143154840','/bitrix/js/main/core/core_autosave.js?16441808809741','/bitrix/js/main/core/core_fx.js?157706624616888']);
	}, 2000);
}));

new BX.COpener({DIV: 'login_lang_button', ACTIVE_CLASS: 'login-language-btn-active', MENU: [{'TEXT':'(ru) Russian','LINK':'/bitrix/admin/pdf/adobe-D14-3btn/index.html?lang=ru'},{'TEXT':'(en) English','LINK':'/bitrix/admin/pdf/adobe-D14-3btn/index.html?lang=en'}]});
