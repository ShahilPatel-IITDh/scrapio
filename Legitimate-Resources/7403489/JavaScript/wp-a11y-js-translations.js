
( function( domain, translations ) {
	var localeData = translations.locale_data[ domain ] || translations.locale_data.messages;
	localeData[""].domain = domain;
	wp.i18n.setLocaleData( localeData, domain );
} )( "default", {"translation-revision-date":"2023-07-28 06:07:36+0000","generator":"GlotPress\/4.0.0-alpha.6","domain":"messages","locale_data":{"messages":{"":{"domain":"messages","plural-forms":"nplurals=3; plural=(n == 1) ? 0 : ((n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14)) ? 1 : 2);","lang":"pl"},"Notifications":["Powiadomienia"]}},"comment":{"reference":"wp-includes\/js\/dist\/a11y.js"}} );
